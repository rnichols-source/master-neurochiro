"use client";

import { useState } from "react";
import { saveWorksheet } from "@/app/actions/worksheet-actions";
import { CheckCircle2, Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Question {
  id: string;
  label: string;
  hint: string;
  placeholder: string;
}

export default function WorksheetClient({
  initialData,
  userName,
  weekSlug,
  worksheetType,
  title,
  intro,
  questions,
}: {
  initialData: Record<string, string> | null;
  userName: string;
  weekSlug: string;
  worksheetType: string;
  title: string;
  intro: string;
  questions: Question[];
}) {
  const [responses, setResponses] = useState<Record<string, string>>(
    initialData || questions.reduce((acc, q) => ({ ...acc, [q.id]: "" }), {} as Record<string, string>)
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (id: string, value: string) => {
    setResponses(prev => ({ ...prev, [id]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await saveWorksheet(worksheetType, responses);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const filledCount = Object.values(responses).filter(v => v.trim().length > 0).length;
  const isComplete = filledCount === questions.length;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <Link href={`/portal/curriculum/${weekSlug}`} className="text-sm text-brand-gray hover:text-brand-navy transition-colors inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Week
      </Link>

      <div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">{title}</h1>
        <p className="text-sm text-brand-gray font-medium mt-2 leading-relaxed">{intro}, {userName}.</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">
          {filledCount} of {questions.length} answered
        </p>
        {isComplete && (
          <div className="flex items-center gap-1.5 text-green-600">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold">Complete</span>
          </div>
        )}
      </div>
      <div className="h-2 bg-brand-navy/5 rounded-full overflow-hidden">
        <div className="h-full bg-brand-orange rounded-full transition-all" style={{ width: `${(filledCount / questions.length) * 100}%` }} />
      </div>

      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-brand-orange text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <div>
                <p className="text-sm font-black text-brand-navy">{q.label}</p>
                <p className="text-xs text-brand-gray font-medium mt-1">{q.hint}</p>
              </div>
            </div>
            <textarea
              rows={4}
              placeholder={q.placeholder}
              value={responses[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
              className="w-full bg-brand-navy/5 rounded-xl py-3 px-4 text-sm text-brand-navy font-medium outline-none focus:ring-2 focus:ring-brand-orange/20 resize-none placeholder:text-brand-navy/25"
            />
          </div>
        ))}
      </div>

      <div className="sticky bottom-20 md:bottom-4 z-30">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-brand-navy text-white text-sm font-bold py-4 rounded-2xl hover:bg-brand-black transition-colors active:scale-[0.98] shadow-lg shadow-brand-navy/20"
        >
          {saving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : saved ? (
            <><CheckCircle2 className="w-4 h-4 text-green-400" /> Saved!</>
          ) : (
            <><Save className="w-4 h-4" /> Save Worksheet</>
          )}
        </button>
      </div>

      {isComplete && (
        <div className="bg-brand-navy/5 rounded-2xl p-5 text-center space-y-2">
          <p className="text-sm font-black text-brand-navy">Great work. This week&apos;s activity is complete.</p>
          <p className="text-xs text-brand-gray font-medium">Your answers are saved. Come back anytime to update them.</p>
          <Link href="/portal/community" className="text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors inline-block mt-2">
            Share your takeaway in the Community →
          </Link>
        </div>
      )}
    </div>
  );
}
