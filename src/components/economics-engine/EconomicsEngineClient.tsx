"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { DollarSign, TrendingUp, Users, ArrowRight, Target, Calculator, Info, PieChart, BarChart3, Calendar, Download, AlertCircle, CheckCircle2, BookOpen, ArrowUpRight, ShieldCheck, Percent, Layers, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface EconomicsData {
  rent: number; payroll: number; utilities: number; software: number; insurance: number; marketing: number;
  equipment: number; supplies: number; cleaning: number; professional: number; loans: number; misc: number;
  desiredIncome: number; taxRate: number; buffer: number;
  maxWeeklyVisits: number; currentWeeklyVisits: number; currentCPV: number;
}

export function EconomicsEngineClient() {
  const [step, setStep] = useState(1);
  const [showEdu, setShowEdu] = useState(true);
  const [data, setData] = useState<EconomicsData>({
    rent: 0, payroll: 0, utilities: 0, software: 0, insurance: 0, marketing: 0,
    equipment: 0, supplies: 0, cleaning: 0, professional: 0, loans: 0, misc: 0,
    desiredIncome: 10000, taxRate: 0.30, buffer: 4500,
    maxWeeklyVisits: 150, currentWeeklyVisits: 100, currentCPV: 65
  });

  const overhead = data.rent + data.payroll + data.utilities + data.software + data.insurance + data.marketing + data.equipment + data.supplies + data.cleaning + data.professional + data.loans + data.misc;
  const tax = data.desiredIncome * data.taxRate;
  const reqRev = overhead + data.desiredIncome + tax + data.buffer;
  const monthlyCap = Math.round(data.maxWeeklyVisits * 4.33);
  const reqCPV = monthlyCap > 0 ? Math.round(reqRev / monthlyCap) : 0;
  const currMonthlyVisits = Math.round(data.currentWeeklyVisits * 4.33);
  const currRev = currMonthlyVisits * data.currentCPV;
  const mGap = Math.max(0, reqRev - currRev);
  const aGap = mGap * 12;
  const cpvGap = Math.max(0, reqCPV - data.currentCPV);
  const fullCapRev = monthlyCap * data.currentCPV;
  const util = data.maxWeeklyVisits > 0 ? Math.round((data.currentWeeklyVisits / data.maxWeeklyVisits) * 100) : 0;

  const s1 = Math.round(data.currentCPV + (cpvGap * 0.33));
  const s2 = Math.round(data.currentCPV + (cpvGap * 0.66));
  const cp1 = reqCPV * 28; const cp2 = reqCPV * 36; const cp3 = reqCPV * 48;

  const upd = (f: keyof EconomicsData, v: string) => setData(p => ({ ...p, [f]: parseFloat(v) || 0 }));

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-brand-navy/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange mb-4">
            <Calculator size={14} /><p className="text-xs font-black uppercase tracking-widest">Price Builder</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tighter leading-none">Practice Money Machine</h1>
          <p className="text-brand-gray font-medium mt-2 max-w-xl text-lg">Stop guessing your prices. Get the numbers you need to stay stable.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <BrandButton variant="outline" onClick={() => setShowEdu(!showEdu)} className={cn("text-xs gap-2 flex-1", showEdu && "bg-brand-navy text-white")}><BookOpen size={14} /> {showEdu ? "Hide Logic" : "Why these numbers matter"}</BrandButton>
          <BrandButton variant="primary" className="text-xs gap-2 flex-1"><Download size={14} /> Export Report</BrandButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={cn("h-1 flex-1 rounded-full transition-all duration-500", step >= i ? "bg-brand-orange" : "bg-brand-navy/5")} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div><h2 className="text-2xl font-black text-brand-navy tracking-tight">Step 1: Monthly Bills</h2><p className="text-sm text-brand-gray font-medium">List only recurring expenses. Divide annual bills by 12.</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'rent', label: 'Rent / Mortgage' }, { id: 'payroll', label: 'Staff Payroll + Taxes' },
                    { id: 'utilities', label: 'Utilities' }, { id: 'software', label: 'Software / EHR' },
                    { id: 'insurance', label: 'Insurance' }, { id: 'marketing', label: 'Marketing' },
                    { id: 'equipment', label: 'Equipment Payments' }, { id: 'professional', label: 'CPA / Legal' },
                    { id: 'loans', label: 'Loan Payments' }, { id: 'misc', label: 'Other Costs' },
                  ].map((f) => (
                    <div key={f.id} className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">{f.label}</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/20 font-bold">$</span>
                        <input type="number" value={data[f.id as keyof EconomicsData]} onChange={(e) => upd(f.id as keyof EconomicsData, e.target.value)} className="w-full bg-white border border-brand-navy/5 rounded-xl py-3 pl-8 pr-4 text-brand-navy font-bold focus:border-brand-orange/40 outline-none transition-all text-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div><h2 className="text-2xl font-black text-brand-navy tracking-tight">Step 2: Your Pay & Safety</h2><p className="text-sm text-brand-gray font-medium">Define your take-home pay goal and safety reserves.</p></div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-brand-navy uppercase">Target Take-Home Pay (Monthly)</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-brand-navy/20">$</span>
                      <input type="number" value={data.desiredIncome} onChange={(e) => upd('desiredIncome', e.target.value)} className="w-full bg-white border border-brand-navy/10 rounded-3xl py-6 pl-12 pr-8 text-4xl font-black text-brand-navy focus:border-brand-orange outline-none transition-all shadow-xl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1 text-center block">Emergency Fund / Savings</label>
                      <input type="number" value={data.buffer} onChange={(e) => upd('buffer', e.target.value)} className="w-full bg-white border border-brand-navy/5 rounded-2xl py-4 px-6 text-brand-navy text-xl font-black focus:border-brand-orange outline-none text-center" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1 text-center block">Tax (%)</label>
                      <input type="number" value={data.taxRate * 100} onChange={(e) => upd('taxRate', (parseFloat(e.target.value) / 100).toString())} className="w-full bg-white border border-brand-navy/5 rounded-2xl py-4 px-6 text-brand-navy text-xl font-black focus:border-brand-orange outline-none text-center" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div><h2 className="text-2xl font-black text-brand-navy tracking-tight">Step 3: Office Capacity</h2><p className="text-sm text-brand-gray font-medium">How many visits can you realistically handle?</p></div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-brand-navy uppercase block">Max Weekly Visits</label>
                    <input type="number" value={data.maxWeeklyVisits} onChange={(e) => upd('maxWeeklyVisits', e.target.value)} className="w-full bg-white border border-brand-navy/10 rounded-2xl py-5 px-8 text-3xl font-black text-brand-navy focus:border-brand-orange outline-none shadow-lg" />
                    <p className="text-xs text-brand-gray font-bold uppercase tracking-widest mt-2 ml-2">Total Monthly Capacity: {monthlyCap} Visits</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">Actual Weekly Visits</label>
                      <input type="number" value={data.currentWeeklyVisits} onChange={(e) => upd('currentWeeklyVisits', e.target.value)} className="w-full bg-white border border-brand-navy/5 rounded-xl py-4 px-6 text-brand-navy text-xl font-black focus:border-brand-orange outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">Current Visit Value</label>
                      <input type="number" value={data.currentCPV} onChange={(e) => upd('currentCPV', e.target.value)} className="w-full bg-white border border-brand-navy/5 rounded-xl py-4 px-6 text-brand-navy text-xl font-black focus:border-brand-orange outline-none" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div><h2 className="text-2xl font-black text-brand-navy tracking-tight text-center">Your Money Roadmap</h2><p className="text-sm text-brand-gray font-medium text-center">The path to getting your income where it needs to be.</p></div>
                <div className="space-y-4">
                  {[
                    { stage: "Stage 1: On Track", val: s1, strategy: "Restructure care plans & stabilize Day 1 orientation." },
                    { stage: "Stage 2: Authority", val: s2, strategy: "Refine Day 2 clarity & improve clinical communication." },
                    { stage: "Stage 3: Mastery", val: reqCPV, strategy: "Full operational stability. 100% Covered." },
                  ].map((s, i) => (
                    <EliteCard key={i} className="p-6 border-brand-navy/5 bg-white relative overflow-hidden group">
                      <div className="flex justify-between items-center relative z-10">
                        <div><p className="text-xs font-black text-brand-orange uppercase mb-1">{s.stage}</p><h4 className="text-sm font-bold text-brand-navy leading-relaxed max-w-xs">{s.strategy}</h4></div>
                        <div className="text-right"><p className="text-xs font-black text-brand-navy/30 uppercase mb-1">Target Per Visit</p><p className="text-3xl font-black text-brand-navy tracking-tighter">${s.val}</p></div>
                      </div>
                      <div className={cn("absolute bottom-0 left-0 h-1 bg-brand-orange transition-all duration-1000", i === 0 ? "w-1/3" : i === 1 ? "w-2/3" : "w-full")} />
                    </EliteCard>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div><h2 className="text-2xl font-black text-brand-navy tracking-tight text-center">Care Plan Price Builder</h2><p className="text-sm text-brand-gray font-medium text-center">Recommended Care Plan prices based on your Goal Per Visit (${reqCPV}).</p></div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Plan 1 - Initial Care (28 Visits)", val: cp1, desc: "Getting started." },
                    { label: "Plan 2 - Stabilization (36 Visits)", val: cp2, desc: "Fixing the pattern." },
                    { label: "Plan 3 - Long Term (48 Visits)", val: cp3, desc: "Total health maintenance." },
                  ].map((p, i) => (
                    <div key={i} className="p-8 bg-brand-navy rounded-[2rem] flex justify-between items-center border border-white/10 shadow-2xl">
                      <div><p className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">{p.desc}</p><h3 className="text-white text-xl font-black">{p.label}</h3></div>
                      <div className="text-right"><p className="text-brand-orange text-xs font-black uppercase tracking-widest mb-1">Required Price</p><h3 className="text-white text-4xl font-black tracking-tighter">${Math.round(p.val).toLocaleString()}</h3></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div><h2 className="text-2xl font-black text-brand-navy tracking-tight text-center">Future Forecast</h2><p className="text-sm text-brand-gray font-medium text-center">Potential scenarios for your clinic's financial future.</p></div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Current Reality (As-Is)", val: currRev, note: `${util}% schedule full` },
                    { label: "Full Schedule, Current Visit Value", val: fullCapRev, note: "If you filled every slot at current prices" },
                    { label: "Current Volume, Goal Visit Value", val: currMonthlyVisits * reqCPV, note: "Same volume, better architecture" },
                    { label: "Fully Aligned Clinic", val: reqRev, note: "Target revenue at target capacity" },
                  ].map((s, i) => (
                    <EliteCard key={i} className="p-6 bg-white border-brand-navy/5 flex justify-between items-center group">
                      <div><p className="text-sm font-bold text-brand-navy">{s.label}</p><p className="text-xs text-brand-gray font-black uppercase tracking-widest mt-1">{s.note}</p></div>
                      <span className="text-2xl font-black text-brand-navy group-hover:text-brand-orange transition-colors">${Math.round(s.val).toLocaleString()}</span>
                    </EliteCard>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-4 pt-6">
            {step > 1 && <BrandButton variant="outline" onClick={() => setStep(step - 1)} className="flex-1 gap-2"><ArrowLeft size={16} /> Back</BrandButton>}
            <BrandButton variant="primary" onClick={() => setStep(step === 6 ? 1 : step + 1)} className="flex-1 gap-2">{step === 6 ? "Recalibrate" : "Continue"} <ArrowRight size={16} /></BrandButton>
          </div>

          {showEdu && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-brand-navy text-white rounded-[2.5rem] space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><BookOpen size={100} /></div>
              <div className="flex gap-3 items-center text-brand-orange"><Info size={18} /><p className="text-xs font-black uppercase tracking-widest">Why these numbers matter</p></div>
              <div className="space-y-4 text-sm text-white/70 leading-relaxed font-medium">
                <p><strong>Value vs Volume:</strong> Fixing your visit value is the best way to stabilize. Adding more patients to a broken system leads to burnout.</p>
                <p><strong>Safety Buffer:</strong> Stable clinics keep a reserve ($3k-$6k) to handle upgrades and emergencies without stress.</p>
                <p><strong>Fact-Based Pricing:</strong> Clear numbers remove guilt and replace it with clinical necessity.</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <EliteCard className="p-8 bg-brand-navy text-white border-none shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5"><TrendingUp size={160} /></div>
            <div className="space-y-10 relative z-10">
              <div className="flex justify-between items-start">
                <div><p className="text-xs font-black uppercase tracking-widest text-brand-orange mb-2">Goal Per Visit</p><h2 className="text-7xl font-black tracking-tighter leading-none">${reqCPV}</h2></div>
                <div className="text-right"><p className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">Current Gap</p><p className={cn("text-2xl font-black", cpvGap > 0 ? "text-red-400" : "text-green-400")}>{cpvGap > 0 ? `+$${cpvGap}` : "On Track"}</p></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-white/40"><span>Schedule Fullness</span><span className={cn(util > 80 ? "text-brand-orange" : "text-green-400")}>{util}%</span></div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden"><motion.div className="h-full bg-brand-orange" initial={{ width: 0 }} animate={{ width: `${util}%` }} /></div>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div><p className="text-xs font-black uppercase text-white/40 mb-1">Monthly Required</p><p className="text-2xl font-black text-white">${Math.round(reqRev).toLocaleString()}</p></div>
                <div><p className="text-xs font-black uppercase text-white/40 mb-1">Actual Monthly</p><p className="text-2xl font-black text-white/60">${Math.round(currRev).toLocaleString()}</p></div>
                <div><p className="text-xs font-black uppercase text-white/40 mb-1">Monthly Gap</p><p className={cn("text-2xl font-black", mGap > 0 ? "text-red-400" : "text-green-400")}>{mGap > 0 ? `-$${mGap.toLocaleString()}` : "Covered"}</p></div>
                <div><p className="text-xs font-black uppercase text-white/40 mb-1">Yearly Potential</p><p className="text-2xl font-black text-brand-orange">${aGap.toLocaleString()}</p></div>
              </div>
              {fullCapRev < reqRev && (
                <div className="p-5 bg-red-500/20 border border-red-500/40 rounded-3xl flex gap-4 items-start"><AlertCircle className="text-red-500 w-6 h-6 shrink-0" /><div><p className="text-xs font-black uppercase tracking-widest text-red-400 mb-1">Math Problem</p><p className="text-xs text-white/60 font-medium leading-relaxed italic">Even if your schedule was 100% full at your current pricing, you would only produce ${Math.round(fullCapRev).toLocaleString()}/mo. Volume is NOT your problem. Your current prices are mathematically incapable of supporting your goals.</p></div></div>
              )}
            </div>
          </EliteCard>
          <div className="bg-white border border-brand-navy/5 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 text-center">Where the money goes</p>
            <div className="space-y-4">
              {[ { label: "Monthly Bills", val: overhead }, { label: "Your Take Home", val: data.desiredIncome }, { label: "Tax (30%)", val: tax }, { label: "Savings / Buffer", val: data.buffer } ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm font-bold"><span className="text-brand-gray">{item.label}</span><span className="text-brand-navy">${Math.round(item.val).toLocaleString()}</span></div>
              ))}
              <div className="pt-4 border-t border-brand-navy/5 flex justify-between items-center"><span className="text-brand-navy uppercase text-xs font-black tracking-widest">Required Revenue</span><span className="text-2xl font-black text-brand-navy">${Math.round(reqRev).toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
