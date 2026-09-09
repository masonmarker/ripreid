'use client'

import { useEffect } from 'react'

export default function TributeVideo() {
  useEffect(() => {
    // Load Flowplayer script
    const script = document.createElement('script')
    script.src = '//embed.flowplayer.org/6.0.2/embed.min.js'
    script.async = true
    document.body.appendChild(script)

    // Initialize Flowplayer when script loads
    script.onload = () => {
      if (window._fpes) {
        window._fpes.push({
          e: document.getElementById('tribute-video-container'),
          l: "",
          c: {
            "ratio": 0.5625,
            "rtmp": 0,
            "live": false,
            "origin": "https://player.tributecenteronline.com/109584",
            "key": "$343103564176718",
            "swf": "/Content/flowplayer/flowplayer.swf",
            "swfHls": "//releases.flowplayer.org/6.0.2/commercial/flowplayerhls.swf",
            "adaptiveRatio": false,
            "clip": {
              "subtitles": [],
              "sources": [
                {
                  "src": "//tcwebvideo.s3.amazonaws.com/1228/videos/f5b41efe-8e9e-45a1-9117-c1fb0b6aa6be.mp4",
                  "suffix": "mp4",
                  "type": "video/mp4"
                },
                {
                  "src": "//tcwebvideo.s3.amazonaws.com/1228/videos/f5b41efe-8e9e-45a1-9117-c1fb0b6aa6be.webm",
                  "suffix": "webm",
                  "type": "video/webm"
                }
              ]
            }
          }
        })
      }
    }

    // Initialize global flowplayer array
    if (!window._fpes) {
      window._fpes = []
    }

    return () => {
      // Cleanup script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return null
}

// Type declaration for global flowplayer
declare global {
  interface Window {
    _fpes?: any[]
  }
}
