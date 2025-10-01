'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useAuthStore } from '@/stores/authStore'

export default function SignUpPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const setUser = useAuthStore(state => state.setUser)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.error || 'Something went wrong.')
        setLoading(false)
        return
      }

      setUser(data.user)
      
      router.push('/dashboard')
    } catch (err) {
      setError('Server error.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-800 rounded-full blur-3xl opacity-20"></div>
        
        <form
          onSubmit={handleSubmit}
          className="relative bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-red-900/10 space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-2">
              Join Shaan-e-Zaban
            </h1>
            <p className="text-gray-400 text-sm">
              Start your Urdu learning journey today
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-red-600/30 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative">
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </span>
          </button>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link 
              href="/auth/signin" 
              className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-200 hover:underline"
            >
              Sign in
            </Link>
          </p>

          {/* Divider */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          {/* Continue as Guest */}
          <div className="text-center">
            <Link 
              href="/"
              className="inline-block text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Continue as guest →
            </Link>
          </div>

          {/* Benefits */}
          <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/50">
            <h3 className="text-red-400 text-sm font-semibold mb-2">Create an account to:</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Save your progress and stories</li>
              <li>• Contribute your own stories</li>
              <li>• Track your learning journey</li>
              <li>• Join the Urdu learning community</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  )
}