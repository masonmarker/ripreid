'use client'

import { useState } from 'react'
import { Fish, Target, Truck, Bike, Flame, TreePine, Heart, IceCream, Waves } from 'lucide-react'
import AnimatedSection from '../AnimatedSection'
import MediaPlaceholder from '../MediaPlaceholder'
import Lightbox from '../Lightbox'
import type { MediaItem } from '@/lib/media'

const passions = [
  { icon: Fish, label: 'Fishing', description: 'Peaceful mornings on the water' },
  { icon: Target, label: 'Hunting', description: 'Connecting with nature' },
  { icon: Truck, label: 'Trucks', description: 'The bigger, the better' },
  { icon: Bike, label: 'Dirt Bikes', description: 'Adventure on two wheels' },
  { icon: Flame, label: 'Bonfires', description: 'Stories under the stars' },
  { icon: TreePine, label: 'Outdoors', description: 'His natural habitat' },
  { icon: IceCream, label: 'Ice Cream', description: 'A simple joy' },
  { icon: Waves, label: 'The Ocean', description: 'Endless horizons' },
]

interface PassionsSectionProps {
  friendMedia?: MediaItem
}

export default function PassionsSection({ friendMedia }: PassionsSectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | number | null>(null)
  
  const passionsImages = [
    { id: 1, src: '/pictures/adventures/fishing_trip.png', label: 'Fishing Trip', type: 'photo' as const },
    { id: 2, src: '/pictures/adventures/hunting.png', label: 'Hunting', type: 'photo' as const },
    { id: 3, src: '/pictures/service/img_8332.png', label: 'Truck', type: 'photo' as const },
    { id: 4, src: '/pictures/adventures/img_8748.png', label: 'Dirt Bike', type: 'photo' as const },
    { id: 5, src: '/videos/adventures/82a4be7b-9559-4fb9-91b3-3a31a1c239b7.mp4', label: 'Bonfire', type: 'video' as const },
    { id: 6, src: '/videos/friends/img_1252.mp4', label: 'Lake', type: 'video' as const },
    { id: 7, src: '/pictures/family/brothers.jpg', label: 'Brothers', type: 'photo' as const },
    { id: 8, src: friendMedia?.src, label: friendMedia?.label || 'Friends', type: friendMedia?.type || 'photo' as const },
    { id: 9, src: '/videos/family/23278d23-5c43-4429-9cf6-647ec4b80a7a.mp4', label: 'Family Gathering', type: 'video' as const },
  ]

  return (
    <section id="passions" className="py-24 lg:py-32 bg-warmstone-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-forest-600 text-sm tracking-[0.2em] uppercase font-medium">
              What He Loved
            </span>
            <h2
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif text-forest-900"
            >
              His Passions
            </h2>
            <p className="mt-4 text-forest-700 text-lg max-w-2xl mx-auto">
              Reid lived life to the fullest, embracing every adventure and finding joy 
              in the simple pleasures of the outdoors.
            </p>
          </div>
        </AnimatedSection>

        {/* Passions Grid */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
            {passions.map((passion, index) => (
              <div
                key={passion.label}
                className="group bg-warmstone-50 rounded-xl p-6 text-center hover:bg-forest-800 hover:text-warmstone-50 transition-all duration-500 cursor-default"
              >
                <passion.icon className="w-10 h-10 mx-auto mb-4 text-forest-600 group-hover:text-warmstone-300 transition-colors duration-500" />
                <h3 className="font-medium text-forest-800 group-hover:text-warmstone-50 transition-colors duration-500 mb-1">
                  {passion.label}
                </h3>
                <p className="text-sm text-forest-600 group-hover:text-warmstone-300 transition-colors duration-500">
                  {passion.description}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Photo Gallery for Passions */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          <AnimatedSection delay={0.2} className="lg:col-span-2">
            <div className="cursor-pointer group" onClick={() => setSelectedImage(1)}>
              <MediaPlaceholder aspectRatio="wide" label="Fishing Trip" src="/pictures/adventures/fishing_trip.png" className="h-full min-h-[300px]" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="grid grid-rows-2 gap-6 h-full">
              <div className="cursor-pointer group" onClick={() => setSelectedImage(2)}>
                <MediaPlaceholder aspectRatio="landscape" label="Hunting" src="/pictures/adventures/hunting.png" />
              </div>
              <div className="cursor-pointer group" onClick={() => setSelectedImage(3)}>
                <MediaPlaceholder aspectRatio="landscape" label="Truck" src="/pictures/service/img_8332.png" />
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <AnimatedSection delay={0.2}>
            <div className="cursor-pointer group" onClick={() => setSelectedImage(4)}>
              <MediaPlaceholder aspectRatio="square" label="Dirt Bike" src="/pictures/adventures/img_8748.png" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="cursor-pointer group" onClick={() => setSelectedImage(5)}>
              <MediaPlaceholder aspectRatio="square" label="Bonfire" src="/videos/adventures/82a4be7b-9559-4fb9-91b3-3a31a1c239b7.mp4" type="video" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <div className="cursor-pointer group" onClick={() => setSelectedImage(6)}>
              <MediaPlaceholder aspectRatio="square" label="Lake" src="/videos/friends/img_1252.mp4" type="video" />
            </div>
          </AnimatedSection>
        </div>

        {/* Family & Friends */}
        <AnimatedSection delay={0.3}>
          <div className="bg-warmstone-50 rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-6 h-6 text-ember-500" />
                  <h3
                    className="text-2xl md:text-3xl font-serif text-forest-800"
                  >
                    Family & Friends
                  </h3>
                </div>
                <p className="text-forest-700 leading-relaxed text-lg mb-6">
                  Above all his adventures, Reid cherished time with his family and friends. 
                  He would do anything for anyone, and his loyalty was unwavering. His brothers 
                  Mason and Langdon weren&apos;t just siblings, they were his best friends, partners 
                  in every adventure, and the people who knew him best.
                </p>
                <p className="text-forest-700 leading-relaxed text-lg">
                  Reid&apos;s bear hugs were legendary, the kind that made you feel completely 
                  wrapped in warmth and love. He had a gift for making everyone around him 
                  feel valued and important.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="cursor-pointer group" onClick={() => setSelectedImage(7)}>
                  <MediaPlaceholder aspectRatio="square" label="Brothers" src="/pictures/family/brothers.jpg" />
                </div>
                <div className="cursor-pointer group" onClick={() => setSelectedImage(8)}>
                  <MediaPlaceholder
                    aspectRatio="square"
                    label={friendMedia?.label || "Friends"}
                    src={friendMedia?.src}
                    type={friendMedia?.type || "photo"}
                  />
                </div>
                <div className="cursor-pointer group col-span-2" onClick={() => setSelectedImage(9)}>
                  <MediaPlaceholder aspectRatio="landscape" label="Family Gathering" src="/videos/family/23278d23-5c43-4429-9cf6-647ec4b80a7a.mp4" type="video" />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      <Lightbox
        items={passionsImages}
        selectedId={selectedImage}
        onClose={() => setSelectedImage(null)}
        onSelect={setSelectedImage}
      />
    </section>
  )
}
