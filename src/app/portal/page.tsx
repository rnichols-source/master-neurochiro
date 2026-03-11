import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { createClient } from "@/lib/supabase/server";
import { PhaseRoadmap } from "@/components/portal/PhaseRoadmap";
import { LiveSessionTimer } from "@/components/portal/LiveSessionTimer";
import { WinsConstellation } from "@/components/portal/wins-constellation";
import { OnboardingChecklist } from "@/components/portal/OnboardingChecklist";
import { fetchNextCall } from "@/app/actions/call-actions";
import { fetchCurriculumWithProgress } from "@/app/actions/curriculum-actions";
import { 
  ArrowRight, 
  Video,
  FileText
} from "lucide-react";
import Link from "next/link";

type PhaseStatus = 'completed' | 'active' | 'locked';

export default async function PortalDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch profile for first login check
  let isFirstLogin = false;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_first_login')
      .eq('id', user.id)
      .single();
    isFirstLogin = !!profile?.is_first_login;
  }

  // ... (keep rest of fetch logic)
  const callResult = await fetchNextCall();
  const nextCall = callResult.data || { call_time: new Date().toISOString(), zoom_url: 'https://zoom.us' };

  const curriculumResult = await fetchCurriculumWithProgress();
  const weeks = curriculumResult.success && curriculumResult.data ? curriculumResult.data : [];
  
  const activeWeek = weeks.find((w: any) => w.status === 'active') || weeks[0] || {
    week_number: 1,
    title: "Identity of a Nervous System Doctor",
    description: "Who you are determines how you practice. Week 1 is about clinical reconstruction.",
    slug: "week-1-identity",
    progress: 0,
    status: 'active'
  };

  const roadmapPhases = weeks.map((w: any) => ({
    number: w.week_number,
    title: w.title.split(' ')[0], 
    status: w.status as PhaseStatus,
    slug: w.slug
  }));

  if (roadmapPhases.length === 0) {
    [1,2,3,4,5,6,7,8].forEach(n => {
      roadmapPhases.push({ 
        number: n, 
        title: "Phase", 
        status: (n === 1 ? 'active' : 'locked') as PhaseStatus,
        slug: `week-${n}`
      });
    });
  }

  return (
    <DashboardLayout>
      <OnboardingChecklist isFirstLogin={isFirstLogin} />
      <div className="space-y-10">
        {/* ... (rest of the page) */}
        <LiveSessionTimer 
          nextSessionTime={nextCall.call_time} 
          zoomUrl={nextCall.zoom_url} 
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
            <PhaseRoadmap phases={roadmapPhases} currentWeek={activeWeek.week_number} />
          </EliteCard>
        </div>

        {/* Ambient Community Momentum */}
        <WinsConstellation />

        {/* Hero Active Module */}
        <EliteCard className="p-0 overflow-hidden border-brand-navy/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 bg-brand-navy p-6 md:p-12 text-white flex flex-col justify-between min-h-[250px] md:min-h-[300px]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Current Phase</p>
                <h2 className="text-4xl md:text-5xl font-black mb-4">Week {activeWeek.week_number}</h2>
                <p className="text-sm font-medium text-white/60 leading-relaxed">{activeWeek.title}</p>
              </div>
              <div className="space-y-4 pt-8">
                <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                  <span className="text-white/40">Progress</span>
                  <span className="text-brand-orange">{(activeWeek as any).progress || 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-orange transition-all duration-1000" style={{ width: `${(activeWeek as any).progress || 0}%` }} />
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 md:p-12 bg-white flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-brand-navy">Next Implementation Task</h3>
                  <p className="text-sm font-bold text-brand-orange mt-1">Start Phase {activeWeek.week_number} modules</p>
                </div>
                <p className="text-brand-gray text-sm leading-relaxed max-w-xl">
                  {activeWeek.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
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

              <div className="pt-8 md:pt-10 flex justify-end">
                <Link href={`/portal/curriculum/${activeWeek.slug}`} className="w-full md:w-auto">
                  <BrandButton variant="primary" className="group w-full md:w-auto">
                    Resume Phase {activeWeek.week_number} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
