import { ChevronDown } from 'lucide-react'
import MediaPlaceholder from '../MediaPlaceholder'

function ArmyStar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 1.6l3.16 7.17 7.24.58-5.52 4.83 1.62 7.02L12 17.32l-6.5 3.88 1.62-7.02-5.52-4.83 7.24-.58L12 1.6z" />
    </svg>
  )
}

export default function HeroSection() {
  return (
    <section
      id="home"
      // `min-h-screen-dvh` instead of `min-h-screen`: 100vh on mobile Safari is
      // measured without the address bar, so the hero always overflowed the
      // area the user could actually see.
      className="relative min-h-screen-dvh flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900 via-forest-800 to-forest-700">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
        {/* Service emblem and portrait come first so it is immediately clear
            this is a soldier's memorial, before the name is even read. */}
        <div className="reveal mb-6 sm:mb-7" style={{ '--reveal-delay': '75ms' } as React.CSSProperties}>
          <span className="inline-flex items-center gap-2.5 rounded-sm border border-warmstone-400/40 bg-forest-950/30 px-4 py-2">
            <ArmyStar className="h-4 w-4 text-warmstone-300" />
            <span className="text-warmstone-200 text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase font-medium">
              United States Army
            </span>
          </span>
        </div>

        <div className="reveal mb-6" style={{ '--reveal-delay': '200ms' } as React.CSSProperties}>
          <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-warmstone-300/70 shadow-lg shadow-black/50">
            <MediaPlaceholder
              aspectRatio="square"
              label="Reid in uniform"
              src="/pictures/service/IMG_2957.png"
              alt="SPC Reid Marker in uniform"
              sizes="384px"
              quality={90}
              priority
              objectPosition="center top"
              className="h-full w-full scale-[1.15] -translate-x-[6%]"
            />
          </div>
        </div>

        <div className="reveal mb-6" style={{ '--reveal-delay': '350ms' } as React.CSSProperties}>
          <span className="text-warmstone-300 text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase font-medium">
            In Loving Memory
          </span>
        </div>

        <h1
          className="reveal text-[2.75rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6"
          style={{ '--reveal-delay': '500ms' } as React.CSSProperties}
        >
          Reid Wesley Marker
        </h1>

        <div
          className="reveal flex items-center justify-center gap-4 text-warmstone-200 mb-8"
          style={{ '--reveal-delay': '650ms' } as React.CSSProperties}
        >
          <span className="text-lg md:text-xl font-light">2005</span>
          <span className="w-12 h-px bg-warmstone-400" />
          <span className="text-lg md:text-xl font-light">2025</span>
        </div>

        <p
          className="reveal text-warmstone-200/90 text-lg md:text-xl font-serif font-light max-w-2xl mx-auto leading-relaxed mb-4"
          style={{ '--reveal-delay': '775ms' } as React.CSSProperties}
        >
          &ldquo;He had an infectious laugh, the heart of a lion, and the gentleness of a lamb.&rdquo;
        </p>

        <p
          className="reveal text-warmstone-300/80 text-base md:text-lg font-light"
          style={{ '--reveal-delay': '900ms' } as React.CSSProperties}
        >
          SPC, U.S. Army Military Police
        </p>
      </div>

      {/* Scroll indicator. Hidden on short viewports where it would collide
          with the text block. */}
      <div
        className="reveal absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        style={{ '--reveal-delay': '1000ms' } as React.CSSProperties}
      >
        <a
          href="#life"
          className="animate-nudge flex flex-col items-center gap-2 text-warmstone-300/70 hover:text-warmstone-200 transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} />
        </a>
      </div>
    </section>
  )
}
