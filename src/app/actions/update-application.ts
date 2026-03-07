"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { stripe } from "@/lib/stripe";
import { EmailService } from "@/lib/emails";

export async function updateApplicationStatus(id: string, status: string, notes: string = "", cohort: string = "") {
  const supabase = await createClient();
  console.log(`[ADMIN] Updating application ${id} to ${status} (Cohort: ${cohort})`);

  // 1. Get Application Details
  const { data: application } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();

  if (!application) {
    console.error(`[ADMIN] Application ${id} not found`);
    return { success: false, error: "Application not found" };
  }

  // 2. Handle Approval Logic (Payment Link)
  if (status === 'approved') {
    // Robust tier detection based on the form data
    const tierRaw = application.responses?.tier_applying || application.responses?.tier_requested || 'standard';
    const isPro = tierRaw.toLowerCase().includes('pro');
    
    console.log(`[ADMIN] Detected Tier: ${isPro ? 'PRO' : 'STANDARD'} from raw: "${tierRaw}"`);

    // Choose correct PIF link based on tier
    let checkoutUrl = isPro 
      ? process.env.NEXT_PUBLIC_STRIPE_PRO_PIF 
      : process.env.NEXT_PUBLIC_STRIPE_STANDARD_PIF;

    // --- ENHANCED GEAR: Convert to Smart Link ---
    if (checkoutUrl) {
      const url = new URL(checkoutUrl);
      url.searchParams.set('client_reference_id', id);
      url.searchParams.set('prefilled_email', application.email);
      checkoutUrl = url.toString();
    }

    console.log(`[ADMIN] Sending Smart Link to ${application.email}: ${checkoutUrl}`);

    if (checkoutUrl) {
      try {
        const emailResult = await EmailService.sendAppApproved(application.email, application.full_name, checkoutUrl);
        console.log(`[ADMIN] Email sent result:`, emailResult);
      } catch (emailErr) {
        console.error("[ADMIN] Email Error:", emailErr);
      }
    } else {
      console.warn("[ADMIN] WARNING: No Stripe checkout URL found in environment variables!");
    }
  }

  // 3. Update Database
  const { data, error } = await supabase
    .from("applications")
    .update({ 
      status: status,
      admin_notes: notes,
      responses: {
        ...(application.responses || {}),
        cohort: cohort,
        approved_at: status === 'approved' ? new Date().toISOString() : null
      },
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error(`[ADMIN] DB Update Error:`, error);
    return { success: false, error: error.message };
  }

  console.log(`[ADMIN] Successfully updated application ${id}`);
  revalidatePath("/admin/applications");
  return { success: true, data };
}
