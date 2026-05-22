"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

interface LeverValues {
  npPerWeek: number;
  conversionRate: number;
  pva: number;
  cva: number;
  overhead: number;
}

interface KPIRevenueFormulaProps {
  levers: LeverValues;
  overrides?: Partial<LeverValues> | null;
  biggestGap?: { lever: string; message: string } | null;
}

function healthColor(lever: string, value: number): "green" | "amber" | "red" {
  switch (lever) {
    case "np": return value >= 3 ? "green" : value >= 2 ? "amber" : "red";
    case "conv": return value >= 65 ? "green" : value >= 50 ? "amber" : "red";
    case "pva": return value >= 1.4 ? "green" : value >= 1 ? "amber" : "red";
    case "cva": return value >= 90 ? "green" : value >= 70 ? "amber" : "red";
    default: return "green";
  }
}

const ringColors = {
  green: "ring-green-500/50",
  amber: "ring-amber-500/50",
  red: "ring-red-500/50",
};

const dotColors = {
  green: "bg-green-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

const explanations: Record<string, { title: string; explain: (v: number) => string }> = {
  np: {
    title: "New Patients (Day 1s per week)",
    explain: (v) =>
      v >= 3
        ? `You're seeing ${v.toFixed(1)} new patients per week. That's solid volume.`
        : `You're seeing ${v.toFixed(1)} new patients per week. More Day 1s means more opportunities to help people and grow revenue.`,
  },
  conv: {
    title: "Conversion Rate",
    explain: (v) => {
      const outOf10 = Math.round(v / 10);
      return v >= 65
        ? `${v}% of your Day 1s start care. ${outOf10} out of 10 say yes. Strong.`
        : `${v}% of your Day 1s start care. For every 10 who walk in, ${10 - outOf10} walk out without getting help. This is usually the biggest lever to move.`;
    },
  },
  pva: {
    title: "Patient Visit Average (PVA)",
    explain: (v) =>
      `Each patient visits ${v.toFixed(1)} times per week on average. Higher PVA means patients are staying, following through on care, and getting results.`,
  },
  cva: {
    title: "Collection per Visit (CVA)",
    explain: (v) =>
      `You collect $${v.toFixed(0)} per visit on average. This reflects your pricing, discounts, and visit mix. Even a small increase here multiplies across every visit.`,
  },
};

export function KPIRevenueFormula({ levers, overrides, biggestGap }: KPIRevenueFormulaProps) {
  const [expandedLever, setExpandedLever] = useState<string | null>(null);
  const [showMath, setShowMath] = useState(false);

  const np = overrides?.npPerWeek ?? levers.npPerWeek;
  const conv = overrides?.conversionRate ?? levers.conversionRate;
  const pva = overrides?.pva ?? levers.pva;
  const cva = overrides?.cva ?? levers.cva;
  const overhead = overrides?.overhead ?? levers.overhead;

  const monthlyRevenue = np * (conv / 100) * pva * cva * 4.33;
  const margin = monthlyRevenue - overhead;
  const isOverridden = overrides != null;

  const blocks = [
    { key: "np", label: "New Patients", value: np.toFixed(1), suffix: "/wk" },
    { key: "conv", label: "Conversion", value: `${Math.round(conv)}`, suffix: "%" },
    { key: "pva", label: "PVA", value: pva.toFixed(1), suffix: "" },
    { key: "cva", label: "CVA", value: `$${cva.toFixed(0)}`, suffix: "" },
  ];

  return (
    <div className="bg-brand-navy rounded-2xl md:rounded-[2rem] p-6 md:p-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[80px]" />

      <div className="relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-orange mb-6">
          {isOverridden ? "What If Scenario" : "Your Revenue Formula"}
        </p>

        {/* Formula Blocks */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-4">
          {blocks.map((block, i) => {
            const health = healthColor(block.key, block.key === "conv" ? conv : block.key === "np" ? np : block.key === "pva" ? pva : cva);
            const isExpanded = expandedLever === block.key;

            return (
              <div key={block.key} className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={() => setExpandedLever(isExpanded ? null : block.key)}
                  className={`px-3 md:px-4 py-2 md:py-3 rounded-xl text-center ring-2 transition-all cursor-pointer hover:bg-white/10 ${
                    ringColors[health]
                  } ${isExpanded ? "bg-white/10" : "bg-white/5"} ${isOverridden && overrides?.[block.key === "np" ? "npPerWeek" : block.key === "conv" ? "conversionRate" : block.key as keyof LeverValues] != null ? "ring-brand-orange" : ""}`}
                >
                  <div className="flex items-center gap-1.5 justify-center mb-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${dotColors[health]}`} />
                    <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">{block.label}</p>
                  </div>
                  <p className="text-lg md:text-xl font-black text-white">
                    {block.value}<span className="text-sm font-bold text-white/30">{block.suffix}</span>
                  </p>
                </button>

                {i < blocks.length - 1 && (
                  <span className="text-lg font-black text-white/15">×</span>
                )}
              </div>
            );
          })}

          <span className="text-lg font-black text-white/15">=</span>

          <div className="px-4 py-3 bg-green-500/15 rounded-xl text-center">
            <p className="text-[8px] font-bold uppercase tracking-widest text-green-400/50">Revenue</p>
            <p className="text-xl md:text-2xl font-black text-green-400">
              ${Math.round(monthlyRevenue).toLocaleString()}
              <span className="text-sm font-bold text-green-400/40">/mo</span>
            </p>
          </div>
        </div>

        {/* Expanded Lever Explanation */}
        <AnimatePresence>
          {expandedLever && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white/5 rounded-xl p-4 mt-2 mb-4 flex items-start justify-between">
                <div>
                  <p className="text-xs font-black text-white/60 mb-1">
                    {explanations[expandedLever].title}
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {explanations[expandedLever].explain(
                      expandedLever === "np" ? np : expandedLever === "conv" ? conv : expandedLever === "pva" ? pva : cva
                    )}
                  </p>
                </div>
                <button onClick={() => setExpandedLever(null)} className="text-white/20 hover:text-white/40 ml-3 mt-0.5">
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Biggest Gap Insight */}
        {biggestGap && !isOverridden && (
          <p className="text-center text-sm text-white/40 font-medium leading-relaxed max-w-lg mx-auto mb-4">
            Your biggest opportunity: <span className="text-brand-orange font-bold">{biggestGap.lever}</span>.{" "}
            {biggestGap.message}
          </p>
        )}

        {/* Secondary Stats */}
        <div className="flex items-center justify-center gap-6 md:gap-8 pt-4 border-t border-white/5">
          {overhead > 0 && (
            <>
              <div className="text-center">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">Overhead</p>
                <p className="text-sm font-black text-white/40">${overhead.toLocaleString()}/mo</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">Take-Home</p>
                <p className={`text-sm font-black ${margin >= 0 ? "text-green-400/70" : "text-red-400/70"}`}>
                  ${Math.round(margin).toLocaleString()}/mo
                </p>
              </div>
            </>
          )}
        </div>

        {/* Show Math */}
        <div className="text-center mt-3">
          <button
            onClick={() => setShowMath(!showMath)}
            className="text-[10px] text-white/20 hover:text-white/40 transition-colors font-medium inline-flex items-center gap-1"
          >
            {showMath ? "Hide" : "Show"} the math
            <ChevronDown size={10} className={`transition-transform ${showMath ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {showMath && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-white/20 mt-2 font-mono"
              >
                ({np.toFixed(1)} NP × {Math.round(conv)}% × {pva.toFixed(1)} PVA × ${cva.toFixed(0)} CVA) × 4.33 wks = ${Math.round(monthlyRevenue).toLocaleString()}/mo
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
