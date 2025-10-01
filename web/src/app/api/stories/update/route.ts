import { NextRequest, NextResponse } from 'next/server'
import { updateStory } from '@/lib/sanity'

export async function PUT(req: NextRequest) {
  try {
    const { id, ...updateData } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    }

    const updated = await updateStory(id, updateData)
    return NextResponse.json(updated)
  } catch (err) {
    console.error('Error updating story:', err)
    return NextResponse.json({ error: 'Failed to update story' }, { status: 500 })
  }
}
