"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  LogOut,
  ShieldCheck,
  Users,
  Activity,
  MessageSquare,
  Zap,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/actions/auth-actions";

const navItems = [
  { name: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { name: "Curriculum", href: "/portal/curriculum", icon: BookOpen },
  { name: "Scripts", href: "/portal/triage", icon: Activity },
  { name: "The Engine", href: "/portal/engine", icon: BarChart3 },
];

const linkClass = "group flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-xl transition-all relative";

export function Sidebar({ userTier = "standard" }: { userTier?: string }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-brand-navy text-white border-r border-white/10 shrink-0">
      <div className="p-6">
        <Link href="/portal" className="flex items-center gap-3">
          <div className="w-8 h-8 relative">
            <Image src="/logo-white.png" alt="NeuroChiro Logo" fill className="object-contain" />
          </div>
          <div>
            <h2 className="font-lato text-sm font-bold tracking-wider uppercase leading-none text-white">NeuroChiro</h2>
            <p className="text-xs text-brand-orange font-bold tracking-wider uppercase">Mastermind</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <p className="px-2 pb-2 text-xs font-bold text-white/40 uppercase tracking-wider">Main Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                linkClass,
                isActive ? "bg-white/10 text-brand-orange" : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-brand-orange" : "text-white/50 group-hover:text-white")} />
              {item.name}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
          <p className="px-2 pb-2 text-xs font-bold text-brand-orange uppercase tracking-wider">Community</p>
          <Link
            href="/portal/council"
            className={cn(
              linkClass,
              pathname === "/portal/council" ? "bg-white/10 text-brand-orange" : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <ShieldCheck className={cn("w-4 h-4", pathname === "/portal/council" ? "text-brand-orange" : "text-white/50 group-hover:text-white")} />
            The Council
          </Link>
        </div>

        <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
          <p className="px-2 pb-2 text-xs font-bold text-white/40 uppercase tracking-wider">More</p>
          <Link
            href="/mentorship"
            className={cn(
              linkClass,
              pathname === "/mentorship" ? "bg-white/10 text-brand-orange" : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <Zap className={cn("w-4 h-4", pathname === "/mentorship" ? "text-brand-orange" : "text-white/50 group-hover:text-white")} />
            Mentorship
          </Link>
          <Link
            href="mailto:support@neurochiromastermind.com"
            className={cn(linkClass, "text-white/70 hover:bg-white/5 hover:text-white")}
          >
            <MessageSquare className="w-4 h-4 text-white/50 group-hover:text-white" />
            Help & Support
          </Link>
        </div>

        {userTier === "admin" && (
          <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
            <p className="px-2 pb-2 text-xs font-bold text-white/40 uppercase tracking-wider">Admin</p>
            {[
              { name: "Overview", href: "/admin", icon: ShieldCheck },
              { name: "Applications", href: "/admin/applications", icon: Users },
              { name: "Cohort Health", href: "/admin/cohorts", icon: Activity },
            ].map((item) => {
              const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    linkClass,
                    isActive ? "bg-white/10 text-green-400" : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn("w-4 h-4", isActive ? "text-green-400" : "text-white/50 group-hover:text-white")} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-3 py-3 text-sm font-medium text-white/50 hover:text-white hover:bg-red-500/10 rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
