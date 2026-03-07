const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// 1. Manually parse .env.local to get keys
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const getEnv = (key) => {
  const match = envContent.match(new RegExp(`${key}=(.*)`));
  return match ? match[1].trim() : null;
};

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseServiceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Could not find Supabase credentials in .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createTestAccount() {
  const email = 'test-doctor@neurochiro.com';
  const password = 'Password123!';
  
  console.log(`Creating test account: ${email}`);

  // 1. Create the auth user (bypassing confirmation)
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: 'Dr. Test Nichols' }
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
      console.log("Account already exists. Proceeding to update profile.");
    } else {
      console.error("Auth Error:", authError.message);
      return;
    }
  }

  const userId = authData?.user?.id;

  if (userId) {
    // 2. Create/Update the profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        email: email,
        full_name: 'Dr. Test Nichols',
        tier: 'standard'
      });

    if (profileError) {
      console.error("Profile Error:", profileError.message);
    } else {
      console.log("✅ Test account created and configured successfully!");
      console.log("--------------------------------------------------");
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
      console.log("--------------------------------------------------");
    }
  } else {
    // If user exists, find their ID to ensure profile is standard
    const { data: existingUser } = await supabaseAdmin.from('profiles').select('id').eq('email', email).single();
    if (existingUser) {
      await supabaseAdmin.from('profiles').update({ tier: 'standard' }).eq('id', existingUser.id);
      console.log("✅ Existing test account verified and set to 'standard' tier.");
    }
  }
}

createTestAccount();
