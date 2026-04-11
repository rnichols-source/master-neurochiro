"use client";

import { useState } from "react";
import { Search, Check, X, Clock, ChevronLeft, Mail, Phone, Send } from "lucide-react";
import { updateApplicationStatus } from "@/app/actions/update-application";
import { sendPortalInvite } from "@/app/actions/admin-actions";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  approved: "bg-green-100 text-green-700",
  paid: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700",
  waitlist: "bg-orange-100 text-orange-700",
  rejected: "bg-red-100 text-red-700",
};

export function ApplicationsClient({ initialApplications }: { initialApplications: any[] }) {
  const [apps, setApps] = useState(initialApplications);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInviting, setIsInviting] = useState(false);

  const filteredApps = apps.filter(app => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch = (app.full_name || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: apps.length,
    pending: apps.filter(a => a.status === 'pending').length,
    approved: apps.filter(a => a.status === 'approved').length,
    paid: apps.filter(a => a.status === 'paid').length,
    waitlist: apps.filter(a => a.status === 'waitlist').length,
    rejected: apps.filter(a => a.status === 'rejected').length,
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const result = await updateApplicationStatus(id, newStatus, "", "");
      if (result.success) {
        setApps(apps.map(a => a.id === id ? { ...a, status: newStatus } : a));
        if (selectedApp?.id === id) setSelectedApp({ ...selectedApp, status: newStatus });
      } else {
        alert("Error: " + result.error);
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendInvite = async (email: string, fullName: string) => {
    if (!confirm(`Send portal invite to ${fullName}?`)) return;
    setIsInviting(true);
    try {
      const result = await sendPortalInvite(email, fullName);
      alert(result.success ? (result.message || "Invite sent!") : "Error: " + result.error);
    } catch {
      alert("Something went wrong.");
    } finally {
      setIsInviting(false);
    }
  };

  // Detail View
  if (selectedApp) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedApp(null)}
          className="text-sm font-bold text-brand-gray hover:text-brand-navy transition-colors"
        >
          <ChevronLeft className="w-4 h-4 inline mr-1" />
          Back to list
        </button>

        <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pb-5 border-b border-brand-navy/5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center font-black text-sm">
                  {selectedApp.full_name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-black text-brand-navy">{selectedApp.full_name}</h2>
                  <p className="text-xs text-brand-gray">{selectedApp.responses?.current_role || "Doctor"}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-brand-gray">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedApp.email}</span>
                {selectedApp.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {selectedApp.phone}</span>}
              </div>
            </div>

            <div className="flex items-start gap-2 shrink-0">
              <span className={cn("px-3 py-1 rounded-lg text-xs font-bold capitalize", STATUS_COLORS[selectedApp.status] || "bg-gray-100 text-gray-600")}>
                {selectedApp.status}
              </span>
            </div>
          </div>

          {/* Application Answers */}
          <div className="pt-5 space-y-4">
            {selectedApp.responses?.biggest_struggle && (
              <div>
                <p className="text-xs font-bold text-brand-gray mb-1">Biggest struggle</p>
                <p className="text-sm text-brand-navy leading-relaxed bg-brand-navy/[0.02] rounded-xl p-4 border border-brand-navy/5">
                  {selectedApp.responses.biggest_struggle}
                </p>
              </div>
            )}
            {selectedApp.responses?.success_vision && (
              <div>
                <p className="text-xs font-bold text-brand-gray mb-1">Vision of success</p>
                <p className="text-sm text-brand-navy leading-relaxed bg-brand-navy/[0.02] rounded-xl p-4 border border-brand-navy/5">
                  {selectedApp.responses.success_vision}
                </p>
              </div>
            )}
            {selectedApp.responses?.why_now && (
              <div>
                <p className="text-xs font-bold text-brand-gray mb-1">Why now</p>
                <p className="text-sm text-brand-navy leading-relaxed bg-brand-navy/[0.02] rounded-xl p-4 border border-brand-navy/5">
                  {selectedApp.responses.why_now}
                </p>
              </div>
            )}
            {selectedApp.responses?.instagram && (
              <div>
                <p className="text-xs font-bold text-brand-gray mb-1">Instagram</p>
                <p className="text-sm font-bold text-brand-navy">{selectedApp.responses.instagram}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-5 mt-5 border-t border-brand-navy/5 flex flex-wrap gap-2">
            <button
              disabled={isUpdating}
              onClick={() => handleStatusUpdate(selectedApp.id, 'approved')}
              className="px-4 py-2.5 bg-green-50 text-green-700 rounded-xl text-sm font-bold hover:bg-green-100 transition-all disabled:opacity-50"
            >
              <Check className="w-4 h-4 inline mr-1" /> Approve
            </button>
            <button
              disabled={isUpdating}
              onClick={() => handleStatusUpdate(selectedApp.id, 'waitlist')}
              className="px-4 py-2.5 bg-orange-50 text-orange-700 rounded-xl text-sm font-bold hover:bg-orange-100 transition-all disabled:opacity-50"
            >
              <Clock className="w-4 h-4 inline mr-1" /> Waitlist
            </button>
            <button
              disabled={isUpdating}
              onClick={() => handleStatusUpdate(selectedApp.id, 'rejected')}
              className="px-4 py-2.5 bg-red-50 text-red-700 rounded-xl text-sm font-bold hover:bg-red-100 transition-all disabled:opacity-50"
            >
              <X className="w-4 h-4 inline mr-1" /> Reject
            </button>
            {(selectedApp.status === 'paid' || selectedApp.status === 'approved') && (
              <button
                disabled={isInviting}
                onClick={() => handleSendInvite(selectedApp.email, selectedApp.full_name)}
                className="px-4 py-2.5 bg-brand-navy text-white rounded-xl text-sm font-bold hover:bg-brand-black transition-all disabled:opacity-50 ml-auto"
              >
                <Send className="w-4 h-4 inline mr-1" /> {isInviting ? "Sending..." : "Send Portal Invite"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/50" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-brand-navy/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-brand-orange/30 outline-none"
          />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 overflow-x-auto no-scrollbar">
        {(["all", "pending", "approved", "paid", "waitlist", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap capitalize",
              filter === f ? "bg-brand-navy text-white" : "text-brand-gray hover:bg-brand-navy/5"
            )}
          >
            {f} {counts[f] > 0 && <span className="ml-1 opacity-60">{counts[f]}</span>}
          </button>
        ))}
      </div>

      {/* Applicant List */}
      {filteredApps.length > 0 ? (
        <div className="bg-white rounded-2xl border border-brand-navy/5 divide-y divide-brand-navy/5">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className="w-full text-left p-4 hover:bg-brand-navy/[0.02] transition-all flex items-center gap-4 first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-navy/5 flex items-center justify-center font-black text-sm text-brand-navy shrink-0">
                {(app.full_name || "?")[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-brand-navy truncate">{app.full_name}</p>
                <p className="text-xs text-brand-gray truncate">{app.responses?.current_role || "Doctor"} · {app.email}</p>
              </div>
              <span className={cn("px-2.5 py-1 rounded-lg text-xs font-bold capitalize shrink-0", STATUS_COLORS[app.status] || "bg-gray-100 text-gray-600")}>
                {app.status}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-sm text-brand-gray">No applications found</p>
        </div>
      )}
    </div>
  );
}
