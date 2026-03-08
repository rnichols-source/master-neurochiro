"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  MousePointerClick, 
  DollarSign, 
  Target, 
  ArrowUpRight, 
  ChevronRight,
  Lock,
  Sparkles,
  Info,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MembershipTier } from '@/types/directory';
import { ROIStats, ROIData } from '@/types/analytics';

interface ROIDashboardProps {
  tier: MembershipTier;
  data: ROIData;
  onUpgrade?: () => void;
}

export default function ROIDashboard({ tier, data, onUpgrade }: ROIDashboardProps) {
  const isLocked = tier === 'starter';
  const isLimited = tier === 'growth';
  
  const stats = data.stats;
  const estimatedRevenue = stats.confirmed_patients * stats.average_case_value;
  const roiMultiplier = estimatedRevenue / stats.membership_cost;

  if (isLocked) {
    return (
      <div className="relative overflow-hidden rounded-[3rem] bg-white border border-gray-100 p-12 shadow-sm text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neuro-cream/50 pointer-events-none"></div>
        <div className="relative z-10 max-w-xl mx-auto py-12">
          <div className="w-20 h-20 bg-neuro-orange/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Target className="w-10 h-10 text-neuro-orange" />
          </div>
          <h2 className="text-4xl font-heading font-black text-neuro-navy mb-4">NeuroChiro ROI Engine</h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            Stop guessing and start measuring. Upgrade to see exactly how many patients and how much revenue NeuroChiro is driving to your clinic.
          </p>
          <button 
            onClick={onUpgrade}
            className="px-10 py-5 bg-neuro-navy text-white font-black rounded-2xl hover:bg-neuro-navy-light transition-all shadow-xl flex items-center gap-3 mx-auto uppercase tracking-widest text-sm"
          >
            <Sparkles className="w-5 h-5 text-neuro-orange" /> Unlock ROI Analytics
          </button>
          
          <div className="mt-16 grid grid-cols-3 gap-6 opacity-30 blur-[2px] pointer-events-none">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* High Impact ROI Banner */}
      <section className="bg-neuro-navy rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-neuro-orange/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-neuro-orange/20 text-neuro-orange text-[10px] font-black uppercase tracking-widest rounded-full border border-neuro-orange/30">
                Performance Scorecard
              </span>
              <span className="text-gray-400 text-xs font-bold">Period: {data.period.toUpperCase()}</span>
            </div>
            <h2 className="text-5xl font-heading font-black mb-4">Your NeuroChiro ROI</h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Based on {stats.confirmed_patients} confirmed patients and an average case value of ${stats.average_case_value.toLocaleString()}.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-8">
               <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Estimated Revenue</p>
                  <p className="text-4xl font-black text-white">${estimatedRevenue.toLocaleString()}</p>
               </div>
               <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
               <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Monthly Membership</p>
                  <p className="text-4xl font-black text-white">${stats.membership_cost}</p>
               </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
               <div className="absolute inset-0 bg-neuro-orange blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
               <div className="relative w-56 h-56 rounded-full border-[12px] border-white/5 flex flex-col items-center justify-center text-center p-8">
                  <span className="text-6xl font-black text-neuro-orange">{Math.round(roiMultiplier)}x</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Return on Cost</span>
               </div>
               <div className="absolute -bottom-4 -right-4 bg-white text-neuro-navy p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Efficiency</p>
                    <p className="text-sm font-black text-neuro-navy">Dominant</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Funnel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Profile Views", value: stats.profile_views, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Contact Clicks", value: stats.contact_clicks, icon: MousePointerClick, color: "text-purple-500", bg: "bg-purple-50" },
          { label: "Bookings", value: stats.booking_clicks, icon: Calendar, color: "text-neuro-orange", bg: "bg-neuro-orange/10" },
          { label: "New Patients", value: stats.confirmed_patients, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-16 h-16 ${stat.bg} rounded-bl-[2rem] flex items-center justify-center transition-transform group-hover:scale-110`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-black text-neuro-navy">{stat.value}</span>
              {i > 0 && (
                <span className="text-[10px] font-bold text-gray-400 mb-1">
                  {Math.round((stat.value / stats.profile_views) * 100)}% Conv.
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Historical Revenue Trend */}
        <section className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-heading font-black flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-neuro-orange" /> Growth Trajectory
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>Estimated Monthly Revenue</span>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-gray-50">
            {data.historical_revenue.map((rev, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group relative">
                <div 
                  className="w-full bg-neuro-navy rounded-t-xl transition-all group-hover:bg-neuro-orange"
                  style={{ height: `${(rev.amount / Math.max(...data.historical_revenue.map(r => r.amount))) * 100}%` }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neuro-navy text-white px-2 py-1 rounded text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                    ${rev.amount.toLocaleString()}
                  </div>
                </div>
                <span className="text-[9px] font-bold text-gray-400 mt-4 uppercase">{rev.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Action Center */}
        <div className="space-y-6">
          <section className="bg-neuro-cream rounded-[2.5rem] p-8 border border-neuro-navy/5">
            <h4 className="font-heading font-black text-neuro-navy mb-4">ROI Accelerator</h4>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Profiles with introduction videos receive significantly more patient engagement.
            </p>
            <button className="w-full py-4 bg-white text-neuro-navy font-black rounded-2xl hover:bg-gray-50 transition-all border border-gray-200 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
              Add Intro Video <ArrowUpRight className="w-3 h-3" />
            </button>
          </section>

          {tier === 'growth' ? (
            <section className="bg-gradient-to-br from-neuro-orange to-neuro-orange-dark rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Pro Insight Locked</span>
                </div>
                <h4 className="font-heading font-black text-lg mb-2">Deep Referral Tracking</h4>
                <p className="text-xs text-white/70 mb-6 leading-relaxed">
                  Unlock exact traffic source tracking and referral network insights.
                </p>
                <button 
                  onClick={onUpgrade}
                  className="w-full py-4 bg-white text-neuro-orange font-black rounded-2xl hover:bg-white/90 transition-all text-[10px] uppercase tracking-widest shadow-lg"
                >
                  Upgrade to Pro
                </button>
              </div>
            </section>
          ) : tier === 'pro' && (
            <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-green-50 rounded-lg">
                  <Target className="w-4 h-4 text-green-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-neuro-navy">Deep Referral Tracking</span>
              </div>
              <h4 className="font-heading font-black text-lg mb-6">Top Patient Sources</h4>
              <div className="space-y-4">
                {[
                  { name: "Organic Search", val: "42%", trend: "up" },
                  { name: "Instagram Bio", val: "28%", trend: "up" },
                  { name: "NeuroChiro Map", val: "15%", trend: "stable" },
                  { name: "Direct Referrals", val: "10%", trend: "up" }
                ].map((source, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500">{source.name}</span>
                    <span className="text-xs font-black text-neuro-navy">{source.val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-50">
                <p className="text-[9px] text-gray-400 leading-relaxed italic">
                  *Referral data is tracked via unique attribution tokens on your profile links.
                </p>
              </div>
            </section>
          )}

          <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <h4 className="font-heading font-black text-neuro-navy mb-6 flex items-center gap-2">
              <Info className="w-4 h-4 text-neuro-orange" /> Calculation Method
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                </div>
                <p className="text-[10px] text-gray-500 font-medium">Automatic tracking of booking link clicks and profile taps.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                </div>
                <p className="text-[10px] text-gray-500 font-medium">Manual confirmation of patients in your practice portal.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                </div>
                <p className="text-[10px] text-gray-500 font-medium">ROI based on your custom Average Case Value.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
