import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import OpenAI from "openai";

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
      const openai = new OpenAI({ apiKey: openAIApiKey });
      
      // Convert Blob to a Buffer for OpenAI
      const buffer = Buffer.from(await audioFile.arrayBuffer());
      
      // We need to create a "File-like" object that OpenAI's SDK accepts
      // This is the standard way in modern Node.js/Next.js
      const file = new File([buffer], 'audio.webm', { type: 'audio/webm' });

      // 1. Transcription using Whisper
      const transResponse = await openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
      });
      transcription = transResponse.text;

      // 2. Clinical Analysis using GPT-4
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          { 
            role: "system", 
            content: "You are an elite clinical performance coach for chiropractors. Analyze the doctor's audio debrief. Identify the primary clinical bottleneck. Suggest a specific 1-sentence high-leverage action, and recommend which 'Phase' or 'Week' of training they should review (e.g. Identity, Neurology, Comms, Philosophy, Business, Care Plans, Emotional IQ, Strategy). Keep it sharp, direct, and elite." 
          },
          { role: "user", content: transcription }
        ]
      });
      
      recommendation = completion.choices[0].message.content || "Focus on your clinical certainty and revisit Week 1.";
      moduleLink = "/portal/curriculum"; // Default link
    } else {
      // PRO-DEMO MOCK: This triggers if no API key is found
      transcription = "I had a rough day. A patient asked if they have to come forever, and I froze up. My conversion rate today was terrible.";
      recommendation = "You hesitated on the 'Retention' frame. Review Phase 3: The Language of Neurology to solidify your 'Forever Care' objection handling.";
      moduleLink = "/portal/curriculum";
    }

    // 3. Log the Bottleneck to their KPI Intelligence Log
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
        .update({ 
          bottlenecks: `${latestEntry.bottlenecks ? latestEntry.bottlenecks + '\n\n' : ''}Neural Dump (${new Date().toLocaleTimeString()}): ${transcription}` 
        })
        .eq('id', latestEntry.id);
    }

    return NextResponse.json({ 
      success: true, 
      transcription, 
      recommendation,
      moduleLink
    });

  } catch (error: any) {
    console.error("Neural Dump Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Internal Server Error" 
    }, { status: 500 });
  }
}
