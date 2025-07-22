import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function CurriculumPage() {
  const courses = await prisma.course.findMany({
    include: {
      chapters: {
        include: {
          lessons: {
            include: {
              learningUnits: true
            },
          },
        },
      },
    },
  });

  const grouped = {
    Beginner: courses.filter(c => c.title === 'Beginner'),
    Intermediate: courses.filter(c => c.title === 'Intermediate'),
    Advanced: courses.filter(c => c.title === 'Advanced'),
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      <h1 className="text-3xl font-bold text-center">📘 Curriculum</h1>

      {Object.entries(grouped).map(([level, group]) => (
        <section key={level}>
          <h2 className="text-2xl font-semibold mb-4">{level}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {group.map(course => {
              const firstChapter = course.chapters[0]
              const firstLesson = firstChapter?.lessons[0]
              const href = firstLesson
                ? `/learn/${course.slug}/${firstChapter.slug}/${firstLesson.slug}?unit=0`
                : "#"

              return (
                <Link
                  key={course.id}
                  href={href}
                  className="border p-4 rounded shadow hover:shadow-md transition bg-white"
                >
                  <h3 className="text-xl font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{course.chapters.length} chapters</p>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </main>
  );
}