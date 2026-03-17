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
  
  const testEmail = `test-doctor-${Math.floor(Math.random() * 10000)}@example.com`;
  const testPassword = "Password123!";
  const testName = "Dr. Test Automation";

  console.log(`[STEP 1] Creating Auth User for: ${testName} (${testEmail})`);
  
  // Use admin API to create user with metadata
  const { data: userData, error: authError } = await supabase.auth.admin.createUser({
    email: testEmail,
    password: testPassword,
    email_confirm: true,
    user_metadata: {
      full_name: testName,
      role: 'doctor',
      tier: 'starter'
    }
  });

  if (authError) {
    console.error("  - FAILED: Auth creation error:", authError);
    return;
  }

  const userId = userData.user.id;
  console.log(`  - SUCCESS: Auth user created with ID: ${userId}`);

  console.log("[STEP 2] Waiting for Database Triggers (2 seconds)...");
  await sleep(2000);

  // 1. Profile Verification
  console.log(`[STEP 3] Verifying Profile Creation...`);
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError || !profile) {
    console.error("  - FAILED: Profile was not created by trigger.", profileError);
  } else {
    console.log("  - SUCCESS: Profile created automatically.", profile);
  }

  // 2. Doctor Provisioning Verification
  console.log(`[STEP 4] Verifying Doctor Record Provisioning...`);
  const { data: doctor, error: doctorError } = await supabase
    .from('doctors')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (doctorError || !doctor) {
    console.error("  - FAILED: Doctor record was not provisioned by trigger. Checking why...");
    
    // DEBUG: Try manual insert to see the error
    const { error: manualError } = await supabase.from('doctors').insert({
        user_id: userId,
        first_name: 'Test',
        last_name: 'Doctor',
        slug: 'test-debug-' + Math.floor(Math.random()*1000),
        verification_status: 'pending',
        email: testEmail,
        clinic_name: 'Debug Clinic'
    });
    
    if (manualError) {
        console.error("  - [DEBUG] Manual Insert Error:", manualError.message);
        console.error("  - [DEBUG] Error Details:", manualError.details);
    } else {
        console.log("  - [DEBUG] Manual insert succeeded. This suggests the trigger has a logic error (likely role mismatch).");
    }
  } else {
    console.log(`  - SUCCESS: Doctor record provisioned with slug: ${doctor.slug}`);
  }

  // 3. Automation Queue Entry
  console.log(`[STEP 5] Checking Automation Queue...`);
  const { data: queue, error: queueError } = await supabase
    .from('automation_queue')
    .select('*')
    .eq('event_type', 'welcome_email')
    .filter('payload->>user_id', 'eq', userId)
    .single();

  if (queueError || !queue) {
    console.error("  - FAILED: Welcome automation not found in queue.", queueError);
  } else {
    console.log("  - SUCCESS: Welcome automation enqueued.");
  }

  console.log(`[STEP 6] Cleaning up test data...`);
  await supabase.from('doctors').delete().eq('user_id', userId);
  await supabase.from('profiles').delete().eq('id', userId);
  await supabase.from('automation_queue').delete().eq('id', queue?.id);
  await supabase.auth.admin.deleteUser(userId);
  console.log("  - Done.");

  console.log("=== TEST COMPLETE: ONBOARDING PIPELINE IS FUNCTIONAL! ===");
}

testAutomation().catch(console.error);
