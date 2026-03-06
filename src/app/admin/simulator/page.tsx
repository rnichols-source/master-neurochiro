"use client";

import { useState } from "react";
import { BrandButton } from "@/components/ui/elite-ui";
import { submitApplication } from "@/app/actions/submit-application";
import { updateApplicationStatus } from "@/app/actions/update-application";

export default function AutomationSimulator() {
  const [logs, setLogs] = useState<string[]>([]);
  const [applicationId, setApplicationId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

  const runTest = async () => {
    setLoading(true);
    setLogs([]);
    try {
      // 1. Simulate Submission
      addLog("Step 1: Simulating Application Submission...");
      const subRes = await submitApplication({
        full_name: "Test Doctor",
        email: "test_doctor@example.com",
        years_practicing: "8-15 years",
        monthly_collections: "$60k+",
        tier: "pro"
      });
      
      if (!subRes.success) throw new Error(subRes.error);
      const newId = subRes.data.id;
      setApplicationId(newId);
      addLog(`Success! Application ID: ${newId}`);

      // 2. Simulate Approval
      addLog("Step 2: Simulating Admin Approval...");
      const appRes = await updateApplicationStatus(newId, "approved", "Approved via Simulator");
      if (!appRes.success) throw new Error(appRes.error);
      addLog("Success! Admin status updated.");

      // 3. Simulate Webhook
      addLog("Step 3: Simulating Stripe Webhook (checkout.session.completed)...");
      const webhookRes = await fetch("/api/webhooks/test-trigger", {
        method: "POST",
        body: JSON.stringify({
          type: "checkout.session.completed",
          data: {
            object: {
              customer_details: { email: "test_doctor@example.com", name: "Test Doctor" },
              metadata: { application_id: newId, tier: "pro" }
            }
          }
        })
      });
      
      if (!webhookRes.ok) throw new Error(await webhookRes.text());
      addLog("Success! Webhook processed.");
      addLog("Lifecycle Complete.");
      
    } catch (err: any) {
      addLog(`ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-black text-brand-navy">Automation Simulator</h1>
      <p className="text-brand-gray">Test the end-to-end lifecycle from submission to onboarding.</p>
      
      <div className="bg-white border border-brand-navy/10 rounded-2xl p-8 space-y-6">
        <BrandButton onClick={runTest} disabled={loading} variant="primary">
          {loading ? "Running Tests..." : "Run End-to-End Test Cycle"}
        </BrandButton>
        
        <div className="bg-brand-navy/5 rounded-xl p-6 font-mono text-sm space-y-2 max-h-96 overflow-y-auto">
          {logs.length === 0 && <span className="text-brand-gray/50">Ready to test...</span>}
          {logs.map((log, i) => (
            <div key={i} className={log.includes("ERROR") ? "text-red-600 font-bold" : "text-brand-navy"}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
