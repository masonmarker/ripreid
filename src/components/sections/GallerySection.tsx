'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Images, Heart, Shield, Compass, Users, Star } from 'lucide-react'
import AnimatedSection from '../AnimatedSection'
import MediaPlaceholder from '../MediaPlaceholder'
import ShareMemoryBanner from '../ShareMemoryBanner'
import Lightbox from '../Lightbox'
import type { MediaItem } from '@/lib/media'

interface GallerySectionProps {
  media: MediaItem[]
  mediaCount?: number
}

export default function GallerySection({ media, mediaCount = 0 }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<string | number | null>(null)

  // Tiles must be visible in the server HTML, so no entry animation on the
  // first render. Once mounted, re-filtering still animates normally.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Media now arrives as a prop from the server, so the grid is in the initial
  // HTML. This section used to render only "Loading gallery..." until a
  // client-side fetch resolved, which on a phone meant a blank slab of page.
  const previewMedia = media.slice(0, 8)
  const filteredMedia = activeCategory === 'all'
    ? previewMedia
    : previewMedia.filter(item => item.category === activeCategory)

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
                  initial={mounted ? { opacity: 0, scale: 0.9 } : false}
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
                      src={item.src}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors duration-300" />
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

        <Lightbox
          items={filteredMedia}
          selectedId={selectedImage}
          onClose={() => setSelectedImage(null)}
          onSelect={setSelectedImage}
        />

        {/* Submit Your Memories */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16">
            <ShareMemoryBanner />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
