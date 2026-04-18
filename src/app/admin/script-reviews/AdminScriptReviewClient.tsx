"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { FileText, CheckCircle, Clock, ChevronDown, ChevronUp, Send } from "lucide-react";
import { reviewScript } from "@/app/actions/pro-actions";

interface ScriptReview {
  id: string;
  title: string;
  script_type: string;
  content: string;
  feedback: string | null;
  status: string;
  submitted_at: string;
  reviewed_at: string | null;
  profiles?: { full_name: string | null; email: string } | null;
}

const SCRIPT_TYPE_LABELS: Record<string, string> = {
  "day-1": "Day 1",
  "day-2": "Day 2",
  rof: "ROF",
  "objection-response": "Objection Response",
  "care-plan": "Care Plan",
  other: "Other",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function AdminScriptReviewClient({ initialReviews }: { initialReviews: ScriptReview[] }) {
  const [reviews, setReviews] = useState<ScriptReview[]>(initialReviews);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const handleSaveFeedback = async (reviewId: string) => {
    const feedback = feedbackText[reviewId]?.trim();
    if (!feedback) return;
    setSaving(reviewId);
    const result = await reviewScript(reviewId, feedback);
    if (result.success) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? { ...r, feedback, status: "reviewed", reviewed_at: new Date().toISOString() }
            : r
        )
      );
    }
    setSaving(null);
  };

  const pendingReviews = reviews.filter((r) => r.status === "pending");
  const completedReviews = reviews.filter((r) => r.status === "reviewed");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Script Reviews</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Review and provide feedback on member scripts.</p>
      </div>

      {/* Pending */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-brand-orange ml-2 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5" /> Pending Review ({pendingReviews.length})
        </h3>
        {pendingReviews.length === 0 ? (
          <EliteCard className="p-8 text-center">
            <p className="text-sm text-brand-gray font-medium">No pending script reviews. All caught up!</p>
          </EliteCard>
        ) : (
          pendingReviews.map((review) => (
            <EliteCard key={review.id} className="p-0 overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-brand-cream/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-brand-navy">{review.title}</h4>
                    <p className="text-xs text-brand-navy/40 font-medium">
                      {review.profiles?.full_name || review.profiles?.email || "Unknown"} &middot;{" "}
                      {SCRIPT_TYPE_LABELS[review.script_type] || review.script_type} &middot;{" "}
                      {formatDate(review.submitted_at)}
                    </p>
                  </div>
                </div>
                {expandedId === review.id ? (
                  <ChevronUp className="w-5 h-5 text-brand-navy/30" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-brand-navy/30" />
                )}
              </button>

              {expandedId === review.id && (
                <div className="px-6 pb-6 space-y-4 border-t border-brand-navy/5 pt-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-brand-navy/40 mb-2">Script Content</p>
                    <div className="bg-brand-cream/30 rounded-xl p-4 max-h-80 overflow-y-auto">
                      <p className="text-sm text-brand-navy/80 font-medium whitespace-pre-wrap leading-relaxed">{review.content}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Your Feedback</label>
                    <textarea
                      rows={4}
                      value={feedbackText[review.id] || ""}
                      onChange={(e) => setFeedbackText((prev) => ({ ...prev, [review.id]: e.target.value }))}
                      placeholder="Write your feedback here..."
                      className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20 resize-none"
                    />
                  </div>
                  <BrandButton
                    variant="accent"
                    onClick={() => handleSaveFeedback(review.id)}
                    disabled={!feedbackText[review.id]?.trim() || saving === review.id}
                    isLoading={saving === review.id}
                    className="px-8 py-3 gap-2"
                  >
                    <Send className="w-4 h-4" /> Save Feedback
                  </BrandButton>
                </div>
              )}
            </EliteCard>
          ))
        )}
      </div>

      {/* Completed */}
      {completedReviews.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-green-600 ml-2 flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5" /> Reviewed ({completedReviews.length})
          </h3>
          {completedReviews.map((review) => (
            <EliteCard key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-black text-brand-navy">{review.title}</h4>
                  <p className="text-xs text-brand-navy/40 font-medium">
                    {review.profiles?.full_name || review.profiles?.email || "Unknown"} &middot;{" "}
                    {SCRIPT_TYPE_LABELS[review.script_type] || review.script_type}
                  </p>
                </div>
                <span className="text-xs font-black uppercase px-2 py-1 rounded-md bg-green-500/10 text-green-600">
                  Reviewed
                </span>
              </div>
              {review.feedback && (
                <div className="mt-3 border-l-4 border-brand-orange/40 pl-4">
                  <p className="text-sm text-brand-navy/70 font-medium whitespace-pre-wrap">{review.feedback}</p>
                </div>
              )}
            </EliteCard>
          ))}
        </div>
      )}
    </div>
  );
}
