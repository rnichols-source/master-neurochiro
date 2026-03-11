import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { StripeProcessor } from "@/lib/webhooks/stripe-processor";
import { EmailService } from "@/lib/emails";
import { NotificationService } from "@/lib/notifications";

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

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await StripeProcessor.handleCheckoutSessionCompleted(event.data.object);
        break;
      
      case "invoice.payment_failed":
        const failedInvoice = event.data.object as any;
        const customerEmail = failedInvoice.customer_email;
        const customerName = failedInvoice.customer_name || "Doctor";
        const hostedInvoiceUrl = failedInvoice.hosted_invoice_url;
        
        if (customerEmail) {
          await EmailService.sendPaymentFailed(customerEmail, customerName, hostedInvoiceUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/portal`);
          await NotificationService.sendAdminAlert(`🚨 Payment Failed for ${customerEmail}. Amount: $${(failedInvoice.amount_due / 100).toFixed(2)}`, 'critical');
        }
        break;

      case "invoice.payment_succeeded":
        const succeededInvoice = event.data.object as any;
        // Optionally handle recurring payment success, if needed.
        if (succeededInvoice.billing_reason === 'subscription_cycle') {
           await NotificationService.sendAdminAlert(`✅ Payment Succeeded for ${succeededInvoice.customer_email}. Amount: $${(succeededInvoice.amount_paid / 100).toFixed(2)}`, 'info');
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (e: any) {
    await NotificationService.sendAdminAlert(`🚨 Stripe Webhook Processing Error: ${e.message}`, 'critical');
    return new NextResponse(`Webhook Processing Error`, { status: 500 });
  }

  return new NextResponse("Webhook Received", { status: 200 });
}
