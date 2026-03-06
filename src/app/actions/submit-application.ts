"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { EmailService } from "@/lib/emails";

export interface ApplicationFormData {
  full_name: string;
  email: string;
  phone: string;
  instagram?: string;
  current_role: string;
  student_info: string;
  years_practicing: string;
  monthly_revenue: string;
  weekly_visits: string;
  conversion_rate: string;
  confidence_score: number;
  stability_score: number;
  biggest_struggle: string;
  success_vision: string;
  prevention_factor: string;
  why_now: string;
  tier_applying: string;
  pro_fit?: string;
  open_analysis: string;
  accountability: string;
  participation: string;
  financial_ready: string;
  seriousness_score: number;
  higher_standard: string;
  why_selected: string;
}

export async function submitApplication(formData: ApplicationFormData) {
  const supabase = await createClient();

  // 1. Calculate Score (Simple logic: based on seriousness and practice stage)
  let score = 0;
  score += (formData.seriousness_score || 0) * 5; // Max 50
  
  if (formData.current_role === "Clinic Owner" || formData.current_role === "Multi-Clinic Owner") score += 20;
  if (formData.years_practicing.includes("5") || formData.years_practicing.includes("10")) score += 15;
  if (formData.monthly_revenue.includes("50k") || formData.monthly_revenue.includes("100k")) score += 15;

  // 2. Map responses to DB fields
  const applicationData = {
    full_name: formData.full_name,
    email: formData.email,
    phone: formData.phone,
    responses: {
      ...formData // Store all raw responses in JSONB for admin review
    },
    score: score,
    status: 'pending'
  };

  // 3. Insert into Supabase
  const { data, error } = await supabase
    .from("applications")
    .insert([applicationData])
    .select()
    .single();

  if (error) {
    console.error("Submission Error:", error);
    return { success: false, error: error.message };
  }

  // 4. Trigger "Received" email
  try {
    await EmailService.sendAppReceived(applicationData.email, applicationData.full_name);
  } catch (emailError) {
    console.error("Error sending receipt email:", emailError);
  }

  revalidatePath("/admin/applications");
  return { success: true, data };
}
