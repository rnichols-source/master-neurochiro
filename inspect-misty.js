const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectApp() {
  console.log("Inspecting Dr. Misty Senz's application...");
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('email', 'drmistysenz@gmail.com')
    .single();

  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log("APPLICATION DATA:");
  console.log(JSON.stringify(data, null, 2));
}

inspectApp();
