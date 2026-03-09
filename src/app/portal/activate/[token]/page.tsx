import { validateActivationToken } from "@/app/actions/onboarding-actions";
import ActivationClient from "./ActivationClient";
import { notFound } from "next/navigation";

export default async function ActivatePage(props: { params: Promise<{ token: string }> }) {
  const { token } = await props.params;
  
  const validation = await validateActivationToken(token);
  
  if (!validation.success) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-4xl font-black text-white tracking-tight">Invalid Link</h1>
          <p className="text-white/60">This activation link is invalid or has expired. Please contact support if you believe this is an error.</p>
        </div>
      </div>
    );
  }

  return <ActivationClient token={token} invitation={validation.data} isPreview={validation.isPreview} />;
}
