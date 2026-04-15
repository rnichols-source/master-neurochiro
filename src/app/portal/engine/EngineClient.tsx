"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { KPITrackerClient } from "@/app/portal/kpi/KPITrackerClient";
import { KPIEntryModal } from "@/components/portal/KPIEntryModal";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const EconomicsEngineClient = dynamic(
  () => import("@/components/economics-engine/EconomicsEngineClient").then(m => m.EconomicsEngineClient),
  { loading: () => <Skeleton className="h-96 rounded-2xl" /> }
);
const RevenueForecaster = dynamic(
  () => import("@/components/portal/pro/RevenueForecaster").then(m => m.RevenueForecaster),
  { loading: () => <Skeleton className="h-96 rounded-2xl" /> }
);
import {
  TrendingUp,
  BarChart3,
  Lock,
  Target,
  ArrowRight,
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

  // Smart recommendation based on latest data
  const recommendation = useMemo(() => {
    if (!localData || localData.length === 0) {
      return { text: "Start by entering your first week of numbers.", action: "Enter Your First KPIs", link: "#", isModal: true };
    }
    const latest = localData[localData.length - 1];
    const conversion = latest.new_patients > 0 ? (latest.care_plans_accepted / latest.new_patients) : 1;
    if (conversion < 0.65) return { text: "Your case acceptance is below average. The communication module can help.", action: "Watch Communication Module", link: "/portal/curriculum/week-3-communication" };
    if (latest.new_patients < 15) return { text: "Your new patient volume is low. Focus on patient management and retention.", action: "Open Patient Management", link: "/portal/curriculum/week-7-patient-management" };
    if (latest.patient_visits < 100) return { text: "Patient visits are low. Strengthen your retention and re-exam process.", action: "Review Care Plans", link: "/portal/curriculum/week-6-care-plans" };
    return { text: "Your numbers look strong. Time to focus on ownership and scaling.", action: "Open Scaling Module", link: "/portal/curriculum/week-8-ownership" };
  }, [localData]);

  const handleModalSuccess = () => {
    setIsModalOpen(false);
    router.refresh();
    // In a real app, we might re-fetch data here or the refresh handles it
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Track</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Your practice numbers, all in one place.</p>
      </div>

      {/* Smart Recommendation */}
      <div className="bg-brand-navy/5 border-l-4 border-l-brand-orange rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-brand-navy font-medium">{recommendation.text}</p>
        {recommendation.isModal ? (
          <button onClick={() => setIsModalOpen(true)} className="text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors shrink-0">
            {recommendation.action} →
          </button>
        ) : (
          <Link href={recommendation.link} className="text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors shrink-0">
            {recommendation.action} →
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl border transition-all whitespace-nowrap text-sm font-bold touch-target",
              activeTab === tab.id
                ? "bg-brand-navy border-brand-navy text-white shadow-sm"
                : "bg-white border-brand-navy/5 text-brand-navy/60 hover:border-brand-orange/40"
            )}
          >
            <tab.icon size={16} className={cn(activeTab === tab.id ? "text-brand-orange" : "text-brand-navy/30")} />
            {tab.label}
            {tab.pro && !isPro && <Lock size={10} className="text-brand-orange" />}
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
