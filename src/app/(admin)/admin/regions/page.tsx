"use client";

import { 
  Globe, 
  ShieldCheck, 
  MapPin, 
  Users, 
  Plus, 
  ChevronRight, 
  ArrowRight,
  Database,
  Lock,
  Zap,
  LayoutDashboard,
  X
} from "lucide-react";
import { useState } from "react";
import { Automations } from "@/lib/automations";

export default function RegionalControl() {
  const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [isAssignRoleModalOpen, setIsAssignRoleModalOpen] = useState(false);
  const [strictIsolation, setStrictIsolation] = useState(true);
  const [crossBorder, setCrossBorder] = useState(false);

  const regions = [
    { name: "North America", admin: "Admin_US", users: "8.4k", revenue: "$240k", status: "Active" },
    { name: "Australia", admin: "Admin_AU", users: "2.1k", revenue: "$85k", status: "Active" },
    { name: "United Kingdom", admin: "Admin_UK", users: "1.2k", revenue: "$42k", status: "Pending" }
  ];

  const handleToggle = (setting: string, value: boolean, setter: (v: boolean) => void) => {
    setter(value);
    Automations.onSettingsToggle("ADMIN_01", setting, value);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 text-white">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-blue-500">
            <Globe className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Global Infrastructure</span>
          </div>
          <h1 className="text-4xl font-heading font-black">Regions & Licensing</h1>
          <p className="text-gray-400 mt-2 text-lg font-medium">Regional data sovereignty and admin delegation.</p>
        </div>
        <button 
          onClick={() => setIsAddRegionModalOpen(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:bg-blue-500 transition-all transform hover:scale-105 flex items-center gap-3"
        >
          <Plus className="w-5 h-5" />
          <span className="font-black uppercase tracking-widest text-sm">Add New Region</span>
        </button>
      </header>

      {/* Global Licensing Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Licenses</p>
              <p className="text-3xl font-black">12 Regions</p>
            </div>
          </div>
          <p className="text-xs text-gray-400">Compliance check: <span className="text-green-500 font-bold">100% Passed</span></p>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Regional Admins</p>
              <p className="text-3xl font-black">24 Active</p>
            </div>
          </div>
          <p className="text-xs text-gray-400">Data access: <span className="text-blue-500 font-bold">Scoped by Region</span></p>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-neuro-orange/10 rounded-2xl text-neuro-orange">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Data Points</p>
              <p className="text-3xl font-black">1.2M+</p>
            </div>
          </div>
          <p className="text-xs text-gray-400">Storage status: <span className="text-green-500 font-bold">Optimal</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active Regions Table */}
          <section className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-white/5">
              <h3 className="text-xl font-heading font-black">Regional Configuration</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <tr>
                    <th className="px-8 py-4">Region</th>
                    <th className="px-8 py-4">Admin</th>
                    <th className="px-8 py-4">Users</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {regions.map((r, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="font-bold text-sm">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <span className="px-2 py-1 bg-white/5 rounded-lg text-xs font-mono">{r.admin}</span>
                      </td>
                      <td className="px-8 py-4 text-sm text-gray-400">{r.users}</td>
                      <td className="px-8 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${r.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <button 
                          onClick={() => setSelectedRegion(r)}
                          className="text-xs font-black text-neuro-orange uppercase flex items-center gap-1 hover:underline ml-auto"
                        >
                          Manage <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Regional Dashboard Preview */}
          <section className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-heading font-black flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-neuro-orange" /> Australia (AU) Insights
              </h3>
              <span className="text-[10px] font-black text-gray-500 uppercase">Snapshot</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">AU Student Growth</p>
                <div className="flex items-end gap-1 h-32">
                  {[20, 40, 30, 60, 45, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500/20 rounded-t-lg relative">
                      <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-lg" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">AU Doctor Network</p>
                <div className="flex items-center justify-center h-32">
                  <div className="w-24 h-24 rounded-full border-[12px] border-neuro-orange border-t-white/10 flex items-center justify-center">
                    <span className="text-xl font-black">82%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Admin Delegation */}
          <section className="bg-blue-900/20 border border-blue-500/20 rounded-[2rem] p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl"></div>
            <h3 className="text-xl font-heading font-black mb-6">Admin Roles</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-sm font-bold">Assign AU Regional Lead</p>
                <p className="text-[10px] text-gray-400 mt-1">Full access to AU-specific doctor apps.</p>
                <button 
                  onClick={() => setIsAssignRoleModalOpen(true)}
                  className="w-full mt-4 py-2 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all"
                >
                  Assign Role
                </button>
              </div>
            </div>
          </section>

          {/* Data Sovereignty Logic */}
          <section className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-xl font-heading font-black mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-500" /> Data Scoping
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">Strict Regional Isolation</span>
                <button 
                  onClick={() => handleToggle("Strict Regional Isolation", !strictIsolation, setStrictIsolation)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${strictIsolation ? 'bg-green-500' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${strictIsolation ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">Cross-border Referrals</span>
                <button 
                  onClick={() => handleToggle("Cross-border Referrals", !crossBorder, setCrossBorder)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${crossBorder ? 'bg-neuro-orange' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${crossBorder ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed mt-4">
                Ensuring compliance with regional data privacy laws (GDPR, AU Privacy Act).
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Add New Region Modal */}
      {isAddRegionModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neuro-navy border border-white/10 rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-black">Provision New Region</h2>
              <button onClick={() => setIsAddRegionModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500">Region Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" placeholder="e.g. Europe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500">Region Code</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" placeholder="e.g. EU" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500">Primary Admin Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" placeholder="admin@region.com" />
              </div>
              <button onClick={() => setIsAddRegionModalOpen(false)} className="w-full py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl">Initialize Region</button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Region Modal */}
      {selectedRegion && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neuro-navy border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-black">Manage {selectedRegion.name}</h2>
              </div>
              <button onClick={() => setSelectedRegion(null)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase text-gray-500 tracking-widest">Regional Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Users</span>
                    <span className="font-bold">{selectedRegion.users}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Revenue</span>
                    <span className="font-bold text-green-500">{selectedRegion.revenue}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Admin</span>
                    <span className="font-mono text-blue-400">{selectedRegion.admin}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase text-gray-500 tracking-widest">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase">Sync Data</button>
                  <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase text-red-500">Suspend Region</button>
                </div>
              </div>
            </div>
            <div className="p-8 bg-white/5 border-t border-white/5">
               <button onClick={() => setSelectedRegion(null)} className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black uppercase tracking-widest">Close Dashboard</button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Role Modal */}
      {isAssignRoleModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neuro-navy border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-black">Assign Regional Lead</h2>
              <button onClick={() => setIsAssignRoleModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
               <div className="space-y-4">
                 {[
                   { name: "Sarah Connor", email: "sarah@sky.net", role: "Manager" },
                   { name: "Kyle Reese", email: "kyle@resistance.com", role: "Editor" }
                 ].map((u, i) => (
                   <button key={i} className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-between group transition-all">
                     <div className="text-left">
                       <p className="font-bold">{u.name}</p>
                       <p className="text-[10px] text-gray-500">{u.email}</p>
                     </div>
                     <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                   </button>
                 ))}
               </div>
               <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-widest">Search members to delegate access</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
