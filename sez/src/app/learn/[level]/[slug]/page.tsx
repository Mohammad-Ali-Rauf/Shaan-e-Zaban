import { notFound, redirect } from "next/navigation"
import Link from "next/link"

import { getStoryBySlug } from "@/lib/sanity"
import { getServerSession } from "@/lib/getServerSession"

interface Props {
  params: { level: string; slug: string }
  searchParams?: { sentence?: string }
}

export default async function StoryPage({ params, searchParams }: Props) {
  const { level, slug } = params
  const rawIndex = parseInt(await searchParams?.sentence || "0", 10)
  const sentenceIndex = Number.isNaN(rawIndex) ? 0 : rawIndex

  const session = await getServerSession()
  if (!session) redirect("/auth/signin")

  const story = await getStoryBySlug(slug)

  if (!story || story.level.toLowerCase() !== level.toLowerCase()) {
    return notFound()
  }

  const sentences = story.sentences || []
  const sentence = sentences[sentenceIndex]

  if (!sentence) {
    return redirect(`/learn/${level}/${slug}?sentence=0`)
  }

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>

      <div className="border p-4 rounded shadow space-y-4 bg-white">
        {/* 🔡 Urdu Sentence */}
        <p className="text-right text-2xl font-nastaliq">{sentence.urdu}</p>

        {/* 🔍 Word Breakdown */}
        <div className="space-y-2">
          {sentence.words?.map((word, idx) => (
            <div key={idx} className="border p-2 rounded bg-gray-50">
              <p className="text-xl">{word.text}</p>
              <p className="text-sm text-gray-600 italic">
                {word.transliteration} — {word.meaning}
              </p>
            </div>
          ))}
        </div>

        {/* 🔊 Audio */}
        {sentence.audioUrl && (
          <audio controls className="mt-4 w-full">
            <source src={sentence.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        )}

        {/* 💬 English Translation */}
        <div className="italic text-gray-600 mt-2">{sentence.english}</div>
      </div>

      <PaginationNav
        currentIndex={sentenceIndex}
        total={sentences.length}
        baseUrl={`/learn/${level}/${slug}`}
      />
    </div>
  )
}

function PaginationNav({
  currentIndex,
  total,
  baseUrl,
}: {
  currentIndex: number
  total: number
  baseUrl: string
}) {
  const prev = currentIndex > 0 ? `${baseUrl}?sentence=${currentIndex - 1}` : null
  const next = currentIndex < total - 1 ? `${baseUrl}?sentence=${currentIndex + 1}` : null

  return (
    <div className="flex justify-between items-center w-full mt-8 text-sm text-blue-600">
      {prev ? (
        <Link href={prev} className="hover:underline">
          ← Previous
        </Link>
      ) : (
        <span />
      )}

      <span className="text-gray-600">
        {currentIndex + 1} / {total}
      </span>

      {next ? (
        <Link href={next} className="hover:underline">
          Next →
        </Link>
      ) : (
        <span />
      )}
    </div>
  )
}
