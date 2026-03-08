import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neuro-cream pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-5xl font-heading font-black text-neuro-navy">Terms of Service</h1>
        <div className="prose prose-slate max-w-none bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
          <p>By using the NeuroChiro platform, you agree to the following terms...</p>
          <h2 className="text-2xl font-bold text-neuro-navy mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using our services, you agree to be bound by these terms.</p>
          <h2 className="text-2xl font-bold text-neuro-navy mt-8 mb-4">2. User Accounts</h2>
          <p>You are responsible for maintaining the security of your account and for all activities that occur under your account.</p>
        </div>
      </div>
    </div>
  );
}
