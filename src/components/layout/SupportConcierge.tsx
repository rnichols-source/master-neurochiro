"use client";

import { useState } from "react";
import { HelpCircle, X, Send, Loader2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandButton } from "@/components/ui/elite-ui";

export function SupportConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending to support/discord
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
    }, 3000);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-brand-navy text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-orange transition-all group z-50"
      >
        <HelpCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Concierge Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-end justify-end p-6 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-white rounded-[2rem] shadow-2xl border border-brand-navy/10 overflow-hidden pointer-events-auto"
            >
              <div className="bg-brand-navy p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center font-black">N</div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-none mb-1">Elite Support</p>
                    <h3 className="text-lg font-black tracking-tight">Concierge</h3>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                      <Send className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-xl font-black text-brand-navy">Message Received</h4>
                    <p className="text-sm text-brand-gray">Our clinical operations team will respond to your practice email within 2-4 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">How can we help?</label>
                      <textarea
                        required
                        placeholder="I'm having trouble with..."
                        className="w-full bg-brand-cream border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-brand-orange/40 transition-all outline-none min-h-[120px] resize-none"
                      />
                    </div>
                    <BrandButton variant="primary" type="submit" className="w-full py-4" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <span className="flex items-center gap-2">Send to Support <Send className="w-4 h-4" /></span>
                      )}
                    </BrandButton>
                    <p className="text-[9px] text-center font-bold text-brand-navy/20 uppercase tracking-widest">
                      Direct Human Support • Mon-Fri 9am-5pm EST
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
