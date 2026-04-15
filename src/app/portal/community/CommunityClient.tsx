"use client";

import { useState, useRef } from "react";
import {
  Send,
  Paperclip,
  MessageCircle,
  Pin,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileText,
  Image as ImageIcon,
  X,
  Loader2,
} from "lucide-react";
import { createPost, createReply, deletePost, deleteReply, togglePinPost } from "@/app/actions/community-actions";
import { createBrowserClient } from "@supabase/ssr";
import { cn } from "@/lib/utils";

interface Author {
  id: string;
  full_name: string;
  tier: string;
  avatar_url: string | null;
}

interface Reply {
  id: string;
  content: string;
  created_at: string;
  author: Author;
}

interface Post {
  id: string;
  content: string;
  file_url: string | null;
  file_name: string | null;
  file_type: string | null;
  pinned: boolean;
  created_at: string;
  author: Author;
  replies: Reply[];
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
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function Avatar({ name, tier }: { name: string; tier: string }) {
  const initials = name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";
  const isAdmin = tier === "admin";
  return (
    <div className={cn(
      "w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0",
      isAdmin ? "bg-brand-orange text-white" : "bg-brand-navy/10 text-brand-navy"
    )}>
      {initials}
    </div>
  );
}

function PostCard({ post, currentUserId, isAdmin, onRefresh }: {
  post: Post;
  currentUserId: string;
  isAdmin: boolean;
  onRefresh: () => void;
}) {
  const [showReplies, setShowReplies] = useState(post.replies.length <= 2);
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setReplying(true);
    await createReply(post.id, replyText);
    setReplyText("");
    setShowReplyInput(false);
    setReplying(false);
    onRefresh();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    await deletePost(post.id);
    onRefresh();
  };

  const handlePin = async () => {
    await togglePinPost(post.id, !post.pinned);
    onRefresh();
  };

  const handleDeleteReply = async (replyId: string) => {
    await deleteReply(replyId);
    onRefresh();
  };

  const isImage = post.file_type?.startsWith("image/");
  const isOwner = post.author.id === currentUserId;

