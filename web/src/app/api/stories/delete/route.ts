import { NextRequest, NextResponse } from 'next/server'
import { deleteStory } from '@/lib/sanity'

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  try {
    await deleteStory(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error deleting story:', err)
    return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 })
  }
}
