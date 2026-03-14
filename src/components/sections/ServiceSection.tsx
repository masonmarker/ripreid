'use client'

import { useState } from 'react'
import { Shield, Award, Star, Medal, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../AnimatedSection'
import MediaPlaceholder from '../MediaPlaceholder'

export default function ServiceSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  
  const serviceImages = [
    { id: 1, src: '/pictures/service/img_8809.jpeg', label: 'In Uniform', type: 'photo' as const },
    { id: 2, src: '/pictures/service/img_7629.png', label: 'Service', type: 'photo' as const },
    { id: 3, src: '/pictures/service/img_7632.png', label: 'Deployment', type: 'photo' as const },
  ]

  const handlePrev = () => {
    if (selectedImage === null) return
    const currentIndex = serviceImages.findIndex(item => item.id === selectedImage)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : serviceImages.length - 1
    setSelectedImage(serviceImages[prevIndex].id)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    const currentIndex = serviceImages.findIndex(item => item.id === selectedImage)
    const nextIndex = currentIndex < serviceImages.length - 1 ? currentIndex + 1 : 0
    setSelectedImage(serviceImages[nextIndex].id)
  }
  return (
    <section id="service" className="py-24 lg:py-32 bg-forest-900 text-warmstone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-warmstone-400 text-sm tracking-[0.2em] uppercase font-medium">
              Proud Service
            </span>
            <h2
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif text-warmstone-50"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              United States Army
            </h2>
            <p className="mt-4 text-warmstone-300 text-lg">
              E31B Military Police Officer • Fort Drum, NY • 2023-2025
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <p className="text-warmstone-200 leading-relaxed text-lg">
                Reid proudly served our country in the United States Army from 2023 to 2025, 
                stationed at Fort Drum, New York. As an E31B Military Police Officer, he 
                exemplified the values of duty, honor, and service that defined his character.
              </p>
              <p className="text-warmstone-200 leading-relaxed text-lg">
                During his distinguished service, Reid completed two deployments, demonstrating 
                exceptional courage and dedication. His commitment to excellence and his natural 
                leadership abilities earned him the respect of his fellow soldiers and superiors alike.
              </p>
              <p className="text-warmstone-200 leading-relaxed text-lg">
                Reid was soon to be promoted to Military Police Investigator (MPI), a testament 
                to his outstanding performance and potential. He was laid to rest with full 
                military honors in Arlington National Cemetery.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 cursor-pointer group" onClick={() => setSelectedImage(1)}>
                <MediaPlaceholder 
                  aspectRatio="portrait" 
                  label="In Uniform" 
                  src="/pictures/service/img_8809.jpeg" 
                  className="transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="cursor-pointer group" onClick={() => setSelectedImage(2)}>
                <MediaPlaceholder 
                  aspectRatio="square" 
                  label="Service" 
                  src="/pictures/service/img_7629.png" 
                  className="transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="cursor-pointer group" onClick={() => setSelectedImage(3)}>
                <MediaPlaceholder 
                  aspectRatio="square" 
                  label="Deployment" 
                  src="/pictures/service/img_7632.png" 
                  className="transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Award Highlight */}
        <AnimatedSection delay={0.3}>
          <div className="bg-gradient-to-br from-warmstone-900/30 to-warmstone-800/20 border border-warmstone-700/30 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                  <Medal size={48} className="text-warmstone-100" />
                </div>
              </div>
              <div className="text-center lg:text-left">
                <h3
                  className="text-2xl md:text-3xl font-serif text-warmstone-100 mb-3"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Order of Marechaussee Steel Award
                </h3>
                <p className="text-warmstone-300 text-lg leading-relaxed">
                  Awarded for professionalism, high standards of integrity and morality, 
                  and esprit de corps. This prestigious honor recognizes Reid&apos;s exceptional 
                  dedication to the Military Police Corps and his embodiment of its highest ideals.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Service Stats */}
        <AnimatedSection delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center p-6 bg-forest-800/50 rounded-xl">
              <Shield className="w-8 h-8 mx-auto mb-3 text-warmstone-400" />
              <div className="text-3xl font-serif text-warmstone-100 mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                E31B
              </div>
              <div className="text-warmstone-400 text-sm">Military Police</div>
            </div>
            <div className="text-center p-6 bg-forest-800/50 rounded-xl">
              <Star className="w-8 h-8 mx-auto mb-3 text-warmstone-400" />
              <div className="text-3xl font-serif text-warmstone-100 mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                2
              </div>
              <div className="text-warmstone-400 text-sm">Deployments</div>
            </div>
            <div className="text-center p-6 bg-forest-800/50 rounded-xl">
              <Award className="w-8 h-8 mx-auto mb-3 text-warmstone-400" />
              <div className="text-3xl font-serif text-warmstone-100 mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                MPI
              </div>
              <div className="text-warmstone-400 text-sm">Pending Promotion</div>
            </div>
            <div className="text-center p-6 bg-forest-800/50 rounded-xl">
              <Medal className="w-8 h-8 mx-auto mb-3 text-warmstone-400" />
              <div className="text-3xl font-serif text-warmstone-100 mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Steel
              </div>
              <div className="text-warmstone-400 text-sm">Marechaussee Award</div>
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
                const selectedItem = serviceImages.find(item => item.id === selectedImage)
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
