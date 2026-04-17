"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function fetchWorksheet(worksheetType: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("worksheets")
    .select("*")
    .eq("user_id", user.id)
    .eq("worksheet_type", worksheetType)
    .single();

  if (error && error.code !== "PGRST116") return { success: false, error: error.message };
  return { success: true, data: data || null };
}

export async function saveWorksheet(worksheetType: string, responses: Record<string, string>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase
    .from("worksheets")
    .upsert({
      user_id: user.id,
      worksheet_type: worksheetType,
      responses,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,worksheet_type" });

  if (error) return { success: false, error: error.message };
  revalidatePath("/portal/curriculum/week-1-identity/worksheet");
  return { success: true };
}
