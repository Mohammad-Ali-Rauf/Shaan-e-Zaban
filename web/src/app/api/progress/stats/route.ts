import { NextRequest, NextResponse } from 'next/server'
import {prisma, getAllStories, getServerSession} from '@/lib'

export async function GET(request: NextRequest) {
  try {
    const user = await getServerSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userData = await prisma.user.findUnique({
      where: { email: user.email },
      select: { progress: true }
    })

    // Get all stories from Sanity for accurate counts
    const allStories = await getAllStories()

    // Handle null progress with proper default structure
    const progress = userData?.progress || {
      completedStories: [],
      currentStreak: 0,
      longestStreak: 0,
      totalLearningTime: 0,
      storiesStarted: [],
      favoriteStories: [],
      levelProgress: [],
      recentSessions: []
    }

    // Calculate real stats using Sanity data
    const totalStoriesCompleted = progress.completedStories?.length || 0
    const totalLearningHours = Math.floor((progress.totalLearningTime || 0) / 60)
    const favoriteCount = progress.favoriteStories?.length || 0

    // Calculate accurate level breakdown from Sanity
    const levelStats = {
      beginner: { 
        completed: (progress.completedStories || []).filter((id: string) => {
          const story = allStories.find((s: any) => s._id === id)
          return story?.level === 'beginner'
        }).length,
        total: allStories.filter((s: any) => s.level === 'beginner').length
      },
      intermediate: { 
        completed: (progress.completedStories || []).filter((id: string) => {
          const story = allStories.find((s: any) => s._id === id)
          return story?.level === 'intermediate'
        }).length,
        total: allStories.filter((s: any) => s.level === 'intermediate').length
      },
      advanced: { 
        completed: (progress.completedStories || []).filter((id: string) => {
          const story = allStories.find((s: any) => s._id === id)
          return story?.level === 'advanced'
        }).length,
        total: allStories.filter((s: any) => s.level === 'advanced').length
      }
    }

    // Calculate overall completion percentage
    const totalCompletion = allStories.length > 0 
      ? (totalStoriesCompleted / allStories.length) * 100 
      : 0

    return NextResponse.json({
      progress: {
        ...progress,
        totalStoriesCompleted,
        totalLearningHours,
        favoriteCount,
        levelStats,
        totalCompletion: Math.round(totalCompletion),
        totalStoriesAvailable: allStories.length
      },
      // Include recent activity
      recentActivity: (progress.recentSessions || [])
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
    })

  } catch (error) {
    console.error('Error fetching progress stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress stats' },
      { status: 500 }
    )
  }
}