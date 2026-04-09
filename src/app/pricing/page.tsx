"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { Check, ArrowRight, ShieldCheck, Zap, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FAQSection } from "@/components/ui/faq-section";

const doctorTiers = [
  {
    name: "Mastermind Standard",
    price: "997",
    paymentPlan: "3 Payments of $350",
    links: {
      pif: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PIF || "https://buy.stripe.com/5kQdRb8Z1eEscGOfas7wA0f",
      plan: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PLAN || "https://buy.stripe.com/cNi8wRa3553SfT09Q87wA0g",
    },
    description:
      "The full 8-week system for doctors who want clarity and a better way to practice.",
    features: [
      "8 Weeks of Live Group Coaching Sessions",
      "Better Clinical & Communication Skills",
      "Step-by-Step Patient Language Frameworks",
      "Getting Your Practice Numbers & Identity Right",
      "Our Custom KPI & Tracking Templates",
      "Proven Scripts for Every Patient Interaction",
      "Access to Our Private Mastermind Group",
      "Lifetime Access to All Call Replays",
    ],
    cta: "Apply for Standard",
    highlight: false,
  },
  {
    name: "Mastermind Pro",
    price: "1,997",
    paymentPlan: "3 Payments of $800",
    links: {
      pif: process.env.NEXT_PUBLIC_STRIPE_PRO_PIF || "https://buy.stripe.com/3cIeVfa351RG6iqaUc7wA0h",
      plan: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN || "https://buy.stripe.com/aFa28t8Z1aocdKSbYg7wA0i",
    },
    description:
      "Limited to 5 doctors. Direct feedback and faster results.",
    features: [
      "Everything in Standard PLUS:",
      "Two Private 1:1 Calls with Dr. Nichols",
      "Personality Testing & Leadership Review",
      "Your Personal 6-Month Practice Roadmap",
      "Private Revenue & Income Target Session",
      "We Review Your Personal ROF & Scripts",
      "Staff & Team Audit (for Clinic Owners)",
      "Direct Text/Message Access During Program",
      "Priority 'Hot Seat' Support on Every Call",
    ],
    cta: "Apply for Pro Access",
    highlight: true,
  },
];

