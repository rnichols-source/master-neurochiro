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
  Star
} from "lucide-react";
import Link from "next/link";
import StructuredData from "@/components/layout/StructuredData";

export const metadata = {
  title: "Private 1-on-1 Help | The Architecture Room with Dr. Raymond Nichols",
  description: "Direct 1-on-1 help for your practice. Master leadership, certainty in your plan, and steady growth.",
};

export default function MentorshipLandingPage() {
  const transformation = [
    { from: "Reactive Doctor", to: "Practice Leader", icon: Brain },
    { from: "Soft Pricing", to: "Certainty in Your Plan", icon: ShieldCheck },
    { from: "Retention Drift", to: "Steady Growth", icon: TrendingUp },
    { from: "Motivation-Based", to: "Easy Systems", icon: Cpu }
  ];

  const options = [
    {
      title: "90-Day Overhaul",
      subtitle: "The Basic Systems",
      price: "$7,500",
      focus: "Communication & The Report of Findings Process",
      features: ["2 Private Calls / Mo", "Initial Clinic Audit", "Communication Audit", "Voice Memo Support (M-Th)"]
    },
    {
      title: "6-Month Scale",
      subtitle: "Building Your Team",
      price: "$14,000",
      focus: "Team Growth & Automatic Systems",
      features: ["2 Private Calls / Mo", "Quarterly System Audits", "Team Training Guides", "Priority Voice Support"]
    },
    {
      title: "12-Month Executive",
      subtitle: "Long-term Vision",
      price: "Invite Only",
      focus: "Opening More Offices & High-level Strategy",
      features: ["High-level Strategy", "2 Private Intensives", "Vision Mapping", "Private Red-Phone Access"]
    }
  ];

  const mentorshipSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "NeuroChiro Private Mentorship",
    "description": "Private 1-on-1 help for your practice by Dr. Raymond Nichols.",
    "provider": {
      "@type": "Person",
      "name": "Dr. Raymond Nichols"
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-orange selection:text-white">
      <StructuredData data={mentorshipSchema} />
      <MastermindHeader />

      {/* Hero Section */}
      <section className="pt-32 lg:pt-48 pb-20 lg:pb-32 px-6 lg:px-8 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-orange rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
            <Star className="w-3 h-3 text-brand-orange fill-brand-orange" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Strictly Limited to 8 Active Clients</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] max-w-5xl mx-auto">
            Stop Performing. <br />
            <span className="text-brand-orange">Start Operating.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto">
            Direct 1-on-1 help for your practice for the Elite DC who refuses to live in the "Self-Employed Trap."
          </p>
          <div className="pt-8">
            <Link href="/apply/mentorship">
              <BrandButton variant="accent" size="lg" className="group px-12 py-6">
                Apply for Mentorship <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </Link>
          </div>
        </div>
      </section>

      {/* The Transformation */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Shift</p>
            <h2 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">The Architecture Room.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transformation.map((item, i) => (
              <EliteCard key={i} className="p-8 border-brand-navy/5 text-center space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center mx-auto">
                  <item.icon className="w-6 h-6 text-brand-navy" />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-brand-navy/20 uppercase tracking-widest line-through">{item.from}</p>
                  <p className="text-xl font-black text-brand-navy">{item.to}</p>
                </div>
              </EliteCard>
            ))}
          </div>
        </div>
      </section>

      {/* The ROI Logic */}
      <section className="py-24 px-6 bg-brand-cream/50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter leading-none">
              A Machine that Works <br /><span className="text-brand-orange">While You Don't.</span>
            </h2>
            <div className="space-y-6">
              <p className="text-brand-gray text-lg font-medium leading-relaxed">
                Most doctors try to scale by working more hours or seeing more patients. We scale by fixing the machine.
              </p>
              <div className="p-8 bg-brand-navy rounded-[2rem] text-white space-y-6">
                 <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Better Acceptance</span>
                    <span className="text-2xl font-black text-brand-orange">+25% Acceptance</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Patients Staying Longer</span>
                    <span className="text-2xl font-black text-brand-orange">+15 PVA</span>
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Extra Money Each Year</span>
                    <span className="text-2xl font-black text-green-400">+$120k / Year</span>
                 </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
             {options.map((opt, i) => (
               <EliteCard key={i} className="bg-white border-brand-navy/5 p-8 group hover:border-brand-orange/40 transition-all">
                  <div className="flex justify-between items-start mb-6">
                     <div>
                        <h3 className="text-2xl font-black text-brand-navy uppercase leading-none">{opt.title}</h3>
                        <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest mt-2">{opt.subtitle}</p>
                     </div>
                     <span className="text-lg font-black text-brand-navy">{opt.price}</span>
                  </div>
                  <p className="text-sm text-brand-gray font-medium mb-6">Primary Focus: {opt.focus}</p>
                  <div className="flex flex-wrap gap-3">
                     {opt.features.map((f, j) => (
                       <span key={j} className="px-3 py-1 bg-brand-navy/5 rounded-lg text-[9px] font-bold text-brand-navy uppercase tracking-widest">{f}</span>
                     ))}
                  </div>
               </EliteCard>
             ))}
          </div>
        </div>
      </section>

      {/* The Methodology */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <Microscope className="w-8 h-8 text-brand-orange mx-auto" />
              <h4 className="text-xl font-black text-brand-navy uppercase">Clinic Audit</h4>
              <p className="text-xs text-brand-gray font-medium leading-relaxed">Checking your current numbers and communication to find the specific leaks.</p>
            </div>
            <div className="space-y-4">
              <Focus className="w-8 h-8 text-brand-orange mx-auto" />
              <h4 className="text-xl font-black text-brand-navy uppercase">The Fix</h4>
              <p className="text-xs text-brand-gray font-medium leading-relaxed">Fixing your Report of Findings, your prices, and your daily procedures.</p>
            </div>
            <div className="space-y-4">
              <Target className="w-8 h-8 text-brand-orange mx-auto" />
              <h4 className="text-xl font-black text-brand-navy uppercase">Steady Growth</h4>
              <p className="text-xs text-brand-gray font-medium leading-relaxed">Setting up systems so your results stay steady and growth is easy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-brand-navy text-white text-center">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none italic">
            "You don't need more patients. You need a better machine to put them in."
          </h2>
          <div className="flex flex-col items-center gap-6">
            <Link href="/apply/mentorship">
              <BrandButton variant="accent" size="lg">Apply for Entry</BrandButton>
            </Link>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Mastermind Completion Required for Entry</p>
          </div>
        </div>
      </section>

      <SEOFooter />
    </div>
  );
}
