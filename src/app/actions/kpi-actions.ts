"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { awardMasteryPoints } from "./mastery-actions";

export interface KPIEntry {
  week_start_date: string;
  collections: number;
  new_patients: number;
  patient_visits: number;
  care_plans_accepted?: number;
  marketing_spend?: number;
  wins?: string;
  bottlenecks?: string;
}

export async function submitKPIEntry(entry: KPIEntry) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("kpi_entries")
    .upsert([
      {
        user_id: user.id,
        ...entry,
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("KPI Submission Error:", error);
    return { success: false, error: error.message };
  }

  // Award points for consistency
  await awardMasteryPoints('kpi_entry');

  revalidatePath("/kpi");
  revalidatePath("/dashboard");
  revalidatePath("/portal/engine");
  return { success: true, data };
}

export async function fetchKPIEntries() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  try {
    const { data, error } = await supabase
      .from("kpi_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("week_start_date", { ascending: true });

    if (error) {
      if (error.code === 'PGRST205' || error.message.includes('not find')) {
        return { success: true, data: [] }; // Fallback to empty list
      }
      console.error("KPI Fetch Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: "System error fetching KPIs" };
  }
}
