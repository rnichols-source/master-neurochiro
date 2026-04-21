"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Bell, Megaphone, BookOpen, Calendar, MessageSquare, FileText, CheckCheck } from "lucide-react";
import { fetchNotifications, markAsRead, markAllAsRead, getUnreadCount } from "@/app/actions/notification-actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  title: string;
  message: string | null;
  type: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getIcon(type: string) {
  switch (type) {
    case "announcement":
      return <Megaphone className="w-4 h-4 text-brand-orange" />;
    case "new_content":
      return <BookOpen className="w-4 h-4 text-brand-orange" />;
    case "call_reminder":
      return <Calendar className="w-4 h-4 text-brand-orange" />;
    case "message":
      return <MessageSquare className="w-4 h-4 text-brand-orange" />;
    case "script_reviewed":
      return <FileText className="w-4 h-4 text-brand-orange" />;
    case "coaching_note":
      return <BookOpen className="w-4 h-4 text-brand-orange" />;
    default:
      return <Bell className="w-4 h-4 text-brand-orange" />;
  }
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const loadData = useCallback(async () => {
    const count = await getUnreadCount();
    setUnreadCount(count);
    if (open) {
      const result = await fetchNotifications();
      if (result.success) setNotifications(result.data as Notification[]);
    }
  }, [open]);

  // Initial load + polling
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [loadData]);

  // Load full list when dropdown opens
  useEffect(() => {
    if (open) {
      fetchNotifications().then((result) => {
        if (result.success) setNotifications(result.data as Notification[]);
      });
    }
  }, [open]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleNotificationClick(n: Notification) {
    if (!n.is_read) {
      await markAsRead(n.id);
      setNotifications((prev) =>
        prev.map((item) => (item.id === n.id ? { ...item, is_read: true } : item))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
    setOpen(false);
    if (n.link) router.push(n.link);
  }

  async function handleMarkAllRead() {
    await markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
  }

  const displayed = notifications.slice(0, 10);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl hover:bg-brand-navy/5 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-brand-navy" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-brand-navy/5 max-h-96 overflow-y-auto z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-brand-navy/5">
            <h3 className="text-sm font-black text-brand-navy">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1 text-xs font-bold text-brand-orange hover:text-[#B35520] transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* Notification list */}
          {displayed.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <Bell className="w-8 h-8 text-brand-navy/20 mx-auto mb-2" />
              <p className="text-sm text-brand-gray font-medium">No notifications yet</p>
            </div>
          ) : (
            <div>
              {displayed.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={cn(
                    "w-full text-left px-4 py-3 hover:bg-brand-cream/50 transition-colors flex gap-3",
                    !n.is_read && "border-l-2 border-l-brand-orange bg-brand-orange/5"
                  )}
                >
                  <div className="mt-0.5 shrink-0">{getIcon(n.type)}</div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-sm text-brand-navy leading-snug",
                        !n.is_read ? "font-bold" : "font-medium"
                      )}
                    >
                      {n.title}
                    </p>
                    {n.message && (
                      <p className="text-xs text-brand-gray font-medium mt-0.5 line-clamp-2">
                        {n.message}
                      </p>
                    )}
                    <p className="text-[10px] text-brand-gray/60 font-medium mt-1">
                      {timeAgo(n.created_at)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
