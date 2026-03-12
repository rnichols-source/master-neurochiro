"use client";

import { EliteCard } from "@/components/ui/elite-ui";
import { 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Target, 
  Zap,
  AlertTriangle,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

export default function RescueScriptPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation / Header - Hidden on Print */}
        <div className="flex justify-between items-center print:hidden">
          <Link href="/portal/rapid-roi" className="flex items-center gap-2 text-brand-navy/60 hover:text-brand-navy font-black text-[10px] uppercase tracking-widest transition-colors">
            <ArrowLeft size={14} /> Back to ROI Center
          </Link>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-brand-navy text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all shadow-xl"
          >
            <Printer size={14} /> Print Script
          </button>
        </div>

        {/* The Script Document */}
        <EliteCard className="bg-white p-12 md:p-20 shadow-2xl border-brand-navy/5 relative overflow-hidden print:shadow-none print:border-none print:p-0">
          
          {/* Branded Watermark */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <ShieldCheck size={400} className="text-brand-navy" />
          </div>

          <div className="relative space-y-12">
            
            {/* Document Header */}
            <div className="flex justify-between items-start border-b-4 border-brand-navy pb-8">
              <div>
                <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-2">Internal Mastermind Resource</p>
                <h1 className="text-4xl font-black text-brand-navy tracking-tighter uppercase">Emergency Case Rescue</h1>
                <p className="text-brand-gray font-bold text-xs mt-1">PROTOCOL: High-Authority Neurological Pivot</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-brand-navy">PHASE 00</div>
                <div className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-widest">Rapid ROI Series</div>
              </div>
            </div>

            {/* Context Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-brand-navy/5 p-8 rounded-3xl border border-brand-navy/5">
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-brand-navy font-black text-[10px] uppercase tracking-widest">
                  <Target size={14} className="text-brand-orange" /> The Objective
                </h4>
                <p className="text-xs text-brand-gray font-medium leading-relaxed">
                  To interrupt the patient's "Financial Objection" and pivot back to the "Neurological Crisis" they are currently experiencing.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-brand-navy font-black text-[10px] uppercase tracking-widest">
                  <AlertTriangle size={14} className="text-brand-orange" /> When to use
                </h4>
                <p className="text-xs text-brand-gray font-medium leading-relaxed">
                  Immediately after the patient says: "I need to think about it," "I can't afford it," or "I'll talk to my spouse."
                </p>
              </div>
            </div>

            {/* The Script Flow */}
            <div className="space-y-12">
              
              {/* Step 1 */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center font-black text-xs shrink-0">1</div>
                  <h3 className="text-lg font-black text-brand-navy uppercase tracking-tight">The Empathetic Anchor</h3>
                </div>
                <div className="ml-12 p-6 bg-brand-cream border-l-4 border-brand-orange italic font-medium text-brand-navy leading-relaxed">
                  "I understand. Most people say they need to think about it when they are looking at this as a 'line-item expense' rather than a 'Neurological Reconstruction'."
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center font-black text-xs shrink-0">2</div>
                  <h3 className="text-lg font-black text-brand-navy uppercase tracking-tight">The Pattern Interrupt (The Logic)</h3>
                </div>
                <div className="ml-12 p-6 bg-brand-cream border-l-4 border-brand-orange italic font-medium text-brand-navy leading-relaxed">
                  "If we walk away today, the numbers might stay in your bank account, but the decay we saw on your scans—that neurological interference—doesn't stop. It accelerates."
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center font-black text-xs shrink-0">3</div>
                  <h3 className="text-lg font-black text-brand-navy uppercase tracking-tight">The High-Authority Pivot</h3>
                </div>
                <div className="ml-12 p-6 bg-brand-cream border-l-4 border-brand-orange italic font-medium text-brand-navy leading-relaxed">
                  "My job isn't to help you save money today. My job is to ensure your brain can communicate with your body properly so you don't lose your quality of life in five years. Knowing that, do you want to wait for the next crisis, or do you want to start the reconstruction now?"
                </div>
              </div>

            </div>

            {/* Pro Tips */}
            <div className="border-t-2 border-brand-navy/10 pt-12">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/40 mb-6">Expert Execution Notes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                    <Zap size={12} />
                  </div>
                  <p className="text-[10px] font-bold text-brand-gray leading-relaxed uppercase">
                    Maintain eye contact. Do not blink during Step 3. Your conviction is more important than the words.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                    <MessageSquare size={12} />
                  </div>
                  <p className="text-[10px] font-bold text-brand-gray leading-relaxed uppercase">
                    If they still hesitate, ask: "Is it the money, or are you not convinced that your nervous system is the priority?"
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-8 border-t border-brand-navy/5 flex justify-between items-center text-[8px] font-black uppercase tracking-[0.3em] text-brand-navy/20">
              <p>© 2026 NeuroChiro Mastermind - Confidential</p>
              <p>Property of Dr. Raymond Nichols</p>
            </div>

          </div>
        </EliteCard>

        {/* Print Instructions - Hidden on Print */}
        <div className="text-center space-y-4 print:hidden">
          <p className="text-brand-gray text-xs font-medium italic">
            "One saved case pays for your entire month. Go execute."
          </p>
        </div>

      </div>
    </div>
  );
}
