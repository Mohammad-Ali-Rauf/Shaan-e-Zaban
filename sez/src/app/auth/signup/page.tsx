'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const res = await fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
            headers: { 'Content-Type': 'application/json' },
        })

        let data = null
        try {
            data = await res.json()
        } catch (err) {
            setLoading(false)
            setError('Server returned an invalid response.')
            return
        }

        setLoading(false)

        if (!res.ok) {
            setError(data?.error || 'Something went wrong.')
            return
        }

        router.push('/auth/signin')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 py-6 w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                    disabled={loading}
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href="/auth/signin" className="text-blue-600 hover:underline">Login</a>
                </p>
            </form>
        </div>
    )
}