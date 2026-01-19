'use client'

import AnimatedSection from '../AnimatedSection'
import MediaPlaceholder from '../MediaPlaceholder'

export default function LifeSection() {
  return (
    <section id="life" className="py-24 lg:py-32 bg-warmstone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-forest-600 text-sm tracking-[0.2em] uppercase font-medium">
              His Story
            </span>
            <h2
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif text-forest-900"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              A Life Well Lived
            </h2>
          </div>
        </AnimatedSection>

        {/* Early Life */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <h3
                className="text-2xl md:text-3xl font-serif text-forest-800"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                The Beginning
              </h3>
              <p className="text-forest-700 leading-relaxed text-lg">
                Reid Wesley Marker was born in 2005 to David Edward Marker and Brooke Nicole Blackwell 
                in Winchester, Virginia. From his earliest days, Reid showed the qualities that would 
                define him throughout his life—a warm spirit, an easy laugh, and a heart that drew 
                people to him naturally.
              </p>
              <p className="text-forest-700 leading-relaxed text-lg">
                Growing up in the Shenandoah Valley, Reid developed a deep love for the outdoors 
                that would stay with him forever. The rolling hills and open spaces of Virginia 
                became the backdrop for countless adventures with his brothers Mason and Langdon, 
                who weren&apos;t just siblings but his best friends.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <MediaPlaceholder aspectRatio="portrait" label="Young Reid" className="col-span-1" />
              <div className="space-y-4">
                <MediaPlaceholder aspectRatio="square" label="Family" />
                <MediaPlaceholder aspectRatio="square" label="Childhood" />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Family */}
        <div className="mb-24">
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-12">
              <h3
                className="text-2xl md:text-3xl font-serif text-forest-800"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                His Family
              </h3>
              <p className="mt-4 text-forest-700 text-lg max-w-2xl mx-auto">
                Reid was the middle of three brothers, surrounded by a loving family who meant everything to him.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Parents */}
              <div className="text-center">
                <MediaPlaceholder aspectRatio="square" label="Dad" className="mb-3" />
                <h4 className="font-medium text-forest-800">David Marker</h4>
                <p className="text-forest-600 text-sm">Father</p>
              </div>
              <div className="text-center">
                <MediaPlaceholder aspectRatio="square" label="Mom" className="mb-3" />
                <h4 className="font-medium text-forest-800">Brooke Blackwell</h4>
                <p className="text-forest-600 text-sm">Mother</p>
              </div>
              {/* Brothers */}
              <div className="text-center">
                <MediaPlaceholder aspectRatio="square" label="Mason" className="mb-3" />
                <h4 className="font-medium text-forest-800">Mason Marker</h4>
                <p className="text-forest-600 text-sm">Older Brother</p>
              </div>
              <div className="text-center">
                <MediaPlaceholder aspectRatio="square" label="Langdon" className="mb-3" />
                <h4 className="font-medium text-forest-800">Langdon Marker</h4>
                <p className="text-forest-600 text-sm">Younger Brother</p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* High School Years */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <AnimatedSection delay={0.1} className="order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-4">
              <MediaPlaceholder aspectRatio="square" label="Football" />
              <MediaPlaceholder aspectRatio="square" label="Friends" />
              <MediaPlaceholder aspectRatio="square" label="School" />
              <MediaPlaceholder aspectRatio="landscape" label="Team Photo" className="col-span-3" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="order-1 lg:order-2">
            <div className="space-y-6">
              <h3
                className="text-2xl md:text-3xl font-serif text-forest-800"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Sherando High School
              </h3>
              <p className="text-forest-700 leading-relaxed text-lg">
                As a student at Sherando High School, Reid was known as the life of the party. 
                He played football with the same passion and dedication he brought to everything 
                in his life. His teammates weren&apos;t just fellow players—they became lifelong friends 
                who knew they could always count on Reid.
              </p>
              <p className="text-forest-700 leading-relaxed text-lg">
                Reid graduated in 2023, leaving behind a legacy of friendship and joy that still 
                echoes through the halls. He never met a stranger, and his ability to make everyone 
                feel welcome and valued made him unforgettable to all who crossed his path.
              </p>
              <div className="pt-4">
                <span className="inline-block px-4 py-2 bg-forest-100 text-forest-700 rounded-full text-sm font-medium">
                  Class of 2023
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Quote Block */}
        <AnimatedSection>
          <div className="bg-gradient-to-br from-forest-800 to-forest-900 rounded-2xl p-8 md:p-12 lg:p-16 text-center">
            <blockquote
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-warmstone-100 leading-relaxed"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              &ldquo;Forge your own path.&rdquo;
            </blockquote>
            <p className="mt-6 text-warmstone-400 text-lg">— Reid</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
