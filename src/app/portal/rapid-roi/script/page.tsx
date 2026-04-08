"use client";

import { useState } from "react";
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
  FileCheck,
  Users,
  Info
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PersonalityType = 'red' | 'yellow' | 'green' | 'blue';

interface ScriptVersion {
  title: string;
  description: string;
  step1: string;
  step2: string;
  step3: string;
  proTip: string;
  color: string;
}

const scripts: Record<PersonalityType, ScriptVersion> = {
  red: {
    title: "The Dominant (RED)",
    description: "Results-driven, fast-paced, and competitive. They want the win and hate wasting time.",
    step1: "I understand. Most people hesitate when they think this is just an 'extra cost' instead of an investment in staying on top of their game.",
    step2: "If we stop now, the interference we saw on your scans won't just stay the same. Your health will continue to slide, and you'll lose your edge. The breakdown is already happening.",
    step3: "My job isn't to help you save a few bucks today. My job is to make sure your brain is leading your body effectively. Do you want to keep losing ground, or do you want to fix the system now?",
    proTip: "Be direct. Do not over-explain. Challenge them to take the lead on their health.",
    color: "bg-red-500"
  },
  yellow: {
    title: "The Inspiring (YELLOW)",
    description: "Optimistic, social, and visionary. They care about their energy and quality of life.",
    step1: "I totally get it. It’s a big decision, especially when you’re looking at it as a bill instead of a way to get your vibrant life back.",
    step2: "But here’s the thing: if we don't fix this connection, that 'dimmed' feeling you're having—that lack of energy—is only going to get worse. You won't be able to show up the way you want to.",
    step3: "I'm here to help you shine again and make sure your nervous system is wide open. We can either wait for things to get harder, or we can start the recovery today and get you back to 100%. What feels right?",
    proTip: "Keep it high energy. Focus on the 'feeling' of health and future possibilities.",
    color: "bg-yellow-500"
  },
  green: {
    title: "The Stable (GREEN)",
    description: "Helpful, steady, and family-oriented. They hate conflict and want security.",
    step1: "I hear you, and I want you to feel completely safe with this. Often, people feel unsure when they see this as a 'bill' instead of a way to protect their future stability.",
    step2: "My concern is that if we wait, the stress on your nervous system is going to keep building. It affects your routine and eventually, your ability to take care of the people who count on you.",
    step3: "My goal is to keep you healthy and steady for the long haul. We can wait until it becomes a bigger problem, or we can take this small step now to secure your health. Shall we get started?",
    proTip: "Speak softly and slowly. Emphasize safety, family, and long-term consistency.",
    color: "bg-green-500"
  },
  blue: {
    title: "The Compliant (BLUE)",
    description: "Detail-oriented, factual, and cautious. They want proof and a clear plan.",
    step1: "I understand your caution. It’s logical to review the numbers. Most people do that when they view this as an expense rather than a corrective procedure.",
    step2: "Looking back at your scans, the data shows a clear trend of interference. If we don't follow the protocol, that trend line continues downward. The logic of the body is clear: if the signal is blocked, the function fails.",
    step3: "My responsibility is to follow the clinical evidence and restore that signal. We can wait for more data points—which usually means more symptoms—or we can implement the correction now. Does the plan make sense to you?",
    proTip: "Use the word 'logic', 'data', and 'protocol'. Refer back to their specific scan findings.",
    color: "bg-blue-500"
  }
};

