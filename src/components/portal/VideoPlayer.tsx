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

  // 1. CLEAN THE INPUT (Handle if they pasted a full <iframe> tag)
  let cleanUrl = videoUrl || '';
  if (videoUrl?.includes('<iframe')) {
    const srcMatch = videoUrl.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
      cleanUrl = srcMatch[1];
    }
  }

  // Detect if URL is an embed (Vimeo/YouTube) or a direct file
  const isVimeo = cleanUrl?.includes('vimeo.com') || /^\d+$/.test(cleanUrl);
  const isYouTube = cleanUrl?.includes('youtube.com') || cleanUrl?.includes('youtu.be');
  const isDirectFile = !isVimeo && !isYouTube && (cleanUrl?.includes('.mp4') || cleanUrl?.includes('.mov'));

  // Get clean embed URL
  const getEmbedUrl = () => {
    if (isVimeo) {
      // Extract ID robustly
      let id = cleanUrl.split('/').pop()?.split('?')[0];
      // If they just pasted the ID
      if (/^\d+$/.test(cleanUrl)) id = cleanUrl;
      
      return `https://player.vimeo.com/video/${id}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`;
    }
    if (isYouTube) {
      const id = cleanUrl.includes('v=') ? cleanUrl.split('v=')[1].split('&')[0] : cleanUrl.split('/').pop()?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return cleanUrl;
  };

  const togglePlay = () => {
    if (isDirectFile && videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
      setIsPlaying(!isPlaying)
    } else {
      // For embeds, we just show the iframe
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime
      const dur = videoRef.current.duration
      setProgress((current / dur) * 100)

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

  useEffect(() => {
    trackActivity(userId, 'video_start', moduleId, { title })
  }, [userId, moduleId, title])

  // If it's an embed, render Iframe
  if (isVimeo || isYouTube) {
    return (
      <div className="relative group bg-brand-navy rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-video">
        {!isPlaying ? (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 bg-brand-navy/60 backdrop-blur-sm"
            onClick={togglePlay}
          >
            <div className="w-20 h-20 rounded-full bg-brand-orange/20 backdrop-blur-sm flex items-center justify-center scale-100 hover:scale-110 transition-transform">
              <Play size={40} className="text-brand-orange fill-brand-orange ml-1" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Training: {title}</span>
            </div>
          </div>
        ) : (
          <iframe
            src={getEmbedUrl()}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    );
  }

  // Fallback to direct video file
  return (
    <div className="relative group bg-brand-navy rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-video">
      <video
        ref={videoRef}
        src={cleanUrl}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Overlay Controls */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent transition-opacity duration-300 flex flex-col justify-end p-6 space-y-4",
        isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
      )}>
        
        {/* Progress Bar */}
        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            readOnly
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
            <div className="flex items-center gap-4">
                {hasCompleted && (
                <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
                    <CheckCircle2 size={12} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Module Complete</span>
                </div>
                )}
            </div>
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
