'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, CheckCircle2 } from 'lucide-react'
import { completeModule } from '@/app/actions/curriculum-actions'
import { trackActivity } from '@/app/actions/activation-actions'
import { cn } from '@/lib/utils'

interface VideoPlayerProps {
  userId: string
  moduleId: string
  videoUrl: string
  title: string
  onComplete?: () => void
}

export default function VideoPlayer({ userId, moduleId, videoUrl, title, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime
      const dur = videoRef.current.duration
      setProgress((current / dur) * 100)

      // Step 3: Mark complete at 90%
      if (!hasCompleted && (current / dur) >= 0.9) {
        setHasCompleted(true)
        handleModuleComplete()
      }
    }
  }

  const handleModuleComplete = async () => {
    await completeModule(moduleId)
    await trackActivity(userId, 'video_complete', moduleId, { title })
    if (onComplete) onComplete()
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = (parseFloat(e.target.value) / 100) * videoRef.current.duration
      videoRef.current.currentTime = time
      setProgress(parseFloat(e.target.value))
    }
  }

  useEffect(() => {
    trackActivity(userId, 'video_start', moduleId, { title })
  }, [userId, moduleId, title])

  return (
    <div className="relative group bg-brand-navy rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-video">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 space-y-4">
        
        {/* Progress Bar */}
        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-orange"
          />
          <div className="flex justify-between text-[8px] font-black text-white/40 uppercase tracking-widest">
            <span>{Math.floor((videoRef.current?.currentTime || 0) / 60)}:{(Math.floor((videoRef.current?.currentTime || 0) % 60)).toString().padStart(2, '0')}</span>
            <span>{Math.floor(duration / 60)}:{(Math.floor(duration % 60)).toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="text-white hover:text-brand-orange transition-colors">
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="fill-current" />}
            </button>
            <button onClick={() => videoRef.current && (videoRef.current.currentTime -= 10)} className="text-white/60 hover:text-white transition-colors">
              <RotateCcw size={18} />
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsMuted(!isMuted)} className="text-white/60 hover:text-white transition-colors">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {hasCompleted && (
              <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
                <CheckCircle2 size={12} />
                <span className="text-[8px] font-black uppercase tracking-widest">Module Complete</span>
              </div>
            )}
            <button className="text-white/60 hover:text-white transition-colors">
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Big Play Button (when paused) */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-20 h-20 rounded-full bg-brand-orange/20 backdrop-blur-sm flex items-center justify-center scale-100 hover:scale-110 transition-transform">
            <Play size={40} className="text-brand-orange fill-brand-orange ml-1" />
          </div>
        </div>
      )}
    </div>
  )
}
