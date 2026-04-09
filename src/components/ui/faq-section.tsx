"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How is this different from other coaching programs?",
    a: "Most programs give you information and leave you to figure it out. We give you specific scripts, frameworks, and live coaching every week for 8 weeks. You practice the skills, track your numbers, and get direct feedback in a small group (max 25). It's not a course you watch — it's a system you build into your practice with support every step of the way.",
  },
  {
    q: "Who is this for?",
    a: "Practicing chiropractors and chiropractic students. Whether you've been in practice for 20 years or you're still in school, the program meets you where you are.",
  },
  {
    q: "What's the time commitment?",
    a: "90 minutes per week for live coaching, plus 1-2 hours of curriculum and implementation work.",
  },
  {
    q: "What if I'm a student?",
    a: "We have a dedicated student track with pricing starting at $497. Many students join before graduation to build their clinical authority early.",
  },
  {
    q: "What exactly will I learn?",
    a: "Patient communication scripts, care plan presentation frameworks, practice KPI tracking, and clinical confidence. Everything is practical — you'll use it the same week you learn it.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. If you don't feel the program is right for you within the first 14 days, you get a full refund. No questions asked.",
  },
  {
    q: "When does the next cohort start?",
    a: "April 21, 2026. Cohorts run every quarter with limited seats.",
  },
  {
    q: "Do I need any special equipment or software?",
    a: "No. Just a laptop or phone and access to the internet. Everything is in your portal.",
  },
  {
    q: "Can I join if I'm outside the US?",
    a: "Absolutely. We have members in 5 countries. All calls are virtual.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-brand-navy/5 overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left touch-target"
          >
            <span className="text-base font-bold text-brand-navy pr-4">
              {faq.q}
            </span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-brand-navy/20 shrink-0 transition-transform",
                open === i && "rotate-180"
              )}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-5 pt-0">
              <p className="text-sm text-brand-gray font-medium leading-relaxed">
                {faq.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
