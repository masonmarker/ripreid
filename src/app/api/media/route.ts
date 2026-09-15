import { NextResponse } from 'next/server'
import { getAllMedia } from '@/lib/media'

// The media library is static files on disk, so there is no reason to re-scan
// the filesystem on every request. Pages now read the list server-side; this
// route is kept for any external/manual consumers.
export const dynamic = 'force-static'

export async function GET() {
  try {
    return NextResponse.json(
      { media: getAllMedia() },
      { headers: { 'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800' } }
    )
  } catch (error) {
    console.error('Error scanning media directory:', error)
    return NextResponse.json({ error: 'Failed to scan media directory' }, { status: 500 })
  }
}
