"use client";

import { MessageSquare, Lock } from "lucide-react";

export default function MessagesPlaceholder() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="w-20 h-20 bg-neuro-orange/10 rounded-[2rem] flex items-center justify-center text-neuro-orange">
        <MessageSquare className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-black text-neuro-navy uppercase tracking-tight">Secure Messages</h1>
        <p className="text-gray-500 max-w-sm">The NeuroChiro secure messaging system is being clinically verified for HIPAA compliance. Check back soon.</p>
      </div>
      <div className="px-6 py-2 bg-gray-50 border border-gray-100 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
        <Lock className="w-3 h-3" /> Encrypted Protocol Pending
      </div>
    </div>
  );
}
