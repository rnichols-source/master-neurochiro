"use client";

import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/elite-ui";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { signIn } from "@/app/actions/auth-actions";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await signIn(formData);
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-8">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 relative z-10"
      >
        <div className="text-center space-y-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center font-black text-white text-2xl shadow-xl shadow-brand-orange/20">N</div>
            <span className="font-lato font-black uppercase tracking-[0.2em] text-white text-xl">NeuroChiro</span>
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tight">Welcome Back</h1>
            <p className="text-white/40 font-medium text-sm">Access your mastermind ecosystem.</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 elite-shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">Practice Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="doctor@practice.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:ring-2 focus:ring-brand-orange/40 transition-all placeholder:text-white/20" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/60">Secure Password</label>
                <button type="button" className="text-[9px] font-black uppercase tracking-widest text-brand-orange hover:text-white transition-colors">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                  name="password"
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:ring-2 focus:ring-brand-orange/40 transition-all placeholder:text-white/20" 
                />
              </div>
            </div>

            <BrandButton 
              type="submit" 
              variant="accent" 
              className="w-full py-5 group"
              disabled={isPending}
            >
              {isPending ? "Signing In..." : "Sign In to Portal"} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </BrandButton>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
              Not a member yet? <Link href="/apply" className="text-brand-orange hover:text-white transition-colors ml-1">Apply for Admission</Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
          Secure Infrastructure &bull; HIPAA Compliant
        </p>
      </motion.div>
    </div>
  );
}
