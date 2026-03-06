"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  LogOut,
  FileText,
  ShieldCheck,
  Users,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/actions/auth-actions";

const navItems = [
  { name: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { name: "Curriculum", href: "/portal/curriculum", icon: BookOpen },
  { name: "KPI Tracker", href: "/portal/kpi", icon: BarChart3 },
  { name: "Resources", href: "/portal/resources", icon: FileText },
];

export function Sidebar({ userTier = "standard" }: { userTier?: string }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-brand-navy text-white border-r border-white/10 shrink-0">
      <div className="p-6">
        <Link href="/portal" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center font-bold text-white">N</div>
          <div>
            <h2 className="font-lato text-sm font-bold tracking-wider uppercase leading-none text-white">NeuroChiro</h2>
            <p className="text-[10px] text-brand-orange font-bold tracking-widest uppercase">Mastermind</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <p className="px-2 pb-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">Main Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all relative",
                isActive ? "bg-white/10 text-brand-orange" : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-brand-orange" : "text-white/50 group-hover:text-white")} />
              {item.name}
            </Link>
          );
        })}

        {userTier === 'admin' && (
          <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
            <p className="px-2 pb-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">Admin Command</p>
            <Link
              href="/admin"
              className={cn(
                "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all relative",
                pathname === "/admin" ? "bg-white/10 text-green-400" : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <ShieldCheck className={cn("w-4 h-4", pathname === "/admin" ? "text-green-400" : "text-white/50 group-hover:text-white")} />
              Overview
            </Link>
            <Link
              href="/admin/applications"
              className={cn(
                "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all relative",
                pathname.startsWith("/admin/applications") ? "bg-white/10 text-green-400" : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Users className={cn("w-4 h-4", pathname.startsWith("/admin/applications") ? "text-green-400" : "text-white/50 group-hover:text-white")} />
              Applications
            </Link>
            <Link
              href="/admin/cohorts"
              className={cn(
                "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all relative",
                pathname.startsWith("/admin/cohorts") ? "bg-white/10 text-green-400" : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Activity className={cn("w-4 h-4", pathname.startsWith("/admin/cohorts") ? "text-green-400" : "text-white/50 group-hover:text-white")} />
              Cohort Health
            </Link>
            <Link
              href="/admin/revenue"
              className={cn(
                "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all relative",
                pathname.startsWith("/admin/revenue") ? "bg-white/10 text-green-400" : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <BarChart3 className={cn("w-4 h-4", pathname.startsWith("/admin/revenue") ? "text-green-400" : "text-white/50 group-hover:text-white")} />
              Revenue
            </Link>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/50 hover:text-white hover:bg-red-500/10 rounded-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
