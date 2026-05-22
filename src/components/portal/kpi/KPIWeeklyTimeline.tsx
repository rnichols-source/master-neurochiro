"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeekData {
  week_start_date: string;
  collections: number;
  new_patients: number;
  care_plans_accepted: number;
  patient_visits: number;
  active_patients: number;
}

interface KPIWeeklyTimelineProps {
  weeks: WeekData[];
}

function healthDot(lever: string, value: number) {
  switch (lever) {
    case "conv": return value >= 65 ? "bg-green-500" : value >= 50 ? "bg-amber-500" : "bg-red-500";
    case "pva": return value >= 1.4 ? "bg-green-500" : value >= 1 ? "bg-amber-500" : "bg-red-500";
    case "cva": return value >= 90 ? "bg-green-500" : value >= 70 ? "bg-amber-500" : "bg-red-500";
    case "np": return value >= 3 ? "bg-green-500" : value >= 2 ? "bg-amber-500" : "bg-red-500";
    default: return "bg-green-500";
  }
}

export function KPIWeeklyTimeline({ weeks }: KPIWeeklyTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (weeks.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -220 : 220;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Weekly History</p>
          <p className="text-sm font-bold text-brand-navy">{weeks.length} week{weeks.length !== 1 ? "s" : ""} tracked</p>
        </div>
        {weeks.length > 3 && (
          <div className="flex gap-1">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-lg bg-brand-navy/5 hover:bg-brand-navy/10 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={16} className="text-brand-navy/40" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-lg bg-brand-navy/5 hover:bg-brand-navy/10 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={16} className="text-brand-navy/40" />
            </button>
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {weeks.map((week, i) => {
          const prev = i > 0 ? weeks[i - 1] : null;
          const conv = week.new_patients > 0 ? Math.round((week.care_plans_accepted / week.new_patients) * 100) : 0;
          const pva = week.active_patients > 0 ? week.patient_visits / week.active_patients : 0;
          const cva = week.patient_visits > 0 ? week.collections / week.patient_visits : 0;
          const collectionsDiff = prev ? week.collections - prev.collections : 0;
          const isLatest = i === weeks.length - 1;

          return (
            <div
              key={week.week_start_date}
              className={cn(
                "min-w-[200px] snap-start rounded-xl p-4 border transition-all flex-shrink-0",
                isLatest
                  ? "bg-white border-brand-orange/30 shadow-sm"
                  : "bg-white/70 border-brand-navy/5"
              )}
            >
              {/* Date */}
              <div className="flex items-center justify-between mb-3">
                <p className={cn(
                  "text-xs font-black uppercase tracking-wider",
                  isLatest ? "text-brand-orange" : "text-brand-navy/40"
                )}>
                  {formatDate(week.week_start_date)}
                </p>
                {isLatest && (
                  <span className="text-[8px] font-black uppercase tracking-widest bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-full">
                    Latest
                  </span>
                )}
              </div>

              {/* Collections */}
              <div className="flex items-end gap-2 mb-3">
                <p className="text-xl font-black text-brand-navy">${week.collections.toLocaleString()}</p>
                {prev && collectionsDiff !== 0 && (
                  <span className={cn("text-[10px] font-bold mb-0.5 flex items-center gap-0.5",
                    collectionsDiff > 0 ? "text-green-500" : "text-red-500"
                  )}>
                    {collectionsDiff > 0 ? <ArrowUp size={8} /> : <ArrowDown size={8} />}
                    ${Math.abs(collectionsDiff).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Mini lever grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                <MiniLever label="NP" value={`${week.new_patients}`} health={healthDot("np", week.new_patients)} />
                <MiniLever label="Conv" value={week.new_patients > 0 ? `${conv}%` : "—"} health={healthDot("conv", conv)} />
                <MiniLever label="PVA" value={pva > 0 ? pva.toFixed(1) : "—"} health={healthDot("pva", pva)} />
                <MiniLever label="CVA" value={cva > 0 ? `$${cva.toFixed(0)}` : "—"} health={healthDot("cva", cva)} />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function MiniLever({ label, value, health }: { label: string; value: string; health: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", health)} />
      <span className="text-[9px] font-bold text-brand-navy/30 uppercase">{label}</span>
      <span className="text-[11px] font-black text-brand-navy ml-auto">{value}</span>
    </div>
  );
}
