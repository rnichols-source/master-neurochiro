import { NextResponse } from "next/server";
import { StripeProcessor } from "@/lib/webhooks/stripe-processor";

export async function POST(req: Request) {
  // Check if we are in development/local
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Forbidden in Production", { status: 403 });
  }

  try {
    const body = await req.json();
    
    if (body.type === "checkout.session.completed") {
      await StripeProcessor.handleCheckoutSessionCompleted(body.data.object);
      return new NextResponse("Test Webhook Processed", { status: 200 });
    }

    return new NextResponse("Unsupported Test Event", { status: 400 });
  } catch (err: any) {
    return new NextResponse(`Test Error: ${err.message}`, { status: 500 });
  }
}
