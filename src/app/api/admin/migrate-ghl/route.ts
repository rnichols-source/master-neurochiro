import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { activateApprovedMembers } from '@/app/actions/activation-actions';

export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    
    // The contacts from the CSV
    const contacts = [
      { email: "hanleng1129@outlook.com", first: "Michelle", last: "Leong", phone: "+61481941209", business: "CCA" },
      { email: "mmhill@sbcglobal.net", first: "Melissa", last: "Hill", phone: "+12814554318", business: "Aloepath Wellness" },
      { email: "kayceebenz@gmail.com", first: "Kaycee", last: "Benz", phone: "+17159371540", business: "Kaycee Benz" },
      { email: "mrouskasdc@gmail.com", first: "Michael", last: "Rouskas", phone: "+19734528272", business: "Rouskas Family Chiropractic" },
      { email: "ashton.2001@yahoo.com", first: "Ashton", last: "Rowoldt", phone: "+14322544170", business: "Student" },
      { email: "ramps73@yahoo.co.uk", first: "Rekha", last: "Rampersad", phone: "+447951558473", business: "Chiropractic Wellness Centre" }
    ];

    console.log(`Starting migration for ${contacts.length} contacts.`);

    for (const contact of contacts) {
      const fullName = `${contact.first} ${contact.last}`;
      
      const { error: appError } = await supabase
        .from('applications')
        .upsert({
          email: contact.email,
          full_name: fullName,
          phone: contact.phone,
          status: 'approved',
          responses: { source: 'ghl_migration', business_name: contact.business },
          updated_at: new Date().toISOString()
        }, { onConflict: 'email' });

      if (appError) {
        console.error(`Error importing ${contact.email}:`, appError.message);
      }
    }

    // Now trigger the actual activation (account creation + emails)
    console.log("Triggering activation process...");
    const activationResult = await activateApprovedMembers();

    return NextResponse.json({ 
      success: true, 
      migrationCount: contacts.length,
      activationResult 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
