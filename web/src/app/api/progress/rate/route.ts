import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import {prisma, getStoryBySlug} from '@/lib'

export async function POST(request: NextRequest) {
  try {
    const user = await getServerSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { storySlug, rating, review } = await request.json() // Using story slug
    
    if (!storySlug || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Valid story slug and rating (1-5) are required' }, 
        { status: 400 }
      )
    }

    // Get story from Sanity to get actual ID
    const story = await getStoryBySlug(storySlug)
    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    const userData = await prisma.user.findUnique({
      where: { email: user.email },
      select: { id: true }
    })

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Upsert rating with actual story ID
    const existingRating = await prisma.rating.upsert({
      where: {
        userId_storyId: {
          userId: userData.id,
          storyId: story._id
        }
      },
      update: {
        rating: rating,
        review: review || null,
        createdAt: new Date()
      },
      create: {
        userId: userData.id,
        storyId: story._id,
        rating: rating,
        review: review || null
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Story rated successfully',
      rating: existingRating
    })

  } catch (error) {
    console.error('Error rating story:', error)
    return NextResponse.json(
      { error: 'Failed to rate story' },
      { status: 500 }
    )
  }
}