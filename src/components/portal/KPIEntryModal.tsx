"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Calendar, Target, TrendingUp, Users, Plus, Zap, DollarSign, Activity, Heart, ArrowRight } from "lucide-react";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { submitKPIEntry } from "@/app/actions/kpi-actions";

interface KPIEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function KPIEntryModal({ isOpen, onClose, onSuccess }: KPIEntryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    week_start_date: new Date().toISOString().split('T')[0],
    collections: 0,
    new_patients: 0,
    patient_visits: 0,
    care_plans_accepted: 0,
    overhead: 0,
    active_patients: 0,
    corrective_visits: 0,
    wellness_visits: 0,
    reconversions: 0,
    wins: "",
    bottlenecks: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitKPIEntry(formData);

    setIsSubmitting(false);
    if (result.success) {
      setStep(1);
      onSuccess();
      onClose();
    } else {
      alert("Error: " + result.error);
    }
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  // Auto-calculated preview values
  const conversionRate = formData.new_patients > 0
    ? Math.round((formData.care_plans_accepted / formData.new_patients) * 100)
    : 0;
  const cva = formData.patient_visits > 0
    ? (formData.collections / formData.patient_visits).toFixed(2)
    : "0.00";
  const pva = formData.active_patients > 0
    ? (formData.patient_visits / formData.active_patients).toFixed(1)
    : "0.0";
  const margin = formData.collections - (formData.overhead || 0);

  const inputClass = "w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-brand-navy focus:bg-white focus:border-brand-orange/20 transition-all outline-none";
  const labelClass = "text-[10px] font-black uppercase tracking-widest text-brand-navy/60 ml-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-brand-navy/40 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[101] px-4 max-h-[90vh] overflow-y-auto"
          >
            <EliteCard className="p-0 overflow-hidden shadow-2xl border-none">
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-brand-navy/5 flex items-center justify-between bg-brand-cream/30">
                <div>
                  <p className="text-brand-orange font-black uppercase tracking-[0.2em] text-[10px] mb-1">
                    Practice Scorecard
                  </p>
                  <h3 className="text-xl md:text-2xl font-black text-brand-navy tracking-tight">
                    {step === 1 ? "Core Numbers" : step === 2 ? "Practice Breakdown" : "Wins & Stuck Points"}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  {/* Step indicators */}
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map(s => (
                      <div
                        key={s}
                        className={`w-2 h-2 rounded-full transition-all ${s === step ? 'bg-brand-orange w-6' : s < step ? 'bg-brand-orange/40' : 'bg-brand-navy/10'}`}
                      />
                    ))}
                  </div>
                  <button onClick={handleClose} className="p-2 hover:bg-brand-navy/5 rounded-xl transition-colors">
                    <X className="w-5 h-5 text-brand-navy/40" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Core Numbers */}
                {step === 1 && (
                  <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={labelClass}>Week Starting Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                          <input
                            type="date"
                            required
                            value={formData.week_start_date}
                            onChange={(e) => setFormData(prev => ({ ...prev, week_start_date: e.target.value }))}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>Total Collections ($)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                          <input
                            type="number"
                            required
                            min="0"
                            value={formData.collections || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, collections: Number(e.target.value) }))}
                            placeholder="e.g. 4200"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>New Patients (Day 1s)</label>
                        <div className="relative">
                          <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                          <input
                            type="number"
                            required
                            min="0"
                            value={formData.new_patients || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, new_patients: Number(e.target.value) }))}
                            placeholder="e.g. 2"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>Care Plans Accepted</label>
                        <div className="relative">
                          <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                          <input
                            type="number"
                            required
                            min="0"
                            value={formData.care_plans_accepted || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, care_plans_accepted: Number(e.target.value) }))}
                            placeholder="e.g. 1"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>Total Patient Visits</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                          <input
                            type="number"
                            required
                            min="0"
                            value={formData.patient_visits || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, patient_visits: Number(e.target.value) }))}
                            placeholder="e.g. 55"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>Total Active Patients</label>
                        <div className="relative">
                          <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                          <input
                            type="number"
                            required
                            min="0"
                            value={formData.active_patients || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, active_patients: Number(e.target.value) }))}
                            placeholder="e.g. 35"
                            className={inputClass}
                          />
                        </div>
                        <p className="text-[10px] text-brand-navy/40 ml-1">Unique patients seen this week</p>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <BrandButton type="button" variant="ghost" className="flex-1" onClick={handleClose}>
                        Cancel
                      </BrandButton>
                      <BrandButton
                        type="button"
                        variant="accent"
                        className="flex-[2] py-4 group"
                        onClick={() => setStep(2)}
                      >
                        <span className="flex items-center gap-2">
                          Next: Practice Breakdown <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </BrandButton>
                    </div>
                  </div>
                )}

                {/* Step 2: Practice Breakdown */}
                {step === 2 && (
                  <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={labelClass}>Corrective Care Visits</label>
                        <div className="relative">
                          <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                          <input
                            type="number"
                            min="0"
                            value={formData.corrective_visits || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, corrective_visits: Number(e.target.value) }))}
                            placeholder="e.g. 12"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>Wellness Visits</label>
                        <div className="relative">
                          <Heart className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                          <input
                            type="number"
                            min="0"
                            value={formData.wellness_visits || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, wellness_visits: Number(e.target.value) }))}
                            placeholder="e.g. 43"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>Reconversions</label>
                        <div className="relative">
                          <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                          <input
                            type="number"
                            min="0"
                            value={formData.reconversions || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, reconversions: Number(e.target.value) }))}
                            placeholder="e.g. 1"
                            className={inputClass}
                          />
                        </div>
                        <p className="text-[10px] text-brand-navy/40 ml-1">Corrective care patients who transitioned to wellness</p>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>Monthly Overhead ($)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                          <input
                            type="number"
                            min="0"
                            value={formData.overhead || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, overhead: Number(e.target.value) }))}
                            placeholder="e.g. 6000"
                            className={inputClass}
                          />
                        </div>
                        <p className="text-[10px] text-brand-navy/40 ml-1">Rent, staff, insurance, supplies — update monthly</p>
                      </div>
                    </div>

                    {/* Live Preview */}
                    <div className="bg-brand-navy rounded-2xl p-6 space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Live Calculations</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Conversion</p>
                          <p className="text-xl font-black text-white">{conversionRate}%</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">PVA</p>
                          <p className="text-xl font-black text-white">{pva}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">CVA</p>
                          <p className="text-xl font-black text-white">${cva}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Margin</p>
                          <p className={`text-xl font-black ${margin >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${margin.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <BrandButton type="button" variant="ghost" className="flex-1" onClick={() => setStep(1)}>
                        Back
                      </BrandButton>
                      <BrandButton
                        type="button"
                        variant="accent"
                        className="flex-[2] py-4 group"
                        onClick={() => setStep(3)}
                      >
                        <span className="flex items-center gap-2">
                          Next: Wins & Stuck Points <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </BrandButton>
                    </div>
                  </div>
                )}

                {/* Step 3: Wins & Bottlenecks */}
                {step === 3 && (
                  <div className="p-6 md:p-8 space-y-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className={labelClass}>Weekly Wins (Identity Shifts, Results)</label>
                        <textarea
                          rows={3}
                          value={formData.wins}
                          onChange={(e) => setFormData(prev => ({ ...prev, wins: e.target.value }))}
                          placeholder="What went right this week? New conversions, patient breakthroughs, systems that clicked..."
                          className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 px-6 text-sm font-bold text-brand-navy focus:bg-white focus:border-brand-orange/20 transition-all outline-none resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>Current Stuck Points (Where are you blocked?)</label>
                        <textarea
                          rows={3}
                          value={formData.bottlenecks}
                          onChange={(e) => setFormData(prev => ({ ...prev, bottlenecks: e.target.value }))}
                          placeholder="What's preventing growth? Conversion issues, staffing, time, specific patient situations..."
                          className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 px-6 text-sm font-bold text-brand-navy focus:bg-white focus:border-brand-orange/20 transition-all outline-none resize-none"
                        />
                      </div>
                    </div>

                    {/* Final Summary */}
                    <div className="bg-brand-cream/50 rounded-2xl p-6 space-y-3 border border-brand-navy/5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Submission Summary</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 text-sm">
                        <div>
                          <span className="text-brand-navy/40 text-xs">Collections</span>
                          <p className="font-black text-brand-navy">${formData.collections.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-brand-navy/40 text-xs">New Patients</span>
                          <p className="font-black text-brand-navy">{formData.new_patients}</p>
                        </div>
                        <div>
                          <span className="text-brand-navy/40 text-xs">Conversion</span>
                          <p className="font-black text-brand-navy">{conversionRate}%</p>
                        </div>
                        <div>
                          <span className="text-brand-navy/40 text-xs">Visits</span>
                          <p className="font-black text-brand-navy">{formData.patient_visits}</p>
                        </div>
                        <div>
                          <span className="text-brand-navy/40 text-xs">PVA</span>
                          <p className="font-black text-brand-navy">{pva}</p>
                        </div>
                        <div>
                          <span className="text-brand-navy/40 text-xs">CVA</span>
                          <p className="font-black text-brand-navy">${cva}</p>
                        </div>
                        <div>
                          <span className="text-brand-navy/40 text-xs">Overhead</span>
                          <p className="font-black text-brand-navy">${(formData.overhead || 0).toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-brand-navy/40 text-xs">Margin</span>
                          <p className={`font-black ${margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>${margin.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <BrandButton type="button" variant="ghost" className="flex-1" onClick={() => setStep(2)}>
                        Back
                      </BrandButton>
                      <BrandButton
                        type="submit"
                        variant="accent"
                        className="flex-[2] py-4 group"
                        isLoading={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <span className="flex items-center gap-2">
                            Submit Scorecard <Zap className="w-4 h-4 fill-white" />
                          </span>
                        )}
                      </BrandButton>
                    </div>
                  </div>
                )}
              </form>
            </EliteCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
