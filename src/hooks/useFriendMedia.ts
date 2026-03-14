import { useState, useEffect } from 'react'

interface FriendMedia {
  id: string
  src: string
  type: 'photo' | 'video'
  label: string
}

// Global tracker for used images on current page
let usedImages = new Set<string>()

export function useFriendMedia(limit: number = 1): FriendMedia[] {
  const [friendMedia, setFriendMedia] = useState<FriendMedia[]>([])

  useEffect(() => {
    async function fetchFriendMedia() {
      try {
        const response = await fetch('/api/media')
        const data = await response.json()
        
        // Filter for friends category and exclude already used images
        const availableFriends = data.media
          .filter((item: any) => item.category === 'friends')
          .filter((item: any) => !usedImages.has(item.id))
        
        // Take first X items from available media
        const selectedFriends = availableFriends
          .slice(0, limit)
          .map((item: any) => ({
            id: item.id,
            src: item.src,
            type: item.type,
            label: item.label
          }))
        
        // Mark these as used
        selectedFriends.forEach((item: FriendMedia) => usedImages.add(item.id))
        
        setFriendMedia(selectedFriends)
      } catch (error) {
        console.error('Failed to fetch friend media:', error)
      }
    }

    fetchFriendMedia()
  }, [limit])

  return friendMedia
}
