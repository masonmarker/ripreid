'use client'

import { Fish, Target, Truck, Bike, Flame, TreePine, Heart, IceCream, Waves } from 'lucide-react'
import AnimatedSection from '../AnimatedSection'
import PhotoPlaceholder from '../PhotoPlaceholder'

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

export default function PassionsSection() {
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
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
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
            <PhotoPlaceholder aspectRatio="wide" label="Fishing Trip" className="h-full min-h-[300px]" />
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="grid grid-rows-2 gap-6 h-full">
              <PhotoPlaceholder aspectRatio="landscape" label="Hunting" />
              <PhotoPlaceholder aspectRatio="landscape" label="Truck" />
            </div>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <AnimatedSection delay={0.2}>
            <PhotoPlaceholder aspectRatio="square" label="Dirt Bike" />
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <PhotoPlaceholder aspectRatio="square" label="Bonfire" />
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <PhotoPlaceholder aspectRatio="square" label="Beach" />
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
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    Family & Friends
                  </h3>
                </div>
                <p className="text-forest-700 leading-relaxed text-lg mb-6">
                  Above all his adventures, Reid cherished time with his family and friends. 
                  He would do anything for anyone, and his loyalty was unwavering. His brothers 
                  Mason and Langdon weren&apos;t just siblings—they were his best friends, partners 
                  in every adventure, and the people who knew him best.
                </p>
                <p className="text-forest-700 leading-relaxed text-lg">
                  Reid&apos;s bear hugs were legendary—the kind that made you feel completely 
                  wrapped in warmth and love. He had a gift for making everyone around him 
                  feel valued and important.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <PhotoPlaceholder aspectRatio="square" label="Brothers" />
                <PhotoPlaceholder aspectRatio="square" label="Friends" />
                <PhotoPlaceholder aspectRatio="landscape" label="Family Gathering" className="col-span-2" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
