"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Printer, Save, Trash2, Plus, X,
  User, Activity, ClipboardList, DollarSign, FileText, Calculator
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Types
interface PlanPhase {
  name: string;
  visitsPerWeek: number;
  weeks: number;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
}

interface SavedPlan {
  id: string;
  patientName: string;
  date: string;
  totalVisits: number;
  totalInvestment: number;
  data: any;
}

// Complaints and duration options
const COMPLAINTS = ["Neck Pain", "Low Back Pain", "Headaches/Migraines", "Sciatica", "Scoliosis", "Postural Issues", "Sports Injury", "Auto Accident", "Wellness/Prevention", "Other"];
const DURATIONS = ["Less than 2 weeks", "2-6 weeks", "6 weeks - 3 months", "3-6 months", "6-12 months", "1+ year"];

const SCORING_CATEGORIES = [
  { name: "Postural Distortion", low: "Minimal", high: "Severe" },
  { name: "Range of Motion", low: "Full ROM", high: "Severely Restricted" },
  { name: "Neurological Findings", low: "Normal", high: "Significant Compromise" },
  { name: "Pain Level", low: "Mild/None", high: "Severe/Constant" },
  { name: "Functional Limitation", low: "No Limitation", high: "Unable to Perform Daily Activities" },
];

const STORAGE_KEY = "neurochiro_care_plans";

