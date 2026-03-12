"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  FileText,
  Star,
  Zap,
  ShieldCheck,
  PieChart,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileItems = [
  { name: "Home", href: "/portal", icon: LayoutDashboard },
  { name: "Units", href: "/portal/curriculum", icon: BookOpen },
  { name: "The Engine", href: "/portal/engine", icon: Activity },
  { name: "Clinical", href: "/portal/clinical-engine", icon: Zap },
];

export function MobileNav({ userTier = "standard" }: { userTier?: string }) {
  const pathname = usePathname();

  const finalItems = [...mobileItems];
  if (userTier === 'admin') {
    finalItems.push({ name: "Admin", href: "/admin", icon: ShieldCheck });
  } else {
    finalItems.push({ name: "Pro", href: "/portal/pro/feedback", icon: Star });
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-navy border-t border-white/10 px-4 py-3 pb-8 z-50 flex justify-between items-center backdrop-blur-lg bg-brand-navy/90">
      {finalItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/portal' && pathname.startsWith(item.href));
        return (
          <Link 
            key={item.name} 
            href={item.href}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={cn(
              "p-2 rounded-xl transition-all",
              isActive ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20" : "text-white/40 group-hover:text-white/60"
            )}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className={cn(
              "text-[8px] font-black uppercase tracking-widest transition-colors",
              isActive ? "text-white" : "text-white/20"
            )}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
