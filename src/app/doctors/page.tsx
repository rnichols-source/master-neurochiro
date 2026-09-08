import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DOCTOR_TRACK_NAME, DOCTOR_SUBTITLE } from "@/lib/above-atlas";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Above Atlas for Doctors | 12-Week Identity-First Intensive",
  description:
    "A 12-week coaching intensive for chiropractors who have hit a ceiling. Identity-first, rep-based. You do the work, not watch videos.",
};

export default function DoctorsPage() {
  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: "#F2EDE4" }}>
      {/* Header */}
      <header className="px-6 py-6 md:py-8 max-w-5xl mx-auto flex items-center justify-between">
        <img
          src="/above-atlas-logo/above-atlas-horizontal.svg"
          alt="Above Atlas"
          className="h-8 md:h-10"
        />
        <Link
          href="/apply"
          className="text-xs font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-lg transition-colors"
          style={{ backgroundColor: "#12213A", color: "#F2EDE4" }}
        >
          Apply
        </Link>
      </header>

      {/* Hero */}
      <section className="px-6 pt-16 md:pt-28 pb-16 md:pb-24 max-w-3xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#12213A" }}
        >
          {DOCTOR_TRACK_NAME}
        </p>
        <h1
          className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] mb-6"
          style={{ color: "#101010" }}
        >
          You&apos;ve adjusted thousands of spines. When&apos;s the last time
          somebody checked yours?
        </h1>
        <p
          className="text-base md:text-lg font-medium leading-relaxed max-w-2xl"
          style={{ color: "#12213A", opacity: 0.7 }}
        >
          {DOCTOR_SUBTITLE}
        </p>
      </section>

      {/* Divider */}
      <div
        className="h-px max-w-5xl mx-auto"
        style={{ backgroundColor: "#12213A", opacity: 0.1 }}
      />

      {/* The Problem */}
      <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#12213A", opacity: 0.4 }}
        >
          The Problem
        </p>
        <h2
          className="text-2xl md:text-4xl font-black tracking-tight leading-[1.15] mb-8"
          style={{ color: "#101010" }}
        >
          The ceiling on your practice is not the market. It&apos;s you.
        </h2>
        <div
          className="space-y-5 text-base md:text-lg font-medium leading-relaxed"
          style={{ color: "#101010", opacity: 0.75 }}
        >
          <p>
            You know how to adjust. You know the neurology. But somewhere
            between the exam and the care plan, certainty leaks out of the room.
          </p>
          <p>
            You hedge. You offer fewer visits than you know they need. You
            discount before anyone asks. You avoid the hard conversation about
            money because you are not sure you have the right to have it.
          </p>
          <p>
            This is not a marketing problem. It is not a technique problem. It
            is an identity problem. And no course, no funnel, no new piece of
            equipment will fix it.
          </p>
          <p>
            The practice will never outgrow the doctor running it. If you want a
            different practice, you need to become a different doctor first.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-px max-w-5xl mx-auto"
        style={{ backgroundColor: "#12213A", opacity: 0.1 }}
      />

      {/* What This Is */}
      <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#12213A", opacity: 0.4 }}
        >
          What This Is
        </p>
        <h2
          className="text-2xl md:text-4xl font-black tracking-tight leading-[1.15] mb-8"
          style={{ color: "#101010" }}
        >
          12 weeks. Identity-first. Rep-based.
        </h2>
        <div
          className="space-y-5 text-base md:text-lg font-medium leading-relaxed"
          style={{ color: "#101010", opacity: 0.75 }}
        >
          <p>
            This is not a course you watch. There are no modules to binge on
            your couch. You will not get a library of content and a login.
          </p>
          <p>
            Above Atlas is a 12-week intensive where you do the work every
            single week. You practice the scripts. You record yourself. You turn
            in your rep. Then you get on the call and we pull it apart together.
          </p>
          <p>
            The program is built around one idea: certainty is a skill, and
            skills are built through repetition, not information.
          </p>
          <p>
            You already know enough. You need to become the doctor who acts on
            what they know without flinching.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-px max-w-5xl mx-auto"
        style={{ backgroundColor: "#12213A", opacity: 0.1 }}
      />

      {/* How It Works */}
      <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#12213A", opacity: 0.4 }}
        >
          How It Works
        </p>
        <h2
          className="text-2xl md:text-4xl font-black tracking-tight leading-[1.15] mb-12"
          style={{ color: "#101010" }}
        >
          Five steps. No mystery.
        </h2>

        <div className="space-y-10">
          {[
            {
              step: "01",
              title: "Apply",
              desc: "Submit a short application. We read every one. Not everyone gets in, and that is the point.",
            },
            {
              step: "02",
              title: "Get approved",
              desc: "If it is a fit, you get a call with Dr. Nichols. Not a sales call. A conversation about where you are and where you want to go.",
            },
            {
              step: "03",
              title: "12 weekly calls",
              desc: "Live group coaching. Small cohort. You show up, participate, and leave with something to implement before next week.",
            },
            {
              step: "04",
              title: "Turn in your rep",
              desc: "Every week you practice the work and submit proof. A recording, a script, a care plan. No rep, no progress.",
            },
            {
              step: "05",
              title: "Graduate",
              desc: "After 12 weeks, your numbers and your confidence speak for themselves. Optional ongoing access through the Inner Circle.",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-6 md:gap-8">
              <div
                className="text-2xl md:text-3xl font-black tracking-tight shrink-0 w-12"
                style={{ color: "#12213A", opacity: 0.15 }}
              >
                {item.step}
              </div>
              <div>
                <h3
                  className="text-lg md:text-xl font-black tracking-tight mb-2"
                  style={{ color: "#101010" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-base font-medium leading-relaxed"
                  style={{ color: "#101010", opacity: 0.7 }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-px max-w-5xl mx-auto"
        style={{ backgroundColor: "#12213A", opacity: 0.1 }}
      />

      {/* Pricing */}
      <section className="px-6 py-16 md:py-24 max-w-4xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#12213A", opacity: 0.4 }}
        >
          Investment
        </p>
        <h2
          className="text-2xl md:text-4xl font-black tracking-tight leading-[1.15] mb-12"
          style={{ color: "#101010" }}
        >
          Two paths after you apply.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* 90-Day Intensive */}
          <div
            className="rounded-2xl p-8 md:p-10 border flex flex-col"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "rgba(18,33,58,0.1)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#12213A" }}
            >
              Start Here
            </p>
            <h3
              className="text-xl md:text-2xl font-black tracking-tight mb-1"
              style={{ color: "#101010" }}
            >
              Above Atlas
            </h3>
            <p
              className="text-sm font-medium mb-6"
              style={{ color: "#101010", opacity: 0.5 }}
            >
              Learn. Build. Prove.
            </p>
            <div className="flex items-baseline gap-1 mb-1">
              <span
                className="text-sm font-black"
                style={{ color: "#101010", opacity: 0.3 }}
              >
                $
              </span>
              <span
                className="text-4xl md:text-5xl font-black tracking-tight"
                style={{ color: "#101010" }}
              >
                697
              </span>
            </div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "#101010", opacity: 0.5 }}
            >
              /month x 3 months
            </p>
            <p
              className="text-sm font-bold mb-8"
              style={{ color: "#12213A" }}
            >
              or $1,797 pay-in-full (save $294)
            </p>
            <div className="space-y-3 flex-1 mb-8">
              {[
                "13 weekly coaching calls with Dr. Nichols",
                "Complete clinical and business curriculum",
                "Day 1, Day 2, and ROF system, scripted and practiced",
                "KPI tracking and weekly accountability",
                "Proven scripts for every patient interaction",
                "Care plan presentation framework",
                "Private cohort community",
                "Implementation sprint with real patients",
                "Guarantee: hit 70% acceptance or stay free",
              ].map((feat) => (
                <div key={feat} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(18,33,58,0.06)" }}
                  >
                    <Check className="w-3 h-3" style={{ color: "#12213A" }} />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#101010", opacity: 0.75 }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/apply"
              className="block w-full text-center text-sm font-bold uppercase tracking-[0.15em] px-6 py-4 rounded-xl transition-all"
              style={{ backgroundColor: "#12213A", color: "#F2EDE4" }}
            >
              Apply for the Intensive
            </Link>
            <p
              className="text-xs text-center font-medium mt-3"
              style={{ color: "#101010", opacity: 0.35 }}
            >
              30 seats per cohort
            </p>
          </div>

          {/* Inner Circle */}
          <div
            className="rounded-2xl p-8 md:p-10 border flex flex-col"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "rgba(18,33,58,0.06)",
              opacity: 0.8,
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#12213A", opacity: 0.5 }}
            >
              After Graduation
            </p>
            <h3
              className="text-xl md:text-2xl font-black tracking-tight mb-1"
              style={{ color: "#101010" }}
            >
              Inner Circle
            </h3>
            <p
              className="text-sm font-medium mb-6"
              style={{ color: "#101010", opacity: 0.5 }}
            >
              For Intensive graduates only.
            </p>
            <div className="flex items-baseline gap-1 mb-1">
              <span
                className="text-sm font-black"
                style={{ color: "#101010", opacity: 0.3 }}
              >
                $
              </span>
              <span
                className="text-4xl md:text-5xl font-black tracking-tight"
                style={{ color: "#101010" }}
              >
                397
              </span>
            </div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "#101010", opacity: 0.5 }}
            >
              /month
            </p>
            <p
              className="text-sm font-bold mb-8"
              style={{ color: "#12213A", opacity: 0.6 }}
            >
              Month-to-month. Cancel anytime.
            </p>
            <div className="space-y-3 flex-1 mb-8">
              {[
                "Bi-weekly 90-min group coaching call",
                "Ongoing community access",
                "Bi-weekly content drops and new trainings",
                "Full script vault and resource library",
                "KPI tracking continues",
                "Quarterly live event invitations",
                "All past curriculum and call replays",
              ].map((feat) => (
                <div key={feat} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(18,33,58,0.04)" }}
                  >
                    <Check
                      className="w-3 h-3"
                      style={{ color: "#12213A", opacity: 0.5 }}
                    />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#101010", opacity: 0.55 }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="block w-full text-center text-sm font-bold uppercase tracking-[0.15em] px-6 py-4 rounded-xl cursor-not-allowed"
              style={{
                backgroundColor: "rgba(18,33,58,0.06)",
                color: "rgba(16,16,16,0.35)",
              }}
            >
              Graduates Only
            </div>
            <p
              className="text-xs text-center font-medium mt-3"
              style={{ color: "#101010", opacity: 0.35 }}
            >
              Complete the Intensive first
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-px max-w-5xl mx-auto"
        style={{ backgroundColor: "#12213A", opacity: 0.1 }}
      />

      {/* Your Coach */}
      <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#12213A", opacity: 0.4 }}
        >
          Your Coach
        </p>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shrink-0">
            <img
              src="/dr-ray-headshot.png"
              alt="Dr. Raymond Nichols"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3
                className="text-xl md:text-2xl font-black tracking-tight"
                style={{ color: "#101010" }}
              >
                Dr. Raymond Nichols
              </h3>
              <p
                className="text-sm font-bold uppercase tracking-[0.1em] mt-1"
                style={{ color: "#12213A", opacity: 0.5 }}
              >
                Doctor of Chiropractic. Practice Owner. Builder.
              </p>
            </div>
            <div
              className="space-y-4 text-base font-medium leading-relaxed"
              style={{ color: "#101010", opacity: 0.7 }}
            >
              <p>
                Owner of AlignLife Chiropractic in Greenville, SC. Not a retired
                coach. A doctor who sees patients every single day and built
                every system he teaches from the ground up.
              </p>
              <p>
                Built the care plan generator, KPI system, scripts, and clinical
                tools used inside Above Atlas. The same tools he uses in his own
                practice. Cohort 1 and 2 members averaged a 30+ percentage
                point increase in care plan acceptance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-px max-w-5xl mx-auto"
        style={{ backgroundColor: "#12213A", opacity: 0.1 }}
      />

      {/* Final CTA */}
      <section className="px-6 py-20 md:py-32 max-w-3xl mx-auto text-center">
        <h2
          className="text-2xl md:text-4xl font-black tracking-tight leading-[1.15] mb-6"
          style={{ color: "#101010" }}
        >
          If you are ready to stop hedging, apply.
        </h2>
        <p
          className="text-base md:text-lg font-medium leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: "#101010", opacity: 0.6 }}
        >
          No pitch call. No funnel. Submit the application, and if it is a fit,
          we will talk.
        </p>
        <Link
          href="/apply"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-xl transition-all group"
          style={{ backgroundColor: "#12213A", color: "#F2EDE4" }}
        >
          Apply Now
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 text-center"
        style={{ borderTop: "1px solid rgba(18,33,58,0.08)" }}
      >
        <p
          className="text-xs font-medium"
          style={{ color: "#101010", opacity: 0.3 }}
        >
          Above Atlas. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
