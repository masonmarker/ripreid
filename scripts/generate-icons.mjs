// Rasterises src/app/icon.svg into the PNG icons Next.js App Router expects:
//   icon.png       - 256x256 fallback for browsers without SVG favicon support
//   apple-icon.png - 180x180 touch icon; iOS applies its own rounded mask, so
//                    this variant is rendered square (rx=0) to avoid
//                    transparent corners.
//
// Run: node scripts/generate-icons.mjs

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/app')

const svg = await readFile(path.join(appDir, 'icon.svg'), 'utf8')
const squareSvg = svg.replace('rx="12"', 'rx="0"')

const targets = [
  { file: 'icon.png', size: 256, source: svg },
  { file: 'apple-icon.png', size: 180, source: squareSvg },
]

for (const { file, size, source } of targets) {
  const png = await sharp(Buffer.from(source), { density: 384 })
    .resize(size, size)
    .png()
    .toBuffer()
  const out = path.join(appDir, file)
  await writeFile(out, png)
  console.log(`${file} ${size}x${size} (${png.length} bytes)`)
}
