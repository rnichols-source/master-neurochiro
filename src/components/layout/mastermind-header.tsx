"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BrandButton } from "@/components/ui/elite-ui";
import { Menu, X, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function MastermindHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Curriculum", href: "/curriculum" },
    { name: "Live Event", href: "/neurochiro-live" },
    { name: "Mechanisms", href: "/#mechanisms" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "py-4 bg-brand-cream/80 backdrop-blur-md border-b border-brand-navy/5 shadow-sm" : "py-8 bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 relative">
             <Image 
                src="/logo-dark.png" 
                alt="NeuroChiro Logo" 
                fill 
                className="object-contain group-hover:scale-110 transition-transform" 
             />
          </div>
          <div>
            <span className="block font-lato font-black uppercase tracking-widest text-brand-navy leading-none">NeuroChiro</span>
            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-brand-orange mt-0.5">Mastermind</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          <nav className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[10px] font-black uppercase tracking-widest text-brand-navy/50 hover:text-brand-orange transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6 border-l border-brand-navy/10 pl-10">
            <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-navy">
              Login
            </Link>
            <Link href="/apply">
              <BrandButton variant="primary" size="sm">Apply for Admission</BrandButton>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-brand-navy"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-brand-navy/5 overflow-hidden"
          >
            <div className="p-8 space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="block text-sm font-black uppercase tracking-widest text-brand-navy"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-brand-navy/5" />
              <Link href="/apply" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <BrandButton variant="accent" className="w-full">Apply Now</BrandButton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
