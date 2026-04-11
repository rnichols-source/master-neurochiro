"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton } from "@/components/ui/elite-ui";
import {
  PartyPopper,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Doctor";
  const role = searchParams.get("role") || "";
  const firstName = name.split(" ").pop() || name;

  const isStudent = role === "Chiropractic Student";
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
              Application Received, {firstName}!
            </h1>
            <p className="text-base text-brand-gray font-medium leading-relaxed max-w-lg mx-auto">
              Dr. Nichols will personally review your application and
              you&apos;ll hear back via email within 48 hours.
            </p>
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-brand-navy/10 rounded-2xl p-6 md:p-8 mb-8"
          >
            <h2 className="text-lg font-bold text-brand-navy mb-5">
              What happens next
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-orange/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                </div>
                <div>
                  <p className="font-bold text-brand-navy text-sm">
                    Application submitted
                  </p>
                  <p className="text-sm text-brand-gray">
                    Check your inbox for a confirmation email
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-navy/5 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-brand-navy/40" />
                </div>
                <div>
                  <p className="font-bold text-brand-navy text-sm">
                    Personal review by Dr. Nichols
                  </p>
                  <p className="text-sm text-brand-gray">
                    Every application is reviewed individually — not by a bot
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-navy/5 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-brand-navy/40">
                    3
                  </span>
                </div>
                <div>
                  <p className="font-bold text-brand-navy text-sm">
                    Decision within 48 hours
                  </p>
                  <p className="text-sm text-brand-gray">
                    You&apos;ll get an email with your enrollment options
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA: Book a Call (Doctors) or View Pricing (Students) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-brand-navy rounded-2xl p-6 md:p-8 text-center space-y-5"
          >
            {isStudent ? (
              <>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  While you wait — explore the program
                </h2>
                <p className="text-sm text-white/70 font-medium leading-relaxed max-w-md mx-auto">
                  See exactly what&apos;s included in the 8-week mastermind,
                  including the clinical engine, communication playbook, and
                  student pricing at $497.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/pricing">
                    <BrandButton
                      variant="primary"
                      className="py-4 px-8 group text-base"
                    >
                      View Pricing & Curriculum{" "}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </BrandButton>
                  </Link>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BrandButton
                      variant="outline"
                      className="py-4 px-8 text-base border-white/20 text-white hover:bg-white/10"
                    >
                      <Calendar className="mr-2 w-4 h-4" />
                      Or book a call
                    </BrandButton>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="inline-flex p-4 bg-brand-orange/20 rounded-full">
                  <Calendar className="w-8 h-8 text-brand-orange" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  Want to fast-track your spot?
                </h2>
                <p className="text-sm text-white/70 font-medium leading-relaxed max-w-md mx-auto">
                  Book a free 15-minute call with Dr. Nichols to discuss your
                  practice, ask questions about the program, and see if the
                  Mastermind is the right fit for your goals.
                </p>

                {/* Inline Calendly Embed */}
                <div className="rounded-xl overflow-hidden bg-white mt-2">
                  <iframe
                    src={`${CALENDLY_URL}?hide_gdpr_banner=1`}
                    width="100%"
                    height="660"
                    frameBorder="0"
                    title="Book a call with Dr. Nichols"
                    className="border-0"
                  />
                </div>

                <p className="text-xs text-white/40 font-medium">
                  Next cohort starts April 21, 2026 — seats are limited
                </p>
              </>
            )}
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

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100dvh] bg-brand-cream flex items-center justify-center">
          <div className="animate-pulse text-brand-gray">Loading...</div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
