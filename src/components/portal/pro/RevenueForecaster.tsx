"use client";

import { useState, useMemo } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  TrendingUp, 
  Target, 
  Zap, 
  DollarSign, 
  Users, 
  ArrowRight,
  Info,
  ShieldCheck
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { cn } from "@/lib/utils";

export function RevenueForecaster() {
  const [inputs, setInputs] = useState({
    monthlyRevenue: 25000,
    visitsPerWeek: 120,
    newPatientsPerMonth: 15,
    avgCaseValue: 3500,
    overhead: 12000
  });

  const forecastData = useMemo(() => {
    const data = [];
    const monthlyGrowthRate = 1.15; // 15% monthly compounded growth
    let currentRev = inputs.monthlyRevenue;
    
    for (let i = 0; i <= 6; i++) {
      data.push({
        month: `Month ${i}`,
        revenue: Math.round(currentRev),
        target: 100000
      });
      currentRev *= monthlyGrowthRate;
      if (currentRev > 120000) currentRev = 125000; // Cap for visual
    }
    return data;
  }, [inputs.monthlyRevenue]);

  const stats = useMemo(() => {
    const pva = (inputs.visitsPerWeek * 4) / (inputs.newPatientsPerMonth || 1);
    const collectionsPerVisit = inputs.monthlyRevenue / (inputs.visitsPerWeek * 4 || 1);
    const growthGap = 100000 - inputs.monthlyRevenue;
    
    return {
      pva: Math.round(pva),
      cpv: Math.round(collectionsPerVisit),
      gap: growthGap > 0 ? growthGap : 0
    };
  }, [inputs]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-brand-orange" />
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Pro Exclusive Intelligence</p>
          </div>
          <h1 className="text-4xl font-black text-brand-navy tracking-tighter leading-none">Revenue Forecaster</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Controls */}
        <EliteCard className="lg:col-span-1 p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-brand-navy border-b border-brand-navy/5 pb-4">Clinic Inputs</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-brand-navy/40 ml-1">Monthly Revenue ($)</label>
              <input 
                type="number"
                value={inputs.monthlyRevenue}
                onChange={(e) => setInputs({...inputs, monthlyRevenue: Number(e.target.value)})}
                className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-bold text-brand-navy focus:border-brand-orange/20 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-brand-navy/40 ml-1">Visits Per Week</label>
              <input 
                type="number"
                value={inputs.visitsPerWeek}
                onChange={(e) => setInputs({...inputs, visitsPerWeek: Number(e.target.value)})}
                className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-bold text-brand-navy focus:border-brand-orange/20 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-brand-navy/40 ml-1">New Patients / Mo</label>
              <input 
                type="number"
                value={inputs.newPatientsPerMonth}
                onChange={(e) => setInputs({...inputs, newPatientsPerMonth: Number(e.target.value)})}
                className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-bold text-brand-navy focus:border-brand-orange/20 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-brand-navy/40 ml-1">Avg. Case Value ($)</label>
              <input 
                type="number"
                value={inputs.avgCaseValue}
                onChange={(e) => setInputs({...inputs, avgCaseValue: Number(e.target.value)})}
                className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-bold text-brand-navy focus:border-brand-orange/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4">
            <div className="p-4 bg-brand-navy text-white rounded-2xl space-y-1">
              <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Growth Efficiency</p>
              <p className="text-xl font-black text-brand-orange">{(stats.cpv / 1.5).toFixed(1)}%</p>
              <p className="text-[9px] font-medium text-white/60">Calculated from clinical conversion</p>
            </div>
          </div>
        </EliteCard>

        {/* Projection Chart */}
        <div className="lg:col-span-2 space-y-8">
          <EliteCard className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-black text-brand-navy">The Growth Path</h3>
                <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">Target: $100,000 / Month</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-orange" />
                  <span className="text-[8px] font-black uppercase text-brand-navy/40">Projection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-navy/10" />
                  <span className="text-[8px] font-black uppercase text-brand-navy/40">Goal</span>
                </div>
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D66829" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#D66829" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E2D3B05" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#1E2D3B40' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#1E2D3B40' }}
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(30, 45, 59, 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 900, color: '#1E2D3B' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#D66829" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#1E2D3B" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </EliteCard>

          {/* Efficiency Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EliteCard className="p-6 bg-brand-cream/30">
              <p className="text-[8px] font-black uppercase text-brand-navy/40 mb-1">PVA (Patient Visit Avg)</p>
              <h4 className="text-2xl font-black text-brand-navy">{stats.pva}</h4>
              <p className="text-[10px] font-bold text-brand-orange mt-2">Elite Benchmark: 45+</p>
            </EliteCard>
            <EliteCard className="p-6 bg-brand-cream/30">
              <p className="text-[8px] font-black uppercase text-brand-navy/40 mb-1">Collections / Visit</p>
              <h4 className="text-2xl font-black text-brand-navy">${stats.cpv}</h4>
              <p className="text-[10px] font-bold text-brand-orange mt-2">Target: $85+</p>
            </EliteCard>
            <EliteCard className="p-6 bg-brand-navy text-white">
              <p className="text-[8px] font-black uppercase text-white/40 mb-1">The Growth Gap</p>
              <h4 className="text-2xl font-black text-brand-orange">${stats.gap.toLocaleString()}</h4>
              <p className="text-[10px] font-bold text-white/60 mt-2">Available Revenue</p>
            </EliteCard>
          </div>

          <EliteCard className="p-8 border-brand-orange/30 bg-white group">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h4 className="text-xl font-black text-brand-navy tracking-tight">Prescribed Pro Strategy</h4>
                <p className="text-sm text-brand-gray font-medium mt-2 leading-relaxed">
                  Based on your current CPV of <span className="font-bold text-brand-navy">${stats.cpv}</span>, you are leaving <span className="font-bold text-brand-navy">${Math.round(stats.gap * 0.4).toLocaleString()}</span> on the table purely due to conversion leaks. 
                  Focus on <span className="text-brand-orange font-bold">Week 03: Communication Mastery</span> to close the gap in the next 30 days.
                </p>
                <BrandButton variant="primary" className="mt-6 group">
                  Open Implementation Drill <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </div>
            </div>
          </EliteCard>
        </div>
      </div>
    </div>
  );
}
