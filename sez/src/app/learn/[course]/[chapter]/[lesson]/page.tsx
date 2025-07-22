import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { redirect } from 'next/navigation'

interface Props {
  params: { course: string, chapter: string, lesson: string }
  searchParams?: { unit?: string }
}

export default async function LessonPage({ params, searchParams }: Props) {
  const { course, chapter, lesson } = params
  const unitIndex = parseInt(searchParams?.unit || '0', 10)

  const lessonData = await prisma.lesson.findUnique({
    where: { slug: lesson },
    include: {
      learningUnits: {
        orderBy: { order: 'asc' },
      },
    },
  })

  const allLessons = await prisma.lesson.findMany({
    where: { chapterId: lessonData?.chapterId },
    orderBy: { slug: 'asc' },
  });

  const currentLessonIndex = allLessons.findIndex((l) => l.slug === lessonData?.slug);
  const nextLesson = allLessons[currentLessonIndex + 1] || null;

  if (!lessonData) return notFound()

  const units = lessonData.learningUnits
  const unit = units[unitIndex]

  if (!unit) return redirect(`/learn/${course}/${chapter}/${lesson}?unit=0`)

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-4">{lessonData.title}</h1>

      <div className="border p-4 rounded shadow space-y-3">
        <div className="text-2xl font-nastaliq">{unit.urduText}</div>
        <div className="italic text-gray-600">{unit.englishText}</div>
        {unit.audioUrl && (
          <audio controls className="mt-2">
            <source src={`/${unit.audioUrl}`} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        )}
        <div className="flex flex-wrap gap-2 text-sm mt-2">
          {unit.tags.map((tag, i) => (
            <span key={i} className="bg-blue-100 px-2 py-1 rounded">{tag}</span>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6 text-sm text-blue-600">
        <PaginationNav
          currentIndex={unitIndex}
          total={units.length}
          baseUrl={`/learn/${course}/${chapter}/${lesson}`}
          nextLessonSlug={nextLesson?.slug}
          course={course}
          chapter={chapter}
        />

      </div>
    </div>
  )
}

function PaginationNav({
  currentIndex,
  total,
  baseUrl,
  nextLessonSlug,
  course,
  chapter,
}: {
  currentIndex: number
  total: number
  baseUrl: string
  nextLessonSlug?: string
  course: string
  chapter: string
}) {
  const prev = currentIndex > 0 ? `${baseUrl}?unit=${currentIndex - 1}` : null;
  const next = currentIndex < total - 1 ? `${baseUrl}?unit=${currentIndex + 1}` : null;

  return (
    <div className="flex justify-between items-center w-full mt-8">
      {prev ? (
        <a href={prev} className="hover:underline text-blue-600">← Previous</a>
      ) : <span />}

      <span className="text-gray-600">{currentIndex + 1} / {total}</span>

      {next ? (
        <a href={next} className="hover:underline text-blue-600">Next →</a>
      ) : nextLessonSlug ? (
        <a
          href={`/learn/${course}/${chapter}/${nextLessonSlug}?unit=0`}
          className="hover:underline text-green-600 font-semibold"
        >
          Start Next Lesson →
        </a>
      ) : <span />}
    </div>
  );
}