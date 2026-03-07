import { PremiumHero } from "@/components/marketing/premium-hero";
import { EcosystemGrid } from "@/components/marketing/ecosystem-grid";
import { ArrowRight, CheckCircle2, Shield, Brain, Zap, Target } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-brand-orange selection:text-white">
      {/* Navigation (Transparent/Premium) */}
      <nav className="fixed top-0 w-full z-50 px-8 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-brand-navy shadow-2xl group-hover:scale-110 transition-transform">N</div>
            <span className="font-black text-white tracking-[0.2em] uppercase text-xs hidden md:block">NeuroChiro</span>
          </Link>
          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest text-white/40">
              <Link href="/curriculum" className="hover:text-white transition-colors">Curriculum</Link>
              <Link href="/case-studies" className="hover:text-white transition-colors">Evidence</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Membership</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="px-6 py-2.5 rounded-full border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all">
                Login
              </Link>
              <Link href="/apply">
                <button className="px-6 py-2.5 rounded-full bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all shadow-lg shadow-brand-orange/20">
                  Join
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 1. HERO - The Movement */}
      <PremiumHero />

      {/* 2. THE PROBLEM - Why Chiropractic Needs Evolution */}
      <section className="section-padding relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Divergence</p>
              <h2 className="text-display text-white">
                The Model <br />
                <span className="text-white/20">Is Fractured.</span>
              </h2>
              <div className="w-20 h-1 bg-brand-orange/20 rounded-full" />
            </div>
            <div className="space-y-8 text-xl text-white/50 font-medium leading-relaxed">
              <p>
                Chiropractic has a branding problem. We drifted from the science of neurology into pain relief, sales scripts, and technician-level thinking.
              </p>
              <p>
                The world doesn't need more "back crackers" or persuasive salesmen. It needs <span className="text-white">Nervous System Architects</span> who command clinical certainty.
              </p>
              <p>
                NeuroChiro is the bridge back to truth. We provide the intelligence, the communication systems, and the business logic to build a practice that leads the profession.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE NEUROCHIRO MODEL (Bento Grid) */}
      <section className="section-padding bg-gradient-to-b from-transparent via-slate-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-8 mb-20 text-center space-y-4">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Infrastructure</p>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">Everything You Need. <br /><span className="text-white/40">Nothing You Don't.</span></h2>
        </div>
        <EcosystemGrid />
      </section>

      {/* 4. PLATFORM ECOSYSTEM - Feature Highlight */}
      <section className="section-padding px-8">
        <div className="max-w-7xl mx-auto glass-panel rounded-[4rem] p-12 md:p-24 relative overflow-hidden group">
          {/* Animated Glow */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[120px] -mr-40 -mt-40 group-hover:bg-brand-orange/10 transition-colors duration-1000" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                Clinical Certainty <br />
                <span className="text-gradient">Is The Ultimate Marketing.</span>
              </h2>
              <p className="text-xl text-white/50 font-medium max-w-xl leading-relaxed">
                When you know exactly what is happening in the nervous system, you don't have to "sell" care. You just explain objective findings.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Objective Neurology", icon: Brain },
                  { title: "No-Pressure ROF", icon: Zap },
                  { title: "Result-Based Retention", icon: Shield },
                  { title: "High-Value Acceptance", icon: Target }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover/item:border-brand-orange/50 transition-all">
                      <item.icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="text-white font-bold text-sm tracking-tight">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
               {/* Visual placeholder for animated diagram */}
               <div className="aspect-square bg-white/5 rounded-full border border-white/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 to-transparent animate-pulse" />
                  <div className="w-3/4 h-3/4 border border-brand-orange/20 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="w-1/2 h-1/2 border border-brand-orange/10 rounded-full absolute animate-[spin_15s_linear_infinite_reverse]" />
                  <Shield className="w-20 h-20 text-brand-orange opacity-20" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA - The Invitation */}
      <section className="section-padding text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto px-8 space-y-12 relative z-10">
          <Shield className="w-20 h-20 text-white/10 mx-auto" />
          <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter">
            Join the <span className="text-brand-orange">1%</span>.
          </h2>
          <p className="text-2xl text-white/40 font-medium leading-relaxed">
            We are accepting applications for the next cohort. <br />
            15 Spots available for absolute focus.
          </p>
          <div className="pt-8">
            <Link href="/apply">
              <button className="px-16 py-8 bg-brand-orange text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all hover:scale-105 shadow-[0_0_60px_-15px_rgba(249,115,22,0.6)] group">
                Apply for Admission <ArrowRight className="inline-block ml-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-black text-brand-navy">N</div>
              <span className="font-bold text-white tracking-widest uppercase text-[10px]">NeuroChiro</span>
            </div>
            
            <div className="flex gap-12 text-[10px] font-black text-white/30 uppercase tracking-widest">
              <Link href="#" className="hover:text-brand-orange transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-brand-orange transition-colors">Terms</Link>
              <Link href="/login" className="hover:text-brand-orange transition-colors">Dashboard</Link>
            </div>

            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
              © 2026 NeuroChiro Intelligence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
