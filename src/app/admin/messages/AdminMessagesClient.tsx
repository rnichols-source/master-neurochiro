"use client";

import { useState, useEffect, useRef } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { Send, MessageCircle, Users } from "lucide-react";
import { sendDirectMessage, markMessagesRead } from "@/app/actions/pro-actions";
import { createClient } from "@/lib/supabase/client";

interface Member {
  id: string;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
}

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

interface Conversation {
  member: Member;
  lastMessage: Message | null;
  unreadCount: number;
}

function formatTime(date: string) {
  const d = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (diffDays === 0) return time;
  if (diffDays === 1) return `Yesterday`;
  if (diffDays < 7) return d.toLocaleDateString([], { weekday: "short" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function AdminMessagesClient({ initialConversations }: { initialConversations: Conversation[] }) {
  const [conversations] = useState<Conversation[]>(initialConversations);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversation = async (member: Member) => {
    setSelectedMember(member);
    setLoadingChat(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("direct_messages")
      .select("*")
      .or(
        `and(sender_id.eq.${member.id},recipient_id.eq.${user.id}),and(sender_id.eq.${user.id},recipient_id.eq.${member.id})`
      )
      .order("created_at", { ascending: true });

    setMessages(data || []);
    setLoadingChat(false);
    await markMessagesRead(member.id);
  };

  // Poll for new messages
  useEffect(() => {
    if (!selectedMember) return;
    const supabase = createClient();

    const poll = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("direct_messages")
        .select("*")
        .or(
          `and(sender_id.eq.${selectedMember.id},recipient_id.eq.${user.id}),and(sender_id.eq.${user.id},recipient_id.eq.${selectedMember.id})`
        )
        .order("created_at", { ascending: true });

      if (data) setMessages(data);
    };

    const interval = setInterval(poll, 30000);
    return () => clearInterval(interval);
  }, [selectedMember]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedMember) return;
    setSending(true);
    const result = await sendDirectMessage(selectedMember.id, newMessage.trim());
    if (result.success) {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender_id: user?.id || "",
          recipient_id: selectedMember.id,
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
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Pro Messages</h1>
        <p className="text-sm text-brand-gray font-medium mt-1">Direct messaging with Pro members.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ height: "calc(100vh - 240px)", minHeight: "500px" }}>
        {/* Sidebar - Member List */}
        <EliteCard className="p-0 overflow-hidden lg:col-span-1">
          <div className="p-4 border-b border-brand-navy/5">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-navy/40 flex items-center gap-2">
              <Users className="w-3.5 h-3.5" /> Pro Members
            </h3>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 320px)" }}>
            {conversations.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm text-brand-gray font-medium">No Pro members found.</p>
              </div>
            ) : (
              conversations.map(({ member, lastMessage, unreadCount }) => (
                <button
                  key={member.id}
                  onClick={() => loadConversation(member)}
                  className={`w-full text-left px-4 py-3 border-b border-brand-navy/5 hover:bg-brand-cream/30 transition-colors ${
                    selectedMember?.id === member.id ? "bg-brand-cream/50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-brand-navy truncate">
                        {member.full_name || member.email}
                      </p>
                      {lastMessage && (
                        <p className="text-xs text-brand-navy/40 font-medium truncate mt-0.5">
                          {lastMessage.content}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end ml-2">
                      {lastMessage && (
                        <span className="text-[10px] text-brand-navy/30 font-bold">
                          {formatTime(lastMessage.created_at)}
                        </span>
                      )}
                      {unreadCount > 0 && (
                        <span className="mt-1 w-5 h-5 rounded-full bg-brand-orange text-white text-[10px] font-black flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </EliteCard>

        {/* Chat Area */}
        <EliteCard className="p-0 overflow-hidden lg:col-span-2 flex flex-col">
          {!selectedMember ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 p-8">
              <div className="w-16 h-16 bg-brand-navy/5 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-brand-navy/30" />
              </div>
              <p className="text-sm text-brand-gray font-medium">Select a Pro member to start chatting.</p>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className="px-6 py-4 border-b border-brand-navy/5 bg-brand-cream/20">
                <p className="text-sm font-black text-brand-navy">
                  {selectedMember.full_name || selectedMember.email}
                </p>
                <p className="text-xs text-brand-navy/40 font-medium">{selectedMember.email}</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {loadingChat ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-brand-gray font-medium">Loading messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                    <p className="text-sm text-brand-gray font-medium">No messages yet with this member.</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isAdmin = msg.sender_id !== selectedMember.id;
                    return (
                      <div key={msg.id} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                            isAdmin
                              ? "bg-brand-navy text-white"
                              : "bg-white border-2 border-brand-orange/20 text-brand-navy"
                          }`}
                        >
                          {!isAdmin && (
                            <p className="text-xs font-black text-brand-orange mb-1">
                              {selectedMember.full_name || "Member"}
                            </p>
                          )}
                          <p className="text-sm font-medium whitespace-pre-wrap">{msg.content}</p>
                          <p className={`text-[10px] mt-1 ${isAdmin ? "text-white/50" : "text-brand-navy/30"} text-right`}>
                            {formatTime(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="border-t border-brand-navy/5 p-4 bg-brand-cream/30">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                    placeholder="Type a reply..."
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
            </>
          )}
        </EliteCard>
      </div>
    </div>
  );
}
