"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import {
  Send, Bell, BarChart3, FileText, Megaphone, Video,
  Loader2, CheckCircle, XCircle, Clock, ArrowLeft, MessageSquare, Sparkles, RefreshCw,
} from "lucide-react";
import Link from "next/link";
import {
  sendAnnouncementToMembers,
  sendCallReminder,
  sendKPIReminder,
  sendWeeklyRecap,
  getScheduledPrompt,
  postCommunityPrompt,
  autoPostDailyPrompt,
} from "@/app/actions/comms-actions";
import { useRouter } from "next/navigation";

interface SentLog {
  id: string;
  user_email: string;
  event_type: string;
  status: string;
  created_at: string;
  error_message: string | null;
}

function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

const eventTypeLabels: Record<string, string> = {
  call_reminder_manual: "Call Reminder",
  kpi_reminder_manual: "KPI Reminder",
  announcement: "Announcement",
  weekly_recap_w1: "Week 1 Recap", weekly_recap_w2: "Week 2 Recap",
  weekly_recap_w3: "Week 3 Recap", weekly_recap_w4: "Week 4 Recap",
  weekly_recap_w5: "Week 5 Recap", weekly_recap_w6: "Week 6 Recap",
  weekly_recap_w7: "Week 7 Recap", weekly_recap_w8: "Week 8 Recap",
  pulse_nudge: "Re-engagement Nudge",
  reengagement: "Re-engagement",
  lead_free_training: "Free Session (Lead)",
  lead_quiz_results: "Quiz Results (Lead)",
  lead_quiz_resend: "Quiz Resend",
  mastermind_outreach: "Hunter Outreach",
  mastermind_followup: "Hunter Follow-Up",
};

