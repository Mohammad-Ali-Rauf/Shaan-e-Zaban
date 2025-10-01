'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/hooks/useSession'

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-600 animate-fade-in">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-lg font-medium">Warming up your editor...</p>
    </div>
  )
}

export default function Editor() {
  const { user, loading, error } = useSession()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('beginner')
  const [tags, setTags] = useState('')
  const [sentences, setSentences] = useState([{ urdu: '', english: '' }])
  const [submitting, setSubmitting] = useState(false)

  const handleAddSentence = () => {
    setSentences([...sentences, { urdu: '', english: '' }])
  }

  const handleRemoveSentence = (index: number) => {
    const updated = sentences.filter((_, i) => i !== index)
    setSentences(updated)
  }

  const handleChangeSentence = (index: number, key: 'urdu' | 'english', value: string) => {
    const updated = [...sentences]
    updated[index][key] = value
    setSentences(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert('You must be signed in to submit a story.')
      return
    }

    setSubmitting(true)

    const res = await fetch('/api/stories/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        level,
        tags: tags.split(',').map((t) => t.trim()),
        sentences,
        author: {
          name: user.name,
          email: user.email,
        }
      }),
    })

    setSubmitting(false)

    if (!res.ok) {
      alert('Failed to submit story.')
      return
    }

    router.push('/dashboard')
  }

  if (loading) return <LoadingScreen />
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800">📖 Submit a New Story</h2>

      {/* Story Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. My Urdu Adventure"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. travel, culture, humor"
          />
        </div>
      </div>

      {/* Sentences Section */}
      <div className="space-y-6">
        <label className="block text-lg font-semibold text-gray-800">Sentences</label>
        {sentences.map((s, idx) => (
          <div key={idx} className="relative bg-gray-50 p-4 rounded-md border space-y-2">
            <p className="text-sm font-medium text-gray-600">Sentence {idx + 1}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                placeholder="Urdu"
                value={s.urdu}
                onChange={(e) => handleChangeSentence(idx, 'urdu', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <input
                placeholder="English"
                value={s.english}
                onChange={(e) => handleChangeSentence(idx, 'english', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            {sentences.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveSentence(idx)}
                className="absolute top-2 right-2 text-xs text-red-500 hover:underline"
              >
                ✖ Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddSentence}
          className="text-sm text-blue-600 hover:underline"
        >
          Next Sentence
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {submitting ? 'Publishing...' : 'Publish'}
      </button>
    </form>
  )
}
