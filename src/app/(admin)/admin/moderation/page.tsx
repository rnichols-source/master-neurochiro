"use client";

import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Calendar, 
  Briefcase, 
  UserPlus, 
  Flag,
  Search,
  Filter,
  ChevronRight,
  Eye,
  X
} from "lucide-react";
import { useState } from "react";
import { Automations } from "@/lib/automations";

export default function ModerationCenter() {
  const [autoApprove, setAutoApprove] = useState(true);
  const [scanLinks, setScanLinks] = useState(true);
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const queues = [
    { name: "Doctor Applications", count: 12, icon: UserPlus, color: "text-blue-500" },
    { name: "Seminar Listings", count: 8, icon: Calendar, color: "text-neuro-orange" },
    { name: "Job Postings", count: 15, icon: Briefcase, color: "text-green-500" },
    { name: "Flagged Content", count: 4, icon: Flag, color: "text-red-500" }
  ];

  const pendingItems = [
    { type: "Doctor App", target: "Dr. Alan Grant", date: "2h ago", status: "Reviewing" },
    { type: "Seminar", target: "Neuro-Scanning AU", date: "5h ago", status: "Pending" },
    { type: "Job", target: "Associate - Denver", date: "1d ago", status: "Pending" }
  ];

  const handleModeration = (action: 'APPROVE' | 'REJECT', item: any) => {
    Automations.onModerationAction("ADMIN_01", action, item.type, item.target);
    // In a real app, we would update the state here
  };

  const handleToggle = (setting: string, value: boolean, setter: (v: boolean) => void) => {
    setter(value);
    Automations.onSettingsToggle("ADMIN_01", setting, value);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 text-white">
      <header>
        <div className="flex items-center gap-2 mb-2 text-red-500">
          <ShieldAlert className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Integrity Control</span>
        </div>
        <h1 className="text-4xl font-heading font-black">Moderation & Approvals</h1>
        <p className="text-gray-400 mt-2 text-lg font-medium">Global queue management and platform safety.</p>
      </header>

      {/* Moderation Queues */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {queues.map((q, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-3xl p-6 group hover:border-white/10 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${q.color}`}>
                <q.icon className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black">{q.count}</span>
            </div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{q.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active Review Queue */}
          <section className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-heading font-black">Priority Review Queue</h3>
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 rounded-xl text-gray-400"><Filter className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              {pendingItems.map((item, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-white/5 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-gray-500 group-hover:text-neuro-orange" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-neuro-orange uppercase tracking-widest">{item.type}</span>
                        <span className="text-[10px] text-gray-500">• {item.date}</span>
                      </div>
                      <h4 className="font-bold text-lg">{item.target}</h4>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleModeration('REJECT', item)}
                      className="px-4 py-2 bg-red-500/10 text-red-500 font-bold rounded-xl text-xs hover:bg-red-500 hover:text-white transition-all"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => handleModeration('APPROVE', item)}
                      className="px-4 py-2 bg-green-500 text-white font-bold rounded-xl text-xs hover:bg-green-600 transition-all"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setIsQueueModalOpen(true)}
              className="w-full py-4 text-xs font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors bg-white/5"
            >
              View Full Queue
            </button>
          </section>

          {/* Suspicious Behavior / Reports */}
          <section className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-heading font-black flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" /> Behavior Alerts
              </h3>
              <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-[10px] font-black rounded-full uppercase">4 Events</span>
            </div>
            <div className="space-y-4">
              {[
                { event: "Rapid Job Posting", user: "Dr. M. Smith", risk: "Medium", details: "User posted 5 jobs in under 2 minutes. Potential automated script detected." },
                { event: "Multiple Failed Logins", user: "IP: 124.5.6.2", risk: "High", details: "24 failed login attempts from a single IP address within 5 minutes." },
                { event: "Bulk Student Messaging", user: "Dr. J. Doe", risk: "Medium", details: "User sent identical messages to 50+ students in one hour." }
              ].map((ev, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${ev.risk === 'High' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                    <div>
                      <p className="text-sm font-bold">{ev.event}</p>
                      <p className="text-[10px] text-gray-400">Target: {ev.user}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedAlert(ev)}
                    className="p-2 hover:text-neuro-orange transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Policy Control */}
          <section className="bg-neuro-navy rounded-[2rem] p-8 relative overflow-hidden shadow-2xl">
            <h3 className="text-xl font-heading font-black mb-6">Moderation Logic</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">Auto-approve Seminars</span>
                <button 
                  onClick={() => handleToggle("Auto-approve Seminars", !autoApprove, setAutoApprove)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${autoApprove ? 'bg-neuro-orange' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${autoApprove ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">Scan for External Links</span>
                <button 
                  onClick={() => handleToggle("Scan for External Links", !scanLinks, setScanLinks)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${scanLinks ? 'bg-neuro-orange' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${scanLinks ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
              <button 
                onClick={() => setIsGuidelinesModalOpen(true)}
                className="w-full mt-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
              >
                Update Guidelines
              </button>
            </div>
          </section>

          {/* Audit Logs */}
          <section className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-6">Admin Audit Log</h4>
            <div className="space-y-4">
              {[
                { admin: "Admin_01", action: "Approved Doc App", target: "Dr. West" },
                { admin: "System", action: "Flagged Content", target: "Post #425" }
              ].map((log, i) => (
                <div key={i} className="text-[10px] leading-relaxed">
                  <span className="text-neuro-orange font-bold">{log.admin}</span>
                  <span className="text-gray-400 mx-1">{log.action} for</span>
                  <span className="text-white font-bold">{log.target}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Guidelines Modal */}
      {isGuidelinesModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neuro-navy border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-black">Moderation Guidelines</h2>
              <button onClick={() => setIsGuidelinesModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <label className="block text-xs font-black uppercase text-gray-500">Global Policy Template</label>
                <textarea 
                  className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-neuro-orange"
                  defaultValue="All community posts must adhere to the clinical integrity standards. No external medical advice that hasn't been peer-reviewed..."
                />
              </div>
              <button onClick={() => setIsGuidelinesModalOpen(false)} className="w-full py-4 bg-neuro-orange text-white font-black uppercase tracking-widest rounded-2xl">Save & Deploy Policy</button>
            </div>
          </div>
        </div>
      )}

      {/* Full Queue Modal */}
      {isQueueModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neuro-navy border border-white/10 rounded-[2.5rem] w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-black">Master Review Queue</h2>
              <button onClick={() => setIsQueueModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 overflow-y-auto flex-1 space-y-4">
              {[...pendingItems, ...pendingItems, ...pendingItems].map((item, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 text-xs font-black">{i + 1}</div>
                    <div>
                      <p className="font-bold">{item.target}</p>
                      <p className="text-[10px] text-neuro-orange uppercase font-black">{item.type}</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold hover:underline">View Assets</button>
                </div>
              ))}
            </div>
            <div className="p-8 border-t border-white/5 bg-white/5">
              <p className="text-xs text-center text-gray-500 font-bold">34 Items Remaining in Global Queue</p>
            </div>
          </div>
        </div>
      )}

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neuro-navy border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-red-500/10">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-black">Incident Report</h2>
              </div>
              <button onClick={() => setSelectedAlert(null)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Event Type</p>
                <p className="text-lg font-bold">{selectedAlert.event}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Suspect/Target</p>
                <p className="text-lg font-bold">{selectedAlert.user}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Description</p>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">{selectedAlert.details}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setSelectedAlert(null)} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl font-black uppercase text-[10px] tracking-widest">Dismiss</button>
                <button onClick={() => setSelectedAlert(null)} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-black uppercase text-[10px] tracking-widest">Freeze Account</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
