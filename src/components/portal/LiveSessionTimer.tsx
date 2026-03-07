"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Video, Clock, ArrowRight } from "lucide-react";
import { BrandButton } from "@/components/ui/elite-ui";

interface LiveSessionTimerProps {
  nextSessionTime: string | Date;
  zoomUrl: string;
}

export function LiveSessionTimer({ nextSessionTime, zoomUrl }: LiveSessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = typeof nextSessionTime === 'string' ? new Date(nextSessionTime) : nextSessionTime;
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Session has started or passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: difference / 1000 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        totalSeconds: difference / 1000
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [nextSessionTime]);

  if (!timeLeft) return null;

  // Show button 10 minutes (600 seconds) before and during the session (up to 90 mins after start)
  const isJoinable = timeLeft.totalSeconds <= 600 && timeLeft.totalSeconds > -5400; 
  const isLive = timeLeft.totalSeconds <= 0 && timeLeft.totalSeconds > -5400;

  return (
    <div className={cn(
      "w-full rounded-2xl border p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500",
      isLive ? "bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/20" : "bg-white border-brand-navy/5"
    )}>
      <div className="flex items-center gap-6">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
          isLive ? "bg-white/20 text-white" : "bg-brand-navy/5 text-brand-orange"
        )}>
          {isLive ? <Video className="w-6 h-6 animate-pulse" /> : <Clock className="w-6 h-6" />}
        </div>
        
        <div>
          <p className={cn(
            "text-[10px] font-black uppercase tracking-[0.2em]",
            isLive ? "text-white/60" : "text-brand-navy/40"
          )}>
            {isLive ? "Happening Now" : "Next Live Mastermind"}
          </p>
          <h4 className={cn(
            "text-xl font-black tracking-tight",
            isLive ? "text-white" : "text-brand-navy"
          )}>
            Coaching Call with Dr. Nichols
          </h4>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {!isLive && (
          <div className="flex gap-4">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hrs', val: timeLeft.hours },
              { label: 'Min', val: timeLeft.minutes },
              { label: 'Sec', val: timeLeft.seconds },
            ].map(unit => (
              <div key={unit.label} className="text-center min-w-[40px]">
                <p className={cn("text-lg font-black leading-none", isLive ? "text-white" : "text-brand-navy")}>
                  {unit.val.toString().padStart(2, '0')}
                </p>
                <p className={cn("text-[8px] font-black uppercase tracking-widest", isLive ? "text-white/60" : "text-brand-navy/30")}>
                  {unit.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {isJoinable ? (
          <a href={zoomUrl} target="_blank" rel="noopener noreferrer">
            <BrandButton 
              variant={isLive ? "primary" : "accent"} 
              className={cn("py-4 px-8 group", isLive && "bg-white text-brand-orange hover:bg-brand-cream border-none")}
            >
              Join Zoom Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </BrandButton>
          </a>
        ) : (
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/20">Link active 10m before call</p>
          </div>
        )}
      </div>
    </div>
  );
}
