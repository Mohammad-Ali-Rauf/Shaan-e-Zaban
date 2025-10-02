'use client'

import { useState, useEffect } from 'react'

interface ProgressActionsProps {
  storySlug: string
  storyId?: string
  storyLevel: string
  currentSentence: number
  totalSentences: number
  isLastSentence: boolean
}

export function ProgressActions({ 
  storySlug, 
  storyId, 
  storyLevel, 
  currentSentence, 
  totalSentences, 
  isLastSentence 
}: ProgressActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Check if story is already favorited or rated
  useEffect(() => {
    // You can fetch user's progress here to set initial states
    // For now, we'll set defaults
  }, [])

  const handleFavorite = async () => {
    setIsLoading(true)
    try {
      // This would call a favorite endpoint (to be implemented)
      setIsFavorite(!isFavorite)
      // await fetch('/api/progress/favorite', { ... })
    } catch (error) {
      console.error('Error updating favorite:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRate = async (rating: number) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/progress/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          storySlug, 
          rating 
        })
      })

      if (response.ok) {
        setUserRating(rating)
        alert('Rating submitted! ⭐')
      }
    } catch (error) {
      console.error('Error rating story:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        disabled={isLoading}
        className={`p-2 rounded-lg border transition-all duration-300 ${
          isFavorite 
            ? 'bg-red-900/50 border-red-600 text-red-300' 
            : 'bg-gray-700/50 border-gray-600 text-gray-400 hover:border-red-600 hover:text-red-400'
        }`}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      {/* Rating Stars */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            disabled={isLoading}
            className={`text-lg transition-transform hover:scale-110 ${
              star <= userRating ? 'text-yellow-400' : 'text-gray-500'
            }`}
            title={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            {star <= userRating ? '⭐' : '☆'}
          </button>
        ))}
      </div>

      {/* Progress Badge */}
      <div className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold border border-blue-700/50">
        {currentSentence}/{totalSentences}
      </div>
    </div>
  )
}