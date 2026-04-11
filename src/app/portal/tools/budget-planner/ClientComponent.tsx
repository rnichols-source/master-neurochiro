"use client";

import { useState } from "react";
import Link from "next/link";

export function BudgetPlannerClient() {
  const [salary, setSalary] = useState(60000);
  const [loans, setLoans] = useState(1500);
  const [rent, setRent] = useState(1200);
  const [insurance, setInsurance] = useState(300);
  const [car, setCar] = useState(400);
  const [food, setFood] = useState(500);
  const [other, setOther] = useState(300);

  const monthly = Math.round(salary / 12);
  const taxes = Math.round(monthly * 0.25);
  const takeHome = monthly - taxes;
  const totalExpenses = loans + rent + insurance + car + food + other;
  const leftOver = takeHome - totalExpenses;

  const inputClass = "w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none";

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div>
        <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">← Back to Tools</Link>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">First Year Budget</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">See what your monthly budget actually looks like after graduation. No surprises.</p>
      </div>

      <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-navy">Expected Annual Salary ($)</label>
          <input type="number" inputMode="numeric" value={salary} onChange={(e) => setSalary(Number(e.target.value) || 0)} className={inputClass} />
          <p className="text-xs text-brand-gray">Average new associate salary: $50,000-$80,000</p>
        </div>

        <p className="text-sm font-bold text-brand-navy pt-2">Monthly Expenses</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-navy/60">Student Loan Payment</label>
            <input type="number" inputMode="numeric" value={loans} onChange={(e) => setLoans(Number(e.target.value) || 0)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-navy/60">Rent / Housing</label>
            <input type="number" inputMode="numeric" value={rent} onChange={(e) => setRent(Number(e.target.value) || 0)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-navy/60">Health Insurance</label>
            <input type="number" inputMode="numeric" value={insurance} onChange={(e) => setInsurance(Number(e.target.value) || 0)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-navy/60">Car / Transport</label>
            <input type="number" inputMode="numeric" value={car} onChange={(e) => setCar(Number(e.target.value) || 0)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-navy/60">Food / Groceries</label>
            <input type="number" inputMode="numeric" value={food} onChange={(e) => setFood(Number(e.target.value) || 0)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-navy/60">Everything Else</label>
            <input type="number" inputMode="numeric" value={other} onChange={(e) => setOther(Number(e.target.value) || 0)} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm">
          <div className="flex justify-between items-center py-2 border-b border-brand-navy/5">
            <span className="text-sm text-brand-gray">Monthly gross pay</span>
            <span className="text-sm font-bold text-brand-navy">${monthly.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-brand-navy/5">
            <span className="text-sm text-brand-gray">Estimated taxes (~25%)</span>
            <span className="text-sm font-bold text-red-500">-${taxes.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-brand-navy/5">
            <span className="text-sm text-brand-gray">Take-home pay</span>
            <span className="text-sm font-bold text-brand-navy">${takeHome.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-brand-navy/5">
            <span className="text-sm text-brand-gray">Total monthly expenses</span>
            <span className="text-sm font-bold text-red-500">-${totalExpenses.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm font-bold text-brand-navy">What's left each month</span>
            <span className={`text-lg font-black ${leftOver >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${leftOver.toLocaleString()}
            </span>
          </div>
        </div>

        {leftOver < 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <p className="text-sm font-bold text-red-700">Heads up — your expenses exceed your take-home pay by ${Math.abs(leftOver).toLocaleString()}/month.</p>
            <p className="text-sm text-red-600 mt-1">Consider: negotiating a higher salary, reducing rent, or extending your loan repayment term to lower monthly payments.</p>
          </div>
        )}

        {leftOver >= 0 && leftOver < 500 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <p className="text-sm font-bold text-yellow-700">Tight but doable. You'll want to build a small emergency fund (aim for $2,000) before spending on anything extra.</p>
          </div>
        )}

        {leftOver >= 500 && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <p className="text-sm font-bold text-green-700">Looking good. You have room to save, pay down loans faster, or invest in your career.</p>
          </div>
        )}
      </div>
    </div>
  );
}
