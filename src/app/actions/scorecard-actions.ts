"use server";

import { createClient } from "@/lib/supabase/server";

export interface ScorecardMetric {
  label: string;
  value: number;
  previousValue: number;
  percentile: number;
  suffix?: string;
}

export interface ScorecardData {
  metrics: ScorecardMetric[];
  bestMetricLabel: string;
  bestPercentile: number;
  recommendation: {
    message: string;
    link?: string;
    linkLabel?: string;
  };
  weeklyData: {
    week: string;
    patient_visits: number;
    new_patients: number;
    case_acceptance: number;
    collections: number;
  }[];
}

function computePercentile(value: number, allValues: number[]): number {
  if (allValues.length === 0) return 50;
  const sorted = [...allValues].sort((a, b) => a - b);
  const below = sorted.filter((v) => v < value).length;
  return Math.round((below / sorted.length) * 100);
}

export async function fetchScorecard(): Promise<{
  success: boolean;
  data?: ScorecardData;
  error?: string;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  try {
    // Fetch current user's entries (last 8 weeks)
    const { data: myEntries, error: myError } = await supabase
      .from("kpi_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("week_start_date", { ascending: false })
      .limit(8);

    if (myError) {
      console.error("Scorecard fetch error:", myError);
      return { success: false, error: myError.message };
    }

    if (!myEntries || myEntries.length === 0) {
      return { success: true, data: undefined };
    }

    const latest = myEntries[0];
    const previous = myEntries.length > 1 ? myEntries[1] : null;

    // Fetch all members' latest entries for group comparison
    const { data: allLatest } = await supabase
      .from("kpi_entries")
      .select("patient_visits, new_patients, care_plans_accepted, collections, user_id")
      .order("week_start_date", { ascending: false });

    // Deduplicate to get each user's latest entry
    const latestByUser = new Map<string, typeof allLatest extends (infer T)[] | null ? T : never>();
    if (allLatest) {
      for (const entry of allLatest) {
        if (!latestByUser.has(entry.user_id)) {
          latestByUser.set(entry.user_id, entry);
        }
      }
    }

    const groupEntries = Array.from(latestByUser.values());

    const allVisits = groupEntries.map((e) => e.patient_visits || 0);
    const allNewPatients = groupEntries.map((e) => e.new_patients || 0);
    const allCaseAcceptance = groupEntries.map((e) => {
      const np = e.new_patients || 0;
      const ca = e.care_plans_accepted || 0;
      return np > 0 ? Math.round((ca / np) * 100) : 0;
    });
    const allCollections = groupEntries.map((e) => e.collections || 0);

    const latestVisits = latest.patient_visits || 0;
    const latestNewPatients = latest.new_patients || 0;
    const latestAccepted = latest.care_plans_accepted || 0;
    const latestCaseAcceptance =
      latestNewPatients > 0
        ? Math.round((latestAccepted / latestNewPatients) * 100)
        : 0;
    const latestCollections = latest.collections || 0;

    const prevVisits = previous?.patient_visits || 0;
    const prevNewPatients = previous?.new_patients || 0;
    const prevAccepted = previous?.care_plans_accepted || 0;
    const prevCaseAcceptance =
      prevNewPatients > 0
        ? Math.round((prevAccepted / prevNewPatients) * 100)
        : 0;
    const prevCollections = previous?.collections || 0;

    const metrics: ScorecardMetric[] = [
      {
        label: "Patient Visits",
        value: latestVisits,
        previousValue: prevVisits,
        percentile: computePercentile(latestVisits, allVisits),
      },
      {
        label: "New Patients",
        value: latestNewPatients,
        previousValue: prevNewPatients,
        percentile: computePercentile(latestNewPatients, allNewPatients),
      },
      {
        label: "Case Acceptance",
        value: latestCaseAcceptance,
        previousValue: prevCaseAcceptance,
        percentile: computePercentile(latestCaseAcceptance, allCaseAcceptance),
        suffix: "%",
      },
      {
        label: "Collections",
        value: latestCollections,
        previousValue: prevCollections,
        percentile: computePercentile(latestCollections, allCollections),
        suffix: "",
      },
    ];

    // Best metric
    const bestMetric = metrics.reduce((best, m) =>
      m.percentile > best.percentile ? m : best
    );

    // Recommendation logic
    let recommendation: ScorecardData["recommendation"];
    if (latestCaseAcceptance < 65) {
      recommendation = {
        message:
          "Focus on your ROF script. Review Playbook: Day 2.",
        link: "/portal/playbooks",
        linkLabel: "Open Playbook",
      };
    } else if (latestNewPatients < 15) {
      recommendation = {
        message:
          "Focus on reactivation. Review Playbook: Retention.",
        link: "/portal/playbooks",
        linkLabel: "Open Playbook",
      };
    } else if (
      latestCollections > 0 &&
      prevCollections > 0 &&
      latestCollections < prevCollections * 0.9
    ) {
      recommendation = {
        message: "Review pricing in Week 5.",
        link: "/portal/curriculum",
        linkLabel: "Go to Curriculum",
      };
    } else {
      recommendation = {
        message: "Your numbers look strong. Keep pushing.",
      };
    }

    // Weekly data (last 4 weeks, ascending)
    const last4 = myEntries.slice(0, 4).reverse();
    const weeklyData = last4.map((entry) => {
      const np = entry.new_patients || 0;
      const ca = entry.care_plans_accepted || 0;
      return {
        week: entry.week_start_date,
        patient_visits: entry.patient_visits || 0,
        new_patients: np,
        case_acceptance: np > 0 ? Math.round((ca / np) * 100) : 0,
        collections: entry.collections || 0,
      };
    });

    return {
      success: true,
      data: {
        metrics,
        bestMetricLabel: bestMetric.label,
        bestPercentile: bestMetric.percentile,
        recommendation,
        weeklyData,
      },
    };
  } catch (err) {
    console.error("Scorecard system error:", err);
    return { success: false, error: "System error loading scorecard" };
  }
}
