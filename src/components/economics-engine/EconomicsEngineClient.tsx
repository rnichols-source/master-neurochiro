"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  Target, 
  Calculator, 
  Info, 
  PieChart, 
  BarChart3, 
  Calendar,
  Download,
  AlertCircle,
  CheckCircle2,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface EconomicsData {
  rent: number;
  payroll: number;
  marketing: number;
  software: number;
  insurance: number;
  equipment: number;
  utilities: number;
  misc: number;
  desiredIncome: number;
  weeklyVisits: number;
  currentCPV: number;
}

export function EconomicsEngineClient() {
  const [step, setStep] = useState(1);
  const [showEdu, setShowEdu] = useState(true);
  const [data, setData] = useState<EconomicsData>({
    rent: 0,
    payroll: 0,
    marketing: 0,
    software: 0,
    insurance: 0,
    equipment: 0,
    utilities: 0,
    misc: 0,
    desiredIncome: 10000,
    weeklyVisits: 100,
    currentCPV: 40
  });

  // Calculations
  const monthlyOverhead = data.rent + data.payroll + data.marketing + data.software + data.insurance + data.equipment + data.utilities + data.misc;
  const requiredMonthlyRevenue = monthlyOverhead + data.desiredIncome;
  const monthlyVisits = Math.round(data.weeklyVisits * 4.33);
  const requiredCPV = monthlyVisits > 0 ? Math.round(requiredMonthlyRevenue / monthlyVisits) : 0;
  const cpvGap = Math.max(0, requiredCPV - data.currentCPV);
  const annualRevenue = requiredMonthlyRevenue * 12;

  // Care Plan Recommendations
  const cp1Price = requiredCPV * 28;
  const cp2Price = requiredCPV * 36;
  const cp3Price = requiredCPV * 48;

  // Roadmap stages
  const stage1 = Math.round(data.currentCPV + (cpvGap * 0.33));
  const stage2 = Math.round(data.currentCPV + (cpvGap * 0.66));
  const stage3 = requiredCPV;

  const updateField = (field: keyof EconomicsData, val: string) => {
    const num = parseFloat(val) || 0;
    setData(prev => ({ ...prev, [field]: num }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-brand-navy/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange mb-4">
            <Calculator size={14} />
            <p className="text-[10px] font-black uppercase tracking-widest">Financial Instrument</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tighter leading-none">Clinical Economics Engine</h1>
          <p className="text-brand-gray font-medium mt-2 max-w-xl text-lg">
            Reverse engineer your practice revenue and stabilize your care plan architecture.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <BrandButton 
            variant="outline" 
            onClick={() => setShowEdu(!showEdu)}
            className={cn("text-[10px] gap-2", showEdu && "bg-brand-navy text-white")}
          >
            <BookOpen size={14} /> {showEdu ? "Hide Education" : "Education Mode"}
          </BrandButton>
          <BrandButton variant="primary" className="text-[10px] gap-2">
            <Download size={14} /> Export Report
          </BrandButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Step-by-Step Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Progress Tracker */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                className={cn(
                  "h-1 flex-1 rounded-full transition-all duration-500",
                  step >= i ? "bg-brand-orange" : "bg-brand-navy/5"
                )} 
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-black text-brand-navy tracking-tight">Step 1: Operational Expenses</h2>
                  <p className="text-sm text-brand-gray font-medium">List your total monthly practice overhead.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'rent', label: 'Rent / Mortgage', icon: DollarSign },
                    { id: 'payroll', label: 'Staff Payroll (Total)', icon: Users },
                    { id: 'marketing', label: 'Marketing Budget', icon: TrendingUp },
                    { id: 'software', label: 'Software / EHR', icon: Calculator },
                    { id: 'insurance', label: 'Insurances', icon: Target },
                    { id: 'equipment', label: 'Equipment Loans', icon: Calendar },
                    { id: 'utilities', label: 'Utilities', icon: Calendar },
                    { id: 'misc', label: 'Misc Expenses', icon: DollarSign },
                  ].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">{field.label}</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/20 font-bold">$</span>
                        <input 
                          type="number" 
                          value={data[field.id as keyof EconomicsData]}
                          onChange={(e) => updateField(field.id as keyof EconomicsData, e.target.value)}
                          className="w-full bg-white border border-brand-navy/5 rounded-2xl py-4 pl-10 pr-4 text-brand-navy font-bold focus:border-brand-orange/40 outline-none transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-brand-navy tracking-tight">Step 2: Income & Volume</h2>
                  <p className="text-sm text-brand-gray font-medium">Define your goals and current reality.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-brand-navy uppercase">Target Monthly Personal Income</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-brand-navy/20">$</span>
                      <input 
                        type="number" 
                        value={data.desiredIncome}
                        onChange={(e) => updateField('desiredIncome', e.target.value)}
                        className="w-full bg-white border border-brand-navy/10 rounded-[2rem] py-8 pl-12 pr-8 text-4xl font-black text-brand-navy focus:border-brand-orange outline-none transition-all shadow-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">Avg Weekly Visits</label>
                      <input 
                        type="number" 
                        value={data.weeklyVisits}
                        onChange={(e) => updateField('weeklyVisits', e.target.value)}
                        className="w-full bg-white border border-brand-navy/5 rounded-2xl py-4 px-6 text-brand-navy text-xl font-black focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">Current CPV (Estimate)</label>
                      <input 
                        type="number" 
                        value={data.currentCPV}
                        onChange={(e) => updateField('currentCPV', e.target.value)}
                        className="w-full bg-white border border-brand-navy/5 rounded-2xl py-4 px-6 text-brand-navy text-xl font-black focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-black text-brand-navy tracking-tight text-center">Your Growth Roadmap</h2>
                  <p className="text-sm text-brand-gray font-medium text-center">The tiered path to your required economics.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { stage: "Stage 1: Alignment", val: stage1, strategy: "Restructure care plans & stabilize frequency logic." },
                    { stage: "Stage 2: Authority", val: stage2, strategy: "Refine Day 2 clarity & reduce clinical softening." },
                    { stage: "Stage 3: Mastery", val: stage3, strategy: "Full operational stability & high-level retention." },
                  ].map((s, i) => (
                    <EliteCard key={i} className="p-6 border-brand-navy/5 bg-white relative overflow-hidden group">
                      <div className="flex justify-between items-center relative z-10">
                        <div>
                          <p className="text-[9px] font-black text-brand-orange uppercase mb-1">{s.stage}</p>
                          <h4 className="text-sm font-bold text-brand-navy leading-relaxed max-w-xs">{s.strategy}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-black text-brand-navy/30 uppercase mb-1">Target CPV</p>
                          <p className="text-3xl font-black text-brand-navy tracking-tighter">${s.val}</p>
                        </div>
                      </div>
                      <div className={cn(
                        "absolute bottom-0 left-0 h-1 bg-brand-orange transition-all duration-1000",
                        i === 0 ? "w-1/3" : i === 1 ? "w-2/3" : "w-full"
                      )} />
                    </EliteCard>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-4 pt-6">
            {step > 1 && (
              <BrandButton variant="outline" onClick={prevStep} className="flex-1">Back</BrandButton>
            )}
            <BrandButton variant="primary" onClick={nextStep} className="flex-1 gap-2">
              {step === 3 ? "View Dashboard" : "Continue"} <ArrowRight size={16} />
            </BrandButton>
          </div>

          {/* Educational Tooltip */}
          {showEdu && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-brand-navy text-white rounded-3xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <BookOpen size={80} />
              </div>
              <div className="flex gap-3 items-center text-brand-orange">
                <Info size={18} />
                <p className="text-xs font-black uppercase tracking-widest">Why CPV Matters</p>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-medium">
                Most doctors try to solve revenue problems by increasing <strong>Volume</strong>. This leads to burnout and clinical decay. By calculating your <strong>Required CPV</strong>, we solve the problem through <strong>Structure</strong>. When your CPV is aligned with your overhead, your clinic becomes a predictable biological asset.
              </p>
            </motion.div>
          )}
        </div>

        {/* RIGHT: Live Readout Dashboard */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <EliteCard className="p-8 bg-brand-navy text-white border-none shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <TrendingUp size={160} />
            </div>

            <div className="space-y-10 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-2">Required CPV</p>
                  <h2 className="text-7xl font-black tracking-tighter leading-none">${requiredCPV}</h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">CPV Gap</p>
                  <p className={cn("text-2xl font-black", cpvGap > 0 ? "text-red-400" : "text-green-400")}>
                    {cpvGap > 0 ? `+$${cpvGap}` : "Aligned"}
                  </p>
                </div>
              </div>

              {/* Revenue Matrix */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div>
                  <p className="text-[9px] font-black uppercase text-white/40 mb-1">Monthly Target</p>
                  <p className="text-2xl font-black text-white">${requiredMonthlyRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-white/40 mb-1">Annual Forecast</p>
                  <p className="text-2xl font-black text-white">${annualRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-white/40 mb-1">Monthly Visits</p>
                  <p className="text-2xl font-black text-white">{monthlyVisits}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-white/40 mb-1">Monthly Overhead</p>
                  <p className="text-2xl font-black text-white">${monthlyOverhead.toLocaleString()}</p>
                </div>
              </div>

              {/* Care Plan Tiering */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Architecture Pricing</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "CP1 (28)", val: cp1Price },
                    { label: "CP2 (36)", val: cp2Price },
                    { label: "CP3 (48)", val: cp3Price },
                  ].map((p, i) => (
                    <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                      <p className="text-[8px] font-black text-white/40 uppercase mb-1">{p.label}</p>
                      <p className="text-sm font-black text-white">${Math.round(p.val).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </EliteCard>

          {/* Health Alert */}
          {monthlyOverhead > (requiredMonthlyRevenue * 0.6) && (
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex gap-4 items-start">
              <AlertCircle className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-orange-600 mb-1">Overhead Alert</p>
                <p className="text-[11px] text-orange-900/70 font-medium leading-relaxed">Your overhead is exceeding 60% of target revenue. This creates high clinical stress. Focus on CPV alignment before increasing marketing spend.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
