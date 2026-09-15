import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // Modern formats cut these full-resolution phone photos down by ~80%.
    formats: ['image/avif', 'image/webp'],
    // Narrow widths matter most here: the smallest default deviceSize is 640px,
    // which is far wider than the grid tiles actually render at on a phone.
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 180, 256, 384],
    minimumCacheTTL: 31536000,
  },
  // Lets you open the dev server from your phone on the LAN without Next
  // blocking the HMR requests as cross-origin.
  allowedDevOrigins: ['127.0.0.1', '192.168.1.4', '192.168.1.*'],
}

export default nextConfig
