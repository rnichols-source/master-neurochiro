"use client";

import { EliteCard } from "@/components/ui/elite-ui";
import { 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  DollarSign, 
  Zap,
  TrendingUp,
  Scale,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Brain
} from "lucide-react";
import Link from "next/link";

export default function PricePivotPage() {
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
            <DollarSign size={600} className="text-brand-navy" />
          </div>

          <div className="relative space-y-16">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b-8 border-brand-navy pb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange text-white rounded-md mb-4">
                  <DollarSign size={12} fill="white" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">ROF System: Weapon 03</span>
                </div>
                <h1 className="text-5xl font-black text-brand-navy tracking-tighter uppercase leading-none">The Price Pivot</h1>
                <p className="text-brand-gray font-bold text-sm mt-2">FINANCIAL CERTAINTY: Dropping the $5k+ Care Plan Without Flinching</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-brand-navy">LEVEL 03</div>
                <div className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-widest">Mastermind Elite</div>
              </div>
            </div>

            {/* Matrix */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">01. The Value Matrix</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "The Mistake", desc: "The doctor waits for the 'end' to say the price, creating high-pressure tension.", icon: AlertCircle },
                  { title: "The Logic", desc: "Price is only high in the absence of a massive neurological problem.", icon: Scale },
                  { title: "The Solution", desc: "Anchor the price to the 'Restoration of Life' rather than 'visits per week'.", icon: Brain }
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
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">02. The Price Presentation Script</h4>
              
              <div className="space-y-12">
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">1</div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The "No-Flinch" Drop</h3>
                    <p className="text-xs text-brand-gray font-bold uppercase tracking-widest leading-none">Deliver this with zero pauses or 'softeners'.</p>
                    <div className="p-8 bg-brand-cream border-l-8 border-brand-orange italic font-bold text-xl text-brand-navy leading-relaxed shadow-sm">
                      "To reconstruct your nervous system and stop this interference pattern, the total investment for your care plan is $5,400. That covers the corrective phase, the stabilization phase, and all of your progress scans."
                    </div>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">2</div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The Life-Value Pivot</h3>
                    <p className="text-xs text-brand-gray font-bold uppercase tracking-widest leading-none">Immediate follow-up before they can speak.</p>
                    <div className="p-8 bg-brand-navy text-white border-l-8 border-brand-orange italic font-bold text-xl leading-relaxed rounded-r-3xl shadow-xl">
                      "Now, I know that sounds like a lot if you're comparing it to a monthly bill. But I'm looking at what happens if we *don't* do this. If we let that brain-body connection stay at 40%, you're looking at a $100,000 problem in five years. Does it make sense to invest the $5k now to save the $100k later?"
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Immutable Laws */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t-2 border-brand-navy/10 pt-16">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">03. Immutable Laws of the Pivot</h4>
                <ul className="space-y-4">
                  {[
                    "Stop using 'sales' words like 'cost', 'fee', or 'bill'. Use 'Investment'.",
                    "Do not look down when saying the number. Eyes on eyes.",
                    "If they pause, you pause. The next person to speak loses.",
                    "Always compare the price to the cost of NOT fixing the problem."
                  ].map((law, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-brand-orange shrink-0 mt-0.5" />
                      <p className="text-xs font-bold text-brand-navy uppercase leading-relaxed">{law}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">04. The Wealth Multiplier</h4>
                <div className="p-6 bg-brand-orange/5 rounded-3xl border border-brand-orange/20">
                  <p className="text-sm font-bold text-brand-navy leading-snug">
                    "A doctor who is afraid of their own price is a doctor who doesn't believe in their own clinical results."
                  </p>
                  <p className="text-[10px] font-black text-brand-orange uppercase mt-4">Clinical Authority</p>
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
