"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import {
  Crosshair, Users, Mail, Send, UserPlus, Download, Phone,
  ArrowLeft, Loader2, ChevronDown, ChevronUp, CheckCircle,
  XCircle, Clock, Calendar, Eye,
} from "lucide-react";
import Link from "next/link";
import {
  importFromDirectory, generateOutreach, sendOutreach,
  sendFollowUp, updateProspectStatus, addProspect,
  runBatchOutreach, runBatchFollowUp,
} from "@/app/actions/hunter-actions";
import { useRouter } from "next/navigation";

interface Prospect {
  id: string;
  name: string;
  email: string;
  phone: string;
  clinic_name: string;
  city: string;
  state: string;
  status: string;
  fit_score: number;
  notes: string;
  outreach_subject: string;
  outreach_body: string;
  follow_up_count: number;
  contacted_at: string;
  responded_at: string;
  call_scheduled_at: string;
}

interface Pipeline {
  new: number;
  contacted: number;
  responded: number;
  call_scheduled: number;
  applied: number;
  enrolled: number;
  not_interested: number;
  unresponsive: number;
}

interface HunterClientProps {
  prospects: Prospect[];
  pipeline: Pipeline;
}

const STATUS_BADGES: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  responded: "bg-violet-100 text-violet-700",
  call_scheduled: "bg-emerald-100 text-emerald-700",
  applied: "bg-orange-100 text-orange-700",
  enrolled: "bg-green-100 text-green-700",
  not_interested: "bg-gray-100 text-gray-600",
  unresponsive: "bg-red-100 text-red-600",
};

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  responded: "Responded",
  call_scheduled: "Call Scheduled",
  applied: "Applied",
  enrolled: "Enrolled",
  not_interested: "Not Interested",
  unresponsive: "Unresponsive",
};

const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "responded", label: "Responded" },
  { key: "call_scheduled", label: "Call Scheduled" },
  { key: "not_interested", label: "Not Interested" },
];

function scoreColor(score: number) {
  if (score >= 70) return "bg-emerald-100 text-emerald-700";
  if (score >= 50) return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
}

