import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { RevenueForecaster } from "@/components/portal/pro/RevenueForecaster";
import { createClient } from "@/lib/supabase/server";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { Lock, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function ForecasterPage() {
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

  const isPro = userTier === 'pro' || userTier === 'admin';

  return (
    <DashboardLayout>
      {isPro ? (
        <RevenueForecaster />
      ) : (
        <div className="flex items-center justify-center min-h-[70vh]">
          <EliteCard className="max-w-xl p-12 text-center space-y-8 bg-brand-navy text-white border-none shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Star className="w-32 h-32 text-brand-orange" />
            </div>

            <div className="w-20 h-20 mx-auto bg-brand-orange/20 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-brand-orange" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-black tracking-tight">Pro Tier Exclusive</h2>
              <p className="text-white/60 font-medium leading-relaxed">
                The Revenue Forecaster uses predictive neurological data to map your clinic's growth to $100k/mo. This tool is reserved for Pro members.
              </p>
            </div>

            <div className="pt-6 space-y-4">
              <Link href="/pricing">
                <BrandButton variant="primary" className="w-full py-4 text-sm gap-2">
                  Upgrade to Pro Mastery <ArrowRight className="w-4 h-4" />
                </BrandButton>
              </Link>
              <Link href="/portal">
                <button className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                  Return to Standard Dashboard
                </button>
              </Link>
            </div>
          </EliteCard>
        </div>
      )}
    </DashboardLayout>
  );
}
