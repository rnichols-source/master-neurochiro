"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How is this different from other coaching programs?",
    a: "Most programs give you information and leave you to figure it out. We give you specific scripts, frameworks, and live coaching every week for 90 days. You practice the skills, track your numbers, and get direct feedback in a small group (max 30). After the Intensive, you join the Inner Circle for ongoing coaching. It's not a course you watch — it's a system you build into your practice with support every step of the way.",
  },
  {
    q: "Who is this for?",
    a: "Practicing chiropractors, chiropractic students, and doctors about to open their first practice. Whether you've been in practice for 20 years, you're still in school, or you're building from scratch — the program meets you where you are. Several members have used it to build their systems and patient communication before their doors even opened.",
  },
  {
    q: "Who is this NOT for?",
    a: "This isn't for doctors looking for a quick fix or a magic script. If you're not willing to practice the skills, show up to the live calls, and track your results — this won't work. We're selective because we want every member to succeed, not just enroll.",
  },
  {
    q: "What's the time commitment?",
    a: "60-90 minutes per week for live coaching, plus 1-2 hours of curriculum and implementation work. Doctor calls are Tuesdays at 12 PM ET. Student call time TBA. Every session is recorded and available in your portal within 24 hours if you miss one.",
  },
  {
    q: "What if I'm a student?",
    a: "We have a dedicated Foundations Intensive for students at $197/month (90-day commitment). You'll learn clinical communication, Day 1/Day 2 scripts, interview prep, and career planning. After graduating, join the Student Inner Circle at $97/month for ongoing support.",
  },
  {
    q: "What exactly will I learn?",
    a: "Patient communication scripts, care plan presentation frameworks, practice KPI tracking, and clinical confidence. Everything is practical — you'll use it the same week you learn it.",
  },
  {
    q: "Is there a refund policy?",
    a: "For doctors: hit 70% care plan acceptance by Day 90 or stay in the program free until you do. For students: feel confident presenting a care plan by Day 90 or stay free. Both guarantees require you to do the work — attend calls, submit KPIs, and implement the system.",
  },
  {
    q: "When does the next cohort start?",
    a: "July 21, 2026. Cohorts launch quarterly with 30 seats for doctors. Student Foundations launches the same date.",
  },
  {
    q: "What if I miss a live call?",
    a: "Every live session is recorded and uploaded to your portal within 24 hours. You can watch at your own pace and still ask questions in the private community.",
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
