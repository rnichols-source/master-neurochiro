import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { NeuralDumpButton } from "@/components/portal/neural-dump-button";
import { Search, Bell } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function DashboardLayout({ 
  children
}: { 
  children: React.ReactNode;
}) {
  // 1. Fetch user on the server
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let userTier = "standard";
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', user.id)
      .single();
    if (profile) userTier = profile.tier;
  }

  return (
    <div className="flex min-h-screen bg-brand-cream pb-24 md:pb-0">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar userTier={userTier} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 md:h-20 border-b border-brand-navy/5 bg-white/50 backdrop-blur-md flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
             <Link href="/portal" className="md:hidden">
               <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center font-bold text-white text-xs">N</div>
             </Link>
             <div className="relative w-40 md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-brand-navy/30" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-brand-navy/5 border-none rounded-full py-2 pl-8 md:pl-10 pr-4 text-xs focus:ring-2 focus:ring-brand-orange/20 transition-all placeholder:text-brand-navy/30"
                />
             </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="relative p-2 text-brand-navy/60 hover:text-brand-navy hover:bg-brand-navy/5 rounded-full transition-all">
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-orange rounded-full border-2 border-white" />
            </button>
            <div className="hidden md:block h-8 w-px bg-brand-navy/10 mx-2" />
            <div className="hidden md:block text-right">
              <p className="text-[10px] font-black text-brand-navy uppercase tracking-widest">Next Live Call</p>
              <p className="text-[8px] text-brand-orange font-black uppercase tracking-widest">Thursday @ 11AM EST</p>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav userTier={userTier} />
      
      {/* Mobile Floating Actions */}
      <NeuralDumpButton />
    </div>
  );
}
