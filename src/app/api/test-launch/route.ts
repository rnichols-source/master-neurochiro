import { NextResponse } from "next/server";
import { submitApplication } from "@/app/actions/submit-application";
import { updateApplicationStatus } from "@/app/actions/update-application";

export async function GET() {
  try {
    const email = "rnichols@alignlife.com";
    
    // 1. Submit Application
    console.log("Step 1: Submitting application...");
    const subRes = await submitApplication({
      full_name: "Dr. Raymond Nichols",
      email: email,
      years_practicing: "15+ years",
      monthly_collections: "$60k+",
      tier: "pro"
    });
    
    if (!subRes.success) throw new Error(`Submit Error: ${subRes.error}`);
    const appId = subRes.data.id;

    // 2. Force Approve
    console.log("Step 2: Approving application...");
    const appRes = await updateApplicationStatus(appId, "approved", "Launch Test Approval");
    
    if (!appRes.success) throw new Error(`Approval Error: ${appRes.error}`);

    return NextResponse.json({ 
      success: true, 
      message: "Launch sequence complete. Check your inbox at rnichols@alignlife.com!",
      application_id: appId
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
