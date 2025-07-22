'use client'

import { useEffect } from 'react'

export default function ProgressTracker({
  storyId,
  isLastSentence,
}: {
  storyId: number
  isLastSentence: boolean
}) {
  useEffect(() => {
    if (!isLastSentence) return

    const updateProgress = async () => {
      try {
        await fetch(`/api/progress/${storyId}`, {
          method: 'POST',
        })
      } catch (err) {
        console.error('Failed to update progress:', err)
      }
    }

    updateProgress()
  }, [storyId, isLastSentence])

  return null
}
