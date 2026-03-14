const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function findInactivePaidMembers() {
  console.log("Finding paid members without active accounts...");
  
  // 1. Find all paid applications
  const { data: paidApps, error: appError } = await supabase
    .from('applications')
    .select('full_name, email, status')
    .eq('status', 'paid');

  if (appError) {
    console.error("Error fetching applications:", appError);
    return;
  }

  // 2. Find profiles that are still in 'pending_profile' status or missing
  const { data: profiles, error: profError } = await supabase
    .from('profiles')
    .select('email, status, tier');

  if (profError) {
    console.error("Error fetching profiles:", profError);
    return;
  }

  console.log("\n--- PAID APPLICANTS STATUS ---");
  paidApps.forEach(app => {
    const profile = profiles.find(p => p.email === app.email);
    const profileStatus = profile ? profile.status : 'NO_PROFILE_RECORD';
    console.log(`Name: ${app.full_name} | Email: ${app.email} | Profile Status: ${profileStatus}`);
  });
  
  console.log("\n--- OTHER INACTIVE PROFILES ---");
  profiles.forEach(p => {
    if (p.status === 'pending_profile' || p.status === 'invited') {
        console.log(`Email: ${p.email} | Status: ${p.status} | Tier: ${p.tier}`);
    }
  });
}

findInactivePaidMembers();
