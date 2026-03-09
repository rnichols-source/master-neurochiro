"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  User, 
  Building2, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  MapPin,
  Calendar
} from "lucide-react";
import { activateMemberProfile } from "@/app/actions/onboarding-actions";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ActivationClient({ token, invitation, isPreview }: any) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    first_name: invitation?.full_name?.split(' ')[0] || "",
    last_name: invitation?.full_name?.split(' ')[1] || "",
    practice_name: "",
    practice_city: "",
    practice_state: "",
    years_in_practice: "",
    password: "",
    confirm_password: ""
  });

  const [error, setError] = useState("");

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await activateMemberProfile(token, formData.password, formData);
      
      if (res.success) {
        if (isPreview) {
          alert("Preview Mode: Profile created (simulated). Redirecting to login...");
          router.push("/login");
          return;
        }

        // Auto login
        const supabase = createClient();
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: invitation.email,
          password: formData.password
        });

        if (loginError) {
          router.push("/login?message=Account activated. Please log in.");
        } else {
          router.push("/portal");
        }
      } else {
        setError(res.error || "Failed to activate profile");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Personal Info", icon: User },
    { title: "Practice Details", icon: Building2 },
    { title: "Security", icon: Lock },
    { title: "Complete", icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-[#0A192F] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-navy/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10 space-y-12">
        <div className="text-center space-y-4">
          <div className="relative w-48 h-12 mx-auto mb-8">
            <Image src="/logo-white.png" alt="NeuroChiro" fill className="object-contain" />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Activate Your Access.</h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Step {step} of 4 &bull; {steps[step-1].title}</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between items-center max-w-md mx-auto relative px-4">
           <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0" />
           {steps.map((s, i) => (
             <div key={i} className="relative z-10">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                 step > i + 1 ? "bg-green-500 text-white" : 
                 step === i + 1 ? "bg-brand-orange text-white scale-110 shadow-lg shadow-brand-orange/20" : 
                 "bg-brand-navy border border-white/10 text-white/20"
               }`}>
                 <s.icon size={18} />
               </div>
             </div>
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
            <EliteCard className="p-10 border-white/5 bg-white/5 backdrop-blur-md">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">First Name</label>
                      <input 
                        type="text" 
                        value={formData.first_name}
                        onChange={e => setFormData({...formData, first_name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Last Name</label>
                      <input 
                        type="text" 
                        value={formData.last_name}
                        onChange={e => setFormData({...formData, last_name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Confirmed Email</label>
                    <input 
                      type="email" 
                      disabled
                      value={invitation?.email || "admin-preview@neurochiro.com"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white/40 font-bold outline-none"
                    />
                  </div>
                  <BrandButton onClick={nextStep} className="w-full py-4 mt-4">Continue to Practice Info <ArrowRight className="ml-2 w-4 h-4" /></BrandButton>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Practice Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        type="text" 
                        value={formData.practice_name}
                        onChange={e => setFormData({...formData, practice_name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                        placeholder="Elite Chiropractic Center"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">City</label>
                      <input 
                        type="text" 
                        value={formData.practice_city}
                        onChange={e => setFormData({...formData, practice_city: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">State</label>
                      <input 
                        type="text" 
                        value={formData.practice_state}
                        onChange={e => setFormData({...formData, practice_state: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Years in Practice</label>
                    <input 
                      type="number" 
                      value={formData.years_in_practice}
                      onChange={e => setFormData({...formData, years_in_practice: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="flex-1 py-4 text-white/40 font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors">Go Back</button>
                    <BrandButton onClick={nextStep} className="flex-[2] py-4">Security Setup <ArrowRight className="ml-2 w-4 h-4" /></BrandButton>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Create Password</label>
                    <input 
                      type="password" 
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Confirm Password</label>
                    <input 
                      type="password" 
                      value={formData.confirm_password}
                      onChange={e => setFormData({...formData, confirm_password: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:border-brand-orange/40 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  {error && <p className="text-red-400 text-xs font-bold text-center">{error}</p>}
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="flex-1 py-4 text-white/40 font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors">Go Back</button>
                    <BrandButton onClick={handleSubmit} isLoading={loading} className="flex-[2] py-4">Activate Profile <Zap className="ml-2 w-4 h-4" /></BrandButton>
                  </div>
                </div>
              )}
            </EliteCard>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
          Secure Activation System &bull; NeuroChiro OS
        </p>
      </div>
    </div>
  );
}
