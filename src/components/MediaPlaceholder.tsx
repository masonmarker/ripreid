'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { ImageIcon, Video, Play } from 'lucide-react'

interface MediaPlaceholderProps {
  className?: string
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide'
  label?: string
  type?: 'photo' | 'video'
  src?: string
  alt?: string
  /** Responsive width hint for the optimiser. Must match the real layout. */
  sizes?: string
  /** Only set for above-the-fold hero imagery. */
  priority?: boolean
}

const aspectClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
}

// Grid tiles are ~half the viewport on phones and a quarter on desktop. Getting
// this right is the difference between shipping a 256px thumbnail and a 4MB,
// 3024x4032 original into a 160px box.
const DEFAULT_SIZES = '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'

export default function MediaPlaceholder({
  className = '',
  aspectRatio = 'square',
  label = 'Photo',
  type = 'photo',
  src,
  alt,
  sizes = DEFAULT_SIZES,
  priority = false,
}: MediaPlaceholderProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // `near` gates whether we attach a src at all; `active` gates playback.
  const [near, setNear] = useState(false)
  const [active, setActive] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (type !== 'video' || !src) return
    const el = containerRef.current
    if (!el) return

    // Start fetching a little before the video scrolls in, so it is ready by
    // the time it matters, but never for all 30 videos at once.
    const preloader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          preloader.disconnect()
        }
      },
      { rootMargin: '300px' }
    )

    // Only decode while genuinely on screen. iOS allows a small number of
    // simultaneous video decoders and silently fails the rest, so bounding
    // this to what is visible is what keeps them from showing up blank.
    const player = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.5 }
    )

    preloader.observe(el)
    player.observe(el)
    return () => {
      preloader.disconnect()
      player.disconnect()
    }
  }, [type, src])

  useEffect(() => {
    const video = videoRef.current
    if (type !== 'video' || !video || !near) return

    if (active) {
      const play = video.play()
      // Rejects when the browser declines autoplay (low power mode, decoder
      // limits). Harmless -- the poster/placeholder stays visible.
      if (play) play.catch(() => {})
    } else {
      video.pause()
    }
  }, [active, near, type])

  const wrapper = `relative overflow-hidden rounded-lg bg-warmstone-200 ${aspectClasses[aspectRatio]} ${className}`

  if (src && type === 'video') {
    return (
      <div ref={containerRef} className={wrapper}>
        {/* Placeholder sits underneath so the tile is never an empty black
            rectangle while the video is unloaded or refused playback. */}
        <div
          className={`photo-placeholder absolute inset-0 transition-opacity duration-500 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Play size={28} strokeWidth={1.5} className="text-warmstone-600" />
        </div>
        <video
          ref={videoRef}
          // No src until near the viewport: `preload` alone still triggers a
          // metadata fetch per element, which is 30 requests on the gallery.
          src={near ? src : undefined}
          preload={near ? 'metadata' : 'none'}
          muted
          loop
          playsInline
          disableRemotePlayback
          aria-label={alt || label}
          onCanPlay={() => setReady(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    )
  }

  if (src) {
    return (
      <div className={wrapper}>
        <Image
          src={src}
          alt={alt || label}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    )
  }

  return (
    <div className={`photo-placeholder rounded-lg ${aspectClasses[aspectRatio]} ${className}`}>
      <div className="flex flex-col items-center justify-center gap-2 text-warmstone-500">
        {type === 'video' ? (
          <Video size={32} strokeWidth={1.5} />
        ) : (
          <ImageIcon size={32} strokeWidth={1.5} />
        )}
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  )
}
