"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import {
  Radio,
  MessageSquare,
  FileText,
  Users,
  Send,
  ArrowLeft,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import {
  generateDMResponse,
  generateScriptFeedback,
} from "@/app/actions/echo-actions";

interface DashboardData {
  unreadDMs: number;
  pendingReviews: number;
  totalConversations: number;
  recentDMs: any[];
  recentReviews: any[];
}

interface InboxItem {
  type: "dm" | "review";
  id: string;
  content: string;
  scriptType?: string;
  date: string;
  senderName: string;
  senderEmail: string;
  senderId: string;
}

interface CommunityPulseData {
  totalPosts: number;
  postsThisWeek: number;
  activePostersThisWeek: number;
  topContributors: { full_name: string; postCount: number }[];
}

interface EchoClientProps {
  dashboard: DashboardData | null;
  inbox: InboxItem[];
  communityPulse: CommunityPulseData | null;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  return `${diffWeeks}w ago`;
}

export function EchoClient({ dashboard, inbox, communityPulse }: EchoClientProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [draftResponse, setDraftResponse] = useState<string>("");
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleDraftResponse(item: InboxItem) {
    setLoadingDraft(true);
    setDraftResponse("");

    if (item.type === "dm") {
      const result = await generateDMResponse(item.content, item.senderName);
      if (result.success && result.data) {
        setDraftResponse(result.data.draft);
      }
    } else {
      const result = await generateScriptFeedback(
        item.content,
        item.scriptType || "general"
      );
      if (result.success && result.data) {
        setDraftResponse(result.data.feedback);
      }
    }

    setLoadingDraft(false);
  }

  function handleToggleItem(id: string) {
    if (expandedItem === id) {
      setExpandedItem(null);
      setDraftResponse("");
    } else {
      setExpandedItem(id);
      setDraftResponse("");
    }
  }

  async function handleCopy(id: string) {
    await navigator.clipboard.writeText(draftResponse);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/admin/agents"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-gray hover:text-brand-navy transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agents
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-brand-navy/5 rounded-2xl">
          <Radio className="w-8 h-8 text-brand-navy" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-brand-navy tracking-tight">
            Echo
          </h1>
          <p className="text-sm font-medium text-brand-gray">
            Communications Intelligence
          </p>
        </div>
      </div>

      {/* Urgency Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <EliteCard>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-100 rounded-xl">
              <MessageSquare className="w-6 h-6 text-violet-700" />
            </div>
            <div>
              <p className="text-3xl font-black text-brand-navy">
                {dashboard?.unreadDMs ?? 0}
              </p>
              <p className="text-sm font-medium text-brand-gray">Unread DMs</p>
            </div>
          </div>
        </EliteCard>

        <EliteCard>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <FileText className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <p className="text-3xl font-black text-brand-navy">
                {dashboard?.pendingReviews ?? 0}
              </p>
              <p className="text-sm font-medium text-brand-gray">
                Pending Reviews
              </p>
            </div>
          </div>
        </EliteCard>

        <EliteCard>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Users className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <p className="text-3xl font-black text-brand-navy">
                {communityPulse?.postsThisWeek ?? 0}
              </p>
              <p className="text-sm font-medium text-brand-gray">
                Community Posts This Week
              </p>
            </div>
          </div>
        </EliteCard>
      </div>

      {/* Main Content: Unified Inbox + Community Pulse Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unified Inbox */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-black text-brand-navy tracking-tight">
            Unified Inbox
          </h2>

          {inbox.length === 0 && (
            <EliteCard>
              <div className="py-8 text-center">
                <MessageSquare className="w-10 h-10 text-brand-gray/30 mx-auto mb-3" />
                <p className="font-black text-brand-navy">All Clear</p>
                <p className="text-sm font-medium text-brand-gray mt-1">
                  No items needing attention right now.
                </p>
              </div>
            </EliteCard>
          )}

          {inbox.map((item) => {
            const isExpanded = expandedItem === item.id;
            const truncatedContent =
              item.content && item.content.length > 200
                ? item.content.slice(0, 200) + "..."
                : item.content || "";

            return (
              <EliteCard key={item.id} onClick={() => handleToggleItem(item.id)}>
                <div className="space-y-3">
                  {/* Top row: badge + sender + time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black ${
                          item.type === "dm"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.type === "dm" ? "DM" : "Review"}
                      </span>
                      <span className="font-black text-brand-navy text-sm">
                        {item.senderName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-brand-gray">
                        {timeAgo(item.date)}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-brand-gray" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-brand-gray" />
                      )}
                    </div>
                  </div>

                  {/* Content preview / full */}
                  <p className="text-sm font-medium text-brand-gray leading-relaxed">
                    {isExpanded ? item.content : truncatedContent}
                  </p>

                  {item.type === "review" && item.scriptType && (
                    <p className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                      {item.scriptType} Script
                    </p>
                  )}

                  {/* Expanded actions */}
                  {isExpanded && (
                    <div
                      className="pt-3 border-t border-brand-navy/5 space-y-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BrandButton
                        variant="outline"
                        size="sm"
                        isLoading={loadingDraft}
                        onClick={() => handleDraftResponse(item)}
                      >
                        {loadingDraft ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                            Drafting...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 mr-2" />
                            Draft Response
                          </>
                        )}
                      </BrandButton>

                      {draftResponse && (
                        <div className="space-y-2">
                          <textarea
                            value={draftResponse}
                            onChange={(e) => setDraftResponse(e.target.value)}
                            className="w-full p-3 border border-brand-navy/10 rounded-xl text-sm font-medium text-brand-navy bg-brand-navy/[0.02] focus:outline-none focus:border-brand-orange/30 resize-y min-h-[120px]"
                            rows={6}
                          />
                          <div className="flex items-center gap-3">
                            <BrandButton
                              variant="accent"
                              size="sm"
                              onClick={() => handleCopy(item.id)}
                            >
                              {copiedId === item.id ? "Copied!" : "Copy"}
                            </BrandButton>
                            <Link
                              href={
                                item.type === "dm"
                                  ? "/admin/messages"
                                  : "/admin/script-reviews"
                              }
                              className="text-xs font-bold text-brand-orange hover:text-brand-navy transition-colors uppercase tracking-wider"
                            >
                              {item.type === "dm"
                                ? "Go to Messages"
                                : "Go to Reviews"}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </EliteCard>
            );
          })}
        </div>

        {/* Community Pulse Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-brand-navy tracking-tight">
            Community Pulse
          </h2>

          <EliteCard title="This Week" icon={Users}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-navy/5 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-brand-navy">
                    {communityPulse?.postsThisWeek ?? 0}
                  </p>
                  <p className="text-xs font-medium text-brand-gray mt-1">
                    Posts
                  </p>
                </div>
                <div className="bg-brand-navy/5 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-brand-navy">
                    {communityPulse?.activePostersThisWeek ?? 0}
                  </p>
                  <p className="text-xs font-medium text-brand-gray mt-1">
                    Active Members
                  </p>
                </div>
              </div>

              <div className="bg-brand-navy/5 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-brand-navy">
                  {communityPulse?.totalPosts ?? 0}
                </p>
                <p className="text-xs font-medium text-brand-gray mt-1">
                  Total Posts All-Time
                </p>
              </div>
            </div>
          </EliteCard>

          <EliteCard title="Top Contributors" subtitle="Last 7 Days">
            {communityPulse?.topContributors &&
            communityPulse.topContributors.length > 0 ? (
              <div className="space-y-3">
                {communityPulse.topContributors.map((contributor, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-brand-navy/5 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand-navy/10 flex items-center justify-center text-xs font-black text-brand-navy">
                        {i + 1}
                      </span>
                      <span className="text-sm font-black text-brand-navy">
                        {contributor.full_name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-brand-orange">
                      {contributor.postCount}{" "}
                      {contributor.postCount === 1 ? "post" : "posts"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm font-medium text-brand-gray py-4 text-center">
                No community activity this week yet.
              </p>
            )}
          </EliteCard>
        </div>
      </div>
    </div>
  );
}
