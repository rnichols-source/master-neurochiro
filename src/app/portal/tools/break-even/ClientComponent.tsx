"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown, ChevronUp, Plus, X, Settings, DollarSign,
  TrendingUp, TrendingDown, Target, BarChart3, CheckCircle2,
  AlertTriangle, Wallet, Calculator, Save, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "neurochiro_financial_dashboard";

interface Expense {
  id: string;
  name: string;
  amount: number;
}

interface MonthlySnapshot {
  id: string;
  month: string; // "2026-04"
  revenue: number;
  visits: number;
}

interface DashboardData {
  expenses: Expense[];
  perVisitFee: number;
  weeklyVisits: number;
  workDaysPerWeek: number;
  workWeeksPerMonth: number;
  hoursPerDay: number;
  taxRate: number;
  desiredIncome: number;
  avgVisitsPerCase: number;
  feeIncrease: number;
  additionalVisits: number;
  overheadReduction: number;
  associateCost: number;
  associateRevenue: number;
  snapshots: MonthlySnapshot[];
}

const DEFAULT_EXPENSES: Expense[] = [
  { id: "1", name: "Rent / Lease", amount: 5000 },
  { id: "2", name: "Staff Payroll + Taxes", amount: 12000 },
  { id: "3", name: "Utilities", amount: 800 },
  { id: "4", name: "Software / EHR", amount: 500 },
  { id: "5", name: "Malpractice Insurance", amount: 400 },
  { id: "6", name: "General Liability Insurance", amount: 200 },
  { id: "7", name: "Marketing / Advertising", amount: 1500 },
  { id: "8", name: "Supplies", amount: 600 },
  { id: "9", name: "Equipment Leases", amount: 800 },
  { id: "10", name: "Continuing Education", amount: 200 },
  { id: "11", name: "Loan Payments", amount: 2000 },
  { id: "12", name: "Miscellaneous", amount: 500 },
];

