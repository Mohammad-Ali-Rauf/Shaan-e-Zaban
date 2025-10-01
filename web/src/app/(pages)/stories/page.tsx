import Link from "next/link"
import { getAllStories, Story } from "@/lib"

export default async function StoriesPage() {
  const stories = await getAllStories()

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent" />
        <div className="relative flex flex-col items-center px-4 py-16 text-center">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-600 rounded-full blur-xl opacity-20" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-800 rounded-full blur-2xl opacity-10" />
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            📚 Story Collection
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            Explore our curated collection of Urdu stories, carefully graded for different learning levels
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Link
              href="/contribute"
              className="group relative px-8 py-4 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl text-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 border border-red-600/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative flex items-center justify-center gap-2">
                <span className="text-xl">✍️</span>
                Write Your Story
              </span>
            </Link>
            
            <Link
              href="/"
              className="px-8 py-4 border border-red-600/50 text-red-400 rounded-xl text-lg font-semibold hover:bg-red-900/30 transition-all duration-300 transform hover:scale-105"
            >
              🏠 Back to Home
            </Link>
          </div>
          
          <div className="flex items-center gap-6 text-gray-400 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>{stories.length}+ Stories</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>3 Difficulty Levels</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid Section */}
      <div className="px-4 pb-20 max-w-7xl mx-auto">
        {/* Level Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <button
              key={level}
              className="px-4 py-2 rounded-lg border border-red-800/50 text-red-300 hover:bg-red-900/30 transition-all duration-200 capitalize text-sm font-medium"
            >
              {level}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story: Story) => (
            <Link
              key={story._id}
              href={`/learn/${story.level}/${story.slug.current}`}
              className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-red-600/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/20"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/0 to-red-900/0 group-hover:from-red-900/10 group-hover:to-red-900/5 rounded-2xl transition-all duration-300" />
              
              <div className="relative z-10">
                {/* Level badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    story.level === 'beginner' ? 'bg-green-900/50 text-green-300 border border-green-700/50' :
                    story.level === 'intermediate' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50' :
                    'bg-red-900/50 text-red-300 border border-red-700/50'
                  }`}>
                    {story.level}
                  </span>
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-sm">📖</span>
                  </div>
                </div>

                {/* Story title */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-200 transition-colors duration-300 text-left line-clamp-2">
                  {story.title}
                </h3>

                {/* Description placeholder */}
                <p className="text-gray-400 text-sm mb-4 text-left line-clamp-2">
                  Immerse yourself in this captivating Urdu story designed for {story.level} learners...
                </p>

                {/* Tags */}
                {story.tags && story.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {story.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs bg-red-900/30 text-red-300 px-2 py-1 rounded-md border border-red-800/50"
                      >
                        #{tag}
                      </span>
                    ))}
                    {story.tags.length > 3 && (
                      <span className="text-xs bg-gray-700/50 text-gray-400 px-2 py-1 rounded-md">
                        +{story.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Progress/CTA */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/50">
                  <span className="text-red-400 text-sm font-medium group-hover:text-red-300 transition-colors">
                    Start Reading →
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <span>⭐</span>
                    <span>4.8</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {stories.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-3">No Stories Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Be the first to contribute and help build our Urdu learning community!
            </p>
            <Link
              href="/contribute"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <span>✍️</span>
              Write First Story
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}