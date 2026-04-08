"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Phase {
  number: number;
  title: string;
  status: 'completed' | 'active' | 'locked';
  slug?: string;
}

interface PhaseRoadmapProps {
  phases: Phase[];
  currentWeek: number;
}

export function PhaseRoadmap({ phases, currentWeek }: PhaseRoadmapProps) {
  const router = useRouter();
  const [lockedMessage, setLockedMessage] = useState<string | null>(null);

  const handlePhaseClick = (phase: Phase) => {
    if (phase.status === 'completed' || phase.status === 'active') {
      if (phase.slug) {
        router.push(`/portal/curriculum/${phase.slug}`);
      }
    } else {
      setLockedMessage(`Phase ${phase.number} unlocks sequentially. Complete earlier phases first.`);
      setTimeout(() => setLockedMessage(null), 3000);
    }
  };

  return (
    <div className="relative w-full py-6 md:py-8 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth touch-pan-x">
      {/* Locked Feedback Toast */}
      <AnimatePresence>
        {lockedMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-brand-navy text-white px-6 py-3 rounded-full text-xs font-bold shadow-2xl border border-white/10 text-center max-w-[90vw]"
          >
            {lockedMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-w-[800px] px-6 relative flex items-center">
        {/* Connection Line Background */}
        <div className="absolute top-[28px] left-8 right-8 h-1 bg-brand-navy/5 -translate-y-1/2 z-0 rounded-full" />
        
        {/* Active Progress Line */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentWeek - 1) / 7) * 100}%` }}
          className="absolute top-[28px] left-8 h-1 bg-brand-orange -translate-y-1/2 z-0 origin-left transition-all duration-1000 rounded-full"
        />

        <div className="flex justify-between items-start relative z-10 w-full">
          {phases.map((phase) => {
            const isActive = phase.number === currentWeek;
            const isCompleted = phase.status === 'completed';
            const isLocked = phase.status === 'locked';
            const isAccessible = !isLocked;

            return (
              <div 
                key={phase.number} 
                onClick={() => handlePhaseClick(phase)}
                className="flex flex-col items-center gap-3 group cursor-pointer snap-center w-24"
              >
                {/* Status Indicator Pill (Mobile focus) */}
                <div className="h-4 flex items-center justify-center">
                  {isCompleted && <span className="text-xs font-black uppercase tracking-widest text-green-500">Done</span>}
                  {isActive && <span className="text-xs font-black uppercase tracking-widest text-brand-orange">Current</span>}
                </div>

                {/* Node */}
                <motion.div 
                  whileHover={isAccessible ? { scale: 1.1 } : { scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 relative z-10",
                    isCompleted ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/20" :
                    isActive ? "bg-brand-navy border-brand-navy text-white shadow-xl shadow-brand-navy/20" :
                    isAccessible ? "bg-white border-brand-orange text-brand-orange hover:bg-brand-orange/5" :
                    "bg-white border-brand-navy/10 text-brand-navy/20 hover:bg-brand-navy/5"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : isLocked ? (
                    <Lock className="w-5 h-5" />
                  ) : (
                    <span className="text-lg font-black">{phase.number}</span>
                  )}
                </motion.div>

                {/* Label */}
                <div className="text-center w-24 mt-1">
                  <p className={cn(
                    "text-xs font-black uppercase tracking-widest mb-1 transition-colors",
                    isActive ? "text-brand-navy" : 
                    isCompleted ? "text-brand-navy/60" :
                    "text-brand-navy/40"
                  )}>
                    Phase 0{phase.number}
                  </p>
                  <p className={cn(
                    "text-[11px] font-bold leading-tight line-clamp-2 px-1 transition-colors",
                    isActive ? "text-brand-navy" : "text-brand-navy/40 group-hover:text-brand-navy/80"
                  )}>
                    {phase.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
