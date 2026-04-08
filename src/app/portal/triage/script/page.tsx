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
    title: "The Results Guy (RED)",
    description: "They want the win and hate wasting time. Be direct.",
    step1: "I understand. Most people hesitate when they think this is just an 'extra cost' instead of an investment in staying on top of their game.",
    step2: "If we stop now, the damage we saw on your scans isn't going away. Your body will keep breaking down and you'll lose your edge. The slide has already started.",
    step3: "My job isn't to save you a few bucks today. My job is to make sure your body actually works. Do you want to keep losing ground, or do you want to fix the system now?",
    proTip: "Don't over-explain. Challenge them to take the lead on their health.",
    color: "bg-red-500"
  },
  yellow: {
    title: "The Energy Guy (YELLOW)",
    description: "They care about their life and energy. Keep it upbeat.",
    step1: "I totally get it. It’s a big call, especially when you’re looking at it as a bill instead of a way to get your life back.",
    step2: "But here’s the thing: if we don't fix this connection, that 'drained' feeling you're having is only going to get worse. You won't be able to show up for your family or your work the way you want to.",
    step3: "I'm here to get you back to 100%. We can either wait for things to get harder, or we can start the recovery today and get you your energy back. What feels right?",
    proTip: "Focus on the 'feeling' of being healthy and the things they'll be able to do again.",
    color: "bg-yellow-500"
  },
  green: {
    title: "The Steady Guy (GREEN)",
    description: "They want safety and family security. Be soft and steady.",
    step1: "I hear you, and I want you to feel safe with this. People usually feel unsure when they see this as a 'bill' instead of a way to protect their long-term health.",
    step2: "My concern is that if we wait, the stress on your body is just going to keep building. It’s going to affect your daily routine and eventually, your ability to take care of the people who count on you.",
    step3: "My goal is to keep you healthy and steady for the long haul. We can wait until this becomes a crisis, or we can take this small step now to secure your health. Shall we get started?",
    proTip: "Emphasize safety, family, and being there for others.",
    color: "bg-green-500"
  },
  blue: {
    title: "The Logic Guy (BLUE)",
    description: "They want the facts and the plan. Stick to the data.",
    step1: "I understand the caution. It’s logical to look at the numbers. Most people do that when they see this as an expense rather than a fix for the problem.",
    step2: "Looking at your scans, the data shows your body is losing its signal. If we don't follow the plan, that trend continues downward. The logic is simple: if the signal is blocked, the body fails.",
    step3: "My responsibility is to follow the evidence and restore that signal. We can wait for more symptoms to show up, or we can implement the fix now. Does the plan make sense to you?",
    proTip: "Use words like 'logic', 'data', and 'plan'. Refer back to their scan findings.",
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

        <EliteCard className="bg-white p-12 md:p-24 shadow-2xl border-brand-navy/5 relative overflow-hidden print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
            <ShieldCheck size={600} className="text-brand-navy" />
          </div>

          <div className="relative space-y-16">
            
            <div className="flex justify-between items-start border-b-8 border-brand-navy pb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange text-white rounded-md mb-4">
                  <Zap size={12} fill="white" />
                  <span className="text-xs font-black uppercase tracking-wider">Rapid ROI Series</span>
                </div>
                <h1 className="text-5xl font-black text-brand-navy tracking-tighter uppercase leading-none">Emergency Rescue</h1>
                <p className="text-brand-gray font-bold text-sm mt-2">TARGET: <span className="text-brand-navy">{activeType.toUpperCase()}</span></p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-brand-navy">PHASE 00</div>
                <div className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest">Confidential Script</div>
              </div>
            </div>

            <div className="relative pl-16">
              <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">1</div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The Soft Landing</h3>
                <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">Goal: Stop the money talk immediately.</p>
                <div className="p-8 bg-brand-cream border-l-8 border-brand-orange italic font-bold text-xl text-brand-navy leading-relaxed shadow-sm">
                  "{script.step1}"
                </div>
              </div>
            </div>

            <div className="relative pl-16">
              <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">2</div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The Reality Check</h3>
                <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">Goal: Show them the cost of doing nothing.</p>
                <div className="p-8 bg-brand-cream border-l-8 border-brand-orange italic font-bold text-xl text-brand-navy leading-relaxed shadow-sm">
                  "{script.step2}"
                </div>
              </div>
            </div>

            <div className="relative pl-16">
              <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-lg">3</div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">The Decision</h3>
                <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">Goal: Fix the problem or stay stuck.</p>
                <div className="p-8 bg-brand-navy text-white border-l-8 border-brand-orange italic font-bold text-xl leading-relaxed shadow-xl rounded-r-3xl">
                  "{script.step3}"
                </div>
              </div>
            </div>

            <div className="border-t-2 border-brand-navy/10 pt-16">
              <div className="flex items-center gap-3 mb-8">
                <Info size={16} className="text-brand-orange" />
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-orange">Pro Tip</h4>
              </div>
              <div className="p-8 bg-brand-navy/5 rounded-3xl border border-brand-navy/5">
                <p className="text-xs font-bold text-brand-navy uppercase leading-relaxed">
                  {script.proTip}
                </p>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t-4 border-brand-navy flex justify-between items-end">
              <div className="space-y-2">
                <p className="text-xs font-black text-brand-navy uppercase tracking-widest">Dr. Raymond Nichols | NeuroChiro Mastermind</p>
                <p className="text-xs font-bold text-brand-gray uppercase tracking-widest">© 2026 Internal Use Only. One saved case pays for your month.</p>
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
