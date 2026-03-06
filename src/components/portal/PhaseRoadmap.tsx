"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface Phase {
  number: number;
  title: string;
  status: 'completed' | 'active' | 'locked';
}

interface PhaseRoadmapProps {
  phases: Phase[];
  currentWeek: number;
}

export function PhaseRoadmap({ phases, currentWeek }: PhaseRoadmapProps) {
  return (
    <div className="w-full py-8 overflow-x-auto no-scrollbar">
      <div className="min-w-[800px] px-4 relative">
        {/* Connection Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-navy/5 -translate-y-1/2 z-0" />
        
        {/* Active Progress Line */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentWeek - 1) / 7) * 100}%` }}
          className="absolute top-1/2 left-0 h-0.5 bg-brand-orange -translate-y-1/2 z-0 origin-left transition-all duration-1000"
        />

        <div className="flex justify-between items-center relative z-10">
          {phases.map((phase, i) => {
            const isActive = phase.number === currentWeek;
            const isCompleted = phase.status === 'completed';
            const isLocked = phase.status === 'locked';

            return (
              <div key={phase.number} className="flex flex-col items-center gap-4 group">
                {/* Node */}
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                    isCompleted ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/20" :
                    isActive ? "bg-white border-brand-orange text-brand-orange shadow-xl shadow-brand-orange/20" :
                    "bg-white border-brand-navy/10 text-brand-navy/20"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-black">{phase.number}</span>
                  )}
                </motion.div>

                {/* Label */}
                <div className="text-center w-24">
                  <p className={cn(
                    "text-[8px] font-black uppercase tracking-widest mb-1",
                    isActive ? "text-brand-orange" : "text-brand-navy/40"
                  )}>
                    Phase 0{phase.number}
                  </p>
                  <p className={cn(
                    "text-[10px] font-bold tracking-tight truncate px-2",
                    isActive ? "text-brand-navy" : "text-brand-navy/20"
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
