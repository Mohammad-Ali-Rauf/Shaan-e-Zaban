import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { StoryLevel } from '@/generated/prisma'

const LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

export default async function CurriculumPage() {
  const session = await getServerSession(authOptions);

  const user = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          progress: {
            where: { completed: true },
            select: { storyId: true },
          },
        },
      })
    : null;

  const completedStoryIds = new Set(user?.progress.map((p) => p.storyId));

  const storiesByLevel = await Promise.all(
    LEVELS.map(async (level) => {
      const stories = await prisma.story.findMany({
        where: { level: level.toUpperCase() as StoryLevel },
        select: {
          id: true,
          slug: true,
          title: true,
        },
        orderBy: { id: 'asc' },
      });
      return { level, stories };
    })
  );

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">📘 Curriculum Overview</h1>

      {storiesByLevel.map(({ level, stories }) => (
        <section key={level} className="border p-4 rounded shadow">
          <h2 className="text-2xl font-semibold capitalize mb-3">{level}</h2>
          <ul className="space-y-2 ml-4">
            {stories.map((story) => (
              <li key={story.slug}>
                <Link
                  href={`/learn/${level}/${story.slug}?sentence=0`}
                  className={`hover:underline ${
                    completedStoryIds.has(story.id)
                      ? 'text-green-600'
                      : 'text-blue-600'
                  }`}
                >
                  {story.title} {completedStoryIds.has(story.id) && '✅'}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}