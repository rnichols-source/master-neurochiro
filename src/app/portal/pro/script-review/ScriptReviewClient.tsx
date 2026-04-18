"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { Send, FileText, CheckCircle, Clock, MessageSquare } from "lucide-react";
import { submitScriptReview } from "@/app/actions/pro-actions";

interface ScriptReview {
  id: string;
  title: string;
  script_type: string;
  content: string;
  feedback: string | null;
  status: string;
  submitted_at: string;
  reviewed_at: string | null;
}

const SCRIPT_TYPES = [
  { value: "day-1", label: "Day 1" },
  { value: "day-2", label: "Day 2" },
  { value: "rof", label: "ROF" },
  { value: "objection-response", label: "Objection Response" },
  { value: "care-plan", label: "Care Plan" },
  { value: "other", label: "Other" },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ScriptReviewClient({ initialReviews }: { initialReviews: ScriptReview[] }) {
  const [reviews, setReviews] = useState<ScriptReview[]>(initialReviews);
  const [title, setTitle] = useState("");
  const [scriptType, setScriptType] = useState("day-1");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    const result = await submitScriptReview(title.trim(), scriptType, content.trim());
    if (result.success) {
      setReviews((prev) => [
        {
          id: crypto.randomUUID(),
          title: title.trim(),
          script_type: scriptType,
          content: content.trim(),
          feedback: null,
          status: "pending",
          submitted_at: new Date().toISOString(),
          reviewed_at: null,
        },
        ...prev,
      ]);
      setTitle("");
      setContent("");
      setScriptType("day-1");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Script Review</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Submit your scripts for direct feedback from Dr. Nichols.</p>
      </div>

      {/* Submit Form */}
      <EliteCard title="Submit a Script" icon={FileText}>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. My Day 1 Consultation Script"
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Script Type</label>
              <select
                value={scriptType}
                onChange={(e) => setScriptType(e.target.value)}
                className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"
              >
                {SCRIPT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Script Content</label>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste or type your full script here..."
              className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20 resize-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <BrandButton variant="primary" type="submit" className="px-8 py-3 gap-2" isLoading={submitting}>
              <Send className="w-4 h-4" /> Submit for Review
            </BrandButton>
            {submitted && (
              <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Submitted!
              </span>
            )}
          </div>
        </form>
      </EliteCard>

      {/* Review History */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-2">Your Submissions</h3>
        {reviews.length === 0 ? (
          <EliteCard className="p-8 text-center">
            <p className="text-sm text-brand-gray font-medium">No scripts submitted yet. Use the form above to get started.</p>
          </EliteCard>
        ) : (
          reviews.map((review) => (
            <EliteCard key={review.id} className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-black text-brand-navy">{review.title}</h4>
                    {review.status === "pending" ? (
                      <span className="text-xs font-black uppercase px-2 py-1 rounded-md bg-brand-orange/10 text-brand-orange flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pending Review
                      </span>
                    ) : (
                      <span className="text-xs font-black uppercase px-2 py-1 rounded-md bg-green-500/10 text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Reviewed
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest whitespace-nowrap ml-4">
                    {formatDate(review.submitted_at)}
                  </span>
                </div>

                <div className="text-xs font-black uppercase tracking-widest text-brand-navy/30">
                  {SCRIPT_TYPES.find((t) => t.value === review.script_type)?.label || review.script_type}
                </div>

                <p className="text-sm text-brand-navy/60 font-medium whitespace-pre-wrap line-clamp-3">{review.content}</p>

                {review.feedback && (
                  <div className="border-2 border-brand-orange/20 rounded-2xl p-5 bg-brand-cream/30 relative">
                    <MessageSquare className="w-4 h-4 text-brand-orange absolute -top-2 -left-2" />
                    <p className="text-xs font-black text-brand-orange uppercase tracking-widest mb-2">Dr. Nichols&apos; Feedback</p>
                    <p className="text-sm text-brand-navy/80 font-medium whitespace-pre-wrap leading-relaxed">{review.feedback}</p>
                  </div>
                )}
              </div>
            </EliteCard>
          ))
        )}
      </div>
    </div>
  );
}
