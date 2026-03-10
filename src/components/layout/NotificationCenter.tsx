"use client";

import { useState } from "react";
import { Bell, X, Calendar, Zap, Star, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'call' | 'resource' | 'announcement' | 'system';
  icon: any;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Upcoming Live Call',
    description: 'The Weekly Implementation call starts in 2 hours. Get your cases ready.',
    time: '2h ago',
    type: 'call',
    icon: Calendar
  },
  {
    id: '2',
    title: 'New Playbook Unlocked',
    description: 'Phase 6: Care Plan Architecture is now available in your portal.',
    time: '5h ago',
    type: 'resource',
    icon: Zap
  }
];

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-brand-navy/60 hover:text-brand-navy hover:bg-brand-navy/5 rounded-full transition-all"
      >
        <Bell className="w-4 h-4 md:w-5 md:h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-orange rounded-full border-2 border-white" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-50 md:hidden" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-brand-navy/5 overflow-hidden z-[60]"
            >
              <div className="p-6 border-b border-brand-navy/5 flex justify-between items-center bg-brand-navy text-white">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest">Notifications</h3>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{unreadCount} New Alerts</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-brand-navy/5">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-6 hover:bg-brand-navy/5 transition-colors cursor-pointer group">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0 group-hover:bg-brand-orange transition-colors">
                            <n.icon size={18} className="text-brand-orange group-hover:text-white transition-colors" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-black text-brand-navy leading-tight">{n.title}</p>
                            <p className="text-[11px] text-brand-gray font-medium leading-relaxed">{n.description}</p>
                            <p className="text-[9px] text-brand-navy/30 font-black uppercase tracking-widest pt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell size={24} className="text-brand-navy/20" />
                    </div>
                    <p className="text-sm font-black text-brand-navy uppercase tracking-tighter">No notifications yet</p>
                    <p className="text-xs text-brand-gray font-medium mt-1">We'll alert you when there's an update.</p>
                  </div>
                )}
              </div>

              {notifications.length > 0 && (
                <button 
                  onClick={() => setNotifications([])}
                  className="w-full py-4 bg-brand-navy/5 text-[10px] font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-orange transition-colors border-t border-brand-navy/5"
                >
                  Mark All as Read
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
