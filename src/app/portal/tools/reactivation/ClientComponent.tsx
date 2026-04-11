"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Link from "next/link";

const scripts: Record<string, Record<string, string>> = {
  "3-6": {
    phone: `"Hi [Name], this is [Your Name] from [Clinic]. I was reviewing my patient files and noticed it's been a few months since your last visit. I wanted to check in — how have you been feeling? ... If you've noticed any of those old symptoms creeping back, we should get you in before it gets worse. I have a spot open [day]. Would that work for you?"`,
    text: `Hi [Name]! It's Dr. [Your Name]. I was thinking about you today — it's been a few months since your last visit. How are you feeling? If you'd like to come in for a quick check-up, I have some openings this week. Just reply and I'll get you scheduled. 😊`,
    email: `Subject: Checking in on you, [Name]\n\nHi [Name],\n\nIt's been a little while since your last visit, and I wanted to reach out personally.\n\nOften, patients feel great after their initial care plan and don't think they need to come back — until the symptoms return. If you've noticed any tightness, stiffness, or discomfort creeping back, it's a sign your body could use a tune-up.\n\nI'd love to see you for a quick progress check. No pressure — just want to make sure you're still feeling your best.\n\nBook here: [link] or just reply to this email.\n\nDr. [Your Name]`,
  },
  "6-12": {
    phone: `"Hi [Name], this is Dr. [Your Name] from [Clinic]. I know it's been a while — I hope you've been doing well! I'm reaching out because I'm setting aside time this month for patients who haven't been in recently. I'd love to do a quick check-up — just 15 minutes to see where things stand. Would [day] work for you?"`,
    text: `Hey [Name]! Dr. [Your Name] here. It's been a while and I just wanted to check in. I'm opening up some spots this month specifically for patients I haven't seen in a while. Would you like to come in for a quick 15-min check-up? No strings — just want to make sure you're good. 🙌`,
    email: `Subject: It's been a while, [Name] — let's check in\n\nHi [Name],\n\nI noticed it's been about [X] months since your last visit. Life gets busy — I completely understand.\n\nThe reason I'm reaching out is that I've seen a pattern: patients who felt great after care sometimes experience a gradual return of symptoms 6-12 months later. It's subtle at first, but catching it early makes a big difference.\n\nI'm setting aside a few spots this month for returning patients. It's a quick 15-minute check-up — no commitment, just making sure everything is holding.\n\nReply here or call us at [phone].\n\nLooking forward to seeing you,\nDr. [Your Name]`,
  },
  "12+": {
    phone: `"Hi [Name], this is Dr. [Your Name]. I know it's been over a year since we last saw you — and I completely understand. I'm not calling to pressure you into anything. I just wanted to let you know that we're offering a complimentary re-evaluation this month for patients who haven't been in for a while. If you're interested, I'd love to see how you're doing. No obligation."`,
    text: `Hi [Name], it's Dr. [Your Name]. I know it's been a while! I'm offering a free re-evaluation this month for patients I haven't seen in over a year. No pressure at all — just want to make sure you're doing well. Want me to save you a spot? Just reply YES.`,
    email: `Subject: A gift for you, [Name]\n\nHi [Name],\n\nIt's Dr. [Your Name] from [Clinic]. It's been over a year since we last connected, and I wanted to reach out with something special.\n\nThis month, I'm offering a complimentary re-evaluation for returning patients. No strings attached — I just want to check in on how you're doing and see if there's anything we can help with.\n\nYour health matters to me, whether it's been 1 month or 12 months since your last visit.\n\nIf you'd like to take advantage of this, just reply or call us at [phone].\n\nWarm regards,\nDr. [Your Name]`,
  },
};

export function ReactivationClient() {
  const [timeGone, setTimeGone] = useState<string>("3-6");
  const [channel, setChannel] = useState<string>("phone");
  const [copied, setCopied] = useState(false);

  const script = scripts[timeGone]?.[channel] || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-6 pb-20">
        <div>
          <Link href="/portal/tools" className="text-sm text-brand-gray hover:text-brand-navy transition-colors mb-4 inline-block">← Back to Tools</Link>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Reactivation Scripts</h1>
          <p className="text-sm text-brand-gray font-medium mt-1">
            Bring back inactive patients. Pick the scenario and copy the script.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-navy">How long have they been gone?</label>
            <div className="flex gap-2">
              {[
                { value: "3-6", label: "3-6 months" },
                { value: "6-12", label: "6-12 months" },
                { value: "12+", label: "12+ months" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTimeGone(opt.value)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all touch-target ${
                    timeGone === opt.value
                      ? "bg-brand-navy text-white"
                      : "bg-brand-navy/5 text-brand-navy/60 hover:bg-brand-navy/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-navy">How do you want to reach them?</label>
            <div className="flex gap-2">
              {[
                { value: "phone", label: "Phone" },
                { value: "text", label: "Text" },
                { value: "email", label: "Email" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setChannel(opt.value)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all touch-target ${
                    channel === opt.value
                      ? "bg-brand-orange text-white"
                      : "bg-brand-navy/5 text-brand-navy/60 hover:bg-brand-navy/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generated Script */}
        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-brand-navy">Your Script</p>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors"
            >
              {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
            </button>
          </div>
          <div className="bg-brand-cream rounded-xl p-4">
            <p className="text-sm text-brand-navy font-medium leading-relaxed whitespace-pre-line">
              {script}
            </p>
          </div>
          <p className="text-xs text-brand-gray font-medium">
            Replace [Name], [Your Name], [Clinic], [day], [phone], and [link] with your details before sending.
          </p>
        </div>
      </div>
    </>
  );
}
