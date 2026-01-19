import Navigation from '@/components/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import LifeSection from '@/components/sections/LifeSection'
import ServiceSection from '@/components/sections/ServiceSection'
import PassionsSection from '@/components/sections/PassionsSection'
import GallerySection from '@/components/sections/GallerySection'
import LegacySection from '@/components/sections/LegacySection'
import FooterSection from '@/components/sections/FooterSection'
import { getMediaCounts } from '@/lib/mediaCount'

export default function Home() {
  const { photos, videos, total } = getMediaCounts()
  
  return (
    <main>
      <Navigation photoCount={photos} videoCount={videos} />
      <HeroSection />
      <LifeSection />
      <ServiceSection />
      <PassionsSection />
      <GallerySection mediaCount={total} />
      <LegacySection />
      <FooterSection />
    </main>
  )
}
