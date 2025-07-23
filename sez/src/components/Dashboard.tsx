'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface StoryProgress {
  storyId: number
  completed: boolean
  score?: number
  story: {
    title: string
    level: string
  }
}

interface Props {
  user: {
    name: string | null
    progress: StoryProgress[]
  }
}

export default function Dashboard({ user }: Props) {
  const [summary, setSummary] = useState<null | {
    total: number
    completed: number
    percent: number
    lastUnit: {
      storyId: number
      story: {
        title: string
        level: string
      }
    } | null
  }>(null)

  useEffect(() => {
    fetch('/api/progress/summary')
      .then(res => res.json())
      .then(setSummary)
  }, [])

  if (!summary) return <p className="p-8">Loading dashboard...</p>

  // Group progress by level
  const levelMap = new Map<
    string,
    { stories: StoryProgress[]; completed: number }
  >()

  for (const entry of user.progress) {
    const level = entry.story.level
    if (!levelMap.has(level)) {
      levelMap.set(level, { stories: [], completed: 0 })
    }

    const data = levelMap.get(level)!
    data.stories.push(entry)
    if (entry.completed) data.completed += 1
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">📚 Welcome back, {user.name || 'learner'}!</h1>

      <div className="text-lg">
        You've completed <b>{summary.completed}</b> out of <b>{summary.total}</b> stories
        (<b>{summary.percent}%</b>)
      </div>

      {summary.lastUnit && (
        <div>
          <h2 className="text-xl font-semibold mt-6">Resume Learning:</h2>
          <Link
            href={`/learn/${summary.lastUnit.story.level.toLowerCase()}/${summary.lastUnit.storyId}`}
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Continue: {summary.lastUnit.story.title}
          </Link>
        </div>
      )}

      {[...levelMap.entries()].map(([level, data]) => {
        const percent = Math.round((data.completed / data.stories.length) * 100)
        return (
          <div key={level} className="bg-white border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2 capitalize">{level} Level</h2>
            <div className="w-full bg-gray-200 rounded h-3 mb-3">
              <div
                className="bg-blue-600 h-3 rounded"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="text-sm text-gray-700 mb-2">{percent}% complete</p>
            <a
              href={`/learn/${level.toLowerCase()}`}
              className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Stories
            </a>
          </div>
        )
      })}

      {levelMap.size === 0 && (
        <p className="text-gray-600">
          You haven't started any stories yet. Head to the{' '}
          <a href="/curriculum" className="text-blue-600 underline">
            Curriculum
          </a>{' '}
          to get started!
        </p>
      )}

      <Link href="/upload" className="text-blue-600 hover:underline">Upload Your Own Naunehal Page</Link>
    </main>
  )
}
