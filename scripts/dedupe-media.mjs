#!/usr/bin/env node
/**
 * Deduplicates media under public/.
 *
 * Detection:
 *   - exact duplicates: SHA-256 of file bytes (images and videos)
 *   - near duplicates:  64-bit dHash of images (catches re-encodes, resizes,
 *                       png/jpg conversions of the same photo)
 *
 * Usage:
 *   node scripts/dedupe-media.mjs            # report only (dry run)
 *   node scripts/dedupe-media.mjs --apply    # delete duplicates + rewrite src/ references
 *   node scripts/dedupe-media.mjs --apply --exact-only   # skip near duplicates when deleting
 *   node scripts/dedupe-media.mjs --check    # exit 1 if exact duplicates exist (used by prebuild)
 *   node scripts/dedupe-media.mjs --strict   # with --check, also fail on near duplicates
 *   node scripts/dedupe-media.mjs --threshold 8
 */

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const PUBLIC_DIR = path.join(ROOT, 'public')
const SRC_DIR = path.join(ROOT, 'src')

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
const SRC_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.md', '.css']

const args = process.argv.slice(2)
const apply = args.includes('--apply')
const check = args.includes('--check')
const strict = args.includes('--strict')
const exactOnly = args.includes('--exact-only')
const thresholdArg = args.indexOf('--threshold')
const HAMMING_THRESHOLD = thresholdArg === -1 ? 5 : Number(args[thresholdArg + 1])

function walk(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (entry.isFile()) out.push(full)
  }
  return out
}

function publicUrl(file) {
  return '/' + path.relative(PUBLIC_DIR, file).split(path.sep).join('/')
}

function relative(file) {
  return path.relative(ROOT, file).split(path.sep).join('/')
}

/** 64-bit difference hash: grayscale 9x8, compare each pixel to its right neighbour. */
async function perceptualHash(file) {
  const { data } = await sharp(file, { failOn: 'none', animated: false })
    .grayscale()
    .resize(9, 8, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true })

  let hash = 0n
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const i = row * 9 + col
      hash = (hash << 1n) | (data[i] > data[i + 1] ? 1n : 0n)
    }
  }
  return hash
}

function hammingDistance(a, b) {
  let xor = a ^ b
  let count = 0
  while (xor) {
    xor &= xor - 1n
    count++
  }
  return count
}

/** Union-find over file indexes so transitive near-matches land in one group. */
function createUnionFind(size) {
  const parent = Array.from({ length: size }, (_, i) => i)
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])))
  return {
    find,
    union: (a, b) => {
      const [ra, rb] = [find(a), find(b)]
      if (ra !== rb) parent[ra] = rb
    },
    groups: () => {
      const map = new Map()
      for (let i = 0; i < size; i++) {
        const root = find(i)
        if (!map.has(root)) map.set(root, [])
        map.get(root).push(i)
      }
      return [...map.values()].filter((g) => g.length > 1)
    },
  }
}

function collectSourceFiles() {
  if (!fs.existsSync(SRC_DIR)) return []
  return walk(SRC_DIR).filter((f) => SRC_EXTENSIONS.includes(path.extname(f).toLowerCase()))
}

const COPY_SUFFIX = /(?:_\d+_|\(\d+\)|[ _-]copy|_copy\d*)(?=\.[^.]+$)/i

/**
 * Keeper preference, best first:
 *   1. referenced somewhere in src/
 *   2. filename that does not look like a copy ("img_8715.png" over "img_8715_1_.png")
 *   3. higher pixel count (near-dup groups can mix resolutions)
 *   4. larger file, then shortest path, then alphabetical
 */
function pickKeeper(entries) {
  return [...entries].sort((a, b) => {
    if (a.referenced !== b.referenced) return a.referenced ? -1 : 1
    const aCopy = COPY_SUFFIX.test(path.basename(a.file))
    const bCopy = COPY_SUFFIX.test(path.basename(b.file))
    if (aCopy !== bCopy) return aCopy ? 1 : -1
    if (a.pixels !== b.pixels) return b.pixels - a.pixels
    if (a.size !== b.size) return b.size - a.size
    if (a.file.length !== b.file.length) return a.file.length - b.file.length
    return a.file.localeCompare(b.file)
  })[0]
}