function CommunityPromptSection() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();

  const generatePrompt = async () => {
    setLoading(true);
    const res = await getScheduledPrompt();
    if (res.data) setPrompt(res.data);
    else setPrompt("No prompt scheduled for today (weekends are off).");
    setLoading(false);
  };

  const handlePost = async () => {
    if (!prompt.trim()) return;
    setPosting(true);
    setResult(null);
    const res = await postCommunityPrompt(prompt.trim());
    setResult(res.message || (res.success ? "Posted!" : "Failed"));
    setPosting(false);
    if (res.success) setPrompt("");
    router.refresh();
  };

  const handleAutoPost = async () => {
    setPosting(true);
    setResult(null);
    const res = await autoPostDailyPrompt();
    setResult(res.message || (res.success ? "Posted!" : "Failed"));
    setPosting(false);
    router.refresh();
  };

  return (
    <EliteCard className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-brand-orange" />
        <h3 className="text-lg font-black text-brand-navy">Community Discussion Prompt</h3>
      </div>
      <p className="text-sm text-brand-gray font-medium mb-4">
        Post a discussion prompt to the community to keep engagement up. Auto-generate based on the day or write your own.
      </p>

      <div className="flex gap-2 mb-3">
        <BrandButton variant="ghost" size="sm" onClick={generatePrompt} disabled={loading} className="gap-1.5">
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          Generate Today&apos;s Prompt
        </BrandButton>
        <BrandButton variant="ghost" size="sm" onClick={handleAutoPost} disabled={posting} className="gap-1.5">
          {posting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
          Auto-Post
        </BrandButton>
      </div>

      <textarea
        rows={5}
        placeholder="Write a discussion prompt or click 'Generate' to get one based on today's theme...&#10;&#10;Monday = Week kickoff&#10;Tuesday = Clinical discussion&#10;Wednesday = Win Wednesday&#10;Thursday = Numbers & business&#10;Friday = KPIs & reflection"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40 resize-none mb-3"
      />

      <BrandButton
        variant="accent"
        className="w-full py-3 gap-2"
        onClick={handlePost}
        disabled={posting || !prompt.trim()}
      >
        {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        Post to Community
      </BrandButton>
      {result && <p className="text-xs text-center text-brand-gray font-medium mt-2">{result}</p>}
    </EliteCard>
  );
}

export function CommsClient({ sentHistory }: { sentHistory: SentLog[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"send" | "history">("send");

  // Announcement
  const [annTitle, setAnnTitle] = useState("");
  const [annBody, setAnnBody] = useState("");
  const [annSending, setAnnSending] = useState(false);
  const [annResult, setAnnResult] = useState<string | null>(null);

  // Call Reminder
  const [callDate, setCallDate] = useState("");
  const [callTime, setCallTime] = useState("12:00 PM");
  const [zoomLink, setZoomLink] = useState("");
  const [callSending, setCallSending] = useState(false);
  const [callResult, setCallResult] = useState<string | null>(null);

  // KPI Reminder
  const [kpiSending, setKpiSending] = useState(false);
  const [kpiResult, setKpiResult] = useState<string | null>(null);

  // Weekly Recap
  const [recapWeek, setRecapWeek] = useState("1");
  const [recapTopics, setRecapTopics] = useState("");
  const [recapHomework, setRecapHomework] = useState("");
  const [recapNextCall, setRecapNextCall] = useState("");
  const [recapSending, setRecapSending] = useState(false);
  const [recapResult, setRecapResult] = useState<string | null>(null);

  const handleAnnouncement = async () => {
    if (!annTitle.trim() || !annBody.trim()) return;
    setAnnSending(true);
    setAnnResult(null);
    const result = await sendAnnouncementToMembers(annTitle.trim(), annBody.trim());
    setAnnResult(result.message || (result.success ? "Sent!" : "Failed"));
    setAnnSending(false);
    if (result.success) { setAnnTitle(""); setAnnBody(""); }
    router.refresh();
  };

  const handleCallReminder = async () => {
    if (!callDate.trim() || !zoomLink.trim()) return;
    setCallSending(true);
    setCallResult(null);
    const result = await sendCallReminder(callDate.trim(), callTime, zoomLink.trim());
    setCallResult(result.message || (result.success ? "Sent!" : "Failed"));
    setCallSending(false);
    router.refresh();
  };

  const handleKPIReminder = async () => {
    setKpiSending(true);
    setKpiResult(null);
    const result = await sendKPIReminder();
    setKpiResult(result.message || (result.success ? "Sent!" : "Failed"));
    setKpiSending(false);
    router.refresh();
  };

  const handleRecap = async () => {
    if (!recapTopics.trim() || !recapHomework.trim() || !recapNextCall.trim()) return;
    setRecapSending(true);
    setRecapResult(null);
    const result = await sendWeeklyRecap(Number(recapWeek), recapTopics.trim(), recapHomework.trim(), recapNextCall.trim());
    setRecapResult(result.message || (result.success ? "Sent!" : "Failed"));
    setRecapSending(false);
    if (result.success) { setRecapTopics(""); setRecapHomework(""); }
    router.refresh();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-brand-gray hover:text-brand-orange transition-colors mb-2 inline-block">
            <ArrowLeft className="w-3 h-3 inline mr-1" /> Admin
          </Link>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight flex items-center gap-3">
            <Megaphone className="w-7 h-7 text-brand-orange" />
            Communications
          </h1>
          <p className="text-sm text-brand-gray font-medium mt-1">
            Send reminders, announcements, and recaps to your mastermind members.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("send")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "send" ? "bg-brand-navy text-white" : "text-brand-navy/50 hover:text-brand-navy bg-white border border-brand-navy/10"}`}
        >
          Send
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "history" ? "bg-brand-navy text-white" : "text-brand-navy/50 hover:text-brand-navy bg-white border border-brand-navy/10"}`}
        >
          Sent History ({sentHistory.length})
        </button>
      </div>

      {activeTab === "send" && (
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Call Reminder */}
            <EliteCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-5 h-5 text-brand-orange" />
                <h3 className="text-lg font-black text-brand-navy">Call Reminder</h3>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Date (e.g. Tuesday, May 6)"
                  value={callDate}
                  onChange={(e) => setCallDate(e.target.value)}
                  className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40"
                />
                <select
                  value={callTime}
                  onChange={(e) => setCallTime(e.target.value)}
                  className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40"
                >
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>7:00 PM</option>
                  <option>8:00 PM</option>
                </select>
                <input
                  type="text"
                  placeholder="Zoom link"
                  value={zoomLink}
                  onChange={(e) => setZoomLink(e.target.value)}
                  className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40"
                />
                <BrandButton
                  variant="primary"
                  className="w-full py-3 gap-2"
                  onClick={handleCallReminder}
                  disabled={callSending || !callDate.trim() || !zoomLink.trim()}
                >
                  {callSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Send Call Reminder
                </BrandButton>
                {callResult && <p className="text-xs text-center text-brand-gray font-medium">{callResult}</p>}
              </div>
            </EliteCard>

            {/* KPI Reminder */}
            <EliteCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-brand-orange" />
                <h3 className="text-lg font-black text-brand-navy">KPI Reminder</h3>
              </div>
              <p className="text-sm text-brand-gray font-medium mb-4">
                Send a reminder to all members to submit their weekly KPIs. Best sent on Friday afternoon.
              </p>
              <BrandButton
                variant="accent"
                className="w-full py-3 gap-2"
                onClick={handleKPIReminder}
                disabled={kpiSending}
              >
                {kpiSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
                Send KPI Reminder to All
              </BrandButton>
              {kpiResult && <p className="text-xs text-center text-brand-gray font-medium mt-2">{kpiResult}</p>}
            </EliteCard>
          </div>

          {/* Weekly Recap */}
          <EliteCard className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-brand-orange" />
              <h3 className="text-lg font-black text-brand-navy">Weekly Recap</h3>
            </div>
            <p className="text-sm text-brand-gray font-medium mb-4">
              Send after each coaching call. Includes what you covered, homework, and next call date.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-brand-navy/60 mb-1 block">Week Number</label>
                <select
                  value={recapWeek}
                  onChange={(e) => setRecapWeek(e.target.value)}
                  className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40"
                >
                  {[1,2,3,4,5,6,7,8,9,10,11,12,13].map(n => (
                    <option key={n} value={n}>Week {n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-brand-navy/60 mb-1 block">Next Call Date</label>
                <input
                  type="text"
                  placeholder="e.g. Tuesday, May 13 at 12pm ET"
                  value={recapNextCall}
                  onChange={(e) => setRecapNextCall(e.target.value)}
                  className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs font-bold text-brand-navy/60 mb-1 block">Topics Covered</label>
              <textarea
                rows={3}
                placeholder="What did you cover on the call? e.g.&#10;- Identity framework and why it matters&#10;- How to answer 'what kind of chiropractor are you?'&#10;- Live hot seat with Dr. Gabriel"
                value={recapTopics}
                onChange={(e) => setRecapTopics(e.target.value)}
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40 resize-none"
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-bold text-brand-navy/60 mb-1 block">Homework Assignment</label>
              <textarea
                rows={2}
                placeholder="e.g. Write your 30-second identity statement and practice it 5 times before next call."
                value={recapHomework}
                onChange={(e) => setRecapHomework(e.target.value)}
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40 resize-none"
              />
            </div>
            <BrandButton
              variant="primary"
              className="w-full py-3 gap-2 mt-3"
              onClick={handleRecap}
              disabled={recapSending || !recapTopics.trim() || !recapHomework.trim() || !recapNextCall.trim()}
            >
              {recapSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send Weekly Recap
            </BrandButton>
            {recapResult && <p className="text-xs text-center text-brand-gray font-medium mt-2">{recapResult}</p>}
          </EliteCard>

          {/* Announcement */}
          <EliteCard className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Megaphone className="w-5 h-5 text-brand-orange" />
              <h3 className="text-lg font-black text-brand-navy">Custom Announcement</h3>
            </div>
            <p className="text-sm text-brand-gray font-medium mb-4">
              Send a custom email to all paid members. Use for schedule changes, big news, or anything else.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-brand-navy/60 mb-1 block">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Schedule Change — This Week's Call Moved to Thursday"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-navy/60 mb-1 block">Message</label>
                <textarea
                  rows={4}
                  placeholder="Write your announcement..."
                  value={annBody}
                  onChange={(e) => setAnnBody(e.target.value)}
                  className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40 resize-none"
                />
              </div>
              <BrandButton
                variant="accent"
                className="w-full py-3 gap-2"
                onClick={handleAnnouncement}
                disabled={annSending || !annTitle.trim() || !annBody.trim()}
              >
                {annSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Megaphone className="w-4 h-4" />}
                Send Announcement to All Members
              </BrandButton>
              {annResult && <p className="text-xs text-center text-brand-gray font-medium mt-2">{annResult}</p>}
            </div>
          </EliteCard>

          {/* Community Prompt */}
          <CommunityPromptSection />
        </div>
      )}

      {activeTab === "history" && (
        <EliteCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-brand-navy/5">
                  <th className="px-5 py-3 text-xs font-bold text-brand-navy/40 uppercase tracking-wider">To</th>
                  <th className="px-5 py-3 text-xs font-bold text-brand-navy/40 uppercase tracking-wider">Type</th>
                  <th className="px-5 py-3 text-xs font-bold text-brand-navy/40 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-xs font-bold text-brand-navy/40 uppercase tracking-wider">Sent</th>
                </tr>
              </thead>
              <tbody>
                {sentHistory.map((log) => (
                  <tr key={log.id} className="border-b border-brand-navy/5 hover:bg-brand-navy/[0.02]">
                    <td className="px-5 py-3 text-sm font-medium text-brand-navy">{log.user_email}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs font-bold text-brand-navy/60 bg-brand-navy/5 px-2 py-1 rounded-lg">
                        {eventTypeLabels[log.event_type] || log.event_type}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {log.status === "sent" ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                          <CheckCircle className="w-3 h-3" /> Sent
                        </span>
                      ) : log.status === "failed" ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-red-500">
                          <XCircle className="w-3 h-3" /> Failed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                          <Clock className="w-3 h-3" /> {log.status}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-xs text-brand-gray font-medium">{timeAgo(log.created_at)}</td>
                  </tr>
                ))}
                {sentHistory.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center text-sm text-brand-gray font-medium">
                      No emails sent yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </EliteCard>
      )}
    </div>
  );
}
