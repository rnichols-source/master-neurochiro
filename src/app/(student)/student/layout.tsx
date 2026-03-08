"use client";

import Sidebar from "./Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { LayoutDashboard, MessageSquare, Bell, User } from "lucide-react";

const navItems = [
  { name: "Home", href: "/student/dashboard", icon: LayoutDashboard },
  { name: "Messages", href: "/student/messages", icon: MessageSquare },
  { name: "Alerts", href: "/student/notifications", icon: Bell },
  { name: "Profile", href: "/student/profile", icon: User },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-neuro-cream overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto relative scroll-smooth bg-neuro-cream pb-24 md:pb-0">
          {children}
        </main>
      </div>
      <MobileBottomNav items={navItems} />
    </div>
  );
}
