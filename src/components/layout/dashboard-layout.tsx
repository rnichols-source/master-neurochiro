import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { NeuralDumpButton } from "@/components/portal/neural-dump-button";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { AccountMenu } from "./AccountMenu";
import { SearchBar } from "./SearchBar";
import { Suspense } from "react";

export async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userTier = "standard";
  let userEmail = "";
  if (user) {
    userEmail = user.email || "";
    const { data: profile } = await supabase
      .from("profiles")
      .select("tier")
      .eq("id", user.id)
      .single();
    if (profile) userTier = profile.tier;
  }

  return (
    <div className="flex min-h-[100dvh] bg-brand-cream">
      {/* Desktop Sidebar — hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar userTier={userTier} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        {/* Top Header */}
        <header className="h-14 md:h-20 border-b border-brand-navy/5 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 safe-top">
          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="md:hidden flex items-center gap-2"
            >
              <div className="w-8 h-8 relative">
                <Image
                  src="/logo-white.png"
                  alt="NeuroChiro"
                  fill
                  className="object-contain bg-brand-navy rounded-lg p-1"
                />
              </div>
            </Link>
            <Suspense
              fallback={
                <div className="relative w-36 md:w-96 h-10 bg-brand-navy/5 rounded-full animate-pulse" />
              }
            >
              <SearchBar />
            </Suspense>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <AccountMenu userEmail={userEmail} userTier={userTier} />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-10">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Mobile Bottom Tab Navigation */}
      <MobileNav userTier={userTier} />

      {/* Floating Actions */}
      <NeuralDumpButton />
    </div>
  );
}
