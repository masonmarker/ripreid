'use client'

import { Heart } from 'lucide-react'

export default function FooterSection() {
  return (
    <footer className="py-12 bg-forest-900 text-warmstone-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h3
            className="text-3xl md:text-4xl font-serif text-warmstone-100 mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Reid Wesley Marker
          </h3>
          <p className="text-warmstone-400 mb-6">
            2005 — 2025
          </p>
          <div className="flex items-center justify-center gap-2 text-warmstone-400 mb-8">
            <span className="w-12 h-px bg-warmstone-600" />
            <Heart className="w-4 h-4 text-ember-400" fill="currentColor" />
            <span className="w-12 h-px bg-warmstone-600" />
          </div>
          <p className="text-warmstone-300 italic max-w-xl mx-auto mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            &ldquo;He had an infectious laugh, the heart of a lion, and the gentleness of a lamb.&rdquo;
          </p>
          <p className="text-warmstone-500 text-sm">
            Forever loved. Never forgotten.
          </p>
        </div>
      </div>
    </footer>
  )
}
