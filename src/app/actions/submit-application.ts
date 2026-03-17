"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { EmailService } from "@/lib/emails";
import { NotificationService } from "@/lib/notifications";

export interface ApplicationFormData {
  application_type?: 'Mastermind' | 'Private Coaching' | 'Council';
  // Section 1: Identity
  full_name: string;
  email: string;
  phone: string;
  instagram?: string;
  current_role: string;
  years_in_practice?: string;
  years_practicing?: string; // Legacy/Mastermind
  clinic_status?: string;
  student_info?: string; // Mastermind
  in_mastermind?: string; // Council

  // Section 2: Numbers
  weekly_visits: string;
  monthly_revenue?: string;
  avg_collection_per_visit?: string;
  conversion_percentage?: string;
  conversion_rate?: string; // Mastermind
  pva?: string;
  team_size?: string;
  track_kpis?: string;
  current_phase?: string; // Council
  biggest_focus?: string; // Council

  // Section 3: Systems (Private Coaching / Council)
  rof_system?: string;
  care_plans?: string;
  patient_flow?: string;
  retention_system?: string;
  team_training?: string;
  implementation_level?: string; // Council
  holding_back_description?: string; // Council

  // Section 4: Problems / Fit
  challenges?: string[];
  biggest_struggle?: string; // Mastermind
  not_working_description?: string;
  why_join_council?: string; // Council
  ongoing_impact?: string; // Council

  // Section 5: Outcome
  success_goals?: string[];
  success_vision?: string; // Mastermind
  life_impact?: string;

  // Section 6: Commitment
  willing_to_implement?: string;
  willing_to_change?: string;
  willing_to_be_coached?: string; // Council
  open_to_feedback?: string; // Council
  coachable?: string;
  why_now: string;
  investment_preparedness?: string;
  investment_readiness?: string; // Council
  financial_ready?: string; // Mastermind
  seriousness_score?: number; // Mastermind
}

export async function submitApplication(formData: ApplicationFormData) {
  // 0. Data Shield: Strict Validation
  if (!formData.full_name || typeof formData.full_name !== 'string' || formData.full_name.length < 2) {
    return { success: false, error: "Invalid name format" };
  }
  if (!formData.email || !formData.email.includes('@')) {
    return { success: false, error: "Valid email required" };
  }
  
  const supabase = await createClient();

  // 1. Calculate Readiness Score (Combined Logic)
  let score = 0;
  
  // Mastermind Legacy Scoring
  if (formData.seriousness_score) score += Number(formData.seriousness_score) * 5;
  if (formData.current_role?.includes("Clinic Owner")) score += 10;
  if (formData.financial_ready?.includes("Yes")) score += 10;

  // Private Coaching Scoring
  if (formData.investment_preparedness === 'Yes') score += 30;
  else if (formData.investment_preparedness === 'Serious but options') score += 15;
  
  if (formData.willing_to_change === 'Yes') score += 10;
  if (formData.willing_to_implement === 'Yes') score += 10;
  if (formData.coachable === 'Yes') score += 10;

  // Data Intelligence Factor
  if (formData.track_kpis === 'Yes') score += 10;
  if (formData.conversion_percentage || formData.conversion_rate) score += 5;
  if (formData.pva) score += 5;

  // Clinical Status Factor
  if (formData.clinic_status === 'Scaling') score += 20;
  else if (formData.clinic_status === 'Growing') score += 15;
  else if (formData.clinic_status === 'Plateaued') score += 10;

  // Council Specific Scoring
  if (formData.application_type === 'Council') {
    if (formData.in_mastermind === 'Yes') score += 20;
    if (formData.implementation_level === 'Fully Consistent') score += 20;
    else if (formData.implementation_level === 'A Lot') score += 10;
    
    if (formData.willing_to_be_coached === 'Yes') score += 10;
    if (formData.open_to_feedback === 'Yes') score += 10;
    if (formData.investment_readiness?.includes('Ready')) score += 20;
  }

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
    if ((error as any).code === '23505') {
      return { success: false, error: "This email has a pending application." };
    }
    return { success: false, error: error.message };
  }

  // 4. Trigger Instant Admin Notification
  try {
    await NotificationService.sendNewApplicationAlert({
      full_name: data.full_name,
      email: data.email,
      score: data.score,
      role: formData.current_role,
      id: data.id,
      type: formData.application_type
    });
  } catch (notifyError) {
    console.error("Error sending admin notification:", notifyError);
  }

  // 5. Trigger "Received" email to Applicant
  try {
    await EmailService.sendAppReceived(applicationData.email, applicationData.full_name);
  } catch (emailError) {
    console.error("Error sending receipt email:", emailError);
  }

  revalidatePath("/admin/applications");
  return { success: true, data };
}
