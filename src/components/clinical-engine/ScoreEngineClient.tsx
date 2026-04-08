"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { ShieldCheck, Activity, Download, Save, Info, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type CategoryId = 'xrays' | 'scans' | 'balance' | 'symptoms' | 'posture';

interface CategoryDef {
  id: CategoryId;
  label: string;
  description: string;
  options: { label: string; value: number }[];
}

const CATEGORIES: CategoryDef[] = [
  {
    id: 'xrays',
    label: 'X-Rays / Structural',
    description: 'Structural phase of degeneration',
    options: [
      { label: 'No Phase', value: 0 },
      { label: 'Phase 1', value: 5 },
      { label: 'Phase 2', value: 10 },
      { label: 'Phase 3+', value: 15 },
    ]
  },
  {
    id: 'scans',
    label: 'Neurological Scans',
    description: 'HRV or Surface EMG scores',
    options: [
      { label: '80+', value: 0 },
      { label: '60–79', value: 5 },
      { label: '40–59', value: 10 },
      { label: 'Below 40', value: 15 },
    ]
  },
  {
    id: 'balance',
    label: 'Balance Testing',
    description: 'Weight distribution differential',
    options: [
      { label: '0–10 lbs', value: 0 },
      { label: '11–20 lbs', value: 5 },
      { label: '21–30 lbs', value: 10 },
      { label: '30+ lbs', value: 15 },
    ]
  },
  {
    id: 'symptoms',
    label: 'Subjective Symptoms',
    description: 'Current symptomatic load',
    options: [
      { label: 'None', value: 0 },
      { label: '1–2', value: 5 },
      { label: '3–4', value: 10 },
      { label: '5+', value: 15 },
    ]
  },
  {
    id: 'posture',
    label: 'Forward Head Posture',
    description: 'Physical load and compensation',
    options: [
      { label: '0–10 lbs', value: 0 },
      { label: '11–20 lbs', value: 5 },
      { label: '21–30 lbs', value: 10 },
      { label: '30+ lbs', value: 15 },
    ]
  }
];

