import Navigation from '@/components/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import LifeSection from '@/components/sections/LifeSection'
import ServiceSection from '@/components/sections/ServiceSection'
import PassionsSection from '@/components/sections/PassionsSection'
import GallerySection from '@/components/sections/GallerySection'
import LegacySection from '@/components/sections/LegacySection'
import FooterSection from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <LifeSection />
      <ServiceSection />
      <PassionsSection />
      <GallerySection />
      <LegacySection />
      <FooterSection />
    </main>
  )
}
