"use client";

import { EliteCard } from "@/components/ui/elite-ui";
import { 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Target, 
  Zap,
  Users,
  Heart,
  Scale,
  CheckCircle2,
  AlertCircle,
  FileCheck
} from "lucide-react";
import Link from "next/link";

export default function SpouseShieldPage() {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation / Header - Hidden on Print */}
        <div className="flex justify-between items-center print:hidden">
          <Link href="/portal/triage?category=rof" className="flex items-center gap-2 text-brand-navy/60 hover:text-brand-navy font-black text-[10px] uppercase tracking-widest transition-colors">
            <ArrowLeft size={14} /> Back to ROF System
          </Link>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-brand-navy text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all shadow-xl"
          >
            <Printer size={14} /> Download / Print Asset
          </button>
        </div>

        {/* The Document */}
        <EliteCard className="bg-white p-12 md:p-24 shadow-2xl border-brand-navy/5 relative overflow-hidden print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
            <Users size={600} className="text-brand-navy" />
          </div>

          <div className="relative space-y-16">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b-8 border-brand-navy pb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-navy text-white rounded-md mb-4">
                  <Heart size={12} fill="white" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">ROF System: Weapon 02</span>
                </div>
                <h1 className="text-5xl font-black text-brand-navy tracking-tighter uppercase leading-none">The Spouse Shield</h1>
                <p className="text-brand-gray font-bold text-sm mt-2">OBJECTION DESTRUCTION: Killing the "Spouse" Excuse Pre-emptively</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-brand-navy">LEVEL 03</div>
                <div className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-widest">Mastermind Elite</div>
              </div>
            </div>

            {/* Matrix */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">01. The Spouse Objection Matrix</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "The Symptom", desc: "Patient says 'I need to check with my husband/wife first.'", icon: AlertCircle },
                  { title: "The Reality", desc: "The patient is scared to make a decision and using the spouse as a human shield.", icon: Scale },
                  { title: "The Solution", desc: "Make the health decision individual, and the financial decision secondary.", icon: ShieldCheck }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-brand-navy/5 rounded-3xl border border-brand-navy/5">
                    <item.icon size={20} className="text-brand-orange mb-4" />
                    <h5 className="text-xs font-black text-brand-navy uppercase mb-2">{item.title}</h5>
                    <p className="text-xs text-brand-gray font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Protocol */}
            <div className="space-y-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">02. Pre-emptive Strike Script</h4>
              
              <div className="space-y-12">
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">1</div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The Responsibility Anchor</h3>
                    <p className="text-xs text-brand-gray font-bold uppercase tracking-widest leading-none">Use this during the Day 1 or early Day 2.</p>
                    <div className="p-8 bg-brand-cream border-l-8 border-brand-orange italic font-bold text-xl text-brand-navy leading-relaxed">
                      "When it comes to your health, does your spouse make the clinical decisions for you, or are you the one responsible for your own nervous system?"
                    </div>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">2</div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The Partnership Pivot</h3>
                    <p className="text-xs text-brand-gray font-bold uppercase tracking-widest leading-none">Use this if they bring it up at the end.</p>
                    <div className="p-8 bg-brand-navy text-white border-l-8 border-brand-orange italic font-bold text-xl leading-relaxed rounded-r-3xl shadow-xl">
                      "I love that you value your spouse's input. But let's be real: they weren't here to see the scans. They didn't feel the interference. If you go home and try to explain this, you'll sound like a salesman. My job is the clinical results. Your job is the commitment. Does your spouse want you healthy, or do they want you to keep suffering?"
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Immutable Laws */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t-2 border-brand-navy/10 pt-16">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">03. Immutable Laws of the Shield</h4>
                <ul className="space-y-4">
                  {[
                    "Never let them leave to 'explain' it to their spouse.",
                    "The person not in the room has zero clinical authority.",
                    "If they must check, check on the BUDGET, not the NEED.",
                    "The spouse always wants them healthy; use that as your lever."
                  ].map((law, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-brand-orange shrink-0 mt-0.5" />
                      <p className="text-xs font-bold text-brand-navy uppercase leading-relaxed">{law}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">04. Expert Execution</h4>
                <div className="p-6 bg-brand-orange/5 rounded-3xl border border-brand-orange/20">
                  <p className="text-sm font-bold text-brand-navy leading-snug">
                    "If you lose a case to a spouse, you didn't sell the spouse—you failed to sell the patient on their own crisis."
                  </p>
                  <p className="text-[10px] font-black text-brand-orange uppercase mt-4">Reality Check</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-10 border-t-4 border-brand-navy flex justify-between items-end">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-brand-navy uppercase tracking-widest">NeuroChiro Mastermind | Dr. Raymond Nichols</p>
                <p className="text-[8px] font-bold text-brand-gray uppercase tracking-widest">© 2026 Internal Use Only. One saved case pays for your month.</p>
              </div>
              <ShieldCheck size={40} className="text-brand-navy opacity-20" />
            </div>

          </div>
        </EliteCard>
      </div>
    </div>
  );
}
