"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  Video,
  X,
  Target,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { verifyPhase } from "@/app/actions/curriculum-actions";
import { useRouter } from "next/navigation";

interface ImplementationProofProps {
  phaseId: number;
  phaseTitle: string;
}

export function ImplementationProof({ phaseId, phaseTitle }: ImplementationProofProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'upload' | 'verifying' | 'success'>('upload');
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const simulateVerification = async () => {
    setStep('verifying');
    setError(null);
    
    // Simulate AI scanning (UI only)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Call actual server action
    const result = await verifyPhase(phaseId);
    
    if (result.success) {
      setStep('success');
      setTimeout(() => {
        setIsOpen(false);
        router.refresh();
      }, 3000);
    } else {
      setStep('upload');
      setError(result.error || "Verification failed");
    }
  };

  const reset = () => {
    setIsOpen(false);
    setStep('upload');
    setFileName(null);
  };

  return (
    <>
      <BrandButton 
        variant="accent" 
        size="sm" 
        className="w-full md:w-auto"
        onClick={() => setIsOpen(true)}
      >
        Claim Your Status
      </BrandButton>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={reset}
              className="absolute inset-0 bg-brand-navy/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={reset}
                className="absolute top-8 right-8 p-2 text-brand-navy/20 hover:text-brand-navy transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-12">
                {step === 'upload' && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange mb-2">
                        <Target size={12} />
                        <p className="text-[10px] font-black uppercase tracking-widest">+100 Mastery Points</p>
                      </div>
                      <h3 className="text-3xl font-black text-brand-navy tracking-tighter">Submit Proof: Phase 0{phaseId}</h3>
                      <p className="text-brand-gray text-sm font-medium">
                        Upload your ROF recording or clinical scripts to earn 100 Mastery Points and unlock the next phase.
                      </p>
                    </div>

                    <div 
                      onClick={() => !fileName && setFileName("rof_recording_march.mp4")}
                      className={cn(
                        "border-2 border-dashed rounded-[2rem] p-12 text-center space-y-4 transition-all cursor-pointer group",
                        fileName ? "border-green-500 bg-green-50/50" : "border-brand-navy/10 hover:border-brand-orange/40"
                      )}
                    >
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-colors",
                        fileName ? "bg-green-500 text-white" : "bg-brand-navy/5 text-brand-navy/20 group-hover:bg-brand-orange/10 group-hover:text-brand-orange"
                      )}>
                        {fileName ? <CheckCircle2 className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                      </div>
                      
                      {fileName ? (
                        <div>
                          <p className="text-sm font-black text-brand-navy">{fileName}</p>
                          <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1">Ready for Neural Analysis</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-black text-brand-navy uppercase tracking-widest">Click to Upload ROF/Scripts</p>
                          <p className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-widest mt-1">Video, Audio, or PDF</p>
                        </div>
                      )}
                    </div>

                    <BrandButton 
                      disabled={!fileName}
                      onClick={simulateVerification}
                      className="w-full py-6 group"
                    >
                      Verify Implementation <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </BrandButton>
                  </div>
                )}

                {step === 'verifying' && (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-brand-orange/10 border-t-brand-orange animate-spin" />
                      <Sparkles className="w-10 h-10 text-brand-orange absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-brand-navy">Neural Scan in Progress...</h3>
                      <p className="text-brand-gray text-sm font-medium animate-pulse">Checking for authority markers and implementation compliance.</p>
                    </div>
                  </div>
                )}

                {step === 'success' && (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-8">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative"
                    >
                      <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white shadow-2xl shadow-green-500/20">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                      <motion.div 
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: -50, opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute top-0 left-0 right-0 text-brand-orange font-black text-xl"
                      >
                        +100 PTS
                      </motion.div>
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-brand-navy">Implementation Verified!</h3>
                      <p className="text-green-600 font-bold uppercase tracking-[0.2em] text-xs">Mastery Score Updated</p>
                    </div>
                    <div className="p-6 bg-brand-navy text-white rounded-2xl w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-white/40">New Score</span>
                        <span className="text-xl font-black text-brand-orange">950 PTS</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Zap size={10} className="text-brand-orange fill-brand-orange" />
                        <p className="text-[8px] font-black uppercase tracking-widest text-white/60">Community Status: Active Member</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
