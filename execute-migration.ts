import { createAdminClient } from './src/lib/supabase/admin';
import { activateApprovedMembers } from './src/app/actions/activation-actions';

async function run() {
  const supabase = createAdminClient();
  
  const contacts = [
    { email: "hanleng1129@outlook.com", first: "Michelle", last: "Leong", phone: "+61481941209", business: "CCA" },
    { email: "mmhill@sbcglobal.net", first: "Melissa", last: "Hill", phone: "+12814554318", business: "Aloepath Wellness" },
    { email: "kayceebenz@gmail.com", first: "Kaycee", last: "Benz", phone: "+17159371540", business: "Kaycee Benz" },
    { email: "mrouskasdc@gmail.com", first: "Michael", last: "Rouskas", phone: "+19734528272", business: "Rouskas Family Chiropractic" },
    { email: "ashton.2001@yahoo.com", first: "Ashton", last: "Rowoldt", phone: "+14322544170", business: "Student" },
    { email: "ramps73@yahoo.co.uk", first: "Rekha", last: "Rampersad", phone: "+447951558473", business: "Chiropractic Wellness Centre" }
  ];

  console.log(`Phase 1: Staging ${contacts.length} contacts.`);

  for (const contact of contacts) {
    const fullName = `${contact.first} ${contact.last}`;
    const { error } = await supabase
      .from('applications')
      .upsert({
        email: contact.email,
        full_name: fullName,
        phone: contact.phone,
        status: 'approved',
        responses: { source: 'ghl_migration', business_name: contact.business }
      }, { onConflict: 'email' });
    
    if (error) console.error(`Error staging ${contact.email}:`, error.message);
    else console.log(`Staged: ${contact.email}`);
  }

  console.log("Phase 2: Activating accounts and sending emails...");
  try {
    const result = await activateApprovedMembers();
    console.log("Activation Result:", JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Activation Failed:", err);
  }
}

run();
