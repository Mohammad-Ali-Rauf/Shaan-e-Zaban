import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { storyId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const progress = await prisma.userProgress.findUnique({
    where: {
      userId_storyId: {
        userId: user.id,
        storyId: parseInt(params.storyId, 10),
      },
    },
  })

  return NextResponse.json({ completed: !!progress?.completed })
}

export async function POST(req: Request, { params }: { params: { storyId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const storyId = parseInt(params.storyId, 10)

  await prisma.userProgress.upsert({
    where: {
      userId_storyId: {
        userId: user.id,
        storyId,
      },
    },
    create: {
      userId: user.id,
      storyId,
      completed: true,
    },
    update: {
      completed: true,
    },
  })

  return NextResponse.json({ success: true })
}