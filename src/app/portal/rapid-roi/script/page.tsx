"use client";

import { EliteCard } from "@/components/ui/elite-ui";
import { 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Target, 
  Zap,
  AlertTriangle,
  MessageSquare,
  Scale,
  Brain,
  Timer,
  CheckCircle2,
  FileCheck
} from "lucide-react";
import Link from "next/link";

export default function RescueScriptPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation / Header - Hidden on Print */}
        <div className="flex justify-between items-center print:hidden">
          <Link href="/portal/rapid-roi" className="flex items-center gap-2 text-brand-navy/60 hover:text-brand-navy font-black text-[10px] uppercase tracking-widest transition-colors">
            <ArrowLeft size={14} /> Back to ROI Center
          </Link>
          <div className="flex gap-4">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-brand-navy text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all shadow-xl"
            >
              <Printer size={14} /> Download / Print Script
            </button>
          </div>
        </div>

        {/* The Script Document */}
        <EliteCard className="bg-white p-12 md:p-24 shadow-2xl border-brand-navy/5 relative overflow-hidden print:shadow-none print:border-none print:p-0">
          
          {/* Branded Watermark */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
            <ShieldCheck size={600} className="text-brand-navy" />
          </div>

          <div className="relative space-y-16">
            
            {/* Document Header */}
            <div className="flex justify-between items-start border-b-8 border-brand-navy pb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange text-white rounded-md mb-4">
                  <Zap size={12} fill="white" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">High Velocity Protocol</span>
                </div>
                <h1 className="text-5xl font-black text-brand-navy tracking-tighter uppercase leading-none">Emergency Case Rescue</h1>
                <p className="text-brand-gray font-bold text-sm mt-2">INTERNAL CLINICAL ARCHITECTURE: The Neurological Pivot</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-brand-navy">PHASE 00</div>
                <div className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-widest">Mastermind Confidential</div>
              </div>
            </div>

            {/* Section 1: The Crisis Matrix */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">01. The Crisis Matrix</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "The Symptom", desc: "Patient focuses on money or scheduling 'friction'.", icon: AlertTriangle },
                  { title: "The Reality", desc: "Patient is experiencing a flight-or-fight response to the price.", icon: Scale },
                  { title: "The Solution", desc: "Interrupt the pattern and re-anchor to their neurological crisis.", icon: Brain }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-brand-navy/5 rounded-3xl border border-brand-navy/5">
                    <item.icon size={20} className="text-brand-orange mb-4" />
                    <h5 className="text-xs font-black text-brand-navy uppercase mb-2">{item.title}</h5>
                    <p className="text-xs text-brand-gray font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: The Script Flow */}
            <div className="space-y-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">02. Execution Protocol</h4>
              
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">1</div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The Empathetic Anchor</h3>
                    <p className="text-xs text-brand-gray font-bold uppercase tracking-widest">INTENT: Diffuse the financial tension.</p>
                    <div className="p-8 bg-brand-cream border-l-8 border-brand-orange italic font-bold text-xl text-brand-navy leading-relaxed shadow-sm">
                      "I understand. Most people say they need to 'think about it' when they are looking at this as a line-item expense rather than a <span className="text-brand-orange underline">Neurological Reconstruction</span>."
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">2</div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The pattern Interrupt</h3>
                    <p className="text-xs text-brand-gray font-bold uppercase tracking-widest">INTENT: Illustrate the cost of inaction.</p>
                    <div className="p-8 bg-brand-cream border-l-8 border-brand-orange italic font-bold text-xl text-brand-navy leading-relaxed shadow-sm">
                      "If we walk away today, the numbers might stay in your bank account, but the <span className="text-brand-orange underline">decay we saw on your scans</span>—that neurological interference—doesn't stop. It accelerates."
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">3</div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The High-Authority Pivot</h3>
                    <p className="text-xs text-brand-gray font-bold uppercase tracking-widest">INTENT: Re-establish clinical leadership.</p>
                    <div className="p-8 bg-brand-navy text-white border-l-8 border-brand-orange italic font-bold text-xl leading-relaxed shadow-xl rounded-r-3xl">
                      "My job isn't to help you save money today. My job is to ensure your brain can communicate with your body properly. Knowing that, do you want to <span className="text-brand-orange">wait for the next crisis</span>, or do you want to start the reconstruction now?"
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Immutable Laws */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t-2 border-brand-navy/10 pt-16">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">03. Immutable Laws of the Rescue</h4>
                <ul className="space-y-4">
                  {[
                    "Never defend the price. Only defend the clinical need.",
                    "Maintain absolute eye contact during the Step 3 pivot.",
                    "The first person to speak after the pivot loses authority.",
                    "If they talk about money, bring it back to brain-body communication."
                  ].map((law, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-brand-orange shrink-0 mt-0.5" />
                      <p className="text-xs font-bold text-brand-navy uppercase leading-relaxed">{law}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">04. The Recovery Timeline</h4>
                <div className="relative space-y-4">
                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-brand-orange/20" />
                  {[
                    { t: "T-Minus 0", d: "Patient hesitates / objects." },
                    { t: "T-Plus 30s", d: "Deliver the 3-step pivot." },
                    { t: "T-Plus 2m", d: "Handle logistical onboarding." },
                    { t: "T-Plus 24h", d: "Patient receives first reconstruction visit." }
                  ].map((step, i) => (
                    <div key={i} className="relative pl-8">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-white border-2 border-brand-orange" />
                      <p className="text-[10px] font-black text-brand-navy">{step.t}: <span className="text-brand-gray font-bold">{step.d}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-10 border-t-4 border-brand-navy flex justify-between items-end">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-brand-navy uppercase tracking-widest">Property of Dr. Raymond Nichols</p>
                <p className="text-[8px] font-bold text-brand-gray uppercase tracking-widest">© 2026 NeuroChiro Mastermind | Unauthorized distribution is a breach of contract.</p>
              </div>
              <div className="flex items-center gap-4 opacity-40">
                <ShieldCheck size={40} className="text-brand-navy" />
                <div className="h-10 w-px bg-brand-navy/20" />
                <div className="text-[10px] font-black text-brand-navy tracking-tighter uppercase leading-tight">Authentic<br />NeuroChiro OS</div>
              </div>
            </div>

          </div>
        </EliteCard>

        {/* Closing Quote - Hidden on Print */}
        <div className="text-center pb-12 print:hidden">
          <div className="inline-flex items-center gap-2 text-brand-orange font-black text-[10px] uppercase tracking-[0.3em]">
            <FileCheck size={14} /> Authorized Member Resource
          </div>
        </div>

      </div>
    </div>
  );
}
