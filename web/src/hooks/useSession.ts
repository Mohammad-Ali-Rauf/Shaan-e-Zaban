import { useAtom } from 'jotai'
import { userAtom, loadingAtom, errorAtom } from '@/lib/sessionAtoms'

export function useSession() {
  const [user, setUser] = useAtom(userAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  const [error, setError] = useAtom(errorAtom)

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
