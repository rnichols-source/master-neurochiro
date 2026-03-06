import { NextResponse } from "next/server";
import { submitApplication } from "@/app/actions/submit-application";

export async function GET() {
  try {
    const res = await submitApplication({
      full_name: "Action Test Doctor",
      email: "action_test@example.com",
      years_practicing: "8-15 years",
      monthly_revenue: "$60k+",
      tier_applying: "pro"
    } as any);
    return NextResponse.json(res);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
