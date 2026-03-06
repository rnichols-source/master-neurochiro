import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { StripeProcessor } from "@/lib/webhooks/stripe-processor";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle specific events
  switch (event.type) {
    case "checkout.session.completed":
      await StripeProcessor.handleCheckoutSessionCompleted(event.data.object);
      break;
    
    // Add other event types here (e.g., subscription deleted)
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse("Webhook Received", { status: 200 });
}
