"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { ShieldCheck, Search, AlertTriangle, ArrowRight, Zap, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const leakPatterns = [
  { 
    pattern: /hope/i, 
    type: "Low Certainty", 
    why: "Hope is not a clinical strategy. It signals to the patient that you aren't sure of the outcome.",
    fix: "Use 'Expect' or 'Anticipate' based on the neurology."
  },
  { 
    pattern: /try/i, 
    type: "Permission Seeking", 
    why: "'Trying' implies the possibility of failure before you've even started.",
    fix: "Use 'We are going to' or 'The objective is'."
  },
  { 
    pattern: /does that make sense\?/i, 
    type: "Validation Neediness", 
    why: "Asking for permission to be right. It suggests you aren't the authority in the room.",
    fix: "Use 'What questions do you have about that neurology?'"
  },
  { 
    pattern: /if you want/i, 
    type: "Leadership Leak", 
    why: "You are the doctor. Recommending based on their 'wants' rather than their 'needs' is a disservice.",
    fix: "Use 'Based on your scans, I am recommending...'"
  },
  { 
    pattern: /maybe/i, 
    type: "Hedge Language", 
    why: "Signals clinical hesitation. Patients don't buy 'maybe'.",
    fix: "Commit to the clinical path or the further diagnostic needed."
  }
];

export function ROFCertaintyLeakDetector() {
  const [input, setInput] = useState("");
  const [isScanning, setIsScaning] = useState(false);
  const [leaks, setLeaks] = useState<any[]>([]);
  const [hasScanned, setHasScanned] = useState(false);

  const scanText = () => {
    if (!input) return;
    setIsScaning(true);
    
    // Simulate a "Surgical Scan"
    setTimeout(() => {
      const foundLeaks = leakPatterns.filter(p => p.pattern.test(input));
      setLeaks(foundLeaks);
      setIsScaning(false);
      setHasScanned(true);
    }, 1500);
  };

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Certainty Protocol</p>
        <h2 className="text-5xl font-black text-brand-navy tracking-tighter">Certainty Leak Detector.</h2>
        <p className="text-brand-gray font-medium max-w-xl mx-auto">
          Paste a single sentence from your typical Report of Findings (ROF) 
          to see if your language is leaking clinical authority.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <EliteCard className="p-0 overflow-hidden border-brand-navy/5 shadow-2xl bg-white">
          <div className="p-10 space-y-8">
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-3 block">Paste ROF Sentence Here</label>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. 'I really hope we can try to get you feeling better if you want to start today...'"
                className="w-full bg-brand-cream/50 border-2 border-brand-navy/5 rounded-2xl p-6 text-lg font-bold text-brand-navy focus:border-brand-orange/40 focus:ring-0 transition-all outline-none resize-none min-h-[120px]"
              />
              {isScanning && (
                <motion.div 
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-brand-orange/40 blur-sm z-10 pointer-events-none"
                />
              )}
            </div>

            <BrandButton 
              variant="primary" 
              className="w-full py-6 text-lg group overflow-hidden relative"
              onClick={scanText}
              disabled={isScanning || !input}
            >
              <span className="relative z-10 flex items-center gap-3">
                {isScanning ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                {isScanning ? "Scanning for Neediness..." : "Analyze for Certainty Leaks"}
              </span>
            </BrandButton>
          </div>

          <AnimatePresence>
            {hasScanned && !isScanning && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="border-t border-brand-navy/5 bg-brand-cream/30 p-10"
              >
                {leaks.length > 0 ? (
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 text-brand-orange">
                      <AlertTriangle className="w-6 h-6" />
                      <h4 className="text-xl font-black uppercase tracking-tight">
                        {leaks.length} Authority {leaks.length === 1 ? 'Leak' : 'Leaks'} Detected
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {leaks.map((leak, i) => (
                        <EliteCard key={i} className="bg-white border-brand-orange/10 p-6">
                          <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-2">{leak.type}</p>
                          <p className="text-sm font-bold text-brand-navy leading-relaxed mb-4">{leak.why}</p>
                          <div className="pt-4 border-t border-brand-navy/5">
                            <p className="text-[8px] font-black uppercase tracking-widest text-brand-navy/40 mb-2">Authority Rewrite</p>
                            <p className="text-sm font-black text-green-600">"{leak.fix}"</p>
                          </div>
                        </EliteCard>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-brand-navy/5 flex flex-col md:flex-row items-center justify-between gap-8">
                      <p className="text-sm font-bold text-brand-navy max-w-sm">
                        One "Authority Script" session in Week 3 of the OS fixes these leaks permanently.
                      </p>
                      <BrandButton variant="accent" className="group px-10">
                        Fix My ROF: Apply Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </BrandButton>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-6">
                    <div className="inline-flex p-4 bg-green-500/10 rounded-full">
                      <ShieldCheck className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-brand-navy">High Certainty Detected</h4>
                      <p className="text-brand-gray font-medium mt-2">Your language is authoritative. You are ready for the Advanced Business OS.</p>
                    </div>
                    <BrandButton variant="primary" className="px-12">Submit Full Application</BrandButton>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </EliteCard>
      </div>
    </div>
  );
}
