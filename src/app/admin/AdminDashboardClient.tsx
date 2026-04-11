"use client";

import { BrandButton } from "@/components/ui/elite-ui";
import {
  Users,
  FileText,
  DollarSign,
  Activity,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Database,
  Send,
  X,
  Calendar,
  Link as LinkIcon,
  UserPlus,
  ShieldCheck,
  Lock
} from "lucide-react";
import { useState } from "react";
import { runEngagementPulse, sendAnnouncement } from "@/app/actions/admin-ops";
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
  const stats = initialStats;
  const recentActivity = initialActivity;
  const mastermindActivity = initialMastermindActivity;
  const revenueData = initialRevenueData;
  const atRisk = initialAtRisk;
  const vaultStats = initialVaultStats;
  const health = initialHealth;

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

  const handlePulse = async () => {
    setIsPulseRunning(true);
    await runEngagementPulse();
    alert("Done! At-risk members have been notified.");
    setIsPulseRunning(false);
  };

  const handleAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await sendAnnouncement(announcement.title, announcement.content);
    if (res.success) {
      alert("Message sent to all members!");
      setShowAnnouncementModal(false);
      setAnnouncement({ title: '', content: '' });
    }
  };

  const handleUpdateCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCall(true);
    try {
      const fullDate = `${nextCallData.date}T${nextCallData.time}:00-04:00`;
      const res = await updateNextCall(fullDate, nextCallData.zoomUrl, "Live Call", "Weekly live mastermind session.");
      if (res.success) {
        alert("Call scheduled!");
        setShowCallModal(false);
        window.location.reload();
      } else {
        alert(`Error: ${res.error}`);
      }
    } catch {
      alert("Error scheduling call. Check your date and time.");
    } finally {
      setIsSavingCall(false);
    }
  };

  const handleTriggerPreview = async () => {
    setIsTriggeringPreview(true);
    try {
      const res = await triggerAdminPreview();
      alert(res.success ? "Preview email sent! Check your inbox." : `Error: ${res.error}`);
    } catch {
      alert("Failed to send preview.");
    } finally {
      setIsTriggeringPreview(false);
    }
  };

  const handleTriggerCohort = async () => {
    if (!confirm("Send onboarding emails to ALL approved members?")) return;
    setIsTriggeringCohort(true);
    try {
      const res = await triggerCohortOnboarding();
      alert(res.success ? `Onboarding emails sent to ${res.results?.length} members!` : `Error: ${res.error}`);
    } catch {
      alert("Failed to send onboarding emails.");
    } finally {
      setIsTriggeringCohort(false);
    }
  };

  const handleManualInvite = async (email: string, fullName: string) => {
    setIsInviting(email);
    try {
      const res = await sendPortalInvite(email, fullName);
      alert(res.success ? res.message : `Error: ${res.error}`);
    } catch {
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
    } catch {
      alert("Failed to send invite.");
    } finally {
      setIsManualInviting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Admin</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Your members, revenue, and tools at a glance.</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Link href="/portal/vault">
          <button className="px-4 py-2.5 bg-white border border-brand-navy/10 rounded-xl text-sm font-bold text-brand-navy hover:border-brand-orange/30 transition-all">
            Vault
          </button>
        </Link>
        <Link href="/admin/curriculum">
          <button className="px-4 py-2.5 bg-white border border-brand-navy/10 rounded-xl text-sm font-bold text-brand-navy hover:border-brand-orange/30 transition-all">
            Content
          </button>
        </Link>
        <button onClick={() => setShowAnnouncementModal(true)} className="px-4 py-2.5 bg-brand-orange text-white rounded-xl text-sm font-bold hover:bg-brand-orange/90 transition-all">
          Broadcast
        </button>
        <button onClick={() => setShowCallModal(true)} className="px-4 py-2.5 bg-brand-navy text-white rounded-xl text-sm font-bold hover:bg-brand-black transition-all">
          Schedule Call
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-4">
          <p className="text-xs font-bold text-brand-gray mb-1">Members</p>
          <p className="text-2xl font-black text-brand-navy">{stats?.totalMembers || 0}</p>
          <p className="text-xs text-brand-gray mt-1">{stats?.proMembers || 0} Pro · {stats?.standardMembers || 0} Std</p>
        </div>
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-4">
          <p className="text-xs font-bold text-brand-gray mb-1">Revenue</p>
          <p className="text-2xl font-black text-brand-navy">${(revenueData?.totalRevenue || 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-4">
          <p className="text-xs font-bold text-brand-gray mb-1">Avg. Completion</p>
          <p className="text-2xl font-black text-brand-navy">{stats?.avgCompletion || 0}%</p>
        </div>
        <Link href="/admin/applications" className="bg-white rounded-2xl border border-brand-navy/5 p-4 hover:border-brand-orange/30 transition-all">
          <p className="text-xs font-bold text-brand-gray mb-1">Pending Apps</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-black text-brand-navy">{stats?.pendingApps || 0}</p>
            {(stats?.pendingApps || 0) > 0 && <span className="text-xs font-bold text-brand-orange">Review →</span>}
          </div>
        </Link>
      </div>

      {/* Invite Members */}
      <div className="bg-brand-navy rounded-2xl p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black text-white">Invite Members</p>
            <p className="text-xs text-white/50 mt-0.5">Send portal access emails to new or existing members.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2.5 bg-white/10 border border-white/20 text-white rounded-xl text-sm font-bold hover:bg-white/20 transition-all"
            >
              Single Invite
            </button>
            <button
              onClick={handleTriggerPreview}
              disabled={isTriggeringPreview}
              className="px-4 py-2.5 bg-white/10 border border-white/20 text-white rounded-xl text-sm font-bold hover:bg-white/20 transition-all disabled:opacity-50"
            >
              {isTriggeringPreview ? "Sending..." : "Preview Email"}
            </button>
            <button
              onClick={handleTriggerCohort}
              disabled={isTriggeringCohort}
              className="px-4 py-2.5 bg-brand-orange text-white rounded-xl text-sm font-bold hover:bg-brand-orange/90 transition-all disabled:opacity-50"
            >
              {isTriggeringCohort ? "Sending..." : "Invite All Approved"}
            </button>
          </div>
        </div>
      </div>

      {/* Two-column: Activity + At Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Member Activity */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-sm font-bold text-brand-navy">Member Activity</p>

          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white rounded-xl border border-brand-navy/5 p-3 text-center">
              <p className="text-lg font-black text-brand-navy">{mastermindActivity?.profilesCompleted || 0}</p>
              <p className="text-xs text-brand-gray">Profiles</p>
            </div>
            <div className="bg-white rounded-xl border border-brand-navy/5 p-3 text-center">
              <p className="text-lg font-black text-brand-orange">{mastermindActivity?.activeToday || 0}</p>
              <p className="text-xs text-brand-gray">Active Today</p>
            </div>
            <div className="bg-white rounded-xl border border-brand-navy/5 p-3 text-center">
              <p className="text-lg font-black text-brand-navy">{mastermindActivity?.watchedWeek6 || 0}</p>
              <p className="text-xs text-brand-gray">Watched W6</p>
            </div>
            <div className="bg-white rounded-xl border border-brand-navy/5 p-3 text-center">
              <p className="text-lg font-black text-brand-gray/40">{mastermindActivity?.inactive || 0}</p>
              <p className="text-xs text-brand-gray">Inactive</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-4">
            <p className="text-xs font-bold text-brand-gray mb-3">Recent</p>
            {recentActivity.length > 0 ? (
              <div className="space-y-2">
                {recentActivity.map((act: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-brand-navy/5 last:border-0">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-brand-navy truncate">{act.profiles?.full_name || 'Unknown'}</p>
                      <p className="text-xs text-brand-gray truncate">Completed: {act.modules?.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-brand-gray py-4 text-center">No recent activity</p>
            )}
          </div>
        </div>

        {/* At Risk */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-sm font-bold text-brand-navy">Needs Attention</p>

          <div className="bg-white rounded-2xl border border-brand-navy/5 p-4 space-y-3">
            {atRisk.length > 0 ? (
              <>
                {atRisk.slice(0, 5).map((member: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-brand-navy/5 last:border-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-brand-navy truncate">{member.full_name}</p>
                        <p className="text-xs text-brand-gray">{member.status === 'pending_profile' ? 'No profile' : 'No progress'}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleManualInvite(member.email, member.full_name)}
                      disabled={isInviting === member.email}
                      className="text-xs font-bold text-brand-orange hover:text-brand-navy transition-colors shrink-0 disabled:opacity-50"
                    >
                      {isInviting === member.email ? '...' : 'Nudge'}
                    </button>
                  </div>
                ))}
                {atRisk.length > 5 && (
                  <p className="text-xs text-brand-gray text-center pt-1">+{atRisk.length - 5} more</p>
                )}
              </>
            ) : (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-brand-navy">All good</p>
                <p className="text-xs text-brand-gray">No members need attention right now.</p>
              </div>
            )}
          </div>

          <button
            onClick={handlePulse}
            disabled={isPulseRunning}
            className="w-full px-4 py-3 bg-white border border-brand-navy/10 rounded-xl text-sm font-bold text-brand-navy hover:border-brand-orange/30 transition-all disabled:opacity-50"
          >
            {isPulseRunning ? "Sending..." : "Send Check-In to Inactive"}
          </button>
        </div>
      </div>

      {/* Two-column: Vault + System */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vault */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-brand-navy">Top Vault Downloads</p>
            <Link href="/portal/vault" className="text-xs font-bold text-brand-orange hover:text-brand-navy transition-colors">Manage →</Link>
          </div>
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-4">
            {vaultStats.length > 0 ? (
              <div className="space-y-2">
                {vaultStats.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-brand-navy/5 last:border-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-black text-brand-orange w-5 text-center">{i + 1}</span>
                      <p className="text-sm font-bold text-brand-navy truncate">{item.title}</p>
                    </div>
                    <span className="text-xs text-brand-gray shrink-0">{item.download_count} downloads</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-brand-gray py-4 text-center">No downloads yet</p>
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-brand-navy">System Status</p>
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-4 space-y-2">
            {[
              { label: "Database", status: health?.database },
              { label: "Auth", status: health?.auth },
              { label: "Automations", status: "operational" },
              { label: "Email", status: health?.email },
            ].map((sys, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-brand-navy/5 last:border-0">
                <span className="text-sm font-bold text-brand-navy">{sys.label}</span>
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", sys.status === 'operational' ? "bg-green-500" : "bg-red-500")} />
                  <span className={cn("text-xs font-bold", sys.status === 'operational' ? "text-green-600" : "text-red-500")}>
                    {sys.status === 'operational' ? 'OK' : sys.status || 'Unknown'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-black text-brand-navy">Send Broadcast</h3>
              <button onClick={() => setShowAnnouncementModal(false)} className="p-1.5 hover:bg-brand-navy/5 rounded-lg">
                <X className="w-5 h-5 text-brand-gray" />
              </button>
            </div>
            <form onSubmit={handleAnnouncement} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-gray mb-1 block">Subject</label>
                <input
                  type="text" required
                  placeholder="e.g. New resource added"
                  value={announcement.title}
                  onChange={(e) => setAnnouncement({...announcement, title: e.target.value})}
                  className="w-full border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy focus:border-brand-orange/30 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-gray mb-1 block">Message</label>
                <textarea
                  required rows={4}
                  placeholder="Write your message..."
                  value={announcement.content}
                  onChange={(e) => setAnnouncement({...announcement, content: e.target.value})}
                  className="w-full border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy focus:border-brand-orange/30 outline-none resize-none"
                />
              </div>
              <button type="submit" className="w-full bg-brand-navy text-white rounded-xl py-3 text-sm font-bold hover:bg-brand-black transition-colors">
                Send to All Members
              </button>
            </form>
          </div>
        </div>
      )}

      {showCallModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-black text-brand-navy">Schedule Live Call</h3>
              <button onClick={() => setShowCallModal(false)} className="p-1.5 hover:bg-brand-navy/5 rounded-lg">
                <X className="w-5 h-5 text-brand-gray" />
              </button>
            </div>
            <form onSubmit={handleUpdateCall} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-brand-gray mb-1 block">Date</label>
                  <input
                    type="date" required
                    value={nextCallData.date}
                    onChange={(e) => setNextCallData({...nextCallData, date: e.target.value})}
                    className="w-full border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy focus:border-brand-orange/30 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-brand-gray mb-1 block">Time</label>
                  <input
                    type="time" required
                    value={nextCallData.time}
                    onChange={(e) => setNextCallData({...nextCallData, time: e.target.value})}
                    className="w-full border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy focus:border-brand-orange/30 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-brand-gray mb-1 block">Zoom Link</label>
                <input
                  type="url" required
                  placeholder="https://zoom.us/j/..."
                  value={nextCallData.zoomUrl}
                  onChange={(e) => setNextCallData({...nextCallData, zoomUrl: e.target.value})}
                  className="w-full border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy focus:border-brand-orange/30 outline-none"
                />
              </div>
              <button type="submit" disabled={isSavingCall} className="w-full bg-brand-navy text-white rounded-xl py-3 text-sm font-bold hover:bg-brand-black transition-colors disabled:opacity-50">
                {isSavingCall ? "Saving..." : "Save Schedule"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showInviteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-black text-brand-navy">Invite Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="p-1.5 hover:bg-brand-navy/5 rounded-lg">
                <X className="w-5 h-5 text-brand-gray" />
              </button>
            </div>
            <form onSubmit={handleManualInviteSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-gray mb-1 block">Full Name</label>
                <input
                  type="text" required
                  placeholder="Dr. Jane Doe"
                  value={inviteData.fullName}
                  onChange={(e) => setInviteData({...inviteData, fullName: e.target.value})}
                  className="w-full border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy focus:border-brand-orange/30 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-gray mb-1 block">Email</label>
                <input
                  type="email" required
                  placeholder="doctor@example.com"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({...inviteData, email: e.target.value})}
                  className="w-full border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy focus:border-brand-orange/30 outline-none"
                />
              </div>
              <button type="submit" disabled={isManualInviting} className="w-full bg-brand-navy text-white rounded-xl py-3 text-sm font-bold hover:bg-brand-black transition-colors disabled:opacity-50">
                {isManualInviting ? "Sending..." : "Send Invite"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
