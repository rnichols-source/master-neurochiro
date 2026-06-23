"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Who is the Inner Circle for?",
    a: "Nervous system chiropractors who have completed the NeuroChiro Mastermind and want to keep their momentum going. If you've done the work and want ongoing coaching, accountability, and community, this is for you.",
  },
  {
    q: "What happens on the bi-weekly calls?",
    a: "These aren't lectures. Every call is live coaching. Bring your specific challenge — a case you're stuck on, a script that's not landing, numbers you need help interpreting. We work through it together. Hot seats, real-time feedback, and action items you can implement that week.",
  },
  {
    q: "What are the AI coaching recaps?",
    a: "After every call, our system generates a personalized coaching document just for you. It includes your specific action items, script adjustments based on your numbers, and a roadmap for the next two weeks. It's like having a private coach working for you between calls.",
  },
  {
    q: "Can I join without doing the Mastermind first?",
    a: "Not right now. Inner Circle is exclusively for Mastermind graduates. This keeps the room sharp — everyone has the same foundation and speaks the same language. If you're interested in the next Mastermind cohort, book a call and we'll talk about it.",
  },
  {
    q: "What's the difference between this and the Mastermind?",
    a: "The Mastermind is a 13-week intensive: structured curriculum, weekly calls, a guarantee, and a clear finish line. The Inner Circle is what comes after. Less structured, more adaptive. You bring the problems, we solve them together. Think of it as your board of advisors.",
  },
  {
    q: "What if I want to cancel?",
    a: "Cancel anytime. No contracts, no commitments beyond the current month. But once you leave, founding member pricing is gone forever. You'd rejoin at the standard rate.",
  },
  {
    q: "What's the founding member deal?",
    a: "The first 10 members lock in $297/mo for life. Once those spots are taken, the price goes to $397/mo. Your rate never increases as long as you stay active.",
  },
];

export function InnerCircleFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2.5">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-brand-navy/5 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex items-center justify-between w-full p-5 text-left cursor-pointer"
          >
            <span className="font-bold text-brand-navy text-sm pr-4">
              {faq.q}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-brand-gray/40 flex-shrink-0 transition-transform duration-200",
                openIndex === i && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "grid transition-all duration-200",
              openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-5 text-sm text-brand-gray leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
