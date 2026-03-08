import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neuro-cream pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-5xl font-heading font-black text-neuro-navy">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
          <p>Your privacy is important to us. This policy outlines how we handle your data...</p>
          <h2 className="text-2xl font-bold text-neuro-navy mt-8 mb-4">1. Data Collection</h2>
          <p>We collect information you provide directly to us when you create an account, post a job, or apply for a position.</p>
          <h2 className="text-2xl font-bold text-neuro-navy mt-8 mb-4">2. Use of Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services.</p>
        </div>
      </div>
    </div>
  );
}
