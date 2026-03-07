"use server";

import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function createEventCheckout(params: {
  eventId: string;
  ticketTypeId: string;
  category: string;
  tier: string;
}) {
  const supabase = await createClient();
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // 1. Get Ticket Type details from DB
  const { data: ticketType, error } = await supabase
    .from("ticket_types")
    .select("*, events(title, slug)")
    .eq("id", params.ticketTypeId)
    .single();

  if (error || !ticketType) {
    console.error("Ticket Type Error:", error);
    throw new Error("Ticket type not found");
  }

  // 2. Check stock
  if (ticketType.stock_limit && ticketType.sold_count >= ticketType.stock_limit) {
    throw new Error("This ticket tier is sold out.");
  }

  // 3. Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: `${ticketType.events.title} - ${params.category.replace('_', ' ')} (${params.tier.replace('_', ' ')})`,
            description: ticketType.description,
          },
          unit_amount: Math.round(ticketType.price * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${baseUrl}/neurochiro-live/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/neurochiro-live?cancelled=true`,
    metadata: {
      event_id: params.eventId,
      ticket_type_id: params.ticketTypeId,
      category: params.category,
      tier: params.tier,
    },
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return { url: session.url };
}
