"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Play, ArrowRight, X, ShieldCheck, Zap, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandButton } from "@/components/ui/elite-ui";
import { markFirstLoginDone } from "@/app/actions/onboarding-actions";

interface Task {
  id: string;
  title: string;
  description: string;
  icon: any;
  completed: boolean;
  link: string;
}

export function OnboardingChecklist({ isFirstLogin }: { isFirstLogin: boolean }) {
  const [isOpen, setIsOpen] = useState(isFirstLogin);
  // ... (keep tasks state)
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: "Watch: Welcome to the OS", description: "A high-intensity briefing from Dr. Nichols.", icon: Play, completed: false, link: "/portal/curriculum/week-1-identity" },
    { id: '2', title: "Complete Your Clinical Profile", description: "Calibrate your practice data for precision tracking.", icon: ShieldCheck, completed: true, link: "/portal/onboarding" },
    { id: '3', title: "Download the Clinical Playbook", description: "Your field manual for nervous system certainty.", icon: Target, completed: false, link: "/portal/vault" },
    { id: '4', title: "Submit Your First KPI Entry", description: "Establish your baseline metrics.", icon: Zap, completed: false, link: "/portal/kpi" },
  ]);

  async function handleClose() {
    setIsOpen(false);
    await markFirstLoginDone();
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-navy/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar: Progress */}
          <div className="md:w-1/3 bg-brand-navy p-8 md:p-12 text-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center font-black text-2xl mb-6 shadow-xl shadow-brand-orange/20">N</div>
              <h2 className="text-3xl font-black tracking-tight leading-tight">Installation Checklist</h2>
              <p className="text-white/40 text-sm mt-4 font-medium italic">"Certainty is built through intentional implementation."</p>
            </div>

            <div className="space-y-4 pt-12">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-white/40">Activation Progress</span>
                <span className="text-brand-orange">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-brand-orange" 
                />
              </div>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest text-center italic">Step {completedCount} of {tasks.length} Completed</p>
            </div>
          </div>

          {/* Right Area: Tasks */}
          <div className="flex-1 p-8 md:p-12 space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-brand-navy">Mission Objectives</h3>
                <p className="text-sm text-brand-gray">Complete these tasks to unlock full portal capability.</p>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-brand-cream rounded-full transition-colors">
                <X className="w-5 h-5 text-brand-navy/20" />
              </button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <a 
                  key={task.id} 
                  href={task.link}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all group ${task.completed ? 'bg-green-50/50 border-green-100 opacity-60' : 'bg-brand-cream/30 border-brand-navy/5 hover:border-brand-orange/20 hover:bg-white hover:shadow-xl hover:shadow-brand-navy/5'}`}
                >
                  <div className={`p-3 rounded-xl ${task.completed ? 'bg-green-100 text-green-600' : 'bg-white text-brand-navy shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-colors'}`}>
                    <task.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-black text-brand-navy uppercase tracking-wide">{task.title}</h4>
                    <p className="text-[10px] font-medium text-brand-gray">{task.description}</p>
                  </div>
                  {task.completed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-brand-navy/10 group-hover:text-brand-orange transition-colors" />}
                </a>
              ))}
            </div>

            <div className="pt-4">
              <BrandButton onClick={handleClose} variant="primary" className="w-full py-5 text-sm uppercase tracking-widest">
                Return to Command Center <ArrowRight className="ml-2 w-4 h-4" />
              </BrandButton>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
