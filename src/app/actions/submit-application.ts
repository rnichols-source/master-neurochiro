"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { EmailService } from "@/lib/emails";
import { NotificationService } from "@/lib/notifications";

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
  // 0. Data Shield: Strict Validation
  if (!formData.full_name || typeof formData.full_name !== 'string' || formData.full_name.length < 2) {
    return { success: false, error: "Invalid name format" };
  }
  if (!formData.email || !formData.email.includes('@')) {
    return { success: false, error: "Valid email required" };
  }
  
  // Safe string conversion for logic fields to prevent crashes
  const currentRole = String(formData.current_role || "");
  const yearsPracticing = String(formData.years_practicing || "");
  const monthlyRevenue = String(formData.monthly_revenue || "");

  const supabase = await createClient();

  // 1. Calculate Score (Robust logic)
  let score = 0;
  score += (Number(formData.seriousness_score) || 0) * 5; 
  
  if (currentRole.includes("Clinic Owner")) score += 20;
  if (yearsPracticing.includes("5") || yearsPracticing.includes("10")) score += 15;
  if (monthlyRevenue.includes("50k") || monthlyRevenue.includes("100k")) score += 15;

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

  // 4. Trigger Instant Phone Notification (Discord/Slack Webhook)
  try {
    await NotificationService.sendNewApplicationAlert({
      full_name: data.full_name,
      email: data.email,
      score: data.score,
      role: formData.current_role,
      id: data.id
    });
  } catch (notifyError) {
    console.error("Error sending admin notification:", notifyError);
  }

  // 5. Trigger "Received" email
  try {
    await EmailService.sendAppReceived(applicationData.email, applicationData.full_name);
  } catch (emailError) {
    console.error("Error sending receipt email:", emailError);
  }

  revalidatePath("/admin/applications");
  return { success: true, data };
}
