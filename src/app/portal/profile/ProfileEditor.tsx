"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Check, Loader2 } from "lucide-react";

const SPECIALTY_TAGS = [
  "pediatrics", "prenatal", "neurology", "family care", "corrective care", "athletes",
];

export function ProfileEditor({ profile, userId }: { profile: any; userId: string }) {
  const [formData, setFormData] = useState({
    full_name: profile.full_name || "",
    clinic_name: profile.clinic_name || "",
    city: profile.city || "",
    state: profile.state || "",
    technique_focus: profile.technique_focus || "",
    specialty_tags: profile.specialty_tags || [],
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      specialty_tags: prev.specialty_tags.includes(tag)
        ? prev.specialty_tags.filter((t: string) => t !== tag)
        : [...prev.specialty_tags, tag],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        clinic_name: formData.clinic_name,
        city: formData.city,
        state: formData.state,
        technique_focus: formData.technique_focus,
        specialty_tags: formData.specialty_tags,
      })
      .eq("id", userId);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass =
    "w-full bg-white border border-brand-navy/10 rounded-xl px-4 py-4 text-base font-medium text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange/40";

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 md:p-8 shadow-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-navy ml-1">Full Name</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-navy ml-1">Clinic Name</label>
            <input
              type="text"
              value={formData.clinic_name}
              onChange={(e) => setFormData({ ...formData, clinic_name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-navy ml-1">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-navy ml-1">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-brand-navy ml-1">Technique Focus</label>
            <input
              type="text"
              placeholder="e.g. Gonstead, Diversified, TRT..."
              value={formData.technique_focus}
              onChange={(e) => setFormData({ ...formData, technique_focus: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-navy ml-1">Specialties</label>
          <div className="flex flex-wrap gap-2">
            {SPECIALTY_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2.5 rounded-xl border-2 text-sm font-bold capitalize transition-all touch-target ${
                  formData.specialty_tags.includes(tag)
                    ? "bg-brand-orange border-brand-orange text-white"
                    : "border-brand-navy/10 text-brand-navy/60 hover:border-brand-orange/40"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center justify-center gap-2 w-full bg-brand-navy text-white rounded-xl py-4 px-6 text-base font-bold hover:bg-brand-black transition-colors active:scale-[0.98] disabled:opacity-50 touch-target"
      >
        {saving ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : saved ? (
          <>
            <Check className="w-5 h-5" /> Saved
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}
