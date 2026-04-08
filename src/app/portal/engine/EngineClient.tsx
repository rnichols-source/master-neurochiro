"use client";

import { useState, useMemo } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { KPITrackerClient } from "@/app/portal/kpi/KPITrackerClient";
import { EconomicsEngineClient } from "@/components/economics-engine/EconomicsEngineClient";
import { RevenueForecaster } from "@/components/portal/pro/RevenueForecaster";
import { KPIEntryModal } from "@/components/portal/KPIEntryModal";
import { cn } from "@/lib/utils";
import { 
  Activity, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck,
  Zap,
  Plus,
  Lock,
  Target,
  ArrowRight,
  TrendingDown,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localData, setLocalData] = useState(initialData);
  const isPro = userTier === 'pro' || userTier === 'admin';
  const router = useRouter();

  const tabs = [
    { id: "kpi", label: "KPI Tracker", icon: BarChart3 },
    { id: "money", label: "Practice Money", icon: TrendingUp },
    { id: "forecaster", label: "Revenue Forecaster", icon: Target, pro: true },
  ];

  // Logic for "The Next $10k Move"
  const nextMove = useMemo(() => {
    if (!localData || localData.length === 0) {
      return {
        title: "Initialize Your Engine",
        desc: "You haven't recorded any data yet. Your first move is to baseline your stats.",
        action: "Enter Your First KPI",
        link: "#",
        isModal: true
      };
    }

    const latest = localData[localData.length - 1];
    const conversion = latest.new_patients > 0 ? (latest.care_plans_accepted / latest.new_patients) : 1;

    // 1. Bottleneck: Conversion
    if (conversion < 0.65) {
      return {
        title: "The Conversion Move",
        desc: "Your acceptance rate is the primary leak. Fixing this is worth $10k+ this month.",
        action: "Master the Neurological Pivot",
        link: "/portal/curriculum/week-3-communication"
      };
    }

    // 2. Bottleneck: NP Volume
    if (latest.new_patients < 15) {
      return {
        title: "The Velocity Move",
        desc: "Your clinical engine is ready but your volume is low. You need more 'At Bats'.",
        action: "Launch Reactivation Campaign",
        link: "/portal/curriculum/week-7-marketing"
      };
    }

    // 3. Bottleneck: Low PV (Retention)
    if (latest.patient_visits < 100) {
      return {
        title: "The Retention Move",
        desc: "Your visits are low relative to your NP volume. You're losing them in the 'Middle'." ,
        action: "Strengthen Your Philosophy",
        link: "/portal/curriculum/week-4-philosophy"
      };
    }

    // 4. Default: Scale
    return {
      title: "The Scaling Move",
      desc: "Your fundamentals are strong. Now it's time to build the team that runs it for you.",
      action: "Open Leadership Mastery",
      link: "/portal/curriculum/week-6-leadership"
    };
  }, [localData]);

  const handleModalSuccess = () => {
    setIsModalOpen(false);
    router.refresh();
    // In a real app, we might re-fetch data here or the refresh handles it
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Engine Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">The Engine</h1>
          <p className="text-sm text-brand-gray font-medium mt-1">Your practice numbers, all in one place.</p>
        </div>

        {/* The Next $10k Move Card */}
        <div className="w-full md:w-96 bg-brand-navy rounded-2xl p-8 text-white relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles size={60} className="text-brand-orange" />
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-orange mb-4">The Next $10k Move</p>
          <h3 className="text-xl font-black tracking-tight mb-2">{nextMove.title}</h3>
          <p className="text-white/40 text-xs font-medium leading-relaxed mb-6">
            {nextMove.desc}
          </p>
          
          {nextMove.isModal ? (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-brand-orange hover:bg-white hover:text-brand-navy transition-all rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group/btn"
            >
              {nextMove.action} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          ) : (
            <Link href={nextMove.link}>
              <button className="w-full py-4 bg-brand-orange hover:bg-white hover:text-brand-navy transition-all rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group/btn">
                {nextMove.action} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Link>
          )}
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
            <KPITrackerClient initialData={localData} userName={userName} />
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
              <div className="bg-brand-navy rounded-2xl p-12 text-center space-y-8 text-white relative overflow-hidden">
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

      </AnimatePresence>

      <KPIEntryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
