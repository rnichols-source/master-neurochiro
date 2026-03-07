"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  GraduationCap, 
  UserCheck, 
  Users, 
  Quote, 
  Calendar, 
  MapPin, 
  ArrowRight,
  CheckCircle2,
  Star,
  Loader2
} from "lucide-react";
import { BrandButton } from "@/components/ui/elite-ui";
import { motion } from "framer-motion";
import { createEventCheckout } from "@/app/actions/event-actions";

const pricingContent = [
  {
    category: "student",
    label: "Students",
    standard: { includes: ["2-Day Curriculum", "Resource Kit", "Networking Events"] },
    innerCircle: { includes: ["Priority Seating", "Small Group Q&A", "Advanced Strategy Kit", "Early Access"] }
  },
  {
    category: "new_grad",
    label: "New Graduates",
    standard: { includes: ["2-Day Curriculum", "Resource Kit", "Networking Events", "Implementation Guide"] },
    innerCircle: { includes: ["Priority Seating", "Small Group Q&A", "Private Reception", "Direct Feedback"] }
  },
  {
    category: "practitioner",
    label: "Practicing Chiropractors",
    standard: { includes: ["2-Day Curriculum", "Advanced Resource Kit", "Clinic Systems Suite"] },
    innerCircle: { includes: ["Priority Seating", "Small Group Q&A", "Private Lunch", "Scale Strategy Review"] }
  }
];

