'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Story } from '@/lib'

interface StoryCardProps {
  story: Story
  showActions?: boolean
}

export default function StoryCard({ story, showActions = false }: StoryCardProps) {
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/edit/${story.slug.current}`)
  }

  return (
    <div className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-red-600/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/20">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/0 to-red-900/0 group-hover:from-red-900/10 group-hover:to-red-900/5 rounded-2xl transition-all duration-300" />
      
      <div className="relative z-10">
        {/* Level badge and actions */}
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
            story.level === 'beginner' ? 'bg-green-900/50 text-green-300 border border-green-700/50' :
            story.level === 'intermediate' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50' :
            'bg-red-900/50 text-red-300 border border-red-700/50'
          }`}>
            {story.level}
          </span>
          
          {showActions && (
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-all duration-300 group/edit"
                title="Edit story"
              >
                <span className="text-sm group-hover/edit:scale-110 transition-transform">✏️</span>
              </button>
              <Link 
                href={`/learn/${story.level}/${story.slug.current}`}
                className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-500 transition-all duration-300 group/read"
              >
                <span className="text-sm group-hover/read:scale-110 transition-transform">📖</span>
              </Link>
            </div>
          )}
        </div>

        {/* Story title */}
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-200 transition-colors duration-300 text-left line-clamp-2">
          {story.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 text-left line-clamp-2">
          {story.sentences?.[0]?.english || 'Immerse yourself in this captivating Urdu story...'}
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
            {showActions ? 'Manage Story →' : 'Start Reading →'}
          </span>
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <span>⭐</span>
            <span>4.8</span>
          </div>
        </div>
      </div>
    </div>
  )
}