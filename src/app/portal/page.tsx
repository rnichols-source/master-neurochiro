import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { OnboardingChecklist } from "@/components/portal/OnboardingChecklist";
import { LiveSessionTimer } from "@/components/portal/LiveSessionTimer";
import { KPISnapshotCard } from "@/components/portal/KPISnapshotCard";
import { WinsFeed } from "@/components/portal/wins-feed";
import { WelcomeBanner } from "@/components/portal/WelcomeBanner";
import { WeeklyFocusCard } from "@/components/portal/WeeklyFocusCard";
import { createClient } from "@/lib/supabase/server";
import { fetchNextCall } from "@/app/actions/call-actions";
import { fetchCurriculumWithProgress } from "@/app/actions/curriculum-actions";
import { fetchKPIEntries } from "@/app/actions/kpi-actions";
import { ArrowRight, BookOpen, BarChart3 } from "lucide-react";
import Link from "next/link";

export default async function PortalDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isFirstLogin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_first_login")
      .eq("id", user.id)
      .single();
    isFirstLogin = !!profile?.is_first_login;
  }

  // Fetch curriculum progress
  const curriculumResult = await fetchCurriculumWithProgress();
  const weeks = curriculumResult.success && curriculumResult.data ? curriculumResult.data : [];
  const completedWeeks = weeks.filter((w: any) => w.status === "completed").length;
  const activeWeek = weeks.find((w: any) => w.status === "active") || weeks[0];

  // Fetch next call
  const callResult = await fetchNextCall();
  const nextCall = callResult.data;

  // Check if call is within 7 days
  let showCall = false;
  if (nextCall?.call_time) {
    const callDate = new Date(nextCall.call_time);
    const now = new Date();
    const diff = callDate.getTime() - now.getTime();
    showCall = diff > 0 && diff < 7 * 24 * 60 * 60 * 1000;
  }

  // Fetch KPI data
  const kpiResult = await fetchKPIEntries();
  const kpiData = kpiResult.success && kpiResult.data ? kpiResult.data : [];
  const latestKPI = kpiData.length > 0 ? kpiData[kpiData.length - 1] : null;
  const previousKPI = kpiData.length > 1 ? kpiData[kpiData.length - 2] : null;

  return (
    <DashboardLayout>
      <OnboardingChecklist isFirstLogin={isFirstLogin} />

      <div className="space-y-6">
        {/* Welcome banner for new members */}
        {isFirstLogin && <WelcomeBanner />}

        {/* Page Title */}
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-brand-gray font-medium mt-1">Your progress at a glance.</p>
        </div>

        {/* This Week's Focus */}
        <WeeklyFocusCard weekNumber={activeWeek?.week_number || 0} completedWeeks={completedWeeks} />

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Card 1: Current Module */}
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-brand-orange" />
                <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">
                  Current Module
                </span>
              </div>

              {activeWeek ? (
                <>
                  <h2 className="text-lg font-black text-brand-navy leading-snug mb-1">
                    Week {activeWeek.week_number}
                  </h2>
                  <p className="text-sm text-brand-gray font-medium mb-4 line-clamp-2">
                    {activeWeek.title}
                  </p>

                  {/* Progress bar */}
                  <div className="mb-1 flex justify-between text-xs font-bold text-brand-gray">
                    <span>Overall Progress</span>
                    <span className="text-brand-orange">{completedWeeks} of 8 weeks</span>
                  </div>
                  <div className="h-2 w-full bg-brand-navy/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-orange rounded-full transition-all"
                      style={{ width: `${(completedWeeks / 8) * 100}%` }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-black text-brand-navy mb-1">
                    Ready to Start
                  </h2>
                  <p className="text-sm text-brand-gray font-medium mb-4">
                    Your 8-week journey begins with Week 1.
                  </p>
                </>
              )}
            </div>

            <Link
              href={activeWeek ? `/portal/curriculum/${activeWeek.slug}` : "/portal/curriculum"}
              className="mt-4 flex items-center justify-center gap-2 bg-brand-navy text-white rounded-xl py-3.5 px-5 text-sm font-bold hover:bg-brand-black transition-colors active:scale-[0.98] touch-target"
            >
              {activeWeek ? "Continue" : "Start Week 1"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Next Live Call (conditional) */}
          {showCall && nextCall && (
            <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm">
              <LiveSessionTimer
                nextSessionTime={nextCall.call_time}
                zoomUrl={nextCall.zoom_url}
              />
            </div>
          )}

          {/* Card 3: KPI Snapshot */}
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-brand-orange" />
              <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">
                Your Numbers
              </span>
            </div>

            <KPISnapshotCard latest={latestKPI} previous={previousKPI} />
          </div>
        </div>

        {/* Community Wins */}
        <WinsFeed />

        {/* Post-completion Council prompt */}
        {completedWeeks >= 8 && (
          <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6 shadow-sm text-center space-y-3">
            <h3 className="text-lg font-black text-brand-navy">
              Congratulations — you&apos;ve completed the 8-week program!
            </h3>
            <p className="text-sm text-brand-gray font-medium">
              Ready for the next level? The Council is ongoing coaching for
              graduates who want to keep growing.
            </p>
            <Link
              href="/council"
              className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white rounded-xl py-3 px-6 text-sm font-bold hover:bg-[#B35520] transition-colors active:scale-[0.98]"
            >
              Learn About The Council
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
