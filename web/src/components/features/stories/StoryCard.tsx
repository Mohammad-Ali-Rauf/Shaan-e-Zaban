'use client'

import { Story } from '@/lib'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function StoryCard({ story, showActions = false }: { story: Story, showActions: boolean }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this story?')) return

    const res = await fetch(`/api/stories/${story._id}`, {
      method: 'DELETE',
    });

    if (res.ok) router.refresh()
    else alert('Failed to delete')
  }

  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-red-600/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Story Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${story.level === 'beginner' ? 'bg-green-900/50 text-green-300 border border-green-700/50' :
                story.level === 'intermediate' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50' :
                  'bg-red-900/50 text-red-300 border border-red-700/50'
              }`}>
              {story.level}
            </span>
            {story.tags && story.tags.length > 0 && (
              <span className="text-xs text-gray-400">
                {story.tags.slice(0, 2).join(', ')}
                {story.tags.length > 2 && ` +${story.tags.length - 2}`}
              </span>
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-100 group-hover:text-red-200 transition-colors duration-300 mb-2 line-clamp-2">
            {story.title}
          </h2>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {story.sentences?.length || 0} sentences
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {story.author?.name || 'Anonymous'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Read Button */}
          <Link
            href={`/learn/${story.level}/${story.slug.current}`}
            className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 border border-red-600/30 flex items-center gap-2 group/read"
          >
            <span>Read</span>
            <svg className="w-4 h-4 group-hover/read:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Action Buttons */}
          {showActions && (
            <div className="flex items-center gap-2">
              {/* Edit Button */}
              <Link
                href={`/dashboard/edit/${story._id}`}
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg border border-gray-600 hover:border-blue-600/50 transition-all duration-200 group/edit"
                title="Edit story"
              >
                <svg className="w-4 h-4 group-hover/edit:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Link>

              {/* Delete Button */}
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg border border-gray-600 hover:border-red-600/50 transition-all duration-200 group/delete"
                title="Delete story"
              >
                <svg className="w-4 h-4 group-hover/delete:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {story.tags && story.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700/50">
          {story.tags.slice(0, 4).map((tag: string) => (
            <span
              key={tag}
              className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md border border-gray-600/50"
            >
              #{tag}
            </span>
          ))}
          {story.tags.length > 4 && (
            <span className="text-xs bg-gray-700/30 text-gray-500 px-2 py-1 rounded-md">
              +{story.tags.length - 4}
            </span>
          )}
        </div>
      )}
    </div>
  )
}