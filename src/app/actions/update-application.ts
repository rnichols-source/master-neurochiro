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
    const isStudent = (application.responses?.current_role || '').toLowerCase().includes('student');

    console.log(`[ADMIN] Detected Tier: ${isPro ? 'PRO' : 'STANDARD'}, Student: ${isStudent}`);

    const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://neurochiromastermind.com";
    const prefix = isStudent ? "student-" : "";
    const pifKey = `${prefix}${isPro ? "pro" : "standard"}-pif`;
    const planKey = `${prefix}${isPro ? "pro" : "standard"}-plan`;

    // Create Stripe Checkout Sessions server-side
    const PRICE_MAP: Record<string, string> = {
      "standard-pif": "price_1TMIbJQ4WJOENoxrEKMvkpSn",
      "standard-plan": "price_1TMIcMQ4WJOENoxrsnTbl5pE",
      "pro-pif": "price_1TMIcxQ4WJOENoxrOIzjxwFe",
      "pro-plan": "price_1TMIdRQ4WJOENoxr3LRCze6x",
      "student-standard-pif": "price_1TMIg4Q4WJOENoxr1yTHzAXn",
      "student-standard-plan": "price_1TMIe6Q4WJOENoxrpe96iLSQ",
      "student-pro-pif": "price_1TMIenQ4WJOENoxrXqQnI23v",
      "student-pro-plan": "price_1TMIfOQ4WJOENoxrQNflH2pq",
    };

    try {
      const pifSession = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{ price: PRICE_MAP[pifKey], quantity: 1 }],
        success_url: `${SITE}/apply/confirmation?name=${encodeURIComponent(application.full_name)}&role=enrolled&status=success`,
        cancel_url: `${SITE}/pricing`,
        customer_email: application.email,
        client_reference_id: id,
        payment_intent_data: { metadata: { price_key: pifKey, application_id: id } },
      });

      const planSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: PRICE_MAP[planKey], quantity: 1 }],
        success_url: `${SITE}/apply/confirmation?name=${encodeURIComponent(application.full_name)}&role=enrolled&status=success`,
        cancel_url: `${SITE}/pricing`,
        customer_email: application.email,
        client_reference_id: id,
        subscription_data: { metadata: { price_key: planKey, application_id: id } },
      });

      console.log(`[ADMIN] Checkout sessions created for ${application.email}`);

      await EmailService.sendAppApproved(
        application.email,
        application.full_name,
        pifSession.url!,
        planSession.url || undefined
      );
      console.log(`[ADMIN] Approval email sent to ${application.email}`);
    } catch (emailErr) {
      console.error("[ADMIN] Checkout/Email Error:", emailErr);
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
