"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface KPIInsightProps {
  lever: string;
  message: string;
  severity: "critical" | "warning";
  action: string;
  link: string;
  delay?: number;
}

export function KPIInsight({ lever, message, severity, action, link, delay = 0 }: KPIInsightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border",
        severity === "critical"
          ? "bg-red-50 border-red-100"
          : "bg-amber-50 border-amber-100"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-2 h-2 rounded-full flex-shrink-0 mt-1.5",
          severity === "critical" ? "bg-red-500" : "bg-amber-500"
        )} />
        <div>
          <p className={cn(
            "text-sm font-bold",
            severity === "critical" ? "text-red-900" : "text-amber-900"
          )}>
            {lever}: {message}
          </p>
        </div>
      </div>

      <Link
        href={link}
        className={cn(
          "text-xs font-black uppercase tracking-wider flex items-center gap-1 whitespace-nowrap transition-colors",
          severity === "critical"
            ? "text-red-600 hover:text-red-800"
            : "text-amber-600 hover:text-amber-800"
        )}
      >
        {action} <ArrowRight size={10} />
      </Link>
    </motion.div>
  );
}
