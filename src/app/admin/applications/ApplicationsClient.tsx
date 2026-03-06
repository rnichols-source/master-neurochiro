"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  Search, 
  Check, 
  X, 
  Clock, 
  ChevronRight, 
  Filter, 
  Mail, 
  Phone, 
  Instagram,
  User,
  Activity,
  Zap,
  Target
} from "lucide-react";
import { updateApplicationStatus } from "@/app/actions/update-application";
import { cn } from "@/lib/utils";

export function ApplicationsClient({ initialApplications }: { initialApplications: any[] }) {
  const [apps, setApps] = useState(initialApplications);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchName] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("April 2026");
  const [isUpdating, setIsUpdating] = useState(false);

  const cohorts = ["April 2026", "July 2026", "October 2026"];

  const filteredApps = apps.filter(app => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch = app.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const result = await updateApplicationStatus(id, newStatus, "", selectedCohort);
      if (result.success) {
        setApps(apps.map(a => a.id === id ? { ...a, status: newStatus, responses: { ...a.responses, cohort: selectedCohort } } : a));
        if (selectedApp?.id === id) setSelectedApp({ ...selectedApp, status: newStatus, responses: { ...selectedApp.responses, cohort: selectedCohort } });
        alert(`Successfully updated status to ${newStatus}`);
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("A system error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/30" />
            <input 
              type="text" 
              placeholder="Search applicants..." 
              value={searchTerm}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full bg-white border border-brand-navy/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
            />
          </div>

          <select 
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            className="bg-white border border-brand-navy/10 rounded-2xl py-3 px-4 text-[10px] font-black uppercase tracking-widest text-brand-navy focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all cursor-pointer"
          >
            {cohorts.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex bg-brand-navy/5 p-1 rounded-xl">
          {["all", "pending", "approved", "waitlist", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                filter === f ? "bg-white text-brand-navy shadow-sm" : "text-brand-navy/40 hover:text-brand-navy"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* List View */}
        <div className="lg:col-span-1 space-y-4">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={cn(
                  "w-full text-left p-6 rounded-[2rem] border transition-all group relative",
                  selectedApp?.id === app.id 
                    ? "bg-brand-navy border-brand-navy text-white shadow-xl shadow-brand-navy/20" 
                    : "bg-white border-brand-navy/5 hover:border-brand-orange/40"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm",
                    selectedApp?.id === app.id ? "bg-white/10" : "bg-brand-navy/5 text-brand-navy"
                  )}>
                    {app.full_name[0]}
                  </div>
                  <div className="text-right">
                    <p className={cn("text-[8px] font-black uppercase tracking-widest", selectedApp?.id === app.id ? "text-white/40" : "text-brand-navy/40")}>Score</p>
                    <p className={cn("text-lg font-black", app.score > 40 ? "text-green-500" : "text-brand-orange")}>{app.score}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-black tracking-tight truncate">{app.full_name}</h4>
                  <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-1", selectedApp?.id === app.id ? "text-white/60" : "text-brand-navy/40")}>
                    {app.responses?.current_role || "Doctor"}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                    app.status === 'approved' ? "bg-green-500/20 text-green-400" : 
                    app.status === 'rejected' ? "bg-red-500/20 text-red-400" : 
                    "bg-brand-orange/20 text-brand-orange"
                  )}>
                    {app.status}
                  </div>
                  <ChevronRight className={cn("w-4 h-4 transition-transform", selectedApp?.id === app.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100")} />
                </div>
              </button>
            ))
          ) : (
            <div className="p-12 text-center border-2 border-dashed border-brand-navy/5 rounded-[2rem]">
              <p className="text-xs font-bold text-brand-navy/20 uppercase tracking-widest">No Applications Found</p>
            </div>
          )}
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedApp ? (
              <motion.div
                key={selectedApp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <EliteCard className="p-10 border-brand-navy/10">
                  {/* Top Profile Bar */}
                  <div className="flex flex-col md:flex-row justify-between gap-8 pb-10 border-b border-brand-navy/5">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-[2rem] bg-brand-navy flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-brand-navy/20">
                        {selectedApp.full_name[0]}
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-4xl font-black text-brand-navy tracking-tighter">{selectedApp.full_name}</h2>
                        <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-brand-navy/40">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedApp.email}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {selectedApp.phone}</span>
                          {selectedApp.responses?.instagram && <span className="flex items-center gap-1 text-brand-orange"><Instagram className="w-3 h-3" /> {selectedApp.responses.instagram}</span>}
                          {selectedApp.responses?.cohort && <span className="flex items-center gap-1 bg-brand-navy text-white px-2 py-0.5 rounded-md">Cohort: {selectedApp.responses.cohort}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 h-fit">
                      <button 
                        disabled={isUpdating}
                        onClick={() => handleStatusUpdate(selectedApp.id, 'approved')}
                        className="p-4 bg-green-500/10 text-green-600 rounded-2xl hover:bg-green-500 hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Check className={cn("w-5 h-5", isUpdating && "animate-pulse")} />
                      </button>
                      <button 
                        disabled={isUpdating}
                        onClick={() => handleStatusUpdate(selectedApp.id, 'waitlist')}
                        className="p-4 bg-brand-orange/10 text-brand-orange rounded-2xl hover:bg-brand-orange hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Clock className={cn("w-5 h-5", isUpdating && "animate-pulse")} />
                      </button>
                      <button 
                        disabled={isUpdating}
                        onClick={() => handleStatusUpdate(selectedApp.id, 'rejected')}
                        className="p-4 bg-red-500/10 text-red-600 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className={cn("w-5 h-5", isUpdating && "animate-pulse")} />
                      </button>
                    </div>
                  </div>

                  {/* The 25 Responses */}
                  <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Practice Section */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 text-brand-orange">
                        <Activity className="w-4 h-4" />
                        <h5 className="text-[10px] font-black uppercase tracking-[0.3em]">Practice Metrics</h5>
                      </div>
                      <div className="space-y-6">
                        {[
                          { label: "Role", val: selectedApp.responses?.current_role },
                          { label: "School/Grad", val: selectedApp.responses?.student_info },
                          { label: "Years Practicing", val: selectedApp.responses?.years_practicing },
                          { label: "Monthly Rev", val: selectedApp.responses?.monthly_revenue },
                          { label: "Weekly Visits", val: selectedApp.responses?.weekly_visits },
                          { label: "Conv Rate", val: selectedApp.responses?.conversion_rate },
                        ].map(item => (
                          <div key={item.label}>
                            <p className="text-[8px] font-black uppercase text-brand-navy/30 mb-1">{item.label}</p>
                            <p className="text-sm font-bold text-brand-navy">{item.val || "N/A"}</p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 grid grid-cols-3 gap-4">
                        {[
                          { label: "Certainty", val: selectedApp.responses?.confidence_score },
                          { label: "Stability", val: selectedApp.responses?.stability_score },
                          { label: "Seriousness", val: selectedApp.responses?.seriousness_score },
                        ].map(item => (
                          <div key={item.label} className="text-center p-4 bg-brand-navy/5 rounded-2xl">
                            <p className="text-[8px] font-black uppercase text-brand-navy/40 mb-1">{item.label}</p>
                            <p className="text-xl font-black text-brand-navy">{item.val}/10</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Psych/Transformation Section */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 text-brand-orange">
                        <Zap className="w-4 h-4" />
                        <h5 className="text-[10px] font-black uppercase tracking-[0.3em]">The Transformation</h5>
                      </div>
                      <div className="space-y-8">
                        {[
                          { label: "Tier Requested", val: selectedApp.responses?.tier_applying },
                          { label: "Biggest Struggle", val: selectedApp.responses?.biggest_struggle },
                          { label: "Vision 6-12 Months", val: selectedApp.responses?.success_vision },
                          { label: "Prevention Factor", val: selectedApp.responses?.prevention_factor },
                          { label: "Why Now?", val: selectedApp.responses?.why_now },
                          { label: "Why Selection?", val: selectedApp.responses?.why_selected },
                        ].map(item => (
                          <div key={item.label}>
                            <p className="text-[8px] font-black uppercase text-brand-navy/30 mb-2">{item.label}</p>
                            <p className="text-xs font-medium text-brand-navy leading-relaxed bg-brand-cream/50 p-4 rounded-xl border border-brand-navy/5">
                              {item.val || "No response provided."}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </EliteCard>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center p-20 border-2 border-dashed border-brand-navy/5 rounded-[3rem]">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-navy/5 flex items-center justify-center mx-auto">
                    <User className="w-8 h-8 text-brand-navy/20" />
                  </div>
                  <p className="text-sm font-black text-brand-navy/20 uppercase tracking-widest">Select an applicant to review</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
