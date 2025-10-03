import { NextRequest, NextResponse } from 'next/server'
import { prisma, getStoryBySlug, getServerSession } from '@/lib'

export async function POST(request: NextRequest) {
  try {
    const user = await getServerSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {storySlug} = await request.json()
    
    if (!storySlug) {
      return NextResponse.json({ error: 'Story slug is required' }, { status: 400 })
    }

    // Get story from Sanity
    const story = await getStoryBySlug(storySlug)
    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    // Get user with progress
    const userData = await prisma.user.findUnique({
      where: { email: user.email },
      include: { 
        progress: {
          where: { storyId: story._id }
        }
      }
    })

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const existingProgress = userData.progress[0]

    if (existingProgress?.completed) {
      return NextResponse.json({ 
        success: true, 
        message: 'Story already completed',
        progress: existingProgress
      })
    }

    // Create or update progress record
    const progress = existingProgress 
      ? await prisma.userProgress.update({
          where: { id: existingProgress.id },
          data: { 
            completed: true,
            updatedAt: new Date()
          }
        })
      : await prisma.userProgress.create({
          data: {
            userId: userData.id,
            storyId: story._id,
            level: story.level,
            completed: true
          }
        })

    // Update learning session
    await prisma.learningSession.create({
      data: {
        userId: userData.id,
        stories: [story._id],
        duration: 5 // Default 5 minutes per story
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Story marked as completed',
      progress
    })

  } catch (error) {
    console.error('Error completing story:', error)
    return NextResponse.json(
      { error: 'Failed to mark story as completed' },
      { status: 500 }
    )
  }
}