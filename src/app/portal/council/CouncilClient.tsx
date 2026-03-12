"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Video, 
  Activity, 
  Database, 
  MessageSquare, 
  FileText, 
  Target, 
  ShieldCheck,
  Calendar,
  ArrowRight,
  TrendingUp,
  Zap,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CouncilClient() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Command Center", icon: ShieldCheck },
    { id: "triage", label: "Bi-Weekly Triage", icon: Video },
    { id: "caselab", label: "Case Rescue Lab", icon: Activity },
    { id: "scripts", label: "Script Vault", icon: MessageSquare },
    { id: "kpi", label: "KPI Benchmarking", icon: BarChart3 },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Council Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange mb-4">
            <ShieldCheck size={14} />
            <p className="text-[10px] font-black uppercase tracking-widest">Active Inner Circle</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">The Council</h1>
          <p className="text-brand-gray text-lg font-medium mt-4 max-w-xl">
            Moving from Installation to Operation. Real-time implementation support for the elite chiropractor.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <BrandButton variant="outline" className="flex-1 md:flex-none text-[10px]" onClick={() => setActiveTab('caselab')}>Submit Case Rescue</BrandButton>
          <BrandButton variant="primary" className="flex-1 md:flex-none text-[10px]" onClick={() => setActiveTab('triage')}>Join Triage Call</BrandButton>
        </div>
      </div>

      {/* Internal Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all whitespace-nowrap group",
              activeTab === tab.id 
                ? "bg-brand-navy border-brand-navy text-white shadow-xl" 
                : "bg-white border-brand-navy/5 text-brand-navy/60 hover:border-brand-orange/40"
            )}
          >
            <tab.icon size={18} className={cn(activeTab === tab.id ? "text-brand-orange" : "text-brand-navy/40 group-hover:text-brand-orange")} />
            <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Live Call & KPI Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Call Card */}
              <EliteCard className="lg:col-span-2 bg-brand-navy text-white border-none p-0 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <Video size={240} className="text-brand-orange" />
                </div>
                <div className="p-8 md:p-12 relative z-10 flex flex-col justify-between h-full min-h-[350px]">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full text-brand-orange border border-white/10">
                      <Calendar size={14} />
                      <p className="text-[10px] font-black uppercase tracking-widest">Next Command Call</p>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Bi-Weekly <br />Implementation Triage</h2>
                    <p className="text-white/60 text-lg font-medium max-w-lg">Every Tuesday @ 12:00 PM EST. Bring your current clinic bottlenecks to the floor for real-time strategy.</p>
                  </div>
                  <div className="pt-8">
                    <BrandButton variant="primary" size="lg" className="w-full md:w-auto">Enter Call Room</BrandButton>
                  </div>
                </div>
              </EliteCard>

              {/* KPI Summary */}
              <EliteCard className="bg-white border-brand-navy/5 shadow-sm p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Council Benchmarking</p>
                  <div className="space-y-8">
                    {[
                      { label: "PVA (Council Avg)", value: "48", trend: "Target: 60", icon: TrendingUp },
                      { label: "ROF Conversion (Avg)", value: "82%", trend: "Target: 90%", icon: Target },
                      { label: "Clinic Overhead (Avg)", value: "42%", trend: "Target: 35%", icon: Zap },
                    ].map((stat, i) => (
                      <div key={i} className="flex justify-between items-end">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase text-brand-navy/40">{stat.label}</p>
                          <p className="text-3xl font-black text-brand-navy tracking-tighter">{stat.value}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-black text-brand-orange">{stat.trend}</span>
                          <stat.icon size={16} className="text-brand-orange opacity-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-8 border-t border-brand-navy/5">
                  <BrandButton variant="outline" className="w-full text-[10px]" onClick={() => setActiveTab('kpi')}>Compare My Numbers</BrandButton>
                </div>
              </EliteCard>
            </div>

            {/* Quick Actions & Network */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { id: "caselab", title: "Case Rescue", desc: "Submit difficult cases for review", icon: Activity },
                { id: "scripts", title: "Script Vault", desc: "Advanced operational language", icon: MessageSquare },
                { id: "library", title: "CEO Library", desc: "Quarterly implementation toolkits", icon: FileText },
                { id: "triage", title: "Call Archives", desc: "Search the triage database", icon: Video },
              ].map((action, i) => (
                <EliteCard 
                  key={i} 
                  className="bg-white border-brand-navy/5 hover:border-brand-orange/40 transition-all group p-6 cursor-pointer"
                  onClick={() => setActiveTab(action.id as any)}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center mb-4 group-hover:bg-brand-orange transition-colors">
                    <action.icon size={18} className="text-brand-navy group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-sm font-black text-brand-navy uppercase mb-1">{action.title}</h3>
                  <p className="text-[10px] font-medium text-brand-gray leading-relaxed mb-4">{action.desc}</p>
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-orange group-hover:gap-3 transition-all">
                    Access <ArrowRight size={12} />
                  </div>
                </EliteCard>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "caselab" && (
          <motion.div
            key="caselab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-brand-navy mb-4">Case Rescue Lab</h2>
              <p className="text-brand-gray font-medium">Submit your most challenging patient interactions. We will break down the nervous system states in the room and provide the high-integrity script to salvage the case.</p>
            </div>
            
            <EliteCard className="bg-white border-brand-navy/5 p-8 max-w-2xl">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Patient Stuck Point</label>
                  <textarea 
                    className="w-full bg-brand-cream border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-orange h-32"
                    placeholder="Describe exactly where the communication broke down (e.g., 'They liked the scans but said the price was too high after Day 2')..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">What was your reaction?</label>
                  <input 
                    type="text"
                    className="w-full bg-brand-cream border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-orange"
                    placeholder="How did you handle the objection in the moment?"
                  />
                </div>
                <BrandButton variant="primary" className="w-full">Submit for Triage Review</BrandButton>
              </form>
            </EliteCard>
          </motion.div>
        )}

        {/* Fallback for other tabs */}
        {activeTab !== "overview" && activeTab !== "caselab" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-brand-navy/5 flex items-center justify-center mb-6">
              <ShieldCheck size={40} className="text-brand-navy/20" />
            </div>
            <h2 className="text-2xl font-black text-brand-navy uppercase tracking-tighter">System Initializing</h2>
            <p className="text-brand-gray font-medium mt-2 max-w-xs mx-auto">This module of The Council is being deployed. Check the weekly schedule for launch details.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
