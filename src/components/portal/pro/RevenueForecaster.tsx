"use client";

import { useState, useMemo } from "react";
import { EliteCard } from "@/components/ui/elite-ui";
import { ArrowRight } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Line,
} from "recharts";
import Link from "next/link";

export function RevenueForecaster() {
  const [inputs, setInputs] = useState({
    monthlyRevenue: 25000,
    visitsPerWeek: 120,
    newPatientsPerMonth: 15,
    avgCaseValue: 3500,
  });

  const forecastData = useMemo(() => {
    const data = [];
    let currentRev = inputs.monthlyRevenue;
    for (let i = 0; i <= 6; i++) {
      data.push({ month: `Month ${i}`, revenue: Math.round(currentRev), target: 100000 });
      currentRev *= 1.15;
      if (currentRev > 120000) currentRev = 125000;
    }
    return data;
  }, [inputs.monthlyRevenue]);

  const monthlyVisits = inputs.visitsPerWeek * 4;
  const perVisit = monthlyVisits > 0 ? Math.round(inputs.monthlyRevenue / monthlyVisits) : 0;
  const visitAvg = inputs.newPatientsPerMonth > 0 ? Math.round(monthlyVisits / inputs.newPatientsPerMonth) : 0;
  const gap = Math.max(0, 100000 - inputs.monthlyRevenue);

  const inputClass = "w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20 outline-none";

  return (
    <div className="space-y-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-brand-navy border-b border-brand-navy/5 pb-3">Your Numbers</h3>
          <div className="space-y-4">
            {[
              { label: "Monthly Revenue ($)", key: "monthlyRevenue" },
              { label: "Visits Per Week", key: "visitsPerWeek" },
              { label: "New Patients / Month", key: "newPatientsPerMonth" },
              { label: "Average Case Value ($)", key: "avgCaseValue" },
            ].map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-sm font-bold text-brand-navy/60">{field.label}</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={inputs[field.key as keyof typeof inputs]}
                  onChange={(e) => setInputs({ ...inputs, [field.key]: Number(e.target.value) || 0 })}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Chart + Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Growth Chart */}
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-black text-brand-navy">6-Month Projection</h3>
                <p className="text-xs text-brand-gray font-medium">Assuming 15% monthly growth toward $100K/mo</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-brand-gray font-medium">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-orange" /> You</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-navy/20" /> Goal</span>
              </div>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient id="colorRev2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EA580C" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#EA580C" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0F172A08" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#47556980" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#47556980" }} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
                  <Area type="monotone" dataKey="revenue" stroke="#EA580C" strokeWidth={3} fillOpacity={1} fill="url(#colorRev2)" />
                  <Line type="monotone" dataKey="target" stroke="#0F172A" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-brand-navy/5 p-4 shadow-sm">
              <p className="text-xs font-bold text-brand-gray mb-1">Visits Per Patient</p>
              <p className="text-2xl font-black text-brand-navy">{visitAvg}</p>
              <p className="text-xs text-brand-orange font-medium mt-1">Target: 45+</p>
            </div>
            <div className="bg-white rounded-2xl border border-brand-navy/5 p-4 shadow-sm">
              <p className="text-xs font-bold text-brand-gray mb-1">Per Visit Collection</p>
              <p className="text-2xl font-black text-brand-navy">${perVisit}</p>
              <p className="text-xs text-brand-orange font-medium mt-1">Target: $85+</p>
            </div>
            <div className="bg-brand-navy rounded-2xl p-4 text-white">
              <p className="text-xs font-bold text-white/50 mb-1">Gap to $100K</p>
              <p className="text-2xl font-black text-brand-orange">${gap.toLocaleString()}</p>
              <p className="text-xs text-white/40 font-medium mt-1">per month</p>
            </div>
          </div>

          {/* Recommendation */}
          {gap > 0 && (
            <div className="bg-brand-navy/5 border-l-4 border-l-brand-orange rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-brand-navy">
                  At ${perVisit}/visit, you could close an extra ${Math.round(gap * 0.4).toLocaleString()}/month by improving case acceptance.
                </p>
                <p className="text-sm text-brand-gray font-medium mt-1">
                  The Communication module covers this.
                </p>
              </div>
              <Link href="/portal/curriculum/week-3-communication" className="text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors shrink-0">
                Open Module →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
