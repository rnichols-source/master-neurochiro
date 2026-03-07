"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  Video, 
  FileText, 
  Plus, 
  ChevronRight, 
  Save, 
  LayoutDashboard,
  ExternalLink,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export function CurriculumManagerClient({ initialWeeks }: { initialWeeks: any[] }) {
  const [weeks, setWeeks] = useState(initialWeeks);
  const [selectedWeek, setSelectedWeek] = useState<any>(initialWeeks[0] || null);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  const handleSaveModule = async () => {
    if (!selectedModule) return;
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('modules')
        .update({
          title: selectedModule.title,
          video_url: selectedModule.video_url,
          content: selectedModule.content,
          order_index: selectedModule.order_index
        })
        .eq('id', selectedModule.id);

      if (error) throw error;
      
      // Update local state
      const updatedWeeks = weeks.map(w => {
        if (w.id === selectedWeek.id) {
          return {
            ...w,
            modules: w.modules.map((m: any) => m.id === selectedModule.id ? selectedModule : m)
          };
        }
        return w;
      });
      setWeeks(updatedWeeks);
      alert("Module updated successfully!");
    } catch (err: any) {
      alert("Error saving: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      {/* Sidebar: Week Selection */}
      <div className="lg:col-span-1 space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/40 ml-2">Select Phase</h3>
        <div className="space-y-2">
          {weeks.map((week) => (
            <button
              key={week.id}
              onClick={() => { setSelectedWeek(week); setSelectedModule(null); }}
              className={cn(
                "w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between group",
                selectedWeek?.id === week.id 
                  ? "bg-brand-navy border-brand-navy text-white shadow-xl" 
                  : "bg-white border-brand-navy/5 hover:border-brand-orange/20"
              )}
            >
              <div>
                <p className={cn("text-[8px] font-black uppercase tracking-widest", selectedWeek?.id === week.id ? "text-white/40" : "text-brand-navy/20")}>Phase 0{week.week_number}</p>
                <h4 className="font-black text-sm">{week.title}</h4>
              </div>
              <ChevronRight className={cn("w-4 h-4 transition-transform", selectedWeek?.id === week.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100")} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Area: Module List & Editor */}
      <div className="lg:col-span-2 space-y-8">
        {selectedWeek && (
          <>
            <div className="flex justify-between items-end pb-4 border-b border-brand-navy/5">
              <div>
                <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-1">Editing Phase 0{selectedWeek.week_number}</p>
                <h2 className="text-3xl font-black text-brand-navy tracking-tight">{selectedWeek.title}</h2>
              </div>
              <BrandButton variant="outline" size="sm" className="gap-2 text-[10px]">
                <Plus className="w-3 h-3" /> Add Module
              </BrandButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Module List for Week */}
              <div className="space-y-3">
                {selectedWeek.modules?.map((mod: any) => (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModule(mod)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4",
                      selectedModule?.id === mod.id 
                        ? "bg-brand-orange/5 border-brand-orange/40" 
                        : "bg-white border-brand-navy/5 hover:bg-brand-cream/50"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      selectedModule?.id === mod.id ? "bg-brand-orange text-white" : "bg-brand-navy/5 text-brand-navy/40"
                    )}>
                      <Video className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] font-black uppercase text-brand-navy/20">Module 0{selectedWeek.week_number}.0{mod.order_index}</p>
                      <h5 className="font-bold text-brand-navy text-xs truncate">{mod.title}</h5>
                    </div>
                  </button>
                ))}
              </div>

              {/* Module Editor Form */}
              <div className="bg-white rounded-3xl border border-brand-navy/5 p-8 shadow-sm">
                {selectedModule ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">Title</label>
                      <input 
                        type="text" 
                        value={selectedModule.title}
                        onChange={(e) => setSelectedModule({...selectedModule, title: e.target.value})}
                        className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-xs font-bold text-brand-navy focus:border-brand-orange/20 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1 flex items-center justify-between">
                        Video URL / ID
                        <span className="text-[8px] opacity-60">Vimeo or Mux ID</span>
                      </label>
                      <div className="relative">
                        <Video className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-navy/30" />
                        <input 
                          type="text" 
                          value={selectedModule.video_url || ''}
                          placeholder="e.g. vimeo_123456789"
                          onChange={(e) => setSelectedModule({...selectedModule, video_url: e.target.value})}
                          className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-brand-navy focus:border-brand-orange/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">Description / Notes</label>
                      <textarea 
                        rows={4}
                        value={selectedModule.content || ''}
                        onChange={(e) => setSelectedModule({...selectedModule, content: e.target.value})}
                        className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-xs font-medium text-brand-navy focus:border-brand-orange/20 outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="pt-4 space-y-3">
                      <BrandButton 
                        variant="primary" 
                        className="w-full" 
                        onClick={handleSaveModule}
                        isLoading={isSaving}
                      >
                        <Save className="w-4 h-4 mr-2" /> Save Module
                      </BrandButton>
                      <BrandButton variant="outline" className="w-full text-[10px] gap-2">
                        <FileText className="w-3 h-3" /> Manage PDFs
                      </BrandButton>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-12 h-12 rounded-full bg-brand-navy/5 flex items-center justify-center mb-4">
                      <LayoutDashboard className="w-6 h-6 text-brand-navy/20" />
                    </div>
                    <p className="text-xs font-bold text-brand-navy/30 uppercase tracking-widest">Select a module to edit training content</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
