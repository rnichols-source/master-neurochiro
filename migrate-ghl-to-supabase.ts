import { createAdminClient } from './src/lib/supabase/admin';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

async function migrate() {
  const supabase = createAdminClient();
  const csvPath = path.resolve('../Downloads/Export_Contacts_undefined_Mar_2026_8_51_PM.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(`Parsed ${records.length} records from CSV.`);

  for (const record of records) {
    const email = record['Email'];
    const firstName = record['First Name'];
    const lastName = record['Last Name'];
    const phone = record['Phone'];
    const fullName = `${firstName} ${lastName}`;

    console.log(`Processing: ${fullName} (${email})`);

    // Upsert into applications table as 'approved'
    // This is the trigger for the activation system
    const { error: appError } = await supabase
      .from('applications')
      .upsert({
        email,
        full_name: fullName,
        phone,
        status: 'approved',
        responses: { source: 'ghl_migration', business_name: record['Business Name'] },
        updated_at: new Date().toISOString()
      }, { onConflict: 'email' });

    if (appError) {
      console.error(`Error importing ${email}:`, appError.message);
    } else {
      console.log(`Successfully staged ${email} for activation.`);
    }
  }
}

migrate();
