import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isInitialized: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  initialize: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isInitialized: false,

      setUser: (user) => set({ user }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      initialize: async () => {
        // Skip if already initialized
        if (get().isInitialized) return
        
        set({ isLoading: true })
        try {
          const res = await fetch('/api/auth/me', {
            credentials: 'include',
            cache: 'no-store'
          })
          const data = await res.json()
          set({ user: data.user, isInitialized: true })
        } catch (error) {
          console.error('Auth initialization failed:', error)
          set({ user: null, isInitialized: true })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await fetch('/api/auth/logout', { method: 'POST' })
          set({ user: null })
        } catch (error) {
          console.error('Logout failed:', error)
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({ 
        user: state.user,
        isInitialized: state.isInitialized 
      }), // Only persist these
    }
  )
)