'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/hooks/useSession'
import { User } from '@/generated/prisma'

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-400 animate-fade-in">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin opacity-20"></div>
      </div>
      <p className="text-lg font-medium text-gray-300">Warming up your editor...</p>
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

    const res = await fetch('/api/stories/', {
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
          name: (user as User).name,
          email: (user as User).email,
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
  if (error) return <p className="text-center mt-10 text-red-400 bg-red-900/50 border border-red-800 px-4 py-3 rounded-lg max-w-md mx-auto">{error}</p>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-4">
          ✍️ Create New Story
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Share your Urdu story with the community. Add sentences in both Urdu and English to help learners.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 space-y-8 shadow-2xl shadow-red-900/10">
        {/* Story Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-red-300 mb-2">Story Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
              placeholder="e.g. My Urdu Adventure"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-300 mb-2">Difficulty Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
            >
              <option value="beginner" className="bg-gray-800">Beginner</option>
              <option value="intermediate" className="bg-gray-800">Intermediate</option>
              <option value="advanced" className="bg-gray-800">Advanced</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-red-300 mb-2">Tags (comma-separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
            placeholder="e.g. travel, culture, humor, family"
          />
          <p className="text-gray-400 text-xs mt-2">Add relevant tags to help readers find your story</p>
        </div>

        {/* Sentences Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="block text-lg font-semibold text-red-300">Sentences</label>
            <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
              {sentences.length} {sentences.length === 1 ? 'sentence' : 'sentences'}
            </span>
          </div>
          
          {sentences.map((s, idx) => (
            <div key={idx} className="relative bg-gray-900/30 p-6 rounded-xl border border-gray-600 space-y-4 group hover:border-gray-500 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {idx + 1}
                </div>
                <p className="text-sm font-medium text-gray-400">Sentence {idx + 1}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Urdu Text</label>
                  <input
                    placeholder="اردو میں لکھیں"
                    value={s.urdu}
                    onChange={(e) => handleChangeSentence(idx, 'urdu', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300 font-urdu text-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">English Translation</label>
                  <input
                    placeholder="Write in English"
                    value={s.english}
                    onChange={(e) => handleChangeSentence(idx, 'english', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              
              {sentences.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSentence(idx)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-300 hover:bg-red-900/30 p-2 rounded-lg transition-all duration-200 group-hover:opacity-100 opacity-70"
                  title="Remove sentence"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddSentence}
            className="w-full py-4 border-2 border-dashed border-gray-600 border-red-800/50 rounded-xl text-gray-400 hover:text-red-400 hover:border-red-600/50 hover:bg-red-900/10 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Another Sentence
            </div>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-red-600/30 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <span className="relative flex items-center justify-center gap-2">
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Publishing Story...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Publish Story
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  )
}