export default function NeuroChiroLivePage() {
  const [event, setEvent] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("practitioner");
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("events")
        .select("*, ticket_types(*)")
        .eq("slug", "adelaide-2026")
        .single();
      setEvent(data);
    };
    fetchEvent();
  }, []);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTicketData = (tier: string) => {
    return event?.ticket_types?.find((t: any) => t.category === selectedCategory && t.tier === tier);
  };

  const handleCheckout = async (tier: string) => {
    const ticket = getTicketData(tier);
    if (!ticket) return;

    // If you have a direct Stripe Payment Link, use it!
    if (ticket.payment_link) {
      window.location.href = ticket.payment_link;
      return;
    }

    // Otherwise, use the dynamic system
    setLoading(tier);
    try {
      const { url } = await createEventCheckout({
        eventId: event.id,
        ticketTypeId: ticket.id,
        category: selectedCategory,
        tier: tier,
      });
      window.location.href = url;
    } catch (err: any) {
      alert(err.message || "Failed to initiate checkout");
    } finally {
      setLoading(null);
    }
  };

  const currentContent = pricingContent.find(t => t.category === selectedCategory)!;
  const standardTicket = getTicketData("standard");
  const innerCircleTicket = getTicketData("inner_circle");

  return (
    <div className="min-h-screen bg-brand-navy selection:bg-brand-orange selection:text-white overflow-x-hidden">
      {/* Navbar */}
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
        {/* HERO */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px] opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">Live Immersion Event</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
            >
              NeuroChiro <br />
              <span className="text-gradient uppercase">Live.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/50 font-medium max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              A 2-Day Immersion into Nervous System Chiropractic. <br />
              Experience the Mastermind framework live and in-person.
            </motion.p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-orange" />
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Location</p>
                  <p className="text-sm font-bold text-white">Adelaide, Australia</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-brand-orange" />
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Dates</p>
                  <p className="text-sm font-bold text-white">May 29 – May 30, 2026</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <BrandButton variant="accent" size="lg" className="px-12 py-8 text-lg rounded-full" onClick={scrollToPricing}>
                Reserve Your Seat <ArrowRight className="ml-3 w-5 h-5" />
              </BrandButton>
              <button onClick={scrollToPricing} className="text-white/40 hover:text-white font-black uppercase tracking-widest text-xs transition-colors">
                See Pricing
              </button>
            </div>
          </div>
        </section>

        {/* WHO IT IS FOR */}
        <section className="section-padding bg-white/5 relative">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20 space-y-4 text-center md:text-left">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Audience</p>
              <h2 className="text-5xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter">Who This <br /><span className="text-white/20">Is Designed For.</span></h2>
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

        {/* SCHEDULE */}
        <section className="section-padding bg-white px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24 space-y-4">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Schedule</p>
              <h2 className="text-6xl md:text-8xl font-black text-brand-navy tracking-tighter leading-[0.9] uppercase">2 Days of <br /><span className="text-brand-navy/30">Transformation.</span></h2>
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

        {/* PRICING */}
        <section id="pricing" className="section-padding bg-brand-navy relative overflow-hidden px-8">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 space-y-4">
              <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Investment</p>
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">Secure Your Seat.</h2>
              <p className="text-xl text-white/40 font-medium uppercase tracking-widest">Limited seating available.</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
              {pricingContent.map((t) => (
                <button
                  key={t.category}
                  onClick={() => setSelectedCategory(t.category)}
                  className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    selectedCategory === t.category 
                    ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20" 
                    : "bg-white/5 text-white/40 hover:bg-white/10"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {standardTicket && (
                <div className="glass-panel p-12 rounded-[3rem] border-white/5 flex flex-col">
                  <div className="flex items-center gap-3 mb-8">
                    <ShieldCheck className="w-6 h-6 text-brand-orange" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Standard Access</span>
                  </div>
                  <div className="mb-12">
                     <span className="text-8xl font-black text-white tracking-tighter">${standardTicket.price}</span>
                     <span className="text-xl font-bold text-white/30 ml-2">AUD</span>
                  </div>
                  <div className="space-y-4 mb-12 flex-1">
                    {currentContent.standard.includes.map((inc, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange/50" />
                        <span className="text-sm font-bold text-white/60">{inc}</span>
                      </div>
                    ))}
                  </div>
                  <BrandButton 
                    variant="outline" 
                    className="w-full border-white/10 text-white hover:bg-white/5 py-6 rounded-2xl" 
                    onClick={() => handleCheckout("standard")}
                    disabled={!!loading}
                  >
                    {loading === "standard" ? <Loader2 className="animate-spin" /> : "Select Standard"}
                  </BrandButton>
                </div>
              )}

              {innerCircleTicket && (
                <div className="glass-panel p-12 rounded-[3rem] border-brand-orange/30 bg-gradient-to-br from-brand-orange/10 to-transparent flex flex-col relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg shadow-brand-orange/30 whitespace-nowrap">
                    Highly Limited
                  </div>
                  <div className="flex items-center gap-3 mb-8">
                    <Star className="w-6 h-6 text-brand-orange" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Inner Circle</span>
                  </div>
                  <div className="mb-12">
                     <span className="text-8xl font-black text-white tracking-tighter">${innerCircleTicket.price}</span>
                     <span className="text-xl font-bold text-white/30 ml-2">AUD</span>
                  </div>
                  <div className="space-y-4 mb-12 flex-1">
                    {currentContent.innerCircle.includes.map((inc, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                        <span className="text-sm font-bold text-white">{inc}</span>
                      </div>
                    ))}
                  </div>
                  <BrandButton 
                    variant="accent" 
                    className="w-full py-6 rounded-2xl" 
                    onClick={() => handleCheckout("inner_circle")}
                    disabled={!!loading}
                  >
                    {loading === "inner_circle" ? <Loader2 className="animate-spin" /> : "Select Inner Circle"}
                  </BrandButton>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SPEAKER */}
        <section className="section-padding bg-brand-navy relative overflow-hidden px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="aspect-[4/5] bg-white/5 rounded-[4rem] flex items-center justify-center border border-white/5 relative group overflow-hidden">
                <img 
                  src="/dr-raymond.jpg" 
                  alt="Dr. Raymond Nichols" 
                  className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-700" />
              </div>
              <div className="space-y-10">
                <div className="space-y-4">
                  <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Speaker</p>
                  <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">Dr. Raymond <br />Nichols.</h2>
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
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 bg-brand-navy text-center px-8">
        <div className="max-w-7xl mx-auto space-y-8">
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
