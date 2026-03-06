"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { TrendingUp, AlertCircle, ArrowRight, DollarSign, Users, Target } from "lucide-react";
import Link from "next/link";

export function PracticeROISimulator() {
  const [collections, setCollections] = useState(30000);
  const [newPatients, setNewPatients] = useState(20);
  const [conversion, setConversion] = useState(50);
  const [caseValue, setCaseValue] = useState(3000);

  const [results, setResults] = useState({
    currentAnnual: 0,
    optimizedAnnual: 0,
    annualLeak: 0,
    roiMultiple: 0
  });

  useEffect(() => {
    // Current State
    const currentMonthlyStarts = newPatients * (conversion / 100);
    const currentAnnual = currentMonthlyStarts * caseValue * 12;

    // Optimized State (Target: 75% Conversion - NeuroChiro Standard)
    const targetConversion = 75;
    const optimizedMonthlyStarts = newPatients * (targetConversion / 100);
    const optimizedAnnual = optimizedMonthlyStarts * caseValue * 12;

    const annualLeak = optimizedAnnual - currentAnnual;
    const mastermindInvestment = 997;
    const roiMultiple = annualLeak / mastermindInvestment;

    setResults({
      currentAnnual,
      optimizedAnnual,
      annualLeak,
      roiMultiple
    });
  }, [collections, newPatients, conversion, caseValue]);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Financial Intelligence</p>
        <h2 className="text-5xl font-black text-white tracking-tighter">The ROI Simulator.</h2>
        <p className="text-white/60 font-medium max-w-xl mx-auto">
          Input your current clinic metrics to see the exact annual "Certainty Leak" 
          you are currently experiencing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        {/* Inputs */}
        <EliteCard className="p-10 space-y-8 border-brand-navy/5">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60">Current New Patients / Mo</label>
                <span className="text-sm font-black text-brand-navy">{newPatients}</span>
              </div>
              <input 
                type="range" min="5" max="100" step="1" 
                value={newPatients} onChange={(e) => setNewPatients(Number(e.target.value))}
                className="w-full accent-brand-orange"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60">Current Conversion Rate (%)</label>
                <span className="text-sm font-black text-brand-navy">{conversion}%</span>
              </div>
              <input 
                type="range" min="10" max="90" step="5" 
                value={conversion} onChange={(e) => setConversion(Number(e.target.value))}
                className="w-full accent-brand-orange"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60">Average Case Value ($)</label>
                <span className="text-sm font-black text-brand-navy">${caseValue.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="1000" max="8000" step="250" 
                value={caseValue} onChange={(e) => setCaseValue(Number(e.target.value))}
                className="w-full accent-brand-orange"
              />
            </div>
          </div>

          <div className="p-6 bg-brand-cream rounded-2xl border border-brand-navy/5 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Current Annual Care Plan Revenue</p>
            <p className="text-2xl font-black text-brand-navy">${results.currentAnnual.toLocaleString()}</p>
          </div>
        </EliteCard>

        {/* Results */}
        <div className="space-y-8">
          <EliteCard className="bg-brand-navy text-white border-none p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="relative space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-orange/20 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">The "Certainty Leak"</p>
                  <h3 className="text-5xl font-black text-white leading-none tracking-tighter">
                    -${results.annualLeak.toLocaleString()}
                  </h3>
                  <p className="text-xs font-bold text-brand-orange uppercase mt-2">Lost Revenue Per Year</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-white/60">Optimized Annual (75% Conversion)</span>
                  <span className="text-sm font-black text-white">${results.optimizedAnnual.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-white/60">Mastermind ROI Multiple</span>
                  <span className="text-sm font-black text-brand-orange">{results.roiMultiple.toFixed(1)}x / Year</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-white/40 font-medium italic">
                *Calculation based on increasing conversion to the NeuroChiro 
                standard of 75% without increasing marketing spend.
              </p>
            </div>
          </EliteCard>

          <EliteCard className="p-10 border-brand-orange/20 bg-brand-orange/5">
            <div className="space-y-6">
              <h4 className="text-xl font-black text-brand-navy leading-tight">
                You are paying for the Mastermind <br />
                <span className="text-brand-orange underline">whether you join or not.</span>
              </h4>
              <p className="text-sm text-brand-gray font-medium leading-relaxed">
                The revenue you are currently "leaking" is the price of remaining in 
                the technician identity. One month of optimized growth pays for the OS install for life.
              </p>
              <Link href="/apply" className="block">
                <BrandButton variant="accent" className="w-full py-6 group">
                  Stop the Leak: Apply for Admission <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </Link>
            </div>
          </EliteCard>
        </div>
      </div>
    </div>
  );
}
