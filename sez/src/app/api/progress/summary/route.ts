import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const total = await prisma.story.count()

  const completed = await prisma.userProgress.count({
    where: { userId: user.id, completed: true },
  })

  const last = await prisma.userProgress.findFirst({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
    include: {
      story: true,
    },
  })

  return NextResponse.json({
    total,
    completed,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    lastStory: last?.story ?? null,
  })
}
