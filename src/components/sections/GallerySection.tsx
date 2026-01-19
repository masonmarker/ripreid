'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import AnimatedSection from '../AnimatedSection'
import PhotoPlaceholder from '../PhotoPlaceholder'

const galleryImages = [
  { id: 1, label: 'Portrait', category: 'portraits' },
  { id: 2, label: 'Family', category: 'family' },
  { id: 3, label: 'Army', category: 'service' },
  { id: 4, label: 'Football', category: 'sports' },
  { id: 5, label: 'Outdoors', category: 'adventures' },
  { id: 6, label: 'Friends', category: 'friends' },
  { id: 7, label: 'Brothers', category: 'family' },
  { id: 8, label: 'Graduation', category: 'milestones' },
  { id: 9, label: 'Fishing', category: 'adventures' },
  { id: 10, label: 'Uniform', category: 'service' },
  { id: 11, label: 'Smile', category: 'portraits' },
  { id: 12, label: 'Adventure', category: 'adventures' },
]

const categories = [
  { id: 'all', label: 'All Photos' },
  { id: 'portraits', label: 'Portraits' },
  { id: 'family', label: 'Family' },
  { id: 'service', label: 'Service' },
  { id: 'adventures', label: 'Adventures' },
  { id: 'friends', label: 'Friends' },
]

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  const handlePrev = () => {
    if (selectedImage === null) return
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    setSelectedImage(filteredImages[prevIndex].id)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
    const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    setSelectedImage(filteredImages[nextIndex].id)
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
              Photo Gallery
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
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-forest-800 text-warmstone-50'
                    : 'bg-warmstone-200 text-forest-700 hover:bg-warmstone-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Gallery Grid */}
        <AnimatedSection delay={0.2}>
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedImage(image.id)}
                  className="cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <PhotoPlaceholder 
                      aspectRatio="square" 
                      label={image.label}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors duration-300" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
                <PhotoPlaceholder 
                  aspectRatio="landscape" 
                  label={galleryImages.find(img => img.id === selectedImage)?.label || 'Photo'}
                  className="w-full h-auto min-h-[400px]"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
