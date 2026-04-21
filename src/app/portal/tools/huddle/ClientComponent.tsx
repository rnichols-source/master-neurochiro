"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  BarChart3,
  ClipboardList,
  Flag,
  Target,
  Moon,
  Plus,
  X,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";

/* ─── Types ─── */
interface SchedulePatient {
  id: string;
  name: string;
  visitType: string;
  flag: string;
  notes: string;
  prepped: boolean;
}

interface FlagItem {
  id: string;
  patient: string;
  category: string;
  label: string;
  objective: string;
  done: boolean;
}

interface DayData {
  patients: number;
  newPatients: number;
  collections: number;
  carePlans: number;
  reExams: number;
  noShows: number;
  schedule: SchedulePatient[];
  flags: FlagItem[];
  priorities: [string, string, string];
  prioritiesDone: [boolean, boolean, boolean];
  scriptFocus: string;
  customScript: string;
  reflection: { well: string; different: string; improve: string };
  scores: { clinical: number; communication: number; energy: number };
}

interface HuddleState {
  monthlyGoalCollections: number;
  monthlyGoalNewPatients: number;
  monthlyGoalVisits: number;
  affirmation: string;
  workDaysPerMonth: number;
  days: Record<string, DayData>;
}

/* ─── Constants ─── */
const TABS = ["Pulse", "Schedule", "Flags", "Game Plan", "End of Day"] as const;
const TAB_ICONS = [BarChart3, ClipboardList, Flag, Target, Moon];

const VISIT_TYPES = [
  "New Patient Day 1",
  "Report of Findings Day 2",
  "Regular Visit",
  "Re-Exam",
  "Progress Exam",
  "Review of Care",
];
const VISIT_COLORS: Record<string, string> = {
  "New Patient Day 1": "border-l-4 border-l-green-500",
  "Report of Findings Day 2": "border-l-4 border-l-blue-500",
  "Re-Exam": "border-l-4 border-l-purple-500",
  "Progress Exam": "border-l-4 border-l-cyan-500",
  "Review of Care": "border-l-4 border-l-pink-500",
  "Regular Visit": "",
};
const VISIT_PRIORITY: Record<string, number> = {
  "New Patient Day 1": 1,
  "Report of Findings Day 2": 2,
  "Re-Exam": 3,
  "Progress Exam": 4,
  "Review of Care": 5,
  "Regular Visit": 6,
};

const FLAG_TEMPLATES: Record<string, { label: string; objective: string }[]> = {
  Financial: [
    { label: "Balance Due", objective: "Balance due — collect before adjustment" },
    { label: "Co-Pay Owed", objective: "Co-pay not collected last visit — collect today" },
    { label: "Payment Plan Past Due", objective: "Payment plan past due — conversation needed" },
    { label: "Insurance Auth Expiring", objective: "Insurance auth expiring — verify coverage" },
  ],
  Clinical: [
    { label: "NP Prep (Day 1)", objective: "New patient Day 1 — full workup ready, paperwork reviewed" },
    { label: "ROF Prep (Day 2)", objective: "Report of Findings prep — report printed, care plan ready" },
    { label: "Re-Exam Due", objective: "Re-exam due — prep scan room, compare to initial findings" },
    { label: "Care Plan Ending", objective: "Care plan ending soon — prepare transition conversation" },
  ],
  Growth: [
    { label: "Google Review Ask", objective: "Happy patient — ask for Google review today" },
    { label: "Referral Ask", objective: "Great results — ask about family/friends who need care" },
    { label: "Testimonial Opportunity", objective: "Great transformation — get testimonial & photo" },
    { label: "Social Media Permission", objective: "Photo-worthy moment — ask for social media permission" },
  ],
  Compliance: [
    { label: "Missed Visits (2+)", objective: "Missed 2+ visits — re-engage conversation today" },
    { label: "About to Drop Off", objective: "Attendance declining — address before they ghost" },
    { label: "Not Following Home Care", objective: "Not following exercises — revisit today" },
    { label: "Overdue for Re-Exam", objective: "Past due for re-exam — schedule before next visit" },
  ],
};
const FLAG_ICONS: Record<string, string> = { Financial: "\u{1F4B0}", Clinical: "\u{1FA7A}", Growth: "\u2B50", Compliance: "\u26A0\uFE0F" };
const FLAG_COLORS: Record<string, string> = {
  Financial: "bg-amber-500/10 text-amber-600",
  Clinical: "bg-blue-500/10 text-blue-600",
  Growth: "bg-green-500/10 text-green-600",
  Compliance: "bg-red-500/10 text-red-600",
};