const studentTiers = [
  {
    name: "Student Standard",
    price: "497",
    paymentPlan: "3 Payments of $175",
    links: {
      pif: process.env.NEXT_PUBLIC_STRIPE_STUDENT_STANDARD_PIF || "/apply?tier=student-standard",
      plan: process.env.NEXT_PUBLIC_STRIPE_STUDENT_STANDARD_PLAN || "/apply?tier=student-standard-plan",
    },
    description:
      "Build your clinical authority before you even graduate.",
    features: [
      "8 Weeks of Live Group Coaching Sessions",
      "Clinical Communication Foundations",
      "Step-by-Step Patient Language Frameworks",
      "Build Your Identity & Confidence Early",
      "Our Custom KPI & Tracking Templates",
      "Proven Scripts for Every Patient Interaction",
      "Access to Our Private Mastermind Group",
      "Lifetime Access to All Call Replays",
    ],
    cta: "Apply as Student",
    highlight: false,
  },
  {
    name: "Student Pro",
    price: "997",
    paymentPlan: "3 Payments of $350",
    links: {
      pif: process.env.NEXT_PUBLIC_STRIPE_STUDENT_PRO_PIF || "/apply?tier=student-pro",
      plan: process.env.NEXT_PUBLIC_STRIPE_STUDENT_PRO_PLAN || "/apply?tier=student-pro-plan",
    },
    description:
      "For serious students who want direct mentorship and a head start.",
    features: [
      "Everything in Student Standard PLUS:",
      "Two Private 1:1 Calls with Dr. Nichols",
      "Personality Testing & Leadership Review",
      "Your Personal Career Roadmap",
      "Private Goal-Setting & Vision Session",
      "We Review Your Communication & Scripts",
      "Interview & Associate Prep Support",
      "Direct Text/Message Access During Program",
      "Priority 'Hot Seat' Support on Every Call",
    ],
    cta: "Apply for Student Pro",
    highlight: true,
  },
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<"doctor" | "student">("doctor");
  const tiers = activeTab === "doctor" ? doctorTiers : studentTiers;

  return (
    <div className="min-h-[100dvh] bg-brand-cream pb-24 md:pb-32">
      <MastermindHeader />

      {/* Header */}
      <section className="pt-24 md:pt-40 pb-8 md:pb-12 px-5 md:px-6 text-center space-y-4 md:space-y-6">
        <h1 className="text-3xl md:text-6xl font-black text-brand-navy tracking-tight">
          Simple, Honest Pricing.
        </h1>
        <p className="text-base md:text-lg text-brand-gray font-medium max-w-2xl mx-auto">
          Choose the level of support you need. No hidden fees, no upsells.
        </p>
      </section>

      {/* Cohort Banner */}
      <div className="flex items-center justify-center gap-2 py-3 px-5">
        <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
        <span className="text-sm font-bold text-brand-gray">
          Next cohort starts April 21, 2026 — Limited seats available
        </span>
      </div>

      {/* Sticky Toggle */}
      <div className="sticky top-[60px] md:top-[72px] z-30 bg-brand-cream/90 backdrop-blur-md py-3 px-5 md:px-6 border-b border-brand-navy/5 md:border-none md:bg-transparent md:backdrop-blur-none md:static md:py-0">
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-white border border-brand-navy/10 rounded-xl p-1.5 shadow-sm">
            <button
              onClick={() => setActiveTab("doctor")}
              className={cn(
                "px-5 md:px-6 py-3 rounded-lg text-sm font-bold transition-all touch-target",
                activeTab === "doctor"
                  ? "bg-brand-navy text-white shadow-md"
                  : "text-brand-navy/50 hover:text-brand-navy"
              )}
            >
              Doctors
            </button>
            <button
              onClick={() => setActiveTab("student")}
              className={cn(
                "px-5 md:px-6 py-3 rounded-lg text-sm font-bold transition-all touch-target",
                activeTab === "student"
                  ? "bg-brand-navy text-white shadow-md"
                  : "text-brand-navy/50 hover:text-brand-navy"
              )}
            >
              Students
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Grid */}
      <section className="px-5 md:px-6 mt-8 md:mt-12">
        <div key={activeTab} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 animate-[fadeIn_0.3s_ease-out]">
          {tiers.map((tier) => (
            <EliteCard
              key={tier.name}
              className={cn(
                "relative p-6 md:p-12 flex flex-col h-full",
                tier.highlight
                  ? "border-brand-orange/40 bg-white mt-4 md:mt-0"
                  : "border-brand-navy/5 bg-white/50"
              )}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider px-5 py-1.5 rounded-full shadow-lg shadow-brand-orange/20 z-10">
                  Most Popular
                </div>
              )}

              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-black text-brand-navy mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm font-medium text-brand-gray mb-5 md:mb-6 leading-relaxed">
                  {tier.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black text-brand-navy/40">
                    $
                  </span>
                  <span className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight">
                    {tier.price}
                  </span>
                </div>
                <p className="mt-2 text-sm font-bold text-brand-orange">
                  or {tier.paymentPlan}
                </p>
              </div>

              <div className="space-y-3.5 md:space-y-4 flex-1 mb-8 md:mb-10">
                {tier.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-navy/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-navy" />
                    </div>
                    <span className="text-sm font-medium text-brand-navy/80">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <a
                  href={tier.links.pif}
                  target={
                    tier.links.pif.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    tier.links.pif.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block w-full"
                >
                  <BrandButton
                    variant={tier.highlight ? "accent" : "primary"}
                    className="w-full py-4 group text-sm"
                  >
                    Pay in Full (${tier.price}){" "}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </BrandButton>
                </a>
                <a
                  href={tier.links.plan}
                  target={
                    tier.links.plan.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    tier.links.plan.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block w-full"
                >
                  <BrandButton
                    variant="ghost"
                    className="w-full py-4 text-sm font-bold text-brand-navy/40 hover:text-brand-orange"
                  >
                    or {tier.paymentPlan}
                  </BrandButton>
                </a>
                <p className="text-xs text-center text-brand-navy/30 font-medium mt-3">
                  100% Secure Checkout via Stripe
                </p>
              </div>
            </EliteCard>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="pt-16 md:pt-20 px-5 md:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6 text-brand-navy" />
            </div>
            <h4 className="text-sm font-black text-brand-navy">
              Secure Enrollment
            </h4>
            <p className="text-sm font-medium text-brand-gray leading-relaxed">
              Encrypted checkout. Your data is safe.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center mx-auto">
              <Star className="w-6 h-6 text-brand-navy" />
            </div>
            <h4 className="text-sm font-black text-brand-navy">
              Satisfaction Guarantee
            </h4>
            <p className="text-sm font-medium text-brand-gray leading-relaxed">
              If you don&apos;t feel a shift after Week 1, no-questions-asked
              exit.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-brand-navy" />
            </div>
            <h4 className="text-sm font-black text-brand-navy">
              Fast Approval
            </h4>
            <p className="text-sm font-medium text-brand-gray leading-relaxed">
              Application to onboarding within 24-48 hours.
            </p>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="pt-16 md:pt-20 px-5 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-black text-brand-navy text-center mb-6">
            Common Questions
          </h3>
          <FAQSection />
        </div>
      </section>

      {/* Looking for more? */}
      <section className="pt-16 md:pt-20 px-5 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-black text-brand-navy text-center mb-6">
            Looking for More?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/mentorship"
              className="flex items-center justify-between p-5 bg-white rounded-2xl border border-brand-navy/5 shadow-sm hover:border-brand-orange/30 transition-all group"
            >
              <div>
                <p className="text-base font-black text-brand-navy">
                  Private Coaching
                </p>
                <p className="text-sm text-brand-gray font-medium">
                  1-on-1 with Dr. Nichols
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-brand-navy/20 group-hover:text-brand-orange transition-colors" />
            </Link>
            <Link
              href="/council"
              className="flex items-center justify-between p-5 bg-white rounded-2xl border border-brand-navy/5 shadow-sm hover:border-brand-orange/30 transition-all group"
            >
              <div>
                <p className="text-base font-black text-brand-navy">
                  The Council
                </p>
                <p className="text-sm text-brand-gray font-medium">
                  Ongoing coaching for graduates
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-brand-navy/20 group-hover:text-brand-orange transition-colors" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
