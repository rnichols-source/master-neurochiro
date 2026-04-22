"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton } from "@/components/ui/elite-ui";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { submitWaitlist } from "@/app/actions/waitlist-actions";
import { useRouter } from "next/navigation";

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    current_role: "",
    biggest_struggle: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.phone ||
      !formData.current_role
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    const result = await submitWaitlist(formData);
    setIsSubmitting(false);

    if (result.success) {
      router.push("/waitlist/confirmation");
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-brand-cream">
      <MastermindHeader />

      <section className="pt-24 md:pt-40 pb-32 md:pb-20 px-5 md:px-6">
        <div className="max-w-xl mx-auto">
          {/* Urgency Banner */}
          <div className="text-center space-y-4 mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 rounded-full">
              <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              <span className="text-sm font-bold text-brand-orange">
                Cohort 3 forming now — only 50 spots
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight">
              Join the Cohort 3 Waitlist
            </h1>
            <p className="text-base text-brand-gray font-medium leading-relaxed">
              Waitlist members lock in early bird pricing — same rates as Cohort
              2 before the price increase.
            </p>
          </div>

          {/* Price Comparison Card */}
          <div className="bg-white border border-brand-navy/10 rounded-2xl p-6 md:p-8 mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div />
              <div>
                <p className="text-xs font-bold text-brand-orange uppercase tracking-wide mb-2">
                  Early Bird
                </p>
                <p className="text-[10px] text-brand-gray font-medium">
                  (Waitlist Only)
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-brand-navy/40 uppercase tracking-wide mb-2">
                  Regular
                </p>
                <p className="text-[10px] text-brand-gray font-medium">
                  (After Waitlist)
                </p>
              </div>
            </div>
            <div className="border-t border-brand-navy/5 mt-3" />
            {[
              { tier: "Standard", early: "$997", plan: "or 3x $350", regular: "$1,497", regPlan: "or 3x $525" },
              { tier: "Student", early: "$497", plan: "or 3x $175", regular: "$697", regPlan: "or 3x $250" },
              { tier: "Pro", early: "$1,997", plan: "or 3x $800", regular: "$2,997", regPlan: "or 3x $1,100" },
              { tier: "Student Pro", early: "$997", plan: "or 3x $350", regular: "$1,497", regPlan: "or 3x $525" },
            ].map((row) => (
              <div
                key={row.tier}
                className="grid grid-cols-3 gap-4 text-center py-3 border-b border-brand-navy/5 last:border-0"
              >
                <p className="text-sm font-bold text-brand-navy text-left">
                  {row.tier}
                </p>
                <div>
                  <p className="text-sm font-black text-brand-orange">{row.early}</p>
                  <p className="text-xs text-brand-orange/60 font-medium">{row.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-brand-gray line-through">{row.regular}</p>
                  <p className="text-xs text-brand-gray/40 line-through">{row.regPlan}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy ml-1">
                Full Name <span className="text-brand-orange">*</span>
              </label>
              <input
                type="text"
                autoComplete="name"
                enterKeyHint="next"
                placeholder="Dr. Jane Smith"
                value={formData.full_name}
                onChange={(e) => handleChange("full_name", e.target.value)}
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-4 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/10 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy ml-1">
                Email <span className="text-brand-orange">*</span>
              </label>
              <input
                type="email"
                autoComplete="email"
                enterKeyHint="next"
                inputMode="email"
                placeholder="doctor@practice.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-4 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/10 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy ml-1">
                Phone <span className="text-brand-orange">*</span>
              </label>
              <input
                type="tel"
                autoComplete="tel"
                enterKeyHint="next"
                inputMode="tel"
                placeholder="555-555-5555"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-4 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/10 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy ml-1">
                I am currently a:{" "}
                <span className="text-brand-orange">*</span>
              </label>
              <select
                value={formData.current_role}
                onChange={(e) => handleChange("current_role", e.target.value)}
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-4 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/10 transition-all appearance-none outline-none"
              >
                <option value="">Select one...</option>
                <option value="Practicing Doctor">Practicing Doctor</option>
                <option value="Chiropractic Student">
                  Chiropractic Student
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy ml-1">
                What&apos;s the #1 thing you want to improve?
              </label>
              <textarea
                rows={3}
                enterKeyHint="done"
                placeholder="e.g. Patient communication, case acceptance, confidence in recommendations..."
                value={formData.biggest_struggle}
                onChange={(e) =>
                  handleChange("biggest_struggle", e.target.value)
                }
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-4 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/10 transition-all outline-none resize-none"
              />
            </div>

            {/* Desktop: inline button */}
            <div className="hidden md:block">
              <BrandButton
                variant="primary"
                type="submit"
                className="w-full py-5 group text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Reserve My Spot{" "}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </BrandButton>

              <p className="text-center text-sm text-brand-gray font-medium mt-4">
                You&apos;ll get first access when enrollment opens. No
                commitment until you&apos;re ready.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Mobile: sticky submit button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-cream/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.05)] p-4 safe-bottom z-40">
        <BrandButton
          variant="primary"
          type="button"
          className="w-full py-5 group text-base"
          disabled={isSubmitting}
          onClick={() => {
            const form = document.querySelector("form");
            if (form) form.requestSubmit();
          }}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Reserve My Spot{" "}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </BrandButton>
      </div>
    </div>
  );
}
