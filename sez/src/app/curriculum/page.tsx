import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CurriculumPage() {
  const courses = await prisma.course.findMany({
    include: {
      chapters: {
        include: {
          lessons: true,
        },
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">📚 Curriculum Overview</h1>

      {courses.map((course) => (
        <div key={course.id} className="border rounded p-4 space-y-2 shadow-sm">
          <h2 className="text-2xl font-semibold">{course.title}</h2>
          <p className="text-gray-600">{course.description}</p>

          <div className="flex flex-wrap gap-3">
            {course.chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/learn/${course.slug}/${chapter.slug}/${chapter.lessons[0]?.slug}`}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition"
              >
                Start {chapter.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}