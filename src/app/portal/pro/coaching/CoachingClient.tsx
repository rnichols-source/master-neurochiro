"use client";

import { useState, useRef } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { Upload, Mic, Trash2, Play, Pause, FileAudio, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { createCoachingSession, deleteCoachingSession } from "@/app/actions/pro-actions";
import { useRouter } from "next/navigation";

interface CoachingSession {
  id: string;
  title: string;
  description: string;
  audio_url: string;
  file_name: string;
  created_at: string;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function AudioPlayer({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="flex items-center gap-3 bg-brand-navy/5 rounded-xl px-4 py-3">
      <button
        onClick={toggle}
        className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white hover:bg-brand-orange/90 transition-colors shrink-0"
      >
        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>
      <audio
        ref={audioRef}
        src={url}
        onEnded={() => setPlaying(false)}
        className="hidden"
      />
      <div className="flex-1 min-w-0">
        <div className="h-1 bg-brand-navy/10 rounded-full overflow-hidden">
          <div className="h-full bg-brand-orange rounded-full w-0 transition-all" />
        </div>
      </div>
    </div>
  );
}

export default function CoachingClient({
  sessions: initialSessions,
}: {
  sessions: CoachingSession[];
}) {
  const [sessions, setSessions] = useState(initialSessions);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Max 100MB
    if (selected.size > 100 * 1024 * 1024) {
      setError("File must be under 100MB");
      return;
    }

    // Audio files only
    if (!selected.type.startsWith("audio/")) {
      setError("Please select an audio file (MP3, M4A, WAV, etc.)");
      return;
    }

    setFile(selected);
    setError("");

    // Auto-fill title from filename if empty
    if (!title) {
      const name = selected.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      setTitle(name);
    }
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      setError("Please add a title and select an audio file");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Upload to Supabase Storage
      const ext = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("coaching-audio")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("coaching-audio")
        .getPublicUrl(filePath);

      // Save session record
      const result = await createCoachingSession(
        title.trim(),
        description.trim(),
        urlData.publicUrl,
        file.name
      );

      if (!result.success) throw new Error(result.error);

      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
      setShowUpload(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (sessionId: string) => {
    if (!confirm("Delete this recording? This cannot be undone.")) return;
    setDeleting(sessionId);
    const result = await deleteCoachingSession(sessionId);
    if (result.success) {
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    }
    setDeleting(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Upload Button */}
      <div className="flex justify-end">
        <BrandButton
          variant="primary"
          className="gap-2 px-6 py-3"
          onClick={() => setShowUpload(!showUpload)}
        >
          <Upload className="w-4 h-4" />
          Upload Recording
        </BrandButton>
      </div>

      {/* Upload Form */}
      {showUpload && (
        <EliteCard className="p-6 border-2 border-brand-orange/20">
          <h3 className="text-lg font-black text-brand-navy mb-4">Upload Coaching Recording</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-brand-navy/70 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Week 4 Coaching Call - ROF Practice"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-navy/10 focus:border-brand-orange focus:outline-none text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-navy/70 mb-1">
                Notes <span className="font-normal text-brand-gray">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Any context or key takeaways from this session..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-navy/10 focus:border-brand-orange focus:outline-none text-sm font-medium resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-navy/70 mb-1">Audio File</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-brand-navy/10 rounded-xl p-8 text-center cursor-pointer hover:border-brand-orange/30 transition-colors"
              >
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileAudio className="w-8 h-8 text-brand-orange" />
                    <div className="text-left">
                      <p className="text-sm font-bold text-brand-navy">{file.name}</p>
                      <p className="text-xs text-brand-gray">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Mic className="w-8 h-8 text-brand-navy/30 mx-auto" />
                    <p className="text-sm font-medium text-brand-navy/50">
                      Click to select an audio file
                    </p>
                    <p className="text-xs text-brand-gray">MP3, M4A, WAV, AAC (max 100MB)</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {error && (
              <p className="text-sm font-bold text-red-500">{error}</p>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowUpload(false);
                  setFile(null);
                  setTitle("");
                  setDescription("");
                  setError("");
                }}
                className="px-6 py-2.5 text-sm font-bold text-brand-navy/50 hover:text-brand-navy transition-colors"
              >
                Cancel
              </button>
              <BrandButton
                variant="accent"
                className="px-8 py-2.5 gap-2"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" /> Upload
                  </>
                )}
              </BrandButton>
            </div>
          </div>
        </EliteCard>
      )}

      {/* Sessions List */}
      {sessions.length > 0 ? (
        <div className="space-y-4">
          {sessions.map((session) => (
            <EliteCard key={session.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-black text-brand-navy">{session.title}</h3>
                  <p className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest mt-1">
                    {formatDate(session.created_at)} &middot; {session.file_name}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(session.id)}
                  disabled={deleting === session.id}
                  className="text-brand-navy/20 hover:text-red-500 transition-colors p-1"
                >
                  {deleting === session.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
              {session.description && (
                <p className="text-sm text-brand-navy/70 font-medium mb-4 leading-relaxed">
                  {session.description}
                </p>
              )}
              <AudioPlayer url={session.audio_url} />
            </EliteCard>
          ))}
        </div>
      ) : !showUpload ? (
        <EliteCard className="p-12 text-center space-y-6">
          <div className="w-16 h-16 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto">
            <Mic className="w-8 h-8 text-brand-navy/40" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-black text-brand-navy">No recordings yet</h3>
            <p className="text-sm text-brand-gray font-medium max-w-md mx-auto">
              Upload audio from your coaching sessions to keep everything in one place.
            </p>
          </div>
        </EliteCard>
      ) : null}
    </div>
  );
}
