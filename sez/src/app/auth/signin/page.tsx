'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    })

    setLoading(false)

    if (res?.error) {
      setError('Invalid email or password')
    } else if (res?.ok) {
      window.location.href = res.url || '/'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow max-w-md w-full space-y-4"
      >
        <h1 className="text-3xl font-bold text-center mb-4">Sign In</h1>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/auth/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  )
}
