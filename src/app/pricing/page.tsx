"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { Check, ArrowRight, ShieldCheck, Zap, Star, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Mastermind Standard",
    price: "997",
    paymentPlan: "3 Payments of $350",
    links: {
      pif: "https://buy.stripe.com/5kQdRb8Z1eEscGOfas7wA0f",
      plan: "https://buy.stripe.com/cNi8wRa3553SfT09Q87wA0g"
    },
    description: "The full 8-week system for doctors who want clarity and a better way to practice.",
    features: [
      "8 Weeks of Live Group Coaching Sessions",
      "Better Clinical & Communication Skills",
      "Step-by-Step Patient Language Frameworks",
      "Getting Your Practice Numbers & Identity Right",
      "Our Custom KPI & Tracking Templates",
      "Proven Scripts for Every Patient Interaction",
      "Access to Our Private Mastermind Group",
      "Lifetime Access to All Call Replays"
    ],
    cta: "Apply for Standard",
    highlight: false
  },
  {
    name: "Mastermind Pro",
    price: "1,997",
    paymentPlan: "3 Payments of $800",
    links: {
      pif: "https://buy.stripe.com/3cIeVfa351RG6iqaUc7wA0h",
      plan: "https://buy.stripe.com/aFa28t8Z1aocdKSbYg7wA0i"
    },
    description: "Limited to 5 doctors. This is for those who want direct feedback and faster results.",
    features: [
      "Everything in Standard PLUS:",
      "Two Private 1:1 Calls with Dr. Nichols",
      "Personality Testing & Leadership Review",
      "Your Personal 6-Month Practice Roadmap",
      "Private Revenue & Income Target Session",
      "We Review Your Personal ROF & Scripts",
      "Staff & Team Audit (for Clinic Owners)",
      "Direct Text/Message Access During Program",
      "Priority 'Hot Seat' Support on Every Call"
    ],
    cta: "Apply for Pro Access",
    highlight: true
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-brand-cream pb-32">
      <MastermindHeader />

      {/* Header */}
      <section className="pt-48 pb-20 px-8 text-center space-y-6">
        <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Your Enrollment</p>
        <h1 className="text-7xl font-black text-brand-navy tracking-tighter leading-none">The Path to Certainty.</h1>
        <p className="text-brand-gray text-xl font-medium max-w-2xl mx-auto">
          We don't just give you more information. We give you the actual systems to 
          run your clinic. Choose the level of support you need to get results.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="px-8 mt-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {tiers.map((tier, i) => (
            <EliteCard 
              key={tier.name} 
              className={cn(
                "relative p-12 flex flex-col h-full",
                tier.highlight ? "border-brand-orange/40 bg-white" : "border-brand-navy/5 bg-white/50 overflow-hidden"
              )}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full shadow-lg shadow-brand-orange/20">
                  Most Selected
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-3xl font-black text-brand-navy mb-2">{tier.name}</h3>
                <p className="text-sm font-medium text-brand-gray mb-8 leading-relaxed">
                  {tier.name.includes("Pro") 
                    ? "Limited to 5 doctors. This is for those who want direct feedback and faster results." 
                    : "The full 8-week system for doctors who want clarity and a better way to practice."}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-black text-brand-navy/40">$</span>
                  <span className="text-6xl font-black text-brand-navy tracking-tighter">{tier.price}</span>
                  <span className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest">Full Install</span>
                </div>
                <p className="mt-2 text-[10px] font-black text-brand-orange uppercase tracking-widest">or {tier.paymentPlan}</p>
              </div>

              <div className="space-y-5 flex-1 mb-12">
                {tier.features.map(feat => (
                  <div key={feat} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-brand-navy/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-navy" />
                    </div>
                    <span className="text-sm font-bold text-brand-navy/80">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <a href={tier.links.pif} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <BrandButton variant={tier.highlight ? "accent" : "primary"} className="w-full py-4 group">
                    Pay in Full (${tier.price}) <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </BrandButton>
                </a>
                <a href={tier.links.plan} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <BrandButton variant="ghost" className="w-full py-4 text-xs font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-orange">
                    or {tier.paymentPlan}
                  </BrandButton>
                </a>
                <p className="text-[8px] text-center text-brand-navy/30 font-bold uppercase tracking-widest mt-4">
                  100% Secure Checkout via Stripe
                </p>
              </div>
            </EliteCard>
          ))}
        </div>
      </section>

      {/* Trust & Policy Section */}
      <section className="pt-24 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6 text-brand-navy" />
            </div>
            <h4 className="text-sm font-black text-brand-navy uppercase tracking-widest">Secure Enrollment</h4>
            <p className="text-xs font-medium text-brand-gray leading-relaxed">Encrypted infrastructure. HIPAA compliant data handling.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center mx-auto">
              <Star className="w-6 h-6 text-brand-navy" />
            </div>
            <h4 className="text-sm font-black text-brand-navy uppercase tracking-widest">100% Satisfaction</h4>
            <p className="text-xs font-medium text-brand-gray leading-relaxed">If you don't feel a shift in certainty after Week 1, we offer a no-questions-asked exit.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-brand-navy" />
            </div>
            <h4 className="text-sm font-black text-brand-navy uppercase tracking-widest">Fast Track Logic</h4>
            <p className="text-xs font-medium text-brand-gray leading-relaxed">Approval to Onboarding typically occurs within 24-48 business hours.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
