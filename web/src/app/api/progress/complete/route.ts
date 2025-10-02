import { NextRequest, NextResponse } from 'next/server'
import {prisma, getStoryBySlug, getAllStories, getServerSession} from '@/lib'

export async function POST(request: NextRequest) {
  try {
    const user = await getServerSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { storySlug } = await request.json()
    
    if (!storySlug) {
      return NextResponse.json({ error: 'Story slug is required' }, { status: 400 })
    }

    // Get story from Sanity to get actual ID and level
    const story = await getStoryBySlug(storySlug)
    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    const userData = await prisma.user.findUnique({
      where: { email: user.email },
      select: { id: true, progress: true }
    })

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Handle null progress with proper default structure
    const currentProgress = userData.progress || {
      completedStories: [],
      currentStreak: 0,
      longestStreak: 0,
      totalLearningTime: 0,
      storiesStarted: [],
      favoriteStories: [],
      levelProgress: [],
      recentSessions: []
    }

    // Add to completed stories if not already there
    const updatedCompletedStories = currentProgress.completedStories.includes(story._id)
      ? currentProgress.completedStories
      : [...currentProgress.completedStories, story._id]

    // Update level progress with actual story level
    const storyLevel = story.level
    const existingLevelProgress = currentProgress.levelProgress?.find(
      (lp: any) => lp.level === storyLevel
    ) || { level: storyLevel, completed: 0, total: 0 }

    // Get total stories count for this level from Sanity
    const allStories = await getAllStories()
    const levelStoriesCount = allStories.filter((s: any) => s.level === storyLevel).length

    const updatedLevelProgress = (currentProgress.levelProgress || [])
      .filter((lp: any) => lp.level !== storyLevel)
      .concat({
        ...existingLevelProgress,
        completed: updatedCompletedStories.filter(id => {
          const completedStory = allStories.find((s: any) => s._id === id)
          return completedStory?.level === storyLevel
        }).length,
        total: levelStoriesCount
      })

    const updatedProgress = {
      ...currentProgress,
      completedStories: updatedCompletedStories,
      levelProgress: updatedLevelProgress,
      lastActive: new Date()
    }

    // Update user progress
    await prisma.user.update({
      where: { id: userData.id },
      data: { progress: updatedProgress }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Story marked as completed',
      progress: updatedProgress
    })

  } catch (error) {
    console.error('Error completing story:', error)
    return NextResponse.json(
      { error: 'Failed to mark story as completed' },
      { status: 500 }
    )
  }
}