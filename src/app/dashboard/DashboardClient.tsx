"use client";

import { useState, useEffect } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { fetchKPIEntries } from "@/app/actions/kpi-actions";
import { fetchCurriculumWithProgress } from "@/app/actions/curriculum-actions";
import { 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  DollarSign,
  Video,
  Loader2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardClient({ user, profile }: { user: any, profile: any }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [stats, setStats] = useState([
    { label: "Patient Visits", value: "0", trend: "0%", icon: Users, metric: "patient_visits" },
    { label: "Collections", value: "$0", trend: "0%", icon: DollarSign, metric: "collections" },
    { label: "New Patients", value: "0", trend: "+0", icon: TrendingUp, metric: "new_patients" },
  ]);
  const [currentWeek, setCurrentWeek] = useState<any>(null);

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
            label: "New Patients", 
            value: latest.new_patients.toString(), 
            trend: (latest.new_patients - (previous?.new_patients || 0)).toString(), 
            icon: TrendingUp,
            metric: "new_patients"
          },
        ]);
      }

      // Load Curriculum Progress
      const curriculumResult = await fetchCurriculumWithProgress();
      if (curriculumResult.success && curriculumResult.data) {
        // Find the active week
        const active = curriculumResult.data.find((w: any) => w.status === 'active') || curriculumResult.data[curriculumResult.data.length - 1];
        setCurrentWeek(active);
      }
      
      setLoading(false);
    }
    loadData();
  }, [profile, router]);

  if (!profile || profile.status === 'pending_profile') return null;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-2">
            Practice Intelligence
          </p>
          <h1 className="text-4xl font-black text-brand-navy tracking-tight">
            Growth Command Hub
          </h1>
          <p className="text-brand-gray font-medium mt-1">
            Welcome back, <span className="text-brand-navy font-bold">{profile.full_name || 'Doctor'}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded-xl border border-brand-navy/5 elite-shadow flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-navy/60">
                System Active
            </span>
            </div>
            <Link href="/neurochiro-live">
                <BrandButton variant="accent" size="sm" className="rounded-full">
                    Join Live Room <Video className="ml-2 h-4 w-4" />
                </BrandButton>
            </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map((i) => (
            <EliteCard key={i} className="h-32 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-brand-orange opacity-20" />
            </EliteCard>
          ))
        ) : (
          stats.map((stat, i) => (
            <EliteCard 
              key={stat.label} 
              delay={i * 0.1}
              className="bg-brand-navy text-white border-none"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
                    {stat.label}
                  </p>
                  <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <stat.icon className="w-4 h-4 text-brand-orange" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full",
                  stat.trend.startsWith('+') ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                )}>
                  {stat.trend}
                </span>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">
                  vs Last Week
                </span>
              </div>
            </EliteCard>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Learning */}
        <EliteCard 
          title="Current Focus" 
          subtitle={currentWeek ? `Week ${currentWeek.week_number}` : 'Loading...'}
          className="lg:col-span-2"
        >
          {loading ? (
            <div className="h-48 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
            </div>
          ) : currentWeek ? (
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative w-full md:w-64 aspect-video bg-brand-navy rounded-xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/40 group-hover:bg-brand-navy/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center shadow-xl shadow-brand-orange/40 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white fill-white ml-1" />
                    </div>
                </div>
                </div>
                
                <div className="flex-1 space-y-4 text-center md:text-left w-full">
                <div>
                    <h4 className="text-xl font-black text-brand-navy">{currentWeek.title}</h4>
                    <p className="text-sm text-brand-gray mt-1">
                    Theme: <span className="italic">"{currentWeek.theme}"</span>
                    </p>
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-brand-navy/40">
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
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brand-orange hover:gap-3 transition-all"
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

        {/* Quick Actions / Announcements */}
        <div className="space-y-6">
          <EliteCard title="Next Implementation" subtitle="Week 6 Tasks" icon={CheckCircle2}>
            <div className="space-y-3">
              {[
                { label: "Watch Day 1 Mastery", done: false },
                { label: "Complete Care Plan Worksheet", done: false },
                { label: "Update Weekly KPIs", done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center transition-colors",
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

          <Link href="/portal/curriculum" className="block">
            <EliteCard className="bg-brand-navy text-white hover:bg-brand-black transition-colors cursor-pointer" delay={0.2}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Users className="text-brand-orange w-5 h-5" />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Cohort Access</p>
                            <h4 className="text-sm font-black uppercase tracking-tight">Full Curriculum</h4>
                        </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-orange" />
                </div>
            </EliteCard>
          </Link>
        </div>
      </div>
    </div>
  );
}
