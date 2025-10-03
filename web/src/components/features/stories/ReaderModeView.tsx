'use client'

import { useState } from 'react'
import { CompleteStoryButton } from './CompleteStoryButton'
import { AudioPlayer } from './AudioPlayer'
import { VocabularyHover } from './VocabularyHover'
import { Sentence, Story } from '@/lib'

interface ReaderModeViewProps {
  story: Story
  level: string
  slug: string
}

export function ReaderModeView({ story, level, slug }: ReaderModeViewProps) {
  const [showVocabulary, setShowVocabulary] = useState(false)

  // Combine all sentences into full story content
  const fullStoryUrdu = story.sentences?.map((s: Sentence) => s.urdu).join(' ') || ''
  const fullStoryEnglish = story.sentences?.map((s: Sentence) => s.english).join(' ') || ''
  
  // Combine all words from all sentences for vocabulary
  const allWords = story.sentences?.flatMap((s: Sentence) => s.words || []) || []

  return (
    <div className="space-y-8">
      {/* Full Story Display */}
      <div className="text-center">
        <div className="mb-8">
          <VocabularyHover 
            urduText={fullStoryUrdu}
            words={allWords}
          />
        </div>

        {/* Full Story Audio - You might want to create a full story audio */}
        {story.sentences?.[0]?.audioUrl && (
          <div className="mb-6">
            <AudioPlayer audioUrl={story.sentences[0].audioUrl} storySlug={slug} />
            <p className="text-sm text-gray-400 mt-2">
              🔊 Audio for first sentence (full story audio coming soon)
            </p>
          </div>
        )}

        {/* English Translation */}
        <div className="bg-gradient-to-r from-green-900/20 to-transparent rounded-xl p-6 border-l-4 border-green-500 mt-8">
          <h3 className="text-lg font-bold text-green-300 mb-3 flex items-center justify-center gap-2">
            <span>🌍</span>
            Full Story Translation
          </h3>
          <p className="text-gray-300 italic leading-relaxed text-left">
            {fullStoryEnglish}
          </p>
        </div>
      </div>

      {/* Vocabulary Section */}
      <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-600">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-green-300 flex items-center gap-2">
            <span>📚</span>
            Story Vocabulary
          </h3>
          <button
            onClick={() => setShowVocabulary(!showVocabulary)}
            className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg hover:bg-green-800/30 transition-colors border border-green-700/50 text-sm font-medium"
          >
            {showVocabulary ? 'Hide' : 'Show'} All Words
          </button>
        </div>

        {showVocabulary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {allWords.map((word: { text: string, transliteration: string, meaning: string }, idx: number) => (
              <div
                key={idx}
                className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 hover:border-green-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xl urdu text-gray-100 group-hover:text-green-200 transition-colors">
                    {word.text}
                  </p>
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-green-300 font-medium">
                    {word.transliteration}
                  </p>
                  <p className="text-gray-400 text-sm leading-tight">
                    {word.meaning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completion Action */}
      <div className="flex justify-center pt-6 border-t border-gray-700">
        <CompleteStoryButton storySlug={slug} />
      </div>

      {/* Reader Mode Info */}
      <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/50">
        <p className="text-blue-300 text-sm text-center">
          <span className="font-bold">Reader Mode:</span> Perfect for advanced learners and heritage speakers. 
          Read the full story at once and hover over words for definitions.
        </p>
      </div>
    </div>
  )
}