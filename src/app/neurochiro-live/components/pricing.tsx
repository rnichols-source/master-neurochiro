"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/elite-ui";
import { CheckCircle2, Star, ShieldCheck, Loader2 } from "lucide-react";
import { createEventCheckout } from "@/app/actions/event-actions";

interface LivePricingProps {
  event: any;
}

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

export function LivePricing({ event }: LivePricingProps) {
  const [selectedCategory, setSelectedCategory] = useState("practitioner");
  const [loading, setLoading] = useState<string | null>(null);

  if (!event) return null;

  const currentContent = pricingContent.find(t => t.category === selectedCategory)!;
  
  const getTicketData = (tier: string) => {
    return event.ticket_types.find((t: any) => t.category === selectedCategory && t.tier === tier);
  };

  const handleCheckout = async (tier: string) => {
    setLoading(tier);
    try {
      const ticket = getTicketData(tier);
      if (!ticket) throw new Error("Ticket not found");

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

  const standardTicket = getTicketData("standard");
  const innerCircleTicket = getTicketData("inner_circle");

  return (
    <section id="pricing" className="section-padding bg-brand-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <p className="text-brand-orange font-black uppercase tracking-widest text-xs">Investment</p>
          <h2 className="text-7xl font-black text-white tracking-tighter leading-none uppercase">Secure Your Seat.</h2>
          <p className="text-xl text-white/40 font-medium">Limited seating available for absolute focus and interaction.</p>
        </div>

        {/* Category Toggle */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          {pricingContent.map((t) => (
            <button
              key={t.category}
              onClick={() => setSelectedCategory(t.category)}
              className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
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
          {/* Standard Tier */}
          {standardTicket && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-12 rounded-2xl border-white/5 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-6 h-6 text-brand-orange" />
                <span className="text-xs font-black uppercase tracking-widest text-white/40">Standard Access</span>
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
            </motion.div>
          )}

          {/* Inner Circle Tier */}
          {innerCircleTicket && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-12 rounded-2xl border-brand-orange/30 bg-gradient-to-br from-brand-orange/10 to-transparent flex flex-col relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg shadow-brand-orange/30 whitespace-nowrap">
                Highly Limited
              </div>
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-6 h-6 text-brand-orange" />
                <span className="text-xs font-black uppercase tracking-widest text-brand-orange">Inner Circle</span>
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
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
