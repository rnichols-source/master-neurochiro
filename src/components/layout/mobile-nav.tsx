"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Users,
  ShieldCheck,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileItems = [
  { name: "Home", href: "/portal", icon: LayoutDashboard },
  { name: "Learn", href: "/portal/curriculum", icon: BookOpen },
  { name: "Community", href: "/portal/community", icon: Users },
  { name: "Track", href: "/portal/engine", icon: BarChart3 },
];

export function MobileNav({ userTier = "standard" }: { userTier?: string }) {
  const pathname = usePathname();

  const isPro = userTier === "pro" || userTier === "admin";
  const proItem = { name: "Pro", href: "/portal/pro", icon: Star };
  const adminItem = { name: "Admin", href: "/admin", icon: ShieldCheck };

  const items = isPro
    ? userTier === "admin"
      ? [...mobileItems, proItem, adminItem]
      : [...mobileItems, proItem]
    : mobileItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-navy/95 backdrop-blur-lg border-t border-white/10 z-50 safe-bottom">
      <div className="flex justify-around items-center px-2 pt-2 pb-1">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/portal" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-1.5 px-3 touch-target active:scale-95 transition-transform"
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
