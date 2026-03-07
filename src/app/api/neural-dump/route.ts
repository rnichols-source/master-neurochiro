import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const audioFile = formData.get('audio') as Blob;
    
    if (!audioFile) {
      return NextResponse.json({ success: false, error: "No audio provided" }, { status: 400 });
    }

    const openAIApiKey = process.env.OPENAI_API_KEY;
    
    let transcription = "";
    let recommendation = "";
    let moduleLink = "";

    if (openAIApiKey && openAIApiKey !== 'your_openai_api_key') {
      const OpenAI = (await import('openai')).default;
      const openai = new OpenAI({ apiKey: openAIApiKey });
      
      const fileBuffer = Buffer.from(await audioFile.arrayBuffer());
      const file = new File([fileBuffer], 'audio.webm', { type: 'audio/webm' });

      // Transcription
      const transResponse = await openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
      });
      transcription = transResponse.text;

      // Analysis
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: "You are an elite clinical performance coach. Analyze the doctor's audio debrief. Identify the primary clinical bottleneck. Suggest a specific 1-sentence action, and recommend which 'Phase' or 'Week' of training they should review (e.g. Identity, Neurology, Comms, Philosophy, Business, Care Plans, Emotional IQ, Strategy). Keep it sharp and direct." },
          { role: "user", content: transcription }
        ]
      });
      
      recommendation = completion.choices[0].message.content || "Focus on your clinical certainty and revisit Week 1.";
      moduleLink = "/portal/curriculum/week-1"; 
    } else {
      // Mock for immediate demonstration
      transcription = "I had a rough day. A patient asked if they have to come forever, and I froze up. My conversion rate today was terrible.";
      recommendation = "You hesitated on the 'Retention' frame. Review Phase 3: The Language of Neurology to solidify your 'Forever Care' objection handling.";
      moduleLink = "/portal/curriculum/week-3";
    }

    // Save to KPI entries as a "Bottleneck"
    const { data: latestEntry } = await supabase
      .from('kpi_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('week_start_date', { ascending: false })
      .limit(1)
      .single();

    if (latestEntry) {
      await supabase
        .from('kpi_entries')
        .update({ bottlenecks: `${latestEntry.bottlenecks ? latestEntry.bottlenecks + '\n\n' : ''}Neural Dump: ${transcription}` })
        .eq('id', latestEntry.id);
    }

    return NextResponse.json({ 
      success: true, 
      transcription, 
      recommendation,
      moduleLink
    });

  } catch (error) {
    console.error("Neural Dump Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
