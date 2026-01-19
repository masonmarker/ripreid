'use client'

import { useRef, useEffect, useState } from 'react'
import { ImageIcon, Video } from 'lucide-react'

interface MediaPlaceholderProps {
  className?: string
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide'
  label?: string
  type?: 'photo' | 'video'
  src?: string
  alt?: string
}

const aspectClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
}

export default function MediaPlaceholder({
  className = '',
  aspectRatio = 'square',
  label = 'Photo',
  type = 'photo',
  src,
  alt,
}: MediaPlaceholderProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (type !== 'video' || !src) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [type, src])

  useEffect(() => {
    if (type !== 'video' || !videoRef.current) return

    if (isVisible) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [isVisible, type])

  // If we have actual media source
  if (src) {
    if (type === 'video') {
      return (
        <div
          ref={containerRef}
          className={`relative overflow-hidden rounded-lg ${aspectClasses[aspectRatio]} ${className}`}
        >
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )
    }

    return (
      <div className={`relative overflow-hidden rounded-lg ${aspectClasses[aspectRatio]} ${className}`}>
        <img
          src={src}
          alt={alt || label}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    )
  }

  // Placeholder state
  return (
    <div
      className={`photo-placeholder rounded-lg ${aspectClasses[aspectRatio]} ${className}`}
    >
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
