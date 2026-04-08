"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Calendar, Target, TrendingUp, Users, Plus, Zap } from "lucide-react";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { submitKPIEntry } from "@/app/actions/kpi-actions";

interface KPIEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function KPIEntryModal({ isOpen, onClose, onSuccess }: KPIEntryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    week_start_date: new Date().toISOString().split('T')[0],
    collections: 0,
    new_patients: 0,
    patient_visits: 0,
    care_plans_accepted: 0,
    wins: "",
    bottlenecks: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await submitKPIEntry(formData);
    
    setIsSubmitting(false);
    if (result.success) {
      onSuccess();
      onClose();
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-navy/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-2xl z-[101] md:px-4 overflow-y-auto"
          >
            <EliteCard className="p-0 overflow-hidden shadow-2xl border-none">
              <div className="p-8 border-b border-brand-navy/5 flex items-center justify-between bg-brand-cream/30">
                <div>
                  <p className="text-brand-orange font-black uppercase tracking-wider text-xs mb-1">
                    Submit KPIs
                  </p>
                  <h3 className="text-2xl font-black text-brand-navy tracking-tight">Submit Weekly KPIs</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-brand-navy/5 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-brand-navy/40" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-navy/60 ml-1">
                      Week Starting Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                      <input
                        type="date"
                        required
                        value={formData.week_start_date}
                        onChange={(e) => setFormData(prev => ({ ...prev, week_start_date: e.target.value }))}
                        className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-brand-navy focus:bg-white focus:border-brand-orange/20 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Collections */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-navy/60 ml-1">
                      Total Collections ($)
                    </label>
                    <div className="relative">
                      <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.collections || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, collections: Number(e.target.value) }))}
                        placeholder="e.g. 12500"
                        className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-brand-navy focus:bg-white focus:border-brand-orange/20 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* New Patients */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-navy/60 ml-1">
                      New Patients
                    </label>
                    <div className="relative">
                      <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.new_patients || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, new_patients: Number(e.target.value) }))}
                        className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-brand-navy focus:bg-white focus:border-brand-orange/20 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Visits */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-navy/60 ml-1">
                      Total Patient Visits
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.patient_visits || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, patient_visits: Number(e.target.value) }))}
                        className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-brand-navy focus:bg-white focus:border-brand-orange/20 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Wins */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-navy/60 ml-1">
                      Weekly Wins (Identity Shifts, Results)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.wins}
                      onChange={(e) => setFormData(prev => ({ ...prev, wins: e.target.value }))}
                      placeholder="What went right this week?"
                      className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 px-6 text-sm font-bold text-brand-navy focus:bg-white focus:border-brand-orange/20 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Bottlenecks */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-navy/60 ml-1">
                      Current Bottlenecks (Where are you stuck?)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.bottlenecks}
                      onChange={(e) => setFormData(prev => ({ ...prev, bottlenecks: e.target.value }))}
                      placeholder="What is preventing growth?"
                      className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 px-6 text-sm font-bold text-brand-navy focus:bg-white focus:border-brand-orange/20 transition-all outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <BrandButton 
                    type="button" 
                    variant="ghost" 
                    className="flex-1" 
                    onClick={onClose}
                  >
                    Cancel
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
                        Submit Intelligence <Zap className="w-4 h-4 fill-white" />
                      </span>
                    )}
                  </BrandButton>
                </div>
              </form>
            </EliteCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
