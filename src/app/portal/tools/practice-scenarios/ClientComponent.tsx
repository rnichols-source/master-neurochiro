"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

const patients = [
  { age: 34, job: "office worker", complaint: "neck pain and headaches for 3 months", personality: "analytical — wants data and logic", challenge: "They ask 'how do you know this will work?'" },
  { age: 52, job: "construction worker", complaint: "low back pain that gets worse by end of day", personality: "skeptical — been to 3 other chiropractors", challenge: "They say 'I've tried chiropractic before and it didn't work'" },
  { age: 28, job: "new mom", complaint: "upper back pain from nursing and carrying the baby", personality: "anxious — worried about the baby, short on time", challenge: "She says 'I can only come once a week max'" },
  { age: 45, job: "CEO", complaint: "chronic tension, poor sleep, high stress", personality: "impatient — wants results fast, values efficiency", challenge: "He asks 'what's the fastest option?'" },
  { age: 67, job: "retired teacher", complaint: "stiffness, balance issues, afraid of falling", personality: "warm but cautious — needs reassurance", challenge: "She says 'is this safe at my age?'" },
  { age: 19, job: "college athlete", complaint: "recurring shoulder pain affecting performance", personality: "competitive — wants to get back to sport ASAP", challenge: "He says 'my coach says I should just ice it'" },
  { age: 41, job: "nurse", complaint: "sciatica down the left leg, numbness in foot", personality: "knowledgeable — uses medical terminology", challenge: "She says 'my doctor recommended surgery'" },
  { age: 38, job: "stay-at-home dad", complaint: "mid-back pain and fatigue", personality: "easygoing but noncommittal", challenge: "He says 'let me talk to my wife about the cost'" },
  { age: 55, job: "small business owner", complaint: "chronic migraines, 3-4 per week", personality: "frustrated — has tried everything", challenge: "She says 'I've spent $10,000 on treatments that didn't work'" },
  { age: 23, job: "graduate student", complaint: "TMJ pain and jaw clicking", personality: "curious — asks a lot of questions", challenge: "He asks 'how is my jaw connected to my spine?'" },
];

const exercises = [
  { name: "Day 1 Orientation", prompt: "Practice your first 2 minutes. Introduce yourself, explain what today looks like, and set expectations for tomorrow.", time: "2 min" },
  { name: "Day 2 Presentation", prompt: "Present your findings in plain language. Explain what's wrong, what happens if they wait, your recommendation, and the investment.", time: "5 min" },
  { name: "Handle an Objection", prompt: "They just gave you the challenge listed above. Respond using the scripts from the program.", time: "2 min" },
  { name: "Re-Exam Conversation", prompt: "Show them their progress (imagine improved scans). Explain what's changed and recommend the next phase.", time: "3 min" },
];

export function PracticeScenariosClient() {
  const [current, setCurrent] = useState(0);
  const [showExercises, setShowExercises] = useState(false);

  const shuffle = () => {
    let next = Math.floor(Math.random() * patients.length);
    while (next === current) next = Math.floor(Math.random() * patients.length);
    setCurrent(next);
    setShowExercises(false);
  };

  const patient = patients[current];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div>
        <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">← Back to Tools</Link>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Practice Conversations</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Get a random patient scenario. Practice your scripts out loud — even to yourself in the mirror.</p>
      </div>

      {/* Patient Card */}
      <div className="bg-white rounded-2xl border border-brand-navy/5 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-brand-orange uppercase tracking-wider">Your Patient</p>
          <button onClick={shuffle} className="flex items-center gap-2 text-sm font-bold text-brand-navy/40 hover:text-brand-orange transition-colors touch-target">
            <RefreshCw className="w-4 h-4" /> New Patient
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-lg font-black text-brand-navy">{patient.age}-year-old {patient.job}</p>
          <div className="space-y-2">
            <div><span className="text-xs font-bold text-brand-gray">Complaint:</span> <span className="text-sm font-medium text-brand-navy">{patient.complaint}</span></div>
            <div><span className="text-xs font-bold text-brand-gray">Personality:</span> <span className="text-sm font-medium text-brand-navy">{patient.personality}</span></div>
            <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-xl p-3">
              <span className="text-xs font-bold text-brand-orange">The Challenge:</span>
              <p className="text-sm font-bold text-brand-navy mt-1">{patient.challenge}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Exercises */}
      {!showExercises ? (
        <button onClick={() => setShowExercises(true)} className="w-full bg-brand-navy text-white rounded-xl py-4 text-sm font-bold hover:bg-brand-black transition-colors active:scale-[0.98] touch-target">
          Show Practice Exercises
        </button>
      ) : (
        <div className="space-y-3">
          <p className="text-sm font-bold text-brand-navy">Practice these with this patient:</p>
          {exercises.map((ex, i) => (
            <div key={i} className="bg-white rounded-2xl border border-brand-navy/5 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-black text-brand-navy">{ex.name}</p>
                <span className="text-xs font-bold text-brand-gray">{ex.time}</span>
              </div>
              <p className="text-sm text-brand-gray font-medium">{ex.prompt}</p>
            </div>
          ))}
          <button onClick={shuffle} className="w-full bg-brand-navy/5 text-brand-navy rounded-xl py-3 text-sm font-bold hover:bg-brand-navy/10 transition-colors touch-target">
            Next Patient →
          </button>
        </div>
      )}
    </div>
  );
}
