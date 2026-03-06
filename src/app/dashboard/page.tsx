import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { fetchKPIEntries } from "@/app/actions/kpi-actions";
import { 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  DollarSign,
  Video,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { label: "Patient Visits", value: "0", trend: "0%", icon: Users, metric: "patient_visits" },
    { label: "Collections", value: "$0", trend: "0%", icon: DollarSign, metric: "collections" },
    { label: "New Patients", value: "0", trend: "+0", icon: TrendingUp, metric: "new_patients" },
  ]);

  useEffect(() => {
    async function loadStats() {
      const result = await fetchKPIEntries();
      if (result.success && result.data.length > 0) {
        const latest = result.data[result.data.length - 1];
        const previous = result.data.length > 1 ? result.data[result.data.length - 2] : null;

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
      setLoading(false);
    }
    loadStats();
  }, []);

  const currentWeek = {
    number: 3,
    title: "Communication Mastery",
    progress: 65,
    nextModule: "The Authority ROF",
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-2">
              Welcome back, Dr. Nichols
            </p>
            <h1 className="text-4xl font-black text-brand-navy tracking-tight">
              Your Practice Growth Hub
            </h1>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-brand-navy/5 elite-shadow flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-navy/60">
              System Active & Optimized
            </span>
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
            subtitle={`Week ${currentWeek.number}`}
            className="lg:col-span-2"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative w-full md:w-64 aspect-video bg-brand-navy rounded-xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/40 group-hover:bg-brand-navy/20 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center shadow-xl shadow-brand-orange/40 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <h4 className="text-xl font-black text-brand-navy">{currentWeek.title}</h4>
                  <p className="text-sm text-brand-gray mt-1">
                    Up next: <span className="font-bold text-brand-navy">{currentWeek.nextModule}</span>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-brand-navy/40">
                    <span>Course Progress</span>
                    <span>{currentWeek.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-brand-navy/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-orange rounded-full transition-all duration-1000" 
                      style={{ width: `${currentWeek.progress}%` }} 
                    />
                  </div>
                </div>

                <Link 
                  href={`/curriculum/week-${currentWeek.number}`}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brand-orange hover:gap-3 transition-all"
                >
                  Continue Learning <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </EliteCard>

          {/* Quick Actions / Announcements */}
          <div className="space-y-6">
            <EliteCard title="Upcoming Call" subtitle="Live Coaching" icon={Video}>
              <div className="space-y-4">
                <div className="p-4 bg-brand-cream rounded-xl border border-brand-navy/5">
                  <p className="text-xs font-bold text-brand-navy">Weekly Mastermind Q&A</p>
                  <p className="text-[10px] text-brand-orange font-black uppercase mt-1">Tomorrow @ 11:00 AM EST</p>
                </div>
                <button className="w-full py-3 bg-brand-navy text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-brand-black transition-colors">
                  Add to Calendar
                </button>
              </div>
            </EliteCard>

            <EliteCard title="Checklist" subtitle="Week 3 Tasks" icon={CheckCircle2}>
              <div className="space-y-3">
                {[
                  { label: "Watch ROF Deep Dive", done: true },
                  { label: "Submit Script Practice", done: false },
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
