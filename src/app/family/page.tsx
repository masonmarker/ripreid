import Navigation from '@/components/Navigation'
import FooterSection from '@/components/sections/FooterSection'
import FamilyPageClient from '@/components/FamilyPageClient'
import { getMediaCounts } from '@/lib/mediaCount'

export default function FamilyPage() {
  const { photos, videos } = getMediaCounts()
  
  return (
    <main className="bg-warmstone-50 min-h-screen">
      <Navigation photoCount={photos} videoCount={videos} />
      <FamilyPageClient />
      <FooterSection />
    </main>
  )
}
