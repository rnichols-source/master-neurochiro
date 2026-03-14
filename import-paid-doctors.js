const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i+1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += char;
    }
  }
  result.push(cur.trim());
  return result;
}

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Handle multi-line cells by joining lines that are inside quotes
  const rawLines = content.split(/\r?\n/);
  const lines = [];
  let buffer = '';
  for (const line of rawLines) {
    buffer += (buffer ? '\n' : '') + line;
    const quoteCount = (buffer.match(/"/g) || []).length;
    if (quoteCount % 2 === 0) {
      if (buffer.trim()) lines.push(buffer);
      buffer = '';
    }
  }
  
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i];
    });
    return obj;
  });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function geocode(address) {
  if (!address) return null;
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'NeuroChiroImporter/1.0 (admin@neurochiromastermind.com)'
        }
      }
    );
    if (!response.ok) return null;
    const results = await response.json();
    if (results && results.length > 0) {
      return {
        lat: parseFloat(results[0].lat),
        lon: parseFloat(results[0].lon)
      };
    }
  } catch (err) {
    console.error(`Geocoding error for ${address}:`, err.message);
  }
  return null;
}

async function runImport() {
  const files = [
    "../Downloads/Apply to Join the National Nervous System-Based Chiropractic Directory (Responses) - Form Responses 1.csv",
    "../Downloads/Apply to Join the National Nervous System-Based part 2 Chiropractic Directory (Responses) - Form Responses 1.csv"
  ];

  console.log("Starting doctor import process...");

  for (const file of files) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    console.log(`Processing file: ${file}`);
    const data = parseCSV(filePath);
    console.log(`Found ${data.length} entries.`);

    for (const entry of data) {
      const email = entry['Email Address'];
      const fullName = entry['Full Name'];
      const practiceName = entry['Practice Name'];
      const address = entry['Practice Address (City, State, Zip, Country)'];
      const website = entry['Website URL'];
      const focus = entry['How would you describe your practice focus? (Example: Family care, Pediatric, Prenatal, Corrective, Tonal, etc.)'];
      const unique = entry['What makes your practice unique?'];
      const testimonials = entry['Paste 1–2 recent Google reviews or patient testimonials'];
      const why = entry['Why do you want to be listed in this directory?'];
      const igHandle = entry['Instagram or Facebook Handle'];

      if (!email || !fullName) {
        console.warn("Skipping entry with missing email or name.");
        continue;
      }

      // Check for existing doctor
      const { data: existing } = await supabase
        .from('doctors')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existing) {
        console.log(`Doctor with email ${email} already exists. Skipping.`);
        continue;
      }

      console.log(`Importing: ${fullName} (${practiceName})`);

      // Geocode
      const coords = await geocode(address);
      if (coords) {
        console.log(`  - Geocoded to: ${coords.lat}, ${coords.lon}`);
      } else {
        console.warn(`  - Could not geocode address: ${address}`);
      }

      // Prepare fields
      const names = fullName.split(' ');
      const firstName = names[0];
      const lastName = names.slice(1).join(' ') || 'Specialist';
      const slug = `dr-${fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Math.floor(Math.random()*1000)}`;
      
      const bio = [
        focus ? `Focus: ${focus}` : null,
        unique ? `About: ${unique}` : null,
        testimonials ? `Testimonials: ${testimonials}` : null,
        why ? `Mission: ${why}` : null
      ].filter(Boolean).join('\n\n');

      const { error: insertError } = await supabase
        .from('doctors')
        .insert({
          first_name: firstName,
          last_name: lastName,
          clinic_name: practiceName,
          email: email,
          address: address,
          website_url: website,
          instagram_url: igHandle?.startsWith('@') ? `https://instagram.com/${igHandle.slice(1)}` : igHandle,
          bio: bio,
          specialties: focus ? focus.split(',').map(s => s.trim()) : [],
          latitude: coords ? coords.lat : 0,
          longitude: coords ? coords.lon : 0,
          verification_status: 'verified',
          membership_tier: 'starter',
          region_code: 'US',
          slug: slug
        });

      if (insertError) {
        console.error(`  - Error inserting ${fullName}:`, insertError);
      } else {
        console.log(`  - Successfully imported ${fullName}.`);
      }

      // Rate limit geocoding
      await sleep(1100);
    }
  }

  console.log("Import process complete.");
}

runImport().catch(console.error);
