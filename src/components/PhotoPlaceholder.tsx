'use client'

import { ImageIcon } from 'lucide-react'

interface PhotoPlaceholderProps {
  className?: string
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide'
  label?: string
}

const aspectClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
}

export default function PhotoPlaceholder({
  className = '',
  aspectRatio = 'square',
  label = 'Photo',
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`photo-placeholder rounded-lg ${aspectClasses[aspectRatio]} ${className}`}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-warmstone-500">
        <ImageIcon size={32} strokeWidth={1.5} />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  )
}