const SCRIPT_OPTIONS = [
  { value: "day1", label: "Day 1 Opening Script", snippet: "\"Here is what we're doing today. First, I'm going to listen. Then we'll run specific scans. My goal: see if I can help you, or refer you to someone who can.\"" },
  { value: "day2", label: "Day 2 ROF Presentation", snippet: "\"Based on what I found, here is what's happening, what it means for your life, and exactly what I recommend to fix it.\"" },
  { value: "financial", label: "Care Plan Financial Script", snippet: "\"The investment for your care is $X. We offer a pay-in-full discount or a monthly payment plan. Which works best for you?\"" },
  { value: "think", label: "Objection: I need to think about it", snippet: "\"I understand. Can I ask — what specifically are you thinking about? Is it the time commitment, the financial part, or something about the care itself?\"" },
  { value: "expensive", label: "Objection: That's too expensive", snippet: "\"I hear you. Let me ask — if cost weren't a factor, would you move forward with care? ... Let's look at the payment plan options.\"" },
  { value: "reexam", label: "Re-Exam Transition Script", snippet: "\"Let's look at where you started vs where you are now. Your body is responding — here's why we continue.\"" },
  { value: "custom", label: "Custom (write your own)", snippet: "" },
];

const STORAGE_KEY = "neurochiro_daily_huddle";

/* ─── Helpers ─── */
function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function defaultDay(): DayData {
  return {
    patients: 0,
    newPatients: 0,
    collections: 0,
    carePlans: 0,
    reExams: 0,
    noShows: 0,
    schedule: [],
    flags: [],
    priorities: ["", "", ""],
    prioritiesDone: [false, false, false],
    scriptFocus: "day1",
    customScript: "",
    reflection: { well: "", different: "", improve: "" },
    scores: { clinical: 0, communication: 0, energy: 0 },
  };
}

