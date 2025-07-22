import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email || "" },
    include: {
      progress: {
        include: {
          learningUnit: {
            include: {
              lesson: {
                include: {
                  chapter: {
                    include: { course: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) return <div>User not found 🤷‍♂️</div>;

  // Group progress by course
  const courseMap = new Map<
    string,
    { courseTitle: string; completed: number; total: number; lastLessonSlug?: string }
  >();

  for (const entry of user.progress) {
    const course = entry.learningUnit.lesson.chapter.course;
    const lesson = entry.learningUnit.lesson;

    const courseKey = course.slug;

    if (!courseMap.has(courseKey)) {
      courseMap.set(courseKey, {
        courseTitle: course.title,
        completed: 0,
        total: 0,
        lastLessonSlug: lesson.slug,
      });
    }

    const data = courseMap.get(courseKey)!;
    data.total += 1;
    if (entry.completed) data.completed += 1;
    data.lastLessonSlug = lesson.slug; // assume last accessed
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">📚 Welcome back, {user.name || "learner"}!</h1>

      {[...courseMap.entries()].map(([slug, data]) => {
        const percent = Math.round((data.completed / data.total) * 100);
        return (
          <div key={slug} className="bg-white border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{data.courseTitle}</h2>
            <div className="w-full bg-gray-200 rounded h-3 mb-3">
              <div
                className="bg-blue-600 h-3 rounded"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="text-sm text-gray-700 mb-2">{percent}% complete</p>
            <a
              href={`/learn/${slug}/introduction/${data.lastLessonSlug}?unit=0`}
              className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Resume
            </a>
          </div>
        );
      })}

      {courseMap.size === 0 && (
        <p className="text-gray-600">You haven't started any courses yet. Head to the <a href="/curriculum" className="text-blue-600 underline">Curriculum</a> to get started!</p>
      )}
    </main>
  );
}