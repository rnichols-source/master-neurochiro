"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Plus } from "lucide-react";
import { KPIEntryModal } from "./KPIEntryModal";

function Delta({ current, previous }: { current: number; previous: number }) {
  if (!previous) return <Minus className="w-3.5 h-3.5 text-brand-gray/40" />;
  if (current > previous) return <TrendingUp className="w-3.5 h-3.5 text-green-500" />;
  if (current < previous) return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
  return <Minus className="w-3.5 h-3.5 text-brand-gray/40" />;
}

interface KPISnapshotCardProps {
  latest: any | null;
  previous: any | null;
}

export function KPISnapshotCard({ latest, previous }: KPISnapshotCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!latest) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-brand-gray font-medium">
          No practice data yet? That&apos;s OK. Focus on the curriculum and
          playbooks for now. Once you start seeing patients, track your
          numbers here.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 w-full bg-brand-navy/5 text-brand-navy rounded-xl py-3 px-5 text-sm font-bold hover:bg-brand-navy/10 transition-colors active:scale-[0.98] touch-target"
        >
          <Plus className="w-4 h-4" />
          Submit KPIs When Ready
        </button>
        <KPIEntryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => setIsModalOpen(false)}
        />
      </div>
    );
  }

  const metrics = [
    { label: "Collections", value: `$${(latest.collections || 0).toLocaleString()}`, prev: previous?.collections || 0, curr: latest.collections || 0 },
    { label: "New Patients", value: `${latest.new_patients || 0}`, prev: previous?.new_patients || 0, curr: latest.new_patients || 0 },
    { label: "Visits", value: `${latest.visits || 0}`, prev: previous?.visits || 0, curr: latest.visits || 0 },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">
              {m.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-brand-navy">{m.value}</span>
              <Delta current={m.curr} previous={m.prev} />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 w-full bg-brand-navy/5 text-brand-navy rounded-xl py-3 px-5 text-sm font-bold hover:bg-brand-navy/10 transition-colors active:scale-[0.98] touch-target"
      >
        <Plus className="w-4 h-4" />
        Submit This Week
      </button>

      <KPIEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </div>
  );
}
