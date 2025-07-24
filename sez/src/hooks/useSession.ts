import { useCallback, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name?: string
  createdAt: string
}

interface UseSessionResult {
  user: User | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export function useSession(): UseSessionResult {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSession = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/auth/me")

      if (!res.ok) throw new Error("Not authenticated")

      const data = await res.json()
      setUser(data.user)
    } catch (err: any) {
      setUser(null)
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSession()
  }, [fetchSession])

  return { user, loading, error, refresh: fetchSession }
}
