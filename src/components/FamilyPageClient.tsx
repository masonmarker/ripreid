'use client'

import { ArrowLeft, Heart } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import MediaPlaceholder from '@/components/MediaPlaceholder'

const familyMembers = [
  {
    id: 'david',
    name: 'David Marker',
    role: 'Father',
    description: 'Reid\'s father, David Edward Marker, was a constant source of strength and guidance in Reid\'s life. Their bond was built on shared adventures, life lessons, and unconditional love.',
  },
  {
    id: 'brooke',
    name: 'Brooke Blackwell',
    role: 'Mother',
    description: 'Brooke Nicole Blackwell, Reid\'s mother, nurtured his warm spirit and kind heart. Her love and support helped shape the remarkable young man Reid became.',
  },
  {
    id: 'mason',
    name: 'Mason Marker',
    role: 'Older Brother',
    description: 'Mason, Reid\'s older brother, shared countless adventures and memories with him. Their brotherhood went beyond blood, they were best friends who looked out for each other through everything.',
  },
  {
    id: 'langdon',
    name: 'Langdon Marker',
    role: 'Younger Brother',
    description: 'Langdon, the youngest of the three brothers, looked up to Reid. Their bond was filled with laughter, playful rivalry, and the kind of love that only brothers understand.',
  },
]

export default function FamilyPageClient() {
  return (
    <>
      {/* Header */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-forest-900 to-forest-800 text-warmstone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-warmstone-400 hover:text-warmstone-300 transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </a>
            
            <div className="flex justify-center mb-6">
              <Heart className="w-8 h-8 text-warmstone-300" />
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-warmstone-100 mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Reid&apos;s Family
            </h1>
            <p className="text-warmstone-300 text-lg max-w-2xl mx-auto">
              The people who loved him most and shaped the incredible person he became.
              <br /><br />
              <span className="text-warmstone-200 font-medium">
                David, Brooke, Mason, and Langdon
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Family Introduction */}
      <section className="py-16 bg-warmstone-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <p className="text-forest-700 text-lg leading-relaxed">
                Reid was the middle of three brothers, born to David and Brooke in Winchester, Virginia. 
                Family was everything to Reid, his parents provided the foundation of love and values that 
                guided him, while his brothers Mason and Langdon were not just siblings but his closest 
                friends and partners in every adventure.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Reid with Family Photos */}
      <section className="py-16 bg-warmstone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-4xl font-serif text-forest-800 mb-8 text-center"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Reid with His Family
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MediaPlaceholder aspectRatio="square" label="Reid with Family" src="/pictures/family/img_5867.jpg" />
              <MediaPlaceholder aspectRatio="square" label="Family Time" />
              <MediaPlaceholder aspectRatio="square" label="Together" />
              <MediaPlaceholder aspectRatio="square" label="Home" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Brothers Section */}
      <section className="py-20 bg-warmstone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-serif text-forest-800 mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                The Three Brothers
              </h2>
              <p className="text-forest-700 text-lg max-w-2xl mx-auto">
                Mason, Reid, and Langdon, inseparable brothers who shared a bond that went beyond words.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MediaPlaceholder aspectRatio="portrait" label="Mason" />
              <MediaPlaceholder aspectRatio="portrait" label="Reid" />
              <MediaPlaceholder aspectRatio="portrait" label="Langdon" />
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.3}>
            <div className="mt-12 bg-forest-800 rounded-2xl p-8 md:p-12 text-center">
              <blockquote
                className="text-2xl md:text-3xl font-serif text-warmstone-100 leading-relaxed mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                &ldquo;Proverbs 27:17&rdquo;
              </blockquote>
              <p className="text-warmstone-400">
                <i>"As iron sharpens iron, so one person sharpens another"</i>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Family Photos Grid */}
      <section className="py-16 bg-warmstone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-4xl font-serif text-forest-800 mb-8 text-center"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Family Moments
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MediaPlaceholder aspectRatio="square" label="Family Gathering" />
              <MediaPlaceholder aspectRatio="square" label="Holiday" />
              <MediaPlaceholder aspectRatio="square" label="Celebration" />
              <MediaPlaceholder aspectRatio="square" label="Together" />
              <MediaPlaceholder aspectRatio="landscape" label="Family Portrait" className="col-span-2" />
              <MediaPlaceholder aspectRatio="landscape" label="Brothers Adventure" className="col-span-2" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
