"use client";

import { useState, useEffect, useRef } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { Send, MessageCircle } from "lucide-react";
import { sendDirectMessage } from "@/app/actions/pro-actions";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

function formatTime(date: string) {
  const d = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (diffDays === 0) return time;
  if (diffDays === 1) return `Yesterday ${time}`;
  if (diffDays < 7) return `${d.toLocaleDateString([], { weekday: "short" })} ${time}`;
  return `${d.toLocaleDateString([], { month: "short", day: "numeric" })} ${time}`;
}

export function MessagesClient({
  initialMessages,
  currentUserId,
  adminId,
}: {
  initialMessages: Message[];
  currentUserId: string;
  adminId: string;
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Poll for new messages every 30 seconds
  useEffect(() => {
    if (!adminId) return;
    const supabase = createClient();

    const poll = async () => {
      const { data } = await supabase
        .from("direct_messages")
        .select("*")
        .or(
          `and(sender_id.eq.${currentUserId},recipient_id.eq.${adminId}),and(sender_id.eq.${adminId},recipient_id.eq.${currentUserId})`
        )
        .order("created_at", { ascending: true });
      if (data) setMessages(data);
    };

    const interval = setInterval(poll, 30000);
    return () => clearInterval(interval);
  }, [adminId, currentUserId]);

  const handleSend = async () => {
    if (!newMessage.trim() || !adminId) return;
    setSending(true);
    const result = await sendDirectMessage(adminId, newMessage.trim());
    if (result.success) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender_id: currentUserId,
          recipient_id: adminId,
          content: newMessage.trim(),
          is_read: false,
          created_at: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
    }
    setSending(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Direct Messages</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Private conversation with Dr. Nichols.</p>
      </div>

      <div className="bg-white rounded-2xl border border-brand-navy/5 shadow-sm overflow-hidden flex flex-col" style={{ height: "calc(100vh - 260px)", minHeight: "400px" }}>
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-brand-navy/5 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-brand-navy/30" />
              </div>
              <p className="text-sm text-brand-gray font-medium">No messages yet. Start the conversation below.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.sender_id === currentUserId;
              return (
                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      isMe
                        ? "bg-brand-navy text-white"
                        : "bg-white border-2 border-brand-orange/20 text-brand-navy"
                    }`}
                  >
                    {!isMe && (
                      <p className="text-xs font-black text-brand-orange mb-1">Dr. Nichols</p>
                    )}
                    <p className="text-sm font-medium whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-[10px] mt-1 ${isMe ? "text-white/50" : "text-brand-navy/30"} text-right`}>
                      {formatTime(msg.created_at)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-brand-navy/5 p-4 bg-brand-cream/30">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-white border border-brand-navy/10 rounded-xl py-3 px-4 text-sm font-medium text-brand-navy outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"
            />
            <BrandButton
              variant="primary"
              onClick={handleSend}
              disabled={!newMessage.trim() || sending}
              className="px-4"
            >
              <Send className="w-4 h-4" />
            </BrandButton>
          </div>
        </div>
      </div>
    </div>
  );
}
