'use client'

import { Shield, Award, Star, Medal } from 'lucide-react'
import AnimatedSection from '../AnimatedSection'
import MediaPlaceholder from '../MediaPlaceholder'

export default function ServiceSection() {
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
                to his outstanding performance and potential. He will be laid to rest with full 
                military honors in Arlington National Cemetery.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <MediaPlaceholder aspectRatio="portrait" label="In Uniform" className="col-span-2" />
              <MediaPlaceholder aspectRatio="square" label="Service" />
              <MediaPlaceholder aspectRatio="square" label="Deployment" />
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
    </section>
  )
}
