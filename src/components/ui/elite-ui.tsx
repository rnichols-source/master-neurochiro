"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface EliteCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export function EliteCard({ 
  children, 
  title, 
  subtitle, 
  icon: Icon, 
  className,
  delay = 0,
  onClick
}: EliteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl p-6 border border-brand-navy/5 shadow-sm relative group hover:border-brand-orange/20 transition-all",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
    >
      {(title || Icon) && (
        <div className="flex items-start justify-between mb-6">
          <div>
            {title && (
              <h3 className="font-lato text-lg font-bold text-brand-navy tracking-tight leading-none mb-1">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs font-bold text-brand-orange uppercase tracking-widest opacity-80">
                {subtitle}
              </p>
            )}
          </div>
          {Icon && (
            <div className="p-2 bg-brand-navy/5 rounded-xl group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors">
              <Icon className="w-5 h-5 opacity-60 group-hover:opacity-100" />
            </div>
          )}
        </div>
      )}
      {children}
    </motion.div>
  );
}

interface BrandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

export function BrandButton({ 
  variant = "primary", 
  size = "md", 
  isLoading, 
  children, 
  className,
  ...props 
}: BrandButtonProps) {
  const variants = {
    primary: "bg-brand-navy text-white hover:bg-brand-black shadow-lg shadow-brand-navy/20",
    outline: "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
    ghost: "text-brand-navy/60 hover:text-brand-navy hover:bg-brand-navy/5",
    accent: "bg-brand-orange text-white hover:bg-[#B35520] shadow-lg shadow-brand-orange/20",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-bold uppercase tracking-widest rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {children}
    </button>
  );
}
