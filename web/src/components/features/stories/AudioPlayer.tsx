'use client'

import { useState, useRef, useEffect } from 'react'

interface AudioPlayerProps {
  audioUrl: string
  storySlug: string
}

export function AudioPlayer({ audioUrl, storySlug }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showVolume, setShowVolume] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    const setAudioData = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('loadedmetadata', setAudioData)
    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData)
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    audio.currentTime = percent * audio.duration
    setProgress(percent * 100)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Clean Modern Player */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl hover:shadow-2xl transition-all duration-300">
        
        {/* Main Controls Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Play/Pause - Centered and prominent */}
          <button
            onClick={togglePlayPause}
            className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group"
          >
            {isPlaying ? (
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-gray-800 rounded-full animate-pulse"></div>
                <div className="w-1 h-4 bg-gray-800 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ) : (
              <svg 
                className="w-6 h-6 text-gray-800 ml-0.5" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Time Display - Clean and minimal */}
          <div className="flex items-center gap-3">
            <span className="text-white font-mono text-sm font-medium bg-black/20 px-3 py-1 rounded-lg">
              {formatTime(currentTime)}
            </span>
            <span className="text-white/40">/</span>
            <span className="text-white/60 font-mono text-sm">
              {formatTime(duration)}
            </span>
          </div>

          {/* Volume Control */}
          <div className="relative">
            <button
              onClick={() => setShowVolume(!showVolume)}
              className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200"
            >
              <svg 
                className="w-5 h-5 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                {volume === 0 ? (
                  <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 9H6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h1.29l-3.66 3.66a.996.996 0 101.41 1.41L18.37 5.04a.996.996 0 00-1.41-1.41L3.63 3.63z"/>
                ) : volume < 0.5 ? (
                  <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
                ) : (
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                )}
              </svg>
            </button>

            {showVolume && (
              <div className="absolute bottom-full right-0 mb-3 bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl p-3 shadow-2xl">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar - Clean and functional */}
        <div 
          className="relative h-2 bg-white/20 rounded-full cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div 
            className="absolute h-full bg-white rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 w-3 h-3 bg-white rounded-full shadow-lg transform translate-x-1/2 -translate-y-1/2 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}