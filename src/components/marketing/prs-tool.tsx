"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { ArrowRight, Target, Plus, Zap, ShieldCheck, Brain } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const questions = [
  { id: 1, text: "Clinical Identity: Do you see yourself as a primary nervous system authority or a 'back-cracker'?", options: [
    { label: "Technician/Back-Cracker", score: 5 },
    { label: "Nervous System Advocate", score: 15 },
    { label: "Nervous System Authority", score: 25 },
  ]},
  { id: 2, text: "Current Conversion Rate: From Day 1 to a 3-month Care Plan?", options: [
    { label: "Below 40%", score: 5 },
    { label: "40% - 70%", score: 15 },
    { label: "Above 70%", score: 25 },
  ]},
  { id: 3, text: "Monthly Collections Consistency?", options: [
    { label: "High Volatility (Rollercoaster)", score: 5 },
    { label: "Stable but Stagnant", score: 15 },
    { label: "Predictable Growth", score: 25 },
  ]},
  { id: 4, text: "Do you use a proprietary Scan-to-Story framework?", options: [
    { label: "No (Just show images)", score: 5 },
    { label: "Generic Education Materials", score: 15 },
    { label: "Yes (Named Mechanism)", score: 25 },
  ]},
  { id: 5, text: "ROF Confidence: Recommending a $3,000+ Care Plan?", options: [
    { label: "High Persuasion Energy (Needing a yes)", score: 5 },
    { label: "Moderate Tension", score: 15 },
    { label: "Absolute Authority (Detached from outcome)", score: 25 },
  ]},
  { id: 6, text: "Marketing Strategy: High-end authority or chasing deals?", options: [
    { label: "Chasing Facebook Leads/Vouchers", score: 5 },
    { label: "Referral-based only (No growth system)", score: 15 },
    { label: "Authority Flywheel (Consistent attraction)", score: 25 },
  ]},
  { id: 7, text: "Practice Operations: Systems vs Chaos?", options: [
    { label: "Chaos (I do everything)", score: 5 },
    { label: "Some Systems (Manual/Fragile)", score: 15 },
    { label: "Operating System Installed", score: 25 },
  ]},
  { id: 8, text: "Clinical Data: Use of HRV and Neuro-Scans?", options: [
    { label: "None / Irregularly", score: 5 },
    { label: "Regularly but poorly explained", score: 15 },
    { label: "Foundational to every ROF", score: 25 },
  ]},
  { id: 9, text: "Leadership State: How certain is your team?", options: [
    { label: "Low Certainty / High Turnover", score: 5 },
    { label: "Compliant but not inspired", score: 15 },
    { label: "Unified Mission / High Certainty", score: 25 },
  ]},
  { id: 10, text: "Readiness Level: Are you ready to reconstruct your identity?", options: [
    { label: "I just want some tips", score: 5 },
    { label: "I'm ready to learn", score: 15 },
    { label: "I'm ready for a full OS install", score: 25 },
  ]}
];

export function PracticeReadinessScore() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();

  const handleOptionSelect = (s: number) => {
    const newScore = score + s;
    if (currentStep < questions.length - 1) {
      setScore(newScore);
      setCurrentStep(currentStep + 1);
    } else {
      setScore(newScore);
      setIsFinished(true);
    }
  };

  const getResult = () => {
    const percentage = (score / (questions.length * 25)) * 100;
    if (percentage >= 85) return { title: "Admitted Candidate", type: "high", desc: "You have the foundation. The NeuroChiro OS will optimize your conversion to the top 1%." };
    if (percentage >= 60) return { title: "High Potential", type: "mid", desc: "You're doing the work, but your 'Identity' and 'Communication' are leaking revenue." };
    return { title: "Not Yet", type: "low", desc: "You need to reconstruct your clinical certainty before scaling." };
  };

  if (isFinished) {
    const result = getResult();
    return (
      <EliteCard className="text-center p-12 bg-white border-brand-orange/20 shadow-2xl">
        <div className="space-y-8">
          <div className="inline-flex p-6 bg-brand-orange/10 rounded-full animate-bounce">
            <Target className="w-10 h-10 text-brand-orange" />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">Diagnosis Results</p>
            <h3 className="text-5xl font-black text-brand-navy tracking-tighter">{result.title}</h3>
          </div>
          <p className="text-brand-gray text-lg font-medium leading-relaxed max-w-sm mx-auto">{result.desc}</p>
          <div className="pt-6">
            <BrandButton 
              variant="accent" 
              className="w-full py-6 text-lg group"
              onClick={() => router.push(`/mastermind/apply?score=${score}&status=${result.title}`)}
            >
              Apply for Admission <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </BrandButton>
          </div>
        </div>
      </EliteCard>
    );
  }

  const progress = (currentStep / questions.length) * 100;

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Diagnostic Progress</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange">{Math.round(progress)}% Complete</p>
        </div>
        <div className="h-1 w-full bg-brand-navy/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-orange transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Question {currentStep + 1} of {questions.length}</p>
            <h3 className="text-2xl font-black text-brand-navy leading-tight tracking-tight">{questions[currentStep].text}</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {questions[currentStep].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelect(opt.score)}
                className="group p-6 text-left bg-brand-cream/50 border border-brand-navy/5 rounded-3xl hover:border-brand-orange/40 hover:bg-white hover:elite-shadow transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-5 h-5 text-brand-orange" />
                </div>
                <span className="text-sm font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
