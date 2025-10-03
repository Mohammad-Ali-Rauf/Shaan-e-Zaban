'use client'

import { useState, useEffect } from 'react'

interface ModeToggleProps {
  onModeChange?: (mode: 'LEARNER' | 'READER') => void
  initialMode?: 'LEARNER' | 'READER'
}

export function ModeToggle({ onModeChange, initialMode = 'LEARNER' }: ModeToggleProps) {
  const [mode, setMode] = useState<'LEARNER' | 'READER'>(initialMode)

  // Load mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('learning-mode') as 'LEARNER' | 'READER'
    if (savedMode) {
      setMode(savedMode)
      onModeChange?.(savedMode)
    }
  }, [onModeChange])

  const handleModeChange = (newMode: 'LEARNER' | 'READER') => {
    setMode(newMode)
    localStorage.setItem('learning-mode', newMode)
    onModeChange?.(newMode)
  }

  return (
    <div className="flex items-center gap-2 p-1 bg-gray-700/50 rounded-lg border border-gray-600">
      <button
        onClick={() => handleModeChange('LEARNER')}
        className={`px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
          mode === 'LEARNER' 
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25' 
            : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
        }`}
      >
        📚 Learner
      </button>
      <button
        onClick={() => handleModeChange('READER')}
        className={`px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
          mode === 'READER' 
            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/25' 
            : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
        }`}
      >
        📖 Reader
      </button>
    </div>
  )
}