'use client'

import { useState } from 'react'

interface Word {
  text: string
  transliteration: string
  meaning: string
}

interface VocabularyHoverProps {
  urduText: string
  words: Word[]
}

export function VocabularyHover({ urduText, words }: VocabularyHoverProps) {
  // Create a mapping of Urdu words to their definitions
  const wordMap = words.reduce((acc, word) => {
    acc[word.text] = word
    return acc
  }, {} as Record<string, Word>)

  // Split the Urdu text and create interactive spans
  const renderInteractiveText = () => {
    const segments = urduText.split(/(\s+)/)
    
    return segments.map((segment, index) => {
      const trimmedSegment = segment.trim()
      const wordData = wordMap[trimmedSegment]
      
      if (!wordData || !trimmedSegment) {
        return (
          <span key={index} className="inline">
            {segment}
          </span>
        )
      }

      return (
        <HoverableWord 
          key={index}
          segment={segment}
          wordData={wordData}
          index={index}
        />
      )
    })
  }

  return (
    <div className="relative">
      {/* Urdu Text with Hoverable Words */}
      <div className="text-3xl md:text-4xl urdu urdu-heading text-gray-100 leading-relaxed mb-6 select-none text-center">
        {renderInteractiveText()}
      </div>
    </div>
  )
}

// Separate component for each hoverable word with its own state
function HoverableWord({ segment, wordData, index }: { 
  segment: string; 
  wordData: Word; 
  index: number 
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className="relative inline-block group cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Urdu Word with Hover Effect */}
      <span className={`text-red-200 urdu urdu-heading transition-all duration-200 ${
        isHovered ? 'text-red-300 underline decoration-red-400 decoration-2 underline-offset-4' : ''
      }`}>
        {segment}
      </span>

      {/* Inline Tooltip - Only shows for THIS specific instance */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Tooltip Content */}
          <div className="bg-gray-900 border border-red-500/50 rounded-lg p-3 shadow-2xl shadow-red-900/20 backdrop-blur-sm min-w-[200px]">
            <div className="text-center mb-2">
              <p className="text-xl urdu urdu-heading text-red-200 mb-1">
                {wordData.text}
              </p>
              <p className="text-xs text-red-300 font-medium bg-red-900/30 rounded-full px-2 py-1 inline-block">
                {wordData.transliteration}
              </p>
            </div>
            <div className="bg-red-900/20 rounded-md p-2 border border-red-500/20">
              <p className="text-gray-200 text-xs leading-tight">
                {wordData.meaning}
              </p>
            </div>
          </div>
          
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1">
            <div className="w-3 h-3 bg-gray-900 border-b border-r border-red-500/50 rotate-45"></div>
          </div>
        </div>
      )}
    </span>
  )
}