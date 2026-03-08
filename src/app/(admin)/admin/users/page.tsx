"use client";

import { 
  Users, 
  GraduationCap, 
  Target, 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  BarChart3,
  MousePointerClick,
  ChevronRight,
  UserPlus,
  X
} from "lucide-react";
import { useState } from "react";
import { Automations } from "@/lib/automations";

export default function TalentIntelligence() {
  const [activeTab, setActiveTab] = useState('Students');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    { name: "Raymond Nichols", school: "Life University", grad: "2027", status: "Paid", matches: 12, engagement: 98, email: "ray@example.com", joined: "Jan 2024" },
    { name: "Sarah Miller", school: "Palmer College", grad: "2026", status: "Free", matches: 8, engagement: 85, email: "sarah@example.com", joined: "Mar 2024" },
    { name: "Jason Lee", school: "Parker University", grad: "2028", status: "Paid", matches: 15, engagement: 92, email: "jason@example.com", joined: "Feb 2024" }
  ];

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAuditProgram = () => {
    setIsAuditModalOpen(true);
    Automations.onBroadcastDispatched("ADMIN_01", { action: "Audit Program Requested" });
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 text-white">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-black">Talent & Member Intelligence</h1>
          <p className="text-gray-400 mt-2 text-lg">Deep analytics on the global NeuroChiro human capital pipeline.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
          {["Students", "Doctors", "Members"].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-neuro-orange text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Global Student Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Students", value: "8,420", trend: "+8%", icon: Users },
          { label: "Active Learners", value: "3,150", trend: "+12%", icon: GraduationCap },
          { label: "Paid Members", value: "1,240", trend: "+15%", icon: Star },
          { label: "Match Rate", value: "94%", trend: "+2%", icon: Target }
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-3xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-2xl text-neuro-orange">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-green-500">
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Distribution Analytics */}
          <section className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-xl font-heading font-black mb-8">School Distribution & Pipeline</h3>
            <div className="space-y-6">
              {[
                { school: "Life University", count: 1240, growth: "+5%", color: "bg-blue-500" },
                { school: "Palmer College", count: 980, growth: "+2%", color: "bg-purple-500" },
                { school: "Parker University", count: 850, growth: "+8%", color: "bg-orange-500" },
                { school: "Logan University", count: 640, growth: "+4%", color: "bg-green-500" }
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>{s.school}</span>
                    <span className="text-gray-400">{s.count} Students <span className="text-green-500 ml-2">{s.growth}</span></span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color}`} style={{ width: `${(s.count / 1240) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Student List / Moderation */}
          <section className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-heading font-black">Student Directory</h3>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search students..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs focus:outline-none focus:border-neuro-orange" 
                  />
                </div>
                <button className={`p-2 rounded-xl transition-colors ${searchQuery ? 'bg-neuro-orange text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              {filteredStudents.length > 0 ? (
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <tr>
                      <th className="px-8 py-4">Student</th>
                      <th className="px-8 py-4">School</th>
                      <th className="px-8 py-4">Grad</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredStudents.map((s, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-xs">{s.name[0]}</div>
                            <span className="font-bold text-sm">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-4 text-sm text-gray-400">{s.school}</td>
                        <td className="px-8 py-4 text-sm text-gray-400">{s.grad}</td>
                        <td className="px-8 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${s.status === 'Paid' ? 'bg-neuro-orange/20 text-neuro-orange' : 'bg-gray-500/20 text-gray-400'}`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <button 
                            onClick={() => setSelectedStudent(s)}
                            className="p-2 hover:text-neuro-orange transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-20 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="font-bold">No students found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Matching Engine Performance */}
          <section className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
            <h3 className="font-heading font-black text-lg mb-6">Engine Performance</h3>
            <div className="space-y-6">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-1">Matching Precision</p>
                <p className="text-2xl font-black">98.2%</p>
                <p className="text-[10px] text-gray-400 mt-1">Based on student-clinic interview conversion.</p>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Avg Time to Match</p>
                <p className="text-2xl font-black">12 Days</p>
                <p className="text-[10px] text-gray-400 mt-1">Platform average: 18 days.</p>
              </div>
            </div>
          </section>

          {/* Mentorship Analytics */}
          <section className="bg-neuro-navy rounded-[2rem] p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neuro-orange/10 blur-3xl"></div>
            <h3 className="text-xl font-heading font-black mb-6">Mentorship Flow</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">Total Requests</span>
                <span className="font-black">1,450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">Approved</span>
                <span className="font-black text-green-500">84%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">Completion</span>
                <span className="font-black text-neuro-orange">92%</span>
              </div>
              <button 
                onClick={handleAuditProgram}
                className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
              >
                Audit Program
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Audit Modal */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neuro-navy border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-black">Mentorship Audit</h2>
              <button onClick={() => setIsAuditModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <p className="text-gray-400">Full analysis of mentorship engagement and completion rates.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Avg Response Time</p>
                  <p className="text-xl font-black mt-1">4.2 Hours</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Feedback Score</p>
                  <p className="text-xl font-black mt-1">4.9 / 5.0</p>
                </div>
              </div>
              <button onClick={() => setIsAuditModalOpen(false)} className="w-full py-4 bg-neuro-orange text-white font-black uppercase tracking-widest rounded-2xl">Close Report</button>
            </div>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neuro-navy border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl">
            <div className="h-32 bg-gradient-to-br from-neuro-orange to-neuro-orange-light p-8 flex items-end justify-between">
               <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center text-neuro-navy text-3xl font-black translate-y-12 border-4 border-neuro-navy">
                 {selectedStudent.name[0]}
               </div>
               <button onClick={() => setSelectedStudent(null)} className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-8 pt-16 space-y-6">
              <div>
                <h2 className="text-2xl font-black">{selectedStudent.name}</h2>
                <p className="text-neuro-orange font-bold">{selectedStudent.school}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase">Class Of</p>
                  <p className="font-bold">{selectedStudent.grad}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase">Status</p>
                  <p className="font-bold">{selectedStudent.status}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase">Engagement</p>
                  <p className="font-bold text-green-500">{selectedStudent.engagement}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase">Joined</p>
                  <p className="font-bold">{selectedStudent.joined}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 font-black uppercase tracking-widest rounded-2xl transition-all">View Full Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
