"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  DollarSign, 
  Command,
  X,
  LayoutDashboard
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function AdminQuickAccess() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('tier')
          .eq('id', user.id)
          .single();
        
        if (profile?.tier === 'admin') {
          setIsAdmin(true);
        }
      }
    }
    checkAdmin();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + A to toggle or jump
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [supabase]);

  if (!isAdmin) return null;

  const menuItems = [
    { name: "Command Center", href: "/admin", icon: LayoutDashboard, color: "text-blue-500" },
    { name: "Content Manager", href: "/admin/curriculum", icon: BookOpen, color: "text-red-500" },
    { name: "Review Queue", href: "/admin/applications", icon: Users, color: "text-orange-500" },
    { name: "Revenue", href: "/admin/revenue", icon: DollarSign, color: "text-green-500" },
    { name: "Analytics", href: "/admin/cohorts", icon: BarChart3, color: "text-purple-500" },
  ];

  return (
    <>
      {/* Floating Trigger */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 border-2",
            isOpen 
              ? "bg-brand-navy border-brand-orange text-white rotate-90" 
              : "bg-white border-brand-navy/10 text-brand-navy hover:border-brand-orange/40"
          )}
        >
          {isOpen ? <X className="w-5 h-5" /> : <ShieldCheck className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Quick Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-brand-navy/20 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
              className="fixed bottom-24 right-6 w-72 bg-white rounded-3xl shadow-2xl border border-brand-navy/5 overflow-hidden z-[100]"
            >
              <div className="p-6 bg-brand-navy text-white">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-black uppercase tracking-widest text-brand-orange">Admin Quick Nav</h3>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold text-white/60">
                    <Command className="w-2.5 h-2.5" />
                    <span>ALT + A</span>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">System Controller</p>
              </div>

              <div className="p-3 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-brand-navy/5 transition-all group text-left"
                  >
                    <div className={cn("p-2.5 rounded-xl bg-gray-50 group-hover:bg-white transition-colors shadow-sm", item.color)}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-brand-navy group-hover:text-brand-orange transition-colors">
                        {item.name}
                      </p>
                      <p className="text-[10px] font-bold text-brand-navy/30 uppercase tracking-tighter">
                        Jump to Section
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-4 bg-brand-cream/50 border-t border-brand-navy/5">
                <p className="text-[9px] font-bold text-brand-navy/30 text-center uppercase tracking-widest">
                  Secure Admin Session Active
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