export function ScoreEngineClient() {
  const [activeCategories, setActiveCategories] = useState<Record<CategoryId, boolean>>({
    xrays: true,
    scans: true,
    balance: true,
    symptoms: true,
    posture: true
  });

  const [scores, setScores] = useState<Record<CategoryId, number>>({
    xrays: 0,
    scans: 0,
    balance: 0,
    symptoms: 0,
    posture: 0
  });

  const [patientName, setPatientName] = useState("");

  // Calculation Logic
  const activeCount = Object.values(activeCategories).filter(Boolean).length;
  const maxScore = activeCount * 15;
  
  const rawScore = Object.entries(scores).reduce((acc, [key, val]) => {
    if (activeCategories[key as CategoryId]) return acc + val;
    return acc;
  }, 0);

  const percentage = maxScore === 0 ? 0 : Math.round((rawScore / maxScore) * 100);

  // Recommendation Engine
  let carePlan = "CP1";
  let visits = "24-28";
  let colorClass = "text-green-500";
  let bgClass = "bg-green-500";
  let severity = "Mild";

  if (percentage > 33 && percentage <= 66) {
    carePlan = "CP2";
    visits = "36";
    colorClass = "text-yellow-500";
    bgClass = "bg-yellow-500";
    severity = "Moderate";
  } else if (percentage > 66 && percentage <= 85) {
    carePlan = "CP3";
    visits = "48";
    colorClass = "text-orange-500";
    bgClass = "bg-orange-500";
    severity = "Significant";
  } else if (percentage > 85) {
    carePlan = "CP3+";
    visits = "60+";
    colorClass = "text-red-500";
    bgClass = "bg-red-500";
    severity = "Severe";
  }

  const toggleCategory = (id: CategoryId) => {
    setActiveCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-brand-navy/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-navy/5 rounded-full text-brand-navy mb-4">
            <Activity size={14} />
            <p className="text-xs font-black uppercase tracking-widest">Clinical Instrument</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tighter leading-none">Dysfunction Engine</h1>
          <p className="text-brand-gray font-medium mt-2 max-w-xl">
            Adaptive scoring matrix to determine objective care plan architecture.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <BrandButton variant="outline" className="flex-1 md:flex-none">Save Record</BrandButton>
          <BrandButton variant="primary" onClick={handlePrint} className="flex-1 md:flex-none gap-2">
            <Download size={14} /> Export PDF
          </BrandButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Patient Info */}
          <EliteCard className="p-6 bg-white border-brand-navy/5">
            <input 
              type="text" 
              placeholder="Patient Name" 
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full text-2xl font-black text-brand-navy placeholder:text-brand-navy/20 outline-none bg-transparent"
            />
          </EliteCard>

          {/* Category Configuration */}
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-2">Active Modalities</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 border",
                    activeCategories[cat.id] 
                      ? "bg-brand-navy border-brand-navy text-white shadow-md" 
                      : "bg-white border-brand-navy/10 text-brand-navy/40 hover:border-brand-orange/40"
                  )}
                >
                  {activeCategories[cat.id] && <CheckCircle2 size={12} className="text-brand-orange" />}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scoring Matrix */}
          <div className="space-y-4 pt-4">
             {CATEGORIES.filter(cat => activeCategories[cat.id]).map(cat => (
               <EliteCard key={cat.id} className="p-0 overflow-hidden border-brand-navy/5 bg-white">
                 <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                   <div className="md:w-1/3 shrink-0">
                     <h3 className="text-sm font-black text-brand-navy uppercase">{cat.label}</h3>
                     <p className="text-xs text-brand-gray font-medium mt-1">{cat.description}</p>
                   </div>
                   
                   <div className="flex-1 w-full grid grid-cols-4 gap-2">
                     {cat.options.map(opt => (
                       <button
                         key={opt.value}
                         onClick={() => setScores(prev => ({...prev, [cat.id]: opt.value}))}
                         className={cn(
                           "flex flex-col items-center justify-center py-3 rounded-xl border transition-all text-center group",
                           scores[cat.id] === opt.value 
                            ? "bg-brand-orange/10 border-brand-orange shadow-inner" 
                            : "bg-brand-cream/30 border-transparent hover:bg-brand-navy/5"
                         )}
                       >
                         <span className={cn(
                           "text-lg font-black leading-none mb-1 transition-colors",
                           scores[cat.id] === opt.value ? "text-brand-orange" : "text-brand-navy/30 group-hover:text-brand-navy/60"
                         )}>
                           {opt.value}
                         </span>
                         <span className={cn(
                           "text-xs font-bold uppercase tracking-widest px-1",
                           scores[cat.id] === opt.value ? "text-brand-navy" : "text-brand-navy/40"
                         )}>
                           {opt.label}
                         </span>
                       </button>
                     ))}
                   </div>
                 </div>
               </EliteCard>
             ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Output & Intelligence */}
        <div className="lg:col-span-5 space-y-6 sticky top-24 h-fit">
          
          {/* The Gauge / Dashboard */}
          <EliteCard className="p-8 bg-brand-navy text-white border-none shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldCheck size={160} className="text-white" />
            </div>

            <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-6">Clinical Readout</p>
            
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-6xl font-black tracking-tighter leading-none mb-2">{percentage}%</p>
                <p className={cn("text-xs font-black uppercase tracking-widest", colorClass)}>{severity} Dysfunction</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Raw Score</p>
                <p className="text-xl font-black">{rawScore} <span className="text-sm text-white/30">/ {maxScore}</span></p>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden mb-10">
              <motion.div 
                className={cn("h-full transition-all duration-700", bgClass)} 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
              />
            </div>

            {/* Recommendation */}
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Architecture</p>
                <h3 className="text-2xl font-black text-brand-orange">{carePlan}</h3>
              </div>
              <div className="text-right">
                <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Requirement</p>
                <h3 className="text-2xl font-black text-white">~{visits} <span className="text-sm text-white/50">Visits</span></h3>
              </div>
            </div>
          </EliteCard>

          {/* Clinical Intelligence Layer */}
          <EliteCard title="Patient Translation Mode" subtitle="Explanation Script">
            <div className="bg-brand-navy/5 p-5 rounded-2xl border-l-4 border-brand-orange space-y-4 mt-4">
              <p className="text-sm text-brand-navy font-medium leading-relaxed">
                "Based on your {Object.values(activeCategories).filter(Boolean).length} objective markers, your nervous system is currently showing a <strong>{percentage}% dysfunction load</strong>. This places you in the {severity.toLowerCase()} category."
              </p>
              <p className="text-sm text-brand-navy font-medium leading-relaxed">
                "The goal of care is not simply to relieve symptoms temporarily, but to retrain the nervous system through repetition so it can stabilize. To allow your system enough repetitions to adapt and rebuild a new baseline, biology requires a structured care plan of approximately <strong>{visits} visits.</strong>"
              </p>
            </div>
          </EliteCard>

          {/* Retention Risk Predictor */}
          {scores.symptoms <= 5 && percentage >= 50 && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-4 items-start">
               <AlertTriangle className="text-red-500 w-5 h-5 shrink-0 mt-0.5" />
               <div>
                 <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-1">High Retention Risk</p>
                 <p className="text-[11px] text-red-900/70 font-medium leading-relaxed">Patient has low symptoms but high structural dysfunction. They are highly likely to drop out early once they "feel better" unless you anchor the ROF entirely on the objective data, not pain.</p>
               </div>
             </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
