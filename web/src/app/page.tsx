import Link from "next/link"

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent" />
        <div className="relative flex flex-col items-center px-4 py-16 text-center">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-600 rounded-full blur-xl opacity-20" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-800 rounded-full blur-2xl opacity-10" />
          
          <h1 className="urdu text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            شانِ زبان
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            A culturally authentic platform to learn standard Urdu through immersive stories and poetry
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Link
              href="/contribute"
              className="group relative px-8 py-4 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl text-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 border border-red-600/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative flex items-center justify-center gap-2">
                <span className="text-xl">✍️</span>
                Start Writing
              </span>
            </Link>
            
            <Link
              href="/stories"
              className="px-8 py-4 border border-red-600/50 text-red-400 rounded-xl text-lg font-semibold hover:bg-red-900/30 transition-all duration-300 transform hover:scale-105"
            >
              📚 Browse Collection
            </Link>
          </div>
          
          <div className="flex items-center gap-6 text-gray-400 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>Interactive Stories</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>3 Difficulty Levels</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>Audio Narration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 pt-8 pb-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Why Learn with Stories?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience Urdu in context, not just vocabulary lists. Our story-based approach makes learning natural and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "📖",
              title: "Immersive Learning",
              description: "Learn Urdu through captivating stories that transport you to different cultural contexts."
            },
            {
              icon: "🎧",
              title: "Audio Narration",
              description: "Listen to native pronunciation with our human-voiced audio recordings."
            },
            {
              icon: "📈",
              title: "Progressive Difficulty",
              description: "Start with simple stories and gradually advance to complex literary pieces."
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-red-600/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-gray-800 bg-gradient-to-r from-red-900/10 to-black">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to master Urdu?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join our community of learners who are improving their Urdu through authentic cultural stories and poetry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/stories"
              className="px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-500 transition-colors"
            >
              Explore Stories
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border border-gray-600 text-gray-300 rounded-xl font-semibold hover:border-red-600 hover:text-red-300 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}