export function HunterClient({ prospects, pipeline }: HunterClientProps) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [expandedProspect, setExpandedProspect] = useState<string | null>(null);
  const [outreachDraft, setOutreachDraft] = useState<{ subject: string; body: string } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [importLoading, setImportLoading] = useState(false);
  const [batchOutreachLoading, setBatchOutreachLoading] = useState(false);
  const [batchFollowUpLoading, setBatchFollowUpLoading] = useState(false);
  const [generateLoading, setGenerateLoading] = useState<string | null>(null);
  const [sendLoading, setSendLoading] = useState<string | null>(null);
  const [followUpLoading, setFollowUpLoading] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState(false);

  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Add Prospect form state
  const [addForm, setAddForm] = useState({
    name: "", email: "", phone: "", clinic_name: "",
    city: "", state: "", source: "manual", notes: "",
  });

  const filteredProspects = filter === "all"
    ? prospects
    : prospects.filter((p) => p.status === filter);

  function showMessage(msg: string) {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 4000);
  }

  async function handleImport() {
    setImportLoading(true);
    const result = await importFromDirectory();
    showMessage(result.message || "Import complete");
    setImportLoading(false);
    router.refresh();
  }

  async function handleBatchOutreach() {
    setBatchOutreachLoading(true);
    const result = await runBatchOutreach();
    showMessage(result.message || "Batch outreach complete");
    setBatchOutreachLoading(false);
    router.refresh();
  }

  async function handleBatchFollowUp() {
    setBatchFollowUpLoading(true);
    const result = await runBatchFollowUp();
    showMessage(result.message || "Batch follow-up complete");
    setBatchFollowUpLoading(false);
    router.refresh();
  }

  async function handleGenerateOutreach(id: string) {
    setGenerateLoading(id);
    const result = await generateOutreach(id);
    if (result.success && result.data) {
      setOutreachDraft({ subject: result.data.subject, body: result.data.body });
    } else {
      showMessage(result.error || "Failed to generate outreach");
    }
    setGenerateLoading(null);
  }

  async function handleSendOutreach(id: string) {
    if (!outreachDraft) return;
    setSendLoading(id);
    const result = await sendOutreach(id, outreachDraft.subject, outreachDraft.body);
    if (result.success) {
      showMessage("Outreach email sent");
      setOutreachDraft(null);
    } else {
      showMessage(result.error || "Failed to send");
    }
    setSendLoading(null);
    router.refresh();
  }

  async function handleSendFollowUp(id: string) {
    setFollowUpLoading(id);
    const result = await sendFollowUp(id);
    showMessage(result.message || "Follow-up sent");
    setFollowUpLoading(null);
    router.refresh();
  }

  async function handleUpdateStatus(id: string, status: string) {
    setStatusLoading(`${id}-${status}`);
    await updateProspectStatus(id, status);
    setStatusLoading(null);
    router.refresh();
  }

  async function handleUpdateNotes(id: string, notes: string) {
    await updateProspectStatus(id, prospects.find((p) => p.id === id)?.status || "new", notes);
    router.refresh();
  }

  async function handleAddProspect() {
    if (!addForm.name.trim()) return;
    setAddLoading(true);
    const result = await addProspect(addForm);
    if (result.success) {
      showMessage("Prospect added");
      setShowAddModal(false);
      setAddForm({ name: "", email: "", phone: "", clinic_name: "", city: "", state: "", source: "manual", notes: "" });
    } else {
      showMessage(result.error || "Failed to add prospect");
    }
    setAddLoading(false);
    router.refresh();
  }

  const pipelineStages = [
    { key: "new", label: "New", count: pipeline.new, color: "bg-blue-500" },
    { key: "contacted", label: "Contacted", count: pipeline.contacted, color: "bg-amber-500" },
    { key: "responded", label: "Responded", count: pipeline.responded, color: "bg-violet-500" },
    { key: "call_scheduled", label: "Call Scheduled", count: pipeline.call_scheduled, color: "bg-emerald-500" },
    { key: "applied", label: "Applied", count: pipeline.applied, color: "bg-brand-orange" },
    { key: "enrolled", label: "Enrolled", count: pipeline.enrolled, color: "bg-green-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/admin/agents"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy/60 hover:text-brand-navy transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agents
      </Link>

      {/* Header + Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-navy/5 rounded-xl">
            <Crosshair className="w-7 h-7 text-brand-navy" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-brand-navy tracking-tight">Hunter</h1>
            <p className="text-sm font-medium text-brand-gray">Prospecting & Outreach</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <BrandButton
            variant="outline"
            size="sm"
            isLoading={importLoading}
            onClick={handleImport}
          >
            {importLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            Import from Directory
          </BrandButton>
          <BrandButton
            variant="primary"
            size="sm"
            isLoading={batchOutreachLoading}
            onClick={handleBatchOutreach}
          >
            {batchOutreachLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
            Batch Outreach (10)
          </BrandButton>
          <BrandButton
            variant="ghost"
            size="sm"
            isLoading={batchFollowUpLoading}
            onClick={handleBatchFollowUp}
          >
            {batchFollowUpLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Mail className="w-4 h-4 mr-2" />}
            Batch Follow-Up
          </BrandButton>
          <BrandButton
            variant="accent"
            size="sm"
            onClick={() => setShowAddModal(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Prospect
          </BrandButton>
        </div>
      </div>

      {/* Action message */}
      {actionMessage && (
        <div className="bg-brand-navy text-white px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2">
          {actionMessage}
        </div>
      )}

      {/* Pipeline Funnel */}
      <EliteCard title="Pipeline" subtitle="Conversion Funnel" icon={Users}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {pipelineStages.map((stage, i) => (
            <div key={stage.key} className="text-center">
              <div className={`${stage.color} text-white text-2xl font-black rounded-xl py-4 mb-2`}>
                {stage.count}
              </div>
              <p className="text-xs font-medium text-brand-navy/70">{stage.label}</p>
              {i < pipelineStages.length - 1 && (
                <span className="hidden lg:inline-block text-brand-navy/20 text-lg mt-1">&rarr;</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-brand-navy/5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
            <XCircle className="w-3 h-3" />
            Not Interested: {pipeline.not_interested}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
            <Clock className="w-3 h-3" />
            Unresponsive: {pipeline.unresponsive}
          </span>
        </div>
      </EliteCard>

      {/* Prospects Table */}
      <EliteCard title="Prospects" subtitle={`${filteredProspects.length} total`} icon={Eye}>
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1 mb-6 -mt-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                filter === tab.key
                  ? "bg-brand-navy text-white"
                  : "text-brand-navy/50 hover:text-brand-navy hover:bg-brand-navy/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        {filteredProspects.length === 0 ? (
          <p className="text-sm text-brand-gray py-8 text-center">No prospects in this category.</p>
        ) : (
          <div className="space-y-2">
            {/* Header row */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-brand-navy/40 uppercase tracking-wider">
              <div className="col-span-1">Score</div>
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Clinic</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Actions</div>
            </div>

            {filteredProspects.map((prospect) => {
              const isExpanded = expandedProspect === prospect.id;
              return (
                <div key={prospect.id} className="border border-brand-navy/5 rounded-xl overflow-hidden">
                  {/* Row */}
                  <div
                    className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 py-3 cursor-pointer hover:bg-brand-navy/[0.02] transition-colors items-center"
                    onClick={() => {
                      setExpandedProspect(isExpanded ? null : prospect.id);
                      setOutreachDraft(null);
                    }}
                  >
                    <div className="col-span-1">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black ${scoreColor(prospect.fit_score)}`}>
                        {prospect.fit_score}
                      </span>
                    </div>
                    <div className="col-span-3 font-medium text-brand-navy text-sm truncate">
                      {prospect.name}
                    </div>
                    <div className="col-span-3 text-sm text-brand-gray truncate">
                      {prospect.clinic_name || "--"}
                    </div>
                    <div className="col-span-2 text-sm text-brand-gray truncate">
                      {prospect.city && prospect.state
                        ? `${prospect.city}, ${prospect.state}`
                        : prospect.state || "--"}
                    </div>
                    <div className="col-span-2">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${STATUS_BADGES[prospect.status] || "bg-gray-100 text-gray-600"}`}>
                        {STATUS_LABELS[prospect.status] || prospect.status}
                      </span>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-brand-navy/40" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-brand-navy/40" />
                      )}
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-brand-navy/5 space-y-4 bg-brand-navy/[0.01]">
                      {/* Contact info */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        {prospect.email && (
                          <span className="inline-flex items-center gap-1.5 text-brand-navy/70">
                            <Mail className="w-3.5 h-3.5" />
                            {prospect.email}
                          </span>
                        )}
                        {prospect.phone && (
                          <span className="inline-flex items-center gap-1.5 text-brand-navy/70">
                            <Phone className="w-3.5 h-3.5" />
                            {prospect.phone}
                          </span>
                        )}
                        {prospect.contacted_at && (
                          <span className="inline-flex items-center gap-1.5 text-brand-navy/50 text-xs">
                            <Calendar className="w-3 h-3" />
                            Contacted: {new Date(prospect.contacted_at).toLocaleDateString()}
                          </span>
                        )}
                        {prospect.follow_up_count > 0 && (
                          <span className="text-xs text-brand-navy/50">
                            Follow-ups: {prospect.follow_up_count}
                          </span>
                        )}
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-1">Notes</label>
                        <textarea
                          className="w-full border border-brand-navy/10 rounded-lg px-3 py-2 text-sm text-brand-navy bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/30 resize-none"
                          rows={2}
                          defaultValue={prospect.notes || ""}
                          onBlur={(e) => {
                            if (e.target.value !== (prospect.notes || "")) {
                              handleUpdateNotes(prospect.id, e.target.value);
                            }
                          }}
                          placeholder="Add notes..."
                        />
                      </div>

                      {/* Outreach draft */}
                      {outreachDraft && expandedProspect === prospect.id && (
                        <div className="space-y-3 p-4 bg-white rounded-xl border border-brand-navy/10">
                          <div>
                            <label className="block text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-1">Subject</label>
                            <input
                              type="text"
                              className="w-full border border-brand-navy/10 rounded-lg px-3 py-2 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                              value={outreachDraft.subject}
                              onChange={(e) => setOutreachDraft({ ...outreachDraft, subject: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-1">Body</label>
                            <textarea
                              className="w-full border border-brand-navy/10 rounded-lg px-3 py-2 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/30 resize-none"
                              rows={8}
                              value={outreachDraft.body}
                              onChange={(e) => setOutreachDraft({ ...outreachDraft, body: e.target.value })}
                            />
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-2">
                        <BrandButton
                          variant="outline"
                          size="sm"
                          isLoading={generateLoading === prospect.id}
                          onClick={() => handleGenerateOutreach(prospect.id)}
                        >
                          {generateLoading === prospect.id
                            ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                            : <Mail className="w-3.5 h-3.5 mr-1.5" />}
                          Generate Email
                        </BrandButton>

                        {outreachDraft && expandedProspect === prospect.id && (
                          <BrandButton
                            variant="accent"
                            size="sm"
                            isLoading={sendLoading === prospect.id}
                            onClick={() => handleSendOutreach(prospect.id)}
                          >
                            {sendLoading === prospect.id
                              ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                              : <Send className="w-3.5 h-3.5 mr-1.5" />}
                            Send Email
                          </BrandButton>
                        )}

                        {prospect.status === "contacted" && (
                          <BrandButton
                            variant="ghost"
                            size="sm"
                            isLoading={followUpLoading === prospect.id}
                            onClick={() => handleSendFollowUp(prospect.id)}
                          >
                            {followUpLoading === prospect.id
                              ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                              : <Send className="w-3.5 h-3.5 mr-1.5" />}
                            Send Follow-Up
                          </BrandButton>
                        )}

                        <div className="flex-1" />

                        <BrandButton
                          variant="ghost"
                          size="sm"
                          isLoading={statusLoading === `${prospect.id}-responded`}
                          onClick={() => handleUpdateStatus(prospect.id, "responded")}
                        >
                          {statusLoading === `${prospect.id}-responded`
                            ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                            : <CheckCircle className="w-3.5 h-3.5 mr-1.5" />}
                          Responded
                        </BrandButton>
                        <BrandButton
                          variant="ghost"
                          size="sm"
                          isLoading={statusLoading === `${prospect.id}-call_scheduled`}
                          onClick={() => handleUpdateStatus(prospect.id, "call_scheduled")}
                        >
                          {statusLoading === `${prospect.id}-call_scheduled`
                            ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                            : <Calendar className="w-3.5 h-3.5 mr-1.5" />}
                          Call Scheduled
                        </BrandButton>
                        <BrandButton
                          variant="ghost"
                          size="sm"
                          isLoading={statusLoading === `${prospect.id}-not_interested`}
                          onClick={() => handleUpdateStatus(prospect.id, "not_interested")}
                        >
                          {statusLoading === `${prospect.id}-not_interested`
                            ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                            : <XCircle className="w-3.5 h-3.5 mr-1.5" />}
                          Not Interested
                        </BrandButton>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </EliteCard>

      {/* Add Prospect Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-brand-navy">Add Prospect</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-brand-navy/40 hover:text-brand-navy transition-colors text-xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-1">Name *</label>
                <input
                  type="text"
                  className="w-full border border-brand-navy/10 rounded-lg px-3 py-2 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  placeholder="Dr. Jane Smith"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-brand-navy/10 rounded-lg px-3 py-2 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full border border-brand-navy/10 rounded-lg px-3 py-2 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                  value={addForm.phone}
                  onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-1">Clinic Name</label>
                <input
                  type="text"
                  className="w-full border border-brand-navy/10 rounded-lg px-3 py-2 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                  value={addForm.clinic_name}
                  onChange={(e) => setAddForm({ ...addForm, clinic_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-1">City</label>
                <input
                  type="text"
                  className="w-full border border-brand-navy/10 rounded-lg px-3 py-2 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                  value={addForm.city}
                  onChange={(e) => setAddForm({ ...addForm, city: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-1">State</label>
                <input
                  type="text"
                  className="w-full border border-brand-navy/10 rounded-lg px-3 py-2 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                  value={addForm.state}
                  onChange={(e) => setAddForm({ ...addForm, state: e.target.value })}
                  placeholder="SC"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-1">Source</label>
                <select
                  className="w-full border border-brand-navy/10 rounded-lg px-3 py-2 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/30 bg-white"
                  value={addForm.source}
                  onChange={(e) => setAddForm({ ...addForm, source: e.target.value })}
                >
                  <option value="manual">Manual</option>
                  <option value="referral">Referral</option>
                  <option value="social">Social</option>
                  <option value="event">Event</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-brand-navy/40 uppercase tracking-wider mb-1">Notes</label>
                <textarea
                  className="w-full border border-brand-navy/10 rounded-lg px-3 py-2 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/30 resize-none"
                  rows={3}
                  value={addForm.notes}
                  onChange={(e) => setAddForm({ ...addForm, notes: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <BrandButton variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                Cancel
              </BrandButton>
              <BrandButton
                variant="accent"
                size="sm"
                isLoading={addLoading}
                onClick={handleAddProspect}
                disabled={!addForm.name.trim()}
              >
                {addLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <UserPlus className="w-4 h-4 mr-2" />}
                Save Prospect
              </BrandButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
