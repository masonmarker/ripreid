'use client'

import { useState } from 'react'
import { Cross, Heart, Users, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../AnimatedSection'
import MediaPlaceholder from '../MediaPlaceholder'
import TributeVideo from '../TributeVideo'

const familyMembers = [
  { relation: 'Parents', names: 'David Edward Marker & Brooke Nicole Blackwell' },
  { relation: 'Brothers', names: 'Mason David Marker & Langdon Blackwell Marker' },
  { relation: 'Maternal Grandparents', names: 'Dickie & Rita Blackwell' },
  { relation: 'Paternal Grandparents', names: 'Barrie & Dolores Marker' },
]

export default function LegacySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  
  const legacyImages = [
    { id: 1, src: '/pictures/family/with-parents.jpg', label: 'With Parents', type: 'photo' as const },
    { id: 2, src: '/pictures/family/brothers.jpg', label: 'Brothers', type: 'photo' as const },
    { id: 3, src: '/pictures/family/extended-family.jpg', label: 'Extended Family', type: 'photo' as const },
  ]

  const handlePrev = () => {
    if (selectedImage === null) return
    const currentIndex = legacyImages.findIndex(item => item.id === selectedImage)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : legacyImages.length - 1
    setSelectedImage(legacyImages[prevIndex].id)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    const currentIndex = legacyImages.findIndex(item => item.id === selectedImage)
    const nextIndex = currentIndex < legacyImages.length - 1 ? currentIndex + 1 : 0
    setSelectedImage(legacyImages[nextIndex].id)
  }
  return (
    <section id="legacy" className="py-24 lg:py-32 bg-gradient-to-b from-warmstone-100 to-warmstone-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-forest-600 text-sm tracking-[0.2em] uppercase font-medium">
              Forever Remembered
            </span>
            <h2
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif text-forest-900"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              His Legacy
            </h2>
          </div>
        </AnimatedSection>

        {/* Faith Section */}
        <AnimatedSection delay={0.1}>
          <div className="bg-warmstone-50 rounded-2xl p-8 md:p-12 mb-12 text-center">
            <Cross className="w-12 h-12 mx-auto mb-6 text-forest-600" />
            <h3
              className="text-2xl md:text-3xl font-serif text-forest-800 mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              A Deep Faith
            </h3>
            <p className="text-forest-700 leading-relaxed text-lg max-w-3xl mx-auto">
              Above all else, Reid had a very deep faith and love for Jesus. His faith was the 
              foundation of who he was, it guided his actions, shaped his character, and gave him 
              the strength and gentleness that defined him. Reid now rests in eternal peace, 
              reunited with his beloved childhood dog, Jack-Jack.
            </p>
          </div>
        </AnimatedSection>

        {/* Family */}
        <AnimatedSection delay={0.2}>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-forest-600" />
                <h3
                  className="text-2xl md:text-3xl font-serif text-forest-800"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Survived By
                </h3>
              </div>
              <div className="space-y-4">
                {familyMembers.map((member) => (
                  <div key={member.relation} className="bg-warmstone-50 rounded-lg p-4">
                    <span className="text-forest-600 text-sm font-medium">{member.relation}</span>
                    <p className="text-forest-800 font-medium mt-1">{member.names}</p>
                  </div>
                ))}
                <p className="text-forest-700 italic mt-4">
                  Along with loving aunts, uncles, and cousins.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="cursor-pointer group" onClick={() => setSelectedImage(1)}>
                <MediaPlaceholder aspectRatio="square" label="With Parents" className="transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="cursor-pointer group" onClick={() => setSelectedImage(2)}>
                <MediaPlaceholder aspectRatio="square" label="Brothers" className="transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="cursor-pointer group col-span-2" onClick={() => setSelectedImage(3)}>
                <MediaPlaceholder aspectRatio="landscape" label="Extended Family" className="transition-transform duration-500 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Tribute Video Slideshow */}
        <AnimatedSection delay={0.35}>
          <div className="bg-gradient-to-br from-forest-800 to-forest-900 rounded-2xl p-8 md:p-12 lg:p-16 text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-ember-500" />
              <h3 
                className="text-2xl md:text-3xl font-serif text-warmstone-100"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                A Life Well Lived
              </h3>
              <Heart className="w-6 h-6 text-ember-500" />
            </div>
            <p className="text-warmstone-300 text-lg mb-8 max-w-2xl mx-auto">
              Join us in celebrating Reid&apos;s life through countless memories!
            </p>
            <div className="relative w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-2xl">
              <div className="aspect-video" id="tribute-video-container">
                <TributeVideo />
              </div>
            </div>
            <p className="text-warmstone-400 text-sm mt-4 italic">
              A tribute filled with laughter, adventure, and the joy Reid brought to everyone around him.
            </p>
          </div>
        </AnimatedSection>

        {/* Quote */}
        <AnimatedSection delay={0.3}>
          <div className="bg-forest-800 rounded-2xl p-8 md:p-12 lg:p-16 text-center mb-16">
            <blockquote
              className="text-2xl md:text-3xl lg:text-4xl font-serif text-warmstone-100 leading-relaxed mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              &ldquo;Reid leaves behind a legacy of joy and laughter as he always lived life to the fullest.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-2 text-warmstone-300">
              <Heart className="w-5 h-5" />
              <span className="text-sm tracking-wide">Forever in our hearts</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Memorial Info */}
        <AnimatedSection delay={0.4}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-warmstone-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-forest-600" />
                <h4 className="font-medium text-forest-800">Final Resting Place</h4>
              </div>
              <p className="text-forest-700 leading-relaxed">
                Reid was laid to rest with full military honors at 
                <strong> Arlington National Cemetery</strong>, a fitting tribute to his 
                dedicated service to our country. He was buried in section <strong>36:804</strong>
              </p>
            </div>
            <div className="bg-warmstone-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-5 h-5 text-forest-600" />
                <h4 className="font-medium text-forest-800">Memorial Contributions</h4>
              </div>
              <p className="text-forest-700 leading-relaxed">
                In Reid&apos;s honor, contributions may be made payable to:<br />
                <strong>Sherando High School</strong><br />
                <em>Memo: Reid W. Marker, Army Scholarship Fund</em>
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest-950/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-warmstone-300 hover:text-warmstone-100 transition-colors"
            >
              <X size={32} />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 md:left-8 text-warmstone-300 hover:text-warmstone-100 transition-colors"
            >
              <ChevronLeft size={40} />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 md:right-8 text-warmstone-300 hover:text-warmstone-100 transition-colors"
            >
              <ChevronRight size={40} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              {(() => {
                const selectedItem = legacyImages.find(item => item.id === selectedImage)
                return (
                  <img
                    src={selectedItem?.src}
                    alt={selectedItem?.label}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
