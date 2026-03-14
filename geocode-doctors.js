const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function geocodeDoctors() {
  console.log("Starting geocoding process...");

  // Fetch doctors where latitude OR longitude are null, 0, or placeholders (rounded values)
  const { data: doctors, error } = await supabase
    .from('doctors')
    .select('id, address, clinic_name, city, state, country')
    .or('latitude.is.null,longitude.is.null,latitude.eq.0,longitude.eq.0,latitude.eq.43,longitude.eq.-92,latitude.eq.41,longitude.eq.-84,latitude.eq.38,longitude.eq.-87,latitude.eq.35,longitude.eq.-100,latitude.eq.36,longitude.eq.-89,latitude.eq.40,longitude.eq.-85,latitude.eq.39,longitude.eq.-96,latitude.eq.39,longitude.eq.-86,latitude.eq.44,longitude.eq.-91');

  if (error) {
    console.error("Error fetching doctors:", error);
    return;
  }

  if (!doctors || doctors.length === 0) {
    console.log("No doctors found needing geocoding.");
    return;
  }

  console.log(`Found ${doctors.length} doctors to geocode.`);

  for (const doctor of doctors) {
    // Construct the search query. Prefer address if available.
    let searchQuery = doctor.address;
    if (!searchQuery) {
      // Fallback to clinic name + city + state if full address is missing
      const components = [doctor.clinic_name, doctor.city, doctor.state, doctor.country].filter(Boolean);
      searchQuery = components.join(', ');
    }

    if (!searchQuery) {
      console.warn(`Doctor ${doctor.id} has no address info. Skipping.`);
      continue;
    }

    console.log(`Geocoding for doctor ${doctor.id} (${doctor.clinic_name || 'No Name'}): "${searchQuery}"`);

    try {
      // Nominatim API call
      // NOTE: Nominatim policy requires a User-Agent and max 1 request/second
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'NeuroChiroGeocoding/1.0 (admin@neurochiromastermind.com)'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const results = await response.json();

      if (results && results.length > 0) {
        const { lat, lon } = results[0];
        console.log(`  - Success! Found: ${lat}, ${lon}`);

        // Update Supabase
        const { error: updateError } = await supabase
          .from('doctors')
          .update({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon)
          })
          .eq('id', doctor.id);

        if (updateError) {
          console.error(`  - Error updating database for ${doctor.id}:`, updateError);
        } else {
          console.log(`  - Updated doctor ${doctor.id} in database.`);
        }
      } else {
        console.warn(`  - No coordinates found for: "${searchQuery}"`);
      }
    } catch (err) {
      console.error(`  - Failed to geocode doctor ${doctor.id}:`, err.message);
    }

    // Respect Nominatim's usage policy: 1 second delay between requests
    await sleep(1100);
  }

  console.log("Geocoding process complete.");
}

geocodeDoctors().catch(err => {
  console.error("FATAL ERROR:", err);
});