export default function RescueScriptPage() {
  const [activeType, setActiveType] = useState<PersonalityType>('red');

  const handlePrint = () => {
    window.print();
  };

  const script = scripts[activeType];

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Personality Selector - Hidden on Print */}
        <div className="print:hidden space-y-6">
          <div className="flex justify-between items-center">
            <Link href="/portal/rapid-roi" className="flex items-center gap-2 text-brand-navy/60 hover:text-brand-navy font-black text-xs uppercase tracking-widest transition-colors">
              <ArrowLeft size={14} /> Back to ROI Center
            </Link>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-brand-navy text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-orange transition-all shadow-xl"
            >
              <Printer size={14} /> Print This Version
            </button>
          </div>

          <div className="bg-white/50 p-2 rounded-[2rem] border border-brand-navy/5 flex gap-2 overflow-x-auto no-scrollbar">
            {(Object.keys(scripts) as PersonalityType[]).map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "flex-1 min-w-[120px] py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border flex items-center justify-center gap-3",
                  activeType === type 
                    ? "bg-brand-navy text-white border-brand-navy shadow-lg" 
                    : "bg-white text-brand-navy/40 border-transparent hover:border-brand-navy/10"
                )}
              >
                <div className={cn("w-3 h-3 rounded-full", scripts[type].color)} />
                {type}
              </button>
            ))}
          </div>
          
          <div className="p-6 bg-brand-navy text-white rounded-3xl flex items-center gap-6">
            <div className={cn("w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center", script.color)}>
              <Users size={24} />
            </div>
            <div>
              <h4 className="font-black uppercase tracking-tight text-lg">{script.title}</h4>
              <p className="text-white/60 text-sm font-medium">{script.description}</p>
            </div>
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
                  <span className="text-xs font-black uppercase tracking-wider">Rapid ROI Series</span>
                </div>
                <h1 className="text-5xl font-black text-brand-navy tracking-tighter uppercase leading-none">Emergency Rescue</h1>
                <p className="text-brand-gray font-bold text-sm mt-2">TARGET PERSONALITY: <span className="text-brand-navy">{activeType.toUpperCase()}</span></p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-brand-navy">PHASE 00</div>
                <div className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest">Confidential Script</div>
              </div>
            </div>

            {/* Step 1 */}
            <div className="relative pl-16">
              <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">1</div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The Soft Landing</h3>
                <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">Goal: Ease the money tension immediately.</p>
                <div className="p-8 bg-brand-cream border-l-8 border-brand-orange italic font-bold text-xl text-brand-navy leading-relaxed shadow-sm">
                  "{script.step1}"
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-16">
              <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">2</div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The Reality Check</h3>
                <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">Goal: Show them what happens if they walk away.</p>
                <div className="p-8 bg-brand-cream border-l-8 border-brand-orange italic font-bold text-xl text-brand-navy leading-relaxed shadow-sm">
                  "{script.step2}"
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-16">
              <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">3</div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The Decision</h3>
                <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">Goal: Put them in the driver's seat.</p>
                <div className="p-8 bg-brand-navy text-white border-l-8 border-brand-orange italic font-bold text-xl leading-relaxed shadow-xl rounded-r-3xl">
                  "{script.step3}"
                </div>
              </div>
            </div>

            {/* Execution Notes */}
            <div className="border-t-2 border-brand-navy/10 pt-16">
              <div className="flex items-center gap-3 mb-8">
                <Info size={16} className="text-brand-orange" />
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-orange">Pro Execution Tip</h4>
              </div>
              <div className="p-8 bg-brand-navy/5 rounded-3xl border border-brand-navy/5">
                <p className="text-xs font-bold text-brand-navy uppercase leading-relaxed">
                  {script.proTip}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-10 border-t-4 border-brand-navy flex justify-between items-end">
              <div className="space-y-2">
                <p className="text-xs font-black text-brand-navy uppercase tracking-widest">Dr. Raymond Nichols | NeuroChiro Mastermind</p>
                <p className="text-xs font-bold text-brand-gray uppercase tracking-widest">© 2026 Internal Use Only. One saved case pays for your month. Go execute.</p>
              </div>
              <div className="flex items-center gap-4 opacity-40">
                <ShieldCheck size={40} className="text-brand-navy" />
                <div className="text-xs font-black text-brand-navy tracking-tighter uppercase leading-tight text-right">Emergency<br />Response Unit</div>
              </div>
            </div>

          </div>
        </EliteCard>

      </div>
    </div>
  );
}
