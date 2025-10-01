import { useState } from 'react'

export function useSession() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const refresh = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      const data = await res.json()

      if (!res.ok || data.error) {
        setUser(null)
        setError(data.error ?? 'Not authenticated')
        return
      }

      setUser(data.user)
    } catch (err) {
      setUser(null)
      console.error(err)
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setUser(null)
    setError(null)
  }

  return { user, loading, error, refresh, clear }
}
