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
            className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-2xl z-[101] md:px-4 overflow-y-auto safe-top safe-bottom"
          >
            <EliteCard className="p-0 overflow-hidden shadow-2xl border-none">
              <div className="p-5 md:p-6 border-b border-brand-navy/5 flex items-center justify-between">
                <h3 className="text-lg font-black text-brand-navy tracking-tight">Log This Week&apos;s Numbers</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-brand-navy/5 rounded-xl transition-colors touch-target"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-brand-navy/40" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-navy ml-1">
                      Week Starting Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                      <input
                        type="date"
                        required
                        value={formData.week_start_date}
                        onChange={(e) => setFormData(prev => ({ ...prev, week_start_date: e.target.value }))}
                        className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 pl-12 pr-6 text-base font-medium text-brand-navy focus:bg-white focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/10 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Collections */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-navy ml-1">
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
                        className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 pl-12 pr-6 text-base font-medium text-brand-navy focus:bg-white focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/10 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* New Patients */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-navy ml-1">
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
                        className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 pl-12 pr-6 text-base font-medium text-brand-navy focus:bg-white focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/10 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Visits */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-navy ml-1">
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
                        className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 pl-12 pr-6 text-base font-medium text-brand-navy focus:bg-white focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/10 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Wins */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-navy ml-1">
                      What went well this week?
                    </label>
                    <textarea
                      rows={2}
                      value={formData.wins}
                      onChange={(e) => setFormData(prev => ({ ...prev, wins: e.target.value }))}
                      placeholder="What went right this week?"
                      className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 px-6 text-base font-medium text-brand-navy focus:bg-white focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/10 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Bottlenecks */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-navy ml-1">
                      Where are you stuck?
                    </label>
                    <textarea
                      rows={2}
                      value={formData.bottlenecks}
                      onChange={(e) => setFormData(prev => ({ ...prev, bottlenecks: e.target.value }))}
                      placeholder="What's not working? What do you need help with?"
                      className="w-full bg-brand-navy/5 border border-brand-navy/5 rounded-xl py-4 px-6 text-base font-medium text-brand-navy focus:bg-white focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/10 transition-all outline-none resize-none"
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
                      <span>Submit</span>
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
