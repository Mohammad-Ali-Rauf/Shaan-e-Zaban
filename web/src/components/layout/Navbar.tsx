'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from '@/hooks/useSession'

const Navbar = () => {
  const { user, clear } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    clear()
    router.push('/auth/signin')

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="flex justify-between items-center p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black backdrop-blur-sm">
      {/* Logo */}
      <Link 
        href="/" 
        className="urdu font-bold text-2xl bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
      >
        شانِ زبان
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        <Link 
          href="/" 
          className="text-gray-300 hover:text-red-400 transition-colors duration-200 font-medium text-sm hover:scale-105"
        >
          Home
        </Link>
        <Link 
          href="/about" 
          className="text-gray-300 hover:text-red-400 transition-colors duration-200 font-medium text-sm hover:scale-105"
        >
          About
        </Link>

        {user !== null && (
          <>
            <Link 
              href="/dashboard" 
              className="text-gray-300 hover:text-red-400 transition-colors duration-200 font-medium text-sm hover:scale-105"
            >
              My Stories
            </Link>
            <Link 
              href="/contribute" 
              className="bg-gradient-to-r from-red-700 to-red-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 border border-red-600/30"
            >
              ✍️ Write
            </Link>
            <button 
              onClick={handleLogout} 
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 font-medium text-sm ml-2 border border-red-800/30 hover:border-red-600/50 px-3 py-1 rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Sign In Button for non-authenticated users */}
      {!user && (
        <Link 
          href="/auth/signin" 
          className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 border border-red-600/30"
        >
          Sign In
        </Link>
      )}
    </nav>
  )
}

export default Navbar