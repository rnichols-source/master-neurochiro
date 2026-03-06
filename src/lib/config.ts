const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'RESEND_API_KEY',
  'NEXT_PUBLIC_SITE_URL'
];

export function validateEnv() {
  const missing = requiredEnvVars.filter(v => !process.env[v]);
  
  if (missing.length > 0) {
    console.warn(`⚠️ PRODUCTION READINESS WARNING: Missing required environment variables: ${missing.join(', ')}`);
    return false;
  }
  
  return true;
}

export const config = {
  isProd: process.env.NODE_ENV === 'production',
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    standardPIF: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PIF,
    proPIF: process.env.NEXT_PUBLIC_STRIPE_PRO_PIF,
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRole: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  }
};
