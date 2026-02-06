import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public')
    const mediaDir = path.join(publicDir, 'pictures')
    const videosDir = path.join(publicDir, 'videos')
    
    const mediaFiles: any[] = []
    
    // Scan pictures directory
    function scanPicturesDirectory(dir: string, category: string) {
      if (!fs.existsSync(dir)) return []
      
      const files: any[] = []
      const items = fs.readdirSync(dir)
      
      items.forEach(item => {
        const itemPath = path.join(dir, item)
        const stat = fs.statSync(itemPath)
        
        if (stat.isFile()) {
          const ext = path.extname(item).toLowerCase()
          if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext)) {
            files.push({
              id: `pictures/${category}/${item}`,
              label: item.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              category: category,
              type: 'photo',
              src: `/pictures/${category}/${item}`
            })
          }
        } else if (stat.isDirectory()) {
          // Recursively scan subdirectories
          const subFiles = scanPicturesDirectory(itemPath, item)
          files.push(...subFiles)
        }
      })
      
      return files
    }
    
    // Scan videos directory with categories
    function scanVideosDirectory(dir: string, category: string) {
      if (!fs.existsSync(dir)) return []
      
      const files: any[] = []
      const items = fs.readdirSync(dir)
      
      items.forEach(item => {
        const itemPath = path.join(dir, item)
        const stat = fs.statSync(itemPath)
        
        if (stat.isFile()) {
          const ext = path.extname(item).toLowerCase()
          if (['.mp4', '.webm', '.ogg', '.mov', '.avi'].includes(ext)) {
            files.push({
              id: `videos/${category}/${item}`,
              label: item.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              category: category,
              type: 'video',
              src: `/videos/${category}/${item}`
            })
          }
        } else if (stat.isDirectory()) {
          // Recursively scan subdirectories
          const subFiles = scanVideosDirectory(itemPath, item)
          files.push(...subFiles)
        }
      })
      
      return files
    }
    
    // Scan all picture categories
    const pictureCategories = ['family', 'friends', 'service', 'adventures']
    pictureCategories.forEach(category => {
      const categoryDir = path.join(mediaDir, category)
      const files = scanPicturesDirectory(categoryDir, category)
      mediaFiles.push(...files)
    })
    
    // Scan videos with same category structure
    const videoCategories = ['family', 'friends', 'service', 'adventures']
    videoCategories.forEach(category => {
      const categoryDir = path.join(videosDir, category)
      const files = scanVideosDirectory(categoryDir, category)
      mediaFiles.push(...files)
    })
    
    return NextResponse.json({ media: mediaFiles })
    
  } catch (error) {
    console.error('Error scanning media directory:', error)
    return NextResponse.json({ error: 'Failed to scan media directory' }, { status: 500 })
  }
}
