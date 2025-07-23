import { NextRequest, NextResponse } from 'next/server'
import { getStoryBySlug } from '@/lib/sanity'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  try {
    const story = await getStoryBySlug(slug)
    return NextResponse.json(story)
  } catch (err) {
    console.error('Error getting story:', err)
    return NextResponse.json({ error: 'Failed to get story' }, { status: 500 })
  }
}
