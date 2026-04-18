import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { createClient } from "@/lib/supabase/server";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import {
  Lock,
  Star,
  ArrowRight,
  BookOpen,
  BarChart3,
  MessageSquare,
  FileText,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";

const proFeatures = [
  {
    title: "Coaching Notes",
    description: "Private notes and action items from your coaching sessions with Dr. Nichols.",
    href: "/portal/pro/coaching",
    icon: BookOpen,
  },
  {
    title: "Practice Scorecard",
    description: "See how your KPIs compare to the group with personalized recommendations.",
    href: "/portal/pro/scorecard",
    icon: BarChart3,
  },
  {
    title: "Direct Messages",
    description: "Private messaging channel with Dr. Nichols for quick questions and guidance.",
    href: "/portal/pro/messages",
    icon: MessageSquare,
  },
  {
    title: "Script Review",
    description: "Submit recordings or scripts for direct feedback and coaching.",
    href: "/portal/pro/script-review",
    icon: FileText,
  },
  {
    title: "Pro Vault",
    description: "Templates, contracts, scripts, and financial tools for your practice.",
    href: "/portal/pro/vault",
    icon: FolderOpen,
  },
];

export default async function ProHubPage() {
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
        <div className="flex items-center justify-center min-h-[70vh]">
          <EliteCard className="max-w-xl p-12 text-center space-y-8 bg-brand-navy text-white border-none shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Star className="w-32 h-32 text-brand-orange" />
            </div>
            <div className="w-20 h-20 mx-auto bg-brand-orange/20 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-brand-orange" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-black tracking-tight">Pro Suite</h2>
              <p className="text-white/60 font-medium leading-relaxed">
                Exclusive tools and resources for Pro members — coaching, scorecards, direct messaging, and more.
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
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
            Pro Suite
          </h1>
          <p className="text-sm text-brand-gray font-medium mt-1">
            Exclusive tools and resources for Pro members.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {proFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} href={feature.href}>
                <EliteCard className="p-6 h-full hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 bg-brand-navy/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-orange/10 transition-colors">
                      <Icon className="w-5 h-5 text-brand-navy/60 group-hover:text-brand-orange transition-colors" />
                    </div>
                    <h3 className="text-lg font-black text-brand-navy tracking-tight mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-brand-gray font-medium leading-relaxed flex-1">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-sm font-bold text-brand-orange group-hover:text-brand-navy transition-colors">
                      Open <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </EliteCard>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
