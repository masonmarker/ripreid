'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Camera, Video, ArrowRight, Images, Heart, Shield, Compass, Users, Star, Copy, Check, Info } from 'lucide-react'
import AnimatedSection from '../AnimatedSection'
import MediaPlaceholder from '../MediaPlaceholder'

const galleryPreview = [
  { id: 1, label: 'Family', category: 'family', type: 'photo' as const },
  { id: 2, label: 'In Uniform', category: 'service', type: 'photo' as const },
  { id: 3, label: 'Fishing Trip', category: 'adventures', type: 'video' as const },
  { id: 4, label: 'Football', category: 'friends', type: 'photo' as const },
  { id: 5, label: 'Graduation', category: 'milestones', type: 'photo' as const },
  { id: 6, label: 'Brothers', category: 'family', type: 'photo' as const },
  { id: 7, label: 'Adventure', category: 'adventures', type: 'video' as const },
  { id: 8, label: 'Best Friends', category: 'friends', type: 'photo' as const },
]

interface GallerySectionProps {
  mediaCount?: number
}

export default function GallerySection({ mediaCount = 0 }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('mason1marker@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filteredMedia = activeCategory === 'all'
    ? galleryPreview
    : galleryPreview.filter(item => item.category === activeCategory)

  const handlePrev = () => {
    if (selectedImage === null) return
    const currentIndex = filteredMedia.findIndex(item => item.id === selectedImage)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredMedia.length - 1
    setSelectedImage(filteredMedia[prevIndex].id)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    const currentIndex = filteredMedia.findIndex(item => item.id === selectedImage)
    const nextIndex = currentIndex < filteredMedia.length - 1 ? currentIndex + 1 : 0
    setSelectedImage(filteredMedia[nextIndex].id)
  }

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-warmstone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-forest-600 text-sm tracking-[0.2em] uppercase font-medium">
              Memories
            </span>
            <h2
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif text-forest-900"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Photos &amp; Videos
            </h2>
            <p className="mt-4 text-forest-700 text-lg max-w-2xl mx-auto">
              A collection of moments that capture Reid&apos;s spirit, his adventures, 
              and the love he shared with everyone around him.
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: 'all', label: 'All', icon: Images },
              { id: 'family', label: 'Family', icon: Heart },
              { id: 'service', label: 'Service', icon: Shield },
              { id: 'adventures', label: 'Adventures', icon: Compass },
              { id: 'friends', label: 'Friends', icon: Users },
              { id: 'milestones', label: 'Milestones', icon: Star },
            ].map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-forest-800 text-warmstone-50'
                      : 'bg-warmstone-200 text-forest-700 hover:bg-warmstone-300'
                  }`}
                >
                  <Icon size={16} />
                  {category.label}
                </button>
              )
            })}
          </div>
        </AnimatedSection>

        {/* Gallery Grid */}
        <AnimatedSection delay={0.2}>
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredMedia.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedImage(item.id)}
                  className="cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <MediaPlaceholder 
                      aspectRatio="square" 
                      label={item.label}
                      type={item.type}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors duration-300" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatedSection>

        {/* View Full Gallery Button */}
        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12">
            <a
              href="/gallery"
              className="inline-flex items-center gap-3 px-8 py-4 bg-forest-800 text-warmstone-50 rounded-full font-medium text-lg hover:bg-forest-700 transition-colors duration-300 group"
            >
              <span>View Full Gallery</span>
              <ArrowRight 
                size={20} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
              />
            </a>
            {mediaCount > 0 && (
              <p className="text-forest-600 text-sm mt-4">
                Browse {mediaCount} photos and videos
              </p>
            )}
          </div>
        </AnimatedSection>

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
                className="max-w-4xl w-full"
              >
                {(() => {
                  const selectedItem = galleryPreview.find(item => item.id === selectedImage)
                  return (
                    <MediaPlaceholder 
                      aspectRatio="landscape" 
                      label={selectedItem?.label || 'Media'}
                      type={selectedItem?.type || 'photo'}
                      className="w-full h-auto min-h-[400px]"
                    />
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Your Memories */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 bg-forest-800/90 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="hidden sm:flex items-center gap-2 text-warmstone-400">
                  <Camera className="w-5 h-5" />
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-warmstone-100 font-medium">Have a photo or video of Reid?</p>
                  <p className="text-warmstone-400 text-sm">Send it to his family at <span className="text-warmstone-300">mason1marker@gmail.com</span></p>
                </div>
              </div>
              <button 
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-warmstone-100 text-forest-800 rounded-full font-medium text-sm hover:bg-white transition-all whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Email
                  </>
                )}
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-warmstone-700/50 flex items-start gap-2">
              <Info className="w-4 h-4 text-warmstone-500 mt-0.5 flex-shrink-0" />
              <p className="text-warmstone-400 text-xs">
                Please include: <span className="text-warmstone-300">your name or social handle</span>, 
                <span className="text-warmstone-300"> a short caption</span> about the memory, 
                and <span className="text-warmstone-300">when/where</span> it was taken (optional)
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
