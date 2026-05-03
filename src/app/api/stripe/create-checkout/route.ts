import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PRICE_MAP: Record<string, string> = {
  // ═══ COHORT 3+ (New Model) ═══
  // Doctor 90-Day Intensive
  "intensive-monthly": "PLACEHOLDER_intensive_monthly",     // $697/month recurring
  "intensive-pif": "PLACEHOLDER_intensive_pif",             // $1,797 one-time
  // Doctor Inner Circle
  "inner-circle": "PLACEHOLDER_inner_circle",               // $397/month recurring
  // Founding Member
  "founding-member": "PLACEHOLDER_founding_member",         // $297/month recurring
  // Student 90-Day Intensive
  "student-intensive-monthly": "PLACEHOLDER_student_intensive_monthly", // $197/month recurring
  "student-intensive-pif": "PLACEHOLDER_student_intensive_pif",         // $497 one-time
  // Student Inner Circle
  "student-inner-circle": "PLACEHOLDER_student_inner_circle",           // $97/month recurring

  // ═══ LEGACY (Cohort 1 & 2 — keep active for existing billing) ═══
  "standard-pif": "price_1TMIbJQ4WJOENoxrEKMvkpSn",
  "standard-plan": "price_1TMIcMQ4WJOENoxrsnTbl5pE",
  "pro-pif": "price_1TMIcxQ4WJOENoxrOIzjxwFe",
  "pro-plan": "price_1TMIdRQ4WJOENoxr3LRCze6x",
  "student-standard-pif": "price_1TMIg4Q4WJOENoxr1yTHzAXn",
  "student-standard-plan": "price_1TMIe6Q4WJOENoxrpe96iLSQ",
  "student-pro-pif": "price_1TMIenQ4WJOENoxrXqQnI23v",
  "student-pro-plan": "price_1TMIfOQ4WJOENoxrQNflH2pq",
};

export async function POST(request: Request) {
  try {
    const { priceKey, email, name, applicationId } = await request.json();

    const priceId = PRICE_MAP[priceKey];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid price key" }, { status: 400 });
    }

    const isRecurring = priceKey.endsWith("-plan") || priceKey.includes("monthly") || priceKey === "inner-circle" || priceKey === "student-inner-circle" || priceKey === "founding-member";
    const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://neurochiromastermind.com";
    const displayName = name || "Doctor";

    const session = await stripe.checkout.sessions.create({
      mode: isRecurring ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${SITE}/apply/confirmation?name=${encodeURIComponent(displayName)}&role=enrolled&status=success`,
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
