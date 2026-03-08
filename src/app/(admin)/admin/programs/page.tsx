"use client";

import { 
  GraduationCap, 
  Video, 
  Users, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  BarChart3,
  Calendar,
  DollarSign,
  Plus,
  X
} from "lucide-react";
import { useState } from "react";
import { Automations } from "@/lib/automations";

export default function ProgramOperations() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  const programs = [
    { name: "Clinical Mastermind", enrollment: 450, completion: "92%", revenue: "$85k", active: true, description: "Advanced clinical protocols for high-performance practices." },
    { name: "Seminar Series", enrollment: 820, completion: "75%", revenue: "$42k", active: true, description: "Monthly live seminars covering the latest in neuro-chiropractic research." }
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 text-white">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-black">Program Operations</h1>
          <p className="text-gray-400 mt-2 text-lg">LMS performance and cohort management center.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-neuro-orange text-white px-8 py-4 rounded-2xl shadow-xl hover:bg-neuro-orange-light transition-all transform hover:scale-105 flex items-center gap-3"
        >
          <Plus className="w-5 h-5" />
          <span className="font-black uppercase tracking-widest text-sm">Create Program</span>
        </button>
      </header>

      {/* Program GMV & Enrollment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-500/10 rounded-2xl text-green-500">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Program Revenue</p>
              <p className="text-3xl font-black">$229,450</p>
            </div>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[75%]"></div>
          </div>
          <p className="text-[10px] text-gray-400 mt-3 font-bold uppercase tracking-widest">75% of Monthly Goal</p>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Learners</p>
              <p className="text-3xl font-black">1,732</p>
            </div>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[88%]"></div>
          </div>
          <p className="text-[10px] text-gray-400 mt-3 font-bold uppercase tracking-widest">88% Engagement Rate</p>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-neuro-orange/10 rounded-2xl text-neuro-orange">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Certifications</p>
              <p className="text-3xl font-black">124</p>
            </div>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-neuro-orange w-[42%]"></div>
          </div>
          <p className="text-[10px] text-gray-400 mt-3 font-bold uppercase tracking-widest">This Quarter</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active Programs List */}
          <section className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-heading font-black">Program Roster</h3>
              <button className="text-xs font-bold text-neuro-orange hover:underline">View All Content</button>
            </div>
            <div className="divide-y divide-white/5">
              {programs.map((p, i) => (
                <div key={i} className="p-8 flex items-center justify-between group hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-2xl">
                      {p.name === 'Seminar Series' ? '📅' : '🧠'}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{p.name}</h4>
                      <p className="text-sm text-gray-400 mt-1">{p.enrollment} Members Enrolled</p>
                    </div>
                  </div>
                  <div className="flex gap-12 text-center">
                    <div>
                      <p className="text-lg font-black text-green-500">{p.completion}</p>
                      <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Completion</p>
                    </div>
                    <div>
                      <p className="text-lg font-black">{p.revenue}</p>
                      <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Rev/Mo</p>
                    </div>
                    <button 
                      onClick={() => setSelectedProgram(p)}
                      className="p-3 bg-white/5 rounded-2xl group-hover:bg-neuro-orange transition-all"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Content Performance */}
          <section className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-xl font-heading font-black mb-8">Top Performing Modules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Neuro-Scanning foundations", views: "12.4k", rating: "4.9/5" },
                { title: "Vagal Tone Clinical Protocols", views: "8.2k", rating: "5.0/5" },
                { title: "Initial Consultation Value", views: "7.1k", rating: "4.8/5" },
                { title: "HRV Mastery for Pediatrics", views: "6.4k", rating: "4.9/5" }
              ].map((m, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-neuro-orange/30 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-neuro-orange/10 rounded-xl text-neuro-orange">
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase">{m.views} views</span>
                  </div>
                  <h4 className="font-bold text-sm mb-2">{m.title}</h4>
                  <div className="flex items-center gap-1 text-[10px] font-black text-neuro-orange">
                    <TrendingUp className="w-3 h-3" /> {m.rating} Student Rating
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Certification Pipeline */}
          <section className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
            <h3 className="font-heading font-black text-lg mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-neuro-orange" /> Cert Pipeline
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400">Level 1: Clinical</span>
                <span className="text-xs font-black">84 Pending</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400">Level 2: Expert</span>
                <span className="text-xs font-black">12 Pending</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400">L3: Master</span>
                <span className="text-xs font-black">2 Pending</span>
              </div>
              <button 
                onClick={() => setIsReviewModalOpen(true)}
                className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
              >
                Review Applications
              </button>
            </div>
          </section>

          {/* Mastermind Engagement */}
          <section className="bg-[#1E293B] rounded-[2rem] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl"></div>
            <h3 className="text-xl font-heading font-black mb-6">Mastermind Live</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black text-neuro-orange uppercase tracking-widest mb-1">Next Call</p>
                <p className="text-sm font-bold">Clinical Deep Dive: Vagal Tone</p>
                <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Oct 15 @ 7PM EST
                </p>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-[10px] font-black text-gray-500 uppercase">RSVPs</span>
                <span className="text-sm font-black">124 Doctors</span>
              </div>
              <button 
                onClick={() => setIsBroadcastModalOpen(true)}
                className="w-full py-3 bg-blue-600 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg"
              >
                Broadcast Invite
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Create Program Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neuro-navy border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-black">Create New Program</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500">Program Title</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neuro-orange outline-none" placeholder="e.g. Mastermind Cohort B" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500">Description</label>
                <textarea className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neuro-orange outline-none" placeholder="Program overview..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500">Price (USD)</label>
                  <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neuro-orange outline-none" placeholder="997" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500">Category</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neuro-orange outline-none appearance-none">
                    <option>Clinical</option>
                    <option>Business</option>
                    <option>Technical</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={() => {
                  Automations.onBroadcastDispatched("ADMIN_01", { action: "Program Created" });
                  setIsCreateModalOpen(false);
                }}
                className="w-full py-4 bg-neuro-orange text-white font-black uppercase tracking-widest rounded-2xl"
              >
                Publish Program
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Applications Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neuro-navy border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-black">Certification Reviews</h2>
              <button onClick={() => setIsReviewModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 overflow-y-auto flex-1 space-y-4">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
                   <div>
                     <p className="font-bold text-sm">Dr. Application #{i*124}</p>
                     <p className="text-[10px] text-gray-500 uppercase font-black">Level 1: Clinical Foundations</p>
                   </div>
                   <div className="flex gap-2">
                     <button className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase hover:bg-white/10 transition-all">Review</button>
                     <button className="px-3 py-1 bg-green-500/20 text-green-500 rounded-lg text-[10px] font-black uppercase">Approve</button>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neuro-navy border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-black">Broadcast Mastermind Invite</h2>
              <button onClick={() => setIsBroadcastModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
               <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                 <p className="text-sm text-blue-400 font-medium">This will send a notification and email to 1,240 eligible doctors.</p>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-gray-500">Custom Message (Optional)</label>
                 <textarea className="w-full h-24 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" placeholder="Join us for a deep dive..." />
               </div>
               <button 
                 onClick={() => {
                   Automations.onBroadcastDispatched("ADMIN_01", { type: "Mastermind Invite" });
                   setIsBroadcastModalOpen(false);
                 }}
                 className="w-full py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl"
               >
                 Send Global Broadcast
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neuro-navy border border-white/10 rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl">
            <div className="p-10 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-neuro-orange/10 to-transparent">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{selectedProgram.name === 'Seminar Series' ? '📅' : '🧠'}</div>
                <h2 className="text-3xl font-black">{selectedProgram.name}</h2>
              </div>
              <button onClick={() => setSelectedProgram(null)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-10 space-y-8">
               <div>
                 <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mb-4">Program Overview</h4>
                 <p className="text-lg text-gray-300 leading-relaxed">{selectedProgram.description}</p>
               </div>
               <div className="grid grid-cols-3 gap-6">
                 <div className="p-4 bg-white/5 rounded-2xl">
                    <p className="text-[10px] font-black text-gray-500 uppercase">Enrolled</p>
                    <p className="text-xl font-black">{selectedProgram.enrollment}</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl">
                    <p className="text-[10px] font-black text-gray-500 uppercase">Completion</p>
                    <p className="text-xl font-black text-green-500">{selectedProgram.completion}</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl">
                    <p className="text-[10px] font-black text-gray-500 uppercase">Monthly Rev</p>
                    <p className="text-xl font-black">{selectedProgram.revenue}</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs">Edit Curriculum</button>
                 <button className="flex-1 py-4 bg-neuro-orange text-white rounded-2xl font-black uppercase tracking-widest text-xs">Manage Students</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
