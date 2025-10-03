import { NextRequest, NextResponse } from 'next/server'
import { prisma, getAllStories, getServerSession, Story } from '@/lib'

export async function GET(request: NextRequest) {
  try {
    const user = await getServerSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userData = await prisma.user.findUnique({
      where: { email: user.email },
      include: { 
        progress: true,
        sessions: {
          orderBy: { date: 'desc' },
          take: 5
        }
      }
    })

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get all stories for level counts
    const allStories = await getAllStories()

    // Calculate stats from relational data
    const completedProgress = userData.progress.filter(p => p.completed)
    const favoriteProgress = userData.progress.filter(p => p.favorite)
    
    const totalStoriesCompleted = completedProgress.length
    const totalLearningTime = userData.sessions.reduce((sum, session) => sum + session.duration, 0)
    const favoriteCount = favoriteProgress.length

    // Calculate level stats
    const levelStats = {
      beginner: { 
        completed: completedProgress.filter(p => p.level === 'beginner').length,
        total: allStories.filter((s: Story) => s.level === 'beginner').length
      },
      intermediate: { 
        completed: completedProgress.filter(p => p.level === 'intermediate').length,
        total: allStories.filter((s: Story) => s.level === 'intermediate').length
      },
      advanced: { 
        completed: completedProgress.filter(p => p.level === 'advanced').length,
        total: allStories.filter((s: Story) => s.level === 'advanced').length
      }
    }

    // Simple streak calculation (you can enhance this later)
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    const hasActivityToday = userData.sessions.some(s => new Date(s.date).toDateString() === today)
    const hasActivityYesterday = userData.sessions.some(s => new Date(s.date).toDateString() === yesterday)
    
    const currentStreak = hasActivityToday ? (hasActivityYesterday ? 2 : 1) : 0

    const totalCompletion = allStories.length > 0 
      ? (totalStoriesCompleted / allStories.length) * 100 
      : 0

    return NextResponse.json({
      progress: {
        totalStoriesCompleted,
        totalLearningHours: Math.floor(totalLearningTime / 60),
        favoriteCount,
        currentStreak,
        longestStreak: currentStreak, // Simple for now
        totalCompletion: Math.round(totalCompletion),
        totalStoriesAvailable: allStories.length,
        levelStats
      },
      recentActivity: userData.sessions.map(session => ({
        date: session.date,
        stories: session.stories,
        duration: session.duration
      }))
    })

  } catch (error) {
    console.error('Error fetching progress stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress stats' },
      { status: 500 }
    )
  }
}