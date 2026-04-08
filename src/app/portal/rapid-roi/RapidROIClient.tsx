"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import VideoPlayer from "@/components/portal/VideoPlayer";
import { 
  Zap, 
  Play, 
  FileText, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  ShieldCheck,
  Download,
  Printer,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function RapidROIClient({ userId }: { userId: string }) {
  const [completedItems, setCompletedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setCompletedItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const checklistItems = [
    "Watch the 5-minute briefing",
    "Print the Rescue Script",
    "Use the 'Pattern Interrupt' on 1 patient today",
    "Report your win in The Council"
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full">
          <Zap size={16} className="fill-brand-orange" />
          <span className="text-xs font-black uppercase tracking-wider">High Velocity Win</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-brand-navy tracking-tighter">Rapid ROI</h1>
        <p className="text-brand-gray text-lg font-medium max-w-2xl mx-auto">
          Our goal is simple: Help you save one case or close one new patient in the next 24 hours to pay for your entire month of membership.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Video Section */}
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer 
            userId={userId} 
            moduleId="rapid-roi-briefing"
            videoUrl="https://player.vimeo.com/video/912345678" // Placeholder high-quality video
            title="The Emergency Case Rescue Briefing"
            checklist={{
              do: "Print the Rescue Script and keep it visible during your next ROF.",
              say: "When a patient hesitates, use the 'Neurological Pivot' pattern.",
              track: "Record your conversion rate in the KPI tracker."
            }}
          />

          <div className="space-y-4">
            <h3 className="text-xl font-black text-brand-navy">The "Rescue" Protocol</h3>
            <p className="text-brand-gray leading-relaxed">
              In this briefing, Dr. Nichols breaks down the exact neurological language pattern to use when a patient is about to walk away from a $5,000 care plan. Watch this, then go use it today.
            </p>
          </div>
        </div>

        {/* Action/Resources Section */}
        <div className="space-y-8">
          <EliteCard className="p-8 bg-brand-navy text-white border-none shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Printer size={80} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <FileText size={14} className="text-brand-orange" /> Required Resource
            </h3>
            <div className="space-y-6 relative z-10">
              <div>
                <h4 className="text-xl font-black">Emergency Case Rescue Script</h4>
                <p className="text-white/40 text-xs mt-2 font-medium">Download this and keep it on your desk for your next ROF.</p>
              </div>
              <Link href="/portal/rapid-roi/script" className="block">
                <button className="w-full bg-brand-orange text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all flex items-center justify-center gap-3 group shadow-xl">
                  <Download size={16} /> DOWNLOAD PDF <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </EliteCard>

          <EliteCard className="p-8 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-navy/40 mb-2">THE ROI CHECKLIST</h3>
            <div className="space-y-4">
              {checklistItems.map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => toggleItem(i)}
                  className="flex items-start gap-3 w-full text-left group"
                >
                  <div className={cn(
                    "mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all",
                    completedItems.includes(i) 
                      ? "bg-brand-orange border-brand-orange text-white" 
                      : "border-brand-navy/10 group-hover:border-brand-orange/40"
                  )}>
                    {completedItems.includes(i) && <CheckCircle2 size={12} />}
                  </div>
                  <p className={cn(
                    "text-sm font-bold transition-colors",
                    completedItems.includes(i) ? "text-brand-navy/40 line-through" : "text-brand-navy"
                  )}>
                    {item}
                  </p>
                </button>
              ))}
            </div>
          </EliteCard>
        </div>
      </div>

      {/* Success Proof */}
      <EliteCard className="bg-brand-orange/5 border-brand-orange/20 p-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-xl">
            <ShieldCheck size={32} className="text-brand-orange" />
          </div>
          <h3 className="text-2xl font-black text-brand-navy">Once you pay for your month...</h3>
          <p className="text-brand-gray font-medium">
            After you use this script to save a case, you've essentially gotten the NeuroChiro OS for free this month. Now you can focus on the long-term curriculum with zero pressure.
          </p>
          <Link href="/portal/curriculum">
            <button className="bg-brand-navy text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-orange transition-all shadow-xl">
              Proceed to Phase 01 Curriculum <ArrowRight size={14} className="inline ml-2" />
            </button>
          </Link>
        </div>
      </EliteCard>
    </div>
  );
}
