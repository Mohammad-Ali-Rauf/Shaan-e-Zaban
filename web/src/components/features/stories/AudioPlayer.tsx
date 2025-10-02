'use client'

interface AudioPlayerProps {
  audioUrl: string
  storySlug: string
}

export function AudioPlayer({ audioUrl, storySlug }: AudioPlayerProps) {
  const handleAudioPlay = async () => {
    try {
      await fetch('/api/progress/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storySlug: storySlug,
          duration: 1 // 1 minute for audio play
        })
      })
    } catch (error) {
      console.error('Failed to track audio session:', error)
    }
  }

  return (
    <div className="flex justify-center mb-6">
      <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-600 max-w-md w-full">
        <audio
          controls
          className="w-full"
          onPlay={handleAudioPlay}
        >
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      </div>
    </div>
  )
}