"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { ClipboardList, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { submitPreCallKPI } from "@/app/actions/inner-circle-actions";

interface PreCallClientProps {
  nextCall: { id: string; title: string; callTime: string } | null;
  existingSubmission: {
    care_plan_acceptance_pct: number;
    new_patients: number;
    collections_per_visit: number;
    notes: string | null;
  } | null;
}

export function PreCallClient({ nextCall, existingSubmission }: PreCallClientProps) {
  const [acceptance, setAcceptance] = useState(existingSubmission?.care_plan_acceptance_pct?.toString() || "");
  const [newPatients, setNewPatients] = useState(existingSubmission?.new_patients?.toString() || "");
  const [cva, setCva] = useState(existingSubmission?.collections_per_visit?.toString() || "");
  const [notes, setNotes] = useState(existingSubmission?.notes || "");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(!!existingSubmission);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nextCall) return;
    setSubmitting(true);

    const result = await submitPreCallKPI({
      callId: nextCall.id,
      carePlanAcceptancePct: parseFloat(acceptance) || 0,
      newPatients: parseInt(newPatients) || 0,
      collectionsPerVisit: parseFloat(cva) || 0,
      notes: notes.trim() || undefined,
    });

    setSubmitting(false);
    if (result.success) setSubmitted(true);
  };

  if (!nextCall) {
    return (
      <div className="space-y-6 pb-20">
        <Link href="/portal/council" className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy/50 hover:text-brand-navy transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <EliteCard className="p-8 text-center">
          <ClipboardList size={40} className="text-brand-navy/20 mx-auto mb-4" />
          <h2 className="text-xl font-black text-brand-navy mb-2">No Call Scheduled</h2>
          <p className="text-sm text-brand-gray">Pre-call KPIs will be available once the next call is scheduled.</p>
        </EliteCard>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="space-y-6 pb-20">
        <Link href="/portal/council" className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy/50 hover:text-brand-navy transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <EliteCard className="p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-black text-brand-navy mb-2">KPIs Submitted</h2>
          <p className="text-sm text-brand-gray mb-1">
            Your numbers are locked in for the next call.
          </p>
          <p className="text-xs text-brand-navy/40">
            {new Date(nextCall.callTime).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </EliteCard>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <Link href="/portal/council" className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy/50 hover:text-brand-navy transition-colors">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange mb-4">
          <ClipboardList size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">Pre-Call Check-In</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Drop Your Numbers</h1>
        <p className="text-sm text-brand-gray font-medium mt-2 max-w-lg">
          Submit your KPIs before the call so we can coach on real data. Takes 30 seconds.
        </p>
      </div>

      <EliteCard className="p-6 md:p-8 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-brand-navy/50 uppercase tracking-wider mb-2">
              Care Plan Acceptance Rate (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={acceptance}
              onChange={(e) => setAcceptance(e.target.value)}
              placeholder="e.g. 72"
              required
              className="w-full px-4 py-3 bg-brand-cream border border-brand-navy/10 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-navy/50 uppercase tracking-wider mb-2">
              New Patients This Week
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={newPatients}
              onChange={(e) => setNewPatients(e.target.value)}
              placeholder="e.g. 8"
              required
              className="w-full px-4 py-3 bg-brand-cream border border-brand-navy/10 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-navy/50 uppercase tracking-wider mb-2">
              Collections Per Visit ($)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={cva}
              onChange={(e) => setCva(e.target.value)}
              placeholder="e.g. 48"
              required
              className="w-full px-4 py-3 bg-brand-cream border border-brand-navy/10 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-navy/50 uppercase tracking-wider mb-2">
              Anything you want to bring to the call? (optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="A case you are stuck on, a script that is not landing, a question..."
              className="w-full px-4 py-3 bg-brand-cream border border-brand-navy/10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all resize-none"
            />
          </div>

          <BrandButton
            type="submit"
            variant="primary"
            className="w-full py-4"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Pre-Call KPIs"}
          </BrandButton>

          <p className="text-xs text-brand-navy/30 text-center">
            For the call on {new Date(nextCall.callTime).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </p>
        </form>
      </EliteCard>
    </div>
  );
}
