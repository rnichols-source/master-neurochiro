"use client";
import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { Check, ArrowRight, ShieldCheck, Zap, Star, Shield, Users, Target, BarChart3, BookOpen, MessageSquare, Calendar, Trophy } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FAQSection } from "@/components/ui/faq-section";

const doctorIntensive = {
  badge: "Start Here",
  badgeColor: "orange" as const,
  title: "90-Day Intensive",
  subtitle: "Learn. Build. Prove.",
  price: "697",
  priceSuffix: "/month x 3 months",
  altPrice: "or $1,797 pay-in-full (save $294)",
  features: [
    "13 weekly coaching calls with Dr. Nichols",
    "Complete clinical & business curriculum",
    "Day 1, Day 2, and ROF system — scripted and practiced",
    "KPI tracking & weekly accountability",
    "Proven scripts for every patient interaction",
    "Care plan presentation framework",
    "Private cohort community",
    "Implementation sprint with real patients",
    "Guarantee: hit 70% acceptance or stay free (you do the work, we guarantee results)",
  ],
  cta: "Apply for Cohort 3",
  ctaLink: "/apply",
  ctaVariant: "accent" as const,
  belowCta: "30 seats per cohort · Next cohort: July 21, 2026",
  highlight: true,
  disabled: false,
};

const doctorInnerCircle = {
  badge: "After Graduation",
  badgeColor: "navy" as const,
  title: "Inner Circle",
  subtitle: "For Intensive graduates",
  price: "397",
  priceSuffix: "/month",
  altPrice: "Month-to-month · Cancel anytime",
  features: [
    "Monthly 90-min group coaching call",
    "Ongoing community access",
    "Monthly content drops & new trainings",
    "Full script vault & resource library",
    "KPI tracking continues",
    "Quarterly live event invitations",
    "All past curriculum & call replays",
  ],
  cta: "Graduates Only",
  ctaLink: "#",
  ctaVariant: "primary" as const,
  belowCta: "Complete the 90-Day Intensive first \u2192 then join the Inner Circle",
  highlight: false,
  disabled: true,
};

const studentIntensive = {
  badge: "Start Here",
  badgeColor: "orange" as const,
  title: "Foundations Intensive",
  subtitle: "Learn. Build. Prove.",
  price: "197",
  priceSuffix: "/month x 3 months",
  altPrice: "or $497 pay-in-full (save $94)",
  features: [
    "13 weekly coaching calls (student track)",
    "Student-specific clinical curriculum",
    "Day 1 & Day 2 scripts — practiced via role-play",
    "Interview prep & resume building",
    "Career planning & associate contract review",
    "Build your professional brand before graduation",
    "Private student community",
    "Video submission feedback from Dr. Nichols",
    "Guarantee: confident presenting a care plan by Day 90 or stay free",
  ],
  cta: "Apply as Student",
  ctaLink: "/apply",
  ctaVariant: "accent" as const,
  belowCta: "Cohort 3 starts July 21, 2026",
  highlight: true,
  disabled: false,
};

const studentInnerCircle = {
  badge: "After Graduation",
  badgeColor: "navy" as const,
  title: "Student Inner Circle",
  subtitle: "For Foundations graduates",
  price: "97",
  priceSuffix: "/month",
  altPrice: "Month-to-month · Cancel anytime",
  features: [
    "Monthly student group call",
    "Job board access & placement support",
    "Community with working new grads",
    "Script library & career resources",
    "Resume review on request",
    "Path to Doctor Intensive when you open your practice",
  ],
  cta: "Graduates Only",
  ctaLink: "#",
  ctaVariant: "primary" as const,
  belowCta: "Complete the Foundations Intensive first \u2192 then join",
  highlight: false,
  disabled: true,
};

type ProductCard = {
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  price: string;
  priceSuffix: string;
  altPrice: string;
  features: string[];
  cta: string;
  ctaLink: string;
  ctaVariant: "accent" | "primary" | "outline" | "ghost";
  belowCta: string;
  highlight: boolean;
  disabled: boolean;
};

