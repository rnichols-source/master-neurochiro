"use client";

import { useState, useEffect } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { fetchKPIEntries } from "@/app/actions/kpi-actions";
import { fetchCurriculumWithProgress } from "@/app/actions/curriculum-actions";
import { fetchNextCall } from "@/app/actions/call-actions";
import LiveCallBanner from "@/components/portal/LiveCallBanner";
import { 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  DollarSign,
  Video,
  Loader2,
  AlertCircle,
  Zap,
  Sparkles,
  Trophy,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardClient({ user, profile }: { user: any, profile: any }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [stats, setStats] = useState([
    { label: "Patient Visits", value: "0", trend: "0%", icon: Users, metric: "patient_visits" },
    { label: "Collections", value: "$0", trend: "0%", icon: DollarSign, metric: "collections" },
    { label: "Implementation Score", value: "Top 15%", trend: "Advancing", icon: Trophy, metric: "implementation" },
  ]);
  const [currentWeek, setCurrentWeek] = useState<any>(null);
  const [allWeeks, setAllWeeks] = useState<any[]>([]);
  const [nextCall, setNextCall] = useState<any>(null);
  const [showWelcome, setShowWelcome] = useState(profile?.is_first_login);

  useEffect(() => {
    // Step 5: Redirect if profile is pending
    if (profile?.status === 'pending_profile' || profile?.status === 'profile_started') {
      router.push('/portal/onboarding');
      return;
    }

    async function loadData() {
      // Load Stats
      const kpiResult = await fetchKPIEntries();
      if (kpiResult.success && kpiResult.data && kpiResult.data.length > 0) {
        const latest = kpiResult.data[kpiResult.data.length - 1];
        const previous = kpiResult.data.length > 1 ? kpiResult.data[kpiResult.data.length - 2] : null;

        const calculateTrend = (metric: string) => {
          if (!previous || previous[metric] === 0) return "+0%";
          const diff = ((latest[metric] - (previous ? previous[metric] : 0)) / (previous ? previous[metric] : 1)) * 100;
          return `${diff >= 0 ? '+' : ''}${Math.round(diff)}%`;
        };

        setStats([
          { 
            label: "Patient Visits", 
            value: latest.patient_visits.toString(), 
            trend: calculateTrend('patient_visits'), 
            icon: Users,
            metric: "patient_visits"
          },
          { 
            label: "Collections", 
            value: `$${(latest.collections / 1000).toFixed(1)}k`, 
            trend: calculateTrend('collections'), 
            icon: DollarSign,
            metric: "collections"
          },
          { 
            label: "Implementation Score", 
            value: "Top 15%", 
            trend: "Advancing", 
            icon: Trophy,
            metric: "implementation"
          },
        ]);
      }

      // Load Curriculum Progress
      const curriculumResult = await fetchCurriculumWithProgress();
      if (curriculumResult.success && curriculumResult.data) {
        setAllWeeks(curriculumResult.data);
        // Find the active week
        const active = curriculumResult.data.find((w: any) => w.status === 'active') || curriculumResult.data[curriculumResult.data.length - 1];
        setCurrentWeek(active);
      }

      // Load Next Call
      const callResult = await fetchNextCall();
      if (callResult.success) {
        setNextCall(callResult.data);
      }
      
      setLoading(false);
    }
    loadData();
  }, [profile, router]);

  if (!profile || profile.status === 'pending_profile') return null;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Tutorial Trigger */}
      {/* GuidedTutorial removed — OnboardingChecklist handles first login */}

      {/* Welcome Card for first time login */}
      {showWelcome && (
        <EliteCard className="p-6 md:p-8 border-brand-orange/40 bg-gradient-to-r from-brand-orange/10 to-transparent relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Sparkles size={120} className="text-brand-orange" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white shrink-0">
                <Zap size={20} />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-brand-navy uppercase tracking-tight">Installation Complete.</h2>
            </div>
            <p className="text-brand-gray max-w-2xl font-medium text-sm md:text-base">
              Welcome back, <span className="text-brand-navy font-bold">{profile.full_name}</span>. 
              Your NeuroChiro Mastermind profile is now active. Everything you need—curriculum, implementation tools, and KPI tracking—is now integrated into this Command Center.
            </p>
            <BrandButton size="sm" onClick={() => setShowWelcome(false)} className="w-full md:w-auto">
              Enter Portal
            </BrandButton>
          </div>
        </EliteCard>
      )}

      {/* Welcome Header */}
      <div id="dashboard-header" className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-brand-orange font-bold uppercase tracking-wider text-xs md:text-xs mb-1 md:mb-2">
            Practice Intelligence
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">
            Growth Command Hub
          </h1>
          <p className="text-brand-gray font-medium mt-1 text-sm md:text-base">
            Welcome back, <span className="text-brand-navy font-bold">{profile.full_name || 'Doctor'}</span>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none bg-white px-4 py-3 md:py-2 rounded-xl border border-brand-navy/5 elite-shadow flex items-center justify-center md:justify-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs md:text-xs font-bold uppercase tracking-wider text-brand-navy/60">
                System Active
            </span>
            </div>
        </div>
      </div>

      {/* Live Call Banner */}
      {!loading && nextCall && (
        <div id="live-call-banner" className="w-full">
          <p className="text-xs font-black uppercase tracking-wider text-brand-navy/40 mb-3 ml-2">Upcoming Live Calls</p>
          <LiveCallBanner call={nextCall} />
        </div>
      )}

      {/* Stats Grid */}
      <div id="kpi-card" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {loading ? (
          [1, 2, 3].map((i) => (
            <EliteCard key={i} className="h-24 md:h-32 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-brand-orange opacity-20" />
            </EliteCard>
          ))
        ) : (
          stats.map((stat, i) => (
            <EliteCard 
              key={stat.label} 
              delay={i * 0.1}
              className={cn(
                "border-none",
                stat.metric === 'implementation' ? "bg-brand-orange text-white" : "bg-brand-navy text-white"
              )}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-white">{stat.value}</h3>
                </div>
                <div className="p-2 bg-white/10 rounded-lg shrink-0">
                  <stat.icon className={cn("w-4 h-4", stat.metric === 'implementation' ? "text-white" : "text-brand-orange")} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-full",
                  stat.metric === 'implementation' ? "bg-white/20 text-white" :
                  stat.trend.startsWith('+') ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                )}>
                  {stat.trend}
                </span>
                {stat.metric !== 'implementation' && (
                  <span className="text-xs text-white/40 font-bold uppercase tracking-wider">
                    vs Last Week
                  </span>
                )}
              </div>
            </EliteCard>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Active Learning */}
        <div id="curriculum-card" className="lg:col-span-2 space-y-6">
          <p className="text-xs font-black uppercase tracking-wider text-brand-navy/40 ml-2">Current Curriculum Focus</p>
          <EliteCard 
            title="Current Week" 
            subtitle={currentWeek ? `Week ${currentWeek.week_number} – ${currentWeek.title}` : 'Loading...'}
            className="h-full"
          >
            {loading ? (
              <div className="h-48 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
              </div>
            ) : currentWeek ? (
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                  <div className="relative w-full md:w-64 aspect-video bg-brand-navy rounded-xl overflow-hidden group cursor-pointer shrink-0">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/40 group-hover:bg-brand-navy/20 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center shadow-xl shadow-brand-orange/40 group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white fill-white ml-1" />
                      </div>
                  </div>
                  </div>
                  
                  <div className="flex-1 space-y-4 text-center md:text-left w-full">
                  <div>
                      <h4 className="text-xl md:text-2xl font-black text-brand-navy tracking-tight">{currentWeek.title}</h4>
                      <p className="text-sm text-brand-gray mt-1 font-medium">
                      Theme: <span className="italic">"{currentWeek.theme}"</span>
                      </p>
                  </div>
                  
                  <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-brand-navy/40">
                      <span>Phase Progress</span>
                      <span>{currentWeek.status === 'completed' ? '100%' : 'In Progress'}</span>
                      </div>
                      <div className="h-2 w-full bg-brand-navy/5 rounded-full overflow-hidden">
                      <div 
                          className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              currentWeek.status === 'completed' ? "bg-green-500 w-full" : "bg-brand-orange w-1/3"
                          )}
                      />
                      </div>
                  </div>

                  <Link 
                      href={`/portal/curriculum/${currentWeek.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-orange hover:gap-3 transition-all"
                  >
                      {currentWeek.status === 'completed' ? 'Review Phase' : 'Continue Learning'} <ArrowRight className="w-4 h-4" />
                  </Link>
                  </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-brand-navy/20">
                  <AlertCircle size={48} className="mb-4 opacity-10" />
                  <p className="font-black uppercase tracking-widest text-xs">No active phase found</p>
              </div>
            )}
          </EliteCard>

          {/* Progress Tracking */}
          <EliteCard title="Progress Tracking" subtitle="Mastermind Curriculum" icon={BookOpen}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {allWeeks.slice(0, 8).map((week, idx) => (
                <Link href={`/portal/curriculum/${week.slug}`} key={idx}>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-brand-navy/5 hover:border-brand-orange/20 hover:bg-brand-navy/5 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-6 h-6 rounded-md flex items-center justify-center shrink-0",
                        week.status === 'completed' ? "bg-green-500/10 text-green-500" : 
                        week.status === 'active' ? "bg-brand-orange/10 text-brand-orange" : 
                        "bg-brand-navy/5 text-brand-navy/20"
                      )}>
                        {week.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{week.week_number}</span>}
                      </div>
                      <span className="text-xs font-bold text-brand-navy truncate max-w-[150px]">
                        {week.title}
                      </span>
                    </div>
                    <span className={cn(
                      "text-xs font-black uppercase tracking-widest",
                      week.status === 'completed' ? "text-green-500" : 
                      week.status === 'active' ? "text-brand-orange" : 
                      "text-brand-navy/20"
                    )}>
                      {week.status === 'completed' ? "Completed" : week.status === 'active' ? "In Progress" : "Unlocked"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </EliteCard>
        </div>

        {/* Quick Actions / Announcements */}
        <div className="space-y-6">
          <p className="text-xs font-black uppercase tracking-wider text-brand-navy/40 ml-2">Quick Actions</p>
          
          <EliteCard title="Next Implementation Task" subtitle={currentWeek ? `Week ${currentWeek.week_number} Tasks` : "Tasks"} icon={CheckCircle2}>
            <div className="space-y-3 mt-2">
              {[
                { label: "Watch Day 1 Mastery", done: false },
                { label: "Complete Care Plan Worksheet", done: false },
                { label: "Update Weekly KPIs", done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-brand-navy/5 rounded-lg transition-colors cursor-pointer">
                  <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0",
                    item.done ? "bg-green-500 border-green-500" : "border-brand-navy/20"
                  )}>
                    {item.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className={cn(
                    "text-xs font-medium",
                    item.done ? "text-brand-navy/40 line-through" : "text-brand-navy"
                  )}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </EliteCard>

          <Link href="/portal/playbooks" className="block mt-4">
            <EliteCard className="bg-brand-navy text-white hover:bg-brand-black transition-colors cursor-pointer group" delay={0.2}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg group-hover:bg-brand-orange/20 transition-colors">
                          <Users className="text-brand-orange w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-white/40">Quick Links</p>
                            <h4 className="text-sm font-black uppercase tracking-tight">Implementation Playbooks</h4>
                        </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
                </div>
            </EliteCard>
          </Link>
          
          <Link href="/portal/case-lab" className="block mt-4">
            <EliteCard className="bg-white border-brand-navy/10 hover:border-brand-orange/40 transition-colors cursor-pointer group" delay={0.3}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-navy/5 rounded-lg group-hover:bg-brand-orange/10 transition-colors">
                          <TrendingUp className="text-brand-orange w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-brand-navy/40">Clinical Intelligence</p>
                            <h4 className="text-sm font-black uppercase tracking-tight text-brand-navy">Case Breakdown Lab</h4>
                        </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
                </div>
            </EliteCard>
          </Link>
        </div>
      </div>
    </div>
  );
}
