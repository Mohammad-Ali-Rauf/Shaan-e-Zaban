import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { learningUnitId, completed = true, score } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const existing = await prisma.userProgress.findUnique({
  where: {
    userId_learningUnitId: {
      userId: user.id,
      learningUnitId,
    },
  },
})

  if (existing) {
    const updated = await prisma.userProgress.update({
      where: {
        userId_learningUnitId: {
          userId: user.id,
          learningUnitId,
        },
      },
      data: {
        completed,
        score,
      },
    })
    return NextResponse.json(updated)
  } else {
    const created = await prisma.userProgress.create({
      data: {
        userId: user.id,
        learningUnitId,
        completed,
        score,
      },
    })
    return NextResponse.json(created)
  }
}