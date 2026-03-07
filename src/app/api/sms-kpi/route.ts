import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = formData.get('Body') as string;
    const fromPhone = formData.get('From') as string; // e.g. "+1234567890"

    if (!body || !fromPhone) {
      return NextResponse.json({ success: false, error: "Missing data" }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();

    // 1. Find user by phone number
    const { data: user } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name')
      .eq('phone', fromPhone)
      .single();

    if (!user) {
      // If we don't know this number, ignore or send error (Twilio expects TwiML)
      return new NextResponse("<Response><Message>Phone number not recognized by NeuroChiro OS.</Message></Response>", {
        headers: { "Content-Type": "text/xml" }
      });
    }

    // 2. Parse the body. Expected: "150, 12, 14000" (Visits, NP, Collections)
    const parts = body.split(',').map(s => s.trim());
    if (parts.length < 3) {
      return new NextResponse("<Response><Message>Format incorrect. Please send: [Visits], [New Patients], [Collections]</Message></Response>", {
        headers: { "Content-Type": "text/xml" }
      });
    }

    const visits = parseInt(parts[0], 10);
    const np = parseInt(parts[1], 10);
    // Remove 'k' or '$' if present
    const collectionsStr = parts[2].replace(/k/i, '000').replace(/[^0-9.]/g, '');
    const collections = parseFloat(collectionsStr);

    // 3. Insert into KPI entries
    const monday = new Date();
    monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7); // Get recent Monday

    await supabaseAdmin
      .from('kpi_entries')
      .upsert({
        user_id: user.id,
        week_start_date: monday.toISOString().split('T')[0],
        patient_visits: visits,
        new_patients: np,
        collections: collections,
        wins: "Logged via Ghost Admin SMS"
      }, { onConflict: 'user_id,week_start_date' });

    // 4. Send Confirmation via TwiML
    const twiml = `
      <Response>
        <Message>Logged, Dr. ${user.full_name.split(' ')[0]}. Revenue Velocity engine updated. Rest well.</Message>
      </Response>
    `;

    return new NextResponse(twiml, {
      headers: { "Content-Type": "text/xml" }
    });

  } catch (error) {
    console.error("SMS KPI Error:", error);
    return new NextResponse("<Response><Message>System error. Please log via portal.</Message></Response>", {
      headers: { "Content-Type": "text/xml" }
    });
  }
}
