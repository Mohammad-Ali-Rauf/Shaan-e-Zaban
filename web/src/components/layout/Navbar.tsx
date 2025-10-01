'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  const { user, isLoading, logout } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showUserPopup, setShowUserPopup] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const popupRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
    router.push('/')
    setIsMobileMenuOpen(false)
  }

  // Helper function to check active link
  const isActive = (path: string) => pathname === path

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowUserPopup(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && 
          !(event.target as Element).closest('button')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Loading state
  if (isLoading && !user) {
    return (
      <nav className="flex justify-between items-center p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black backdrop-blur-sm sticky top-0 z-50">
        <div className="h-8 w-32 bg-gray-700 rounded animate-pulse"></div>
        <div className="hidden md:flex gap-4">
          <div className="h-8 w-16 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-16 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="md:hidden h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
      </nav>
    )
  }

  // Navigation links configuration for reusability
  const navLinks = [
    { href: '/', label: '🏠 Home', icon: '🏠' },
    { href: '/stories', label: '📚 Stories', icon: '📚' },
    { href: '/about', label: 'ℹ️ About', icon: 'ℹ️' },
  ]

  const authLinks = user ? [
    { href: '/dashboard', label: '📊 Dashboard', icon: '📊' },
    { href: '/contribute', label: '✍️ Write Story', icon: '✍️' },
  ] : []

  return (
    <>
      <nav className="flex justify-between items-center p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 via-gray-900 to-black backdrop-blur-sm sticky top-0 z-50">
        {/* Logo */}
        <Link 
          prefetch 
          href="/" 
          className="urdu font-bold text-2xl bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="group-hover:drop-shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300">
            شانِ زبان
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-2 items-center">
          {/* Public Navigation Links */}
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              prefetch 
              href={link.href} 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(link.href) 
                  ? 'bg-red-900/30 text-red-300 border border-red-700/50 shadow-lg shadow-red-900/20' 
                  : 'text-gray-300 hover:text-red-400 hover:bg-gray-800/50 border border-transparent'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Authenticated User Links */}
          {user ? (
            <>
              {authLinks.map((link) => (
                <Link 
                  key={link.href}
                  prefetch 
                  href={link.href} 
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href) 
                      ? 'bg-red-900/30 text-red-300 border border-red-700/50 shadow-lg shadow-red-900/20' 
                      : 'text-gray-300 hover:text-red-400 hover:bg-gray-800/50 border border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-700">
                {/* User Profile Button */}
                <button
                  onClick={() => setShowUserPopup(!showUserPopup)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-800/50 transition-all duration-200 rounded-lg border border-transparent hover:border-gray-600 text-sm font-medium group"
                  title="View profile"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="max-w-24 truncate">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <span className="text-xs opacity-60 group-hover:opacity-100">👤</span>
                </button>

                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="px-3 py-2 text-gray-400 hover:text-red-500 hover:bg-red-900/20 transition-all duration-200 rounded-lg border border-gray-700 hover:border-red-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Sign out"
                >
                  {isLoggingOut ? (
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    '🚪'
                  )}
                </button>
              </div>
            </>
          ) : (
            <Link 
              prefetch 
              href="/auth/signin" 
              className="group relative px-4 py-2 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 border border-red-600/30 shadow-lg hover:shadow-red-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative flex items-center gap-2">
                <span className="text-sm">🔐</span>
                Sign In
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <span className="text-xl">✕</span>
          ) : (
            <span className="text-xl">☰</span>
          )}
        </button>
      </nav>

      {/* User Profile Popup */}
      {showUserPopup && user && (
        <div 
          ref={popupRef}
          className="fixed top-20 right-4 md:right-6 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl shadow-black/50 z-50 min-w-64 max-w-80 backdrop-blur-sm"
        >
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold text-white mb-1">User Profile</h3>
            <p className="text-sm text-gray-400">Your account information</p>
          </div>
          
          <div className="p-4 space-y-3">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Name</label>
              <p className="text-white font-medium truncate">{user.name || 'Not set'}</p>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Email</label>
              <p className="text-white font-medium truncate">{user.email}</p>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">User ID</label>
              <p className="text-gray-400 text-xs font-mono truncate">{user.id}</p>
            </div>
            
            <div className="pt-2 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                Member since {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="p-3 bg-gray-900/50 border-t border-gray-700 rounded-b-xl">
            <button
              onClick={() => setShowUserPopup(false)}
              className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden fixed top-16 inset-x-0 bg-gray-900 border-b border-gray-800 shadow-2xl z-40 backdrop-blur-sm"
        >
          <div className="p-4 space-y-2">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-red-900/30 text-red-300 border border-red-700/50'
                    : 'text-gray-300 hover:text-red-400 hover:bg-gray-800/50'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                {link.label.replace(/[^\w\s]/g, '')}
              </Link>
            ))}

            {/* Authenticated User Links */}
            {user ? (
              <>
                {authLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? 'bg-red-900/30 text-red-300 border border-red-700/50'
                        : 'text-gray-300 hover:text-red-400 hover:bg-gray-800/50'
                    }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    {link.label.replace(/[^\w\s]/g, '')}
                  </Link>
                ))}

                {/* User Info in Mobile */}
                <div className="px-4 py-3 border-t border-gray-700 mt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <div className="flex-1">
                      <p className="text-white font-medium truncate">
                        {user.name || user.email.split('@')[0]}
                      </p>
                      <p className="text-gray-400 text-sm truncate">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setShowUserPopup(true)
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex-1 py-2 text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm"
                    >
                      👤 Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex-1 py-2 text-gray-400 hover:text-red-500 transition-colors duration-200 text-sm disabled:opacity-50"
                    >
                      {isLoggingOut ? '...' : '🚪 Logout'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-lg text-base font-semibold transition-all duration-200 transform hover:scale-105 border border-red-600/30"
              >
                <span className="text-lg">🔐</span>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}