"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandButton } from "@/components/ui/elite-ui";
import { submitKPIEntry } from "@/app/actions/kpi-actions";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  ChevronDown,
  DollarSign,
  Users,
  Target,
  Activity,
} from "lucide-react";

interface KPIWeeklyEntryProps {
  onSuccess: () => void;
  onCancel?: () => void;
  existingEntry?: any;
}

function getMonday(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  return date.toISOString().split("T")[0];
}

export function KPIWeeklyEntry({ onSuccess, onCancel, existingEntry }: KPIWeeklyEntryProps) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    week_start_date: existingEntry?.week_start_date || getMonday(new Date()),
    collections: existingEntry?.collections || 0,
    new_patients: existingEntry?.new_patients || 0,
    care_plans_accepted: existingEntry?.care_plans_accepted || 0,
    patient_visits: existingEntry?.patient_visits || 0,
    active_patients: existingEntry?.active_patients || 0,
    // Optional extras
    corrective_visits: existingEntry?.corrective_visits || 0,
    wellness_visits: existingEntry?.wellness_visits || 0,
    reconversions: existingEntry?.reconversions || 0,
    overhead: existingEntry?.overhead || 0,
    wins: existingEntry?.wins || "",
    bottlenecks: existingEntry?.bottlenecks || "",
  });

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, [step]);

  const update = (field: string, value: number | string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Calculated values
  const monthlyPace = form.collections * 4.33;
  const conversionRate = form.new_patients > 0 ? Math.round((form.care_plans_accepted / form.new_patients) * 100) : 0;
  const pva = form.active_patients > 0 ? (form.patient_visits / form.active_patients).toFixed(1) : "0";
  const cva = form.patient_visits > 0 ? (form.collections / form.patient_visits).toFixed(0) : "0";
  const monthlyRevenue = form.collections * 4.33;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = await submitKPIEntry(form);
    setIsSubmitting(false);
    if (result.success) {
      onSuccess();
    } else {
      alert("Error saving: " + result.error);
    }
  };

  const steps = [
    // Step 0: Collections
    {
      icon: DollarSign,
      question: "How much did you collect this week?",
      helper: "Pull this from your end-of-week report.",
      field: "collections",
      type: "dollar",
      feedback: form.collections > 0 ? (
        <p className="text-green-400 text-sm font-bold mt-3">
          That&apos;s a <span className="text-green-300">${Math.round(monthlyPace).toLocaleString()}/mo</span> pace.
        </p>
      ) : null,
    },
    // Step 1: New Patients
    {
      icon: Users,
      question: "How many Day 1s walked in?",
      helper: "A Day 1 is a brand new patient — their very first visit with you.",
      field: "new_patients",
      type: "number",
      feedback: null,
    },
    // Step 2: Care Plans (Conversion)
    {
      icon: Target,
      question: form.new_patients > 0
        ? `Of those ${form.new_patients} Day 1${form.new_patients !== 1 ? "s" : ""}, how many started a care plan?`
        : "How many started a care plan?",
      helper: "This is your conversion — the most powerful lever in your practice.",
      field: "care_plans_accepted",
      type: "number",
      feedback: form.new_patients > 0 && form.care_plans_accepted >= 0 ? (
        <div className="mt-3">
          <p className={`text-sm font-bold ${conversionRate >= 65 ? "text-green-400" : conversionRate >= 50 ? "text-amber-400" : "text-red-400"}`}>
            That&apos;s a {conversionRate}% conversion rate.
          </p>
          <p className="text-white/40 text-xs mt-1">
            {conversionRate >= 65
              ? "Strong. Most of your Day 1s are saying yes."
              : `For every 10 people who walk in, ${10 - Math.round(conversionRate / 10)} walk out without care.`}
          </p>
        </div>
      ) : null,
    },
    // Step 3: Total Visits
    {
      icon: Activity,
      question: "How many total patient visits this week?",
      helper: "Count every adjustment, every encounter — corrective and wellness.",
      field: "patient_visits",
      type: "number",
      feedback: form.patient_visits > 0 && form.collections > 0 ? (
        <p className="text-green-400 text-sm font-bold mt-3">
          That&apos;s <span className="text-green-300">${(form.collections / form.patient_visits).toFixed(0)} per visit</span> this week.
        </p>
      ) : null,
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;
  const isConfirmation = step === steps.length;
  const StepIcon = currentStep?.icon;

  const inputClass =
    "w-full bg-white/10 border border-white/10 rounded-xl py-4 px-6 text-2xl font-black text-white text-center focus:bg-white/15 focus:border-brand-orange/40 transition-all outline-none placeholder:text-white/20";

  return (
    <div className="bg-brand-navy rounded-2xl md:rounded-[2rem] overflow-hidden">
      {/* Step dots */}
      <div className="flex items-center justify-center gap-2 pt-6 pb-2 px-6">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => i < step && setStep(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === step ? "w-8 bg-brand-orange" : i < step ? "w-3 bg-brand-orange/40 cursor-pointer" : "w-3 bg-white/10"
            }`}
          />
        ))}
        <div className={`h-1.5 rounded-full transition-all ${isConfirmation ? "w-8 bg-green-500" : "w-3 bg-white/10"}`} />
      </div>

      <div className="p-6 md:p-10 min-h-[320px] flex flex-col">
        <AnimatePresence mode="wait">
          {!isConfirmation ? (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              {/* Question */}
              <div className="flex items-center gap-3 mb-2">
                {StepIcon && <StepIcon size={18} className="text-brand-orange" />}
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange">
                  Step {step + 1} of {steps.length}
                </p>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2">
                {currentStep.question}
              </h2>

              <p className="text-sm text-white/30 font-medium mb-6">
                {currentStep.helper}
              </p>

              {/* Input */}
              <div className="flex-1 flex flex-col justify-center max-w-xs mx-auto w-full">
                <div className="relative">
                  {currentStep.type === "dollar" && (
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-white/30">$</span>
                  )}
                  <input
                    ref={inputRef}
                    type="number"
                    min="0"
                    value={(form as any)[currentStep.field] || ""}
                    onChange={(e) => update(currentStep.field, Number(e.target.value))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (isLastStep) setStep(steps.length);
                        else setStep(step + 1);
                      }
                    }}
                    placeholder="0"
                    className={`${inputClass} ${currentStep.type === "dollar" ? "pl-12" : ""}`}
                  />
                </div>

                {/* Live Feedback */}
                {currentStep.feedback}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => (step > 0 ? setStep(step - 1) : onCancel?.())}
                  className="text-sm text-white/30 hover:text-white/60 transition-colors font-medium flex items-center gap-1"
                >
                  <ArrowLeft size={14} />
                  {step > 0 ? "Back" : "Cancel"}
                </button>

                <BrandButton
                  variant="accent"
                  size="sm"
                  className="px-6 group"
                  onClick={() => (isLastStep ? setStep(steps.length) : setStep(step + 1))}
                >
                  {isLastStep ? "Review" : "Next"}
                  <ArrowRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
                </BrandButton>
              </div>
            </motion.div>
          ) : (
            /* Confirmation Screen */
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-2">
                Your Numbers This Week
              </p>
              <h2 className="text-xl font-black text-white tracking-tight mb-6">
                Here&apos;s your revenue formula.
              </h2>

              {/* Weekly Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <SummaryChip label="Collections" value={`$${form.collections.toLocaleString()}`} sub={`$${Math.round(monthlyRevenue).toLocaleString()}/mo pace`} />
                <SummaryChip label="New Patients" value={`${form.new_patients}`} sub="Day 1s this week" />
                <SummaryChip
                  label="Conversion"
                  value={`${conversionRate}%`}
                  sub={`${form.care_plans_accepted} of ${form.new_patients} started care`}
                  health={conversionRate >= 65 ? "good" : conversionRate >= 50 ? "mid" : "low"}
                />
                <SummaryChip label="Total Visits" value={`${form.patient_visits}`} sub={form.patient_visits > 0 ? `$${(form.collections / form.patient_visits).toFixed(0)} per visit` : ""} />
              </div>

              {/* Optional Extras */}
              <button
                onClick={() => setShowExtras(!showExtras)}
                className="flex items-center gap-2 text-sm text-white/30 hover:text-white/50 transition-colors font-medium mx-auto mb-4"
              >
                Add more detail (optional)
                <ChevronDown size={14} className={`transition-transform ${showExtras ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showExtras && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <ExtraField label="Active Patients" value={form.active_patients} onChange={(v) => update("active_patients", v)} hint="Total unique patients in your practice" />
                      <ExtraField label="Monthly Overhead ($)" value={form.overhead} onChange={(v) => update("overhead", v)} hint="Update when it changes" />
                      <ExtraField label="Corrective Visits" value={form.corrective_visits} onChange={(v) => update("corrective_visits", v)} />
                      <ExtraField label="Wellness Visits" value={form.wellness_visits} onChange={(v) => update("wellness_visits", v)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-1 block">Wins this week</label>
                        <textarea
                          rows={2}
                          value={form.wins}
                          onChange={(e) => update("wins", e.target.value)}
                          placeholder="What went right?"
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:bg-white/10 focus:border-brand-orange/30 transition-all outline-none resize-none placeholder:text-white/15"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-1 block">Stuck points</label>
                        <textarea
                          rows={2}
                          value={form.bottlenecks}
                          onChange={(e) => update("bottlenecks", e.target.value)}
                          placeholder="Where are you blocked?"
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:bg-white/10 focus:border-brand-orange/30 transition-all outline-none resize-none placeholder:text-white/15"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center justify-between mt-auto pt-4">
                <button
                  onClick={() => setStep(steps.length - 1)}
                  className="text-sm text-white/30 hover:text-white/60 transition-colors font-medium flex items-center gap-1"
                >
                  <ArrowLeft size={14} /> Back
                </button>

                <BrandButton
                  variant="accent"
                  className="px-8 py-3 group"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      Save This Week <Check size={16} />
                    </span>
                  )}
                </BrandButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SummaryChip({ label, value, sub, health }: { label: string; value: string; sub?: string; health?: "good" | "mid" | "low" }) {
  const borderColor = health === "good" ? "border-green-500/30" : health === "mid" ? "border-amber-500/30" : health === "low" ? "border-red-500/30" : "border-white/10";
  return (
    <div className={`bg-white/5 rounded-xl p-3 text-center border ${borderColor}`}>
      <p className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-1">{label}</p>
      <p className="text-lg font-black text-white">{value}</p>
      {sub && <p className="text-[10px] text-white/30 mt-0.5">{sub}</p>}
    </div>
  );
}

function ExtraField({ label, value, onChange, hint }: { label: string; value: number; onChange: (v: number) => void; hint?: string }) {
  return (
    <div>
      <label className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-1 block">{label}</label>
      <input
        type="number"
        min="0"
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm font-bold text-white focus:bg-white/10 focus:border-brand-orange/30 transition-all outline-none"
      />
      {hint && <p className="text-[9px] text-white/15 mt-1">{hint}</p>}
    </div>
  );
}
