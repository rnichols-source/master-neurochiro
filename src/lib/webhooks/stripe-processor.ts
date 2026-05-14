import { createAdminClient } from "@/lib/supabase/admin";
import { EmailService } from "@/lib/emails";
import { stripe } from "@/lib/stripe";

interface StripeSession {
  customer_details: {
    email: string;
    name?: string;
  };
  metadata: {
    tier?: string;
    application_id?: string;
  };
}

export const StripeProcessor = {
  async handleCheckoutSessionCompleted(session: any) {
    const supabaseAdmin = createAdminClient();
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || "Doctor";
    
    // Fallback to client_reference_id if metadata is missing (common with Payment Links)
    const applicationId = session.metadata?.application_id || session.client_reference_id;
    let tier = session.metadata?.tier;

    // --- ENHANCED GEAR: If tier is missing, fetch from Application DB ---
    if (!tier && applicationId) {
      const { data: appData } = await supabaseAdmin
        .from("applications")
        .select("responses")
        .eq("id", applicationId)
        .single();
      
      if (appData?.responses?.tier_applying) {
        tier = appData.responses.tier_applying.toLowerCase().includes('pro') ? 'pro' : 'standard';
        console.log(`[STRIPE] Resolved tier ${tier} from application ${applicationId}`);
      }
    }
    
    // Default fallback
    tier = tier || 'standard';

    if (!customerEmail) {
      console.error("No customer email in Stripe session");
      return { success: false, error: "Missing email" };
    }

    console.log(`Processing successful payment for: ${customerEmail}`);

    // --- IDEMPOTENCY GUARD: Prevent double-processing ---
    const { data: existingAttendee } = await supabaseAdmin
      .from("event_attendees")
      .select("id")
      .eq("stripe_session_id", session.id)
      .single();
    
    if (existingAttendee) {
      console.log(`[STRIPE] Session ${session.id} already processed. Skipping.`);
      return { success: true, already_processed: true };
    }

    // --- DUPLICATE SUBSCRIPTION GUARD ---
    // If this checkout created a subscription, check if customer already has others and cancel duplicates
    if (session.subscription && session.customer) {
      try {
        const activeSubs = await stripe.subscriptions.list({
          customer: session.customer,
          status: "active",
        });
        if (activeSubs.data.length > 1) {
          // Keep the oldest subscription, cancel all newer ones
          const sorted = activeSubs.data.sort((a, b) => a.created - b.created);
          const keepSub = sorted[0];
          for (const sub of sorted.slice(1)) {
            console.log(`[STRIPE] Cancelling duplicate subscription ${sub.id} for ${customerEmail} (keeping ${keepSub.id})`);
            await stripe.subscriptions.cancel(sub.id, {
              prorate: true,
            });
            // Refund the latest invoice on the cancelled subscription
            if (sub.latest_invoice) {
              const invoiceId = typeof sub.latest_invoice === 'string' ? sub.latest_invoice : sub.latest_invoice.id;
              try {
                const invoice = await stripe.invoices.retrieve(invoiceId) as any;
                const piId = typeof invoice.payment_intent === 'string' ? invoice.payment_intent : invoice.payment_intent?.id;
                if (piId) {
                  await stripe.refunds.create({ payment_intent: piId });
                  console.log(`[STRIPE] Auto-refunded duplicate charge for ${customerEmail} (invoice ${invoiceId})`);
                }
              } catch (refundErr: any) {
                console.error(`[STRIPE] Failed to auto-refund invoice ${invoiceId}:`, refundErr.message);
              }
            }
          }
        }
      } catch (dupErr: any) {
        console.error(`[STRIPE] Duplicate subscription check failed:`, dupErr.message);
      }
    }

    // --- EVENT FULFILLMENT ---
    const eventId = session.metadata?.event_id;
    const ticketTypeId = session.metadata?.ticket_type_id;

    if (eventId && ticketTypeId) {
      // 1. Insert into event_attendees
      const { error: attendeeError } = await supabaseAdmin
        .from("event_attendees")
        .insert([{
          event_id: eventId,
          ticket_type_id: ticketTypeId,
          full_name: customerName,
          email: customerEmail,
          stripe_session_id: session.id,
          stripe_customer_id: session.customer,
          payment_status: 'paid'
        }]);

      if (attendeeError) console.error("Error inserting attendee:", attendeeError);

      // 2. Increment sold_count in ticket_types
      const { data: ticketType } = await supabaseAdmin
        .from("ticket_types")
        .select("sold_count")
        .eq("id", ticketTypeId)
        .single();
      
      if (ticketType) {
        await supabaseAdmin
          .from("ticket_types")
          .update({ sold_count: (ticketType.sold_count || 0) + 1 })
          .eq("id", ticketTypeId);
      }

      // 3. Send Event Confirmation Email
      const { data: eventData } = await supabaseAdmin.from("events").select("title").eq("id", eventId).single();
      await EmailService.sendEventConfirmation(customerEmail, customerName, eventData?.title || "NeuroChiro Live");

      return { success: true, type: 'event' };
    }

    // --- MEMBERSHIP FULFILLMENT ---
    if (applicationId) {
      // 1. Check if already marked as paid to prevent duplicate onboarding
      const { data: currentApp } = await supabaseAdmin
        .from("applications")
        .select("status")
        .eq("id", applicationId)
        .single();
      
      if (currentApp?.status === 'paid') {
        console.log(`[STRIPE] Application ${applicationId} already paid. Skipping onboarding.`);
        return { success: true, already_processed: true };
      }

      const { error: appError } = await supabaseAdmin
        .from("applications")
        .update({ status: 'paid' })
        .eq("id", applicationId);
      
      if (appError) console.error("Error updating application status:", appError);
    }

    // 2. Automate User Invitation
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY === 'your_service_role_key') {
      console.log("SIMULATION: Skipping real user invitation, missing Service Role Key.");
      return { success: true, simulated: true };
    }

    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(customerEmail, {
      data: { 
        full_name: customerName,
        tier: tier
      },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/portal`
    });

    if (inviteError) {
      console.error("Error inviting user:", inviteError);
      
      // If user already exists, update their tier in profiles
      if (inviteError.message.includes("already registered")) {
        const { data: userData } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("email", customerEmail)
          .single();
        
        if (userData) {
          await supabaseAdmin
            .from("profiles")
            .update({ tier: tier })
            .eq("id", userData.id);
        }
      }
    } else if (inviteData?.user) {
      console.log(`Invite sent successfully to: ${customerEmail}`);
      
      // 3. Immediately ensure profile has correct tier (Upsert to avoid race with trigger)
      await supabaseAdmin
        .from("profiles")
        .upsert({ 
          id: inviteData.user.id,
          email: customerEmail,
          full_name: customerName,
          tier: tier
        });
    }

    // 4. Welcome Email (Tier Based)
    try {
      if (tier === 'pro') {
        await EmailService.sendProWelcome(customerEmail, customerName);
      } else {
        await EmailService.sendWelcome(customerEmail, customerName);
      }
    } catch (emailErr) {
      console.error("Welcome email error:", emailErr);
    }

    return { success: true };
  }
};
