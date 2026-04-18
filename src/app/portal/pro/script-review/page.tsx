import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { createClient } from "@/lib/supabase/server";
import { fetchScriptReviews } from "@/app/actions/pro-actions";
import { Lock } from "lucide-react";
import { BrandButton } from "@/components/ui/elite-ui";
import Link from "next/link";
import { ScriptReviewClient } from "./ScriptReviewClient";

export default async function ScriptReviewPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let userTier = "standard";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("tier")
      .eq("id", user.id)
      .single();
    if (profile) userTier = profile.tier;
  }

  const isPro = userTier === "pro" || userTier === "admin";

  if (!isPro) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 space-y-4">
          <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-brand-orange" />
          </div>
          <h2 className="text-xl font-black text-brand-navy">Pro Members Only</h2>
          <p className="text-sm text-brand-gray font-medium max-w-md mx-auto">Upgrade to Pro to unlock private coaching, direct messaging, script reviews, and more.</p>
          <Link href="/pricing"><BrandButton variant="primary" className="px-8 py-3">View Pro Options</BrandButton></Link>
        </div>
      </DashboardLayout>
    );
  }

  const { data: reviews } = await fetchScriptReviews();

  return (
    <DashboardLayout>
      <ScriptReviewClient initialReviews={reviews || []} />
    </DashboardLayout>
  );
}
