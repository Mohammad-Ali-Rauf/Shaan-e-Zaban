'use client'

import Link from 'next/link'
import { CompleteStoryButton } from './CompleteStoryButton'

interface PaginationNavProps {
  currentIndex: number
  total: number
  baseUrl: string
  storySlug: string
}

export function PaginationNav({ currentIndex, total, baseUrl, storySlug }: PaginationNavProps) {
  const prev = currentIndex > 0 ? `${baseUrl}?sentence=${currentIndex - 1}` : null
  const next = currentIndex < total - 1 ? `${baseUrl}?sentence=${currentIndex + 1}` : null

  // Track reading time when navigating
  const trackReadingSession = async () => {
    try {
      await fetch('/api/progress/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storySlug: storySlug,
          duration: 2 // 2 minutes per sentence reading
        })
      })
    } catch (error) {
      console.error('Failed to track reading session:', error)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
      {/* Previous Button */}
      {prev ? (
        <Link
          href={prev}
          onClick={trackReadingSession}
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
          onClick={trackReadingSession}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 border border-red-600/30 group"
        >
          Next Sentence
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <CompleteStoryButton storySlug={storySlug} />
      )}
    </div>
  )
}