"use client";

import { useState, useMemo } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { TrendingUp, Zap, ArrowRight, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export function PracticeGrowthSimulator() {
  const [inputs, setFormData] = useState({
    monthlyCollections: 45000,
    conversionRate: 65,
    avgCaseValue: 2200,
    newPatients: 12
  });

  // Calculate current vs optimized (NeuroChiro OS)
  const stats = useMemo(() => {
    const currentAnnual = inputs.monthlyCollections * 12;
    
    // Simulations based on NeuroChiro OS typical improvements
    const optimizedConversion = Math.min(inputs.conversionRate + 15, 95); // +15% conversion
    const optimizedCaseValue = inputs.avgCaseValue * 1.2; // +20% Case Value
    
    // Formula: (NPs * Conversion * CaseValue) * 12
    const optimizedAnnual = (inputs.newPatients * (optimizedConversion / 100) * optimizedCaseValue) * 12;
    const velocityGap = optimizedAnnual - currentAnnual;
    const monthsSaved = Math.round((velocityGap / (optimizedAnnual / 12)));

    return {
      currentAnnual,
      optimizedAnnual,
      velocityGap,
      monthsSaved
    };
  }, [inputs]);

  const fields = [
    { label: "Monthly Income", key: "monthlyCollections", prefix: "$", min: 1000, max: 200000, step: 1000 },
    { label: "Case Acceptance %", key: "conversionRate", suffix: "%", min: 10, max: 100, step: 1 },
    { label: "Avg Case Value", key: "avgCaseValue", prefix: "$", min: 500, max: 10000, step: 100 },
  ];

  return (
    <EliteCard className="bg-brand-navy text-white border-none p-0 overflow-hidden shadow-2xl">
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-2">Opportunity Finder</p>
            <h2 className="text-4xl font-black tracking-tighter">Practice Growth Simulator</h2>
          </div>
          <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/5 backdrop-blur-sm">
            <p className="text-[8px] font-black uppercase text-white/40 mb-1">Status</p>
            <p className="text-sm font-black text-brand-orange animate-pulse">Finding your potential...</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Inputs */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/10 pb-4">Where you are now</h3>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-white/60 uppercase">{field.label}</label>
                    <span className="text-xs font-black text-brand-orange">
                      {field.prefix}{(inputs[field.key as keyof typeof inputs] || 0).toLocaleString()}{field.suffix}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min={field.min} 
                    max={field.max}
                    step={field.step}
                    value={inputs[field.key as keyof typeof inputs]}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: Number(e.target.value) }))}
                    className="w-full accent-brand-orange opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-2 bg-white/5 rounded-[2rem] p-8 border border-white/5 flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Yearly Total Today</p>
                <h4 className="text-4xl font-black text-white/40">${(stats.currentAnnual / 1000).toFixed(1)}k</h4>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase text-brand-orange tracking-widest">Optimized Potential</p>
                <motion.h4 
                  key={stats.optimizedAnnual}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl font-black text-white"
                >
                  ${(stats.optimizedAnnual / 1000).toFixed(1)}k
                </motion.h4>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/5 space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-[10px] font-black uppercase text-white/40 mb-1">Potential Yearly Increase</p>
                  <h3 className="text-5xl font-black text-brand-orange tracking-tighter">+${(stats.velocityGap / 1000).toFixed(1)}k</h3>
                </div>
                <div className="text-center md:text-right">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
                    <Zap className="w-3 h-3 fill-green-400" /> Time Saved
                  </div>
                  <p className="text-xl font-black text-white">Reach Your 2026 Goal <br /><span className="text-brand-orange">{stats.monthsSaved} Months Earlier</span></p>
                </div>
              </div>
              
              <div className="p-6 bg-brand-orange/10 rounded-2xl border border-brand-orange/20">
                <p className="text-xs font-medium text-white/80 leading-relaxed">
                  <span className="text-brand-orange font-black">ANALYSIS:</span> Your current acceptance rate is slowing down your growth. By installing the <span className="text-white font-bold">NeuroChiro Systems</span>, we can capture ${Math.round(stats.velocityGap / 12).toLocaleString()} in extra monthly income without seeing a single extra patient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EliteCard>
  );
}
