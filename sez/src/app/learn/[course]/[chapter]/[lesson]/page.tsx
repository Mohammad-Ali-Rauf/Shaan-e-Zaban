import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function LessonPage({ params }: { params: { course: string, chapter: string, lesson: string } }) {
  const { course, chapter, lesson } = params

  const lessonData = await prisma.lesson.findUnique({
    where: { slug: lesson },
    include: {
      learningUnits: {
        orderBy: { order: 'asc' },
      },
    },
  })

  if (!lessonData) return notFound()

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">{lessonData.title}</h1>

      {lessonData.learningUnits.map((unit) => (
        <div key={unit.id} className="border p-4 rounded shadow-sm space-y-2">
          <div className="text-xl font-semibold">{unit.urduText}</div>
          <div className="text-gray-600 italic">{unit.englishText}</div>
          {unit.audioUrl && (
            <audio controls>
              <source src={`/${unit.audioUrl}`} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          )}
          <div className="flex gap-2 text-sm text-blue-600 flex-wrap">
            {unit.tags.map((tag, i) => (
              <span key={i} className="bg-blue-100 px-2 py-1 rounded">{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}