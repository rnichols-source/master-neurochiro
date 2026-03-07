import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { createClient } from "@/lib/supabase/server";
import { PhaseRoadmap } from "@/components/portal/PhaseRoadmap";
import { LiveSessionTimer } from "@/components/portal/LiveSessionTimer";
import { WinsConstellation } from "@/components/portal/wins-constellation";
import { 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Brain, 
  Zap, 
  Target, 
  Clock,
  Video,
  FileText
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function PortalDashboard() {
  const supabase = await createClient();
  
  // In production, we'd fetch the user's specific progress
  const activeWeek = {
    number: 1,
    title: "Identity of a Nervous System Doctor",
    description: "Who you are determines how you practice. Week 1 is about clinical reconstruction.",
    progress: 35,
    nextModule: "1.2 - Eliminating Neediness"
  };

  const roadmapPhases: any[] = [
    { number: 1, title: "Identity", status: 'active' },
    { number: 2, title: "Neurology", status: 'locked' },
    { number: 3, title: "Comms", status: 'locked' },
    { number: 4, title: "Philosophy", status: 'locked' },
    { number: 5, title: "Business", status: 'locked' },
    { number: 6, title: "Care Plans", status: 'locked' },
    { number: 7, title: "Emotional IQ", status: 'locked' },
    { number: 8, title: "Strategy", status: 'locked' },
  ];

  // For Demo: Set next session to tomorrow at 12 PM
  const nextSession = new Date();
  nextSession.setDate(nextSession.getDate() + 1);
  nextSession.setHours(12, 0, 0, 0);

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Live Session Alert / Timer */}
        <LiveSessionTimer 
          nextSessionTime={nextSession} 
          zoomUrl="https://zoom.us/j/your-link" 
        />

        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-2">Active Installation</p>
            <h1 className="text-4xl font-black text-brand-navy tracking-tighter leading-none">Command Center</h1>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white rounded-2xl border border-brand-navy/5 shadow-sm text-center">
              <p className="text-[8px] font-black uppercase text-brand-navy/40 mb-1">Implementation Score</p>
              <p className="text-sm font-black text-brand-orange">Top 15%</p>
            </div>
          </div>
        </div>

        {/* 8-Week Visual Roadmap */}
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/40 ml-2">The 8-Week Roadmap</h3>
            <Link href="/portal/curriculum" className="text-[10px] font-black uppercase tracking-widest text-brand-orange hover:text-brand-navy transition-colors">View All Phases</Link>
          </div>
          <EliteCard className="p-4 bg-white/50 border-brand-navy/5">
            <PhaseRoadmap phases={roadmapPhases} currentWeek={activeWeek.number} />
          </EliteCard>
        </div>

        {/* Ambient Community Momentum */}
        <WinsConstellation />

        {/* Hero Active Module */}
        <EliteCard className="p-0 overflow-hidden border-brand-navy/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 bg-brand-navy p-12 text-white flex flex-col justify-between min-h-[300px]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Current Phase</p>
                <h2 className="text-5xl font-black mb-4">Week {activeWeek.number}</h2>
                <p className="text-sm font-medium text-white/60 leading-relaxed">{activeWeek.title}</p>
              </div>
              <div className="space-y-4 pt-8">
                <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                  <span className="text-white/40">Progress</span>
                  <span className="text-brand-orange">{activeWeek.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-orange transition-all duration-1000" style={{ width: `${activeWeek.progress}%` }} />
                </div>
              </div>
            </div>

            <div className="flex-1 p-12 bg-white flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-brand-navy">Next Implementation Task</h3>
                  <p className="text-sm font-bold text-brand-orange mt-1">{activeWeek.nextModule}</p>
                </div>
                <p className="text-brand-gray text-sm leading-relaxed max-w-xl">
                  {activeWeek.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {[
                    { label: "Identity Calibration Video", icon: Video, time: "14 min" },
                    { label: "Implementation Worksheet", icon: FileText, time: "Download" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-brand-cream/50 rounded-2xl border border-brand-navy/5">
                      <div className="p-2 bg-white rounded-lg"><item.icon className="w-4 h-4 text-brand-navy" /></div>
                      <div>
                        <p className="text-[10px] font-black text-brand-navy uppercase">{item.label}</p>
                        <p className="text-[8px] font-bold text-brand-navy/40 uppercase tracking-widest">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-10 flex justify-end">
                <Link href={`/portal/curriculum/week-${activeWeek.number}`}>
                  <BrandButton variant="primary" className="group">
                    Resume Phase {activeWeek.number} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </BrandButton>
                </Link>
              </div>
            </div>
          </div>
        </EliteCard>
      </div>
    </DashboardLayout>
  );
}
