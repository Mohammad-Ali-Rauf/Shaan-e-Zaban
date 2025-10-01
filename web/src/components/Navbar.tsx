'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from '@/hooks/useSession'

const Navbar = () => {
  const { user, clear } = useSession()
  const router = useRouter()

  console.log(user)

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
    <nav className="flex justify-between p-4 border-b items-center">
      <Link href="/" className="font-bold text-xl">
        📚 Shaan-e-Zaban
      </Link>
      <div className="flex gap-4 text-blue-600 text-sm items-center">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/about" className="hover:underline">About</Link>

        {user !== null && (
          <>
            <Link href="/dashboard" className="hover:underline">My Stories</Link>
            <Link href="/contribute" className="hover:underline">Write</Link>
            <button onClick={handleLogout} className="hover:underline text-red-600 ml-2">
              Logout
            </button>
          </>
        )}
      </div>

      {!user && (
        <Link href="/auth/signin" className="hover:underline">Sign In</Link>
      )}
    </nav>
  )
}

export default Navbar
