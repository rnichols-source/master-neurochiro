"use client";

import { EliteCard } from "@/components/ui/elite-ui";
import { 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Target, 
  Zap,
  Lock,
  Brain,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  FileCheck
} from "lucide-react";
import Link from "next/link";

export default function AuthorityResetPage() {
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
            <Target size={600} className="text-brand-navy" />
          </div>

          <div className="relative space-y-16">
            
            <div className="flex justify-between items-start border-b-8 border-brand-navy pb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-navy text-white rounded-md mb-4">
                  <Lock size={12} fill="white" />
                  <span className="text-xs font-black uppercase tracking-wider">ROF System: Weapon 01</span>
                </div>
                <h1 className="text-5xl font-black text-brand-navy tracking-tighter uppercase leading-none">The Authority Reset</h1>
                <p className="text-brand-gray font-bold text-sm mt-2">PRE-ROF: How to make them listen before you show them anything.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-brand-navy">LEVEL 03</div>
                <div className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest">Mastermind Elite</div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-brand-orange">01. The Problem</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "The Lie", desc: "The patient thinks they are 'hiring' you and can tell you what to do.", icon: AlertCircle },
                  { title: "The Truth", desc: "They are broken, and you are the only one who can fix the root cause.", icon: Zap },
                  { title: "The Win", desc: "They need to know that YOU decide if they get to work with you.", icon: Brain }
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
                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The "Not for Everyone" Filter</h3>
                    <p className="text-xs text-brand-gray font-bold uppercase tracking-widest leading-none">Say this before you show them a single scan.</p>
                    <div className="p-8 bg-brand-cream border-l-8 border-brand-orange italic font-bold text-xl text-brand-navy leading-relaxed">
                      "Before we start, I need to be clear: I don’t take on every case. I only work with people who actually want to fix the problem for good. If you're just looking for a temporary patch or a cheap fix, I’m probably not the right guy for you."
                    </div>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">2</div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The "No Sales" Anchor</h3>
                    <div className="p-8 bg-brand-navy text-white border-l-8 border-brand-orange italic font-bold text-xl leading-relaxed rounded-r-3xl shadow-xl">
                      "I’m not here to sell you on anything today. I'm here to show you exactly why your body is breaking down and what it takes to stop it. If we can’t agree on why this is happening, we won't even talk about the cost."
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
                    "Stop acting like you need their money. You don't.",
                    "The person who talks the most is the one losing the deal.",
                    "Don't apologize for your price. It costs what it costs because it works.",
                    "Be ready to tell them to go somewhere else. That's real power."
                  ].map((law, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-brand-orange shrink-0 mt-0.5" />
                      <p className="text-xs font-bold text-brand-navy uppercase leading-relaxed">{law}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-orange">04. The ROI</h4>
                <div className="p-6 bg-brand-orange/5 rounded-3xl border border-brand-orange/20">
                  <p className="text-sm font-bold text-brand-navy leading-snug">
                    When you set the rules early, they stop arguing about price later. This one move saves 2-3 lost cases every single month.
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
