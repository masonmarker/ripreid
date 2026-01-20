'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  // Same-page sections (left side)
  { href: '/#home', label: 'Home' },
  { href: '/#life', label: 'His Life' },
  { href: '/#service', label: 'Service' },
  { href: '/#passions', label: 'Passions' },
  { href: '/#legacy', label: 'Legacy' },
  // Separate pages (right side)
  { href: '/family', label: 'Family', isPage: true },
  { href: '/gallery', label: 'Gallery', isPage: true, isGallery: true },
]

interface NavigationProps {
  photoCount?: number
  videoCount?: number
}

export default function Navigation({ photoCount = 0, videoCount = 0 }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const hasMedia = photoCount > 0 || videoCount > 0

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-warmstone-50/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="/"
            className={`font-serif text-xl lg:text-2xl font-medium transition-colors duration-300 ${
              isScrolled ? 'text-forest-800' : 'text-white'
            }`}
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Reid Marker
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                  isScrolled ? 'text-forest-700' : 'text-white/90'
                }`}
                {...('isPage' in link && link.isPage && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {link.label}
                {'isPage' in link && link.isPage && (
                  <ExternalLink 
                    size={10} 
                    className={`absolute -top-1 -right-3 ${
                      isScrolled ? 'text-forest-500' : 'text-white/60'
                    }`} 
                  />
                )}
                {'isGallery' in link && link.isGallery && hasMedia && (
                  <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap ${
                    isScrolled ? 'text-forest-500' : 'text-white/70'
                  }`}>
                    {photoCount} photos · {videoCount} videos
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-forest-800' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-warmstone-50/98 backdrop-blur-md border-t border-warmstone-200"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-forest-700 font-medium"
                  {...('isPage' in link && link.isPage && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {link.label}
                  {'isPage' in link && link.isPage && (
                    <ExternalLink size={12} className="text-forest-500" />
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
