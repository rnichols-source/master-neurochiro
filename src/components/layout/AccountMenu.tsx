"use client";

import { useState } from "react";
import { User, Settings, LogOut, ShieldCheck, ChevronDown, Bell, MessageSquare, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/actions/auth-actions";
import Image from "next/image";
import Link from "next/link";

export function AccountMenu({ userEmail, userTier }: { userEmail: string, userTier: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 hover:bg-brand-navy/5 rounded-2xl transition-all group"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-brand-navy flex items-center justify-center overflow-hidden border border-brand-navy/10 relative">
          <Image src="/logo-white.png" alt="User" fill className="object-contain p-1.5" />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-[10px] font-black text-brand-navy uppercase tracking-widest leading-none mb-1">My Account</p>
          <p className="text-[8px] text-brand-orange font-bold uppercase tracking-widest leading-none">{userTier} Member</p>
        </div>
        <ChevronDown size={14} className={cn("text-brand-navy/20 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-brand-navy/5 overflow-hidden z-[60]"
            >
              <div className="p-6 bg-brand-navy text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Logged in as</p>
                <p className="text-sm font-bold truncate">{userEmail}</p>
              </div>

              <div className="p-2">
                <Link 
                  href="/portal/onboarding" 
                  className="flex items-center gap-3 px-4 py-3 text-brand-navy hover:bg-brand-navy/5 rounded-xl transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={16} className="text-brand-navy/40 group-hover:text-brand-orange transition-colors" />
                  <span className="text-xs font-bold">My Profile</span>
                </Link>
                <Link 
                  href="/portal/engine" 
                  className="flex items-center gap-3 px-4 py-3 text-brand-navy hover:bg-brand-navy/5 rounded-xl transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <Activity size={16} className="text-brand-navy/40 group-hover:text-brand-orange transition-colors" />
                  <span className="text-xs font-bold">Practice Engine</span>
                </Link>
                {userTier === 'admin' && (
                  <Link 
                    href="/admin" 
                    className="flex items-center gap-3 px-4 py-3 text-brand-navy hover:bg-brand-navy/5 rounded-xl transition-colors group"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShieldCheck size={16} className="text-brand-navy/40 group-hover:text-green-500 transition-colors" />
                    <span className="text-xs font-bold">Admin Command</span>
                  </Link>
                )}
                <Link 
                  href="mailto:support@neurochiromastermind.com" 
                  className="flex items-center gap-3 px-4 py-3 text-brand-navy hover:bg-brand-navy/5 rounded-xl transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageSquare size={16} className="text-brand-navy/40 group-hover:text-brand-orange transition-colors" />
                  <span className="text-xs font-bold">Help & Support</span>
                </Link>
              </div>

              <div className="p-2 border-t border-brand-navy/5">
                <button 
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/5 rounded-xl transition-colors group"
                >
                  <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                  <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
