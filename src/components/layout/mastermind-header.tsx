"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BrandButton } from "@/components/ui/elite-ui";
import { Menu, X } from "lucide-react";
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
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Results", href: "/#results" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "py-3 bg-brand-cream/90 backdrop-blur-md border-b border-brand-navy/5 shadow-sm" : "py-6 bg-transparent"
    )}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 relative">
             <Image
                src="/logo-dark.png"
                alt="NeuroChiro Logo"
                fill
                className="object-contain"
                priority
             />
          </div>
          <div>
            <span className="block font-lato font-black uppercase tracking-widest text-brand-navy text-sm leading-none">NeuroChiro</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mt-0.5">Mastermind</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-brand-navy/60 hover:text-brand-navy transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/login" className="text-sm font-bold text-brand-navy/60 hover:text-brand-navy transition-colors">
              Login
            </Link>
          </nav>
          <Link href="/apply">
            <BrandButton variant="primary" size="sm">Apply Now</BrandButton>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-brand-navy"
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
            className="md:hidden bg-white border-b border-brand-navy/5 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-base font-bold text-brand-navy py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="block text-base font-bold text-brand-navy py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <hr className="border-brand-navy/5" />
              <Link href="/apply" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <BrandButton variant="primary" className="w-full">Apply Now</BrandButton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
