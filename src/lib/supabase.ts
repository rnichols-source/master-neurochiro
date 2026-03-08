import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase keys missing. Returning mock client.");
    // Return a proxy that mimics the supabase client to prevent crashes
    return new Proxy({}, {
      get: () => () => ({ data: null, error: null, count: 0 })
    }) as any;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