function defaultState(): HuddleState {
  return {
    monthlyGoalCollections: 50000,
    monthlyGoalNewPatients: 20,
    monthlyGoalVisits: 300,
    affirmation: "",
    workDaysPerMonth: 20,
    days: {},
  };
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function countWorkdaysRemaining(todayStr: string): number {
  const d = new Date(todayStr + "T12:00:00");
  const year = d.getFullYear();
  const month = d.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  let count = 0;
  for (let day = d.getDate(); day <= lastDay; day++) {
    const dow = new Date(year, month, day).getDay();
    if (dow !== 0 && dow !== 6) count++;
  }
  return count;
}

function countWorkdaysElapsed(todayStr: string): number {
  const d = new Date(todayStr + "T12:00:00");
  const year = d.getFullYear();
  const month = d.getMonth();
  let count = 0;
  for (let day = 1; day < d.getDate(); day++) {
    const dow = new Date(year, month, day).getDay();
    if (dow !== 0 && dow !== 6) count++;
  }
  return count;
}

/* ─── Component ─── */
export function HuddleClient() {
  const [state, setState] = useState<HuddleState>(defaultState);
  const [selectedDate, setSelectedDate] = useState(() => toDateStr(new Date()));
  const [activeTab, setActiveTab] = useState<number>(0);
  const [saved, setSaved] = useState(false);
  const [flagCategory, setFlagCategory] = useState<string>("Financial");
  const [flagPatient, setFlagPatient] = useState("");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loaded = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as HuddleState;
        setState(parsed);
      }
    } catch {
      // ignore
    }
    loaded.current = true;
  }, []);

  // Debounced auto-save
  const debouncedSave = useCallback((data: HuddleState) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        // ignore
      }
    }, 500);
  }, []);

  const updateState = useCallback(
    (partial: Partial<HuddleState>) => {
      setState((prev) => {
        const next = { ...prev, ...partial };
        debouncedSave(next);
        return next;
      });
    },
    [debouncedSave],
  );

  const today = selectedDate;
  const dayData: DayData = state.days[today] || defaultDay();

  const updateDay = useCallback(
    (partial: Partial<DayData>) => {
      setState((prev) => {
        const prevDay = prev.days[today] || defaultDay();
        const next = {
          ...prev,
          days: { ...prev.days, [today]: { ...prevDay, ...partial } },
        };
        debouncedSave(next);
        return next;
      });
    },
    [today, debouncedSave],
  );

  const saveNow = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // ignore
    }
  }, [state]);

  // Date navigation
  const shiftDate = (dir: number) => {
    const d = new Date(selectedDate + "T12:00:00");
    d.setDate(d.getDate() + dir);
    setSelectedDate(toDateStr(d));
  };

  // MTD calculations
  const currentMonth = today.slice(0, 7);
  const monthDays = Object.entries(state.days).filter(([date]) => date.startsWith(currentMonth));
  const mtdCollections = monthDays.reduce((sum, [, d]) => sum + (d.collections || 0), 0);
  const mtdVisits = monthDays.reduce((sum, [, d]) => sum + (d.patients || 0), 0);
  const mtdNewPatients = monthDays.reduce((sum, [, d]) => sum + (d.newPatients || 0), 0);
  const mtdCarePlans = monthDays.reduce((sum, [, d]) => sum + (d.carePlans || 0), 0);
  const mtdNoShows = monthDays.reduce((sum, [, d]) => sum + (d.noShows || 0), 0);

  const workDaysRemaining = countWorkdaysRemaining(today);
  const workDaysElapsed = countWorkdaysElapsed(today);
  const remainingCollections = state.monthlyGoalCollections - mtdCollections;
  const dailyTarget = workDaysRemaining > 0 ? Math.ceil(remainingCollections / workDaysRemaining) : 0;
  const collectionProgress = state.monthlyGoalCollections > 0 ? Math.min((mtdCollections / state.monthlyGoalCollections) * 100, 100) : 0;
  const expectedProgress = state.workDaysPerMonth > 0 ? ((workDaysElapsed) / state.workDaysPerMonth) * 100 : 0;
  const onTrack = collectionProgress >= expectedProgress - 5;

  // Last 5 days with data
  const last5Days = Object.entries(state.days)
    .filter(([date]) => date <= today)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 5);

  // Schedule sorted: flagged first, then by visit priority
  const sortedSchedule = [...dayData.schedule].sort((a, b) => {
    if (a.flag && !b.flag) return -1;
    if (!a.flag && b.flag) return 1;
    return (VISIT_PRIORITY[a.visitType] || 99) - (VISIT_PRIORITY[b.visitType] || 99);
  });

  /* ─── Tab: Pulse ─── */
  function renderPulse() {
    const status = collectionProgress >= 90 ? "green" : collectionProgress >= 60 ? "yellow" : "red";
    return (
      <div className="space-y-6">
        {/* Monthly Goals */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-brand-navy">Monthly Goals</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-gray uppercase tracking-wider">Collections Goal</label>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-brand-orange" />
                <input
                  type="number"
                  inputMode="numeric"
                  value={state.monthlyGoalCollections}
                  onChange={(e) => updateState({ monthlyGoalCollections: Number(e.target.value) || 0 })}
                  className="w-full bg-white border border-brand-navy/10 rounded-xl py-2 px-3 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-gray uppercase tracking-wider">New Patients Goal</label>
              <input
                type="number"
                inputMode="numeric"
                value={state.monthlyGoalNewPatients}
                onChange={(e) => updateState({ monthlyGoalNewPatients: Number(e.target.value) || 0 })}
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-2 px-3 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-gray uppercase tracking-wider">Visits Goal</label>
              <input
                type="number"
                inputMode="numeric"
                value={state.monthlyGoalVisits}
                onChange={(e) => updateState({ monthlyGoalVisits: Number(e.target.value) || 0 })}
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-2 px-3 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Today's Numbers */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-brand-navy">Today&apos;s Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {([
              ["Patients", "patients"],
              ["New Patients", "newPatients"],
              ["Collections ($)", "collections"],
              ["Care Plans", "carePlans"],
              ["Re-Exams", "reExams"],
              ["No-Shows", "noShows"],
            ] as const).map(([label, key]) => (
              <div key={key} className="space-y-1">
                <label className="text-xs font-bold text-brand-gray uppercase tracking-wider">{label}</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={dayData[key]}
                  onChange={(e) => updateDay({ [key]: Number(e.target.value) || 0 })}
                  className="w-full bg-white border border-brand-navy/10 rounded-xl py-2 px-3 text-base font-medium text-brand-navy focus:border-brand-orange/40 outline-none"
                />
              </div>
            ))}
          </div>

          <button
            onClick={saveNow}
            className={cn(
              "w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all",
              saved
                ? "bg-green-500 text-white"
                : "bg-brand-navy text-white hover:bg-brand-navy/90",
            )}
          >
            {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Today</>}
          </button>
        </div>

        {/* Status Dashboard */}
        <div
          className={cn(
            "rounded-2xl p-6 md:p-8 text-center space-y-4",
            status === "green" ? "bg-green-50 border border-green-200" :
            status === "yellow" ? "bg-yellow-50 border border-yellow-200" :
            "bg-red-50 border border-red-200",
          )}
        >
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-wider",
              status === "green" ? "text-green-600" : status === "yellow" ? "text-yellow-600" : "text-red-600",
            )}
          >
            {status === "green" ? "On Track" : status === "yellow" ? "Watch Closely" : "Behind Pace"}
          </p>
          <p className="text-3xl font-black text-brand-navy">${dailyTarget.toLocaleString()}</p>
          <p className="text-sm text-brand-gray font-medium">needed per day for the rest of the month ({workDaysRemaining} work days left)</p>
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-brand-gray">
              <span>${mtdCollections.toLocaleString()}</span>
              <span>${state.monthlyGoalCollections.toLocaleString()}</span>
            </div>
            <div className="h-3 bg-brand-navy/5 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  status === "green" ? "bg-green-500" : status === "yellow" ? "bg-yellow-500" : "bg-red-500",
                )}
                style={{ width: `${collectionProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* MTD Summary */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm">
          <h2 className="text-lg font-black text-brand-navy mb-4">Month-to-Date</h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-black text-brand-navy">{mtdVisits}</p>
              <p className="text-xs text-brand-gray font-bold">Visits</p>
            </div>
            <div>
              <p className="text-2xl font-black text-brand-orange">{mtdNewPatients}</p>
              <p className="text-xs text-brand-gray font-bold">New Patients</p>
            </div>
            <div>
              <p className="text-2xl font-black text-brand-navy">{mtdCarePlans}</p>
              <p className="text-xs text-brand-gray font-bold">Care Plans</p>
            </div>
          </div>
        </div>

        {/* Last 5 Days Mini Table */}
        {last5Days.length > 0 && (
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm">
            <h2 className="text-lg font-black text-brand-navy mb-4">Recent Days</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs font-bold text-brand-gray uppercase tracking-wider border-b border-brand-navy/5">
                    <th className="pb-2 text-left">Date</th>
                    <th className="pb-2 text-right">Patients</th>
                    <th className="pb-2 text-right">New</th>
                    <th className="pb-2 text-right">Collections</th>
                    <th className="pb-2 text-right">No-Shows</th>
                  </tr>
                </thead>
                <tbody>
                  {last5Days.map(([date, d]) => (
                    <tr key={date} className="border-b border-brand-navy/5 last:border-0">
                      <td className="py-2 font-medium text-brand-navy">{date.slice(5)}</td>
                      <td className="py-2 text-right text-brand-gray">{d.patients}</td>
                      <td className="py-2 text-right text-brand-gray">{d.newPatients}</td>
                      <td className="py-2 text-right text-brand-gray">${(d.collections || 0).toLocaleString()}</td>
                      <td className="py-2 text-right text-brand-gray">{d.noShows}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ─── Tab: Schedule ─── */
  function renderSchedule() {
    const addPatient = () => {
      const newP: SchedulePatient = {
        id: uid(),
        name: "",
        visitType: "Regular Visit",
        flag: "",
        notes: "",
        prepped: false,
      };
      updateDay({ schedule: [...dayData.schedule, newP] });
    };

    const updatePatient = (id: string, partial: Partial<SchedulePatient>) => {
      updateDay({
        schedule: dayData.schedule.map((p) => (p.id === id ? { ...p, ...partial } : p)),
      });
    };

    const removePatient = (id: string) => {
      updateDay({ schedule: dayData.schedule.filter((p) => p.id !== id) });
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-brand-navy">
            Schedule ({sortedSchedule.length} patient{sortedSchedule.length !== 1 ? "s" : ""})
          </h2>
          <button
            onClick={addPatient}
            className="flex items-center gap-1 bg-brand-orange text-white text-sm font-black py-2 px-4 rounded-xl hover:bg-brand-orange/90 transition-all"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {sortedSchedule.length === 0 && (
          <div className="text-center py-12 text-brand-gray">
            <ClipboardList className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No patients added yet</p>
            <p className="text-sm mt-1">Click &quot;Add&quot; to build your schedule</p>
          </div>
        )}

        <div className="space-y-3">
          {sortedSchedule.map((p) => (
            <div
              key={p.id}
              className={cn(
                "bg-white rounded-2xl border border-brand-navy/5 p-4 shadow-sm space-y-3",
                VISIT_COLORS[p.visitType] || "",
                p.prepped && "opacity-60",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    placeholder="Patient name"
                    value={p.name}
                    onChange={(e) => updatePatient(p.id, { name: e.target.value })}
                    className="w-full bg-transparent text-base font-black text-brand-navy placeholder:text-brand-gray/40 outline-none"
                  />
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={p.visitType}
                      onChange={(e) => updatePatient(p.id, { visitType: e.target.value })}
                      className="text-xs font-bold bg-brand-cream/50 border border-brand-navy/10 rounded-lg py-1 px-2 text-brand-navy outline-none"
                    >
                      {VISIT_TYPES.map((vt) => (
                        <option key={vt} value={vt}>{vt}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Flag (optional)"
                      value={p.flag}
                      onChange={(e) => updatePatient(p.id, { flag: e.target.value })}
                      className="text-xs bg-transparent border border-brand-navy/10 rounded-lg py-1 px-2 text-brand-navy placeholder:text-brand-gray/40 outline-none flex-1 min-w-[120px]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Notes..."
                    value={p.notes}
                    onChange={(e) => updatePatient(p.id, { notes: e.target.value })}
                    className="w-full text-sm bg-transparent text-brand-gray placeholder:text-brand-gray/30 outline-none"
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => updatePatient(p.id, { prepped: !p.prepped })}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                      p.prepped ? "bg-green-500 text-white" : "bg-brand-navy/5 text-brand-gray",
                    )}
                    title={p.prepped ? "Prepped" : "Mark as prepped"}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removePatient(p.id)}
                    className="w-8 h-8 rounded-lg bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visit Type Legend */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-4 shadow-sm">
          <p className="text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">Visit Type Legend</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(VISIT_COLORS).filter(([, v]) => v).map(([type, cls]) => (
              <div key={type} className={cn("text-xs font-medium text-brand-navy px-2 py-1 rounded", cls, "border-l-4")}>
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─── Tab: Flags ─── */
  function renderFlags() {
    const addFlag = (category: string, tpl: { label: string; objective: string }) => {
      const newFlag: FlagItem = {
        id: uid(),
        patient: flagPatient,
        category,
        label: tpl.label,
        objective: tpl.objective,
        done: false,
      };
      updateDay({ flags: [...dayData.flags, newFlag] });
      setFlagPatient("");
    };

    const toggleFlag = (id: string) => {
      updateDay({
        flags: dayData.flags.map((f) => (f.id === id ? { ...f, done: !f.done } : f)),
      });
    };

    const removeFlag = (id: string) => {
      updateDay({ flags: dayData.flags.filter((f) => f.id !== id) });
    };

    const doneFlagCount = dayData.flags.filter((f) => f.done).length;

    return (
      <div className="space-y-6">
        {/* Active Flags */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-brand-navy">
            Flags ({doneFlagCount}/{dayData.flags.length} done)
          </h2>
        </div>

        {dayData.flags.length > 0 && (
          <div className="space-y-2">
            {dayData.flags.map((f) => (
              <div
                key={f.id}
                className={cn(
                  "bg-white rounded-2xl border border-brand-navy/5 p-4 shadow-sm flex items-start gap-3",
                  f.done && "opacity-50",
                )}
              >
                <button
                  onClick={() => toggleFlag(f.id)}
                  className={cn(
                    "w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 transition-all",
                    f.done ? "bg-green-500 text-white" : "border-2 border-brand-navy/20",
                  )}
                >
                  {f.done && <CheckCircle2 className="w-4 h-4" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", FLAG_COLORS[f.category] || "bg-gray-100 text-gray-600")}>
                      {FLAG_ICONS[f.category] || ""} {f.label}
                    </span>
                    {f.patient && <span className="text-xs font-medium text-brand-navy">{f.patient}</span>}
                  </div>
                  <p className={cn("text-sm text-brand-gray", f.done && "line-through")}>{f.objective}</p>
                </div>
                <button
                  onClick={() => removeFlag(f.id)}
                  className="w-6 h-6 rounded flex-shrink-0 text-red-300 hover:text-red-500 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {dayData.flags.length === 0 && (
          <div className="text-center py-8 text-brand-gray">
            <Flag className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No flags yet</p>
            <p className="text-sm mt-1">Add flags from the templates below</p>
          </div>
        )}

        {/* Add Flags */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-brand-navy">Add Flag</h3>
          <input
            type="text"
            placeholder="Patient name (optional)"
            value={flagPatient}
            onChange={(e) => setFlagPatient(e.target.value)}
            className="w-full bg-brand-cream/30 border border-brand-navy/10 rounded-xl py-2 px-3 text-sm text-brand-navy placeholder:text-brand-gray/40 outline-none"
          />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {Object.keys(FLAG_TEMPLATES).map((cat) => (
              <button
                key={cat}
                onClick={() => setFlagCategory(cat)}
                className={cn(
                  "text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition-all",
                  flagCategory === cat
                    ? "bg-brand-navy text-white"
                    : "bg-brand-navy/5 text-brand-navy hover:bg-brand-navy/10",
                )}
              >
                {FLAG_ICONS[cat]} {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {FLAG_TEMPLATES[flagCategory]?.map((tpl) => (
              <button
                key={tpl.label}
                onClick={() => addFlag(flagCategory, tpl)}
                className="text-left bg-brand-cream/30 border border-brand-navy/5 rounded-xl p-3 hover:border-brand-orange/30 transition-all"
              >
                <p className="text-sm font-bold text-brand-navy">{tpl.label}</p>
                <p className="text-xs text-brand-gray mt-0.5">{tpl.objective}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─── Tab: Game Plan ─── */
  function renderGamePlan() {
    const updatePriority = (index: number, value: string) => {
      const p = [...dayData.priorities] as [string, string, string];
      p[index] = value;
      updateDay({ priorities: p });
    };

    const togglePriorityDone = (index: number) => {
      const d = [...dayData.prioritiesDone] as [boolean, boolean, boolean];
      d[index] = !d[index];
      updateDay({ prioritiesDone: d });
    };

    const selectedScript = SCRIPT_OPTIONS.find((s) => s.value === dayData.scriptFocus);

    return (
      <div className="space-y-6">
        {/* Top 3 Priorities */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-brand-navy flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-orange" /> Top 3 Priorities
          </h2>
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <button
                  onClick={() => togglePriorityDone(i)}
                  className={cn(
                    "w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center transition-all",
                    dayData.prioritiesDone[i] ? "bg-green-500 text-white" : "border-2 border-brand-navy/20",
                  )}
                >
                  {dayData.prioritiesDone[i] && <CheckCircle2 className="w-4 h-4" />}
                </button>
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-black text-brand-orange">#{i + 1}</span>
                  <input
                    type="text"
                    placeholder={`Priority ${i + 1}...`}
                    value={dayData.priorities[i]}
                    onChange={(e) => updatePriority(i, e.target.value)}
                    className={cn(
                      "flex-1 bg-transparent text-sm font-medium text-brand-navy placeholder:text-brand-gray/40 outline-none",
                      dayData.prioritiesDone[i] && "line-through opacity-60",
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Script Focus */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-brand-navy">Script Focus</h2>
          <select
            value={dayData.scriptFocus}
            onChange={(e) => updateDay({ scriptFocus: e.target.value })}
            className="w-full bg-brand-cream/30 border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none"
          >
            {SCRIPT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {dayData.scriptFocus === "custom" ? (
            <textarea
              placeholder="Write your custom script..."
              value={dayData.customScript}
              onChange={(e) => updateDay({ customScript: e.target.value })}
              rows={4}
              className="w-full bg-brand-cream/20 border border-brand-navy/10 rounded-xl py-3 px-4 text-sm text-brand-navy placeholder:text-brand-gray/40 outline-none resize-none"
            />
          ) : selectedScript?.snippet ? (
            <div className="bg-brand-cream/30 rounded-xl p-4 border border-brand-navy/5">
              <p className="text-sm text-brand-navy italic leading-relaxed">{selectedScript.snippet}</p>
            </div>
          ) : null}
        </div>

        {/* Affirmation */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm space-y-3">
          <h2 className="text-lg font-black text-brand-navy">Daily Affirmation</h2>
          <textarea
            placeholder="I am the best option for my patients. I serve with certainty and compassion..."
            value={state.affirmation}
            onChange={(e) => updateState({ affirmation: e.target.value })}
            rows={3}
            className="w-full bg-brand-cream/20 border border-brand-navy/10 rounded-xl py-3 px-4 text-sm text-brand-navy placeholder:text-brand-gray/40 outline-none resize-none"
          />
        </div>

        {/* Today's Focus Summary */}
        <div className="bg-brand-navy/5 rounded-2xl p-5 space-y-2">
          <h3 className="text-sm font-black text-brand-navy">Quick View</h3>
          <p className="text-sm text-brand-gray">
            <strong className="text-brand-navy">{dayData.patients}</strong> patients today
            {dayData.newPatients > 0 && <> including <strong className="text-brand-orange">{dayData.newPatients}</strong> new</>}
          </p>
          <p className="text-sm text-brand-gray">
            <strong className="text-brand-navy">{dayData.flags.filter((f) => !f.done).length}</strong> open flags to handle
          </p>
          <p className="text-sm text-brand-gray">
            Daily target: <strong className="text-brand-navy">${dailyTarget.toLocaleString()}</strong>
          </p>
        </div>
      </div>
    );
  }

  /* ─── Tab: End of Day ─── */
  function renderEndOfDay() {
    const updateScore = (key: keyof DayData["scores"], value: number) => {
      updateDay({ scores: { ...dayData.scores, [key]: value } });
    };

    const updateReflection = (key: keyof DayData["reflection"], value: string) => {
      updateDay({ reflection: { ...dayData.reflection, [key]: value } });
    };

    const avgScore = dayData.scores.clinical + dayData.scores.communication + dayData.scores.energy > 0
      ? ((dayData.scores.clinical + dayData.scores.communication + dayData.scores.energy) / 3).toFixed(1)
      : "—";

    return (
      <div className="space-y-6">
        {/* Day Recap */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-brand-navy flex items-center gap-2">
            <Moon className="w-5 h-5 text-brand-orange" /> Day Recap
          </h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-brand-cream/30 rounded-xl p-3">
              <p className="text-2xl font-black text-brand-navy">{dayData.patients}</p>
              <p className="text-xs text-brand-gray font-bold">Patients</p>
            </div>
            <div className="bg-brand-cream/30 rounded-xl p-3">
              <p className="text-2xl font-black text-brand-orange">${(dayData.collections || 0).toLocaleString()}</p>
              <p className="text-xs text-brand-gray font-bold">Collected</p>
            </div>
            <div className="bg-brand-cream/30 rounded-xl p-3">
              <p className="text-2xl font-black text-brand-navy">{dayData.newPatients}</p>
              <p className="text-xs text-brand-gray font-bold">New Patients</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-brand-cream/30 rounded-xl p-3">
              <p className="text-2xl font-black text-brand-navy">{dayData.carePlans}</p>
              <p className="text-xs text-brand-gray font-bold">Care Plans</p>
            </div>
            <div className="bg-brand-cream/30 rounded-xl p-3">
              <p className="text-2xl font-black text-brand-navy">{dayData.reExams}</p>
              <p className="text-xs text-brand-gray font-bold">Re-Exams</p>
            </div>
            <div className="bg-brand-cream/30 rounded-xl p-3">
              <p className={cn("text-2xl font-black", dayData.noShows > 0 ? "text-red-500" : "text-brand-navy")}>{dayData.noShows}</p>
              <p className="text-xs text-brand-gray font-bold">No-Shows</p>
            </div>
          </div>
        </div>

        {/* Priorities Review */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-black text-brand-navy">Priorities Review</h3>
          {dayData.priorities.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              {dayData.prioritiesDone[i] ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              )}
              <span className={cn("text-sm", p ? "text-brand-navy" : "text-brand-gray/40 italic")}>
                {p || `Priority ${i + 1} not set`}
              </span>
            </div>
          ))}
        </div>

        {/* Self-Assessment Scores */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-brand-navy">Self-Assessment (1-10)</h3>
            <span className="text-sm font-black text-brand-orange">Avg: {avgScore}</span>
          </div>
          {(["clinical", "communication", "energy"] as const).map((key) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between">
                <label className="text-xs font-bold text-brand-gray uppercase tracking-wider capitalize">{key}</label>
                <span className="text-xs font-black text-brand-navy">{dayData.scores[key] || "—"}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={dayData.scores[key]}
                onChange={(e) => updateScore(key, Number(e.target.value))}
                className="w-full accent-brand-orange"
              />
            </div>
          ))}
        </div>

        {/* Reflection */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-brand-navy">Reflection</h3>
          {([
            ["well", "What went well today?"],
            ["different", "What would I do differently?"],
            ["improve", "One thing to improve tomorrow?"],
          ] as const).map(([key, placeholder]) => (
            <div key={key} className="space-y-1">
              <label className="text-xs font-bold text-brand-gray">{placeholder}</label>
              <textarea
                placeholder={placeholder}
                value={dayData.reflection[key]}
                onChange={(e) => updateReflection(key, e.target.value)}
                rows={2}
                className="w-full bg-brand-cream/20 border border-brand-navy/10 rounded-xl py-2 px-3 text-sm text-brand-navy placeholder:text-brand-gray/30 outline-none resize-none"
              />
            </div>
          ))}
        </div>

        {/* Weekly Trend */}
        {last5Days.length > 0 && (
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm">
            <h3 className="text-sm font-black text-brand-navy flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-brand-orange" /> Weekly Trend
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs font-bold text-brand-gray uppercase tracking-wider border-b border-brand-navy/5">
                    <th className="pb-2 text-left">Date</th>
                    <th className="pb-2 text-right">Pts</th>
                    <th className="pb-2 text-right">$</th>
                    <th className="pb-2 text-right">NP</th>
                    <th className="pb-2 text-right">CP</th>
                    <th className="pb-2 text-right">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {last5Days.map(([date, d]) => {
                    const s = d.scores || { clinical: 0, communication: 0, energy: 0 };
                    const avg = s.clinical + s.communication + s.energy > 0
                      ? ((s.clinical + s.communication + s.energy) / 3).toFixed(1)
                      : "—";
                    return (
                      <tr key={date} className="border-b border-brand-navy/5 last:border-0">
                        <td className="py-2 font-medium text-brand-navy">{date.slice(5)}</td>
                        <td className="py-2 text-right text-brand-gray">{d.patients}</td>
                        <td className="py-2 text-right text-brand-gray">${(d.collections || 0).toLocaleString()}</td>
                        <td className="py-2 text-right text-brand-gray">{d.newPatients}</td>
                        <td className="py-2 text-right text-brand-gray">{d.carePlans}</td>
                        <td className="py-2 text-right text-brand-orange font-bold">{avg}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Save End of Day */}
        <button
          onClick={saveNow}
          className={cn(
            "w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all",
            saved ? "bg-green-500 text-white" : "bg-brand-navy text-white hover:bg-brand-navy/90",
          )}
        >
          {saved ? <><CheckCircle2 className="w-4 h-4" /> Day Saved!</> : <><Save className="w-4 h-4" /> Save End of Day</>}
        </button>
      </div>
    );
  }

  /* ─── Main Render ─── */
  const tabContent = [renderPulse, renderSchedule, renderFlags, renderGamePlan, renderEndOfDay];

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-6 pb-24">
        {/* Header */}
        <div>
          <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">
            &larr; Back to Tools
          </Link>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
            Daily Practice Command Center
          </h1>
          <p className="text-sm text-brand-gray font-medium mt-1">
            Your morning-to-night operating system. 5 tabs. Everything in one place.
          </p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => shiftDate(-1)} className="w-9 h-9 rounded-xl bg-brand-navy/5 flex items-center justify-center hover:bg-brand-navy/10 transition-all">
            <ChevronLeft className="w-4 h-4 text-brand-navy" />
          </button>
          <div className="flex items-center gap-2 bg-white border border-brand-navy/10 rounded-xl py-2 px-4">
            <Calendar className="w-4 h-4 text-brand-orange" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-sm font-black text-brand-navy outline-none bg-transparent"
            />
          </div>
          <button onClick={() => shiftDate(1)} className="w-9 h-9 rounded-xl bg-brand-navy/5 flex items-center justify-center hover:bg-brand-navy/10 transition-all">
            <ChevronRight className="w-4 h-4 text-brand-navy" />
          </button>
          <button
            onClick={() => setSelectedDate(toDateStr(new Date()))}
            className="text-xs font-bold text-brand-orange hover:text-brand-orange/80 transition-all"
          >
            Today
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 bg-brand-navy/5 rounded-2xl p-1 overflow-x-auto">
          {TABS.map((tab, i) => {
            const Icon = TAB_ICONS[i];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-black transition-all whitespace-nowrap",
                  activeTab === i
                    ? "bg-white text-brand-navy shadow-sm"
                    : "text-brand-gray hover:text-brand-navy",
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {tabContent[activeTab]()}
      </div>
    </>
  );
}
