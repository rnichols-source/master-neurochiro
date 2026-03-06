import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data: weeks, error: weeksError } = await supabase
    .from('weeks')
    .select('*');

  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('*');

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*');

  return NextResponse.json({
    weeks: { data: weeks, error: weeksError },
    modules: { data: modules, error: modulesError },
    profiles: { data: profiles, error: profilesError }
  });
}
