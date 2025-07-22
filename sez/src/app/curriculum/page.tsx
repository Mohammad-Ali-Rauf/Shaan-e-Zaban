import Link from "next/link";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const session = await getServerSession(authOptions);
const user = session?.user?.email
  ? await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      progress: {
        select: {
          learningUnitId: true,
        },
      },
    },
  })
  : null;

const completedUnitIds = new Set(user?.progress.map((p) => p.learningUnitId));

export default async function CurriculumPage() {
  const courses = await prisma.course.findMany({
    include: {
      chapters: {
        include: {
          lessons: {
            include: {
              learningUnits: true,
            },
          }
        },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { title: "asc" },
  });

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">📚 Curriculum Overview</h1>

      {courses.map((course) => (
        <section key={course.id} className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>

          {course.chapters.map((chapter) => (
            <div key={chapter.id} className="ml-4 mb-4">
              <h3 className="text-lg font-medium text-gray-700">
                📘 {chapter.title}
              </h3>

              <ul className="list-disc ml-6">
                {chapter.lessons.map((lesson) => {
                  const totalUnits = lesson.learningUnits.length;
                  const completedUnits = lesson.learningUnits.filter((unit) =>
                    completedUnitIds.has(unit.id)
                  ).length;

                  const isCompleted = totalUnits > 0 && completedUnits === totalUnits;

                  return (
                    <li key={lesson.id}>
                      <Link
                        href={`/learn/${course.slug}/${chapter.slug}/${lesson.slug}?unit=0`}
                        className={`hover:underline ${isCompleted ? "text-green-600" : "text-blue-600"
                          }`}
                      >
                        {lesson.title} {isCompleted && "✅"}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}