function rewriteReferences(removals) {
  let edits = 0
  for (const srcFile of collectSourceFiles()) {
    const original = fs.readFileSync(srcFile, 'utf8')
    let updated = original
    for (const { from, to } of removals) {
      if (updated.includes(from)) updated = updated.split(from).join(to)
    }
    if (updated !== original) {
      fs.writeFileSync(srcFile, updated)
      console.log(`  updated references in ${relative(srcFile)}`)
      edits++
    }
  }
  return edits
}

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error('No public/ directory found.')
    process.exit(1)
  }

  const mediaFiles = walk(PUBLIC_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase()
    return IMAGE_EXTENSIONS.includes(ext) || VIDEO_EXTENSIONS.includes(ext)
  })

  if (mediaFiles.length === 0) {
    console.log('No media found under public/.')
    return
  }

  const sourceText = collectSourceFiles()
    .map((f) => fs.readFileSync(f, 'utf8'))
    .join('\n')

  const entries = mediaFiles.map((file) => {
    const ext = path.extname(file).toLowerCase()
    const url = publicUrl(file)
    return {
      file,
      url,
      isImage: IMAGE_EXTENSIONS.includes(ext),
      size: fs.statSync(file).size,
      referenced: sourceText.includes(url),
      pixels: 0,
      sha: '',
      phash: null,
    }
  })

  // Exact duplicates: only hash files that share a byte size with another file.
  const bySize = new Map()
  for (const entry of entries) {
    if (!bySize.has(entry.size)) bySize.set(entry.size, [])
    bySize.get(entry.size).push(entry)
  }
  for (const group of bySize.values()) {
    if (group.length < 2) continue
    for (const entry of group) {
      entry.sha = crypto.createHash('sha256').update(fs.readFileSync(entry.file)).digest('hex')
    }
  }

  const exactUnion = createUnionFind(entries.length)
  const byHash = new Map()
  entries.forEach((entry, i) => {
    if (!entry.sha) return
    if (byHash.has(entry.sha)) exactUnion.union(i, byHash.get(entry.sha))
    else byHash.set(entry.sha, i)
  })
  const exactGroups = exactUnion.groups()

  // Near duplicates among images that survived exact dedupe.
  const exactRemoved = new Set()
  for (const group of exactGroups) {
    const keeper = pickKeeper(group.map((i) => entries[i]))
    for (const i of group) if (entries[i] !== keeper) exactRemoved.add(i)
  }

  const imageIndexes = []
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].isImage && !exactRemoved.has(i)) imageIndexes.push(i)
  }

  for (const i of imageIndexes) {
    try {
      const meta = await sharp(entries[i].file).metadata()
      entries[i].pixels = (meta.width ?? 0) * (meta.height ?? 0)
      entries[i].phash = await perceptualHash(entries[i].file)
    } catch (error) {
      console.warn(`  warning: could not read image ${relative(entries[i].file)}: ${error.message}`)
    }
  }

  const nearUnion = createUnionFind(entries.length)
  for (let a = 0; a < imageIndexes.length; a++) {
    for (let b = a + 1; b < imageIndexes.length; b++) {
      const [i, j] = [imageIndexes[a], imageIndexes[b]]
      const [hi, hj] = [entries[i].phash, entries[j].phash]
      if (hi === null || hj === null) continue
      if (hammingDistance(hi, hj) <= HAMMING_THRESHOLD) nearUnion.union(i, j)
    }
  }
  const nearGroups = nearUnion.groups()

  const allRemovals = []
  const report = (title, groups, kind) => {
    if (groups.length === 0) return
    console.log(`\n${title}`)
    for (const group of groups) {
      const members = group.map((i) => entries[i])
      const keeper = pickKeeper(members)
      console.log(`\n  keep   ${relative(keeper.file)}${keeper.referenced ? '  (referenced in src/)' : ''}`)
      for (const member of members) {
        if (member === keeper) continue
        console.log(`  remove ${relative(member.file)}${member.referenced ? '  (referenced in src/)' : ''}`)
        allRemovals.push({ kind, file: member.file, from: member.url, to: keeper.url, referenced: member.referenced })
      }
    }
  }

  console.log(`Scanned ${entries.length} media files under public/`)
  report(`Exact duplicates (${exactGroups.length} group(s)):`, exactGroups, 'exact')
  report(
    `Near-duplicate images (${nearGroups.length} group(s), dHash distance <= ${HAMMING_THRESHOLD}) - review before applying:`,
    nearGroups,
    'near'
  )

  if (allRemovals.length === 0) {
    console.log('\nNo duplicates found.')
    return
  }

  const exactCount = allRemovals.filter((r) => r.kind === 'exact').length
  const nearCount = allRemovals.length - exactCount
  const removals = exactOnly ? allRemovals.filter((r) => r.kind === 'exact') : allRemovals

  if (check) {
    const failing = strict ? allRemovals.length : exactCount
    if (failing > 0) {
      console.error(
        `\n${failing} duplicate file(s) in public/. Run "npm run dedupe:media:apply" to remove them.`
      )
      process.exit(1)
    }
    console.log(`\n${nearCount} near-duplicate(s) flagged for review (not failing the check).`)
    return
  }

  if (!apply) {
    console.log(
      `\nDry run: ${exactCount} exact and ${nearCount} near duplicate(s) found.` +
        '\nRe-run with --apply to delete them and rewrite src/ references' +
        ' (add --exact-only to keep the near duplicates).'
    )
    return
  }

  console.log('\nApplying:')
  for (const removal of removals) {
    fs.unlinkSync(removal.file)
    console.log(`  deleted ${relative(removal.file)}`)
  }
  const edited = rewriteReferences(removals.filter((r) => r.referenced))
  console.log(`\nRemoved ${removals.length} file(s); updated ${edited} source file(s).`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
