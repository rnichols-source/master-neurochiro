"use client";

import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Briefcase, 
  Network, 
  Activity, 
  AlertCircle,
  Zap,
  Globe,
  ArrowRight,
  ChevronRight,
  Search,
  BarChart3,
  MousePointerClick,
  Database,
  MapPin,
  X,
  ShieldCheck,
  Settings,
  Bell,
  Loader2,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRegion } from "@/context/RegionContext";
import { REGIONS } from "@/lib/regions";
import { Automations } from "@/lib/automations";
import { getAdminDashboardStats } from "./actions";

export default function AdminDashboard() {
  const { region: currentRegion } = useRegion();
  const [viewRegion, setViewRegion] = useState<string>("ALL");
  const [activeTimeFilter, setActiveTimeFilter] = useState("1M");
  const [isAutomationModalOpen, setIsAutomationModalOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getAdminDashboardStats(viewRegion);
      if (data) setStats(data);
      setLoading(false);
    };
    fetchData();
  }, [viewRegion]);

  return (
    <div className="p-10 max-w-[1600px] mx-auto space-y-10 text-white">
      {/* Header & Global Control */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-neuro-orange">
            <Activity className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">System Live</span>
          </div>
          <h1 className="text-4xl font-heading font-black leading-tight tracking-tight">
            Platform Command Center
          </h1>
          <p className="text-gray-400 mt-2 text-lg font-medium">Real-time telemetry for the NeuroChiro ecosystem.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Dashboard Region Filter */}
          <div className="bg-white/5 border border-white/10 p-1.5 rounded-2xl flex items-center gap-1">
             <button 
               onClick={() => setViewRegion("ALL")}
               className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewRegion === "ALL" ? "bg-white text-neuro-navy shadow-lg" : "text-gray-500 hover:text-white"}`}
             >
               Global
             </button>
             {Object.values(REGIONS).map(r => (
               <button 
                 key={r.code}
                 onClick={() => setViewRegion(r.code)}
                 className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${viewRegion === r.code ? "bg-white text-neuro-navy shadow-lg" : "text-gray-500 hover:text-white"}`}
               >
                 <span>{r.flag}</span>
                 {r.code}
               </button>
             ))}
          </div>

          <button 
            onClick={() => setIsAutomationModalOpen(true)}
            className="bg-neuro-orange text-white px-8 py-4 rounded-2xl shadow-xl hover:bg-neuro-orange-light transition-all transform hover:scale-105 flex items-center gap-3"
          >
            <Zap className="w-5 h-5 fill-current" />
            <span className="font-black uppercase tracking-widest text-sm text-shadow">Automation Center</span>
          </button>
        </div>
      </header>

      {/* Global Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: stats?.users?.toLocaleString() || "14,245", trend: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: `Revenue (${viewRegion === "ALL" ? "USD" : REGIONS[viewRegion as keyof typeof REGIONS].currency.code})`, value: viewRegion === "AU" ? `A$${(stats?.revenue * 0.6).toLocaleString()}` : `$${stats?.revenue?.toLocaleString() || "428,500"}`, trend: "+18%", icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Seminar GMV", value: viewRegion === "AU" ? `A$${(stats?.gmv * 0.6).toLocaleString()}` : `$${stats?.gmv?.toLocaleString() || "124,200"}`, trend: "+24%", icon: Calendar, color: "text-orange-500", bg: "bg-orange-500/10" },
          { label: "Active Jobs", value: stats?.jobs || "156", trend: "+5%", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/10" }
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-[2rem] p-6 group hover:border-white/10 transition-all relative overflow-hidden">
            {loading && (
              <div className="absolute inset-0 bg-neuro-navy/20 backdrop-blur-[1px] flex items-center justify-center z-10">
                <Loader2 className="w-4 h-4 animate-spin text-neuro-orange" />
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-green-500 flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-lg">
                <TrendingUp className="w-3 h-3" /> {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-[10px] text-gray-500 mt-1 font-bold">LIVE TELEMETRY</p>
            </div>
          </div>
        ))}
      </div>

      {/* REST OF ADMIN UI (The complex charts and tables) - STAYS FROM ORIGINAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
         <div className="lg:col-span-2 space-y-8">
            {/* Real-time Health Monitor */}
            <section className="bg-[#131B24] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Database className="w-32 h-32 text-white" />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                        <h3 className="text-xl font-bold">Node Health & Traffic</h3>
                        <p className="text-sm text-gray-500">Regional distribution of active sessions.</p>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                           Operational
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        {Object.values(REGIONS).map((r, i) => (
                          <div key={i} className="space-y-2">
                             <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-gray-400">{r.label} Node</span>
                                <span className="text-neuro-orange">{80 + (i * 5)}% Load</span>
                             </div>
                             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-neuro-orange transition-all duration-1000" style={{ width: `${80 + (i * 5)}%` }}></div>
                             </div>
                          </div>
                        ))}
                     </div>
                     <div className="bg-white/5 rounded-3xl p-6 border border-white/5 flex flex-col justify-center text-center space-y-4">
                                 <BarChart3 className="w-8 h-8 text-blue-500 mx-auto" />
                                 <div>
                                    <p className="text-3xl font-black">1,452</p>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Concurrent Users</p>
                                 </div>
                                 <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">View Load Balancer</button>
                              </div>
                           </div>
                        </div>
                     </section>

                     {/* Billing Cycle Distribution */}
                     <section className="bg-[#131B24] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative group">
                        <div className="flex items-center justify-between mb-8">
                           <div>
                             <h3 className="text-xl font-bold flex items-center gap-3">
                               <CreditCard className="w-6 h-6 text-green-500" /> Billing Infrastructure
                             </h3>
                             <p className="text-sm text-gray-500">Distribution of subscription intervals.</p>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                               Conversion +5.2%
                             </span>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                           <div className="space-y-6">
                             <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                               <div className="flex justify-between items-end mb-2">
                                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Monthly Members</p>
                                 <p className="text-xl font-black">65%</p>
                               </div>
                               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-blue-500" style={{ width: '65%' }}></div>
                               </div>
                             </div>
                             <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                               <div className="flex justify-between items-end mb-2">
                                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Annual Members</p>
                                 <p className="text-xl font-black text-neuro-orange">35%</p>
                               </div>
                               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-neuro-orange" style={{ width: '35%' }}></div>
                               </div>
                             </div>
                           </div>
                           <div className="flex flex-col justify-center space-y-6 p-6 border-l border-white/5">
                             <div>
                               <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Annual LTV Advantage</p>
                               <p className="text-2xl font-black text-green-500">+42%</p>
                             </div>
                             <div>
                               <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Churn Reduction</p>
                               <p className="text-2xl font-black text-blue-500">-15%</p>
                             </div>
                           </div>
                        </div>
                     </section>

                     {/* Verification Queue */}
            <section className="bg-[#131B24] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                     <ShieldCheck className="w-6 h-6 text-neuro-orange" /> Doctor Verification Queue
                  </h3>
                  <span className="px-3 py-1 bg-neuro-orange text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                     12 Pending
                  </span>
               </div>

               <div className="space-y-4">
                  {[
                    { name: "Dr. Sarah Mitchell", clinic: "Nervous System Chiro", region: "US", date: "2h ago" },
                    { name: "Dr. James Wilson", clinic: "Peak Neuro-Life", region: "AU", date: "5h ago" },
                    { name: "Dr. Elena Rossi", clinic: "Atlas Spinal Health", region: "US", date: "Yesterday" }
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-bold">
                             {doc.name[4]}
                          </div>
                          <div>
                             <h4 className="text-sm font-bold">{doc.name}</h4>
                             <p className="text-[10px] text-gray-500 font-medium">{doc.clinic} • {doc.region}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-4 py-2 bg-neuro-orange text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Approve</button>
                          <button className="p-2 text-gray-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-4 border border-white/10 rounded-2xl text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] hover:bg-white/5 hover:text-white transition-all">
                  Access Full Identity Vault
               </button>
            </section>
         </div>

         <div className="space-y-8">
            {/* System Events / Automations Feed */}
            <section className="bg-neuro-navy rounded-[2.5rem] border border-white/5 p-8 shadow-2xl">
               <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-neuro-orange" /> System Orchestration
               </h3>
               <div className="space-y-6">
                  {[
                    { event: "Subscription Created", target: "user_8923", status: "success" },
                    { event: "Email Broadcast Sent", target: "AU Region", status: "success" },
                    { event: "License Check", target: "sys_cron", status: "pending" },
                    { event: "Payment Failed", target: "user_4412", status: "alert" }
                  ].map((ev, i) => (
                    <div key={i} className="flex items-start gap-4">
                       <div className={`mt-1 w-2 h-2 rounded-full ${ev.status === 'success' ? 'bg-green-500' : ev.status === 'alert' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                       <div>
                          <h4 className="text-xs font-bold">{ev.event}</h4>
                          <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">{ev.target}</p>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-white/5">
                  Audit Automation Logs
               </button>
            </section>

            {/* Global Marketplace Activity */}
            <section className="bg-[#131B24] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
               <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Network className="w-5 h-5 text-blue-500" /> Marketplace Pulse
               </h3>
               <div className="space-y-6 text-center">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-2xl font-black">42</p>
                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">New Vendors</p>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-2xl font-black">856</p>
                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Offers Clipped</p>
                     </div>
                  </div>
                  <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">
                     Partner Portal Admin
                  </button>
               </div>
            </section>

            {/* Quick Support / Feedback */}
            <section className="bg-gradient-to-br from-neuro-orange to-neuro-orange-dark rounded-[2.5rem] p-8 text-white text-center shadow-xl">
               <Bell className="w-8 h-8 mx-auto mb-4 animate-bounce" />
               <h3 className="font-bold mb-2">Technical Alert</h3>
               <p className="text-xs text-white/80 mb-6">Database maintenance scheduled for 02:00 GMT. 14 node restarts queued.</p>
               <button className="w-full py-3 bg-white text-neuro-navy font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg">
                  Notify Developers
               </button>
            </section>
         </div>
      </div>
    </div>
  );
}
