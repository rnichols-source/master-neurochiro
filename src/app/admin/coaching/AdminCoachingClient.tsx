"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { BookOpen, Send, CheckCircle } from "lucide-react";
import { createCoachingNote } from "@/app/actions/pro-actions";

interface Member {
  id: string;
  full_name: string | null;
  email: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  profiles?: { full_name: string | null; email: string } | null;
}

function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

export function AdminCoachingClient({
  members,
  initialNotes,
}: {
  members: Member[];
  initialNotes: Note[];
}) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedMember, setSelectedMember] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !title.trim() || !content.trim()) return;
    setSubmitting(true);
    const result = await createCoachingNote(selectedMember, title.trim(), content.trim());
    if (result.success) {
      const member = members.find((m) => m.id === selectedMember);
      setNotes((prev) => [
        {
          id: crypto.randomUUID(),
          title: title.trim(),
          content: content.trim(),
          created_at: new Date().toISOString(),
          profiles: member ? { full_name: member.full_name, email: member.email } : null,
        },
        ...prev,
      ]);
      setTitle("");
      setContent("");
      setSelectedMember("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Coaching Notes</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Create private coaching notes for Pro members.</p>
      </div>

      <EliteCard title="New Coaching Note" icon={BookOpen}>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Pro Member</label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"
            >
              <option value="">Select a member...</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.full_name || m.email}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Session 3 - Care Plan Delivery"
              className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Content</label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Coaching notes, action items, observations..."
              className="w-full bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20 resize-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <BrandButton variant="primary" type="submit" className="px-8 py-3 gap-2" isLoading={submitting}>
              <Send className="w-4 h-4" /> Save Note
            </BrandButton>
            {submitted && (
              <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Note saved!
              </span>
            )}
          </div>
        </form>
      </EliteCard>

      {/* Recent Notes */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-2">Recent Notes</h3>
        {notes.length === 0 ? (
          <EliteCard className="p-8 text-center">
            <p className="text-sm text-brand-gray font-medium">No coaching notes created yet.</p>
          </EliteCard>
        ) : (
          notes.map((note) => (
            <EliteCard key={note.id} className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-lg font-black text-brand-navy">{note.title}</h4>
                  <p className="text-xs font-bold text-brand-orange uppercase tracking-widest">
                    {note.profiles?.full_name || note.profiles?.email || "Unknown member"}
                  </p>
                </div>
                <span className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest whitespace-nowrap ml-4">
                  {timeAgo(note.created_at)}
                </span>
              </div>
              <p className="text-sm text-brand-navy/70 font-medium whitespace-pre-wrap leading-relaxed mt-3">{note.content}</p>
            </EliteCard>
          ))
        )}
      </div>
    </div>
  );
}
