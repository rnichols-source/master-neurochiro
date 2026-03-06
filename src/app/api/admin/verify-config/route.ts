import { NextResponse } from "next/server";

export async function GET() {
  const config = {
    supabase: {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      service_role: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    stripe: {
      secret: !!process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes("your_"),
      webhook_secret: !!process.env.STRIPE_WEBHOOK_SECRET && !process.env.STRIPE_WEBHOOK_SECRET.includes("your_"),
    },
    resend: {
      api_key: !!process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes("re_your"),
    },
    site: {
      url: !!process.env.NEXT_PUBLIC_SITE_URL,
    }
  };

  const isComplete = Object.values(config).every(group => 
    Object.values(group).every(val => val === true)
  );

  return NextResponse.json({
    is_ready: isComplete,
    status: config,
    missing: Object.entries(config).flatMap(([group, fields]) => 
      Object.entries(fields).filter(([_, exists]) => !exists).map(([field]) => `${group}.${field}`)
    )
  });
}
