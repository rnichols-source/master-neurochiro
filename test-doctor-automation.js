const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testAutomation() {
  console.log("=== STARTING DOCTOR AUTOMATION TEST ===");
  
  const testId = '00000000-0000-0000-0000-' + Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
  const testEmail = `test-doctor-${Math.floor(Math.random() * 10000)}@example.com`;
  const testName = "Dr. Test Automation";
  const testPhone = "555-0199";

  console.log(`[STEP 1] Simulating Signup for: ${testName} (${testEmail})`);
  
  // We simulate the trigger by manually inserting into auth.users (if we have permissions)
  // or by simulating the handle_new_user logic if direct auth.users insert is restricted.
  // Since we are using service role, we can do direct calls to the public tables to see if trigger worked.
  
  // Actually, let's just trigger the database function logic manually to test the flow
  // 1. Profile Creation
  console.log(`[STEP 2] Creating Profile...`);
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: testId,
      email: testEmail,
      full_name: testName,
      role: 'doctor'
    });

  if (profileError) {
    console.error("  - FAILED: Profile creation error:", profileError);
    return;
  }
  console.log("  - SUCCESS: Profile created.");

  // 2. Doctor Provisioning (Matches ONBOARDING_TRIGGERS.sql logic)
  console.log(`[STEP 3] Provisioning Doctor Record...`);
  const firstName = testName.split(' ')[0];
  const lastName = testName.split(' ').slice(1).join(' ') || 'Specialist';
  const slug = 'dr-' + testName.toLowerCase().replace(/ /g, '-').replace(/\./g, '');

  const { error: doctorError } = await supabase
    .from('doctors')
    .insert({
      user_id: testId,
      first_name: firstName,
      last_name: lastName,
      slug: slug,
      verification_status: 'pending',
      clinic_name: 'Test Automation Clinic',
      city: 'Austin',
      region_code: 'US'
    });

  if (doctorError) {
    console.error("  - FAILED: Doctor provisioning error:", doctorError);
    return;
  }
  console.log(`  - SUCCESS: Doctor record provisioned with slug: ${slug}`);

  // 3. Automation Queue Entry
  console.log(`[STEP 4] Enqueueing Welcome Flow...`);
  const { error: queueError } = await supabase
    .from('automation_queue')
    .insert({
      event_type: 'welcome_email',
      payload: {
        userId: testId,
        email: testEmail,
        name: testName,
        role: 'doctor'
      },
      status: 'pending'
    });

  if (queueError) {
    console.error("  - FAILED: Queue entry error:", queueError);
  } else {
    console.log("  - SUCCESS: Welcome automation enqueued.");
  }

  // 4. Geocoding Simulation
  console.log(`[STEP 5] Simulating Geocoding...`);
  // Nominatim call
  const city = "Austin, TX";
  const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`, {
    headers: { 'User-Agent': 'NeuroChiroTest/1.0' }
  });
  const geoData = await geoRes.json();
  
  if (geoData && geoData.length > 0) {
    const { lat, lon } = geoData[0];
    console.log(`  - Found coordinates: ${lat}, ${lon}`);
    const { error: updateError } = await supabase
      .from('doctors')
      .update({ latitude: parseFloat(lat), longitude: parseFloat(lon) })
      .eq('user_id', testId);
    
    if (updateError) console.error("  - FAILED: Update coordinates error:", updateError);
    else console.log("  - SUCCESS: Coordinates updated.");
  } else {
    console.warn("  - WARNING: Could not geocode test city.");
  }

  // 5. Live Listing Activation
  console.log(`[STEP 6] Simulating Payment Success & Verification...`);
  const { error: verifyError } = await supabase
    .from('doctors')
    .update({ verification_status: 'verified' })
    .eq('user_id', testId);

  if (verifyError) {
    console.error("  - FAILED: Verification error:", verifyError);
  } else {
    console.log("  - SUCCESS: Doctor is now VERIFIED and LIVE.");
  }

  // 6. Final Check
  console.log(`[STEP 7] Verifying visibility...`);
  const { data: visible, error: visibleError } = await supabase
    .from('doctors')
    .select('id')
    .eq('user_id', testId)
    .eq('verification_status', 'verified')
    .single();

  if (visible && !visibleError) {
    console.log("=== TEST COMPLETE: DOCTOR IS LIVE ON THE NETWORK! ===");
  } else {
    console.error("=== TEST FAILED: Doctor is not appearing as verified ===");
  }

  // Cleanup?
  // await supabase.from('doctors').delete().eq('user_id', testId);
  // await supabase.from('profiles').delete().eq('id', testId);
}

testAutomation().catch(console.error);
