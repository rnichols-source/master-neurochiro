"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Activity,
  Zap,
  ShieldCheck,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileItems = [
  { name: "Home", href: "/portal", icon: LayoutDashboard },
  { name: "Learn", href: "/portal/curriculum", icon: BookOpen },
  { name: "Engine", href: "/portal/engine", icon: Activity },
  { name: "Clinical", href: "/portal/clinical-engine", icon: Zap },
];

export function MobileNav({ userTier = "standard" }: { userTier?: string }) {
  const pathname = usePathname();

  const finalItems = [...mobileItems];
  if (userTier === "admin") {
    finalItems.push({ name: "Admin", href: "/admin", icon: ShieldCheck });
  } else {
    finalItems.push({
      name: "Pro",
      href: "/portal/pro/feedback",
      icon: Star,
    });
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-navy/95 backdrop-blur-lg border-t border-white/10 z-50 safe-bottom">
      <div className="flex justify-around items-center px-2 pt-2 pb-1">
        {finalItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/portal" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-1.5 px-3 touch-target"
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-2xl transition-all",
                  isActive
                    ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/30"
                    : "text-white/40"
                )}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <span
                className={cn(
                  "text-xs font-bold transition-colors",
                  isActive ? "text-white" : "text-white/30"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
