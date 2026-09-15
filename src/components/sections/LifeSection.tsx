'use client'

import { useState } from 'react'
import AnimatedSection from '../AnimatedSection'
import MediaPlaceholder from '../MediaPlaceholder'
import Lightbox from '../Lightbox'
import type { MediaItem } from '@/lib/media'

interface LifeSectionProps {
  friendMedia?: MediaItem
}

export default function LifeSection({ friendMedia }: LifeSectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | number | null>(null)

  const lifeImages = [
    { id: 1, src: '/pictures/family/young_reid.png', label: 'Young Reid', type: 'photo' as const },
    { id: 2, src: '/pictures/adventures/reid_fishing.jpg', label: 'Fishing', type: 'photo' as const },
    { id: 3, src: '/pictures/family/childhood.png', label: 'Childhood', type: 'photo' as const },
    { id: 4, src: '/pictures/family/img_5867.jpg', label: 'Reid with Family', type: 'photo' as const },
    { id: 5, src: '/pictures/family/reid_and_mom.jpg', label: 'Family Time', type: 'photo' as const },
    { id: 6, src: '/pictures/adventures/fishing_trip.png', label: 'Together', type: 'photo' as const },
    { id: 7, src: '/pictures/family/home.jpg', label: 'Home', type: 'photo' as const },
    { id: 8, src: '/pictures/friends/football.jpg', label: 'Football', type: 'photo' as const },
    { id: 9, src: friendMedia?.src, label: friendMedia?.label || 'Friends', type: friendMedia?.type || 'photo' as const },
    { id: 10, src: '/pictures/friends/school.png', label: 'School', type: 'photo' as const },
    { id: 11, src: '/pictures/friends/img_7042.jpg', label: 'Team Photo', type: 'photo' as const },
  ]

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
              >
                The Beginning
              </h3>
              <p className="text-forest-700 leading-relaxed text-lg">
                Reid Wesley Marker was born in 2005 to David Edward Marker and
                Brooke Nicole Blackwell in Winchester, Virginia. From his
                earliest days, Reid showed the qualities that would define him
                throughout his life, a warm spirit, an easy laugh, and a heart
                that drew people to him naturally.
              </p>
              <p className="text-forest-700 leading-relaxed text-lg">
                Growing up in the Shenandoah Valley, Reid developed a deep love
                for the outdoors that would stay with him forever. The rolling
                hills and open spaces of Virginia became the backdrop for
                countless adventures with his brothers Mason and Langdon, who
                weren&apos;t just siblings but his best friends.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <div className="cursor-pointer group" onClick={() => setSelectedImage(1)}>
                <MediaPlaceholder
                  aspectRatio="portrait"
                  label="Young Reid"
                  src="/pictures/family/young_reid.png"
                  className="col-span-1"
                />
              </div>
              <div className="space-y-4">
                <div className="cursor-pointer group" onClick={() => setSelectedImage(2)}>
                  <MediaPlaceholder aspectRatio="square" label="Fishing" src="/pictures/adventures/reid_fishing.jpg" />
                </div>
                <div className="cursor-pointer group" onClick={() => setSelectedImage(3)}>
                  <MediaPlaceholder aspectRatio="square" label="Childhood" src="/pictures/family/childhood.png" />
                </div>
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
              >
                His Family
              </h3>
              <p className="mt-4 text-forest-700 text-lg max-w-2xl mx-auto">
                Reid was the middle of three brothers, surrounded by a loving
                family who meant everything to him.
                <br /><br />
                <span className="text-forest-600 font-medium">
                  David, Brooke, Mason, and Langdon
                </span>
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="cursor-pointer group" onClick={() => setSelectedImage(4)}>
                <MediaPlaceholder aspectRatio="square" label="Reid with Family" src="/pictures/family/img_5867.jpg" />
              </div>
              <div className="cursor-pointer group" onClick={() => setSelectedImage(5)}>
                <MediaPlaceholder aspectRatio="square" label="Family Time" src="/pictures/family/reid_and_mom.jpg" />
              </div>
              <div className="cursor-pointer group" onClick={() => setSelectedImage(6)}>
                <MediaPlaceholder aspectRatio="square" label="Together" src="/pictures/adventures/fishing_trip.png" />
              </div>
              <div className="cursor-pointer group" onClick={() => setSelectedImage(7)}>
                <MediaPlaceholder aspectRatio="square" label="Home" src="/pictures/family/home.jpg" />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* High School Years */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <AnimatedSection delay={0.1} className="order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-4">
              <div className="cursor-pointer group" onClick={() => setSelectedImage(8)}>
                <MediaPlaceholder aspectRatio="square" label="Football" src="/pictures/friends/football.jpg" />
              </div>
              <div className="cursor-pointer group" onClick={() => setSelectedImage(9)}>
                <MediaPlaceholder
                  aspectRatio="square"
                  label={friendMedia?.label || "Friends"}
                  src={friendMedia?.src}
                  type={friendMedia?.type || "photo"}
                />
              </div>
              <div className="cursor-pointer group" onClick={() => setSelectedImage(10)}>
                <MediaPlaceholder aspectRatio="square" label="School" src="/pictures/friends/school.png" />
              </div>
              <div className="cursor-pointer group col-span-3" onClick={() => setSelectedImage(11)}>
                <MediaPlaceholder
                  aspectRatio="landscape"
                  label="Team Photo"
                  src="/pictures/friends/img_7042.jpg"
                 
                />
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="order-1 lg:order-2">
            <div className="space-y-6">
              <h3
                className="text-2xl md:text-3xl font-serif text-forest-800"
              >
                Sherando High School
              </h3>
              <p className="text-forest-700 leading-relaxed text-lg">
                As a student at Sherando High School, Reid was known as the life
                of the party. He played football with the same passion and
                dedication he brought to everything in his life. His teammates
                weren&apos;t just fellow players, they became lifelong friends
                who knew they could always count on Reid.
              </p>
              <p className="text-forest-700 leading-relaxed text-lg">
                Reid graduated in 2023, leaving behind a legacy of friendship
                and joy that still echoes through the halls. He never met a
                stranger, and his ability to make everyone feel welcome and
                valued made him unforgettable to all who crossed his path.
              </p>
              <div className="pt-4">
                <span className="inline-block px-4 py-2 bg-forest-100 text-forest-700 rounded-full text-sm font-medium">
                  Class of 2023
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Gone Too Soon */}
        <AnimatedSection>
          <div className="mb-24">
            <div className="max-w-3xl mx-auto text-center">
              <h3
                className="text-2xl md:text-3xl font-serif text-forest-800 mb-6"
              >
                Gone Too Soon
              </h3>
              <p className="text-forest-700 leading-relaxed text-lg mb-6">
                On October 26, 2025, at just 20 years old, Reid was tragically
                taken from us in a{" "}
                <a
                  href="https://www.wwnytv.com/2025/10/27/town-orleans-crash-claims-life-virginia-man/"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  single-car accident
                </a>
                . He was the passenger, and a victim of severely reckless
                driving.{" "}
                <a
                  href="https://www.wwnytv.com/2025/10/27/town-orleans-crash-claims-life-virginia-man/"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Full Article
                </a>
              </p>
              <p className="text-forest-700 leading-relaxed text-lg mb-6">
                In an instant, the world lost a bright light, a son, a brother,
                a soldier, and a friend who touched countless lives with his
                warmth and joy.
              </p>
              <p className="text-forest-700 leading-relaxed text-lg">
                Though his time with us was far too short, Reid lived more fully
                in his 20 years than many do in a lifetime. He served his
                country with honor, loved his family fiercely, and never missed
                a chance to make someone smile. His spirit, his laughter, and
                his love will never be forgotten.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Quote Block */}
        <AnimatedSection>
          <div className="bg-gradient-to-br from-forest-800 to-forest-900 rounded-2xl p-8 md:p-12 lg:p-16 text-center">
            <blockquote
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-warmstone-100 leading-relaxed"
            >
              &ldquo;Forge your own path.&rdquo;
            </blockquote>
            <p className="mt-6 text-warmstone-400 text-lg">- Reid</p>
          </div>
        </AnimatedSection>
      </div>
      
      <Lightbox
        items={lifeImages}
        selectedId={selectedImage}
        onClose={() => setSelectedImage(null)}
        onSelect={setSelectedImage}
      />
    </section>
  );
}
