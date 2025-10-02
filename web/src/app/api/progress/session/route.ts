import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import {prisma, getStoryBySlug} from '@/lib'

export async function POST(request: NextRequest) {
  try {
    const user = await getServerSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { storySlug, duration } = await request.json()
    
    if (!storySlug || !duration) {
      return NextResponse.json(
        { error: 'Story slug and duration are required' }, 
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
      select: { id: true, progress: true }
    })

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Handle null progress
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

    // Update streak logic
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const hasActivityToday = (currentProgress.recentSessions || []).some(
      (session: any) => new Date(session.date).toDateString() === today.toDateString()
    )

    const hadActivityYesterday = (currentProgress.recentSessions || []).some(
      (session: any) => new Date(session.date).toDateString() === yesterday.toDateString()
    )

    let updatedStreak = currentProgress.currentStreak || 0
    
    if (!hasActivityToday) {
      if (hadActivityYesterday) {
        updatedStreak += 1
      } else {
        updatedStreak = 1 // New streak starting today
      }
    }

    // Update session data with actual story ID
    const updatedSessions = (currentProgress.recentSessions || []).filter(
      (session: any) => new Date(session.date).toDateString() !== today.toDateString()
    )

    updatedSessions.push({
      date: today,
      stories: [story._id],
      duration: duration
    })

    // Keep only last 30 days of sessions
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const filteredSessions = updatedSessions.filter(
      (session: any) => new Date(session.date) >= thirtyDaysAgo
    )

    const updatedProgress = {
      ...currentProgress,
      currentStreak: updatedStreak,
      longestStreak: Math.max(updatedStreak, currentProgress.longestStreak || 0),
      totalLearningTime: (currentProgress.totalLearningTime || 0) + duration,
      lastActive: today,
      recentSessions: filteredSessions,
      storiesStarted: [...new Set([...(currentProgress.storiesStarted || []), story._id])]
    }

    await prisma.user.update({
      where: { id: userData.id },
      data: { progress: updatedProgress }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Learning session recorded',
      streak: updatedStreak
    })

  } catch (error) {
    console.error('Error recording learning session:', error)
    return NextResponse.json(
      { error: 'Failed to record learning session' },
      { status: 500 }
    )
  }
}