import { NextResponse } from "next/server";
import { submitApplication } from "@/app/actions/submit-application";

export async function GET() {
  try {
    const res = await submitApplication({
      full_name: "Action Test Doctor",
      email: "action_test@example.com",
      years_practicing: "8-15 years",
      monthly_collections: "$60k+",
      tier: "pro"
    });
    return NextResponse.json(res);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
