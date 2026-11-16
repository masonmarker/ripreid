import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // Modern formats cut these full-resolution phone photos down by ~80%.
    formats: ['image/avif', 'image/webp'],
    // Hero portrait renders at quality 90; everything else uses the default 75.
    qualities: [75, 90],
    // Narrow widths matter most here: the smallest default deviceSize is 640px,
    // which is far wider than the grid tiles actually render at on a phone.
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 180, 256, 384],
    minimumCacheTTL: 31536000,
  },
  // Lets you open the dev server from your phone on the LAN without Next
  // blocking the HMR requests as cross-origin.
  allowedDevOrigins: ['127.0.0.1', '192.168.1.4', '192.168.1.*'],
  // getAllMedia() fs-scans public/{pictures,videos}, so nft traces every media
  // file into this function (~312 MB uncompressed on Vercel). The route is
  // force-static — the JSON is baked at build time — so the files are never
  // needed at runtime. They're already served as static assets by the CDN.
  outputFileTracingExcludes: {
    '/': ['public/pictures/**', 'public/videos/**'],
    '/gallery': ['public/pictures/**', 'public/videos/**'],
    '/api/media': ['public/pictures/**', 'public/videos/**'],
  },
}

export default nextConfig
