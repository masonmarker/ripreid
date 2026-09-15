import { ChevronDown } from 'lucide-react'

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
        <div className="reveal mb-6" style={{ '--reveal-delay': '150ms' } as React.CSSProperties}>
          <span className="text-warmstone-300 text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase font-medium">
            In Loving Memory
          </span>
        </div>

        <h1
          className="reveal text-[2.75rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6"
          style={{ '--reveal-delay': '300ms' } as React.CSSProperties}
        >
          Reid Wesley Marker
        </h1>

        <div
          className="reveal flex items-center justify-center gap-4 text-warmstone-200 mb-8"
          style={{ '--reveal-delay': '500ms' } as React.CSSProperties}
        >
          <span className="text-lg md:text-xl font-light">2005</span>
          <span className="w-12 h-px bg-warmstone-400" />
          <span className="text-lg md:text-xl font-light">2025</span>
        </div>

        <p
          className="reveal text-warmstone-200/90 text-lg md:text-xl font-serif font-light max-w-2xl mx-auto leading-relaxed mb-4"
          style={{ '--reveal-delay': '650ms' } as React.CSSProperties}
        >
          &ldquo;He had an infectious laugh, the heart of a lion, and the gentleness of a lamb.&rdquo;
        </p>

        <p
          className="reveal text-warmstone-300/80 text-base md:text-lg font-light"
          style={{ '--reveal-delay': '800ms' } as React.CSSProperties}
        >
          SPC, United States Army
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
