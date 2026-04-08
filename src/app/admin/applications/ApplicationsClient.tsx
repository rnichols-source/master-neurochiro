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
import { sendPortalInvite } from "@/app/actions/admin-actions";
import { cn } from "@/lib/utils";

export function ApplicationsClient({ initialApplications }: { initialApplications: any[] }) {
  const [apps, setApps] = useState(initialApplications);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchName] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("April 2026");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInviting, setIsInviting] = useState(false);

  const cohorts = ["April 2026", "July 2026", "October 2026"];

  const filteredApps = apps.filter(app => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch = (app.full_name || "").toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleSendInvite = async (email: string, fullName: string) => {
    if (!confirm(`Send portal activation link to ${fullName}?`)) return;
    
    setIsInviting(true);
    try {
      const result = await sendPortalInvite(email, fullName);
      if (result.success) {
        alert(result.message || "Invite sent successfully!");
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("A system error occurred.");
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-32 md:pb-20">
      {/* Header & Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-80">
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
            className="w-full sm:w-auto bg-white border border-brand-navy/10 rounded-2xl py-3 px-4 text-xs font-black uppercase tracking-widest text-brand-navy focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all cursor-pointer"
          >
            {cohorts.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex bg-brand-navy/5 p-1 rounded-xl w-full lg:w-auto overflow-x-auto no-scrollbar">
          {["all", "pending", "approved", "paid", "waitlist", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex-1 lg:flex-none px-4 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all whitespace-nowrap",
                filter === f ? "bg-white text-brand-navy shadow-sm" : "text-brand-navy/40 hover:text-brand-navy"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* List View */}
        <div className={cn(
          "lg:col-span-1 space-y-4",
          selectedApp ? "hidden lg:block" : "block"
        )}>
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border transition-all group relative",
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
                    {(app.full_name || "D")[0]}
                  </div>
                  <div className="text-right">
                    <p className={cn("text-xs font-black uppercase tracking-widest", selectedApp?.id === app.id ? "text-white/40" : "text-brand-navy/40")}>Score</p>
                    <p className={cn("text-lg font-black", app.score > 40 ? "text-green-500" : "text-brand-orange")}>{app.score}</p>
                  </div>
                </div>
                
                <div className="min-w-0">
                  <h4 className="font-black tracking-tight truncate">{app.full_name}</h4>
                  <p className={cn("text-xs font-bold uppercase tracking-widest mt-1 truncate", selectedApp?.id === app.id ? "text-white/60" : "text-brand-navy/40")}>
                    {app.responses?.current_role || "Doctor"}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className={cn(
                    "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest",
                    app.status === 'approved' ? "bg-green-500/20 text-green-400" : 
                    app.status === 'paid' ? "bg-brand-orange/20 text-brand-orange" :
                    app.status === 'rejected' ? "bg-red-500/20 text-red-400" : 
                    "bg-brand-navy/20 text-brand-navy/60"
                  )}>
                    {app.status}
                  </div>
                  <ChevronRight className={cn("w-4 h-4 transition-transform", selectedApp?.id === app.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100")} />
                </div>
              </button>
            ))
          ) : (
            <div className="p-12 text-center border-2 border-dashed border-brand-navy/5 rounded-2xl">
              <p className="text-xs font-bold text-brand-navy/20 uppercase tracking-widest">No Applications Found</p>
            </div>
          )}
        </div>

        {/* Detail View */}
        <div className={cn(
          "lg:col-span-2",
          !selectedApp ? "hidden lg:block" : "block"
        )}>
          <AnimatePresence mode="wait">
            {selectedApp ? (
              <motion.div
                key={selectedApp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 md:space-y-8"
              >
                <div className="lg:hidden mb-4">
                  <button 
                    onClick={() => setSelectedApp(null)}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-navy transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" /> Back to list
                  </button>
                </div>

                <EliteCard className="p-6 md:p-10 border-brand-navy/10 overflow-hidden">
                  {/* Top Profile Bar */}
                  <div className="flex flex-col md:flex-row justify-between gap-8 pb-8 md:pb-10 border-b border-brand-navy/5">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-2xl bg-brand-navy flex items-center justify-center text-white text-2xl md:text-3xl font-black shadow-xl shadow-brand-navy/20 shrink-0">
                        {selectedApp.full_name[0]}
                      </div>
                      <div className="space-y-2 min-w-0">
                        <h2 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tighter truncate">{selectedApp.full_name}</h2>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3 md:gap-4 text-xs md:text-xs font-black uppercase tracking-widest text-brand-navy/40">
                          <span className="flex items-center gap-1 truncate max-w-full"><Mail className="w-3 h-3 shrink-0" /> {selectedApp.email}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3 shrink-0" /> {selectedApp.phone}</span>
                          {selectedApp.responses?.instagram && <span className="flex items-center gap-1 text-brand-orange"><Instagram className="w-3 h-3 shrink-0" /> {selectedApp.responses.instagram}</span>}
                          {selectedApp.responses?.cohort && <span className="flex items-center gap-1 bg-brand-navy text-white px-2 py-0.5 rounded-md">Cohort: {selectedApp.responses.cohort}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-3 h-fit">
                      {selectedApp.status === 'paid' && (
                        <BrandButton 
                          onClick={() => handleSendInvite(selectedApp.email, selectedApp.full_name)}
                          disabled={isInviting}
                          variant="accent"
                          className="px-6 py-3 rounded-2xl flex items-center gap-2 group"
                        >
                          <Zap className={cn("w-4 h-4 transition-all group-hover:scale-110", isInviting && "animate-pulse")} />
                          {isInviting ? "Sending..." : "Send Portal Invite"}
                        </BrandButton>
                      )}
                      
                      <button 
                        disabled={isUpdating}
                        onClick={() => handleStatusUpdate(selectedApp.id, 'approved')}
                        className="p-3 md:p-4 bg-green-500/10 text-green-600 rounded-2xl hover:bg-green-500 hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Approve"
                      >
                        <Check className={cn("w-5 h-5", isUpdating && "animate-pulse")} />
                      </button>
                      <button 
                        disabled={isUpdating}
                        onClick={() => handleStatusUpdate(selectedApp.id, 'waitlist')}
                        className="p-3 md:p-4 bg-brand-orange/10 text-brand-orange rounded-2xl hover:bg-brand-orange hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Waitlist"
                      >
                        <Clock className={cn("w-5 h-5", isUpdating && "animate-pulse")} />
                      </button>
                      <button 
                        disabled={isUpdating}
                        onClick={() => handleStatusUpdate(selectedApp.id, 'rejected')}
                        className="p-3 md:p-4 bg-red-500/10 text-red-600 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Reject"
                      >
                        <X className={cn("w-5 h-5", isUpdating && "animate-pulse")} />
                      </button>
                    </div>
                  </div>

                  {/* Application Details */}
                  <div className="pt-8 md:pt-10 space-y-6">
                    <div className="flex items-center gap-3 text-brand-orange">
                      <Activity className="w-4 h-4" />
                      <h5 className="text-xs font-black uppercase tracking-wider">Application Details</h5>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <p className="text-xs font-bold text-brand-navy/40 mb-1">Role</p>
                        <p className="text-sm font-bold text-brand-navy">{selectedApp.responses?.current_role || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-navy/40 mb-1">Phone</p>
                        <p className="text-sm font-bold text-brand-navy">{selectedApp.phone || "N/A"}</p>
                      </div>
                    </div>

                    {selectedApp.responses?.biggest_struggle && (
                      <div>
                        <p className="text-xs font-bold text-brand-navy/40 mb-2">#1 Thing to Improve</p>
                        <p className="text-sm font-medium text-brand-navy leading-relaxed bg-brand-cream/50 p-4 rounded-xl border border-brand-navy/5">
                          {selectedApp.responses.biggest_struggle}
                        </p>
                      </div>
                    )}

                    {/* Legacy fields — show if they exist from older applications */}
                    {(selectedApp.responses?.success_vision || selectedApp.responses?.why_now) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {selectedApp.responses?.success_vision && (
                          <div>
                            <p className="text-xs font-bold text-brand-navy/40 mb-2">Vision</p>
                            <p className="text-sm font-medium text-brand-navy leading-relaxed bg-brand-cream/50 p-4 rounded-xl border border-brand-navy/5">
                              {selectedApp.responses.success_vision}
                            </p>
                          </div>
                        )}
                        {selectedApp.responses?.why_now && (
                          <div>
                            <p className="text-xs font-bold text-brand-navy/40 mb-2">Why Now</p>
                            <p className="text-sm font-medium text-brand-navy leading-relaxed bg-brand-cream/50 p-4 rounded-xl border border-brand-navy/5">
                              {selectedApp.responses.why_now}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </EliteCard>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center p-12 md:p-20 border-2 border-dashed border-brand-navy/5 rounded-2xl md:rounded-2xl">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-navy/5 flex items-center justify-center mx-auto">
                    <User className="w-6 h-6 md:w-8 md:h-8 text-brand-navy/20" />
                  </div>
                  <p className="text-xs md:text-sm font-black text-brand-navy/20 uppercase tracking-widest">Select an applicant to review</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
