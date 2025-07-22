'use client'

import { useEffect } from 'react'

export default function ProgressTracker({ learningUnitId }: { learningUnitId: number }) {
  useEffect(() => {
    const updateProgress = async () => {
      try {
        await fetch('/api/progress/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ learningUnitId }),
        })
      } catch (err) {
        console.error('Failed to update progress:', err)
      }
    }

    updateProgress()
  }, [learningUnitId])

  return null
}