export function CaseCalculatorClient() {
  const [step, setStep] = useState(1);

  // Step 1: Patient info
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [complaint, setComplaint] = useState("");
  const [duration, setDuration] = useState("");
  const [scores, setScores] = useState([3, 3, 3, 3, 3]);

  // Step 2: Plan
  const [phases, setPhases] = useState<PlanPhase[]>([
    { name: "Intensive", visitsPerWeek: 3, weeks: 4 },
    { name: "Corrective", visitsPerWeek: 2, weeks: 6 },
    { name: "Stabilization", visitsPerWeek: 1, weeks: 8 },
  ]);
  const [perVisitFee, setPerVisitFee] = useState(65);

  // Step 3: Financial
  const [discountPercent, setDiscountPercent] = useState(10);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [includeXrays, setIncludeXrays] = useState(false);
  const [xrayPrice, setXrayPrice] = useState(150);

  // History
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);

  // Load saved plans from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setSavedPlans(JSON.parse(saved));
    } catch {}
  }, []);

  // Calculations
  const severityScore = scores.reduce((a, b) => a + b, 0);
  const severityLabel = severityScore <= 10 ? "Mild" : severityScore <= 17 ? "Moderate" : "Severe";
  const severityColor = severityScore <= 10 ? "text-green-600" : severityScore <= 17 ? "text-brand-orange" : "text-red-500";
  const severityBg = severityScore <= 10 ? "bg-green-500" : severityScore <= 17 ? "bg-brand-orange" : "bg-red-500";

  const totalVisits = phases.reduce((sum, p) => sum + p.visitsPerWeek * p.weeks, 0);
  const totalWeeks = phases.reduce((sum, p) => sum + p.weeks, 0);
  const subtotal = totalVisits * perVisitFee;
  const addOnTotal = addOns.reduce((sum, a) => sum + a.price, 0) + (includeXrays ? xrayPrice : 0);
  const grandTotal = subtotal + addOnTotal;
  const pifDiscount = Math.round(grandTotal * discountPercent / 100);
  const pifTotal = grandTotal - pifDiscount;
  const costPerDay = totalWeeks > 0 ? Math.ceil(grandTotal / (totalWeeks * 7)) : 0;

  // Auto-suggest plan based on severity
  useEffect(() => {
    if (severityScore <= 10) {
      setPhases([
        { name: "Intensive", visitsPerWeek: 2, weeks: 4 },
        { name: "Corrective", visitsPerWeek: 1, weeks: 4 },
        { name: "Stabilization", visitsPerWeek: 1, weeks: 8 },
      ]);
    } else if (severityScore <= 17) {
      setPhases([
        { name: "Intensive", visitsPerWeek: 3, weeks: 4 },
        { name: "Corrective", visitsPerWeek: 2, weeks: 6 },
        { name: "Stabilization", visitsPerWeek: 1, weeks: 8 },
      ]);
    } else {
      setPhases([
        { name: "Intensive", visitsPerWeek: 4, weeks: 4 },
        { name: "Corrective", visitsPerWeek: 3, weeks: 6 },
        { name: "Stabilization", visitsPerWeek: 2, weeks: 8 },
      ]);
    }
  }, [severityScore]);

  const updatePhase = (index: number, field: keyof PlanPhase, value: number) => {
    setPhases(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const addAddOn = () => {
    setAddOns(prev => [...prev, { id: Math.random().toString(36).slice(2), name: "", price: 0 }]);
  };

  const removeAddOn = (id: string) => {
    setAddOns(prev => prev.filter(a => a.id !== id));
  };

  const updateAddOn = (id: string, field: "name" | "price", value: string | number) => {
    setAddOns(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const savePlan = () => {
    const plan: SavedPlan = {
      id: Math.random().toString(36).slice(2),
      patientName: patientName || "Unnamed Patient",
      date: new Date().toLocaleDateString(),
      totalVisits,
      totalInvestment: grandTotal,
      data: { patientName, patientAge, complaint, duration, scores, phases, perVisitFee, discountPercent, addOns, includeXrays, xrayPrice },
    };
    const updated = [plan, ...savedPlans].slice(0, 20);
    setSavedPlans(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const loadPlan = (plan: SavedPlan) => {
    const d = plan.data;
    setPatientName(d.patientName || "");
    setPatientAge(d.patientAge || "");
    setComplaint(d.complaint || "");
    setDuration(d.duration || "");
    setScores(d.scores || [3,3,3,3,3]);
    setPhases(d.phases || []);
    setPerVisitFee(d.perVisitFee || 65);
    setDiscountPercent(d.discountPercent || 10);
    setAddOns(d.addOns || []);
    setIncludeXrays(d.includeXrays || false);
    setXrayPrice(d.xrayPrice || 150);
    setStep(1);
  };

  const deletePlan = (id: string) => {
    const updated = savedPlans.filter(p => p.id !== id);
    setSavedPlans(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handlePrint = () => window.print();

  // Step labels for progress bar
  const steps = [
    { num: 1, label: "Assessment", icon: User },
    { num: 2, label: "Build Plan", icon: ClipboardList },
    { num: 3, label: "Financial", icon: DollarSign },
    { num: 4, label: "Summary", icon: FileText },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      {/* Back link */}
      <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors inline-block no-print">&larr; Back to Tools</Link>

      {/* Header */}
      <div className="no-print">
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Care Plan Builder</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Build and present care plans for your patients.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between no-print">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center flex-1">
            <button
              onClick={() => setStep(s.num)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all",
                step === s.num ? "bg-brand-navy text-white" :
                step > s.num ? "bg-green-500/10 text-green-600" :
                "bg-brand-navy/5 text-brand-navy/30"
              )}
            >
              <s.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.num}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={cn("flex-1 h-0.5 mx-2", step > s.num ? "bg-green-500/30" : "bg-brand-navy/5")} />
            )}
          </div>
        ))}
      </div>

      {/* STEP 1: Patient & Clinical Assessment */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Patient Info */}
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm space-y-4">
            <h2 className="text-base font-black text-brand-navy">Patient Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Patient Name</label>
                <input type="text" value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Mrs. Johnson" className="w-full bg-brand-navy/5 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:ring-2 focus:ring-brand-orange/20" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Age</label>
                <input type="number" value={patientAge} onChange={e => setPatientAge(e.target.value)} placeholder="45" className="w-full bg-brand-navy/5 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:ring-2 focus:ring-brand-orange/20" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Chief Complaint</label>
                <select value={complaint} onChange={e => setComplaint(e.target.value)} className="w-full bg-brand-navy/5 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none appearance-none">
                  <option value="">Select...</option>
                  {COMPLAINTS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">Duration</label>
                <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-brand-navy/5 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none appearance-none">
                  <option value="">Select...</option>
                  {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Clinical Scoring */}
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-brand-navy">Clinical Scoring</h2>
              <div className={cn("px-3 py-1 rounded-full text-xs font-black", severityBg, "text-white")}>
                {severityScore}/25 &mdash; {severityLabel}
              </div>
            </div>

            {SCORING_CATEGORIES.map((cat, i) => (
              <div key={cat.name} className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-bold text-brand-navy">{cat.name}</label>
                  <span className={cn("text-sm font-black", scores[i] <= 2 ? "text-green-600" : scores[i] <= 3 ? "text-brand-orange" : "text-red-500")}>{scores[i]}/5</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => setScores(prev => prev.map((s, j) => j === i ? n : s))}
                      className={cn(
                        "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all",
                        scores[i] === n
                          ? n <= 2 ? "bg-green-500 text-white" : n <= 3 ? "bg-brand-orange text-white" : "bg-red-500 text-white"
                          : "bg-brand-navy/5 text-brand-navy/40 hover:bg-brand-navy/10"
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-brand-gray">
                  <span>{cat.low}</span>
                  <span>{cat.high}</span>
                </div>
              </div>
            ))}

            {/* Severity Summary */}
            <div className={cn("rounded-xl p-4 text-center", severityScore <= 10 ? "bg-green-50" : severityScore <= 17 ? "bg-orange-50" : "bg-red-50")}>
              <p className={cn("text-lg font-black", severityColor)}>Clinical Severity: {severityLabel}</p>
              <p className="text-xs text-brand-gray font-medium mt-1">
                {severityScore <= 10 ? "Recommend a shorter corrective plan (~24 visits)" :
                 severityScore <= 17 ? "Recommend a standard corrective plan (~32 visits)" :
                 "Recommend an extended corrective plan (~48+ visits)"}
              </p>
            </div>
          </div>

          <button onClick={() => setStep(2)} className="w-full bg-brand-navy text-white rounded-xl py-4 text-sm font-bold hover:bg-brand-black transition-colors flex items-center justify-center gap-2">
            Next: Build the Plan <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Build the Care Plan */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-brand-navy">Plan Structure</h2>
              <div className="text-right">
                <p className="text-2xl font-black text-brand-navy">{totalVisits}</p>
                <p className="text-xs text-brand-gray">total visits</p>
              </div>
            </div>

            {phases.map((phase, i) => (
              <div key={i} className="bg-brand-navy/5 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-brand-navy">{phase.name} Phase</h3>
                  <span className="text-sm font-black text-brand-orange">{phase.visitsPerWeek * phase.weeks} visits</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-gray">Visits/Week</label>
                    <select value={phase.visitsPerWeek} onChange={e => updatePhase(i, "visitsPerWeek", Number(e.target.value))} className="w-full bg-white rounded-lg py-2 px-3 text-sm font-medium text-brand-navy outline-none appearance-none">
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}x / week</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-gray">Duration</label>
                    <select value={phase.weeks} onChange={e => updatePhase(i, "weeks", Number(e.target.value))} className="w-full bg-white rounded-lg py-2 px-3 text-sm font-medium text-brand-navy outline-none appearance-none">
                      {[2, 3, 4, 6, 8, 10, 12, 16, 20, 24].map(n => <option key={n} value={n}>{n} weeks</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Per-Visit Fee */}
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm space-y-3">
            <h2 className="text-base font-black text-brand-navy">Per-Visit Fee</h2>
            <div className="flex items-center gap-3">
              <span className="text-lg font-black text-brand-navy">$</span>
              <input type="number" value={perVisitFee} onChange={e => setPerVisitFee(Number(e.target.value) || 0)} className="w-32 bg-brand-navy/5 rounded-xl py-3 px-4 text-lg font-black text-brand-navy outline-none focus:ring-2 focus:ring-brand-orange/20" />
              <span className="text-sm text-brand-gray font-medium">per visit</span>
            </div>
            <div className="bg-brand-navy/5 rounded-xl p-4 flex items-center justify-between">
              <span className="text-sm font-bold text-brand-gray">Plan Total</span>
              <span className="text-2xl font-black text-brand-navy">${subtotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 bg-brand-navy/5 text-brand-navy rounded-xl py-4 text-sm font-bold hover:bg-brand-navy/10 transition-colors flex items-center justify-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => setStep(3)} className="flex-1 bg-brand-navy text-white rounded-xl py-4 text-sm font-bold hover:bg-brand-black transition-colors flex items-center justify-center gap-2">
              Next: Financial <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Financial Presentation */}
      {step === 3 && (
        <div className="space-y-6">
          {/* Main Investment Card */}
          <div className="bg-brand-navy text-white rounded-2xl p-6 md:p-10 text-center space-y-6">
            {patientName && <p className="text-sm text-white/50 font-bold uppercase tracking-wider">{patientName}&apos;s Care Plan</p>}
            <div>
              <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">Total Investment</p>
              <p className="text-5xl md:text-6xl font-black">${grandTotal.toLocaleString()}</p>
              <p className="text-sm text-white/40 mt-2">{totalVisits} visits over {totalWeeks} weeks</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-white/40 font-bold">Pay in Full</p>
                <p className="text-lg font-black text-brand-orange">${pifTotal.toLocaleString()}</p>
                <p className="text-xs text-green-400 font-bold">Save ${pifDiscount.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-white/40 font-bold">2 Payments</p>
                <p className="text-lg font-black">${Math.ceil(grandTotal / 2).toLocaleString()}/mo</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-white/40 font-bold">3 Payments</p>
                <p className="text-lg font-black">${Math.ceil(grandTotal / 3).toLocaleString()}/mo</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-white/40 font-bold">6 Payments</p>
                <p className="text-lg font-black">${Math.ceil(grandTotal / 6).toLocaleString()}/mo</p>
              </div>
            </div>

            <p className="text-sm text-white/30 font-medium">That&apos;s only <span className="text-brand-orange font-black">${costPerDay}/day</span> for your health.</p>
          </div>

          {/* Discount & Add-Ons */}
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm space-y-4 no-print">
            <h2 className="text-base font-black text-brand-navy">Adjustments</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy">PIF Discount %</label>
                <input type="number" value={discountPercent} onChange={e => setDiscountPercent(Number(e.target.value) || 0)} className="w-full bg-brand-navy/5 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-navy flex items-center gap-2">
                  <input type="checkbox" checked={includeXrays} onChange={e => setIncludeXrays(e.target.checked)} className="rounded" /> X-Rays
                </label>
                {includeXrays && (
                  <input type="number" value={xrayPrice} onChange={e => setXrayPrice(Number(e.target.value) || 0)} placeholder="150" className="w-full bg-brand-navy/5 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none" />
                )}
              </div>
            </div>

            {/* Add-ons */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-brand-navy">Add-Ons (Supplements, etc.)</label>
                <button onClick={addAddOn} className="text-xs font-bold text-brand-orange flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
              </div>
              {addOns.map(addon => (
                <div key={addon.id} className="flex gap-2 items-center">
                  <input type="text" value={addon.name} onChange={e => updateAddOn(addon.id, "name", e.target.value)} placeholder="Supplement name" className="flex-1 bg-brand-navy/5 rounded-lg py-2 px-3 text-sm outline-none" />
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-brand-navy">$</span>
                    <input type="number" value={addon.price} onChange={e => updateAddOn(addon.id, "price", Number(e.target.value) || 0)} className="w-20 bg-brand-navy/5 rounded-lg py-2 px-3 text-sm outline-none" />
                  </div>
                  <button onClick={() => removeAddOn(addon.id)} className="p-1 text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 no-print">
            <button onClick={() => setStep(2)} className="flex-1 bg-brand-navy/5 text-brand-navy rounded-xl py-4 text-sm font-bold hover:bg-brand-navy/10 transition-colors flex items-center justify-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => setStep(4)} className="flex-1 bg-brand-navy text-white rounded-xl py-4 text-sm font-bold hover:bg-brand-black transition-colors flex items-center justify-center gap-2">
              View Summary <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Printable Summary */}
      {step === 4 && (
        <div className="space-y-6">
          {/* Printable Area */}
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-6 md:p-8 shadow-sm space-y-6 print-area">
            {/* Header */}
            <div className="text-center border-b border-brand-navy/10 pb-4">
              <p className="text-xs font-black text-brand-orange uppercase tracking-widest">NeuroChiro Mastermind</p>
              <h2 className="text-xl font-black text-brand-navy mt-1">Care Plan Summary</h2>
              <p className="text-sm text-brand-gray mt-1">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>

            {/* Patient Info */}
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-brand-gray font-bold">Patient</p><p className="text-sm font-black text-brand-navy">{patientName || "\u2014"}</p></div>
              <div><p className="text-xs text-brand-gray font-bold">Age</p><p className="text-sm font-black text-brand-navy">{patientAge || "\u2014"}</p></div>
              <div><p className="text-xs text-brand-gray font-bold">Chief Complaint</p><p className="text-sm font-black text-brand-navy">{complaint || "\u2014"}</p></div>
              <div><p className="text-xs text-brand-gray font-bold">Duration</p><p className="text-sm font-black text-brand-navy">{duration || "\u2014"}</p></div>
            </div>

            {/* Severity */}
            <div className="flex items-center justify-between bg-brand-navy/5 rounded-xl p-4">
              <span className="text-sm font-bold text-brand-navy">Clinical Severity Score</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-brand-navy/10 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", severityBg)} style={{ width: `${(severityScore / 25) * 100}%` }} />
                </div>
                <span className={cn("text-sm font-black", severityColor)}>{severityScore}/25 ({severityLabel})</span>
              </div>
            </div>

            {/* Plan Phases */}
            <div>
              <h3 className="text-sm font-black text-brand-navy mb-3">Recommended Care Plan</h3>
              <div className="space-y-2">
                {phases.map((phase, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-brand-navy/5">
                    <div>
                      <p className="text-sm font-bold text-brand-navy">{phase.name} Phase</p>
                      <p className="text-xs text-brand-gray">{phase.visitsPerWeek}x/week for {phase.weeks} weeks</p>
                    </div>
                    <span className="text-sm font-black text-brand-navy">{phase.visitsPerWeek * phase.weeks} visits</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm font-black text-brand-navy">Total</p>
                  <p className="text-lg font-black text-brand-orange">{totalVisits} visits over {totalWeeks} weeks</p>
                </div>
              </div>
            </div>

            {/* Financial */}
            <div>
              <h3 className="text-sm font-black text-brand-navy mb-3">Investment</h3>
              <div className="bg-brand-navy rounded-xl p-5 text-white text-center">
                <p className="text-3xl font-black">${grandTotal.toLocaleString()}</p>
                <p className="text-xs text-white/40 mt-1">${perVisitFee}/visit &times; {totalVisits} visits{addOnTotal > 0 ? ` + $${addOnTotal} add-ons` : ""}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-xl p-3 text-center">
                  <p className="text-xs font-bold text-brand-orange">Pay in Full</p>
                  <p className="text-lg font-black text-brand-navy">${pifTotal.toLocaleString()}</p>
                  <p className="text-xs text-green-600 font-bold">Save ${pifDiscount.toLocaleString()}</p>
                </div>
                <div className="bg-brand-navy/5 rounded-xl p-3 text-center">
                  <p className="text-xs font-bold text-brand-gray">3 Monthly Payments</p>
                  <p className="text-lg font-black text-brand-navy">${Math.ceil(grandTotal / 3).toLocaleString()}/mo</p>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 pt-8 mt-8 border-t border-brand-navy/10">
              <div>
                <div className="border-b border-brand-navy h-10" />
                <p className="text-xs text-brand-gray mt-1">Doctor Signature / Date</p>
              </div>
              <div>
                <div className="border-b border-brand-navy h-10" />
                <p className="text-xs text-brand-gray mt-1">Patient Signature / Date</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 no-print">
            <button onClick={() => setStep(3)} className="flex-1 bg-brand-navy/5 text-brand-navy rounded-xl py-4 text-sm font-bold hover:bg-brand-navy/10 transition-colors flex items-center justify-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={handlePrint} className="flex-1 bg-brand-navy text-white rounded-xl py-4 text-sm font-bold hover:bg-brand-black transition-colors flex items-center justify-center gap-2">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={savePlan} className="flex-1 bg-brand-orange text-white rounded-xl py-4 text-sm font-bold hover:bg-[#B35520] transition-colors flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        </div>
      )}

      {/* CARE PLAN HISTORY */}
      {savedPlans.length > 0 && (
        <div className="space-y-3 no-print">
          <h2 className="text-base font-black text-brand-navy">Recent Care Plans</h2>
          {savedPlans.map(plan => (
            <div key={plan.id} className="bg-white rounded-2xl border border-brand-navy/5 p-4 flex items-center justify-between shadow-sm">
              <button onClick={() => loadPlan(plan)} className="flex-1 text-left">
                <p className="text-sm font-bold text-brand-navy">{plan.patientName}</p>
                <p className="text-xs text-brand-gray">{plan.date} &mdash; {plan.totalVisits} visits &mdash; ${plan.totalInvestment.toLocaleString()}</p>
              </button>
              <button onClick={() => deletePlan(plan.id)} className="p-2 text-brand-navy/20 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Print CSS */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .print-area { border: none !important; box-shadow: none !important; padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}
