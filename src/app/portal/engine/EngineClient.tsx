"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { PracticeGrowthSimulator } from "@/components/portal/PracticeGrowthSimulator";
import { KPITrackerClient } from "@/app/portal/kpi/KPITrackerClient";
import { EconomicsEngineClient } from "@/components/economics-engine/EconomicsEngineClient";
import { cn } from "@/lib/utils";
import { 
  Activity, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck,
  Zap,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EngineClient({ initialData, userName }: { initialData: any[], userName: string }) {
  const [activeTab, setActiveTab] = useState("simulator");

  const tabs = [
    { id: "simulator", label: "Growth Simulator", icon: Zap },
    { id: "dashboard", label: "Practice Dashboard", icon: BarChart3 },
    { id: "money", label: "Money Machine", icon: TrendingUp },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Engine Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange mb-4">
            <Activity size={14} />
            <p className="text-[10px] font-black uppercase tracking-widest">High Performance Engine</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">The Engine</h1>
          <p className="text-brand-gray text-lg font-medium mt-4 max-w-xl">
            Consolidated clinical and financial intelligence. Stop guessing, start operating.
          </p>
        </div>
      </div>

      {/* Internal Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all whitespace-nowrap group",
              activeTab === tab.id 
                ? "bg-brand-navy border-brand-navy text-white shadow-xl" 
                : "bg-white border-brand-navy/5 text-brand-navy/60 hover:border-brand-orange/40"
            )}
          >
            <tab.icon size={18} className={cn(activeTab === tab.id ? "text-brand-orange" : "text-brand-navy/40 group-hover:text-brand-orange")} />
            <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "simulator" && (
          <motion.div
            key="simulator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PracticeGrowthSimulator />
          </motion.div>
        )}

        {activeTab === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <KPITrackerClient initialData={initialData} userName={userName} />
          </motion.div>
        )}

        {activeTab === "money" && (
          <motion.div
            key="money"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <EconomicsEngineClient />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
