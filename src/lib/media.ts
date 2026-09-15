import fs from 'fs'
import path from 'path'
import { cache } from 'react'

export interface MediaItem {
  id: string
  label: string
  category: string
  type: 'photo' | 'video'
  src: string
}

const PHOTO_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
const CATEGORIES = ['family', 'friends', 'service', 'adventures'] as const

function toLabel(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

function scan(
  dir: string,
  category: string,
  extensions: string[],
  type: 'photo' | 'video',
  prefix: string
): MediaItem[] {
  if (!fs.existsSync(dir)) return []

  const out: MediaItem[] = []
  for (const item of fs.readdirSync(dir).sort()) {
    const itemPath = path.join(dir, item)
    const stat = fs.statSync(itemPath)

    if (stat.isDirectory()) {
      out.push(...scan(itemPath, item, extensions, type, prefix))
    } else if (extensions.includes(path.extname(item).toLowerCase())) {
      out.push({
        id: `${prefix}/${category}/${item}`,
        label: toLabel(item),
        category,
        type,
        // Encode the filename so anything URL-unsafe (spaces, #, ?) still
        // resolves rather than silently 404ing.
        src: `/${prefix}/${category}/${encodeURIComponent(item)}`,
      })
    }
  }
  return out
}

/**
 * Reads the media library off disk. Wrapped in React's `cache` so the repeated
 * calls across a single render (page + gallery + friend picks) hit the
 * filesystem once instead of three separate client-side `/api/media` round
 * trips, which is what the components used to do.
 */
export const getAllMedia = cache((): MediaItem[] => {
  const publicDir = path.join(process.cwd(), 'public')
  const media: MediaItem[] = []

  for (const category of CATEGORIES) {
    media.push(
      ...scan(
        path.join(publicDir, 'pictures', category),
        category,
        PHOTO_EXTENSIONS,
        'photo',
        'pictures'
      )
    )
  }

  for (const category of CATEGORIES) {
    media.push(
      ...scan(
        path.join(publicDir, 'videos', category),
        category,
        VIDEO_EXTENSIONS,
        'video',
        'videos'
      )
    )
  }

  return media
})

export const getMediaStats = cache(() => {
  const media = getAllMedia()
  const photos = media.filter((m) => m.type === 'photo').length
  const videos = media.filter((m) => m.type === 'video').length
  return { photos, videos, total: photos + videos }
})

/** Distinct "friends" items, so the two sections that show one don't collide. */
export function getFriendMedia(count: number): MediaItem[] {
  return getAllMedia()
    .filter((m) => m.category === 'friends')
    .slice(0, count)
}
