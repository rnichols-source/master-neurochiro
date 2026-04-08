"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BrandButton } from "@/components/ui/elite-ui";
import { Menu, X, ArrowRight } from "lucide-react";
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Results", href: "/#results" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 safe-top",
        isScrolled
          ? "py-3 bg-brand-cream/90 backdrop-blur-md border-b border-brand-navy/5 shadow-sm"
          : "py-4 md:py-6 bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 md:w-10 md:h-10 relative">
            <Image
              src="/logo-dark.png"
              alt="NeuroChiro Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="block font-lato font-black uppercase tracking-widest text-brand-navy text-sm leading-none">
              NeuroChiro
            </span>
            <span className="block text-xs font-bold uppercase tracking-wider text-brand-orange mt-0.5">
              Mastermind
            </span>
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
            <Link
              href="/login"
              className="text-sm font-bold text-brand-navy/60 hover:text-brand-navy transition-colors"
            >
              Login
            </Link>
          </nav>
          <Link href="/apply">
            <BrandButton variant="primary" size="sm">
              Apply Now
            </BrandButton>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-brand-navy active:bg-brand-navy/5 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Full-screen Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-0 z-40 bg-brand-cream"
          >
            {/* Drawer header with close button */}
            <div className="flex items-center justify-between px-5 py-4 safe-top">
              <Link
                href="/"
                className="flex items-center gap-2.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-9 h-9 relative">
                  <Image
                    src="/logo-dark.png"
                    alt="NeuroChiro Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-lato font-black uppercase tracking-widest text-brand-navy text-sm">
                  NeuroChiro
                </span>
              </Link>
              <button
                className="flex items-center justify-center w-11 h-11 rounded-xl text-brand-navy active:bg-brand-navy/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 pt-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-4 px-4 text-lg font-bold text-brand-navy rounded-2xl active:bg-brand-navy/5 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                    <ArrowRight className="w-5 h-5 text-brand-navy/20" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Link
                  href="/login"
                  className="flex items-center justify-between py-4 px-4 text-lg font-bold text-brand-navy rounded-2xl active:bg-brand-navy/5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Member Login
                  <ArrowRight className="w-5 h-5 text-brand-navy/20" />
                </Link>
              </motion.div>
            </nav>

            {/* CTA at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-6 safe-bottom"
            >
              <Link
                href="/apply"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BrandButton variant="primary" className="w-full py-5 text-base group">
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