function PricingCard({ card }: { card: ProductCard }) {
  return (
    <EliteCard
      className={cn(
        "relative p-6 md:p-12 flex flex-col h-full",
        card.highlight
          ? "border-brand-orange/40 bg-white mt-4 md:mt-0"
          : "border-brand-navy/5 bg-white/50"
      )}
    >
      {/* Badge */}
      <div
        className={cn(
          "absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-wider px-5 py-1.5 rounded-full shadow-lg z-10",
          card.badgeColor === "orange"
            ? "bg-brand-orange text-white shadow-brand-orange/20"
            : "bg-brand-navy/10 text-brand-navy shadow-brand-navy/5"
        )}
      >
        {card.badge}
      </div>

      <div className="mb-6 md:mb-8 pt-4">
        <h3 className="text-xl md:text-2xl font-black text-brand-navy mb-1">
          {card.title}
        </h3>
        <p className="text-sm font-medium text-brand-gray mb-5 md:mb-6">
          {card.subtitle}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-black text-brand-navy/40">$</span>
          <span className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight">
            {card.price}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-brand-navy/60">
          {card.priceSuffix}
        </p>
        <p className="mt-1 text-sm font-bold text-brand-orange">
          {card.altPrice}
        </p>
      </div>

      <div className="space-y-3.5 md:space-y-4 flex-1 mb-8 md:mb-10">
        {card.features.map((feat) => (
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
        {card.disabled ? (
          <div className="block w-full">
            <BrandButton
              variant={card.ctaVariant}
              className="w-full py-4 text-sm opacity-60 cursor-not-allowed"
            >
              {card.cta}
            </BrandButton>
          </div>
        ) : (
          <Link href={card.ctaLink} className="block w-full">
            <BrandButton
              variant={card.ctaVariant}
              className="w-full py-4 group text-sm"
            >
              {card.cta}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </BrandButton>
          </Link>
        )}
        <p className="text-xs text-center text-brand-navy/40 font-medium mt-3">
          {card.belowCta}
        </p>
      </div>
    </EliteCard>
  );
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<"doctor" | "student">("doctor");

  const cards: ProductCard[] =
    activeTab === "doctor"
      ? [doctorIntensive, doctorInnerCircle]
      : [studentIntensive, studentInnerCircle];

  return (
    <div className="min-h-[100dvh] bg-brand-cream pb-24 md:pb-32">
      <MastermindHeader />

      {/* Hero — Doctor */}
      {activeTab === "doctor" && (
        <section className="pt-24 md:pt-40 pb-6 md:pb-8 px-5 md:px-6 text-center space-y-4 md:space-y-6">
          <p className="text-sm font-bold text-brand-orange uppercase tracking-widest">For Chiropractors &amp; Practice Owners</p>
          <h1 className="text-3xl md:text-6xl font-black text-brand-navy tracking-tight max-w-3xl mx-auto">
            Go from second-guessing to certainty in 90 days.
          </h1>
          <p className="text-base md:text-lg text-brand-gray font-medium max-w-2xl mx-auto">
            The 90-day coaching intensive for nervous system chiropractors who want to present care plans with confidence, convert more patients, and collect what they&apos;re worth. Cohort 1 &amp; 2 members went from 40-50% care plan acceptance to 70-80%.
          </p>
          <div className="flex justify-center pt-2">
            <span className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange text-sm font-bold px-5 py-2.5 rounded-full">
              <Shield className="w-4 h-4" />
              70% care plan acceptance or stay free until you do
            </span>
          </div>
        </section>
      )}

      {/* Hero — Student */}
      {activeTab === "student" && (
        <section className="pt-24 md:pt-40 pb-6 md:pb-8 px-5 md:px-6 text-center space-y-4 md:space-y-6">
          <p className="text-sm font-bold text-brand-orange uppercase tracking-widest">For Chiropractic Students &amp; New Grads</p>
          <h1 className="text-3xl md:text-6xl font-black text-brand-navy tracking-tight max-w-3xl mx-auto">
            Graduate ready — not guessing.
          </h1>
          <p className="text-base md:text-lg text-brand-gray font-medium max-w-2xl mx-auto">
            The 90-day intensive for chiropractic students who want to walk into any practice with clinical confidence, a Day 1/Day 2 system, and the business knowledge school didn&apos;t teach.
          </p>
          <div className="flex justify-center pt-2">
            <span className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange text-sm font-bold px-5 py-2.5 rounded-full">
              <Shield className="w-4 h-4" />
              Confident presenting a care plan by Day 90 or stay free
            </span>
          </div>
        </section>
      )}

      {/* Toggle */}
      <div className="flex justify-center py-6 px-5">
        <div className="inline-flex items-center bg-white border border-brand-navy/10 rounded-xl p-1.5 shadow-sm">
          <button
            onClick={() => setActiveTab("doctor")}
            className={cn(
              "px-6 py-3 rounded-lg text-sm font-bold transition-all",
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
              "px-6 py-3 rounded-lg text-sm font-bold transition-all",
              activeTab === "student"
                ? "bg-brand-navy text-white shadow-md"
                : "text-brand-navy/50 hover:text-brand-navy"
            )}
          >
            Students
          </button>
        </div>
      </div>

      {/* Who is this for? */}
      {activeTab === "doctor" && (
        <p className="text-sm text-brand-gray font-medium text-center px-5 pb-2">
          For practice owners and associate doctors who are tired of second-guessing their recommendations. No practice is too small or too big.
        </p>
      )}
      {activeTab === "student" && (
        <p className="text-sm text-brand-gray font-medium text-center px-5 pb-2">
          For chiro students in their final 2 years and new grads under 1 year out. No patients needed — you&apos;ll practice via role-play and video submissions. Separate calls from doctors.
        </p>
      )}

      {/* Cohort Banner */}
      <div className="flex items-center justify-center gap-2 py-3 px-5">
        <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
        <span className="text-sm font-bold text-brand-gray">
          Cohort 3 starts July 21, 2026 &middot; {activeTab === "doctor" ? "30 seats" : "Open enrollment"} &middot; Applications open
        </span>
      </div>

      {/* Pricing Grid */}
      <section className="px-5 md:px-6 mt-8 md:mt-12">
        <div
          key={activeTab}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 animate-[fadeIn_0.3s_ease-out]"
        >
          <PricingCard card={cards[0]} />
          <PricingCard card={cards[1]} />
        </div>
      </section>

      {/* How It Works */}
      <section className="pt-16 md:pt-20 px-5 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h3 className="text-xl md:text-2xl font-black text-brand-navy">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                <span className="text-lg font-black text-brand-orange">1</span>
              </div>
              <h4 className="text-sm font-black text-brand-navy">Apply &amp; Get Approved</h4>
              <p className="text-sm text-brand-gray font-medium">Submit your application. We review it within 48 hours. If you&apos;re a fit, you&apos;re in.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                <span className="text-lg font-black text-brand-orange">2</span>
              </div>
              <h4 className="text-sm font-black text-brand-navy">Complete the 90-Day Intensive</h4>
              <p className="text-sm text-brand-gray font-medium">13 weekly calls. Learn the system (Weeks 1-8), implement it on real patients (Weeks 9-10), prove it with your KPIs (Weeks 11-13).</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                <span className="text-lg font-black text-brand-orange">3</span>
              </div>
              <h4 className="text-sm font-black text-brand-navy">Graduate to the Inner Circle</h4>
              <p className="text-sm text-brand-gray font-medium">After 90 days, your results speak for themselves. Stay connected with monthly coaching at $397/month — completely optional, cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Guarantee (expanded) */}
      <section className="pt-12 md:pt-16 px-5 md:px-6">
        <div className="max-w-2xl mx-auto">
          <EliteCard className="p-6 md:p-10 text-center space-y-4 border-brand-orange/20">
            <Shield className="w-10 h-10 text-brand-orange mx-auto" />
            <h3 className="text-xl font-black text-brand-navy">The Guarantee</h3>
            {activeTab === "doctor" ? (
              <p className="text-sm text-brand-gray font-medium leading-relaxed">
                If your care plan acceptance rate doesn&apos;t hit 70% by Day 90, you stay in the program free until it does. The only condition: you have to do the work — show up to calls, submit your KPIs weekly, and implement the scripts. If you do the work and the numbers don&apos;t move, you don&apos;t pay. Simple as that.
              </p>
            ) : (
              <p className="text-sm text-brand-gray font-medium leading-relaxed">
                If you can&apos;t confidently present a full care plan by Day 90, you stay in the program free until you can. The condition: show up to calls, submit your assignments, and practice the scripts. If you put in the reps and still don&apos;t feel ready, you don&apos;t pay.
              </p>
            )}
          </EliteCard>
        </div>
      </section>

      {/* Your Coach */}
      <section className="pt-16 md:pt-20 px-5 md:px-6">
        <div className="max-w-3xl mx-auto">
          <EliteCard className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-brand-navy flex items-center justify-center shrink-0">
                <span className="text-4xl md:text-5xl font-black text-brand-orange">DR</span>
              </div>
              <div className="text-center md:text-left space-y-3">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-brand-navy">Dr. Raymond Nichols</h3>
                  <p className="text-sm font-bold text-brand-orange">Your Coach</p>
                </div>
                <p className="text-sm text-brand-gray font-medium leading-relaxed">
                  Practicing chiropractor and owner of AlignLife Chiropractic in Greenville, SC. Not a retired coach — a doctor who sees patients every single day and built every system he teaches from the ground up.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-1">
                  <span className="text-xs font-bold text-brand-navy/60 bg-brand-navy/5 px-3 py-1.5 rounded-full">Doctor of Chiropractic</span>
                  <span className="text-xs font-bold text-brand-navy/60 bg-brand-navy/5 px-3 py-1.5 rounded-full">Practice Owner</span>
                  <span className="text-xs font-bold text-brand-navy/60 bg-brand-navy/5 px-3 py-1.5 rounded-full">180K+ Followers</span>
                  <span className="text-xs font-bold text-brand-navy/60 bg-brand-navy/5 px-3 py-1.5 rounded-full">NeuroChiro Founder</span>
                  <span className="text-xs font-bold text-brand-navy/60 bg-brand-navy/5 px-3 py-1.5 rounded-full">2 Cohorts Coached</span>
                </div>
                <p className="text-sm text-brand-gray font-medium leading-relaxed pt-2">
                  Built the care plan generator, KPI system, scripts, and clinical tools used inside the Mastermind — the same tools he uses in his own practice. Cohort 1 &amp; 2 members averaged a 30+ percentage point increase in care plan acceptance.
                </p>
              </div>
            </div>
          </EliteCard>
        </div>
      </section>

      {/* Call Schedule */}
      <section className="pt-10 md:pt-12 px-5 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h3 className="text-lg font-black text-brand-navy">Live Call Schedule</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white border border-brand-navy/5 rounded-2xl p-5 flex-1">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-brand-orange" />
                <span className="text-sm font-black text-brand-navy">Doctor Calls</span>
              </div>
              <p className="text-sm text-brand-gray font-medium">Tuesdays at 12:00 PM ET</p>
              <p className="text-xs text-brand-navy/40 font-medium mt-1">60-90 minutes · Weekly during Intensive</p>
            </div>
            <div className="bg-white border border-brand-navy/5 rounded-2xl p-5 flex-1">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-brand-orange" />
                <span className="text-sm font-black text-brand-navy">Student Calls</span>
              </div>
              <p className="text-sm text-brand-gray font-medium">Day &amp; time TBA</p>
              <p className="text-xs text-brand-navy/40 font-medium mt-1">60 minutes · Weekly during Intensive</p>
            </div>
          </div>
          <p className="text-xs text-brand-gray/60 font-medium">All calls are recorded and available in your portal within 24 hours if you miss one.</p>
        </div>
      </section>

      {/* Social Proof */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 px-5 pt-10 max-w-3xl mx-auto">
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-brand-gray italic">
            &ldquo;My care plan acceptance went from 42% to 78% in the first 6 weeks.&rdquo;
          </p>
          <p className="text-xs font-bold text-brand-navy mt-1">
            — Cohort 1 Member, Clinic Owner
          </p>
        </div>
        <div className="hidden sm:block w-px h-10 bg-brand-navy/10" />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-brand-gray italic">
            &ldquo;I finally present care with certainty. My patients feel it and my collections show it.&rdquo;
          </p>
          <p className="text-xs font-bold text-brand-navy mt-1">
            — Cohort 2 Member, Associate Doctor
          </p>
        </div>
      </div>

      {/* Not Sure CTA */}
      <div className="text-center px-5 pt-8">
        <p className="text-sm text-brand-gray font-medium">
          Not sure if this is right for you?{" "}
          <a
            href="https://calendly.com/neurochiro-pro/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-orange hover:text-brand-navy underline transition-colors"
          >
            Book a free 15-min call with Dr. Nichols — no pitch, just a conversation
          </a>
        </p>
      </div>

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
              Encrypted checkout via Stripe. Your data is safe.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center mx-auto">
              <Star className="w-6 h-6 text-brand-navy" />
            </div>
            <h4 className="text-sm font-black text-brand-navy">
              Results Guarantee
            </h4>
            <p className="text-sm font-medium text-brand-gray leading-relaxed">
              {activeTab === "doctor"
                ? "70% care plan acceptance or stay free until you do."
                : "Confident presenting a care plan by Day 90 or stay free."}
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

      {/* Looking for More? */}
      <section className="pt-16 md:pt-20 px-5 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-black text-brand-navy text-center mb-6">
            Looking for More?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/apply/mentorship"
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
            <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-brand-navy/5 shadow-sm">
              <div>
                <p className="text-base font-black text-brand-navy">
                  The Inner Circle
                </p>
                <p className="text-sm text-brand-gray font-medium">
                  Ongoing coaching for Intensive graduates
                </p>
              </div>
              <Trophy className="w-5 h-5 text-brand-navy/20" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
