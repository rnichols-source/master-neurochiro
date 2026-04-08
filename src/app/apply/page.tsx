"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton } from "@/components/ui/elite-ui";
import {
  ArrowRight,
  Loader2,
  PartyPopper,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { submitApplication } from "@/app/actions/submit-application";
import Link from "next/link";

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    current_role: "",
    biggest_struggle: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    const result = await submitApplication({
      ...formData,
      application_type: "Mastermind",
      why_now: formData.biggest_struggle,
      weekly_visits: "",
    });
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[100dvh] bg-brand-cream flex items-center justify-center p-5">
        <MastermindHeader />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center space-y-6"
        >
          <div className="inline-flex p-5 bg-brand-orange/10 rounded-full">
            <PartyPopper className="w-10 h-10 text-brand-orange" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight">
            Application Received!
          </h1>
          <p className="text-base text-brand-gray font-medium leading-relaxed">
            Thank you for applying. Dr. Nichols will personally review your
            application and you&apos;ll hear back via email within 48 hours.
          </p>
          <Link href="/">
            <BrandButton variant="outline" className="py-4 px-8">
              Back to Home
            </BrandButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-brand-cream">
      <MastermindHeader />

      <section className="pt-24 md:pt-40 pb-32 md:pb-20 px-5 md:px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight">
              Apply to the Mastermind
            </h1>
            <p className="text-base text-brand-gray font-medium">
              Tell us a little about yourself. Takes less than 2 minutes.
            </p>
          </div>

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
                <option value="Chiropractic Student">
                  Chiropractic Student
                </option>
                <option value="Associate Doctor">Associate Doctor</option>
                <option value="Clinic Owner">Clinic Owner</option>
                <option value="Multi-Clinic Owner">Multi-Clinic Owner</option>
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
                    Submit Application{" "}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </BrandButton>

              <div className="flex items-center justify-center gap-2 text-sm text-brand-gray font-medium mt-4">
                <CheckCircle2 className="w-4 h-4 text-brand-gray/40" />
                <span>
                  We review every application personally within 48 hours
                </span>
              </div>
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
          onClick={(e) => {
            const form = document.querySelector("form");
            if (form) form.requestSubmit();
          }}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Submit Application{" "}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </BrandButton>
      </div>
    </div>
  );
}
