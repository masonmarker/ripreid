import GalleryPageClient from '@/components/GalleryPageClient'
import { getAllMedia, getMediaStats } from '@/lib/media'

export default function GalleryPage() {
  const { photos, videos } = getMediaStats()

  return (
    <GalleryPageClient
      media={getAllMedia()}
      photoCount={photos}
      videoCount={videos}
    />
  )
}
