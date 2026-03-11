"use client";

import { MastermindHeader } from "@/components/layout/mastermind-header";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  TrendingUp, 
  ShieldCheck, 
  Quote, 
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const cases = [
  {
    doctor: "Dr. Melissa",
    location: "Practicing Chiropractor",
    transformation: "Revenue Doubled During Program",
    quote: "NeuroChiro gave me the breakthrough I needed to communicate nervous-system function. Now my philosophy, language, and recommendations are aligned. It has completely changed how I communicate chiropractic to my patients. I feel increased clarity, stronger communication, and improved patient confidence.",
    metrics: [
      { label: "Revenue Growth", val: "2x" },
      { label: "Clarity", val: "100%" },
      { label: "Confidence", val: "Peak" },
    ],
    result: "Practice revenue doubled during the program."
  },
  {
    doctor: "Dr. Mike",
    location: "Practicing Chiropractor",
    transformation: "From Over-Explaining To Clinical Power",
    quote: "I noticed that when recommending care, I often talked too much. Through the NeuroChiro framework, I realized that my uncertainty was the root. Now I've learned to speak with more certainty, say less, and allow space in the conversation. My recommendations feel stronger.",
    metrics: [
      { label: "Authority", val: "High" },
      { label: "Communication", val: "Elite" },
      { label: "Certainty", val: "Installed" },
    ],
    result: "Insight: Command The Silence"
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
      <section className="px-8 max-w-5xl mx-auto space-y-12">
        {cases.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <EliteCard className="p-10 md:p-16 bg-white border-brand-navy/5 shadow-2xl rounded-[3rem] relative overflow-hidden group">
              <Quote className="absolute top-12 right-12 w-24 h-24 text-brand-orange/5" />
              
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 relative z-10">
                <div className="space-y-8">
                  <div className="inline-flex px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/10 text-brand-orange font-black text-[10px] uppercase tracking-widest">
                    {item.transformation}
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-2xl md:text-3xl font-bold text-brand-navy leading-tight italic">
                      "{item.quote}"
                    </p>
                    <div>
                      <h3 className="text-xl font-black text-brand-navy uppercase">— {item.doctor}</h3>
                      <p className="text-brand-gray/60 text-[10px] font-bold uppercase tracking-widest">{item.location}</p>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4 md:gap-8">
                    {item.metrics.map((m, j) => (
                      <div key={j} className="p-6 bg-brand-cream/50 rounded-2xl border border-brand-navy/5 text-center">
                        <p className="text-[8px] font-black uppercase text-brand-navy/40 mb-1">{m.label}</p>
                        <p className="text-xl font-black text-brand-navy">{m.val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="px-6 py-3 rounded-xl bg-brand-navy text-white text-[10px] font-black uppercase tracking-widest">
                       {item.result}
                    </div>
                    <Link href="/apply">
                      <BrandButton variant="outline" className="group">
                        Apply to Join Them <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </BrandButton>
                    </Link>
                  </div>
                </div>
              </div>
            </EliteCard>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="mt-32 px-8">
        <EliteCard className="max-w-4xl mx-auto bg-brand-navy text-white p-16 text-center space-y-8 rounded-[4rem] border-none shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-orange/10 blur-[100px] rounded-full -mr-20 -mt-20" />
          <h3 className="text-5xl font-black tracking-tighter relative z-10">Your Clinic is Next.</h3>
          <p className="text-xl text-white/60 max-w-xl mx-auto font-medium relative z-10">
            We are selecting 25 doctors for the next cohort. Don't wait until you're "ready." 
            The system makes you ready.
          </p>
          <div className="pt-6 relative z-10">
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
