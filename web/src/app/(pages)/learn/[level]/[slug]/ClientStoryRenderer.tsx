'use client'

import { useState, useEffect } from 'react'
import { ModeToggle } from '@/components/features/stories/ModeToggle'
import { PaginationNav } from '@/components/features/stories/PaginationNav'
import { AudioPlayer } from '@/components/features/stories/AudioPlayer'
import { VocabularyHover } from '@/components/features/stories/VocabularyHover'
import { ReaderModeView } from '@/components/features/stories/ReaderModeView'
import { Sentence, Story } from '@/lib'

interface ClientStoryRendererProps {
  story: Story
  sentence: Sentence
  sentenceIndex: number
  sentences: Sentence[]
  level: string
  slug: string
}

export function ClientStoryRenderer({ 
  story, 
  sentence, 
  sentenceIndex, 
  sentences, 
  level, 
  slug 
}: ClientStoryRendererProps) {
  const [mode, setMode] = useState<'LEARNER' | 'READER'>('LEARNER')

  // Load mode from localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem('learning-mode') as 'LEARNER' | 'READER'
    if (savedMode) {
      setMode(savedMode)
    }
  }, [])

  const handleModeChange = (newMode: 'LEARNER' | 'READER') => {
    setMode(newMode)
  }

  if (mode === 'READER') {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-red-900/10">
        <div className="flex justify-center mb-6">
          <ModeToggle onModeChange={handleModeChange} initialMode={mode} />
        </div>
        <ReaderModeView story={story} level={level} slug={slug} />
      </div>
    )
  }

  // LEARNER MODE
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-red-900/10">
      <div className="flex justify-center mb-6">
        <ModeToggle onModeChange={handleModeChange} initialMode={mode} />
      </div>

      {/* Urdu Sentence with Hover Vocabulary */}
      <div className="text-center mb-8">
        <div className="mb-6">
          <VocabularyHover 
            urduText={sentence.urdu}
            words={sentence.words || []}
          />
        </div>

        {/* Audio Player */}
        {sentence.audioUrl && (
          <AudioPlayer audioUrl={sentence.audioUrl} storySlug={slug} />
        )}

        {/* English Translation */}
        <div className="bg-gradient-to-r from-red-900/20 to-transparent rounded-xl p-6 border-l-4 border-red-500">
          <p className="text-lg text-gray-300 italic leading-relaxed">
            &quot;{sentence.english}&quot;
          </p>
        </div>
      </div>

      {/* Quick Vocabulary Reference */}
      {sentence.words && sentence.words.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
            <span>📖</span>
            Vocabulary Reference
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sentence.words.map((word: { text: string, transliteration: string, meaning: string }, idx: number) => (
              <div
                key={idx}
                className="bg-gray-900/30 border border-gray-600 rounded-lg p-3 hover:border-gray-500 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xl urdu text-gray-100 group-hover:text-red-200 transition-colors">
                    {word.text}
                  </p>
                  <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-red-300 font-medium">
                    {word.transliteration}
                  </p>
                  <p className="text-gray-400 text-xs leading-tight">
                    {word.meaning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress and Navigation */}
      <div className="pt-6 border-t border-gray-700">
        <PaginationNav
          currentIndex={sentenceIndex}
          total={sentences.length}
          baseUrl={`/learn/${level}/${slug}`}
          storySlug={slug}
        />
      </div>
    </div>
  )
}