'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export interface LightboxItem {
  id: string | number
  src?: string
  label?: string
  type?: 'photo' | 'video'
}

interface LightboxProps {
  items: LightboxItem[]
  selectedId: string | number | null
  onClose: () => void
  onSelect: (id: string | number) => void
}

const SWIPE_THRESHOLD = 50

export default function Lightbox({ items, selectedId, onClose, onSelect }: LightboxProps) {
  const touchStartX = useRef<number | null>(null)
  const index = items.findIndex((item) => item.id === selectedId)
  const current = index >= 0 ? items[index] : undefined
  const isOpen = selectedId !== null && current !== undefined

  const goPrev = () => {
    if (index < 0 || items.length === 0) return
    onSelect(items[index > 0 ? index - 1 : items.length - 1].id)
  }

  const goNext = () => {
    if (index < 0 || items.length === 0) return
    onSelect(items[index < items.length - 1 ? index + 1 : 0].id)
  }

  // Keyboard support plus a scroll lock. Without the lock, iOS scrolls the page
  // behind the overlay and leaves you somewhere unexpected on close.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }

    const { overflow, position, width } = document.body.style
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = overflow
      document.body.style.position = position
      document.body.style.width = width
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, index, items.length])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={current?.label}
          className="fixed inset-0 z-[100] bg-forest-950/95 overscroll-none-touch"
          onClick={onClose}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return
            const delta = e.changedTouches[0].clientX - touchStartX.current
            if (Math.abs(delta) > SWIPE_THRESHOLD) {
              delta > 0 ? goPrev() : goNext()
            }
            touchStartX.current = null
          }}
        >
          {/* Column layout keeps the controls in normal flow instead of
              absolutely positioned over the edges, which is what used to push
              the chevrons past the viewport on narrow screens. */}
          <div className="safe-inset flex h-full w-full flex-col">
            <div className="flex items-center justify-between gap-2 px-4 py-3">
              <span className="min-w-0 truncate text-sm text-warmstone-400">
                {current?.label}
                {items.length > 1 && (
                  <span className="ml-2 text-warmstone-500">
                    {index + 1}/{items.length}
                  </span>
                )}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                aria-label="Close"
                // 44px minimum for a reliable touch target.
                className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-warmstone-300 transition-colors hover:text-warmstone-100"
              >
                <X size={26} />
              </button>
            </div>

            <div
              className="relative min-h-0 flex-1 px-2 pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              {current?.src && current.type === 'video' ? (
                <video
                  key={current.src}
                  src={current.src}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full rounded-lg object-contain"
                />
              ) : (
                current?.src && (
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.label || ''}
                    fill
                    // Full-bleed on phones, capped by the container on desktop.
                    sizes="(min-width: 1024px) 80vw, 100vw"
                    className="rounded-lg object-contain"
                  />
                )
              )}
            </div>

            {items.length > 1 && (
              <div className="flex items-center justify-center gap-6 px-4 py-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goPrev()
                  }}
                  aria-label="Previous"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-900/70 text-warmstone-300 transition-colors hover:text-warmstone-100"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goNext()
                  }}
                  aria-label="Next"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-900/70 text-warmstone-300 transition-colors hover:text-warmstone-100"
                >
                  <ChevronRight size={28} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
