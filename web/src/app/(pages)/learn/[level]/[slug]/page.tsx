import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { getStoryBySlug, getServerSession } from "@/lib"
import { ProgressActions } from "@/components/features/progress/ProgressActions"
import { ClientStoryRenderer } from "./ClientStoryRenderer"

export default async function StoryPage({
  params,
  searchParams
}: {
  params: Promise<{ level: string; slug: string }>
  searchParams?: Promise<{ sentence?: string | string[] }>
}) {
  const { level, slug } = await params

  const rawSentenceParam = (await searchParams)?.sentence
  const rawIndex = parseInt(
    Array.isArray(rawSentenceParam) ? rawSentenceParam[0] : rawSentenceParam ?? "0",
    10
  )
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
    redirect(`/learn/${level}/${slug}?sentence=0`)
    return
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
            story.level === 'beginner' ? 'bg-green-900/50 text-green-300 border border-green-700/50' :
            story.level === 'intermediate' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50' :
            'bg-red-900/50 text-red-300 border border-red-700/50'
          }`}>
            {story.level}
          </span>

          {/* Progress Actions Component */}
          <ProgressActions
            storySlug={slug}
            storyId={story._id}
            storyLevel={story.level}
            currentSentence={sentenceIndex + 1}
            totalSentences={sentences.length}
            isLastSentence={sentenceIndex === sentences.length - 1}
          />
        </div>

        <h1 className="urdu urdu-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          {story.title}
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto rounded-full mb-6"></div>
      </div>

      {/* Client Component for Mode Switching */}
      <ClientStoryRenderer 
        story={story}
        sentence={sentence}
        sentenceIndex={sentenceIndex}
        sentences={sentences}
        level={level}
        slug={slug}
      />

      {/* Story Info Footer */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Stories
        </Link>
      </div>
    </div>
  )
}