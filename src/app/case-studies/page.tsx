"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  TrendingUp, 
  Users, 
  Target, 
  ArrowUpRight, 
  Quote, 
  Play,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const cases = [
  {
    doctor: "Dr. Sarah Miller",
    location: "Austin, TX",
    transformation: "From $35k to $92k monthly",
    quote: "I was a technician. Now I am the authority. My recommendations are no longer negotiated.",
    metrics: [
      { label: "Revenue Growth", val: "162%" },
      { label: "Care Plan Accept.", val: "88%" },
      { label: "NP Volume", val: "+45%" },
    ],
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80"
  },
  {
    doctor: "Dr. James Chen",
    location: "Vancouver, BC",
    transformation: "3-Day Work Week Established",
    quote: "The OS gave me the math to my freedom. We hit our highest revenue ever while I spent more time with family.",
    metrics: [
      { label: "Time Reclaimed", val: "12h/wk" },
      { label: "Collections", val: "$65k" },
      { label: "Team Efficiency", val: "High" },
    ],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80"
  },
  {
    doctor: "Dr. Marcus Thorne",
    location: "Chicago, IL",
    transformation: "Clinical Certainty Peak",
    quote: "The neurology was the missing piece. I don't convince anymore—I explain, and they commit.",
    metrics: [
      { label: "Referral Rate", val: "42%" },
      { label: "Patient Retention", val: "94%" },
      { label: "Case Value", val: "+$1.2k" },
    ],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80"
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-brand-cream pb-32">
      <MastermindHeader />

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8 text-center space-y-6">
        <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Real Outcomes</p>
        <h1 className="text-7xl font-black text-brand-navy tracking-tighter leading-none">Evidence of Identity.</h1>
        <p className="text-brand-gray text-xl font-medium max-w-2xl mx-auto">
          These aren't just testimonials. They are the verified results 
          of doctors who installed the NeuroChiro Operating System.
        </p>
      </section>

      {/* Results Feed */}
      <section className="px-8 max-w-7xl mx-auto space-y-20">
        {cases.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            {/* Image & Video Trigger */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-brand-orange/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <EliteCard className="p-0 overflow-hidden border-brand-navy/5 shadow-2xl rounded-[2.5rem] relative">
                <div className="aspect-video bg-brand-navy relative">
                  <img src={item.image} alt={item.doctor} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform text-brand-orange">
                      <Play className="w-8 h-8 fill-brand-orange ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-8 left-8">
                     <p className="text-xs font-black text-white/60 uppercase tracking-widest">{item.location}</p>
                     <h3 className="text-3xl font-black text-white">{item.doctor}</h3>
                  </div>
                </div>
              </EliteCard>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="inline-flex p-3 bg-brand-orange/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-brand-orange" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-brand-navy tracking-tight">{item.transformation}</h2>
                <div className="relative">
                  <Quote className="w-12 h-12 text-brand-orange/10 absolute -top-4 -left-4" />
                  <p className="text-xl text-brand-gray font-medium leading-relaxed italic relative z-10 pl-6">
                    {item.quote}
                  </p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-6">
                {item.metrics.map((m, j) => (
                  <div key={j} className="p-6 bg-white rounded-2xl border border-brand-navy/5 elite-shadow text-center">
                    <p className="text-[8px] font-black uppercase text-brand-navy/40 mb-1">{m.label}</p>
                    <p className="text-xl font-black text-brand-navy">{m.val}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/apply">
                  <BrandButton variant="outline" className="group">
                    Apply to Join Them <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </BrandButton>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="mt-32 px-8">
        <EliteCard className="max-w-4xl mx-auto bg-brand-navy text-white p-16 text-center space-y-8 rounded-[3rem] border-none">
          <h3 className="text-5xl font-black tracking-tighter">Your Clinic is Next.</h3>
          <p className="text-xl text-white/60 max-w-xl mx-auto font-medium">
            We are selecting 25 doctors for Cohort II. Don't wait until you're "ready." 
            The system makes you ready.
          </p>
          <div className="pt-6">
            <Link href="/apply">
              <BrandButton variant="accent" size="lg" className="py-6 px-16 group">
                Apply for Admission <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </Link>
          </div>
        </EliteCard>
      </section>
    </div>
  );
}
