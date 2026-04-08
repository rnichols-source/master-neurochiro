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
    // Tier detection: check multiple possible fields from different form versions
    const tierRaw = application.responses?.tier_applying
      || application.responses?.tier_requested
      || application.responses?.application_type
      || '';
    const notesLower = (notes || '').toLowerCase();
    const isPro = tierRaw.toLowerCase().includes('pro') || notesLower.includes('pro');
    
    console.log(`[ADMIN] Detected Tier: ${isPro ? 'PRO' : 'STANDARD'} from raw: "${tierRaw}"`);

    // Choose correct PIF and Plan links based on tier
    let checkoutUrl = isPro 
      ? process.env.NEXT_PUBLIC_STRIPE_PRO_PIF 
      : process.env.NEXT_PUBLIC_STRIPE_STANDARD_PIF;
    
    let planUrl = isPro
      ? process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN
      : process.env.NEXT_PUBLIC_STRIPE_STANDARD_PLAN;

    // --- ENHANCED GEAR: Convert to Smart Links ---
    const generateSmartLink = (base: string | undefined) => {
      if (!base) return undefined;
      const url = new URL(base);
      url.searchParams.set('client_reference_id', id);
      url.searchParams.set('prefilled_email', application.email);
      return url.toString();
    };

    const smartCheckoutUrl = generateSmartLink(checkoutUrl);
    const smartPlanUrl = generateSmartLink(planUrl);

    console.log(`[ADMIN] Sending Smart Links to ${application.email}: PIF: ${smartCheckoutUrl}, Plan: ${smartPlanUrl}`);

    if (smartCheckoutUrl) {
      try {
        const emailResult = await EmailService.sendAppApproved(
          application.email, 
          application.full_name, 
          smartCheckoutUrl, 
          smartPlanUrl
        );
        console.log(`[ADMIN] Email sent result:`, emailResult);
      } catch (emailErr) {
        console.error("[ADMIN] Email Error:", emailErr);
      }
    }
  }

  // 2b. Handle Rejection Email
  if (status === 'rejected') {
    try {
      await EmailService.sendAppRejected(application.email, application.full_name);
    } catch (emailErr) {
      console.error("[ADMIN] Rejection email error:", emailErr);
    }
  }

  // 2c. Handle Waitlist Email
  if (status === 'waitlist') {
    try {
      await EmailService.sendAppWaitlisted(application.email, application.full_name);
    } catch (emailErr) {
      console.error("[ADMIN] Waitlist email error:", emailErr);
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
