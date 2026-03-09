"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { 
  Activity,
  ChevronRight,
  Brain,
  Stethoscope,
  Target,
  MessageSquare,
  Lock,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

const cases = [
  {
    id: 1,
    title: "The Dysregulated Executive",
    patient: "42yo Male, CEO",
    presentation: "Chronic tension headaches, erratic sleep, high resting heart rate. Previous chiro focused on C1/C2 mechanics only. No relief.",
    neurology: "Sympathetic dominance. Vagal suppression indicated by HRV and digestion issues.",
    reasoning: "Structural correction alone failed because the system was too wound up to hold an adjustment.",
    frequency: "3x/week for 4 weeks (Stabilization Phase)",
    outcome: "Sleep restored by week 3. Headaches reduced by 80%. Tension dropped.",
    tier: 'standard'
  },
  {
    id: 2,
    title: "Post-Traumatic Adaptation",
    patient: "28yo Female, Post-Concussion",
    presentation: "Brain fog, light sensitivity, chronic fatigue. Seeking 'alignment'.",
    neurology: "Severe autonomic dysregulation. Sensory processing error.",
    reasoning: "Cannot push frequency too high initially; system will overwhelm. Gentle inputs required.",
    frequency: "2x/week for 6 weeks (Low input, high specificity)",
    outcome: "Fog cleared by week 4. Able to resume computer work.",
    tier: 'pro'
  }
];

export function CaseLabClient({ userTier }: { userTier: 'standard' | 'pro' | 'admin' }) {
  const isPro = userTier === 'pro' || userTier === 'admin';
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-2">Clinical Intelligence</p>
          <h1 className="text-4xl font-black text-brand-navy tracking-tighter leading-none">Case Breakdown Lab</h1>
          <p className="text-brand-gray font-medium mt-2 max-w-xl">
            Real-world clinical scenarios, neurological interpretations, and care plan reasoning.
          </p>
        </div>
        {isPro && (
          <BrandButton><Plus className="w-4 h-4 mr-2" /> Submit Case Review</BrandButton>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-2">Available Cases</p>
          {cases.map(c => {
            const isLocked = c.tier === 'pro' && !isPro;
            return (
              <div 
                key={c.id}
                onClick={() => !isLocked && setSelectedCase(c.id)}
                className={cn(
                  "p-4 rounded-2xl border transition-all cursor-pointer",
                  selectedCase === c.id ? "bg-brand-navy border-brand-navy text-white shadow-xl shadow-brand-navy/20" : 
                  isLocked ? "bg-white/50 border-brand-navy/5 text-brand-navy/40 opacity-80" :
                  "bg-white border-brand-navy/5 hover:border-brand-orange/40 text-brand-navy"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={cn(
                    "text-[8px] font-black uppercase tracking-widest",
                    selectedCase === c.id ? "text-brand-orange" : "text-brand-navy/40"
                  )}>Case 0{c.id}</span>
                  {isLocked && <Lock className="w-3 h-3 text-brand-orange" />}
                </div>
                <h4 className="font-black leading-tight mb-1">{c.title}</h4>
                <p className={cn("text-xs font-medium", selectedCase === c.id ? "text-white/60" : "text-brand-gray")}>{c.patient}</p>
              </div>
            );
          })}
          
          {!isPro && (
            <EliteCard className="p-6 bg-brand-orange/5 border-brand-orange/20 text-center mt-6">
              <Lock className="w-6 h-6 text-brand-orange mx-auto mb-3" />
              <h4 className="font-black text-brand-navy mb-2">Pro Mastery Required</h4>
              <p className="text-xs text-brand-navy/60 mb-4">Upgrade to unlock the full clinical archive and submit your own cases for review.</p>
              <BrandButton variant="outline" className="w-full text-xs py-2">Upgrade Now</BrandButton>
            </EliteCard>
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedCase ? (
            <EliteCard className="p-8 md:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-300">
              {(() => {
                const c = cases.find(x => x.id === selectedCase)!;
                return (
                  <>
                    <div className="border-b border-brand-navy/5 pb-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-2">{c.patient}</p>
                      <h2 className="text-3xl font-black text-brand-navy tracking-tight">{c.title}</h2>
                    </div>

                    <div className="space-y-8">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center shrink-0">
                          <Activity className="w-5 h-5 text-brand-navy" />
                        </div>
                        <div>
                          <h4 className="font-black text-brand-navy mb-1">Presentation</h4>
                          <p className="text-sm text-brand-gray leading-relaxed">{c.presentation}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center shrink-0">
                          <Brain className="w-5 h-5 text-brand-navy" />
                        </div>
                        <div>
                          <h4 className="font-black text-brand-navy mb-1">Neurological Interpretation</h4>
                          <p className="text-sm text-brand-gray leading-relaxed">{c.neurology}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0">
                          <Stethoscope className="w-5 h-5 text-brand-orange" />
                        </div>
                        <div>
                          <h4 className="font-black text-brand-navy mb-1">Clinical Reasoning</h4>
                          <p className="text-sm text-brand-gray leading-relaxed">{c.reasoning}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                          <Target className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-black text-brand-navy mb-1">Frequency & Outcomes</h4>
                          <p className="text-sm font-bold text-brand-navy mb-1">Prescription: {c.frequency}</p>
                          <p className="text-sm text-brand-gray leading-relaxed">Result: {c.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </EliteCard>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-brand-navy/10 rounded-3xl flex flex-col items-center justify-center text-brand-navy/20 p-8 text-center">
              <Activity className="w-12 h-12 mb-4 opacity-20" />
              <h3 className="font-black text-lg">Select a Case Study</h3>
              <p className="text-sm font-medium mt-2 max-w-sm">Choose a clinical case from the sidebar to review the presentation, neurological reasoning, and outcomes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}