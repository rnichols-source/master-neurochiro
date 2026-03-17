"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Users, 
  Activity,
  ShieldCheck,
  Brain,
  MessageSquare,
  Lock,
  Loader2,
  Zap,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { submitApplication } from "@/app/actions/submit-application";

type Step = 1 | 2 | 3 | 4 | 5;

export default function CouncilApplyClient() {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Section 1: Identity
    full_name: "",
    email: "",
    phone: "",
    current_role: "",
    in_mastermind: "",

    // Section 2: Current Position
    current_phase: "",
    weekly_visits: "",
    biggest_focus: "",

    // Section 3: Implementation Readiness
    implementation_level: "",
    holding_back_description: "",

    // Section 4: Council Fit
    why_join_council: "",
    ongoing_impact: "",

    // Section 5: Commitment
    willing_to_be_coached: "",
    willing_to_implement: "",
    open_to_feedback: "",
    investment_readiness: "",
  });

  const handleNext = () => {
    setStep((s) => (s + 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBack = () => {
    setStep((s) => (s - 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitApplication({
        ...formData,
        application_type: 'Council',
        why_now: formData.why_join_council // Mapping for backend compatibility
      } as any);
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit application. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="w-24 h-24 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto">
            <Zap className="w-12 h-12 text-brand-orange" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-brand-navy tracking-tight uppercase">Application Received.</h1>
            <p className="text-brand-gray text-xl font-medium leading-relaxed">
              You're one step closer to the Council. We are reviewing your application now. 
              If it's a fit, we'll reach out with next steps to join the inner circle.
            </p>
          </div>
          <div className="p-10 bg-brand-navy rounded-[3rem] text-white text-left space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Star className="w-24 h-24 text-brand-orange" />
            </div>
            <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] relative z-10">Inner Circle Protocol</p>
            <ul className="space-y-5 relative z-10">
              {[
                "Application Review & Verification",
                "Implementation Level Audit",
                "Membership Confirmation Email",
                "Onboarding & Call Schedule Access"
              ].map((step, i) => (
                <li key={i} className="flex gap-4 text-sm font-bold items-center">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] shrink-0">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/" className="inline-block pt-8">
            <BrandButton variant="outline" size="lg" className="border-brand-navy">Return to Home</BrandButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Progress Bar */}
      <div className="mb-16 space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-brand-orange uppercase tracking-[0.4em]">The Inner Circle</p>
            <h1 className="text-3xl font-black text-brand-navy uppercase tracking-tighter">Council Membership Application</h1>
          </div>
          <p className="text-[10px] font-black text-brand-navy/40 uppercase tracking-widest">Step {step} of 5</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className={`h-2 flex-1 rounded-full transition-all duration-700 ${
                step >= i ? "bg-brand-navy" : "bg-brand-navy/5"
              }`} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <EliteCard className="p-8 md:p-12 bg-white border-brand-navy/5 shadow-2xl rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-[80px] rounded-full -mr-32 -mt-32" />
            
            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              
              {/* SECTION 1: IDENTITY */}
              {step === 1 && (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Section 01</p>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase leading-none text-brand-navy">Identity</h2>
                    <p className="text-brand-gray text-sm font-medium">This is where execution begins.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Full Name</label>
                      <input required type="text" placeholder="Dr. Jane Smith" className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-navy transition-all" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Practice Email</label>
                      <input required type="email" placeholder="doctor@clinic.com" className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-navy transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Phone Number</label>
                      <input required type="tel" placeholder="555-0123" className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-navy transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Current Role</label>
                      <select required className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-navy transition-all appearance-none" value={formData.current_role} onChange={e => setFormData({...formData, current_role: e.target.value})}>
                        <option value="">Select Role</option>
                        <option value="Clinic Owner">Clinic Owner</option>
                        <option value="Associate Doctor">Associate Doctor</option>
                        <option value="Student">Student</option>
                      </select>
                    </div>
                    <div className="col-span-full space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 block">Are you currently in the NeuroChiro Mastermind?</label>
                      <div className="flex gap-4">
                        {["Yes", "No"].map((choice) => (
                          <button key={choice} type="button" onClick={() => setFormData({...formData, in_mastermind: choice})} className={`flex-1 p-5 rounded-2xl border-2 text-xs font-black uppercase tracking-widest transition-all ${formData.in_mastermind === choice ? "bg-brand-navy border-brand-navy text-white" : "bg-brand-cream border-transparent text-brand-navy/60 hover:border-brand-navy/40"}`}>{choice}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: CURRENT POSITION */}
              {step === 2 && (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Section 02</p>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase leading-none">Current Position</h2>
                    <p className="text-brand-gray text-sm font-medium">Define your current implementation phase.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 block">What phase are you currently in?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["Learning Fundamentals", "Applying Inconsistently", "Implementing Consistently", "Scaling Systems"].map((phase) => (
                          <button key={phase} type="button" onClick={() => setFormData({...formData, current_phase: phase})} className={`p-5 rounded-2xl border-2 text-left text-xs font-black uppercase tracking-widest transition-all ${formData.current_phase === phase ? "bg-brand-navy border-brand-navy text-white" : "bg-brand-cream border-transparent text-brand-navy/60 hover:border-brand-navy/40"}`}>{phase}</button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Weekly Patient Visits</label>
                        <input type="text" placeholder="e.g. 100" className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-navy transition-all" value={formData.weekly_visits} onChange={e => setFormData({...formData, weekly_visits: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Biggest Focus Right Now</label>
                        <select required className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-brand-navy transition-all appearance-none" value={formData.biggest_focus} onChange={e => setFormData({...formData, biggest_focus: e.target.value})}>
                          <option value="">Select Focus</option>
                          <option value="Conversions">Conversions</option>
                          <option value="Retention">Retention</option>
                          <option value="Systems">Systems</option>
                          <option value="Team">Team</option>
                          <option value="Identity">Identity</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: IMPLEMENTATION READINESS */}
              {step === 3 && (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Section 03</p>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase leading-none">Execution Audit</h2>
                    <p className="text-brand-gray text-sm font-medium">Measure your commitment to the blueprint.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 block">How much have you implemented from what you've learned so far?</label>
                      <div className="grid grid-cols-2 gap-4">
                        {["Very Little", "Some", "A Lot", "Fully Consistent"].map((lvl) => (
                          <button key={lvl} type="button" onClick={() => setFormData({...formData, implementation_level: lvl})} className={`p-5 rounded-2xl border-2 text-xs font-black uppercase tracking-widest transition-all ${formData.implementation_level === lvl ? "bg-brand-navy border-brand-navy text-white" : "bg-brand-cream border-transparent text-brand-navy/60 hover:border-brand-navy/40"}`}>{lvl}</button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">What is currently holding you back from full execution?</label>
                      <textarea required rows={4} placeholder="Time? Fear? Team? Confusion?" className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-medium focus:ring-2 focus:ring-brand-navy transition-all" value={formData.holding_back_description} onChange={e => setFormData({...formData, holding_back_description: e.target.value})} />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 4: COUNCIL FIT */}
              {step === 4 && (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Section 04</p>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase leading-none">Council Alignment</h2>
                    <p className="text-brand-gray text-sm font-medium">Why the Inner Circle?</p>
                  </div>

                  <div className="space-y-8">
                    <div className="p-6 bg-brand-navy rounded-2xl text-white text-xs font-medium italic leading-relaxed border-l-4 border-brand-orange">
                      "The Council is where we take the blueprint and actually build it into your clinic and life. This is not another program; it is an environment of ongoing proximity."
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Why do you want to join the Council?</label>
                      <textarea required rows={3} className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-medium focus:ring-2 focus:ring-brand-navy transition-all" value={formData.why_join_council} onChange={e => setFormData({...formData, why_join_council: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">What would change in your clinic if you had ongoing coaching and accountability?</label>
                      <textarea required rows={3} className="w-full bg-brand-cream border-none rounded-2xl p-5 text-sm font-medium focus:ring-2 focus:ring-brand-navy transition-all" value={formData.ongoing_impact} onChange={e => setFormData({...formData, ongoing_impact: e.target.value})} />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 5: COMMITMENT */}
              {step === 5 && (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Section 05</p>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase leading-none">Commitment</h2>
                    <p className="text-brand-gray text-sm font-medium">Final filters before acceptance.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-6">
                      {[
                        { id: "willing_to_be_coached", label: "Are you willing to be coached?" },
                        { id: "willing_to_implement", label: "Are you willing to implement what is discussed?" },
                        { id: "open_to_feedback", label: "Are you open to feedback on your systems & communication?" },
                      ].map((q) => (
                        <div key={q.id} className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60">{q.label}</label>
                          <div className="flex gap-4">
                            {["Yes", "No"].map((choice) => (
                              <button key={choice} type="button" onClick={() => setFormData({...formData, [q.id]: choice})} className={`flex-1 p-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${(formData as any)[q.id] === choice ? "bg-brand-navy border-brand-navy text-white" : "bg-brand-cream border-transparent text-brand-navy/60 hover:border-brand-navy/40"}`}>{choice}</button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/60">The Council is $297/month. This is for people serious about building, not just learning. Are you ready?</label>
                      <div className="flex gap-4">
                        {["Yes — I'm Ready", "I Need More Info"].map((choice) => (
                          <button key={choice} type="button" onClick={() => setFormData({...formData, investment_readiness: choice})} className={`flex-1 p-5 rounded-2xl border-2 text-xs font-black uppercase tracking-widest transition-all ${formData.investment_readiness === choice ? "bg-brand-navy border-brand-navy text-white" : "bg-brand-cream border-transparent text-brand-navy/60 hover:border-brand-navy/40"}`}>{choice}</button>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 bg-brand-cream rounded-[2.5rem] text-brand-navy relative overflow-hidden border border-brand-navy/5">
                       <Lock className="absolute top-4 right-4 w-12 h-12 text-brand-navy/5" />
                       <div className="relative z-10 space-y-2 text-center">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em]">The Standard</p>
                          <p className="text-sm font-bold italic">
                            "This is not for passive learning. This is for people ready to build."
                          </p>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NAVIGATION */}
              <div className="flex justify-between items-center pt-10 border-t border-brand-navy/5">
                {step > 1 ? (
                  <button type="button" onClick={handleBack} className="flex items-center gap-2 text-[10px] font-black text-brand-navy/40 uppercase tracking-widest hover:text-brand-navy transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}
                
                {step < 5 ? (
                  <BrandButton type="button" variant="primary" onClick={handleNext} className="group px-10 py-5 rounded-2xl">
                    Next Phase <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </BrandButton>
                ) : (
                  <BrandButton type="submit" variant="accent" className="group px-12 py-6 rounded-2xl" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Processing Application <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                    ) : (
                      <>Apply for the Council <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /> </>
                    )}
                  </BrandButton>
                )}
              </div>
            </form>
          </EliteCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
