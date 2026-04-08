"use client";

import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/elite-ui";
import {
  Lock,
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { signIn, resetPassword } from "@/app/actions/auth-actions";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const result = await signIn(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const result = await resetPassword(email);
    setIsLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess("Reset link sent. Please check your email.");
    }
  }

  return (
    <div className="min-h-[100dvh] bg-brand-navy flex items-center justify-center px-5 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6 md:space-y-8 relative z-10"
      >
        <div className="text-center space-y-4 md:space-y-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-brand-orange flex items-center justify-center font-black text-white text-xl md:text-2xl shadow-xl shadow-brand-orange/20">
              N
            </div>
            <span className="font-lato font-black uppercase tracking-[0.2em] text-white text-lg md:text-xl">
              NeuroChiro
            </span>
          </Link>
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Portal Access
            </h1>
            <p className="text-white/40 font-medium text-sm">
              Sign in to your practice operating system.
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {success}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-white/60 ml-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  enterKeyHint="next"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@practice.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-base focus:ring-2 focus:ring-brand-orange/40 transition-all placeholder:text-white/20 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-brand-orange hover:text-white transition-colors disabled:opacity-50 py-1 px-2 -mr-2"
                  disabled={isLoading}
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  enterKeyHint="go"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-base focus:ring-2 focus:ring-brand-orange/40 transition-all placeholder:text-white/20 outline-none"
                />
              </div>
            </div>

            <BrandButton
              variant="accent"
              type="submit"
              className="w-full py-5 group text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In{" "}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </BrandButton>
          </form>

          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10 text-center">
            <p className="text-sm font-medium text-white/40">
              Not a member yet?{" "}
              <Link
                href="/apply"
                className="text-brand-orange hover:text-white transition-colors ml-1"
              >
                Apply Now
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs font-medium text-white/20">
          Secure Infrastructure &bull; HIPAA Compliant
        </p>
      </motion.div>
    </div>
  );
}
