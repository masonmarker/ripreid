import GalleryPageClient from '@/components/GalleryPageClient'
import { getMediaCounts } from '@/lib/mediaCount'

export default function GalleryPage() {
  const { photos, videos } = getMediaCounts()
  
  return <GalleryPageClient photoCount={photos} videoCount={videos} />
}
