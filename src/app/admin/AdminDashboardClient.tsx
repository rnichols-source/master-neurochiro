"use client";

import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Database,
  Send,
  X,
  Loader2,
  Calendar,
  Link as LinkIcon,
  Zap,
  UserPlus,
  BarChart,
  HardDrive,
  MessageSquare,
  Lock
} from "lucide-react";
import { useState } from "react";
import { seedDashboardData, runEngagementPulse, sendAnnouncement } from "@/app/actions/admin-ops";
import { activateApprovedMembers, syncWeek6Resources } from "@/app/actions/activation-actions";
import { updateNextCall } from "@/app/actions/call-actions";
import { triggerAdminPreview, triggerCohortOnboarding } from "@/app/actions/onboarding-actions";
import { sendPortalInvite } from "@/app/actions/admin-actions";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminDashboardClient({ 
  initialStats, 
  initialCohortData,
  initialActivity,
  initialMastermindActivity,
  initialRevenueData,
  initialAtRisk,
  initialVaultStats,
  initialHealth
}: { 
  initialStats: any, 
  initialCohortData: any,
  initialActivity: any[],
  initialMastermindActivity: any,
  initialRevenueData: any,
  initialAtRisk: any[],
  initialVaultStats: any[],
  initialHealth: any
}) {
  const [stats] = useState(initialStats);
  const [cohortData] = useState(initialCohortData);
  const [recentActivity] = useState(initialActivity);
  const [mastermindActivity] = useState(initialMastermindActivity);
  const [revenueData] = useState(initialRevenueData);
  const [atRisk] = useState(initialAtRisk);
  const [vaultStats] = useState(initialVaultStats);
  const [health] = useState(initialHealth);

  const [isSeeding, setIsSeeding] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPulseRunning, setIsPulseRunning] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [announcement, setAnnouncement] = useState({ title: '', content: '' });
  const [nextCallData, setNextCallData] = useState({ date: '', time: '', zoomUrl: '' });
  const [inviteData, setInviteData] = useState({ email: '', fullName: '' });
  const [isSavingCall, setIsSavingCall] = useState(false);
  
  const [isTriggeringPreview, setIsTriggeringPreview] = useState(false);
  const [isTriggeringCohort, setIsTriggeringCohort] = useState(false);
  const [isInviting, setIsInviting] = useState<string | null>(null);
  const [isManualInviting, setIsManualInviting] = useState(false);

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

  const handleActivateMembers = async () => {
    setIsActivating(true);
    const res = await activateApprovedMembers();
    if (res.success) {
      alert(`Activation complete! Members processed.`);
      window.location.reload();
    } else {
      alert(`Error: ${res.error}`);
    }
    setIsActivating(false);
  };

  const handleSyncResources = async () => {
    setIsSyncing(true);
    const res = await syncWeek6Resources();
    if (res.success) {
      alert("Week 6 Premium Resources Synced Successfully!");
      window.location.reload();
    } else {
      alert(`Error Syncing: ${res.error}`);
    }
    setIsSyncing(false);
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
      const fullDate = `${nextCallData.date}T${nextCallData.time}:00-04:00`;
      const res = await updateNextCall(
        fullDate, 
        nextCallData.zoomUrl,
        "Week 7 Live Call",
        "Live mastermind session for Week 7: EQ + Psychosomatic Patterns."
      );
      if (res.success) {
        alert("Live call schedule synced successfully!");
        setShowCallModal(false);
        window.location.reload();
      } else {
        alert(`Error: ${res.error}`);
      }
    } catch (err) {
      alert("Error scheduling call. Please check date and time formats.");
    } finally {
      setIsSavingCall(false);
    }
  };

  const handleTriggerPreview = async () => {
    setIsTriggeringPreview(true);
    try {
      const res = await triggerAdminPreview();
      if (res.success) {
        alert("Admin Preview Email Sent! Check your inbox.");
      } else {
        alert(`Error: ${res.error}`);
      }
    } catch (err) {
      alert("Failed to send preview email.");
    } finally {
      setIsTriggeringPreview(false);
    }
  };

  const handleTriggerCohort = async () => {
    if (!confirm("Are you sure you want to send onboarding emails to ALL approved members? This triggers the transition pipeline.")) return;
    
    setIsTriggeringCohort(true);
    try {
      const res = await triggerCohortOnboarding();
      if (res.success) {
        alert(`Onboarding emails sent to cohort! Results: ${res.results?.length} members notified.`);
      } else {
        alert(`Error: ${res.error}`);
      }
    } catch (err) {
      alert("Failed to trigger cohort onboarding.");
    } finally {
      setIsTriggeringCohort(false);
    }
  };

  const handleManualInvite = async (email: string, fullName: string) => {
    setIsInviting(email);
    try {
      const res = await sendPortalInvite(email, fullName);
      if (res.success) {
        alert(res.message);
      } else {
        alert(`Error: ${res.error}`);
      }
    } catch (err) {
      alert("Failed to send invite.");
    } finally {
      setIsInviting(null);
    }
  };

  const handleManualInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsManualInviting(true);
    try {
      const res = await sendPortalInvite(inviteData.email, inviteData.fullName);
      if (res.success) {
        alert(res.message);
        setShowInviteModal(false);
        setInviteData({ email: '', fullName: '' });
      } else {
        alert(`Error: ${res.error}`);
      }
    } catch (err) {
      alert("Failed to send invite.");
    } finally {
      setIsManualInviting(false);
    }
  };

  return (
    <div className="space-y-10 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-brand-navy/10 pb-8">
        <div>
          <p className="text-brand-orange font-black uppercase tracking-widest text-xs mb-2">CEO Console</p>
          <h1 className="text-4xl font-black text-brand-navy tracking-tighter leading-none">Command Center</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link href="/portal/vault" className="flex-1 md:flex-none">
            <BrandButton variant="outline" size="sm" className="w-full md:w-auto py-3 text-xs border-brand-navy text-brand-navy">
              <Lock className="w-3 h-3 mr-2" /> Enter Vault
            </BrandButton>
          </Link>
          <Link href="/admin/curriculum" className="flex-1 md:flex-none">
            <BrandButton variant="outline" size="sm" className="w-full md:w-auto py-3 text-xs">Manage Content</BrandButton>
          </Link>
          <BrandButton 
            variant="accent" 
            size="sm" 
            onClick={() => setShowAnnouncementModal(true)}
            className="flex-1 md:flex-none py-3 text-xs"
          >
            Broadcast
          </BrandButton>
          <BrandButton 
            variant="primary" 
            size="sm" 
            onClick={() => setShowCallModal(true)}
            className="flex-1 md:flex-none py-3 text-xs"
          >
            Schedule Call
          </BrandButton>
        </div>
      </div>

      {/* SEC 1: PLATFORM OVERVIEW & REVENUE */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <EliteCard className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-blue-500/10 rounded-2xl"><Users className="w-5 h-5 text-blue-500" /></div>
            <span className="text-xs font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg">Active</span>
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 mb-1">Total Members</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">{stats?.totalMembers || 0}</h3>
            <p className="text-xs font-bold text-brand-navy/30">{stats?.proMembers || 0} Pro / {stats?.standardMembers || 0} Std</p>
          </div>
        </EliteCard>

        <EliteCard className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-green-500/10 rounded-2xl"><DollarSign className="w-5 h-5 text-green-500" /></div>
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 mb-1">Gross Revenue Est.</p>
          <h3 className="text-3xl font-black text-brand-navy tracking-tight">${(revenueData?.totalRevenue || 0).toLocaleString()}</h3>
        </EliteCard>

        <EliteCard className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-purple-500/10 rounded-2xl"><Activity className="w-5 h-5 text-purple-500" /></div>
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 mb-1">Avg. Completion</p>
          <h3 className="text-3xl font-black text-brand-navy tracking-tight">{stats?.avgCompletion || 0}%</h3>
        </EliteCard>

        <EliteCard className="p-6 border-brand-orange/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-brand-orange/10 rounded-2xl"><FileText className="w-5 h-5 text-brand-orange" /></div>
            {(stats?.pendingApps || 0) > 0 && <span className="animate-pulse w-2 h-2 rounded-full bg-brand-orange" />}
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 mb-1">Pending Apps</p>
          <div className="flex items-center gap-4">
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">{stats?.pendingApps || 0}</h3>
            <Link href="/admin/applications" className="text-brand-orange text-xs font-bold uppercase tracking-widest hover:underline">Review</Link>
          </div>
        </EliteCard>
      </div>

      {/* Onboarding System Control */}
      <EliteCard className="p-8 border-brand-navy bg-brand-navy text-white overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
          <Send size={120} className="text-brand-orange" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white">
                <Zap size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Onboarding Pipeline</h2>
            </div>
            <p className="text-white/60 max-w-xl font-medium">
              Transition members into the new Command Center. Send highly branded activation emails with secure, unique profile setup links.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <BrandButton 
              variant="outline" 
              onClick={() => setShowInviteModal(true)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <UserPlus className="w-4 h-4 mr-2" /> Manual Invite
            </BrandButton>
            <BrandButton 
              variant="outline" 
              onClick={handleTriggerPreview}
              isLoading={isTriggeringPreview}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Send Admin Preview
            </BrandButton>
            <BrandButton 
              variant="accent" 
              onClick={handleTriggerCohort}
              isLoading={isTriggeringCohort}
            >
              Invite Mastermind Cohort <ArrowRight className="ml-2 w-4 h-4" />
            </BrandButton>
          </div>
        </div>
      </EliteCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SEC 3: MEMBER ACTIVITY INTELLIGENCE */}
        <EliteCard className="lg:col-span-2 p-6" title="Member Intelligence" subtitle="Live Engagement Data">
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1 border-r border-brand-navy/5">
              <p className="text-xs font-black text-brand-navy/40 uppercase tracking-widest">Profiles Built</p>
              <h4 className="text-3xl font-black text-brand-navy">{mastermindActivity?.profilesCompleted || 0}</h4>
            </div>
            <div className="space-y-1 border-r border-brand-navy/5">
              <p className="text-xs font-black text-brand-navy/40 uppercase tracking-widest">Active Today</p>
              <h4 className="text-3xl font-black text-brand-orange">{mastermindActivity?.activeToday || 0}</h4>
            </div>
            <div className="space-y-1 border-r border-brand-navy/5">
              <p className="text-xs font-black text-brand-navy/40 uppercase tracking-widest">Watched W6</p>
              <h4 className="text-3xl font-black text-brand-navy">{mastermindActivity?.watchedWeek6 || 0}</h4>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-black text-brand-navy/40 uppercase tracking-widest">Inactive</p>
              <h4 className="text-3xl font-black text-brand-gray/40">{mastermindActivity?.inactive || 0}</h4>
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 mb-2">Live Stream</p>
            {recentActivity.length > 0 ? recentActivity.map((act: any, i: number) => (
              <div key={i} className="flex gap-4 p-3 bg-brand-navy/5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-brand-navy truncate">{act.profiles?.full_name || 'System'}</p>
                  <p className="text-xs text-brand-navy/40 font-medium truncate">Completed: {act.modules?.title}</p>
                </div>
              </div>
            )) : (
              <p className="text-xs font-bold text-brand-navy/20 uppercase tracking-widest py-4">No recent activity</p>
            )}
          </div>
        </EliteCard>

        {/* AT RISK SYSTEM */}
        <EliteCard title="At Risk System" subtitle="Intervention Required" className="p-6 border-red-500/20 bg-red-500/5">
          <div className="mt-4 space-y-4">
            {atRisk.length > 0 ? (
              <div className="space-y-3">
                {atRisk.slice(0, 5).map((member: any, i: number) => (
                   <div key={i} className="p-3 bg-white rounded-xl border border-red-100 flex flex-col gap-2">
                     <div className="flex items-center gap-3">
                       <AlertTriangle className="w-4 h-4 text-red-500" />
                       <p className="text-xs font-bold text-brand-navy">{member.full_name}</p>
                     </div>
                     <div className="flex justify-between items-center">
                       <p className="text-xs text-brand-navy/60">{member.status === 'pending_profile' ? 'Profile Not Setup' : 'Zero Progress'}</p>
                       <div className="flex items-center gap-3">
                         <button 
                           onClick={() => handleManualInvite(member.email, member.full_name)}
                           disabled={isInviting === member.email}
                           className="text-xs font-black text-brand-orange uppercase tracking-widest hover:text-brand-navy transition-colors disabled:opacity-50"
                         >
                           {isInviting === member.email ? 'Sending...' : 'Instant Invite'}
                         </button>
                         <a href={`mailto:${member.email}`} className="text-xs font-bold text-brand-navy/40 uppercase">Email</a>
                       </div>
                     </div>
                   </div>
                ))}
                {atRisk.length > 5 && (
                  <p className="text-xs text-center text-brand-navy/40 font-bold">+{atRisk.length - 5} more members</p>
                )}
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-green-500/20">
                <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                <p className="text-sm font-bold text-brand-navy">All Clear</p>
                <p className="text-xs text-brand-navy/60">No members currently flagged as at risk.</p>
              </div>
            )}

            <BrandButton 
              variant="outline" 
              size="sm" 
              className="w-full text-xs py-3 mt-4 bg-white hover:bg-red-500 hover:text-white hover:border-red-500"
              onClick={handlePulse}
              isLoading={isPulseRunning}
            >
              <Send className="w-3 h-3 mr-2" /> Run Engagement Pulse
            </BrandButton>
          </div>
        </EliteCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VAULT ANALYTICS */}
        <EliteCard className="p-6" title="Vault Analytics" subtitle="Top performing intelligence">
          <div className="mt-6 space-y-3">
            {vaultStats.length > 0 ? vaultStats.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 bg-brand-navy/5 rounded-xl">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-6 h-6 rounded bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-black text-brand-orange">{i + 1}</span>
                  </div>
                  <p className="text-xs font-bold text-brand-navy truncate">{item.title}</p>
                </div>
                <div className="flex items-center gap-2 pl-4">
                  <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40">{item.download_count} hits</p>
                </div>
              </div>
            )) : (
               <p className="text-xs text-brand-navy/40 py-4 text-center">No vault data yet.</p>
            )}
          </div>
          <Link href="/portal/vault" className="block mt-6 text-center text-xs font-bold text-brand-orange uppercase tracking-widest hover:underline">
            Manage Vault Assets
          </Link>
        </EliteCard>

        {/* SYSTEM HEALTH */}
        <EliteCard className="p-6" title="System Health" subtitle="Live Infrastructure Status">
          <div className="mt-6 space-y-4">
            {[
              { label: "PostgreSQL Database", status: health?.database, icon: Database },
              { label: "Authentication (GoTrue)", status: health?.auth, icon: ShieldCheck },
              { label: "Automation Queue", status: "operational", icon: Activity },
              { label: "Resend Email Gateway", status: health?.email, icon: Send },
            ].map((sys, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-brand-navy/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <sys.icon className="w-5 h-5 text-brand-navy/40" />
                  <span className="text-sm font-bold text-brand-navy">{sys.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", sys.status === 'operational' ? "bg-green-500 animate-pulse" : "bg-red-500 animate-pulse")} />
                  <span className={cn("text-xs font-black uppercase tracking-widest", sys.status === 'operational' ? "text-green-500" : "text-red-500")}>
                    {sys.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </EliteCard>
      </div>

      {/* Modals */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-brand-navy/40 backdrop-blur-sm">
          <EliteCard className="w-full max-w-xl p-6 md:p-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-brand-navy">Broadcast Message</h3>
                <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mt-1">Push to all active members</p>
              </div>
              <button onClick={() => setShowAnnouncementModal(false)} className="p-2 hover:bg-brand-navy/5 rounded-lg transition-all">
                <X className="w-5 h-5 text-brand-navy/40" />
              </button>
            </div>

            <form onSubmit={handleAnnouncement} className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">Subject</label>
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
                <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">Message Content</label>
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
          <EliteCard className="w-full max-md p-8 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">Schedule Live Mastermind</h3>
                <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mt-1">Updates Student Dashboard Timer</p>
              </div>
              <button onClick={() => setShowCallModal(false)} className="p-2 hover:bg-brand-navy/5 rounded-lg transition-all">
                <X className="w-5 h-5 text-brand-navy/40" />
              </button>
            </div>

            <form onSubmit={handleUpdateCall} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">Date</label>
                  <input 
                    type="date" 
                    required
                    value={nextCallData.date}
                    onChange={(e) => setNextCallData({...nextCallData, date: e.target.value})}
                    className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-xs font-bold text-brand-navy focus:border-brand-orange/20 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">Time</label>
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
                <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">Zoom Link</label>
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

      {showInviteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/40 backdrop-blur-sm">
          <EliteCard className="w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">Manual Portal Invite</h3>
                <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mt-1">For members from legacy systems</p>
              </div>
              <button onClick={() => setShowInviteModal(false)} className="p-2 hover:bg-brand-navy/5 rounded-lg transition-all">
                <X className="w-5 h-5 text-brand-navy/40" />
              </button>
            </div>

            <form onSubmit={handleManualInviteSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Dr. Jane Doe"
                  value={inviteData.fullName}
                  onChange={(e) => setInviteData({...inviteData, fullName: e.target.value})}
                  className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-xs font-bold text-brand-navy focus:border-brand-orange/20 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="doctor@example.com"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({...inviteData, email: e.target.value})}
                  className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-xs font-bold text-brand-navy focus:border-brand-orange/20 outline-none"
                />
              </div>

              <BrandButton type="submit" variant="primary" className="w-full py-4" isLoading={isManualInviting}>
                <Send className="w-4 h-4 mr-2" /> Send Custom Invite
              </BrandButton>
            </form>
          </EliteCard>
        </div>
      )}
    </div>
  );
}