export function BreakEvenClient() {
  // Section collapse state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    overhead: true, revenue: true, breakeven: true,
    scenarios: false, income: false, ratios: false, tracking: false
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Dashboard data
  const [data, setData] = useState<DashboardData>({
    expenses: DEFAULT_EXPENSES,
    perVisitFee: 65,
    weeklyVisits: 120,
    workDaysPerWeek: 5,
    workWeeksPerMonth: 4.3,
    hoursPerDay: 8,
    taxRate: 30,
    desiredIncome: 15000,
    avgVisitsPerCase: 24,
    feeIncrease: 10,
    additionalVisits: 20,
    overheadReduction: 2000,
    associateCost: 6000,
    associateRevenue: 15000,
    snapshots: [],
  });

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
    } catch {}
  }, []);

  // Save to localStorage on every change
  const updateData = (partial: Partial<DashboardData>) => {
    setData(prev => {
      const updated = { ...prev, ...partial };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Expense helpers
  const addExpense = () => {
    const newExpense = { id: Math.random().toString(36).slice(2), name: "", amount: 0 };
    updateData({ expenses: [...data.expenses, newExpense] });
  };

  const removeExpense = (id: string) => {
    updateData({ expenses: data.expenses.filter(e => e.id !== id) });
  };

  const updateExpense = (id: string, field: "name" | "amount", value: string | number) => {
    updateData({ expenses: data.expenses.map(e => e.id === id ? { ...e, [field]: value } : e) });
  };

  // Core calculations
  const totalOverhead = data.expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const monthlyVisits = data.weeklyVisits * data.workWeeksPerMonth;
  const monthlyRevenue = monthlyVisits * data.perVisitFee;
  const workingDaysPerMonth = data.workDaysPerWeek * data.workWeeksPerMonth;
  const dailyRevenue = workingDaysPerMonth > 0 ? monthlyRevenue / workingDaysPerMonth : 0;
  const totalHoursPerMonth = workingDaysPerMonth * data.hoursPerDay;
  const revenuePerHour = totalHoursPerMonth > 0 ? monthlyRevenue / totalHoursPerMonth : 0;

  const breakEvenVisits = data.perVisitFee > 0 ? Math.ceil(totalOverhead / data.perVisitFee) : 0;
  const breakEvenPerDay = workingDaysPerMonth > 0 ? Math.ceil(breakEvenVisits / workingDaysPerMonth) : 0;
  const monthlyProfit = monthlyRevenue - totalOverhead;
  const profitMargin = monthlyRevenue > 0 ? (monthlyProfit / monthlyRevenue) * 100 : 0;
  const isProfit = monthlyProfit > 0;
  const isNearBreakEven = Math.abs(profitMargin) < 10;

  // Scenario calculations
  const scenarioFeeRevenue = monthlyVisits * (data.perVisitFee + data.feeIncrease);
  const scenarioFeeProfit = scenarioFeeRevenue - totalOverhead;
  const scenarioVisitsRevenue = (data.weeklyVisits + data.additionalVisits) * data.workWeeksPerMonth * data.perVisitFee;
  const scenarioVisitsProfit = scenarioVisitsRevenue - totalOverhead;
  const scenarioOverheadProfit = monthlyRevenue - (totalOverhead - data.overheadReduction);
  const scenarioAssociateProfit = (monthlyRevenue + data.associateRevenue) - (totalOverhead + data.associateCost);

  // Income goal calculations
  const grossNeeded = data.desiredIncome / (1 - data.taxRate / 100) + totalOverhead;
  const visitsForGoal = data.perVisitFee > 0 ? Math.ceil(grossNeeded / data.perVisitFee) : 0;
  const visitsForGoalPerDay = workingDaysPerMonth > 0 ? Math.ceil(visitsForGoal / workingDaysPerMonth) : 0;
  const newPatientsForGoal = data.avgVisitsPerCase > 0 ? Math.ceil(visitsForGoal / data.avgVisitsPerCase) : 0;

  // Ratio calculations
  const staffExpense = data.expenses.find(e => e.name.toLowerCase().includes("staff") || e.name.toLowerCase().includes("payroll"))?.amount || 0;
  const marketingExpense = data.expenses.find(e => e.name.toLowerCase().includes("marketing"))?.amount || 0;
  const overheadPercent = monthlyRevenue > 0 ? (totalOverhead / monthlyRevenue) * 100 : 0;
  const staffPercent = monthlyRevenue > 0 ? (staffExpense / monthlyRevenue) * 100 : 0;
  const marketingPercent = monthlyRevenue > 0 ? (marketingExpense / monthlyRevenue) * 100 : 0;

  // Snapshot helpers
  const [snapshotMonth, setSnapshotMonth] = useState(new Date().toISOString().slice(0, 7));
  const [snapshotRevenue, setSnapshotRevenue] = useState(0);
  const [snapshotVisits, setSnapshotVisits] = useState(0);

  const saveSnapshot = () => {
    const snapshot: MonthlySnapshot = {
      id: Math.random().toString(36).slice(2),
      month: snapshotMonth,
      revenue: snapshotRevenue,
      visits: snapshotVisits,
    };
    const existing = data.snapshots.filter(s => s.month !== snapshotMonth);
    const updated = [snapshot, ...existing].sort((a, b) => b.month.localeCompare(a.month)).slice(0, 12);
    updateData({ snapshots: updated });
    setSnapshotRevenue(0);
    setSnapshotVisits(0);
  };

  const deleteSnapshot = (id: string) => {
    updateData({ snapshots: data.snapshots.filter(s => s.id !== id) });
  };

  // Format helpers
  const fmt = (n: number) => "$" + Math.round(n).toLocaleString();
  const fmtPct = (n: number) => Math.round(n) + "%";

  // Section header component
  const SectionHeader = ({ id, title, icon: Icon }: { id: string; title: string; icon: React.ComponentType<{ className?: string }> }) => (
    <button onClick={() => toggleSection(id)} className="w-full flex items-center justify-between p-5 text-left">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-brand-navy/5 flex items-center justify-center">
          <Icon className="w-4 h-4 text-brand-navy/40" />
        </div>
        <h2 className="text-base font-black text-brand-navy">{title}</h2>
      </div>
      {openSections[id] ? <ChevronUp className="w-4 h-4 text-brand-navy/20" /> : <ChevronDown className="w-4 h-4 text-brand-navy/20" />}
    </button>
  );

  const inputClass = "w-full bg-brand-navy/5 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:ring-2 focus:ring-brand-orange/20";

  return (
    <div className="max-w-3xl mx-auto space-y-4 pb-20">
      <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors inline-block">&larr; Back to Tools</Link>

      <div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Practice Financial Dashboard</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Understand your numbers. Make better decisions.</p>
      </div>

      {/* Section 1: Overhead Breakdown */}
      <div className="bg-white rounded-2xl border border-brand-navy/5 shadow-sm overflow-hidden">
        <SectionHeader id="overhead" title="Monthly Overhead" icon={Wallet} />
        {openSections.overhead && (
          <div className="px-5 pb-5 space-y-3">
            {data.expenses.map(expense => (
              <div key={expense.id} className="flex items-center gap-3">
                <input type="text" value={expense.name} onChange={e => updateExpense(expense.id, "name", e.target.value)} placeholder="Expense name" className="flex-1 bg-brand-navy/5 rounded-lg py-2.5 px-3 text-sm font-medium text-brand-navy outline-none" />
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-brand-navy">$</span>
                  <input type="number" value={expense.amount || ""} onChange={e => updateExpense(expense.id, "amount", Number(e.target.value) || 0)} className="w-24 bg-brand-navy/5 rounded-lg py-2.5 px-3 text-sm font-bold text-brand-navy outline-none text-right" />
                </div>
                <button onClick={() => removeExpense(expense.id)} className="p-1 text-brand-navy/20 hover:text-red-500"><X className="w-4 h-4" /></button>
              </div>
            ))}
            <button onClick={addExpense} className="w-full py-2 border-2 border-dashed border-brand-navy/10 rounded-xl text-xs font-bold text-brand-navy/30 hover:border-brand-orange/30 hover:text-brand-orange transition-colors flex items-center justify-center gap-1">
              <Plus className="w-3 h-3" /> Add Expense
            </button>
            <div className="bg-brand-navy rounded-xl p-4 flex items-center justify-between mt-2">
              <span className="text-sm font-bold text-white/60">Total Monthly Overhead</span>
              <span className="text-xl font-black text-white">{fmt(totalOverhead)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Revenue & Fee Structure */}
      <div className="bg-white rounded-2xl border border-brand-navy/5 shadow-sm overflow-hidden">
        <SectionHeader id="revenue" title="Revenue & Fee Structure" icon={DollarSign} />
        {openSections.revenue && (
          <div className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Per-Visit Fee ($)</label>
                <input type="number" value={data.perVisitFee || ""} onChange={e => updateData({ perVisitFee: Number(e.target.value) || 0 })} className={inputClass} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Weekly Visits</label>
                <input type="number" value={data.weeklyVisits || ""} onChange={e => updateData({ weeklyVisits: Number(e.target.value) || 0 })} className={inputClass} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Work Days/Week</label>
                <select value={data.workDaysPerWeek} onChange={e => updateData({ workDaysPerWeek: Number(e.target.value) })} className={inputClass + " appearance-none"}>
                  {[4, 4.5, 5, 5.5, 6].map(d => <option key={d} value={d}>{d} days</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Hours/Day</label>
                <input type="number" value={data.hoursPerDay || ""} onChange={e => updateData({ hoursPerDay: Number(e.target.value) || 0 })} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-brand-navy/5 rounded-xl p-3 text-center">
                <p className="text-xs font-bold text-brand-gray">Monthly Revenue</p>
                <p className="text-lg font-black text-brand-navy">{fmt(monthlyRevenue)}</p>
              </div>
              <div className="bg-brand-navy/5 rounded-xl p-3 text-center">
                <p className="text-xs font-bold text-brand-gray">Daily Revenue</p>
                <p className="text-lg font-black text-brand-navy">{fmt(dailyRevenue)}</p>
              </div>
              <div className="bg-brand-navy/5 rounded-xl p-3 text-center">
                <p className="text-xs font-bold text-brand-gray">Revenue/Hour</p>
                <p className="text-lg font-black text-brand-navy">{fmt(revenuePerHour)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Break-Even Analysis */}
      <div className="bg-white rounded-2xl border border-brand-navy/5 shadow-sm overflow-hidden">
        <SectionHeader id="breakeven" title="Break-Even Analysis" icon={Target} />
        {openSections.breakeven && (
          <div className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-brand-navy rounded-xl p-4 text-center text-white">
                <p className="text-xs font-bold text-white/40">Break-Even</p>
                <p className="text-2xl font-black">{breakEvenVisits}</p>
                <p className="text-xs text-white/40">visits/mo</p>
              </div>
              <div className="bg-brand-navy rounded-xl p-4 text-center text-white">
                <p className="text-xs font-bold text-white/40">Per Day</p>
                <p className="text-2xl font-black">{breakEvenPerDay}</p>
                <p className="text-xs text-white/40">visits/day</p>
              </div>
              <div className={cn("rounded-xl p-4 text-center", isProfit ? "bg-green-500 text-white" : "bg-red-500 text-white")}>
                <p className="text-xs font-bold text-white/60">{isProfit ? "Monthly Profit" : "Monthly Loss"}</p>
                <p className="text-2xl font-black">{fmt(Math.abs(monthlyProfit))}</p>
                <p className="text-xs text-white/60">{isProfit ? "above break-even" : "below break-even"}</p>
              </div>
              <div className={cn("rounded-xl p-4 text-center", profitMargin > 30 ? "bg-green-50" : profitMargin > 0 ? "bg-orange-50" : "bg-red-50")}>
                <p className="text-xs font-bold text-brand-gray">Profit Margin</p>
                <p className={cn("text-2xl font-black", profitMargin > 30 ? "text-green-600" : profitMargin > 0 ? "text-brand-orange" : "text-red-500")}>{fmtPct(profitMargin)}</p>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-brand-gray">
                <span>Overhead: {fmt(totalOverhead)}</span>
                <span>Revenue: {fmt(monthlyRevenue)}</span>
              </div>
              <div className="h-6 bg-brand-navy/5 rounded-full overflow-hidden relative">
                {monthlyRevenue > 0 && (
                  <>
                    <div className="h-full bg-red-400/60 absolute left-0 top-0" style={{ width: `${Math.min(100, (totalOverhead / Math.max(monthlyRevenue, totalOverhead)) * 100)}%` }} />
                    {isProfit && <div className="h-full bg-green-500/60 absolute top-0" style={{ left: `${(totalOverhead / Math.max(monthlyRevenue, totalOverhead)) * 100}%`, width: `${Math.max(0, ((monthlyRevenue - totalOverhead) / Math.max(monthlyRevenue, totalOverhead)) * 100)}%` }} />}
                  </>
                )}
                <div className="absolute top-0 h-full w-0.5 bg-brand-navy" style={{ left: `${monthlyRevenue > 0 ? Math.min(100, (totalOverhead / Math.max(monthlyRevenue, totalOverhead)) * 100) : 50}%` }}>
                  <span className="absolute -top-5 -translate-x-1/2 text-[10px] font-black text-brand-navy whitespace-nowrap">Break-Even</span>
                </div>
              </div>
            </div>

            {/* Key Insight */}
            <div className={cn("rounded-xl p-4 border-l-4", isProfit ? (isNearBreakEven ? "bg-orange-50 border-brand-orange" : "bg-green-50 border-green-500") : "bg-red-50 border-red-500")}>
              <div className="flex items-start gap-3">
                {isProfit ? (isNearBreakEven ? <AlertTriangle className="w-5 h-5 text-brand-orange shrink-0" /> : <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />) : <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />}
                <p className="text-sm font-medium text-brand-navy">
                  {!isProfit ? `You're currently ${fmt(Math.abs(monthlyProfit))} below break-even. You need ${Math.ceil(Math.abs(monthlyProfit) / data.perVisitFee)} more visits per month to cover costs.` :
                   isNearBreakEven ? `You're close to break-even with a ${fmtPct(profitMargin)} margin. Focus on increasing case acceptance to build a buffer.` :
                   `You're ${fmt(monthlyProfit)} above break-even with a ${fmtPct(profitMargin)} margin. Strong position — now focus on scaling.`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 4: What-If Scenarios */}
      <div className="bg-white rounded-2xl border border-brand-navy/5 shadow-sm overflow-hidden">
        <SectionHeader id="scenarios" title="What-If Scenarios" icon={TrendingUp} />
        {openSections.scenarios && (
          <div className="px-5 pb-5 space-y-4">
            {/* Fee Increase */}
            <div className="bg-brand-navy/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-brand-navy">Raise fee by</p>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold">$</span>
                  <input type="number" value={data.feeIncrease || ""} onChange={e => updateData({ feeIncrease: Number(e.target.value) || 0 })} className="w-16 bg-white rounded-lg py-1.5 px-2 text-sm font-black text-brand-navy outline-none text-center" />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Current profit: <span className={cn("font-black", isProfit ? "text-green-600" : "text-red-500")}>{fmt(monthlyProfit)}</span></span>
                <span className="text-brand-gray">New profit: <span className="font-black text-green-600">{fmt(scenarioFeeProfit)}</span></span>
              </div>
              <div className="text-xs font-bold text-green-600">+{fmt(scenarioFeeProfit - monthlyProfit)}/month increase</div>
            </div>

            {/* More Visits */}
            <div className="bg-brand-navy/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-brand-navy">Add visits/week</p>
                <input type="number" value={data.additionalVisits || ""} onChange={e => updateData({ additionalVisits: Number(e.target.value) || 0 })} className="w-16 bg-white rounded-lg py-1.5 px-2 text-sm font-black text-brand-navy outline-none text-center" />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Current: <span className="font-black text-brand-navy">{fmt(monthlyProfit)}</span></span>
                <span className="text-brand-gray">New: <span className="font-black text-green-600">{fmt(scenarioVisitsProfit)}</span></span>
              </div>
              <div className="text-xs font-bold text-green-600">+{fmt(scenarioVisitsProfit - monthlyProfit)}/month increase</div>
            </div>

            {/* Reduce Overhead */}
            <div className="bg-brand-navy/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-brand-navy">Cut overhead by</p>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold">$</span>
                  <input type="number" value={data.overheadReduction || ""} onChange={e => updateData({ overheadReduction: Number(e.target.value) || 0 })} className="w-20 bg-white rounded-lg py-1.5 px-2 text-sm font-black text-brand-navy outline-none text-center" />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Current: <span className="font-black text-brand-navy">{fmt(monthlyProfit)}</span></span>
                <span className="text-brand-gray">New: <span className="font-black text-green-600">{fmt(scenarioOverheadProfit)}</span></span>
              </div>
            </div>

            {/* Hire Associate */}
            <div className="bg-brand-navy/5 rounded-xl p-4 space-y-3">
              <p className="text-sm font-bold text-brand-navy">Hire an associate</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-brand-gray font-bold">Their cost/month</label>
                  <input type="number" value={data.associateCost || ""} onChange={e => updateData({ associateCost: Number(e.target.value) || 0 })} className="w-full bg-white rounded-lg py-1.5 px-2 text-sm font-bold text-brand-navy outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-brand-gray font-bold">Their revenue/month</label>
                  <input type="number" value={data.associateRevenue || ""} onChange={e => updateData({ associateRevenue: Number(e.target.value) || 0 })} className="w-full bg-white rounded-lg py-1.5 px-2 text-sm font-bold text-brand-navy outline-none" />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Current: <span className="font-black text-brand-navy">{fmt(monthlyProfit)}</span></span>
                <span className="text-brand-gray">With associate: <span className={cn("font-black", scenarioAssociateProfit > monthlyProfit ? "text-green-600" : "text-red-500")}>{fmt(scenarioAssociateProfit)}</span></span>
              </div>
              <div className={cn("text-xs font-bold", scenarioAssociateProfit > monthlyProfit ? "text-green-600" : "text-red-500")}>
                {scenarioAssociateProfit > monthlyProfit ? "+" : ""}{fmt(scenarioAssociateProfit - monthlyProfit)}/month {scenarioAssociateProfit > monthlyProfit ? "increase" : "decrease"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 5: Income Goals */}
      <div className="bg-white rounded-2xl border border-brand-navy/5 shadow-sm overflow-hidden">
        <SectionHeader id="income" title="Income Goal Calculator" icon={Target} />
        {openSections.income && (
          <div className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Desired Take-Home/Month</label>
                <input type="number" value={data.desiredIncome || ""} onChange={e => updateData({ desiredIncome: Number(e.target.value) || 0 })} className={inputClass} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Tax Rate %</label>
                <input type="number" value={data.taxRate || ""} onChange={e => updateData({ taxRate: Number(e.target.value) || 0 })} className={inputClass} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Avg Visits/Case</label>
                <input type="number" value={data.avgVisitsPerCase || ""} onChange={e => updateData({ avgVisitsPerCase: Number(e.target.value) || 0 })} className={inputClass} />
              </div>
            </div>

            <div className="bg-brand-navy rounded-xl p-5 text-white space-y-3">
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider">To take home {fmt(data.desiredIncome)}/month, you need:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div><p className="text-2xl font-black">{fmt(grossNeeded)}</p><p className="text-xs text-white/40">gross revenue</p></div>
                <div><p className="text-2xl font-black">{visitsForGoal}</p><p className="text-xs text-white/40">visits/month</p></div>
                <div><p className="text-2xl font-black">{visitsForGoalPerDay}</p><p className="text-xs text-white/40">visits/day</p></div>
                <div><p className="text-2xl font-black">{newPatientsForGoal}</p><p className="text-xs text-white/40">new patients/mo</p></div>
              </div>
            </div>

            <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-xl p-4">
              <p className="text-sm text-brand-navy font-medium">
                {visitsForGoal <= monthlyVisits
                  ? `You're already doing ${Math.round(monthlyVisits)} visits/month — you're on track for this income goal. Focus on maintaining consistency.`
                  : `You need ${visitsForGoal - Math.round(monthlyVisits)} more visits/month to hit this goal. That's ${Math.ceil((visitsForGoal - monthlyVisits) / data.avgVisitsPerCase)} more new patients starting care each month.`
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section 6: Key Ratios */}
      <div className="bg-white rounded-2xl border border-brand-navy/5 shadow-sm overflow-hidden">
        <SectionHeader id="ratios" title="Key Ratios & Benchmarks" icon={BarChart3} />
        {openSections.ratios && (
          <div className="px-5 pb-5">
            <div className="space-y-2">
              {[
                { label: "Overhead %", value: fmtPct(overheadPercent), benchmark: "< 55%", good: overheadPercent < 55, tip: overheadPercent >= 55 ? "Your overhead is high. Look for expenses to cut." : "Your overhead ratio is healthy." },
                { label: "Profit Margin", value: fmtPct(profitMargin), benchmark: "> 40%", good: profitMargin > 40, tip: profitMargin <= 40 ? "Increase fee or volume to improve margin." : "Strong profit margin." },
                { label: "Staff Cost %", value: fmtPct(staffPercent), benchmark: "< 25%", good: staffPercent < 25, tip: staffPercent >= 25 ? "Staff costs are high relative to revenue." : "Staff costs are in range." },
                { label: "Marketing %", value: fmtPct(marketingPercent), benchmark: "5-10%", good: marketingPercent >= 5 && marketingPercent <= 10, tip: marketingPercent < 5 ? "Consider investing more in marketing." : marketingPercent > 10 ? "Marketing spend is high — check ROI." : "Marketing spend is balanced." },
                { label: "Revenue/Visit", value: fmt(data.perVisitFee), benchmark: "$50-$100", good: data.perVisitFee >= 50 && data.perVisitFee <= 100, tip: data.perVisitFee < 50 ? "Your per-visit fee may be too low." : data.perVisitFee > 100 ? "Premium pricing — make sure volume supports it." : "Per-visit fee is in healthy range." },
              ].map(ratio => (
                <div key={ratio.label} className="flex items-center justify-between py-3 border-b border-brand-navy/5 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-brand-navy">{ratio.label}</p>
                    <p className="text-xs text-brand-gray">{ratio.tip}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-black text-brand-navy">{ratio.value}</p>
                      <p className="text-xs text-brand-gray">{ratio.benchmark}</p>
                    </div>
                    {ratio.good ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertTriangle className="w-5 h-5 text-brand-orange" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section 7: Monthly Tracking */}
      <div className="bg-white rounded-2xl border border-brand-navy/5 shadow-sm overflow-hidden">
        <SectionHeader id="tracking" title="Monthly Tracking" icon={Save} />
        {openSections.tracking && (
          <div className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Month</label>
                <input type="month" value={snapshotMonth} onChange={e => setSnapshotMonth(e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Revenue</label>
                <input type="number" value={snapshotRevenue || ""} onChange={e => setSnapshotRevenue(Number(e.target.value) || 0)} placeholder="0" className={inputClass} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Visits</label>
                <input type="number" value={snapshotVisits || ""} onChange={e => setSnapshotVisits(Number(e.target.value) || 0)} placeholder="0" className={inputClass} />
              </div>
            </div>
            <button onClick={saveSnapshot} className="w-full bg-brand-navy text-white rounded-xl py-3 text-sm font-bold hover:bg-brand-black transition-colors flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Save Month
            </button>

            {data.snapshots.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-brand-navy/10">
                      <th className="text-left py-2 text-xs font-bold text-brand-gray">Month</th>
                      <th className="text-right py-2 text-xs font-bold text-brand-gray">Revenue</th>
                      <th className="text-right py-2 text-xs font-bold text-brand-gray">Visits</th>
                      <th className="text-right py-2 text-xs font-bold text-brand-gray">Profit</th>
                      <th className="text-right py-2 text-xs font-bold text-brand-gray">Margin</th>
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.snapshots.slice(0, 6).map(snap => {
                      const snapProfit = snap.revenue - totalOverhead;
                      const snapMargin = snap.revenue > 0 ? (snapProfit / snap.revenue) * 100 : 0;
                      return (
                        <tr key={snap.id} className="border-b border-brand-navy/5">
                          <td className="py-2 font-bold text-brand-navy">{new Date(snap.month + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" })}</td>
                          <td className="py-2 text-right font-bold text-brand-navy">{fmt(snap.revenue)}</td>
                          <td className="py-2 text-right text-brand-gray">{snap.visits}</td>
                          <td className={cn("py-2 text-right font-black", snapProfit >= 0 ? "text-green-600" : "text-red-500")}>{fmt(snapProfit)}</td>
                          <td className={cn("py-2 text-right font-bold", snapMargin >= 30 ? "text-green-600" : snapMargin >= 0 ? "text-brand-orange" : "text-red-500")}>{fmtPct(snapMargin)}</td>
                          <td><button onClick={() => deleteSnapshot(snap.id)} className="p-1 text-brand-navy/20 hover:text-red-500"><X className="w-3 h-3" /></button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
