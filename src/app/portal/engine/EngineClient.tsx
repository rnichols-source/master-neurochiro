"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { PracticeGrowthSimulator } from "@/components/portal/PracticeGrowthSimulator";
import { KPITrackerClient } from "@/app/portal/kpi/KPITrackerClient";
import { EconomicsEngineClient } from "@/components/economics-engine/EconomicsEngineClient";
import { RevenueForecaster } from "@/components/portal/pro/RevenueForecaster";
import { cn } from "@/lib/utils";
import { 
  Activity, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck,
  Zap,
  Plus,
  Lock,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EngineClient({ 
  initialData, 
  userName, 
  userTier = "standard" 
}: { 
  initialData: any[], 
  userName: string,
  userTier?: string
}) {
  const [activeTab, setActiveTab] = useState("kpi");
  const isPro = userTier === 'pro' || userTier === 'admin';

  const tabs = [
    { id: "kpi", label: "KPI Tracker", icon: BarChart3 },
    { id: "money", label: "Practice Money", icon: TrendingUp },
    { id: "forecaster", label: "Revenue Forecaster", icon: Target, pro: true },
    { id: "simulator", label: "Growth Simulator", icon: Zap },
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
            <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              {tab.label}
              {tab.pro && !isPro && <Lock size={10} className="text-brand-orange" />}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "kpi" && (
          <motion.div
            key="kpi"
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

        {activeTab === "forecaster" && (
          <motion.div
            key="forecaster"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {isPro ? (
              <RevenueForecaster />
            ) : (
              <div className="bg-brand-navy rounded-[2.5rem] p-12 text-center space-y-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Target className="w-32 h-32 text-brand-orange" />
                </div>
                <div className="w-20 h-20 mx-auto bg-brand-orange/20 rounded-full flex items-center justify-center">
                  <Lock className="w-10 h-10 text-brand-orange" />
                </div>
                <div className="space-y-4 max-w-md mx-auto">
                  <h2 className="text-3xl font-black tracking-tight">Pro Tier Exclusive</h2>
                  <p className="text-white/60 font-medium leading-relaxed">
                    The Revenue Forecaster uses predictive neurological data to map your clinic's growth. This tool is reserved for Pro members.
                  </p>
                </div>
                <div className="pt-6">
                  <button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-widest transition-all">
                    Upgrade to Pro Mastery
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

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
      </AnimatePresence>
    </div>
  );
}
