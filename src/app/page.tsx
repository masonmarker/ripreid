import Navigation from '@/components/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import LifeSection from '@/components/sections/LifeSection'
import ServiceSection from '@/components/sections/ServiceSection'
import PassionsSection from '@/components/sections/PassionsSection'
import GallerySection from '@/components/sections/GallerySection'
import LegacySection from '@/components/sections/LegacySection'
import FooterSection from '@/components/sections/FooterSection'
import { getAllMedia, getMediaStats, getFriendMedia } from '@/lib/media'

export default function Home() {
  const { photos, videos, total } = getMediaStats()
  const media = getAllMedia()
  // Resolved on the server and passed down, so the gallery and the "friends"
  // tiles are present in the initial HTML. They used to be fetched from
  // /api/media by three separate client components after hydration, which meant
  // three extra round trips before anything could appear on a phone.
  const friends = getFriendMedia(2)

  return (
    <main>
      <Navigation photoCount={photos} videoCount={videos} />
      <HeroSection />
      <LifeSection friendMedia={friends[0]} />
      <ServiceSection />
      <PassionsSection friendMedia={friends[1] ?? friends[0]} />
      <GallerySection media={media} mediaCount={total} />
      <LegacySection />
      <FooterSection />
    </main>
  )
}
