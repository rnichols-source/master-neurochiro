import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { createClient } from "@/lib/supabase/server";
import { fetchCoachingNotes } from "@/app/actions/pro-actions";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { Lock, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";

function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  return new Date(date).toLocaleDateString();
}

export default async function CoachingNotesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let userTier = "standard";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("tier")
      .eq("id", user.id)
      .single();
    if (profile) userTier = profile.tier;
  }

  const isPro = userTier === "pro" || userTier === "admin";

  if (!isPro) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 space-y-4">
          <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-brand-orange" />
          </div>
          <h2 className="text-xl font-black text-brand-navy">Pro Members Only</h2>
          <p className="text-sm text-brand-gray font-medium max-w-md mx-auto">Upgrade to Pro to unlock private coaching, direct messaging, script reviews, and more.</p>
          <Link href="/pricing"><BrandButton variant="primary" className="px-8 py-3">View Pro Options</BrandButton></Link>
        </div>
      </DashboardLayout>
    );
  }

  const { data: notes } = await fetchCoachingNotes();

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Private Coaching Notes</h1>
          <p className="text-sm text-brand-gray font-medium mt-1">Personal notes and insights from your 1-on-1 coaching sessions with Dr. Nichols.</p>
        </div>

        {notes && notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note: { id: string; title: string; created_at: string; content: string }) => (
              <EliteCard key={note.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-black text-brand-navy">{note.title}</h3>
                  <span className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest whitespace-nowrap ml-4">
                    {timeAgo(note.created_at)}
                  </span>
                </div>
                <p className="text-sm text-brand-navy/70 font-medium whitespace-pre-wrap leading-relaxed">{note.content}</p>
              </EliteCard>
            ))}
          </div>
        ) : (
          <EliteCard className="p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-brand-navy/40" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-brand-navy">No coaching notes yet</h3>
              <p className="text-sm text-brand-gray font-medium max-w-md mx-auto">
                After your next 1-on-1 session, Dr. Nichols will add personalized notes and action items here.
              </p>
            </div>
            <a
              href="https://calendly.com/neurochiro-pro/1-on-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BrandButton variant="accent" className="px-8 py-3 gap-2">
                <Calendar className="w-4 h-4" /> Book a 1-on-1 Session
              </BrandButton>
            </a>
          </EliteCard>
        )}
      </div>
    </DashboardLayout>
  );
}
