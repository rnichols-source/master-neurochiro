"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  X, 
  ArrowRight, 
  Info,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Video
} from "lucide-react";
import { markFirstLoginDone } from "@/app/actions/onboarding-actions";

const tutorialSteps = [
  {
    title: "The Command Center",
    content: "This is your central hub for clinical intelligence. Monitor your weekly growth, focus on current implementation tasks, and join live sessions from here.",
    icon: LayoutDashboard,
    target: "dashboard-header"
  },
  {
    title: "Mastermind Curriculum",
    content: "Access all 8 weeks of the NeuroChiro OS here. Each week includes core video training and implementation modules.",
    icon: BookOpen,
    target: "curriculum-card"
  },
  {
    title: "KPI Intelligence",
    content: "Input your weekly practice data to visualize trends. Clinical certainty is built on objective data, not feelings.",
    icon: BarChart3,
    target: "kpi-card"
  },
  {
    title: "Live Mastermind Calls",
    content: "Join upcoming live coaching sessions with Dr. Nichols directly from the portal. No more searching for Zoom links.",
    icon: Video,
    target: "live-call-banner"
  }
];

export default function GuidedTutorial() {
  const [active, setActive] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const handleClose = async () => {
    setActive(false);
    await markFirstLoginDone();
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      handleClose();
    }
  };

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-navy/60 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="max-w-md w-full"
        >
          <EliteCard className="p-8 border-brand-orange/20 shadow-2xl shadow-brand-orange/10 bg-white relative">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-brand-navy/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-brand-navy/40" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  {(() => {
                    const Icon = tutorialSteps[currentStep].icon;
                    return <Icon size={24} />;
                  })()}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Platform Guide</p>
                  <h3 className="text-xl font-black text-brand-navy">{tutorialSteps[currentStep].title}</h3>
                </div>
              </div>

              <p className="text-brand-gray text-sm leading-relaxed">
                {tutorialSteps[currentStep].content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-brand-navy/5">
                <div className="flex gap-1.5">
                  {tutorialSteps.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === currentStep ? "w-6 bg-brand-orange" : "w-2 bg-brand-navy/10"
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleClose}
                    className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/40 hover:text-brand-navy"
                  >
                    Skip Tour
                  </button>
                  <BrandButton size="sm" onClick={handleNext}>
                    {currentStep === tutorialSteps.length - 1 ? "Finish" : "Next"} <ArrowRight className="ml-2 w-3 h-3" />
                  </BrandButton>
                </div>
              </div>
            </div>
          </EliteCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
