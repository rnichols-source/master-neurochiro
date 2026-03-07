"use client";

import { motion } from "framer-motion";
import { Zap, Target, TrendingDown, ArrowRight } from "lucide-react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";

interface FocusEngineProps {
  data: any[];
  userName: string;
}

export function FocusEngine({ data, userName }: FocusEngineProps) {
  if (data.length < 2) return null;

  const current = data[data.length - 1];
  const previous = data[data.length - 2];

  // Logic to find the "One Thing"
  const metrics = [
    { 
      id: 'visits', 
      name: 'Patient Visits', 
      curr: current.patient_visits, 
      prev: previous.patient_visits,
      command: "Your volume is dipping. Tighten your 'Identity Anchor' scripts today.",
      drill: "Watch: The 3-Minute Volume Reset"
    },
    { 
      id: 'collections', 
      name: 'Total Collections', 
      curr: current.collections, 
      prev: previous.collections,
      command: "Revenue velocity has stalled. Audit your 'Financial Bridge' conversations.",
      drill: "Practice: The Certainty Close"
    },
    { 
      id: 'new_patients', 
      name: 'New Patients', 
      curr: current.new_patients, 
      prev: previous.new_patients,
      command: "Attraction is leaking. Your 'Language of neurology' needs more heat.",
      drill: "Review: The Master ROF"
    }
  ];

  // Find metric with biggest % drop
  const focusMetric = metrics.reduce((prevMax, m) => {
    const change = ((m.curr - m.prev) / (m.prev || 1)) * 100;
    return change < prevMax.change ? { ...m, change } : prevMax;
  }, { change: 0, ...metrics[0] });

  // If everything is up, focus on the smallest gain or just volume
  const isAllPositive = metrics.every(m => m.curr >= m.prev);
  const displayMetric = isAllPositive ? metrics[0] : focusMetric;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-12"
    >
      {/* Glowing Ambient Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange/20 to-brand-navy/0 blur-2xl rounded-[2rem] opacity-50" />
      
      <EliteCard className="border-brand-orange/30 bg-white/80 backdrop-blur-md relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
          <Zap className="w-32 h-32 text-brand-orange" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 p-2">
          <div className="w-20 h-20 rounded-full bg-brand-orange flex items-center justify-center shadow-xl shadow-brand-orange/20 shrink-0 animate-pulse">
            <Target className="w-10 h-10 text-white" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="px-2 py-0.5 bg-brand-orange/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] rounded-md">
                Active Intelligence
              </span>
              {!isAllPositive && (
                <span className="flex items-center gap-1 text-red-500 text-[10px] font-black uppercase tracking-widest">
                  <TrendingDown className="w-3 h-3" /> Potential Leak Detected
                </span>
              )}
            </div>
            
            <h2 className="text-2xl font-black text-brand-navy tracking-tight mb-2">
              Dr. {userName.split(' ')[0]}, Focus on <span className="text-brand-orange underline decoration-2 underline-offset-4">{displayMetric.name}</span>.
            </h2>
            <p className="text-brand-gray font-medium leading-relaxed max-w-2xl">
              {displayMetric.command} Ignore vanity metrics this week—this is your highest-leverage move.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <BrandButton variant="primary" className="w-full md:w-auto group">
              {displayMetric.drill} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </BrandButton>
          </div>
        </div>
      </EliteCard>
    </motion.div>
  );
}
