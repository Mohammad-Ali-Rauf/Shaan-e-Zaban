import { redirect } from "next/navigation"
import { getServerSession, getUserStories, Story } from "@/lib"
import {StoryCard} from "@/components"
import Link from "next/link"

export default async function DashboardPage() {
  const user = await getServerSession()

  if (!user) redirect("/auth/signin")

  const stories = await getUserStories(user.email)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          📚 Your Stories
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Manage and track all the stories you&apos;ve contributed to our Urdu learning community
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-red-400 mb-2">{stories.length}</div>
          <div className="text-gray-400 text-sm">Total Stories</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            {stories.filter((s: Story) => s.level === 'beginner').length}
          </div>
          <div className="text-gray-400 text-sm">Beginner</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-orange-400 mb-2">
            {stories.filter((s: Story) => s.level === 'intermediate').length}
          </div>
          <div className="text-gray-400 text-sm">Intermediate</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-red-400 mb-2">
            {stories.filter((s: Story) => s.level === 'advanced').length}
          </div>
          <div className="text-gray-400 text-sm">Advanced</div>
        </div>
      </div>

      {/* Stories Section */}
      {stories.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
            <span className="text-4xl">📝</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-300 mb-4">No Stories Yet</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
            Start your journey as a contributor and help others learn Urdu through your stories!
          </p>
          <Link
            href="/contribute"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 border border-red-600/30"
          >
            <span className="text-xl">✍️</span>
            Write Your First Story
          </Link>
          
          {/* Quick Tips */}
          <div className="mt-12 bg-gray-800/30 rounded-2xl p-6 border border-gray-700 max-w-2xl mx-auto">
            <h4 className="text-red-300 font-semibold mb-4 text-lg">💡 Getting Started Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">1</span>
                </div>
                <span className="text-gray-400 text-sm">Start with simple, everyday conversations</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">2</span>
                </div>
                <span className="text-gray-400 text-sm">Include cultural context in your stories</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">3</span>
                </div>
                <span className="text-gray-400 text-sm">Use clear and simple Urdu sentences</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">4</span>
                </div>
                <span className="text-gray-400 text-sm">Add accurate English translations</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header with Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-300">Your Contributions</h2>
              <p className="text-gray-500 text-sm">
                {stories.length} story{stories.length !== 1 ? 's' : ''} • Last updated recently
              </p>
            </div>
            <Link
              href="/contribute"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 border border-red-600/30"
            >
              <span>+</span>
              Add New Story
            </Link>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {stories.map((story: Story) => (
              <div key={story._id} className="transform hover:scale-[1.02] transition-transform duration-300">
                <StoryCard key={story._id} story={story} showActions />
              </div>
            ))}
          </div>

          {/* Achievement Section */}
          <div className="bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-700/30 rounded-2xl p-6 mt-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-red-300 mb-2">🎉 Keep Going!</h3>
                <p className="text-gray-400">
                  You&apos;re helping {stories.length * 10}+ learners discover the beauty of Urdu. 
                  {stories.length >= 5 ? " Consider writing an advanced story next!" : " Write more stories to reach more learners!"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{stories.length}</div>
                  <div className="text-gray-400 text-sm">stories</div>
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  {Math.min(stories.length * 20, 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}