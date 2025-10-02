'use client'

export function CompleteStoryButton({ storySlug }: { storySlug: string }) {
  const handleCompleteStory = async () => {
    try {
      const response = await fetch('/api/progress/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storySlug })
      })

      if (response.ok) {
        // Show success message or redirect
        alert('🎉 Story completed! Great job!')
        window.location.href = '/dashboard' // Redirect to dashboard
      } else {
        alert('Failed to mark story as completed')
      }
    } catch (error) {
      console.error('Error completing story:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <button
      onClick={handleCompleteStory}
      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 border border-green-600/30 group"
    >
      Complete Story
      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </button>
  )
}