  return (
    <div className={cn(
      "bg-white rounded-2xl border p-5 space-y-4",
      post.pinned ? "border-brand-orange/30 ring-1 ring-brand-orange/10" : "border-brand-navy/5"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={post.author.full_name} tier={post.author.tier} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-brand-navy">{post.author.full_name}</span>
              {post.author.tier === "admin" && (
                <span className="text-[10px] font-bold bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-full uppercase">Coach</span>
              )}
              {post.author.tier === "pro" && (
                <span className="text-[10px] font-bold bg-brand-navy/5 text-brand-navy/50 px-2 py-0.5 rounded-full uppercase">Pro</span>
              )}
              {post.pinned && (
                <Pin className="w-3 h-3 text-brand-orange" />
              )}
            </div>
            <span className="text-xs text-brand-gray">{timeAgo(post.created_at)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isAdmin && (
            <button onClick={handlePin} className="p-1.5 rounded-lg hover:bg-brand-navy/5 transition-colors" title={post.pinned ? "Unpin" : "Pin"}>
              <Pin className={cn("w-3.5 h-3.5", post.pinned ? "text-brand-orange" : "text-brand-navy/20")} />
            </button>
          )}
          {(isOwner || isAdmin) && (
            <button onClick={handleDelete} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
              <Trash2 className="w-3.5 h-3.5 text-brand-navy/20 hover:text-red-500" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-brand-navy leading-relaxed whitespace-pre-wrap">{post.content}</p>

      {/* File Attachment */}
      {post.file_url && (
        <div className="rounded-xl overflow-hidden">
          {isImage ? (
            <img src={post.file_url} alt={post.file_name || "Upload"} className="max-h-80 w-auto rounded-xl" />
          ) : (
            <a
              href={post.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-brand-navy/5 rounded-xl hover:bg-brand-navy/10 transition-colors"
            >
              <FileText className="w-5 h-5 text-brand-orange shrink-0" />
              <span className="text-sm font-medium text-brand-navy truncate">{post.file_name || "Download file"}</span>
            </a>
          )}
        </div>
      )}

      {/* Reply count + toggle */}
      <div className="flex items-center gap-4 pt-1">
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className="flex items-center gap-1.5 text-xs font-bold text-brand-navy/40 hover:text-brand-orange transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Reply
        </button>
        {post.replies.length > 0 && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1 text-xs font-bold text-brand-navy/40 hover:text-brand-navy transition-colors"
          >
            {post.replies.length} {post.replies.length === 1 ? "reply" : "replies"}
            {showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* Replies */}
      {showReplies && post.replies.length > 0 && (
        <div className="space-y-3 pl-4 border-l-2 border-brand-navy/5">
          {post.replies
            .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
            .map((reply) => (
              <div key={reply.id} className="flex gap-3">
                <Avatar name={reply.author.full_name} tier={reply.author.tier} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-navy">{reply.author.full_name}</span>
                    {reply.author.tier === "admin" && (
                      <span className="text-[10px] font-bold bg-brand-orange/10 text-brand-orange px-1.5 py-0.5 rounded-full uppercase">Coach</span>
                    )}
                    <span className="text-xs text-brand-gray">{timeAgo(reply.created_at)}</span>
                    {(reply.author.id === currentUserId || isAdmin) && (
                      <button onClick={() => handleDeleteReply(reply.id)} className="ml-auto p-1 rounded hover:bg-red-50">
                        <Trash2 className="w-3 h-3 text-brand-navy/15 hover:text-red-500" />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-brand-navy/80 mt-0.5 whitespace-pre-wrap">{reply.content}</p>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Reply Input */}
      {showReplyInput && (
        <div className="flex gap-2 pt-1">
          <input
            type="text"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleReply()}
            className="flex-1 bg-brand-navy/5 rounded-xl py-2.5 px-4 text-sm text-brand-navy outline-none focus:ring-2 focus:ring-brand-orange/20"
          />
          <button
            onClick={handleReply}
            disabled={replying || !replyText.trim()}
            className="p-2.5 bg-brand-navy text-white rounded-xl hover:bg-brand-black transition-colors disabled:opacity-30"
          >
            {replying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
}

export default function CommunityClient({ initialPosts, currentUserId, isAdmin }: {
  initialPosts: Post[];
  currentUserId: string;
  isAdmin: boolean;
}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const refresh = async () => {
    const res = await fetch("/api/community/posts");
    const data = await res.json();
    if (data.success) setPosts(data.data);
  };

  const handlePost = async () => {
    if (!newPost.trim() && !file) return;
    setPosting(true);

    let fileUrl: string | undefined;
    let fileName: string | undefined;
    let fileType: string | undefined;

    // Upload file if attached
    if (file) {
      setUploading(true);
      const ext = file.name.split(".").pop();
      const path = `${currentUserId}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("community").upload(path, file);
      if (!error) {
        const { data: urlData } = supabase.storage.from("community").getPublicUrl(path);
        fileUrl = urlData.publicUrl;
        fileName = file.name;
        fileType = file.type;
      }
      setUploading(false);
    }

    await createPost(newPost, fileUrl, fileName, fileType);
    setNewPost("");
    setFile(null);
    setPosting(false);
    await refresh();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-xl font-black text-brand-navy">Community</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">
          Share wins, ask questions, and connect with the group.
        </p>
      </div>

      {/* New Post */}
      <div className="bg-white rounded-2xl border border-brand-navy/5 p-4 space-y-3">
        <textarea
          rows={3}
          placeholder="Share a win, ask a question, or post an update..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full bg-transparent text-sm text-brand-navy outline-none resize-none placeholder:text-brand-navy/30"
        />

        {/* File Preview */}
        {file && (
          <div className="flex items-center gap-2 p-2 bg-brand-navy/5 rounded-lg">
            {file.type.startsWith("image/") ? (
              <ImageIcon className="w-4 h-4 text-brand-orange shrink-0" />
            ) : (
              <FileText className="w-4 h-4 text-brand-orange shrink-0" />
            )}
            <span className="text-xs font-medium text-brand-navy truncate flex-1">{file.name}</span>
            <button onClick={() => setFile(null)} className="p-0.5 hover:bg-brand-navy/10 rounded">
              <X className="w-3.5 h-3.5 text-brand-navy/40" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between pt-1 border-t border-brand-navy/5">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-xs font-bold text-brand-navy/40 hover:text-brand-orange transition-colors"
          >
            <Paperclip className="w-3.5 h-3.5" />
            Attach File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.doc,.docx,.xlsx,.csv,.txt"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f && f.size <= 10 * 1024 * 1024) setFile(f);
              e.target.value = "";
            }}
          />
          <button
            onClick={handlePost}
            disabled={posting || uploading || (!newPost.trim() && !file)}
            className="flex items-center gap-2 bg-brand-navy text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-brand-black transition-colors disabled:opacity-30"
          >
            {posting || uploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Posting...</>
            ) : (
              <><Send className="w-4 h-4" /> Post</>
            )}
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <MessageCircle className="w-10 h-10 text-brand-navy/10 mx-auto mb-3" />
          <p className="text-sm font-bold text-brand-navy/40">No posts yet</p>
          <p className="text-xs text-brand-navy/30 mt-1">Be the first to share something with the group.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUserId={currentUserId}
              isAdmin={isAdmin}
              onRefresh={refresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}
