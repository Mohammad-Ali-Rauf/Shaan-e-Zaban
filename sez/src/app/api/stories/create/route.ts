import { NextRequest, NextResponse } from 'next/server'
import { createStory } from '@/lib/sanity'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const story = await createStory(body)
    return NextResponse.json(story, { status: 201 })
  } catch (err) {
    console.error('Error creating story:', err)
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 })
  }
}
