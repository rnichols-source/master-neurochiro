"use client";

import { motion } from "framer-motion";
import { EliteCard } from "@/components/ui/elite-ui";
import { 
  LayoutDashboard, 
  Play, 
  Calendar, 
  CheckCircle2, 
  BarChart3, 
  MessageSquare,
  Clock,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ClinicOSPreview() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Portal Experience</p>
        <h2 className="text-5xl font-black text-brand-navy tracking-tighter leading-tight">The Clinic OS Preview.</h2>
        <p className="text-brand-gray font-medium max-w-xl mx-auto">
          This is not a course portal. It is the command center for your 
          practice reconstruction, designed for speed and implementation.
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-brand-orange/5 blur-3xl rounded-[3rem] -z-10 group-hover:bg-brand-orange/10 transition-colors duration-1000" />
        
        <EliteCard className="p-0 overflow-hidden border-brand-navy/10 shadow-2xl rounded-[2.5rem] bg-white">
          <div className="flex flex-col md:flex-row min-h-[600px]">
            {/* Sidebar Mock */}
            <div className="w-64 bg-brand-navy p-8 hidden md:flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center font-black text-white text-xs">N</div>
                <div className="text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none">NeuroChiro</p>
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand-orange opacity-80 mt-1">OS 2.0</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: LayoutDashboard, label: "Command Center", active: true },
                  { icon: Zap, label: "Curriculum", active: false },
                  { icon: BarChart3, label: "KPI Engine", active: false },
                  { icon: MessageSquare, label: "Pro Feedback", active: false },
                ].map((item, i) => (
                  <div key={i} className={cn(
                    "flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-colors",
                    item.active ? "text-brand-orange" : "text-white/40 hover:text-white"
                  )}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Mock */}
            <div className="flex-1 bg-brand-cream/30 p-8 space-y-8">
              {/* Top Header Mock */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">Welcome Back</p>
                  <h4 className="text-2xl font-black text-brand-navy">Dr. Alexander Sterling</h4>
                </div>
                <div className="flex gap-4">
                   <div className="px-4 py-2 bg-white rounded-xl border border-brand-navy/5 shadow-sm text-center">
                    <p className="text-[8px] font-black uppercase text-brand-navy/40">Next Live Call</p>
                    <p className="text-[10px] font-black text-brand-orange">Thu @ 11AM EST</p>
                   </div>
                </div>
              </div>

              {/* Grid Mock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Focus */}
                <div className="p-6 bg-brand-navy rounded-3xl text-white space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">Active Installation</p>
                      <h5 className="text-lg font-black leading-tight">Week 6: Care Plan <br />Mastery & Day 2</h5>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                      <span className="text-white/40">Implementation Progress</span>
                      <span className="text-brand-orange">85%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-brand-orange" />
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[8px] font-black uppercase tracking-widest transition-colors">
                    Continue to Module 6.3
                  </button>
                </div>

                {/* Daily Checklist */}
                <div className="p-6 bg-white rounded-3xl border border-brand-navy/5 shadow-sm space-y-6">
                  <p className="text-[8px] font-black uppercase tracking-widest text-brand-navy/40">Daily Action Required</p>
                  <div className="space-y-4">
                    {[
                      { label: "Script Practice: Objection Handling", done: true },
                      { label: "Scan-to-Story Video Review", done: false },
                      { label: "Update KPI Outcome Engine", done: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                          item.done ? "bg-green-500 border-green-500" : "border-brand-navy/10"
                        )}>
                          {item.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                        <span className={cn(
                          "text-[10px] font-bold",
                          item.done ? "text-brand-navy/30 line-through" : "text-brand-navy"
                        )}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KPI Trend Mock */}
                <div className="md:col-span-2 p-6 bg-white rounded-3xl border border-brand-navy/5 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-brand-navy/40">Outcome Engine</p>
                      <h5 className="text-sm font-black text-brand-navy">Practice Conversion Trend</h5>
                    </div>
                    <div className="flex gap-2">
                       <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-0.5 rounded-lg">+22% Optimization</span>
                    </div>
                  </div>
                  
                  {/* Mock Chart Area */}
                  <div className="h-24 flex items-end gap-2">
                    {[30, 45, 35, 60, 55, 75, 85].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-brand-navy/5 rounded-t-lg relative group overflow-hidden"
                      >
                        <motion.div 
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className={cn(
                            "absolute bottom-0 left-0 right-0 rounded-t-lg transition-colors",
                            h > 70 ? "bg-brand-orange" : "bg-brand-navy/20"
                          )}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-[8px] font-black uppercase tracking-widest text-brand-navy/20">
                    <span>Baseline (Pre-OS)</span>
                    <span>Week 6 (Active Install)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </EliteCard>
      </div>
    </div>
  );
}
