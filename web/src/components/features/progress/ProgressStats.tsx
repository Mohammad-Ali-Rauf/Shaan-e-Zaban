'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ProgressData {
  progress: {
    totalStoriesCompleted: number
    totalLearningHours: number
    favoriteCount: number
    currentStreak: number
    longestStreak: number
    totalCompletion: number
    totalStoriesAvailable: number
    levelStats: {
      beginner: { completed: number; total: number }
      intermediate: { completed: number; total: number }
      advanced: { completed: number; total: number }
    }
  }
  recentActivity: Array<{
    date: string
    stories: string[]
    duration: number
  }>
}

export function ProgressStats() {
  const [progressData, setProgressData] = useState<ProgressData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/progress/stats')
        
        if (!response.ok) {
          throw new Error('Failed to fetch progress data')
        }
        
        const data = await response.json()
        setProgressData(data)
      } catch (err) {
        console.error('Error fetching progress:', err)
        setError('Failed to load progress data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgress()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !progressData) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center">
        <div className="text-yellow-400 text-lg mb-2">⚠️</div>
        <p className="text-gray-400">{error || 'No progress data available'}</p>
        <p className="text-gray-500 text-sm mt-2">Start reading stories to track your progress!</p>
      </div>
    )
  }

  const { progress } = progressData

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-300 mb-6 flex items-center gap-3">
        📊 Your Learning Progress
        {progress.currentStreak > 0 && (
          <span className="bg-yellow-900/50 text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold border border-yellow-700/50">
            🔥 {progress.currentStreak} day streak
          </span>
        )}
      </h2>

      {/* Main Progress Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-900/30 to-green-800/10 border border-green-700/30 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">{progress.totalStoriesCompleted}</div>
          <div className="text-gray-400 text-sm">Stories Completed</div>
          <div className="text-green-300 text-xs mt-1">
            {progress.totalCompletion}% of library
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 border border-blue-700/30 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">{progress.totalLearningHours}</div>
          <div className="text-gray-400 text-sm">Hours Learned</div>
          <div className="text-blue-300 text-xs mt-1">
            {Math.round(progress.totalLearningHours / 24 * 10) / 10} days equivalent
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-700/30 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">{progress.currentStreak}</div>
          <div className="text-gray-400 text-sm">Current Streak</div>
          <div className="text-purple-300 text-xs mt-1">
            Best: {progress.longestStreak} days
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-900/30 to-red-800/10 border border-red-700/30 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-red-400 mb-2">{progress.favoriteCount}</div>
          <div className="text-gray-400 text-sm">Favorites</div>
          <div className="text-red-300 text-xs mt-1">
            Stories you love
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-gray-900/30 rounded-2xl p-6 border border-gray-600">
        <h3 className="text-lg font-bold text-gray-300 mb-4">🎯 Level Progress</h3>
        <div className="space-y-4">
          {(['beginner', 'intermediate', 'advanced'] as const).map(level => {
            const levelStat = progress.levelStats[level]
            const percentage = levelStat.total > 0 ? Math.round((levelStat.completed / levelStat.total) * 100) : 0
            
            return (
              <div key={level} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className={`w-20 text-sm font-semibold capitalize ${
                    level === 'beginner' ? 'text-green-400' :
                    level === 'intermediate' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {level}
                  </span>
                  <div className="flex-1 bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        level === 'beginner' ? 'bg-green-500' :
                        level === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-gray-400 text-sm w-16 text-right">
                  {levelStat.completed}/{levelStat.total}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Call to Action */}
      {progress.totalStoriesCompleted === 0 && (
        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-4">Start your Urdu learning journey today!</p>
          <Link 
            href="/stories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300"
          >
            📚 Explore Stories
          </Link>
        </div>
      )}
    </div>
  )
}