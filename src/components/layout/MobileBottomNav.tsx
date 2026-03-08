"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LucideIcon } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface MobileBottomNavProps {
  items: NavItem[];
}

export default function MobileBottomNav({ items }: MobileBottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[150] bg-white border-t border-gray-100 px-2 pb-safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 relative"
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all duration-300",
                isActive ? "text-neuro-orange" : "text-gray-400"
              )}>
                <item.icon className={cn("w-6 h-6", isActive && "fill-current opacity-20")} />
                <item.icon className="w-6 h-6 absolute inset-0 m-auto" />
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-tighter transition-colors",
                isActive ? "text-neuro-navy" : "text-gray-400"
              )}>
                {item.name}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 w-8 h-1 bg-neuro-orange rounded-b-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
