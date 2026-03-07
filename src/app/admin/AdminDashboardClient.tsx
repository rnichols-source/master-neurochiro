"use client";

import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Activity,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Database,
  Send,
  X,
  Loader2,
  Calendar,
  Link as LinkIcon
} from "lucide-react";
import { useState } from "react";
import { seedDashboardData, runEngagementPulse, sendAnnouncement } from "@/app/actions/admin-ops";
import { updateNextCall } from "@/app/actions/call-actions";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminDashboardClient({ 
  initialStats, 
  initialCohortData,
  initialActivity 
}: { 
  initialStats: any, 
  initialCohortData: any,
  initialActivity: any[]
}) {
  const [stats, setStats] = useState(initialStats);
  const [cohortData, setCohortData] = useState(initialCohortData);
  const [recentActivity, setRecentActivity] = useState(initialActivity);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isPulseRunning, setIsPulseRunning] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [announcement, setAnnouncement] = useState({ title: '', content: '' });
  const [nextCallData, setNextCallData] = useState({ date: '', time: '', zoomUrl: '' });
  const [isSavingCall, setIsSavingCall] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    const res = await seedDashboardData();
    if (res.success) {
      window.location.reload();
    }
    setIsSeeding(false);
  };

  const handlePulse = async () => {
    setIsPulseRunning(true);
    await runEngagementPulse();
    alert("Engagement pulse complete. At-risk members notified.");
    setIsPulseRunning(false);
  };

  const handleAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await sendAnnouncement(announcement.title, announcement.content);
    if (res.success) {
      alert("Announcement broadcasted!");
      setShowAnnouncementModal(false);
      setAnnouncement({ title: '', content: '' });
    }
  };

  const handleUpdateCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCall(true);
    try {
      const fullDate = new Date(`${nextCallData.date}T${nextCallData.time}`).toISOString();
      const res = await updateNextCall(fullDate, nextCallData.zoomUrl);
      if (res.success) {
        alert("Live call scheduled!");
        setShowCallModal(false);
      }
    } catch (err) {
      alert("Error scheduling call. Check date format.");
    } finally {
      setIsSavingCall(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-32 md:pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-2">System HQ</p>
          <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tighter leading-none">Command Center</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button 
            onClick={handleSeed}
            disabled={isSeeding}
            className="p-3 bg-brand-navy/5 text-brand-navy/40 hover:text-brand-navy rounded-xl transition-all disabled:opacity-50"
            title="Seed Demo Data"
          >
            <Database className={cn("w-4 h-4", isSeeding && "animate-spin")} />
          </button>
          <Link href="/admin/curriculum" className="flex-1 md:flex-none">
            <BrandButton variant="outline" size="sm" className="w-full md:w-auto py-3 text-[10px]">Manage Content</BrandButton>
          </Link>
          <Link href="/admin/applications" className="flex-1 md:flex-none">
            <BrandButton variant="outline" size="sm" className="w-full md:w-auto py-3 text-[10px]">Review Queue</BrandButton>
          </Link>
          <BrandButton 
            variant="accent" 
            size="sm" 
            onClick={() => setShowAnnouncementModal(true)}
            className="flex-1 md:flex-none py-3 text-[10px]"
          >
            New Announcement
          </BrandButton>
          <BrandButton 
            variant="primary" 
            size="sm" 
            onClick={() => setShowCallModal(true)}
            className="flex-1 md:flex-none py-3 text-[10px]"
          >
            Schedule Live Call
          </BrandButton>
        </div>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <EliteCard className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 md:p-3 bg-blue-500/10 rounded-2xl">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
            </div>
            <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg">Active</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">Total Members</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">{stats?.totalMembers || 0}</h3>
            <p className="text-[10px] font-bold text-brand-navy/30">{stats?.proMembers || 0} Pro / {stats?.standardMembers || 0} Std</p>
          </div>
        </EliteCard>

        <EliteCard className="p-6 md:p-8 border-brand-orange/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 md:p-3 bg-brand-orange/10 rounded-2xl">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-brand-orange" />
            </div>
            {(stats?.pendingApps || 0) > 0 && (
              <span className="animate-pulse w-2 h-2 rounded-full bg-brand-orange" />
            )}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">Pending Apps</p>
          <h3 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">{stats?.pendingApps || 0}</h3>
        </EliteCard>

        <EliteCard className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 md:p-3 bg-green-500/10 rounded-2xl">
              <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">Revenue Est.</p>
          <h3 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">${(stats?.revenue || 0).toLocaleString()}</h3>
        </EliteCard>

        <EliteCard className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 md:p-3 bg-purple-500/10 rounded-2xl">
              <Activity className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-1">Avg. Completion</p>
          <h3 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">{stats?.avgCompletion || 0}%</h3>
        </EliteCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <EliteCard className="lg:col-span-2 p-6 md:p-8" title="Cohort Completion" subtitle="Progress by Phase">
          <div className="mt-6 md:mt-8 space-y-5 md:space-y-6">
            {cohortData?.completionRates?.map((week: any) => (
              <div key={week.week} className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy">Phase {week.week}: {week.title}</p>
                  <p className="text-[10px] font-black text-brand-orange">{week.rate}%</p>
                </div>
                <div className="h-2 w-full bg-brand-navy/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-navy transition-all duration-1000" 
                    style={{ width: `${week.rate}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </EliteCard>

        <div className="space-y-6 md:space-y-8">
          <EliteCard title="Live Stream" subtitle="Recent Implementations" className="p-6 md:p-8">
            <div className="mt-4 md:mt-6 space-y-5 md:space-y-6">
              {recentActivity.length > 0 ? recentActivity.map((act: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-brand-navy truncate">{act.profiles?.full_name || 'System'}</p>
                    <p className="text-[10px] text-brand-navy/40 font-medium truncate">Completed {act.modules?.title}</p>
                  </div>
                </div>
              )) : (
                <p className="text-[10px] font-bold text-brand-navy/20 uppercase tracking-widest py-4">No recent activity</p>
              )}
            </div>
            <BrandButton variant="ghost" className="w-full mt-6 text-[10px] py-3">View Full Log</BrandButton>
          </EliteCard>

          <EliteCard title="At Risk" subtitle="Required Intervention" className="p-6 md:p-8 border-red-500/20">
            <div className="mt-4 md:mt-6 space-y-4">
              <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-center gap-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-xs font-black text-brand-navy">Intervention Needed</p>
                  <p className="text-[10px] font-bold text-red-500 uppercase">Members Stalled</p>
                </div>
              </div>
              <BrandButton 
                variant="outline" 
                size="sm" 
                className="w-full text-[10px] py-3"
                onClick={handlePulse}
                isLoading={isPulseRunning}
              >
                {isPulseRunning ? "Sending..." : "Run Engagement Pulse"}
              </BrandButton>
            </div>
          </EliteCard>
        </div>
      </div>

      {/* Modals */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-brand-navy/40 backdrop-blur-sm">
          <EliteCard className="w-full max-w-xl p-6 md:p-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-brand-navy">Send Announcement</h3>
                <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest mt-1">Broadcast to all active members</p>
              </div>
              <button onClick={() => setShowAnnouncementModal(false)} className="p-2 hover:bg-brand-navy/5 rounded-lg transition-all">
                <X className="w-5 h-5 text-brand-navy/40" />
              </button>
            </div>

            <form onSubmit={handleAnnouncement} className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">Subject</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. New Resource Added: Clinical Scripts V2"
                  value={announcement.title}
                  onChange={(e) => setAnnouncement({...announcement, title: e.target.value})}
                  className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 md:py-4 px-4 md:px-6 text-sm font-bold text-brand-navy focus:border-brand-orange/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">Message Content</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  value={announcement.content}
                  onChange={(e) => setAnnouncement({...announcement, content: e.target.value})}
                  className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 md:py-4 px-4 md:px-6 text-sm font-bold text-brand-navy focus:border-brand-orange/20 outline-none transition-all resize-none"
                />
              </div>
              <BrandButton type="submit" variant="primary" className="w-full py-3 md:py-4">
                <Send className="w-4 h-4 mr-2" /> Send Broadcast
              </BrandButton>
            </form>
          </EliteCard>
        </div>
      )}

      {showCallModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/40 backdrop-blur-sm">
          <EliteCard className="w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">Schedule Live Mastermind</h3>
                <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest mt-1">Updates Student Dashboard Timer</p>
              </div>
              <button onClick={() => setShowCallModal(false)} className="p-2 hover:bg-brand-navy/5 rounded-lg transition-all">
                <X className="w-5 h-5 text-brand-navy/40" />
              </button>
            </div>

            <form onSubmit={handleUpdateCall} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">Date</label>
                  <input 
                    type="date" 
                    required
                    value={nextCallData.date}
                    onChange={(e) => setNextCallData({...nextCallData, date: e.target.value})}
                    className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-xs font-bold text-brand-navy focus:border-brand-orange/20 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">Time</label>
                  <input 
                    type="time" 
                    required
                    value={nextCallData.time}
                    onChange={(e) => setNextCallData({...nextCallData, time: e.target.value})}
                    className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-xs font-bold text-brand-navy focus:border-brand-orange/20 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">Zoom Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-navy/30" />
                  <input 
                    type="url" 
                    required
                    placeholder="https://zoom.us/j/..."
                    value={nextCallData.zoomUrl}
                    onChange={(e) => setNextCallData({...nextCallData, zoomUrl: e.target.value})}
                    className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-brand-navy focus:border-brand-orange/20 outline-none"
                  />
                </div>
              </div>

              <BrandButton type="submit" variant="primary" className="w-full py-4" isLoading={isSavingCall}>
                <Calendar className="w-4 h-4 mr-2" /> Sync Call Schedule
              </BrandButton>
            </form>
          </EliteCard>
        </div>
      )}
    </div>
  );
}
