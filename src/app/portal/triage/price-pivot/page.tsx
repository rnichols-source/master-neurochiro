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
        
        <div className="flex justify-between items-center print:hidden">
          <Link href="/portal/triage?category=rof" className="flex items-center gap-2 text-brand-navy/60 hover:text-brand-navy font-black text-xs uppercase tracking-widest transition-colors">
            <ArrowLeft size={14} /> Back to ROF System
          </Link>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-brand-navy text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-orange transition-all shadow-xl"
          >
            <Printer size={14} /> Download / Print Asset
          </button>
        </div>

        <EliteCard className="bg-white p-12 md:p-24 shadow-2xl border-brand-navy/5 relative overflow-hidden print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
            <DollarSign size={600} className="text-brand-navy" />
          </div>

          <div className="relative space-y-16">
            
            <div className="flex justify-between items-start border-b-8 border-brand-navy pb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange text-white rounded-md mb-4">
                  <DollarSign size={12} fill="white" />
                  <span className="text-xs font-black uppercase tracking-wider">ROF System: Weapon 03</span>
                </div>
                <h1 className="text-5xl font-black text-brand-navy tracking-tighter uppercase leading-none">The Price Pivot</h1>
                <p className="text-brand-gray font-bold text-sm mt-2">NO-FLINCH PRICING: How to drop the $5k number with zero hesitation.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-brand-navy">LEVEL 03</div>
                <div className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest">Mastermind Elite</div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-brand-orange">01. The Matrix</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "The Mistake", desc: "Waiting until the very end to say the price, making it feel like a sales pitch.", icon: AlertCircle },
                  { title: "The Logic", desc: "Price is only high if the problem you are fixing is small.", icon: Scale },
                  { title: "The Fix", desc: "Anchor the price to 'getting their life back' instead of 'number of visits'.", icon: Brain }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-brand-navy/5 rounded-3xl border border-brand-navy/5">
                    <item.icon size={20} className="text-brand-orange mb-4" />
                    <h5 className="text-xs font-black text-brand-navy uppercase mb-2">{item.title}</h5>
                    <p className="text-xs text-brand-gray font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h4 className="text-xs font-black uppercase tracking-widest text-brand-orange">02. The Simple Script</h4>
              
              <div className="space-y-12">
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">1</div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The "No-Flinch" Number</h3>
                    <p className="text-xs text-brand-gray font-bold uppercase tracking-widest leading-none">Say this clearly. Do not pause or look away.</p>
                    <div className="p-8 bg-brand-cream border-l-8 border-brand-orange italic font-bold text-xl text-brand-navy leading-relaxed shadow-sm">
                      "To fix the damage we saw on your scans and get your body working properly again, the total investment for your care is $5,400. That includes everything we need to do to get you back to 100%."
                    </div>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">2</div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The "Cost of Inaction" Pivot</h3>
                    <div className="p-8 bg-brand-navy text-white border-l-8 border-brand-orange italic font-bold text-xl leading-relaxed rounded-r-3xl shadow-xl">
                      "Now, I know that sounds like a lot of money today. But I’m looking at what happens if we don’t fix this. If we let this slide, you’re looking at a $100,000 problem down the road. Does it make sense to invest the $5k now to save the $100k later?"
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t-2 border-brand-navy/10 pt-16">
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-orange">03. The Laws</h4>
                <ul className="space-y-4">
                  {[
                    "Stop saying 'cost' or 'fee'. Use the word 'Investment'.",
                    "Say the number and then stop talking. The first one to speak loses.",
                    "If they focus on price, you focus on the pain of their condition.",
                    "Always compare the price to the cost of staying sick."
                  ].map((law, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-brand-orange shrink-0 mt-0.5" />
                      <p className="text-xs font-bold text-brand-navy uppercase leading-relaxed">{law}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-orange">04. The Reality</h4>
                <div className="p-6 bg-brand-orange/5 rounded-3xl border border-brand-orange/20">
                  <p className="text-sm font-bold text-brand-navy leading-snug">
                    "If you are afraid of your own price, you are telling the patient you don't believe you can fix them."
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t-4 border-brand-navy flex justify-between items-end">
              <div className="space-y-2">
                <p className="text-xs font-black text-brand-navy uppercase tracking-widest">Property of Dr. Raymond Nichols</p>
                <p className="text-xs font-bold text-brand-gray uppercase tracking-widest">© 2026 Internal Mastermind Use Only.</p>
              </div>
              <ShieldCheck size={40} className="text-brand-navy opacity-20" />
            </div>

          </div>
        </EliteCard>
      </div>
    </div>
  );
}
