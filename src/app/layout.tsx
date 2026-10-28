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
  metadataBase: new URL('https://reidmarker.com'),
  title: 'Reid Marker | Official Memorial & Legacy',
  description:
    'The official memorial website for SPC Reid Wesley Marker. Celebrating his life, United States Army Military Police service, and legacy. Learn how to support the Sherando High School scholarship fund.',
  alternates: {
    canonical: 'https://reidmarker.com',
  },
  verification: {
    google: 'a7jYhPvm4zVKzOhwbNnUg6ZcjsXwnH0AVRbWEWDw1_8',
  },
  openGraph: {
    type: 'profile',
    title: 'Reid Marker | Official Memorial & Legacy',
    description:
      'The official memorial website for SPC Reid Wesley Marker. Celebrating his life, United States Army Military Police service, and legacy. Learn how to support the Sherando High School scholarship fund.',
    url: 'https://reidmarker.com',
    siteName: 'Reid Marker Memorial',
    firstName: 'Reid',
    lastName: 'Marker',
  },
}

// Person + AboutPage JSON-LD, emitted into the document head so crawlers get
// the entity graph (and its sameAs corroborating sources) in the initial HTML.
const entitySchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://reidmarker.com',
      name: 'Reid Wesley Marker',
      givenName: 'Reid',
      additionalName: 'Wesley',
      familyName: 'Marker',
      birthDate: '2005',
      deathDate: '2025-10-26',
      birthPlace: {
        '@type': 'Place',
        name: 'Winchester, Virginia',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Sherando High School',
      },
      knowsAbout: ['United States Army', 'Military Police Corps'],
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Order of Marechaussee Steel Award',
      },
      jobTitle: 'SPC Military Police Officer / Pending Military Police Investigator',
      sameAs: [
        'https://www.nny360.com/top_stories/passenger-from-virginia-dies-in-jefferson-county-crash/article_0b233acb-6bcb-5a5b-a8db-d9811e00ef8a.html',
        'https://www.informnny.com/abc50-now/virginia-man-fatally-injured-in-orleans-crash/',
        'https://www.wwnytv.com/2025/10/27/town-orleans-crash-claims-life-virginia-man/',
        'https://cnycentral.com/news/local/passenger-from-virginia-killed-in-crash-after-driver-strikes-tree-jefferson-county-town-of-orleans-reid-w-marker-new-york-state-police',
        'https://ompsfuneralhome.com/obituary/reid-w-marker/',
        'https://www.legacy.com/us/obituaries/name/reid-marker-obituary?id=59923574',
        'https://www.winchesterstar.com/obituaries/reid-wesley-marker/article_23b51609-45a2-5cfd-9dc7-03e5e3e44e0a.html',
      ],
    },
    {
      '@type': 'AboutPage',
      '@id': 'https://reidmarker.com',
      url: 'https://reidmarker.com',
      name: 'Reid Marker - Official Memorial Website',
      about: { '@id': 'https://reidmarker.com' },
      description:
        'The official dedicated legacy platform and repository of records honoring the life, service, and memory of Reid Wesley Marker.',
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entitySchema) }}
        />
        {children}
        <Analytics debug={false} />
      </body>
    </html>
  )
}
