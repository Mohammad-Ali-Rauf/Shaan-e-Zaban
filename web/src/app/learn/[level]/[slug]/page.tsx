import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { getServerSession, getStoryBySlug } from "@/lib"

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
            story.level === 'beginner' ? 'bg-green-900/50 text-green-300 border border-green-700/50' :
            story.level === 'intermediate' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50' :
            'bg-red-900/50 text-red-300 border border-red-700/50'
          }`}>
            {story.level} Level
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          {story.title}
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto rounded-full mb-6"></div>
      </div>

      {/* Main Content Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-red-900/10">
        {/* Urdu Sentence */}
        <div className="text-center mb-8">
          <p className="text-3xl md:text-4xl font-nastaliq text-gray-100 leading-relaxed mb-6">
            {sentence.urdu}
          </p>
          
          {/* Audio Player */}
          {sentence.audioUrl && (
            <div className="flex justify-center mb-6">
              <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-600 max-w-md w-full">
                <audio controls className="w-full">
                  <source src={sentence.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              </div>
            </div>
          )}

          {/* English Translation */}
          <div className="bg-gradient-to-r from-red-900/20 to-transparent rounded-xl p-6 border-l-4 border-red-500">
            <p className="text-lg text-gray-300 italic leading-relaxed">
              &quot;{sentence.english}&quot;
            </p>
          </div>
        </div>

        {/* Vocabulary Breakdown */}
        {sentence.words && sentence.words.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
              <span>📖</span>
              Vocabulary Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sentence.words?.map((word: { text: string, transliteration: string, meaning: string }, idx: number) => (
                <div 
                  key={idx} 
                  className="bg-gray-900/30 border border-gray-600 rounded-xl p-4 hover:border-gray-500 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-2xl font-nastaliq text-gray-100 group-hover:text-red-200 transition-colors">
                      {word.text}
                    </p>
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-red-300 font-medium">
                      {word.transliteration}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {word.meaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress and Navigation */}
        <div className="pt-6 border-t border-gray-700">
          <PaginationNav
            currentIndex={sentenceIndex}
            total={sentences.length}
            baseUrl={`/learn/${level}/${slug}`}
          />
        </div>
      </div>

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
    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
      {/* Previous Button */}
      {prev ? (
        <Link 
          href={prev} 
          className="flex items-center gap-3 px-6 py-3 bg-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-600/50 hover:text-white transition-all duration-300 transform hover:scale-105 border border-gray-600 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous Sentence
        </Link>
      ) : (
        <div className="px-6 py-3 opacity-50 cursor-not-allowed">
          <span className="text-gray-500">Previous</span>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="flex items-center gap-4">
        <div className="bg-gray-700/50 rounded-full px-4 py-2 border border-gray-600">
          <span className="text-gray-300 font-semibold text-sm">
            Sentence <span className="text-red-400">{currentIndex + 1}</span> of {total}
          </span>
        </div>
        <div className="hidden sm:block w-32 bg-gray-600 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-red-600 to-red-800 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Next Button */}
      {next ? (
        <Link 
          href={next} 
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 border border-red-600/30 group"
        >
          Next Sentence
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <div className="flex items-center gap-3 px-6 py-3 bg-gray-700/50 text-gray-500 rounded-xl border border-gray-600">
          Complete
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  )
}