import type { Metadata } from "next";
import { MastermindHeader } from "@/components/layout/mastermind-header";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "The 90-day roadmap for clinical certainty and practice growth.",
};
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  Brain, 
  TrendingUp, 
  Zap,
  Lock,
  MessageSquare,
  BarChart3,
  Users
} from "lucide-react";
import Link from "next/link";

const weeks = [
  {
    number: 1,
    title: "Identity of a Nervous System Doctor",
    why: "If you don't value yourself, patients won't either.",
    change: "Stop acting like a technician and start acting like the expert in the room.",
    skills: ["Confident Presence", "Removing Neediness", "Leadership Skills"],
    mistakes: ["Trying to convince people", "Focusing on symptoms only"],
    icon: Brain
  },
  {
    number: 2,
    title: "Chiropractic Neurology for REAL Practice",
    why: "If they don't understand it, they won't buy it.",
    change: "Learn how to talk about scans and nerves so patients actually get it.",
    skills: ["Simple Scan Talk", "Reading HRV Simply", "The Patient-First Method"],
    mistakes: ["Giving too much data", "Using boring education"],
    icon: Zap
  },
  {
    number: 3,
    title: "Communication Mastery",
    why: "Stop being afraid to ask for the commitment.",
    change: "A better way to do your Report of Findings that feels natural.",
    skills: ["The Script System", "Handling Money Talks", "Confident Close"],
    mistakes: ["Weak recommendations", "Feeling awkward"],
    icon: MessageSquare
  },
  {
    number: 4,
    title: "Philosophy (Modern + Powerful)",
    why: "You need a powerful way to explain what we do.",
    change: "How to talk about subluxation in a way that makes sense in 2026.",
    skills: ["Modern Framing", "Science + Philosophy", "Clear Explanations"],
    mistakes: ["Sounding outdated", "Avoiding the truth"],
    icon: Target
  },
  {
    number: 5,
    title: "Business: What School NEVER Taught You",
    why: "Practice should give you freedom, not stress.",
    change: "Get control of your money, your overhead, and your growth.",
    skills: ["Money Mapping", "Knowing Your Value", "Predictable Growth"],
    mistakes: ["Managing by chaos", "Low case value"],
    icon: BarChart3
  },
  {
    number: 6,
    title: "Care Plans, Day 1 / Day 2 Mastery",
    why: "First impressions are everything.",
    change: "A streamlined process from the first phone call to the first adjustment.",
    skills: ["Case Layout", "No-Tension Payments", "New Patient Flow"],
    mistakes: ["Pressure sales", "Messy office flow"],
    icon: Users
  },
  {
    number: 7,
    title: "Patient Management & Long-Term Clinical Leadership",
    why: "Every patient is different. You need to read them.",
    change: "Build retention systems and lead patients through complete care plans.",
    skills: ["Reading People", "Retention Systems", "Building Trust"],
    mistakes: ["One-size-fits-all", "Ignoring the person"],
    icon: Brain
  },
  {
    number: 8,
    title: "Ownership, Contracts & Scaling",
    why: "Build a clinic that works even when you aren't there.",
    change: "Contracts, associate agreements, and scaling your practice for the long term.",
    skills: ["Contract Mastery", "Future Planning", "Clinic Leadership"],
    mistakes: ["Thinking too small", "No clear exit plan"],
    icon: Target
  }
];

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-brand-cream pb-32">
      <MastermindHeader />

      {/* Header */}
      <section className="pt-28 md:pt-40 pb-16 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight">
            What You&apos;ll Learn
          </h1>
          <p className="text-base md:text-lg text-brand-gray font-medium max-w-2xl mx-auto">
            90 days of live coaching, practical scripts, and real implementation. Here&apos;s the roadmap.
          </p>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section className="px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {weeks.map((week, i) => (
            <EliteCard key={i} className="group p-0 overflow-hidden hover:border-brand-orange/20 transition-all border-brand-navy/5">
              <div className="flex flex-col lg:flex-row">
                {/* Left: Week ID */}
                <div className="lg:w-48 bg-brand-navy p-12 flex flex-col items-center justify-center text-white shrink-0 group-hover:bg-brand-black transition-colors">
                  <span className="text-xs font-black uppercase tracking-widest opacity-40 mb-2">Phase</span>
                  <span className="text-6xl font-black">{week.number}</span>
                </div>

                {/* Right: Content */}
                <div className="flex-1 p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-black text-brand-navy mb-2 tracking-tight group-hover:text-brand-orange transition-colors">
                        {week.title}
                      </h3>
                      <p className="text-brand-orange text-xs font-black uppercase tracking-widest">{week.why}</p>
                    </div>
                    
                    <div className="p-6 bg-brand-cream rounded-2xl border border-brand-navy/5">
                      <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 mb-2">Primary Change</p>
                      <p className="text-sm font-bold text-brand-navy leading-relaxed">{week.change}</p>
                    </div>

                    <div className="flex gap-4">
                      <div className="p-3 bg-brand-navy/5 rounded-xl">
                        <week.icon className="w-5 h-5 text-brand-navy" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Week Mechanism</p>
                        <p className="text-sm font-black text-brand-navy">Live coaching + implementation</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" /> Skills You Unlock
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {week.skills.map(skill => (
                          <span key={skill} className="px-4 py-2 bg-brand-navy/5 rounded-full text-xs font-black text-brand-navy uppercase tracking-widest">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs font-black uppercase tracking-widest text-brand-orange/60 flex items-center gap-2">
                        <AlertIcon className="w-3 h-3" /> Mistakes This Fixes
                      </p>
                      <ul className="space-y-2">
                        {week.mistakes.map(m => (
                          <li key={m} className="flex items-center gap-3 text-xs font-bold text-brand-gray">
                            <span className="text-brand-orange">✕</span> {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </EliteCard>
          ))}
        </div>
      </section>

      {/* Preview Note */}
      <section className="px-5 md:px-8 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-brand-gray font-medium">
            Want to see a sample lesson before applying?{" "}
            <a href="mailto:support@neurochiromastermind.com" className="text-brand-orange hover:text-brand-navy underline transition-colors">
              Email us
            </a>{" "}
            and we&apos;ll send you a preview.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="pt-16 md:pt-24 pb-20 px-5 md:px-8">
        <div className="max-w-4xl mx-auto bg-brand-navy rounded-2xl p-8 md:p-12 text-center text-white space-y-6">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">Ready to Apply?</h2>
          <p className="text-base text-white/50 font-medium max-w-xl mx-auto">
            If the 90-day roadmap looks like what you need, take the next step.
          </p>
          <Link href="/apply">
            <BrandButton variant="accent" size="lg" className="group py-5 px-10">
              Apply Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </BrandButton>
          </Link>
        </div>
      </section>
    </div>
  );
}

function AlertIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}
