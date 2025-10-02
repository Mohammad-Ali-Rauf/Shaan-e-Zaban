// components/features/stories/Editor.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/generated/prisma'
import { useAuthStore } from '@/stores/authStore'
import { v4 as uuidv4 } from 'uuid'

interface Word {
  text: string
  transliteration: string
  meaning: string
}

interface Sentence {
  urdu: string
  english: string
  audioUrl?: string
  words: Word[]
}

interface StoryData {
  _id?: string
  title: string
  level: 'beginner' | 'intermediate' | 'advanced'
  tags?: string[]
  sentences: Sentence[]
  slug?: {
    _type: "slug"
    current: string
  }
  author?: {
    _id: string
    name?: string
    email?: string
  }
}

interface EditorProps {
  mode?: 'create' | 'edit'
  story?: StoryData
}

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

export default function Editor({ mode = 'create', story }: EditorProps) {
  const { user, isLoading } = useAuthStore()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')
  const [tags, setTags] = useState('')
  const [sentences, setSentences] = useState<Sentence[]>([
    { urdu: '', english: '', words: [] }
  ])
  const [submitting, setSubmitting] = useState(false)

  // Pre-fill form when in edit mode
  useEffect(() => {
    if (mode === 'edit' && story) {
      setTitle(story.title)
      setLevel(story.level)
      setTags(story.tags?.join(', ') || '')
      setSentences(story.sentences || [{ urdu: '', english: '', words: [] }])
    }
  }, [mode, story])

  const handleAddSentence = () => {
    setSentences([...sentences, { urdu: '', english: '', words: [] }])
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

  // Generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert('You must be signed in to submit a story.')
      return
    }

    if (!title.trim()) {
      alert('Please enter a story title.')
      return
    }

    setSubmitting(true)

    const storyData = {
      _id: mode === 'edit' ? story?._id : undefined,
      title: title.trim(),
      level,
      slug: mode === 'edit' ? story?.slug : {
        _type: 'slug' as const,
        current: generateSlug(title)
      },
      tags: tags.split(',').map((t) => t.trim()).filter(t => t.length > 0),
      sentences: sentences.map(sentence => ({
        urdu: sentence.urdu.trim(),
        english: sentence.english.trim(),
        audioUrl: sentence.audioUrl || '',
        words: sentence.words || []
      })),
      author: {
        _id: user.id,
        name: user.name,
        email: user.email
      }
    }

    try {
      const url = mode === 'edit'
        ? `/api/stories/${story?.slug?.current}`  // PATCH to specific story
        : '/api/stories'                // POST to base URL

      const method = mode === 'edit' ? 'PATCH' : 'POST'


      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData),
      })

      if (!res.ok) {
        const error = await res.json()
        alert(error.error || `Failed to ${mode === 'edit' ? 'update' : 'submit'} story.`)
        return
      }

      // Success - redirect to dashboard
      router.push('/dashboard')
      router.refresh()

    } catch (error) {
      console.error('Submission error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) return <LoadingScreen />

  const isEditMode = mode === 'edit'
  const headerText = isEditMode ? '✏️ Edit Story' : '✍️ Create New Story'
  const submitText = isEditMode ? 'Update Story' : 'Publish Story'
  const submittingText = isEditMode ? 'Updating Story...' : 'Publishing Story...'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header Section */}
      <div className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent" />
        <div className="relative px-4 py-8 max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-4">
              {headerText}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
              {isEditMode
                ? 'Update your Urdu story with new content or corrections.'
                : 'Share your Urdu story with the community. Add sentences in both Urdu and English to help learners.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Editor Form */}
      <div className="px-3 sm:px-4 py-6 sm:py-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 shadow-2xl shadow-red-900/10">
          {/* Story Info - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-red-300">Story Title *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900/50 border border-gray-600 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300 text-sm sm:text-base"
                placeholder="e.g. My Urdu Adventure"
                required
              />
              {mode === 'create' && title && (
                <p className="text-gray-400 text-xs">
                  Slug: {generateSlug(title)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-red-300">Difficulty Level *</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900/50 border border-gray-600 rounded-lg sm:rounded-xl text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300 text-sm sm:text-base"
                required
              >
                <option value="beginner" className="bg-gray-800">Beginner</option>
                <option value="intermediate" className="bg-gray-800">Intermediate</option>
                <option value="advanced" className="bg-gray-800">Advanced</option>
              </select>
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-red-300">Tags (comma-separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900/50 border border-gray-600 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300 text-sm sm:text-base"
              placeholder="e.g. travel, culture, humor, family"
            />
            <p className="text-gray-400 text-xs">Add relevant tags to help readers find your story</p>
          </div>

          {/* Sentences Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="block text-lg font-semibold text-red-300">Sentences *</label>
              <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full self-start sm:self-auto">
                {sentences.length} {sentences.length === 1 ? 'sentence' : 'sentences'}
              </span>
            </div>

            {sentences.map((s, idx) => (
              <div key={idx} className="relative bg-gray-900/30 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-600 space-y-3 sm:space-y-4 group hover:border-gray-500 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-sm font-medium text-gray-400">Sentence {idx + 1}</p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-400">Urdu Text *</label>
                    <textarea
                      placeholder="اردو میں لکھیں"
                      value={s.urdu}
                      onChange={(e) => handleChangeSentence(idx, 'urdu', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300 font-urdu text-base sm:text-lg resize-none"
                      rows={2}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-400">English Translation *</label>
                    <textarea
                      placeholder="Write in English"
                      value={s.english}
                      onChange={(e) => handleChangeSentence(idx, 'english', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300 text-sm sm:text-base resize-none"
                      rows={2}
                      required
                    />
                  </div>
                </div>

                {sentences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSentence(idx)}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 text-red-400 hover:text-red-300 hover:bg-red-900/30 p-1 sm:p-2 rounded transition-all duration-200 group-hover:opacity-100 opacity-70"
                    title="Remove sentence"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddSentence}
              className="w-full py-3 sm:py-4 border-2 border-dashed border-gray-600 border-red-800/50 rounded-lg sm:rounded-xl text-gray-400 hover:text-red-400 hover:border-red-600/50 hover:bg-red-900/10 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Another Sentence
              </div>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg font-medium hover:border-red-600 hover:text-red-400 transition-all duration-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-lg sm:rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-red-600/30 relative overflow-hidden group text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative flex items-center justify-center gap-2">
                {submitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {submittingText}
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {submitText}
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}