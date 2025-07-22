import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-10 font-nastaliq">
        شانِ زبان
      </h1>

      <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mb-8">
        A culturally authentic platform to learn standard Urdu — in Urdu. No Roman script, no shortcuts.
      </p>

      <Link
        href="/learn/beginner/a1/beginner-a1-lesson-1?unit=0"
        className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition"
      >
        Start Learning
      </Link>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
        {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level) => (
          <Link
            key={level}
            href={`/learn/beginner/${level.toLowerCase()}/beginner-${level.toLowerCase()}-lesson-1`}
            className="border p-4 rounded hover:shadow-lg transition text-lg"
          >
            📘 {level} Level
          </Link>
        ))}
      </div>
    </main>
  )
}
