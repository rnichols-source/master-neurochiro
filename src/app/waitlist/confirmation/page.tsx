"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton } from "@/components/ui/elite-ui";
import {
  PartyPopper,
  Calendar,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WaitlistConfirmationPage() {
  const CALENDLY_URL = "https://calendly.com/neurochiro-pro/1-on-1";

  return (
    <div className="min-h-[100dvh] bg-brand-cream">
      <MastermindHeader />

      <section className="pt-24 md:pt-40 pb-20 px-5 md:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-10"
          >
            <div className="inline-flex p-5 bg-brand-orange/10 rounded-full">
              <PartyPopper className="w-10 h-10 text-brand-orange" />
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight">
              You&apos;re on the List!
            </h1>
            <p className="text-base text-brand-gray font-medium leading-relaxed max-w-lg mx-auto">
              We&apos;ll email you the moment enrollment opens. Waitlist members
              get 48 hours of early bird pricing before the price goes up.
            </p>
          </motion.div>

          {/* What You're Getting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-brand-navy/10 rounded-2xl p-6 md:p-8 mb-8"
          >
            <h2 className="text-lg font-bold text-brand-navy mb-5">
              What you&apos;re getting with the Mastermind
            </h2>
            <div className="space-y-3">
              {[
                "8 weeks of live group coaching (small cohorts, max 50)",
                "Word-for-word patient communication scripts",
                "Weekly KPI tracking with personalized benchmarks",
                "Day 1 consultation and Day 2 report of findings mastery",
                "Practice business tools (break-even calculators, pricing frameworks)",
                "Lifetime access to all replays and resources",
                "48-hour early access to enroll at early bird pricing",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-brand-navy font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Book a Call CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-brand-navy rounded-2xl p-6 md:p-8 text-center space-y-5"
          >
            <div className="inline-flex p-4 bg-brand-orange/20 rounded-full">
              <Calendar className="w-8 h-8 text-brand-orange" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Have questions?
            </h2>
            <p className="text-sm text-white/70 font-medium leading-relaxed max-w-md mx-auto">
              Book a free call with Dr. Nichols to learn more about the program,
              ask questions, and see if the Mastermind is the right fit for you.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <BrandButton
                variant="accent"
                className="py-4 px-8 group text-base"
              >
                Book a Free Call with Dr. Nichols
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </a>
          </motion.div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-sm text-brand-gray hover:text-brand-navy font-medium underline transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
