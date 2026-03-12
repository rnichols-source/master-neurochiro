import { MastermindHeader } from "@/components/layout/mastermind-header";
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
    title: "Who You Are as a Doctor",
    why: "If you don't value yourself, patients won't either.",
    change: "Stop acting like a technician and start acting like the expert in the room.",
    skills: ["Confident Presence", "Removing Neediness", "Leadership Skills"],
    mistakes: ["Trying to convince people", "Focusing on symptoms only"],
    icon: Brain
  },
  {
    number: 2,
    title: "Explaining Neurology Simply",
    why: "If they don't understand it, they won't buy it.",
    change: "Learn how to talk about scans and nerves so patients actually get it.",
    skills: ["Simple Scan Talk", "Reading HRV Simply", "The Patient-First Method"],
    mistakes: ["Giving too much data", "Using boring education"],
    icon: Zap
  },
  {
    number: 3,
    title: "Mastering the Recommendation",
    why: "Stop being afraid to ask for the commitment.",
    change: "A better way to do your Report of Findings that feels natural.",
    skills: ["The Script System", "Handling Money Talks", "Confident Close"],
    mistakes: ["Weak recommendations", "Feeling awkward"],
    icon: MessageSquare
  },
  {
    number: 4,
    title: "The Modern Philosophy",
    why: "You need a powerful way to explain what we do.",
    change: "How to talk about subluxation in a way that makes sense in 2026.",
    skills: ["Modern Framing", "Science + Philosophy", "Clear Explanations"],
    mistakes: ["Sounding outdated", "Avoiding the truth"],
    icon: Target
  },
  {
    number: 5,
    title: "The Business Numbers",
    why: "Practice should give you freedom, not stress.",
    change: "Get control of your money, your overhead, and your growth.",
    skills: ["Money Mapping", "Knowing Your Value", "Predictable Growth"],
    mistakes: ["Managing by chaos", "Low case value"],
    icon: BarChart3
  },
  {
    number: 6,
    title: "The Day 1 & Day 2 Process",
    why: "First impressions are everything.",
    change: "A streamlined process from the first phone call to the first adjustment.",
    skills: ["Case Layout", "No-Tension Payments", "New Patient Flow"],
    mistakes: ["Pressure sales", "Messy office flow"],
    icon: Users
  },
  {
    number: 7,
    title: "Patient Behavior & Population Thinking",
    why: "Life interferes with routines. You need a system that absorbs variability.",
    change: "Shift from emotional reactivity to structural management and containment.",
    skills: ["Population Thinking", "The Containment Protocol", "Identity Detachment"],
    mistakes: ["Taking missed visits personally", "Reacting to symptoms", "Chasing motivation"],
    icon: Brain
  },
  {
    number: 8,
    title: "The Long-Term Strategy",
    why: "Build a clinic that works even when you aren't there.",
    change: "Create a brand that people know, trust, and refer to.",
    skills: ["Authority Branding", "Future Planning", "Clinic Leadership"],
    mistakes: ["Thinking too small", "No clear exit plan"],
    icon: Target
  }
];

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-brand-cream pb-32">
      <MastermindHeader />

      {/* Header */}
      <section className="pt-48 pb-20 px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The 8-Week Roadmap</p>
          <h1 className="text-7xl md:text-8xl font-black text-brand-navy tracking-tighter leading-none">
            What You'll Learn <br />
            <span className="text-brand-orange">Inside the Program.</span>
          </h1>
          <p className="text-xl text-brand-gray font-medium max-w-2xl mx-auto">
            This isn't a course you just watch. It's a step-by-step plan 
            we install into your clinic over 8 weeks to get you real results.
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
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Phase</span>
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
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-2">Primary Change</p>
                      <p className="text-sm font-bold text-brand-navy leading-relaxed">{week.change}</p>
                    </div>

                    <div className="flex gap-4">
                      <div className="p-3 bg-brand-navy/5 rounded-xl">
                        <week.icon className="w-5 h-5 text-brand-navy" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Week Mechanism</p>
                        <p className="text-sm font-black text-brand-navy">Implementation Proof required</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" /> Skills You Unlock
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {week.skills.map(skill => (
                          <span key={skill} className="px-4 py-2 bg-brand-navy/5 rounded-full text-[10px] font-black text-brand-navy uppercase tracking-widest">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange/60 flex items-center gap-2">
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

      {/* Footer CTA */}
      <section className="pt-32 pb-20 px-8 text-center">
        <EliteCard className="max-w-4xl mx-auto p-16 bg-brand-navy text-white border-none relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange via-white to-brand-orange opacity-20" />
          <div className="space-y-8 relative z-10">
            <h2 className="text-5xl font-black tracking-tight leading-none">Ready to Install the Operating System?</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto font-medium">
              We only accept doctors who are ready for the work. If you have reviewed the 
              8-week roadmap and are ready to shift your identity, apply below.
            </p>
            <Link href="/apply" className="block pt-4">
              <BrandButton variant="accent" size="lg" className="group py-6 px-12">
                Submit Your Application <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </Link>
          </div>
        </EliteCard>
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
