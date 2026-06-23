import { MastermindHeader } from "@/components/layout/mastermind-header";
import { SEOFooter } from "@/components/layout/seo-footer";
import { BrandButton } from "@/components/ui/elite-ui";
import {
  ArrowRight,
  CheckCircle2,
  Video,
  Users,
  Zap,
  TrendingUp,
  MessageSquare,
  Star,
  Globe,
  Lock,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { InnerCircleFAQ } from "./InnerCircleFAQ";

export const metadata: Metadata = {
  title: "Inner Circle — Ongoing Coaching for Mastermind Graduates",
  description:
    "The only chiropractic coaching program powered by AI, real data, and a curated room of Mastermind graduates. Bi-weekly calls, personalized coaching, and tools that work between sessions.",
};

const CALENDLY_URL =
  "https://calendly.com/drray-neurochirodirectory/neurochiro-inner-circle-strategy-call";

const benefits = [
  {
    icon: Video,
    title: "Bi-Weekly Live Coaching",
    description:
      "Not a lecture. Every other week, you bring your specific problem and we work through it live. Hot seats, case reviews, script refinement. Twice the touchpoints of any other program.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Zap,
    title: "AI-Powered Personal Coaching",
    description:
      "After every call, you get a personalized coaching recap with action items specific to YOUR practice, YOUR numbers, YOUR stage. Not a generic replay. A personal coach that works between calls.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: TrendingUp,
    title: "Your Numbers Follow You",
    description:
      "KPI tracking that shows your trajectory since day one. Benchmarked against other Inner Circle members. The system flags problems before they become crises.",
    color: "bg-brand-orange/10 text-brand-orange",
  },
  {
    icon: Star,
    title: "The Tools Keep Working",
    description:
      "Care Plan Generator. Triage Suite. KPI Tracker. Economics Engine. You keep full access to every tool, and they get smarter over time because they learn from your data.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Users,
    title: "A Curated Room",
    description:
      "You can't buy your way in. Every member completed the 13-week Mastermind, hit the benchmarks, and speaks the same language. Conversations start at a higher level.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Globe,
    title: "Plugged Into the Ecosystem",
    description:
      "Inner Circle members get directory boost on neurochiro.co, priority ChiroMatch access for hiring, and real patient leads. No other coaching program drives patients and talent to your door.",
    color: "bg-amber-50 text-amber-600",
  },
];

const comparisonRows = [
  { feature: "Live coaching calls", typical: "1x/mo", inner: "2x/mo" },
  { feature: "Personalized AI coaching recaps", typical: false, inner: true },
  { feature: "Practice KPI tracking", typical: false, inner: true },
  { feature: "Benchmarking against peers", typical: false, inner: true },
  { feature: "AI-powered clinical tools", typical: false, inner: true },
  { feature: "Drives real patients to you", typical: false, inner: true },
  { feature: "Hiring priority (ChiroMatch)", typical: false, inner: true },
  {
    feature: "Direct access to coach",
    typical: "Office hours",
    inner: "Anytime",
  },
  {
    feature: "Curated membership",
    typical: "Anyone can join",
    inner: "Graduates only",
  },
];

const foundingFeatures = [
  "Bi-weekly group coaching calls",
  "AI-powered personal coaching recaps",
  "Full access to all Mastermind tools",
  "KPI tracking + peer benchmarking",
  "Direct access to Dr. Ray",
  "NeuroChiro directory boost + ChiroMatch priority",
  "First access to every new launch",
  "Price never increases",
];

const standardFeatures = foundingFeatures.slice(0, -1);

export default function InnerCirclePage() {
  return (
    <div className="min-h-[100dvh] bg-brand-cream overflow-x-hidden">
      <MastermindHeader />

      {/* ──────────────── HERO ──────────────── */}
      <section className="pt-24 md:pt-40 pb-16 md:pb-24 px-5 md:px-6 bg-brand-navy relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/15 rounded-full mb-6">
            <Lock className="w-3.5 h-3.5 text-brand-orange" />
            <span className="text-sm font-bold text-brand-orange">
              For Mastermind Graduates Only
            </span>
          </div>

          <h1 className="text-[2rem] leading-[1.1] md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            The NeuroChiro{" "}
            <span className="text-brand-orange">Inner Circle</span>
          </h1>

          <p className="text-base md:text-lg text-white/50 font-medium leading-relaxed max-w-xl mx-auto mb-10">
            You did the work. You built the foundation. Stay in the room that
            keeps you sharp, accountable, and growing.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            {[
              { val: "2x", label: "Monthly Calls" },
              { val: "AI", label: "Coaching Recaps" },
              { val: "$297", label: "Founding Rate" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 min-w-[110px]"
              >
                <span className="block text-xl md:text-2xl font-black text-white">
                  {s.val}
                </span>
                <span className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <BrandButton
              variant="primary"
              size="lg"
              className="group px-8 py-4 text-base"
            >
              Book Your Strategy Call
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </BrandButton>
          </a>
          <p className="text-sm text-white/30 mt-4 font-medium">
            30-minute 1-on-1 with Dr. Ray. No pressure. Just a conversation.
          </p>
        </div>
      </section>

      {/* ──────────────── THE PROBLEM ──────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-3">
            The Reality
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight mb-4">
            The Mastermind gave you the skills.{" "}
            <span className="text-brand-orange">Now what?</span>
          </h2>
          <p className="text-base text-brand-gray font-medium leading-relaxed max-w-xl mx-auto">
            You&apos;ve got the scripts. The systems. The confidence. But without the
            room, the calls, and the accountability, it&apos;s easy to drift back to
            old patterns.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Isolation kills momentum",
              body: "You go back to practicing alone. No one to bounce ideas off. No one to call you out. The room that pushed you forward disappears.",
              bg: "bg-red-50 border-red-100",
            },
            {
              title: "Knowledge fades without reps",
              body: "The frameworks work. But if you stop reviewing, refining, and pressure-testing them, they fade. Fast. Old habits creep back in.",
              bg: "bg-amber-50 border-amber-100",
            },
            {
              title: "Growth requires new problems",
              body: "You solved the first set. Now there are different challenges at a different stage. You need people who understand where you are now.",
              bg: "bg-blue-50 border-blue-100",
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`${card.bg} border rounded-2xl p-6`}
            >
              <h3 className="font-lato font-bold text-brand-navy text-[15px] mb-2">
                {card.title}
              </h3>
              <p className="text-[13px] text-brand-gray leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────── WHAT MAKES IT DIFFERENT ──────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-3">
            Why This Doesn&apos;t Exist Yet
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight mb-4">
            Not another coaching group.{" "}
            <span className="text-brand-orange">
              A system that coaches you.
            </span>
          </h2>
          <p className="text-base text-brand-gray font-medium leading-relaxed max-w-xl mx-auto">
            Every chiropractic coaching program is a Zoom call and a Facebook
            group. This is fundamentally different.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-brand-cream rounded-2xl border border-brand-navy/5 p-6 hover:border-brand-orange/20 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${b.color}`}
                >
                  <b.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-lato font-bold text-brand-navy text-[15px] mb-1">
                    {b.title}
                  </h3>
                  <p className="text-[13px] text-brand-gray leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────── COMPARISON TABLE ──────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-3">
            See The Difference
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight">
            Other programs vs.{" "}
            <span className="text-brand-orange">Inner Circle</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-brand-navy/10">
                <th className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-brand-gray">
                  &nbsp;
                </th>
                <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-brand-gray">
                  Typical Coaching
                </th>
                <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-brand-orange">
                  Inner Circle
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-brand-navy/5"
                >
                  <td className="py-3.5 px-4 text-brand-gray font-medium">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold">
                    {typeof row.typical === "boolean" ? (
                      row.typical ? (
                        <span className="text-brand-orange">&#10003;</span>
                      ) : (
                        <span className="text-brand-navy/20 text-lg">
                          &times;
                        </span>
                      )
                    ) : (
                      <span className="text-brand-gray">{row.typical}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold">
                    {typeof row.inner === "boolean" ? (
                      <span className="text-brand-orange">&#10003;</span>
                    ) : (
                      <span className="text-brand-orange">{row.inner}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ──────────────── PRICING ──────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-3">
            Simple Pricing
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight">
            One membership. No tiers.{" "}
            <span className="text-brand-orange">No fluff.</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Founding Member */}
          <div className="relative bg-brand-cream rounded-2xl border-2 border-brand-orange shadow-[0_0_0_1px_rgba(234,88,12,0.15),0_8px_30px_rgba(234,88,12,0.1)] p-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
              Founding Member
            </div>

            <div className="text-center mb-6">
              <span className="text-4xl font-black text-brand-navy">$297</span>
              <span className="text-brand-gray text-sm font-medium">/mo</span>
              <p className="text-sm font-bold text-brand-orange mt-1">
                Locked forever. First 10 only.
              </p>
            </div>

            <ul className="space-y-3 mb-7">
              {foundingFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-[13px] text-brand-gray"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 bg-brand-orange text-white font-bold rounded-xl text-center text-[15px] hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Claim Founding Spot
            </a>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-brand-gray/60 mt-3">
              <Lock className="w-3 h-3" />
              Only available during this enrollment window
            </p>
          </div>

          {/* Standard */}
          <div className="bg-brand-cream rounded-2xl border-2 border-brand-navy/10 p-8">
            <div className="text-center mb-6 mt-3">
              <span className="text-4xl font-black text-brand-navy">$397</span>
              <span className="text-brand-gray text-sm font-medium">/mo</span>
              <p className="text-sm font-medium text-brand-gray mt-1">
                Standard membership
              </p>
            </div>

            <ul className="space-y-3 mb-7">
              {standardFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-[13px] text-brand-gray"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 bg-brand-navy text-white font-bold rounded-xl text-center text-[15px] hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────── FAQ ──────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
            Questions
          </h2>
        </div>
        <div className="max-w-2xl mx-auto">
          <InnerCircleFAQ />
        </div>
      </section>

      {/* ──────────────── BOTTOM CTA ──────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-brand-navy">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4">
            Don&apos;t lose what you built.
          </h2>
          <p className="text-base text-white/50 font-medium leading-relaxed max-w-md mx-auto mb-8">
            The Mastermind ends. The Inner Circle doesn&apos;t. Book your call and
            let&apos;s talk about what&apos;s next for your practice.
          </p>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <BrandButton
              variant="primary"
              size="lg"
              className="group px-8 py-4 text-base"
            >
              Book Your Strategy Call
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </BrandButton>
          </a>
        </div>
      </section>

      <SEOFooter />
    </div>
  );
}
