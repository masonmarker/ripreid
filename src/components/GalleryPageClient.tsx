'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Video, ArrowLeft, Images, Heart, Shield, Compass, Users, Star } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import Navigation from '@/components/Navigation'
import FooterSection from '@/components/sections/FooterSection'
import ShareMemoryBanner from '@/components/ShareMemoryBanner'
import Lightbox from '@/components/Lightbox'
import type { MediaItem } from '@/lib/media'

const categories = [
  { id: 'all', label: 'All Media', icon: Images },
  { id: 'family', label: 'Family', icon: Heart },
  { id: 'service', label: 'Service', icon: Shield },
  { id: 'adventures', label: 'Adventures', icon: Compass },
  { id: 'friends', label: 'Friends', icon: Users },
  { id: 'milestones', label: 'Milestones', icon: Star },
]

interface GalleryPageClientProps {
  media: MediaItem[]
  photoCount: number
  videoCount: number
}

export default function GalleryPageClient({ media, photoCount, videoCount }: GalleryPageClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [mediaType, setMediaType] = useState<'all' | 'photo' | 'video'>('all')
  const [selectedMedia, setSelectedMedia] = useState<string | number | null>(null)

  // Tiles must be visible in the server HTML, so no entry animation on the
  // first render. Once mounted, re-filtering still animates normally.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const filteredMedia = media.filter(item => {
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory
    const typeMatch = mediaType === 'all' || item.type === mediaType
    return categoryMatch && typeMatch
  })

  const hasMedia = photoCount > 0 || videoCount > 0

  return (
    <main className="bg-warmstone-50 min-h-screen">
      <Navigation photoCount={photoCount} videoCount={videoCount} />
      
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
            
            <div className="flex justify-center gap-3 mb-6">
              <Camera className="w-8 h-8 text-warmstone-300" />
              <Video className="w-8 h-8 text-warmstone-300" />
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-warmstone-100 mb-4"
            >
              Complete Gallery
            </h1>
            <p className="text-warmstone-300 text-lg max-w-2xl mx-auto">
              Browse through all the photos and videos that capture Reid&apos;s life, adventures, 
              and the memories shared with family and friends.
            </p>
            
            {/* Media Count Display */}
            {hasMedia && (
              <div className="flex justify-center gap-8 mt-8">
                <div className="flex items-center gap-2 text-warmstone-300">
                  <Camera className="w-5 h-5" />
                  <span className="text-lg font-medium">{photoCount} Photos</span>
                </div>
                <div className="flex items-center gap-2 text-warmstone-300">
                  <Video className="w-5 h-5" />
                  <span className="text-lg font-medium">{videoCount} Videos</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-warmstone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => {
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
          <div className="flex justify-center gap-2">
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
              Photos Only
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
              Videos Only
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-warmstone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
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
                    onClick={() => setSelectedMedia(item.id)}
                    className="cursor-pointer group"
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <MediaPlaceholder
                        aspectRatio="square"
                        label={item.label}
                        type={item.type}
                        src={item.src}
                        sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors duration-300" />
                      {item.type === 'video' && (
                        <div className="pointer-events-none absolute top-2 right-2 bg-forest-900/80 rounded-full p-1">
                          <Video size={12} className="text-warmstone-300" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Lightbox
        items={filteredMedia}
        selectedId={selectedMedia}
        onClose={() => setSelectedMedia(null)}
        onSelect={setSelectedMedia}
      />

      {/* Submit Your Memories */}
      <section className="py-8 bg-warmstone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ShareMemoryBanner />
        </div>
      </section>
      
      <FooterSection />
    </main>
  )
}
