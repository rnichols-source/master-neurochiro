"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

interface LeverValues {
  npPerWeek: number;
  conversionRate: number;
  pva: number;
  cva: number;
  overhead: number;
}

interface KPIWhatIfSliderProps {
  levers: LeverValues;
  weakestLever: "conv" | "pva" | "cva" | "np";
  onOverride: (overrides: Partial<LeverValues> | null) => void;
}

const leverConfig = {
  conv: {
    label: "Conversion",
    field: "conversionRate" as const,
    min: 10,
    max: 95,
    step: 5,
    unit: "%",
    format: (v: number) => `${v}%`,
    humanize: (current: number, target: number) => {
      const extraPerMonth = Math.round((target - current) / 100 * 8); // rough: per 8 NP/month
      return extraPerMonth > 0
        ? `That's about ${extraPerMonth} more patient${extraPerMonth !== 1 ? "s" : ""} per month saying yes instead of walking out.`
        : "";
    },
  },
  pva: {
    label: "PVA",
    field: "pva" as const,
    min: 0.5,
    max: 4,
    step: 0.1,
    unit: "",
    format: (v: number) => v.toFixed(1),
    humanize: (current: number, target: number) => {
      const extra = (target - current).toFixed(1);
      return `Each patient visits ${extra} more times per week. That's more visits without needing a single new patient.`;
    },
  },
  cva: {
    label: "CVA",
    field: "cva" as const,
    min: 40,
    max: 200,
    step: 5,
    unit: "",
    format: (v: number) => `$${v}`,
    humanize: () => "A small price adjustment or fewer deep discounts moves this lever.",
  },
  np: {
    label: "New Patients",
    field: "npPerWeek" as const,
    min: 0,
    max: 15,
    step: 0.5,
    unit: "/wk",
    format: (v: number) => v.toFixed(1),
    humanize: (current: number, target: number) => {
      const extra = (target - current).toFixed(1);
      return `${extra} more Day 1s per week. One extra referral or reactivation gets you there.`;
    },
  },
};

export function KPIWhatIfSlider({ levers, weakestLever, onOverride }: KPIWhatIfSliderProps) {
  const config = leverConfig[weakestLever];
  const currentValue = levers[config.field];
  const [sliderValue, setSliderValue] = useState(currentValue);

  const currentRevenue = levers.npPerWeek * (levers.conversionRate / 100) * levers.pva * levers.cva * 4.33;

  const projectedRevenue = useMemo(() => {
    const modified = { ...levers, [config.field]: sliderValue };
    return modified.npPerWeek * (modified.conversionRate / 100) * modified.pva * modified.cva * 4.33;
  }, [levers, config.field, sliderValue]);

  const delta = projectedRevenue - currentRevenue;
  const hasChange = Math.abs(sliderValue - currentValue) > 0.01;

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    if (Math.abs(value - currentValue) > 0.01) {
      onOverride({ [config.field]: value });
    } else {
      onOverride(null);
    }
  };

  const resetSlider = () => {
    setSliderValue(currentValue);
    onOverride(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white rounded-2xl p-6 md:p-8 border border-brand-navy/5"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
          <Zap size={16} className="text-brand-orange" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange">What If</p>
          <p className="text-sm font-bold text-brand-navy">
            What if your {config.label} went from {config.format(currentValue)} to...
          </p>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-brand-navy/30 font-bold">{config.format(config.min)}</span>
          <span className="text-2xl font-black text-brand-navy">{config.format(sliderValue)}</span>
          <span className="text-xs text-brand-navy/30 font-bold">{config.format(config.max)}</span>
        </div>
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={sliderValue}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="w-full h-2 bg-brand-navy/10 rounded-full appearance-none cursor-pointer accent-brand-orange"
          style={{
            background: `linear-gradient(to right, #D66829 0%, #D66829 ${((sliderValue - config.min) / (config.max - config.min)) * 100}%, #1E2D3B15 ${((sliderValue - config.min) / (config.max - config.min)) * 100}%, #1E2D3B15 100%)`,
          }}
        />
      </div>

      {/* Delta */}
      {hasChange ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className={`text-lg font-black ${delta >= 0 ? "text-green-600" : "text-red-600"}`}>
              {delta >= 0 ? "+" : ""}${Math.round(delta).toLocaleString()}/mo
            </p>
            <button
              onClick={resetSlider}
              className="text-xs text-brand-navy/30 hover:text-brand-navy/60 transition-colors font-medium"
            >
              Reset
            </button>
          </div>

          <p className="text-xs text-brand-navy/40 leading-relaxed">
            {config.humanize(currentValue, sliderValue)}
          </p>
        </div>
      ) : (
        <p className="text-xs text-brand-navy/30 font-medium">
          Drag the slider to see what happens to your revenue.
        </p>
      )}

      {/* Link to full simulator */}
      <div className="pt-4 mt-4 border-t border-brand-navy/5">
        <Link
          href="/portal/engine"
          className="text-xs text-brand-orange/60 hover:text-brand-orange font-bold flex items-center gap-1 transition-colors"
        >
          Play with all 4 levers in the Growth Simulator <ArrowRight size={10} />
        </Link>
      </div>
    </motion.div>
  );
}
