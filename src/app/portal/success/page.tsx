"use client";

import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/elite-ui";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-[100dvh] bg-brand-cream flex items-center justify-center p-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full text-center space-y-6"
      >
        <div className="inline-flex p-5 bg-brand-orange/10 rounded-full">
          <CheckCircle2 className="w-10 h-10 text-brand-orange" />
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">
          You&apos;re In!
        </h1>
        <p className="text-base text-brand-gray font-medium leading-relaxed">
          Welcome to the Mastermind. Your payment was successful and your
          account is being set up.
        </p>

        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 text-left">
          <p className="text-sm font-bold text-brand-navy mb-1">
            Check your email
          </p>
          <p className="text-sm text-brand-gray font-medium">
            We just sent your portal invitation and onboarding instructions.
          </p>
        </div>

        <Link href="/portal" className="block">
          <BrandButton variant="primary" size="lg" className="w-full py-5 group">
            Go to Dashboard{" "}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </BrandButton>
        </Link>
      </motion.div>
    </div>
  );
}
