"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  Target, 
  Zap, 
  Users, 
  ShieldCheck, 
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  LayoutDashboard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const playbooks = [
  {
    id: "day1",
    title: "Day 1 Discovery System",
    description: "The complete structure for an authority-driven Day 1 consultation.",
    icon: LayoutDashboard, // Need to import Search, actually I will just use LayoutDashboard or Target
    steps: [
      { title: "The Pre-Frame", content: "Establish authority immediately. 'I am not here to treat your symptoms, I am here to evaluate the integrity of your nervous system.'" },
      { title: "The History", content: "Listen for the 'Why'. What is the symptom preventing them from doing?" },
      { title: "The Examination", content: "Explain the 'What'. Show them exactly what you are measuring and why." },
      { title: "The Post-Frame", content: "Set expectations for Day 2. 'I need time to review these findings. Do not change anything until we speak tomorrow.'" }
    ]
  },
  {
    id: "day2",
    title: "Day 2 Report of Findings",
    description: "The logic and structure to communicate clinical necessity and secure commitment.",
    icon: Target,
    steps: [
      { title: "The Review", content: "Remind them of their 'Why' and confirm you understand their goal." },
      { title: "The Revelation", content: "Show the scans. Explain the gap between where they are and where they need to be." },
      { title: "The Recommendation", content: "Present the care plan. Explain the frequency required to create neuro-plastic change." },
      { title: "The Financial Transition", content: "Present the investment confidently. 'Most of our families choose the monthly option. Which works better for you?'" }
    ]
  },
  {
    id: "careplan",
    title: "Care Plan Architecture",
    description: "Designing and communicating frequency based on biological adaptation.",
    icon: Zap,
    steps: [
      { title: "The Stabilization Phase", content: "High frequency (3x/week) to break the pattern of dysregulation." },
      { title: "The Reconstruction Phase", content: "Moderate frequency (2x/week) to build new neuro-structural habits." },
      { title: "The Integration Phase", content: "Lower frequency (1x/week) to integrate the new baseline." }
    ]
  }
];

export function PlaybooksClient() {
  const [expandedId, setExpandedId] = useState<string | null>("day1");

  const togglePlaybook = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-2">Practice Systems</p>
          <h1 className="text-4xl font-black text-brand-navy tracking-tighter leading-none">Implementation Playbooks</h1>
          <p className="text-brand-gray font-medium mt-2 max-w-xl">
            Step-by-step operating procedures for every phase of the patient journey. Don't guess; execute the playbook.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {playbooks.map((playbook) => (
          <EliteCard key={playbook.id} className="p-0 overflow-hidden border-brand-navy/10">
            <div 
              onClick={() => togglePlaybook(playbook.id)}
              className="p-6 md:p-8 flex items-center justify-between cursor-pointer hover:bg-brand-navy/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                  expandedId === playbook.id ? "bg-brand-orange text-white" : "bg-brand-navy/5 text-brand-navy"
                )}>
                  <playbook.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-navy">{playbook.title}</h3>
                  <p className="text-sm text-brand-gray">{playbook.description}</p>
                </div>
              </div>
              <div className={cn("transition-transform duration-300", expandedId === playbook.id ? "rotate-180" : "")}>
                <ChevronDown className="w-6 h-6 text-brand-navy/40" />
              </div>
            </div>

            <AnimatePresence>
              {expandedId === playbook.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-brand-navy/5"
                >
                  <div className="p-6 md:p-8 bg-brand-cream/30 space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-4">Execution Steps</h4>
                    <div className="space-y-4">
                      {playbook.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-8 h-8 rounded-lg bg-white border border-brand-navy/10 flex items-center justify-center shrink-0 shadow-sm text-brand-orange font-black text-xs">
                            {idx + 1}
                          </div>
                          <div>
                            <h5 className="font-bold text-brand-navy">{step.title}</h5>
                            <p className="text-sm text-brand-gray leading-relaxed mt-1">{step.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-6 mt-6 border-t border-brand-navy/5 flex justify-end">
                       <BrandButton variant="outline" size="sm">Download PDF Checklist</BrandButton>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </EliteCard>
        ))}
      </div>
    </div>
  );
}