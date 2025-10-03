import { prisma } from '.'

export async function getUserProgress(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { 
      progress: true,
      sessions: {
        orderBy: { date: 'desc' },
        take: 10
      }
    }
  })
  
  return user || null
}

export async function updateStoryProgress(email: string, storyId: string, data: any) {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) throw new Error('User not found')

  // Find existing progress or create new
  const existing = await prisma.userProgress.findFirst({
    where: { userId: user.id, storyId }
  })

  if (existing) {
    return await prisma.userProgress.update({
      where: { id: existing.id },
      data
    })
  } else {
    return await prisma.userProgress.create({
      data: {
        userId: user.id,
        storyId,
        ...data
      }
    })
  }
}