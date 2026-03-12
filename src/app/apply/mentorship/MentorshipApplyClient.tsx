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
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4;

export default function MentorshipApplyClient() {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    clinicName: "",
    yearsInPractice: "",
    weeklyVolume: "",
    monthlyRevenue: "",
    primaryChallenge: "",
    teamSize: "",
    commitmentLevel: 5,
  });

  const handleNext = () => setStep((s) => (s + 1) as Step);
  const handleBack = () => setStep((s) => (s - 1) as Step);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl font-black text-brand-navy tracking-tight">Application Received.</h1>
          <p className="text-brand-gray text-lg font-medium leading-relaxed">
            Your clinic diagnostic has been submitted to Dr. Nichols' desk. 
            We review applications every 48 hours to ensure clinical alignment.
          </p>
          <div className="p-8 bg-brand-cream rounded-3xl border border-brand-navy/5 text-left space-y-4">
            <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest">Next Steps</p>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="w-5 h-5 rounded-full bg-brand-navy text-white flex items-center justify-center text-[10px]">1</span>
                Initial Alignment Review (48 Hours)
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="w-5 h-5 rounded-full bg-brand-navy text-white flex items-center justify-center text-[10px]">2</span>
                15-Minute "Vibe Check" Call
              </li>
              <li className="flex gap-3 text-sm font-bold text-brand-navy">
                <span className="w-5 h-5 rounded-full bg-brand-navy text-white flex items-center justify-center text-[10px]">3</span>
                Acceptance & Strategy Roadmap
              </li>
            </ul>
          </div>
          <Link href="/portal" className="inline-block pt-8">
            <BrandButton variant="primary">Return to Portal</BrandButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      {/* Progress Bar */}
      <div className="mb-12 flex justify-between items-center px-2">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className={`h-1.5 flex-1 mx-1 rounded-full transition-all duration-500 ${
              step >= i ? "bg-brand-orange" : "bg-brand-navy/5"
            }`} 
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <EliteCard className="p-8 md:p-12 bg-white border-brand-navy/5 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 1 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Step 01</p>
                    <h2 className="text-3xl font-black text-brand-navy tracking-tight uppercase">Basic Intelligence</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-brand-cream border-none rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-orange"
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Email Address</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-brand-cream border-none rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-orange"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="col-span-full space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Clinic Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-brand-cream border-none rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-orange"
                        value={formData.clinicName}
                        onChange={e => setFormData({...formData, clinicName: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Step 02</p>
                    <h2 className="text-3xl font-black text-brand-navy tracking-tight uppercase">Clinical Audit</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Years in Practice</label>
                      <input 
                        required
                        type="number" 
                        className="w-full bg-brand-cream border-none rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-orange"
                        value={formData.yearsInPractice}
                        onChange={e => setFormData({...formData, yearsInPractice: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Team Size (Full Time)</label>
                      <input 
                        required
                        type="number" 
                        className="w-full bg-brand-cream border-none rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-orange"
                        value={formData.teamSize}
                        onChange={e => setFormData({...formData, teamSize: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Average Weekly Volume</label>
                      <select 
                        required
                        className="w-full bg-brand-cream border-none rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-orange"
                        value={formData.weeklyVolume}
                        onChange={e => setFormData({...formData, weeklyVolume: e.target.value})}
                      >
                        <option value="">Select Range</option>
                        <option value="0-50">0 - 50 Visits</option>
                        <option value="50-100">50 - 100 Visits</option>
                        <option value="100-150">100 - 150 Visits</option>
                        <option value="150+">150+ Visits</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Avg Monthly Collections</label>
                      <select 
                        required
                        className="w-full bg-brand-cream border-none rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-orange"
                        value={formData.monthlyRevenue}
                        onChange={e => setFormData({...formData, monthlyRevenue: e.target.value})}
                      >
                        <option value="">Select Range</option>
                        <option value="0-10k">$0 - $10k</option>
                        <option value="10k-25k">$10k - $25k</option>
                        <option value="25k-50k">$25k - $50k</option>
                        <option value="50k+">$50k+</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Step 03</p>
                    <h2 className="text-3xl font-black text-brand-navy tracking-tight uppercase">Structural Leaks</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Where is the biggest hole in your bucket?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: "conversion", label: "Case Acceptance", icon: Target, desc: "Patients aren't saying yes to care." },
                        { id: "retention", label: "Patient Retention", icon: Activity, desc: "Patients drop out after pain stops." },
                        { id: "team", label: "Team / Operations", icon: Users, desc: "I'm overwhelmed by staff management." },
                        { id: "authority", label: "Clinical Certainty", icon: Brain, desc: "I lack command in the room." },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({...formData, primaryChallenge: item.id})}
                          className={`flex flex-col p-6 text-left rounded-2xl border transition-all ${
                            formData.primaryChallenge === item.id 
                              ? "bg-brand-navy border-brand-navy text-white" 
                              : "bg-brand-cream border-brand-navy/5 text-brand-navy hover:border-brand-orange/40"
                          }`}
                        >
                          <item.icon className={`w-6 h-6 mb-4 ${formData.primaryChallenge === item.id ? "text-brand-orange" : "text-brand-navy/40"}`} />
                          <p className="text-sm font-black uppercase">{item.label}</p>
                          <p className={`text-[10px] mt-1 ${formData.primaryChallenge === item.id ? "text-white/60" : "text-brand-gray"}`}>{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px]">Step 04</p>
                    <h2 className="text-3xl font-black text-brand-navy tracking-tight uppercase">Commitment</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 block">
                        On a scale of 1-10, how ready are you to implement new clinical systems?
                      </label>
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-xs font-bold text-brand-navy/40">1 (Just looking)</span>
                        <input 
                          type="range" 
                          min="1" 
                          max="10" 
                          className="flex-1 accent-brand-orange"
                          value={formData.commitmentLevel}
                          onChange={e => setFormData({...formData, commitmentLevel: parseInt(e.target.value)})}
                        />
                        <span className="text-xs font-bold text-brand-orange">10 (Ready Today)</span>
                      </div>
                      <div className="text-center pt-4">
                        <span className="text-4xl font-black text-brand-navy">{formData.commitmentLevel}</span>
                      </div>
                    </div>
                    <div className="p-6 bg-brand-navy rounded-2xl text-white text-xs font-medium italic leading-relaxed">
                      "I understand that Private Mentorship requires me to record my communication, track my numbers daily, and be held accountable to the high standard Dr. Nichols sets for his private clients."
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-8 border-t border-brand-navy/5">
                {step > 1 ? (
                  <button 
                    type="button" 
                    onClick={handleBack}
                    className="flex items-center gap-2 text-[10px] font-black text-brand-navy/40 uppercase tracking-widest hover:text-brand-navy transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}
                
                {step < 4 ? (
                  <BrandButton 
                    type="button" 
                    variant="primary" 
                    onClick={handleNext}
                    className="group"
                  >
                    Next Phase <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </BrandButton>
                ) : (
                  <BrandButton 
                    type="submit" 
                    variant="accent"
                    className="group"
                  >
                    Submit Application <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
