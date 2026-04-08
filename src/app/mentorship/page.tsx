import { MastermindHeader } from "@/components/layout/mastermind-header";
import { BrandButton, EliteCard } from "@/components/ui/elite-ui";
import { SEOFooter } from "@/components/layout/seo-footer";
import { 
  ArrowRight, 
  Target, 
  Brain, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Lock,
  Focus,
  Microscope,
  Cpu,
  Star,
  CheckCircle2,
  X,
  Plus,
  Clock,
  Settings,
  Zap,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import StructuredData from "@/components/layout/StructuredData";
import { motion } from "framer-motion";

export const metadata = {
  title: "Private Coaching | The Architecture Room | NeuroChiro",
  description: "Stop performing. Start operating. Elite system installation and private coaching for chiropractors who want scalable growth without the chaos.",
};

export default function MentorshipLandingPage() {
  const options = [
    {
      title: "90-Day Overhaul",
      subtitle: "Fix The Foundation",
      price: "$7,500",
      focus: "Doctors stuck in inconsistency, poor conversions, and weak communication.",
      features: [
        "2 Private Strategy Calls / Month",
        "Full Clinic Audit & Diagnostic",
        "Communication Breakdown (ROF, Day 1-3)",
        "Pricing & Care Plan Structure Fixes",
        "Step-by-Step Implementation Roadmap",
        "Weekly Accountability Tracking"
      ],
      outcome: "Increased conversions, clear operational structure, and absolute confidence in care delivery."
    },
    {
      title: "6-Month Scale",
      subtitle: "Build Systems + Scale",
      price: "$14,000",
      focus: "Clinics with momentum that need better systems for growth without chaos.",
      features: [
        "Everything in the 90-Day Overhaul",
        "Team Structure & Role Optimization",
        "Hiring & Onboarding Systems",
        "Advanced KPI Tracking Systems",
        "Patient Retention Architecture",
        "Monthly Deep-Dive System Audits",
        "Priority Support Access"
      ],
      outcome: "Stable growth, complete team alignment, and predictable monthly revenue."
    },
    {
      title: "12-Month Executive",
      subtitle: "Build A Machine",
      price: "$25K - $40K+",
      focus: "High-level operators with multi-location goals and leadership expansion needs.",
      features: [
        "Deep Executive Strategy Sessions",
        "Long-Term Vision Mapping",
        "Business Architecture Design",
        "Clinic Expansion & Scale Planning",
        "Advanced Financial Structuring",
        "Private High-Touch Access (Red Phone)",
        "In-Person Implementation Days (Optional)"
      ],
      outcome: "A fully scalable business, crystal-clear leadership, and long-term generational stability."
    }
  ];

  const mentorshipSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "NeuroChiro Private Coaching",
    "description": "Elite private coaching and system installation for chiropractic clinics.",
    "provider": {
      "@type": "Person",
      "name": "Dr. Raymond Nichols"
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white pb-20 font-body text-brand-navy">
      <StructuredData data={mentorshipSchema} />
      <MastermindHeader />

      {/* Hero Section */}
      <section className="pt-32 lg:pt-48 pb-24 px-6 lg:px-8 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/10 blur-[150px] rounded-full -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -ml-32 -mb-32" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
            <Settings className="w-4 h-4 text-brand-orange animate-spin-slow" />
            <span className="text-xs font-black uppercase tracking-widest text-white/80">System Installation Experience</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-heading font-black tracking-tighter leading-[0.95] max-w-4xl mx-auto">
            Stop Performing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ff985c]">Start Operating.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 font-medium max-w-3xl mx-auto leading-relaxed">
            This is not theory. This is execution. We help elite chiropractors install real systems, remove emotional decision-making, and build a clinic that runs without constant stress.
          </p>
          
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/apply/mentorship">
              <BrandButton variant="accent" size="lg" className="group px-12 py-6 rounded-2xl shadow-[0_0_40px_rgba(214,104,41,0.3)] hover:shadow-[0_0_60px_rgba(214,104,41,0.5)]">
                Apply for Private Coaching <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </Link>
          </div>
        </div>
      </section>

      {/* What This Fixes */}
      <section className="py-32 px-6 bg-white border-b border-brand-navy/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <p className="text-brand-orange font-black uppercase tracking-widest text-xs">The Diagnostic</p>
            <h2 className="text-5xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">
              Most Practices Are <br />Built on <span className="text-brand-orange">Hustle.</span>
            </h2>
            <div className="space-y-6">
              {[
                "Low conversions because your communication lacks structure.",
                "Inconsistent retention because patients don't understand the plan.",
                "Confusion in care plans leading to awkward financial conversations.",
                "Emotional decision-making instead of data-driven choices.",
                "Overworking and burnout without seeing actual revenue growth."
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-1">
                    <X className="w-3 h-3 text-red-500" />
                  </div>
                  <p className="text-lg font-medium text-brand-gray group-hover:text-brand-navy transition-colors">{item}</p>
                </div>
              ))}
            </div>
          </div>
          
          <EliteCard className="p-12 bg-brand-cream/50 border-brand-navy/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <h3 className="text-3xl font-black mb-8 text-brand-navy tracking-tight">This is what we fix.</h3>
            <p className="text-brand-gray text-lg font-medium leading-relaxed mb-8">
              We don't do "motivational coaching." We install an operating system. We tear down what's broken in your communication, pricing, and flow, and we rebuild it so your clinic functions like a machine.
            </p>
            <div className="p-6 bg-white rounded-2xl border border-brand-navy/5 flex items-center gap-4">
               <ShieldCheck className="w-8 h-8 text-green-500 shrink-0" />
               <p className="font-bold text-brand-navy text-sm uppercase tracking-widest">Predictable Systems = Scalable Growth</p>
            </div>
          </EliteCard>
        </div>
      </section>

      {/* The Architecture Room Offers */}
      <section className="py-32 px-6 bg-brand-cream relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <p className="text-brand-orange font-black uppercase tracking-widest text-xs">The Installation Tiers</p>
            <h2 className="text-5xl md:text-7xl font-black text-brand-navy tracking-tighter leading-none">The Architecture Room.</h2>
            <p className="text-xl text-brand-gray font-medium max-w-2xl mx-auto">Select the level of intervention your practice requires.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {options.map((opt, i) => (
              <EliteCard key={i} className={`p-10 flex flex-col h-full border ${i === 1 ? 'border-brand-orange/30 shadow-[0_20px_60px_-15px_rgba(214,104,41,0.2)] bg-white relative' : 'border-brand-navy/5 bg-white/60 hover:bg-white'}`}>
                {i === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-orange text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
                    Most Common Entry Point
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-3xl font-black text-brand-navy tracking-tight mb-2">{opt.title}</h3>
                  <p className="text-brand-orange font-black uppercase tracking-wider text-xs mb-6">{opt.subtitle}</p>
                  <div className="pb-6 border-b border-brand-navy/10">
                    <p className="text-sm font-medium text-brand-gray italic">"{opt.focus}"</p>
                  </div>
                </div>
                
                <div className="flex-grow space-y-6 mb-10">
                  <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40">What You Get:</p>
                  <ul className="space-y-4">
                    {opt.features.map((f, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${i === 1 ? 'text-brand-orange' : 'text-brand-navy/40'}`} />
                        <span className="font-bold text-brand-navy text-sm leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-8 border-t border-brand-navy/10">
                  <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 mb-2">The Outcome:</p>
                  <p className="text-sm font-medium text-brand-gray mb-8">{opt.outcome}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-brand-navy tracking-tighter">{opt.price}</span>
                  </div>
                </div>
              </EliteCard>
            ))}
          </div>
        </div>
      </section>

      {/* How This Works (Structure) */}
      <section className="py-32 px-6 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 space-y-4">
            <p className="text-brand-orange font-black uppercase tracking-widest text-xs">The Methodology</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">How This Works.</h2>
            <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto">Vague coaching fails. We run on a strict, predictable cadence designed for installation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "01", title: "The Audit", desc: "We tear down your current systems, KPIs, and scripts to find the exact bottlenecks leaking revenue." },
              { num: "02", title: "The Strategy", desc: "We map out a custom blueprint. No guesswork, just specific operational fixes for your clinic." },
              { num: "03", title: "The Cadence", desc: "Bi-weekly strategy sessions. One call for system building, one call for accountability and troubleshooting." },
              { num: "04", title: "The Installation", desc: "You execute between calls. We review your recordings, metrics, and implementations to ensure it sticks." }
            ].map((step, i) => (
              <div key={i} className="p-8 border border-white/10 rounded-[2rem] bg-white/5 hover:bg-white/10 transition-colors relative group">
                <span className="text-6xl font-black text-white/5 absolute top-4 right-4 group-hover:text-brand-orange/20 transition-colors">{step.num}</span>
                <h4 className="text-2xl font-black mb-4 relative z-10">{step.title}</h4>
                <p className="text-white/60 font-medium leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Walk Away With */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <EliteCard className="p-12 bg-brand-navy text-white shadow-2xl rounded-[3rem] border-none">
            <Cpu className="w-12 h-12 text-brand-orange mb-8" />
            <h3 className="text-4xl font-black mb-8 tracking-tighter leading-tight">The Clinic <br />Operating System.</h3>
            <p className="text-lg text-white/60 font-medium leading-relaxed mb-8">
              When our engagement is over, you don't just walk away with "good advice." You walk away with a tangible, functioning machine.
            </p>
            <ul className="space-y-6">
              {[
                "A fully structured, predictable clinic.",
                "Clear, high-converting communication systems.",
                "Predictable patient flow and retention.",
                "Absolute confidence in your pricing and value.",
                "Operational stability that survives without you."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange shrink-0" />
                  <span className="font-bold text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </EliteCard>
          
          <div className="space-y-8">
            <p className="text-brand-orange font-black uppercase tracking-widest text-xs">The Return on Investment</p>
            <h2 className="text-5xl font-black text-brand-navy tracking-tighter leading-tight">
              This is less than the cost of one bad system running for a year.
            </h2>
            <div className="space-y-6 text-xl text-brand-gray font-medium leading-relaxed">
              <p>
                Think about the patients you lose because your Report of Findings isn't dialed in. Think about the staff turnover because you lack clear training systems.
              </p>
              <p>
                The price of this coaching is a fraction of the revenue you are currently leaking every single month due to operational friction.
              </p>
            </div>
            <div className="pt-4">
              <div className="p-6 border-l-4 border-brand-orange bg-brand-cream/50">
                <p className="font-black text-brand-navy text-lg italic">"We don't cost you money. We locate the money you're already losing and help you keep it."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-24 px-6 bg-brand-cream">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-white p-12 rounded-[3rem] shadow-sm border border-brand-navy/5">
          <div className="w-48 h-48 rounded-full overflow-hidden shrink-0 border-4 border-brand-cream">
            <img src="/founder.jpg" alt="Dr. Raymond Nichols" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <p className="text-brand-orange font-black uppercase tracking-widest text-xs">The Architect</p>
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">Dr. Raymond Nichols</h3>
            <p className="text-brand-gray font-medium leading-relaxed">
              I didn't learn these systems in a textbook. I built them while running a high-volume, nervous-system-focused practice. I know exactly what it feels like to be stuck in the technician role, overwhelmed by the business side. I built the Architecture Room to give you the exact blueprints I used to step out of the chaos and into the CEO role.
            </p>
          </div>
        </div>
      </section>

      {/* Contrast Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="bg-brand-cream/50 p-16 rounded-[3rem] border border-brand-navy/5">
              <h3 className="text-3xl font-black mb-10 flex items-center gap-4 text-brand-navy tracking-tighter">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                This is NOT for you if...
              </h3>
              <ul className="space-y-8">
                {[
                  "You want a quick marketing fix to get cheap leads.",
                  "You are looking for motivation instead of mechanics.",
                  "You avoid structure and prefer to 'wing it' every day.",
                  "You won't do the work between our calls to implement."
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 items-start text-lg font-medium text-brand-gray">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-3 flex-shrink-0" /> 
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
           </div>
           <div className="bg-brand-navy p-16 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[80px] rounded-full" />
              <h3 className="text-3xl font-black mb-10 flex items-center gap-4 tracking-tighter relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange" />
                </div>
                This IS for you if...
              </h3>
              <ul className="space-y-8 relative z-10">
                {[
                  "You want absolute clarity on how your clinic should run.",
                  "You crave structure and predictable operating systems.",
                  "You want scalable growth without adding to your daily chaos.",
                  "You are an operator ready to do the work to build a machine."
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 items-start text-lg font-medium text-white/70">
                    <Plus className="w-5 h-5 text-brand-orange mt-1 flex-shrink-0" /> 
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 bg-brand-orange text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-black/5" />
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
           <div className="inline-block px-4 py-1 bg-white/10 border border-white/20 rounded-lg text-xs font-black uppercase tracking-widest mb-4">Take The Next Step</div>
           <h2 className="text-5xl md:text-7xl font-heading font-black leading-none tracking-tighter">
             Ready to Build <br />Your Machine?
           </h2>
           <p className="text-2xl font-medium text-white/90 leading-relaxed max-w-2xl mx-auto">
             Application required. We only work with a select number of clinics at a time to ensure maximum implementation.
           </p>
           <div className="pt-8">
             <Link href="/apply/mentorship">
               <button className="bg-brand-navy text-white px-16 py-8 rounded-[2rem] font-black uppercase tracking-wider text-xl shadow-[0_20px_50px_-10px_rgba(21,32,43,0.5)] hover:bg-brand-black transition-all hover:-translate-y-1 active:scale-95 group">
                 Apply for Private Coaching <ArrowRight className="inline-block ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
               </button>
             </Link>
           </div>
           <p className="text-xs font-black uppercase tracking-widest text-white/50 mt-8">
             Strictly Limited Availability.
           </p>
        </div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 blur-3xl rounded-full" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-black/10 blur-3xl rounded-full" />
      </section>

      {/* Next Step */}
      <section className="py-16 px-5 md:px-8 bg-brand-cream">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-sm font-bold text-brand-gray">Already a Mastermind graduate?</p>
          <Link href="/council">
            <BrandButton variant="outline" className="py-4 px-8">
              Explore The Council <ArrowRight className="ml-2 w-4 h-4" />
            </BrandButton>
          </Link>
        </div>
      </section>

      <SEOFooter />
    </div>
  );
}
