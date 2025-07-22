'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface Props {
  user: {
    name: string | null
    progress: {
      completed: boolean
      learningUnit: {
        order: number
        urduText: string
        lesson: {
          slug: string
          title: string
          chapter: {
            slug: string
            course: {
              slug: string
              title: string
            }
          }
        }
      }
    }[]
  }
}

export default function Dashboard({ user }: Props) {
  const [summary, setSummary] = useState<null | {
    total: number
    completed: number
    percent: number
    lastUnit: any
  }>(null)

  useEffect(() => {
    fetch('/api/progress/summary')
      .then(res => res.json())
      .then(setSummary)
  }, [])

  // Group progress by course
  const courseMap = new Map<
    string,
    { courseTitle: string; completed: number; total: number; lastLessonSlug?: string }
  >()

  for (const entry of user.progress) {
    const course = entry.learningUnit.lesson.chapter.course
    const lesson = entry.learningUnit.lesson
    const courseKey = course.slug

    if (!courseMap.has(courseKey)) {
      courseMap.set(courseKey, {
        courseTitle: course.title,
        completed: 0,
        total: 0,
        lastLessonSlug: lesson.slug,
      })
    }

    const data = courseMap.get(courseKey)!
    data.total += 1
    if (entry.completed) data.completed += 1
    data.lastLessonSlug = lesson.slug
  }

  if (!summary) return <p className="p-8">Loading dashboard...</p>

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">📚 Welcome back, {user.name || 'learner'}!</h1>

      <div className="text-lg">
        You've completed <b>{summary.completed}</b> out of <b>{summary.total}</b> units
        (<b>{summary.percent}%</b>)
      </div>

      {summary.lastUnit?.learningUnit && (
        <div>
          <h2 className="text-xl font-semibold">Resume Learning:</h2>
          <Link
            href={`/learn/${summary.lastUnit.learningUnit.lesson.chapter.course.slug}/${summary.lastUnit.learningUnit.lesson.chapter.slug}/${summary.lastUnit.learningUnit.lesson.slug}?unit=${summary.lastUnit.learningUnit.order}`}
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Continue Lesson: {summary.lastUnit.learningUnit.lesson.title}
          </Link>
        </div>
      )}

      {[...courseMap.entries()].map(([slug, data]) => {
        const percent = Math.round((data.completed / data.total) * 100)
        return (
          <div key={slug} className="bg-white border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{data.courseTitle}</h2>
            <div className="w-full bg-gray-200 rounded h-3 mb-3">
              <div
                className="bg-blue-600 h-3 rounded"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="text-sm text-gray-700 mb-2">{percent}% complete</p>
            <a
              href={`/learn/${slug}/introduction/${data.lastLessonSlug}?unit=0`}
              className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Resume
            </a>
          </div>
        )
      })}

      {courseMap.size === 0 && (
        <p className="text-gray-600">
          You haven't started any courses yet. Head to the{' '}
          <a href="/curriculum" className="text-blue-600 underline">
            Curriculum
          </a>{' '}
          to get started!
        </p>
      )}
    </main>
  )
}