'use client'

import { useState } from 'react'
import { Camera, Video, Copy, Check, Info } from 'lucide-react'

export default function ShareMemoryBanner() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('mason1marker@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-forest-800/90 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="hidden sm:flex items-center gap-2 text-warmstone-400">
            <Camera className="w-5 h-5" />
            <Video className="w-5 h-5" />
          </div>
          <div>
            <p className="text-warmstone-100 font-medium">Have a photo or video of Reid to add to his gallery?</p>
            <p className="text-warmstone-400 text-sm">Send it to his family at <span className="text-warmstone-300">mason1marker@gmail.com</span></p>
          </div>
        </div>
        <button 
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-warmstone-100 text-forest-800 rounded-full font-medium text-sm hover:bg-white transition-all whitespace-nowrap"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Email
            </>
          )}
        </button>
      </div>
      <div className="mt-4 pt-4 border-t border-warmstone-700/50 flex items-start gap-2">
        <Info className="w-4 h-4 text-warmstone-500 mt-0.5 flex-shrink-0" />
        <p className="text-warmstone-400 text-xs">
          Please include: <span className="text-warmstone-300">your name or social handle</span>, 
          <span className="text-warmstone-300"> a short caption</span> about the memory, 
          and <span className="text-warmstone-300">when/where</span> it was taken (optional)
        </p>
      </div>
    </div>
  )
}
