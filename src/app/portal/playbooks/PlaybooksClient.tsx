"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  FileText, Target, Zap, Users, ShieldCheck, CheckCircle2,
  ChevronDown, Search, Activity, MessageSquare, AlertTriangle,
  UserPlus, RefreshCw, Info, BookOpen, Scale, Eye, Brain,
  TrendingUp, Settings, HeartPulse, Sparkles, ClipboardCheck,
  LucideIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playbooks1to4 } from "./playbook-data-1";
import { playbooks5to8 } from "./playbook-data-2";
import { playbooks9to12 } from "./playbook-data-3";

const iconMap: Record<string, LucideIcon> = {
  FileText, Target, Zap, Users, ShieldCheck, CheckCircle2,
  Search, Activity, MessageSquare, AlertTriangle,
  UserPlus, RefreshCw, Info, BookOpen, Scale, Eye, Brain,
  TrendingUp, Settings, HeartPulse, Sparkles, ClipboardCheck,
};

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Info;
}

// Merge all playbook data and map icon strings to components
const allPlaybookData = [...playbooks1to4, ...playbooks5to8, ...playbooks9to12];

const playbookLibrary = allPlaybookData.map((p: any) => ({
  id: p.id,
  title: p.title,
  tagline: p.tagline,
  summary: p.summary,
  icon: getIcon(p.iconName || p.icon),
  sections: p.sections.map((s: any) => ({
    ...s,
    icon: getIcon(s.icon),
  })),
}));

export function PlaybooksClient() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const activePlaybook = activeId ? playbookLibrary.find(p => p.id === activeId) : null;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Learn</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Step-by-step guides for every patient interaction.</p>
        <div className="flex gap-3 mt-4">
          <Link href="/portal/curriculum" className="px-4 py-2 bg-brand-navy/5 text-brand-navy/60 rounded-xl text-sm font-bold hover:bg-brand-navy/10 transition-colors">
            Curriculum
          </Link>
          <button onClick={() => setActiveId(null)} className="px-4 py-2 bg-brand-navy text-white rounded-xl text-sm font-bold">Playbooks</button>
        </div>
      </div>

      {/* Table of Contents — shows when no playbook is selected */}
      {!activePlaybook && (
        <div className="space-y-4">
          <p className="text-sm text-brand-gray font-medium">Choose a playbook to get started. Each one gives you the exact script and framework for that situation.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {playbookLibrary.map((p) => (
              <button
                key={p.id}
                onClick={() => { setActiveId(p.id); setExpandedSection(0); }}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-brand-navy/5 hover:border-brand-orange/30 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center shrink-0 group-hover:bg-brand-orange/10 transition-colors">
                  <p.icon size={18} className="text-brand-navy/40 group-hover:text-brand-orange transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-brand-navy truncate">{p.title}</p>
                  <p className="text-xs text-brand-gray font-medium truncate">{p.tagline}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Playbook Content */}
      {activePlaybook && (
        <>
          {/* Back button + current playbook title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveId(null)}
              className="text-sm font-bold text-brand-gray hover:text-brand-navy transition-colors shrink-0"
            >
              ← All Playbooks
            </button>
            <span className="text-brand-navy/10">|</span>
            <div className="flex items-center gap-2">
              <activePlaybook.icon size={16} className="text-brand-orange shrink-0" />
              <span className="text-sm font-black text-brand-navy">{activePlaybook.title}</span>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-brand-navy/5 rounded-2xl p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-3">Key Takeaways</p>
            <ul className="space-y-2">
              {activePlaybook.summary.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm font-medium text-brand-navy">
                  <span className="w-5 h-5 rounded-full bg-brand-orange/20 flex items-center justify-center shrink-0 text-xs font-bold text-brand-orange">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-3">
            {activePlaybook.sections.map((section: any, idx: number) => (
              <div key={idx} className="bg-white rounded-2xl border border-brand-navy/5 overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left touch-target"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0",
                      expandedSection === idx ? "bg-brand-orange text-white" : "bg-brand-navy/5 text-brand-navy/40"
                    )}>
                      <section.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-orange">{section.label}</p>
                      <h3 className="text-base font-black text-brand-navy">{section.title}</h3>
                    </div>
                  </div>
                  <ChevronDown className={cn("w-5 h-5 text-brand-navy/20 transition-transform shrink-0", expandedSection === idx && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {expandedSection === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-5 pb-5 pt-0">
                        <div className="text-sm text-brand-gray font-medium leading-relaxed pl-13">
                          {section.content}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
