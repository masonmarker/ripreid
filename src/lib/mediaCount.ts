import fs from 'fs'
import path from 'path'

const MEDIA_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.webm']

function countMediaFilesRecursive(dir: string): number {
  let count = 0
  
  try {
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        count += countMediaFilesRecursive(fullPath)
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase()
        if (MEDIA_EXTENSIONS.includes(ext)) {
          count++
        }
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
    return 0
  }
  
  return count
}

export function getMediaCount(): number {
  const publicDir = path.join(process.cwd(), 'public')
  return countMediaFilesRecursive(publicDir)
}
