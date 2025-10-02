import {prisma} from '.'

export async function getUserProgress(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { progress: true }
  })
  
  return user?.progress || {
    completedStories: [],
    currentStreak: 0,
    longestStreak: 0,
    totalLearningTime: 0,
    storiesStarted: [],
    favoriteStories: [],
    levelProgress: [],
    recentSessions: []
  }
}

export async function updateUserProgress(email: string, progressData: any) {
  return await prisma.user.update({
    where: { email },
    data: { progress: progressData }
  })
}