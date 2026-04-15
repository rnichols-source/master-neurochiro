import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PRICE_MAP: Record<string, string> = {
  // Doctors
  "standard-pif": "price_1TMIbJQ4WJOENoxrEKMvkpSn",
  "standard-plan": "price_1TMIcMQ4WJOENoxrsnTbl5pE",
  "pro-pif": "price_1TMIcxQ4WJOENoxrOIzjxwFe",
  "pro-plan": "price_1TMIdRQ4WJOENoxr3LRCze6x",
  // Students
  "student-standard-pif": "price_1TMIg4Q4WJOENoxr1yTHzAXn",
  "student-standard-plan": "price_1TMIe6Q4WJOENoxrpe96iLSQ",
  "student-pro-pif": "price_1TMIenQ4WJOENoxrXqQnI23v",
  "student-pro-plan": "price_1TMIfOQ4WJOENoxrQNflH2pq",
};

export async function POST(request: Request) {
  try {
    const { priceKey, email, applicationId } = await request.json();

    const priceId = PRICE_MAP[priceKey];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid price key" }, { status: 400 });
    }

    const isRecurring = priceKey.endsWith("-plan");
    const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://neurochiromastermind.com";

    const session = await stripe.checkout.sessions.create({
      mode: isRecurring ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${SITE}/apply/confirmation?name=${encodeURIComponent("Doctor")}&role=enrolled&status=success`,
      cancel_url: `${SITE}/pricing`,
      ...(email && { customer_email: email }),
      ...(applicationId && { client_reference_id: applicationId }),
      ...(isRecurring && {
        subscription_data: {
          metadata: {
            price_key: priceKey,
            ...(applicationId && { application_id: applicationId }),
          },
        },
      }),
      ...(!isRecurring && {
        payment_intent_data: {
          metadata: {
            price_key: priceKey,
            ...(applicationId && { application_id: applicationId }),
          },
        },
      }),
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
