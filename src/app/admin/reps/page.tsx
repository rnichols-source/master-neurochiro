"use client";

import { useEffect, useState } from "react";
import { fetchAllReps, reviewRep } from "@/app/actions/curriculum-actions";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { Check, Clock, AlertCircle, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

type Rep = {
  id: string;
  user_id: string;
  week_id: number;
  content: string;
  attachment_url: string | null;
  status: string;
  admin_feedback: string | null;
  reviewed_at: string | null;
  submitted_at: string;
  profiles: { full_name: string; email: string; track: string } | null;
  weeks: { title: string; week_number: number; track: string } | null;
};

export default function AdminRepsPage() {
  const [reps, setReps] = useState<Rep[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<"all" | "submitted" | "reviewed" | "needs_revision">("all");
  const [trackFilter, setTrackFilter] = useState<"all" | "doctor" | "student">("all");

  useEffect(() => {
    loadReps();
  }, []);

  async function loadReps() {
    setLoading(true);
    const result = await fetchAllReps();
    if (result.success && result.data) {
      setReps(result.data as Rep[]);
    }
    setLoading(false);
  }

  async function handleReview(repId: string, status: "reviewed" | "needs_revision") {
    const fb = feedback[repId] || "";
    const result = await reviewRep(repId, status, fb);
    if (result.success) {
      await loadReps();
      setExpandedId(null);
    }
  }

  const filtered = reps.filter(r => {
    if (filter !== "all" && r.status !== filter) return false;
    if (trackFilter !== "all" && r.weeks?.track !== trackFilter) return false;
    return true;
  });

  const submitted = reps.filter(r => r.status === "submitted").length;
  const reviewed = reps.filter(r => r.status === "reviewed").length;
  const needsRevision = reps.filter(r => r.status === "needs_revision").length;

  if (loading) {
    return (
      <div className="p-8 text-center text-brand-gray">Loading reps...</div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-navy">Rep Submissions</h1>
        <p className="text-sm text-brand-gray font-medium">Review weekly assignments from Above Atlas members.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <EliteCard className="p-4 text-center">
          <p className="text-2xl font-black text-amber-500">{submitted}</p>
          <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">Pending Review</p>
        </EliteCard>
        <EliteCard className="p-4 text-center">
          <p className="text-2xl font-black text-green-600">{reviewed}</p>
          <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">Reviewed</p>
        </EliteCard>
        <EliteCard className="p-4 text-center">
          <p className="text-2xl font-black text-red-500">{needsRevision}</p>
          <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">Needs Revision</p>
        </EliteCard>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "submitted", "reviewed", "needs_revision"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              filter === f
                ? "bg-brand-navy text-white"
                : "bg-white text-brand-navy/50 border border-brand-navy/10 hover:border-brand-navy/30"
            }`}
          >
            {f === "needs_revision" ? "Needs Revision" : f}
          </button>
        ))}
        <div className="w-px bg-brand-navy/10 mx-1" />
        {(["all", "doctor", "student"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTrackFilter(t)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              trackFilter === t
                ? "bg-brand-navy text-white"
                : "bg-white text-brand-navy/50 border border-brand-navy/10 hover:border-brand-navy/30"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Rep List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-center text-brand-gray py-12 text-sm font-medium">No reps match this filter.</p>
        )}
        {filtered.map(rep => {
          const isExpanded = expandedId === rep.id;
          return (
            <EliteCard key={rep.id} className="p-0 overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : rep.id)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-brand-cream/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    rep.status === "submitted" ? "bg-amber-100 text-amber-600" :
                    rep.status === "reviewed" ? "bg-green-100 text-green-600" :
                    "bg-red-100 text-red-600"
                  }`}>
                    {rep.status === "submitted" ? <Clock className="w-4 h-4" /> :
                     rep.status === "reviewed" ? <Check className="w-4 h-4" /> :
                     <AlertCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-navy">
                      {rep.profiles?.full_name || "Unknown"}{" "}
                      <span className="text-brand-navy/40 font-medium">
                        Week {rep.weeks?.week_number}: {rep.weeks?.title}
                      </span>
                    </p>
                    <p className="text-xs text-brand-gray">
                      {rep.weeks?.track === "student" ? "Student" : "Doctor"} track
                      {" "}· Submitted {new Date(rep.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-navy/30" /> : <ChevronDown className="w-4 h-4 text-brand-navy/30" />}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 border-t border-brand-navy/5 space-y-4">
                  <div className="pt-4">
                    <p className="text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-2">Submission</p>
                    <div className="bg-brand-cream rounded-xl p-4 text-sm text-brand-navy whitespace-pre-wrap">
                      {rep.content}
                    </div>
                  </div>

                  {rep.attachment_url && (
                    <a href={rep.attachment_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline">
                      View attachment
                    </a>
                  )}

                  {rep.admin_feedback && (
                    <div>
                      <p className="text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-2">Your Feedback</p>
                      <div className="bg-green-50 rounded-xl p-4 text-sm text-brand-navy whitespace-pre-wrap">
                        {rep.admin_feedback}
                      </div>
                    </div>
                  )}

                  {rep.status === "submitted" && (
                    <div className="space-y-3">
                      <textarea
                        placeholder="Feedback (optional for approve, required for revision)"
                        rows={3}
                        className="w-full bg-white border border-brand-navy/10 rounded-xl p-4 text-sm focus:ring-2 focus:ring-brand-navy/20 focus:border-transparent"
                        value={feedback[rep.id] || ""}
                        onChange={e => setFeedback({ ...feedback, [rep.id]: e.target.value })}
                      />
                      <div className="flex gap-3">
                        <BrandButton
                          variant="primary"
                          className="text-sm px-6"
                          onClick={() => handleReview(rep.id, "reviewed")}
                        >
                          <Check className="w-4 h-4 mr-2" /> Approve
                        </BrandButton>
                        <BrandButton
                          variant="outline"
                          className="text-sm px-6"
                          onClick={() => handleReview(rep.id, "needs_revision")}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" /> Request Revision
                        </BrandButton>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </EliteCard>
          );
        })}
      </div>
    </div>
  );
}
