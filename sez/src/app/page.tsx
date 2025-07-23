import Link from "next/link"
import { getAllStories } from "@/lib/sanity"

export default async function HomePage() {
  const stories = await getAllStories()

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-10 font-nastaliq">
        شانِ زبان
      </h1>

      <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mb-8">
        A culturally authentic platform to learn standard Urdu — in Urdu. No Roman script, no shortcuts.
      </p>

      <Link
        href="/contribute"
        className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition"
      >
        ✍️ Contribute Your Own Story
      </Link>

      <h2 className="text-3xl font-bold mt-16 mb-4">📚 Available Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-4">
        {stories.map((story: any) => (
          <Link
            key={story._id}
            href={`/learn/${story.level}/${story.slug.current}`}
            className="border p-4 rounded-lg shadow hover:shadow-md transition text-left bg-white"
          >
            <h3 className="text-xl font-semibold mb-1">{story.title}</h3>
            <p className="text-sm text-gray-500 capitalize">📖 {story.level}</p>
            {story.tags?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {story.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </main>
  )
}
