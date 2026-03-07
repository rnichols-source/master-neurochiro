import { createClient } from "@/lib/supabase/server";
import { LiveHero } from "./components/hero";
import { LivePricing } from "./components/pricing";
import Link from "next/link";
import { Shield, Brain, Zap, Target, ShieldCheck, GraduationCap, UserCheck, Users, Quote } from "lucide-react";
import { BrandButton } from "@/components/ui/elite-ui";

export default async function NeuroChiroLivePage() {
  const supabase = await createClient();
  
  const { data: event } = await supabase
    .from("events")
    .select("*, ticket_types(*)")
    .eq("slug", "adelaide-2026")
    .single();

  return (
    <div className="min-h-screen bg-brand-navy selection:bg-brand-orange selection:text-white">
      {/* Navbar (Same as existing) */}
      <nav className="fixed top-0 w-full z-50 px-8 py-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-brand-navy shadow-2xl group-hover:scale-110 transition-transform">N</div>
            <span className="font-black text-white tracking-[0.2em] uppercase text-xs hidden md:block">NeuroChiro</span>
          </Link>
          <div className="flex items-center gap-10">
            <Link href="/curriculum" className="hidden md:block text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Curriculum</Link>
            <Link href="/login">
              <button className="px-6 py-2.5 rounded-full border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <LiveHero />

        {/* 2. Who This Event Is For */}
        <section className="section-padding bg-white/5 relative">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20 space-y-4">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Audience</p>
              <h2 className="text-display text-white">Who This <br /><span className="text-white/20">Is Designed For.</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Students", icon: GraduationCap, desc: "Bridge the gap between academic theory and clinical reality. Gain the certainty school doesn't provide." },
                { title: "New Graduates", icon: UserCheck, desc: "Accelerate your first 2 years. Skip the trial-and-error and install the systems that build high-value practices." },
                { title: "Practising Doctors", icon: Users, desc: "Refine your clinical neurology and upgrade your practice OS. Move from 'technician' to 'Architect'." }
              ].map((item, i) => (
                <div key={i} className="glass-panel p-10 rounded-[3rem] group hover:border-brand-orange/30 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-8 group-hover:bg-brand-orange/10 transition-colors">
                    <item.icon className="w-8 h-8 text-brand-orange" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
                  <p className="text-white/50 text-lg leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. What You Will Learn (The Framework) */}
        <section className="section-padding bg-brand-navy">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-8">
                <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Framework</p>
                <h2 className="text-6xl font-black text-white tracking-tighter leading-none uppercase">Experience The <br /><span className="text-white/30">Mastermind Live.</span></h2>
                <p className="text-xl text-white/50 leading-relaxed font-medium">
                  NeuroChiro Live is the physical manifestation of our 8-week framework. We take the entire ecosystem and deliver it across two high-intensity days of implementation and clinical mastery.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["Identity", "Neurology", "Communication", "Philosophy", "Business", "Mastery", "EQ", "Strategy"].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-brand-orange/20 transition-all">
                    <div className="text-[10px] font-black text-brand-orange mb-2">0{i+1}</div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">{item}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Event Schedule */}
        <section className="section-padding bg-white px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24 space-y-4">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Schedule</p>
              <h2 className="text-7xl font-black text-brand-navy tracking-tighter leading-[0.9] uppercase">2 Days of <br /><span className="text-brand-navy/30">Transformation.</span></h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {[
                { day: "Day 1", title: "Foundations", topics: ["Identity of a Nervous System Doctor", "Chiropractic Neurology for Real Practice", "Communication Mastery", "Modern Chiropractic Philosophy"] },
                { day: "Day 2", title: "Advanced", topics: ["Business: What School Never Taught You", "Care Plans and Day 1 / Day 2 Mastery", "Emotional Intelligence & Psychosomatic Patterns", "Career Strategy and Becoming a NeuroChiro Doctor"] }
              ].map((item, i) => (
                <div key={i} className="space-y-12">
                  <div className="flex items-center gap-6">
                    <div className="text-8xl font-black text-brand-navy/10 tracking-tighter leading-none">{item.day}</div>
                    <div className="h-px flex-1 bg-brand-navy/5" />
                  </div>
                  <h3 className="text-4xl font-black text-brand-navy tracking-tight leading-none uppercase">{item.title}</h3>
                  <div className="space-y-6">
                    {item.topics.map((topic, j) => (
                      <div key={j} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-full border border-brand-navy/10 flex items-center justify-center font-bold text-xs text-brand-navy group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-all">{j + 1}</div>
                        <p className="text-lg font-bold text-brand-navy/60 group-hover:text-brand-navy transition-colors pt-2">{topic}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Speaker Section */}
        <section className="section-padding bg-brand-navy relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="aspect-[4/5] bg-white/5 rounded-[4rem] flex items-center justify-center border border-white/5">
                <span className="text-white/10 font-black text-4xl uppercase tracking-[1em] rotate-90 whitespace-nowrap">Dr. Raymond Nichols</span>
              </div>
              <div className="space-y-10">
                <div className="space-y-4">
                  <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Speaker</p>
                  <h2 className="text-7xl font-black text-white tracking-tighter leading-none uppercase">Dr. Raymond <br />Nichols.</h2>
                </div>
                <div className="space-y-6 text-xl text-white/50 leading-relaxed font-medium">
                  <p>Dr. Raymond Nichols is the founder of NeuroChiro and a leading voice in Nervous-System-First Chiropractic.</p>
                  <p>His mission is to reconstruct the chiropractic profession by installing clinical certainty and objective communication into the hands of dedicated doctors.</p>
                </div>
                <div className="pt-8 border-t border-white/10">
                   <Quote className="w-12 h-12 text-brand-orange mb-4 opacity-20" />
                   <p className="text-2xl font-black text-white tracking-tight leading-tight italic">"Clinical certainty is the foundation of every high-value practice."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <LivePricing event={event} />

        {/* 7. Limited Seating Callout */}
        <section className="section-padding bg-brand-orange/10 text-center px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <ShieldCheck className="w-16 h-16 text-brand-orange mx-auto opacity-30" />
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase">Limited Seating <br /><span className="text-brand-orange">Only 50 Seats.</span></h2>
            <p className="text-xl text-white/50 font-medium">We maintain a strict limit to ensure every attendee receives direct interaction and high-value strategic feedback.</p>
          </div>
        </section>

        {/* 8. Event Location */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-8 text-center space-y-12">
            <div className="space-y-4">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Location</p>
              <h2 className="text-7xl font-black text-brand-navy tracking-tighter leading-none uppercase">Adelaide, <br />Australia.</h2>
            </div>
            <div className="aspect-[21/9] bg-brand-navy/5 rounded-[4rem] flex items-center justify-center border border-brand-navy/5">
                <p className="text-brand-navy/20 font-black text-4xl uppercase tracking-widest">Map Placeholder</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 bg-brand-navy text-center">
        <div className="max-w-7xl mx-auto px-8 space-y-8">
           <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-black text-brand-navy">N</div>
              <span className="font-bold text-white tracking-widest uppercase text-[10px]">NeuroChiro Intelligence</span>
            </div>
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-loose">
              © 2026 NeuroChiro. Adelaide, Australia.
            </p>
        </div>
      </footer>
    </div>
  );
}
