'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Mail, Camera, Video, ArrowLeft } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import Navigation from '@/components/Navigation'

const galleryMedia = [
  // Family
  { id: 1, label: 'Young Reid', category: 'family', type: 'photo' as const },
  { id: 2, label: 'With Parents', category: 'family', type: 'photo' as const },
  { id: 3, label: 'Brothers', category: 'family', type: 'photo' as const },
  { id: 4, label: 'Family Gathering', category: 'family', type: 'video' as const },
  { id: 5, label: 'Childhood Memories', category: 'family', type: 'photo' as const },
  { id: 6, label: 'Extended Family', category: 'family', type: 'photo' as const },
  { id: 7, label: 'Holiday Together', category: 'family', type: 'photo' as const },
  { id: 8, label: 'Family Portrait', category: 'family', type: 'photo' as const },
  
  // Service
  { id: 9, label: 'In Uniform', category: 'service', type: 'photo' as const },
  { id: 10, label: 'Basic Training', category: 'service', type: 'video' as const },
  { id: 11, label: 'Fort Drum', category: 'service', type: 'photo' as const },
  { id: 12, label: 'Deployment', category: 'service', type: 'photo' as const },
  { id: 13, label: 'Military Police', category: 'service', type: 'photo' as const },
  { id: 14, label: 'Award Ceremony', category: 'service', type: 'photo' as const },
  { id: 15, label: 'Service Photos', category: 'service', type: 'photo' as const },
  { id: 16, label: 'Army Life', category: 'service', type: 'video' as const },
  
  // Adventures
  { id: 17, label: 'Fishing Trip', category: 'adventures', type: 'video' as const },
  { id: 18, label: 'Hunting', category: 'adventures', type: 'photo' as const },
  { id: 19, label: 'Dirt Bike', category: 'adventures', type: 'video' as const },
  { id: 20, label: 'Truck', category: 'adventures', type: 'photo' as const },
  { id: 21, label: 'Bonfire', category: 'adventures', type: 'photo' as const },
  { id: 22, label: 'Ocean', category: 'adventures', type: 'photo' as const },
  { id: 23, label: 'Camping', category: 'adventures', type: 'photo' as const },
  { id: 24, label: 'Adventure', category: 'adventures', type: 'video' as const },
  
  // Friends
  { id: 25, label: 'Football Team', category: 'friends', type: 'photo' as const },
  { id: 26, label: 'High School', category: 'friends', type: 'photo' as const },
  { id: 27, label: 'Best Friends', category: 'friends', type: 'photo' as const },
  { id: 28, label: 'Sherando Friends', category: 'friends', type: 'photo' as const },
  { id: 29, label: 'Team Photos', category: 'friends', type: 'photo' as const },
  { id: 30, label: 'Friend Memories', category: 'friends', type: 'video' as const },
  
  // Milestones
  { id: 31, label: 'Graduation', category: 'milestones', type: 'photo' as const },
  { id: 32, label: 'Prom', category: 'milestones', type: 'photo' as const },
  { id: 33, label: 'Birthday', category: 'milestones', type: 'photo' as const },
  { id: 34, label: 'Celebration', category: 'milestones', type: 'photo' as const },
]

const categories = [
  { id: 'all', label: 'All Media', icon: Camera },
  { id: 'family', label: 'Family', icon: Camera },
  { id: 'service', label: 'Service', icon: Camera },
  { id: 'adventures', label: 'Adventures', icon: Video },
  { id: 'friends', label: 'Friends', icon: Camera },
  { id: 'milestones', label: 'Milestones', icon: Camera },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null)

  const filteredMedia = activeCategory === 'all'
    ? galleryMedia
    : galleryMedia.filter(item => item.category === activeCategory)

  const handlePrev = () => {
    if (selectedMedia === null) return
    const currentIndex = filteredMedia.findIndex(item => item.id === selectedMedia)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredMedia.length - 1
    setSelectedMedia(filteredMedia[prevIndex].id)
  }

  const handleNext = () => {
    if (selectedMedia === null) return
    const currentIndex = filteredMedia.findIndex(item => item.id === selectedMedia)
    const nextIndex = currentIndex < filteredMedia.length - 1 ? currentIndex + 1 : 0
    setSelectedMedia(filteredMedia[nextIndex].id)
  }

  return (
    <main className="bg-warmstone-50 min-h-screen">
      <Navigation />
      
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
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Complete Gallery
            </h1>
            <p className="text-warmstone-300 text-lg max-w-2xl mx-auto">
              Browse through all the photos and videos that capture Reid&apos;s life, adventures, 
              and the memories shared with family and friends.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-warmstone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
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
                    initial={{ opacity: 0, scale: 0.9 }}
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
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors duration-300" />
                      {item.type === 'video' && (
                        <div className="absolute top-2 right-2 bg-forest-900/80 rounded-full p-1">
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

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest-950/95 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              onClick={() => setSelectedMedia(null)}
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
                const selectedItem = galleryMedia.find(item => item.id === selectedMedia)
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
      <section className="py-20 bg-gradient-to-br from-forest-800 to-forest-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <div className="flex justify-center gap-3 mb-6">
                <Camera className="w-6 h-6 text-warmstone-300" />
                <Video className="w-6 h-6 text-warmstone-300" />
              </div>
              <h3
                className="text-2xl md:text-3xl font-serif text-warmstone-100 mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Share Your Memories
              </h3>
              <p className="text-warmstone-300 text-lg mb-8 max-w-xl mx-auto">
                Have a photo or video of Reid? His family would love to add your memories to this collection.
              </p>
              
              <div className="bg-forest-950/40 rounded-xl p-6 md:p-8 max-w-lg mx-auto text-left">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-warmstone-400" />
                  <span className="text-warmstone-200 font-medium">Email your photo/video to:</span>
                </div>
                <a 
                  href="mailto:mason1marker@gmail.com" 
                  className="text-xl md:text-2xl text-warmstone-100 font-medium hover:text-warmstone-300 transition-colors block mb-6"
                >
                  mason1marker@gmail.com
                </a>
                
                <p className="text-warmstone-300 mb-4">Please include:</p>
                <ul className="space-y-2 text-warmstone-300">
                  <li className="flex items-start gap-2">
                    <span className="text-warmstone-500">•</span>
                    <span><strong className="text-warmstone-200">Your name</strong> or @handle on social media</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warmstone-500">•</span>
                    <span><strong className="text-warmstone-200">A short caption</strong> about the memory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warmstone-500">•</span>
                    <span><strong className="text-warmstone-200">Where it was taken</strong> <span className="text-warmstone-500">(optional)</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
