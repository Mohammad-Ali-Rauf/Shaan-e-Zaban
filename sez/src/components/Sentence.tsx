'use client'

import { useState } from 'react'

interface Word {
  text: string
  transliteration?: string
  meaning?: string
}

interface Props {
  text: string
  words?: Word[]
}

export default function Sentence({ text, words }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleHover = (index: number) => {
    setHoveredIndex(index)
  }

  const handleLeave = () => {
    setHoveredIndex(null)
  }

  const isGlossed = Array.isArray(words) && words.length > 0

  return (
    <div dir="rtl" className="text-right urdu text-3xl leading-loose">
      {isGlossed
        ? words!.map((word, i) => (
            <span
              key={i}
              className="relative group inline-block mx-1 cursor-help"
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={handleLeave}
            >
              {word.text}
              {hoveredIndex === i && (
                <div className="absolute bottom-full mb-2 right-0 bg-white border border-gray-300 rounded px-2 py-1 shadow text-sm text-black z-50 whitespace-nowrap text-left ltr">
                  {word.transliteration && (
                    <div>
                      <span className="font-bold">TL:</span> {word.transliteration}
                    </div>
                  )}
                  {word.meaning && (
                    <div>
                      <span className="font-bold">EN:</span> {word.meaning}
                    </div>
                  )}
                  {!word.meaning && !word.transliteration && (
                    <div className="text-gray-500 italic">No info</div>
                  )}
                </div>
              )}
            </span>
          ))
        : text
            .trim()
            .split(/\s+/)
            .map((word, i) => (
              <span key={i} className="inline-block mx-1">
                {word}
              </span>
            ))}
    </div>
  )
}