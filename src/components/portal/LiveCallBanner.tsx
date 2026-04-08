'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Video, Clock, ArrowRight, ExternalLink } from 'lucide-react'
import { BrandButton, EliteCard } from '@/components/ui/elite-ui'
import { cn } from '@/lib/utils'

interface LiveCall {
  id: string
  title: string
  description: string
  call_time: string
  zoom_url: string
}

export default function LiveCallBanner({ call }: { call: LiveCall | null }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    if (!call) return

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(call.call_time).getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsLive(true)
        setTimeLeft(null)
        clearInterval(timer)
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [call])

  if (!call) return null

  const localTime = new Date(call.call_time).toLocaleString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  })

  const etTime = new Date(call.call_time).toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York',
    timeZoneName: 'short'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className={cn(
        "relative overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl transition-all duration-500",
        isLive ? "bg-brand-orange text-white" : "bg-brand-navy text-white"
      )}>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className={cn(
                "px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider",
                isLive ? "bg-white text-brand-orange animate-pulse" : "bg-brand-orange text-white"
              )}>
                {isLive ? 'Live Now' : 'Upcoming Mastermind'}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-white/60 uppercase tracking-widest">
                <Video size={14} />
                <span>Zoom Session</span>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
                {call.title}
              </h2>
              <p className={cn(
                "text-sm font-medium mt-2",
                isLive ? "text-white/80" : "text-white/60"
              )}>
                {call.description}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                {etTime} (Eastern Time)
              </p>
              <p className="text-xs font-medium text-white/40 italic">
                Your local time: {localTime}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 shrink-0 w-full md:w-auto">
            {timeLeft && (
              <div className="flex gap-4">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hrs', value: timeLeft.hours },
                  { label: 'Min', value: timeLeft.minutes },
                  { label: 'Sec', value: timeLeft.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="text-center">
                    <div className="text-2xl font-black leading-none">{unit.value.toString().padStart(2, '0')}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-white/40 mt-1">{unit.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="w-full space-y-3">
              <a 
                href={call.zoom_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full block"
              >
                <BrandButton 
                  variant={isLive ? "primary" : "accent"} 
                  size="lg"
                  className="rounded-full px-10 h-14 w-full group"
                >
                  {isLive ? 'Join Live Room' : 'Join Zoom Call'} 
                  <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </BrandButton>
              </a>

              {!isLive && (
                <div className="flex justify-center md:justify-end gap-2 text-xs font-bold uppercase tracking-widest text-white/60">
                  <span className="mr-2">Add to:</span>
                  <a 
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(call.title)}&dates=${new Date(call.call_time).toISOString().replace(/-|:|\.\d\d\d/g, "")}/${new Date(new Date(call.call_time).getTime() + 90 * 60000).toISOString().replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent(call.description + '\n\nJoin URL: ' + call.zoom_url)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Google
                  </a>
                  <span>&bull;</span>
                  <a 
                    href={`https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${new Date(call.call_time).toISOString()}&enddt=${new Date(new Date(call.call_time).getTime() + 90 * 60000).toISOString()}&subject=${encodeURIComponent(call.title)}&body=${encodeURIComponent(call.description + '\n\nJoin URL: ' + call.zoom_url)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Outlook
                  </a>
                  <span>&bull;</span>
                  <a 
                    href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${new Date(call.call_time).toISOString().replace(/-|:|\.\d\d\d/g, "")}%0ADTEND:${new Date(new Date(call.call_time).getTime() + 90 * 60000).toISOString().replace(/-|:|\.\d\d\d/g, "")}%0ASUMMARY:${encodeURIComponent(call.title)}%0ADESCRIPTION:${encodeURIComponent(call.description + '\n\nJoin URL: ' + call.zoom_url)}%0AEND:VEVENT%0AEND:VCALENDAR`}
                    download="mastermind_call.ics"
                    className="hover:text-white transition-colors"
                  >
                    Apple
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
