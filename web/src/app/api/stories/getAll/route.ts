import { NextResponse } from 'next/server'
import { getAllStories } from '@/lib/sanity'

export async function GET() {
  try {
    const stories = await getAllStories()
    return NextResponse.json(stories)
  } catch (err) {
    console.error('Error fetching stories:', err)
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
  }
}
