'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Images, Heart, Shield, Compass, Users, Camera, Video } from 'lucide-react'
import AnimatedSection from '../AnimatedSection'
import MediaPlaceholder from '../MediaPlaceholder'
import ShareMemoryBanner from '../ShareMemoryBanner'
import Lightbox from '../Lightbox'
import type { MediaItem } from '@/lib/media'

interface GallerySectionProps {
  media: MediaItem[]
  mediaCount?: number
}

const PREVIEW_COUNT = 8

// Round-robin across category+type buckets. getAllMedia groups items by
// category with all photos before all videos, so a plain slice would show
// only family photos.
function interleaveMedia(media: MediaItem[]): MediaItem[] {
  const buckets = new Map<string, MediaItem[]>()
  for (const item of media) {
    const key = `${item.category}:${item.type}`
    const bucket = buckets.get(key)
    if (bucket) bucket.push(item)
    else buckets.set(key, [item])
  }
  const queues = [...buckets.values()]
  const out: MediaItem[] = []
  for (let i = 0; queues.some((q) => i < q.length); i++) {
    for (const q of queues) {
      if (i < q.length) out.push(q[i])
    }
  }
  return out
}

export default function GallerySection({ media, mediaCount = 0 }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [mediaType, setMediaType] = useState<'all' | 'photo' | 'video'>('all')
  const [selectedImage, setSelectedImage] = useState<string | number | null>(null)

  // Tiles must be visible in the server HTML, so no entry animation on the
  // first render. Once mounted, re-filtering still animates normally.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Media now arrives as a prop from the server, so the grid is in the initial
  // HTML. This section used to render only "Loading gallery..." until a
  // client-side fetch resolved, which on a phone meant a blank slab of page.
  // Filter first, then cap at the preview count — slicing before filtering
  // stranded every category except the first one on disk.
  const filteredMedia = (activeCategory === 'all'
    ? interleaveMedia(media)
    : media.filter(item => item.category === activeCategory)
  ).filter(item => mediaType === 'all' || item.type === mediaType)
   .slice(0, PREVIEW_COUNT)

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
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {[
              { id: 'all', label: 'All', icon: Images },
              { id: 'family', label: 'Family', icon: Heart },
              { id: 'service', label: 'Service', icon: Shield },
              { id: 'adventures', label: 'Adventures', icon: Compass },
              { id: 'friends', label: 'Friends', icon: Users },
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

          {/* Media Type Filters */}
          <div className="flex justify-center gap-2 mb-12">
            <button
              onClick={() => setMediaType('all')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                mediaType === 'all'
                  ? 'bg-ember-600 text-warmstone-50'
                  : 'bg-warmstone-100 text-forest-600 hover:bg-warmstone-200'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setMediaType('photo')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                mediaType === 'photo'
                  ? 'bg-ember-600 text-warmstone-50'
                  : 'bg-warmstone-100 text-forest-600 hover:bg-warmstone-200'
              }`}
            >
              <Camera size={14} />
              Photos
            </button>
            <button
              onClick={() => setMediaType('video')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                mediaType === 'video'
                  ? 'bg-ember-600 text-warmstone-50'
                  : 'bg-warmstone-100 text-forest-600 hover:bg-warmstone-200'
              }`}
            >
              <Video size={14} />
              Videos
            </button>
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
