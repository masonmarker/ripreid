import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Self-hosted at build time and preloaded, so there is no blocking round trip
// to fonts.googleapis.com + fonts.gstatic.com before text can paint. On a phone
// that pair of cross-origin handshakes alone can cost several hundred ms.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Reid Wesley Marker | 2005-2025',
  description: 'In loving memory of SPC Reid Wesley Marker - A son, brother, soldier, and friend who lived life to the fullest with an infectious laugh and the heart of a lion.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // No maximumScale/userScalable limits: pinch-zoom must stay available.
  themeColor: '#2f362b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Analytics debug={false} />
      </body>
    </html>
  )
}
