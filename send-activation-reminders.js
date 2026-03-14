const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');
const dotenv = require('dotenv');
const path = require('path');

// Fix: path should be .env.local if running from master-neurochiro directory
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

if (!supabaseUrl || !supabaseKey || !resendApiKey) {
  console.error("Missing required environment variables.");
  console.log("URL:", !!supabaseUrl, "Key:", !!supabaseKey, "Resend:", !!resendApiKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(resendApiKey);

const FROM_EMAIL = 'support@neurochirodirectory.com';

const BRAND_STYLE = `
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
  max-width: 600px; 
  margin: 0 auto; 
  padding: 40px 20px; 
  color: #ffffff;
  background-color: #0A192F;
  border-radius: 12px;
`;

function getActivationTemplate(name, activationLink) {
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 0; background-color: #050E1D;">
        <div style="${BRAND_STYLE}">
          <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 11px; font-weight: 800; color: #E67E22; margin-bottom: 20px;">Platform Installation: Day 1</p>
          <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 30px;">Dr. ${name}, Your Command Center Is Ready.</h1>
          <div style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.8); margin-bottom: 40px;">
            <p>Your enrollment in the NeuroChiro Mastermind is complete. To begin the reconstruction of your practice architecture, you must now activate your portal access.</p>
            <p>This is your private environment for curriculum implementation, clinical audits, and the Mastermind OS.</p>
            <p>Click the secure link below to set your password and initialize your account:</p>
          </div>
          
          <div style="margin-bottom: 40px; text-align: center;">
            <a href="${activationLink}" style="background-color: #E67E22; color: #ffffff; padding: 18px 36px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 10px 20px rgba(230, 126, 34, 0.2);">Activate Your Portal</a>
          </div>

          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;" />
          <p style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">
            NeuroChiro Global Mastermind &bull; Precision Clinical Intelligence
          </p>
        </div>
      </body>
    </html>
  `;
}

async function runRescue() {
  console.log("🔍 Scanning for paid members who haven't activated...");
  
  // 1. Get all paid apps
  const { data: paidApps } = await supabase.from('applications').select('*').eq('status', 'paid');
  
  // 2. Get all profiles to see who is missing
  const { data: profiles } = await supabase.from('profiles').select('email');
  const profileEmails = new Set(profiles.map(p => p.email));

  const targets = paidApps.filter(app => !profileEmails.has(app.email));

  if (!targets || targets.length === 0) {
    console.log("✅ All paid members have active profiles. No rescue needed.");
    return;
  }

  console.log(`🚀 Found ${targets.length} members who need activation links.`);

  for (const target of targets) {
    console.log(`   Processing ${target.full_name} (${target.email})...`);
    
    // Check if user already exists in auth
    const { data: magic, error: magicError } = await supabase.auth.admin.generateLink({
        type: 'signup',
        email: target.email,
        options: { redirectTo: 'https://neurochiromastermind.com/portal' }
    });

    let finalLink = magic?.data?.action_link;

    if (magicError || !finalLink) {
        const { data: recovery } = await supabase.auth.admin.generateLink({
            type: 'recovery',
            email: target.email,
            options: { redirectTo: 'https://neurochiromastermind.com/portal' }
        });
        finalLink = recovery?.data?.action_link;
    }

    if (finalLink) {
        await resend.emails.send({
            from: FROM_EMAIL,
            to: target.email,
            subject: 'Action Required: Activate Your Mastermind Portal',
            html: getActivationTemplate(target.full_name, finalLink)
        });
        console.log(`   ✅ Branded activation email sent to ${target.email}`);
    } else {
        // If neither works, the user doesn't exist at all, so invite them
        const { data: invite, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(target.email, {
            data: { full_name: target.full_name },
            redirectTo: 'https://neurochiromastermind.com/portal'
        });
        
        if (inviteError) {
            console.error(`   ❌ Could not invite ${target.email}:`, inviteError.message);
        } else {
            console.log(`   ✅ Supabase invitation sent to ${target.email} (Fallback)`);
        }
    }
  }
}

runRescue();
