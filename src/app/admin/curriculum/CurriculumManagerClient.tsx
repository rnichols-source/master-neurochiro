"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  Video, 
  Plus, 
  ChevronRight, 
  Save, 
  LayoutDashboard,
  Loader2,
  Database,
  RefreshCcw,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { ResourceUploader } from "@/components/admin/ResourceUploader";
import { addModule, deleteModule } from "@/app/actions/module-actions";
import { syncWeek6Resources } from "@/app/actions/activation-actions";

export function CurriculumManagerClient({ initialWeeks, initialResources = [] }: { initialWeeks: any[], initialResources?: any[] }) {
  const [weeks, setWeeks] = useState(initialWeeks);
  const [resources, setResources] = useState(initialResources);
  const [selectedWeek, setSelectedWeek] = useState<any>(initialWeeks[0] || null);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const supabase = createClient();

  const handleSync = async () => {
    if (!selectedWeek || selectedWeek.week_number !== 6) {
        alert("This auto-sync is currently optimized for Week 6 assets. For other weeks, please use the manual uploader.");
        return;
    }
    setIsSyncing(true);
    const res = await syncWeek6Resources();
    if (res.success) {
      alert("Week 6 Premium Resources Synced Successfully!");
      window.location.reload();
    } else {
      alert(`Error Syncing: ${res.error}`);
    }
    setIsSyncing(false);
  };

  const handleAddModule = async () => {
    if (!selectedWeek) return;
    setIsAdding(true);
    const nextOrder = (selectedWeek.modules?.length || 0) + 1;
    const res = await addModule(selectedWeek.id, nextOrder);
    
    if (res.success && res.data) {
      const newModule = res.data;
      const updatedWeeks = weeks.map(w => {
        if (w.id === selectedWeek.id) {
          return {
            ...w,
            modules: [...(w.modules || []), newModule].sort((a, b) => a.order_index - b.order_index)
          };
        }
        return w;
      });
      setWeeks(updatedWeeks);
      const updatedWeek = updatedWeeks.find(w => w.id === selectedWeek.id);
      setSelectedWeek(updatedWeek);
      setSelectedModule(newModule);
    } else {
      alert("Error adding module: " + res.error);
    }
    setIsAdding(false);
  };

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

  const handleDeleteModule = async () => {
    if (!selectedModule) return;
    if (!confirm(`Are you sure you want to delete "${selectedModule.title}"? This cannot be undone.`)) return;
    
    setIsDeleting(true);
    const res = await deleteModule(selectedModule.id);
    
    if (res.success) {
      const updatedWeeks = weeks.map(w => {
        if (w.id === selectedWeek.id) {
          return {
            ...w,
            modules: w.modules.filter((m: any) => m.id !== selectedModule.id)
          };
        }
        return w;
      });
      setWeeks(updatedWeeks);
      const currentUpdatedWeek = updatedWeeks.find(w => w.id === selectedWeek.id);
      setSelectedWeek(currentUpdatedWeek);
      setSelectedModule(null);
      alert("Module deleted.");
    } else {
      alert("Error deleting: " + res.error);
    }
    setIsDeleting(false);
  };

  const handleUpdateResources = async () => {
    const { data } = await supabase.from('resources').select('*');
    if (data) setResources(data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      {/* Sidebar: Week Selection */}
      <div className="lg:col-span-1 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-2">Select Phase</h3>
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
                <p className={cn("text-xs font-black uppercase tracking-widest", selectedWeek?.id === week.id ? "text-white/40" : "text-brand-navy/20")}>Phase 0{week.week_number}</p>
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
                <p className="text-brand-orange font-black uppercase tracking-widest text-xs mb-1">Editing Phase 0{selectedWeek.week_number}</p>
                <h2 className="text-3xl font-black text-brand-navy tracking-tight">{selectedWeek.title}</h2>
              </div>
              <div className="flex gap-2">
                {selectedWeek.week_number === 6 && (
                    <BrandButton 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2 text-xs text-brand-navy/40"
                        onClick={handleSync}
                        isLoading={isSyncing}
                    >
                        <RefreshCcw className={cn("w-3 h-3", isSyncing && "animate-spin")} /> Sync Assets
                    </BrandButton>
                )}
                <BrandButton 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 text-xs"
                    onClick={handleAddModule}
                    isLoading={isAdding}
                >
                    <Plus className="w-3 h-3" /> Add Module
                </BrandButton>
              </div>
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
                      <p className="text-xs font-black uppercase text-brand-navy/20">Module 0{selectedWeek.week_number}.0{mod.order_index}</p>
                      <h5 className="font-bold text-brand-navy text-xs truncate">{mod.title}</h5>
                    </div>
                  </button>
                ))}
              </div>

              {/* Module Editor Form */}
              <div className="bg-white rounded-3xl border border-brand-navy/5 p-8 shadow-sm h-fit">
                {selectedModule ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">Title</label>
                      <input 
                        type="text" 
                        value={selectedModule.title}
                        onChange={(e) => setSelectedModule({...selectedModule, title: e.target.value})}
                        className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-xs font-bold text-brand-navy focus:border-brand-orange/20 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1 flex items-center justify-between">
                        Video URL / ID
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
                      <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">Description</label>
                      <textarea 
                        rows={3}
                        value={selectedModule.content || ''}
                        onChange={(e) => setSelectedModule({...selectedModule, content: e.target.value})}
                        className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl py-3 px-4 text-xs font-medium text-brand-navy focus:border-brand-orange/20 outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="pt-4 space-y-6">
                      <BrandButton 
                        variant="primary" 
                        className="w-full" 
                        onClick={handleSaveModule}
                        isLoading={isSaving}
                      >
                        <Save className="w-4 h-4 mr-2" /> Save Module
                      </BrandButton>

                      <button 
                        onClick={handleDeleteModule}
                        disabled={isDeleting}
                        className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-red-500/40 hover:text-red-500 transition-colors py-2"
                      >
                        {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                        Delete This Module
                      </button>
                      
                      <div className="pt-6 border-t border-brand-navy/5">
                        <ResourceUploader 
                          moduleId={selectedModule.id} 
                          existingResources={resources}
                          onUpdate={handleUpdateResources}
                        />
                      </div>
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
