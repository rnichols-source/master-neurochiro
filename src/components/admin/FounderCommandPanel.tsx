"use client";

import { useState, useEffect } from "react";
import { X, Activity, Users, DollarSign, Send, Archive, RefreshCw, AlertTriangle, ShieldCheck, Database, Server, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FounderCommandPanel({ onClose }: { onClose: () => void }) {
  // Mock data for immediate visualization (can be wired to real API later)
  const metrics = [
    { label: "Active Members", value: "142", icon: Users, color: "text-blue-500" },
    { label: "Revenue Today", value: "$4,250", icon: DollarSign, color: "text-green-500" },
    { label: "Pending Apps", value: "8", icon: Activity, color: "text-orange-500" },
    { label: "At-Risk", value: "3", icon: AlertTriangle, color: "text-red-500" },
  ];

  const actions = [
    { label: "Content Manager", icon: Archive },
    { label: "Broadcast", icon: Send },
    { label: "Vault Admin", icon: ShieldCheck },
    { label: "Applications", icon: Users },
  ];

  return (
    <div className="fixed inset-0 z-[99999] flex justify-end pointer-events-none">
      {/* Dark overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
      />

      {/* Slide-out Panel */}
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md h-full bg-[#0A192F] shadow-2xl pointer-events-auto border-l border-white/10 flex flex-col overflow-y-auto overflow-x-hidden"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20 sticky top-0 z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E67E22] mb-1">Founder Mode</p>
            <h2 className="text-xl font-black text-white tracking-tight">Mission Control</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8 flex-1">
          {/* Quick Data View */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <m.icon size={16} className={m.color} />
                </div>
                <h3 className="text-2xl font-black text-white">{m.value}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 ml-2">Quick Actions</p>
            <div className="grid grid-cols-2 gap-3">
              {actions.map((a, i) => (
                <button key={i} className="flex items-center gap-3 p-3 bg-white/5 hover:bg-[#E67E22]/20 hover:border-[#E67E22]/50 border border-white/5 rounded-xl transition-all text-white/80 hover:text-white text-left group">
                  <div className="w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center group-hover:bg-[#E67E22] transition-colors">
                    <a.icon size={14} />
                  </div>
                  <span className="text-xs font-bold">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 ml-2">System Health</p>
            <div className="bg-black/30 rounded-2xl border border-white/5 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database size={14} className="text-white/40" />
                  <span className="text-xs font-bold text-white/80">Database Auth</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-green-500 font-bold uppercase">Optimal</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Server size={14} className="text-white/40" />
                  <span className="text-xs font-bold text-white/80">Edge Network</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-green-500 font-bold uppercase">Optimal</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-white/40" />
                  <span className="text-xs font-bold text-white/80">Email Queue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-green-500 font-bold uppercase">Clear</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
