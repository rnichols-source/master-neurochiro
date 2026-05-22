"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPILeverCardProps {
  title: string;
  value: string;
  unit?: string;
  oneLiner: string;
  health: "green" | "amber" | "red";
  growth?: number;
  benchmark: string;
  elite: string;
  delay?: number;
}

const healthDot = {
  green: "bg-green-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

export function KPILeverCard({
  title,
  value,
  unit,
  oneLiner,
  health,
  growth,
  benchmark,
  elite,
  delay = 0,
}: KPILeverCardProps) {
  const hasGrowth = growth !== undefined && growth !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-2xl p-6 border border-brand-navy/5 hover:border-brand-orange/20 transition-all relative group"
    >
      {/* Health dot */}
      <div className={cn("absolute top-5 right-5 w-2.5 h-2.5 rounded-full", healthDot[health])} />

      {/* Title */}
      <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-4">
        {title}
      </p>

      {/* Value */}
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-black text-brand-navy tracking-tight">
          {value}
          {unit && <span className="text-base font-bold text-brand-navy/25 ml-0.5">{unit}</span>}
        </span>
        {hasGrowth && (
          <span className={cn(
            "text-xs font-bold mb-1 flex items-center gap-0.5",
            growth! > 0 ? "text-green-500" : "text-red-500"
          )}>
            {growth! > 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
            {Math.abs(growth!)}%
          </span>
        )}
      </div>

      {/* One-liner explanation */}
      <p className="text-xs text-brand-navy/40 leading-relaxed mb-4">
        {oneLiner}
      </p>

      {/* Benchmark */}
      <div className="pt-3 border-t border-brand-navy/5 flex justify-between text-[9px] font-bold uppercase tracking-widest">
        <span className="text-brand-navy/30">Benchmark: <span className="text-brand-navy/50">{benchmark}</span></span>
        <span className="text-brand-orange/60">Elite: <span className="text-brand-orange">{elite}</span></span>
      </div>
    </motion.div>
  );
}
