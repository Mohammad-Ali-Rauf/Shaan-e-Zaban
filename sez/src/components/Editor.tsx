'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Editor() {
  const { data: session } = useSession()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('beginner')
  const [tags, setTags] = useState('')
  const [sentences, setSentences] = useState([{ urdu: '', english: '' }])
  const [loading, setLoading] = useState(false)

  const handleAddSentence = () => {
    setSentences([...sentences, { urdu: '', english: '' }])
  }

  const handleChangeSentence = (index: number, key: 'urdu' | 'english', value: string) => {
    const updated = [...sentences]
    updated[index][key] = value
    setSentences(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.email) return alert('You must be signed in to contribute.')

    setLoading(true)

    const res = await fetch('/api/stories/create', {
      method: 'POST',
      body: JSON.stringify({
        title,
        level,
        tags: tags.split(',').map(t => t.trim()),
        sentences,
        userEmail: session.user.email,
      }),
    })

    setLoading(false)

    if (!res.ok) return alert('Failed to submit story')

    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">📖 Submit a New Story</h2>

      <div>
        <label className="block font-semibold">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="input" required />
      </div>

      <div>
        <label className="block font-semibold">Level</label>
        <select value={level} onChange={e => setLevel(e.target.value)} className="input">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">Tags (comma-separated)</label>
        <input value={tags} onChange={e => setTags(e.target.value)} className="input" />
      </div>

      <div className="space-y-4">
        <label className="block font-semibold">Sentences</label>
        {sentences.map((s, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row gap-2">
            <input
              placeholder="Urdu"
              value={s.urdu}
              onChange={(e) => handleChangeSentence(idx, 'urdu', e.target.value)}
              className="input flex-1"
              required
            />
            <input
              placeholder="English"
              value={s.english}
              onChange={(e) => handleChangeSentence(idx, 'english', e.target.value)}
              className="input flex-1"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSentence}
          className="text-sm text-blue-600 underline"
        >
          ➕ Add Sentence
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        {loading ? 'Submitting...' : '🚀 Submit Story'}
      </button>
    </form>
  )
}
