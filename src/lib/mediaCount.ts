import fs from 'fs'
import path from 'path'

const PHOTO_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.webm']

interface MediaCounts {
  photos: number
  videos: number
  total: number
}

function countMediaFilesRecursive(dir: string): { photos: number; videos: number } {
  let photos = 0
  let videos = 0
  
  try {
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        const subCounts = countMediaFilesRecursive(fullPath)
        photos += subCounts.photos
        videos += subCounts.videos
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase()
        if (PHOTO_EXTENSIONS.includes(ext)) {
          photos++
        } else if (VIDEO_EXTENSIONS.includes(ext)) {
          videos++
        }
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
    return { photos: 0, videos: 0 }
  }
  
  return { photos, videos }
}

export function getMediaCounts(): MediaCounts {
  const publicDir = path.join(process.cwd(), 'public')
  const counts = countMediaFilesRecursive(publicDir)
  return {
    photos: counts.photos,
    videos: counts.videos,
    total: counts.photos + counts.videos
  }
}

export function getMediaCount(): number {
  return getMediaCounts().total
}
