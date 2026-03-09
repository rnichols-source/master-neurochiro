"use client";

import { useState, useEffect, useMemo } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  Bookmark, 
  Download, 
  Copy, 
  Play, 
  Lock, 
  ArrowRight,
  MessageSquare,
  Target,
  Zap,
  GraduationCap,
  Users,
  Settings,
  ShieldCheck,
  LayoutDashboard,
  Check,
  FileText,
  Video,
  ChevronRight,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchVaultResources, toggleBookmark, incrementDownload } from "@/app/actions/vault-actions";

const categories = [
  { id: 'all', name: 'All Resources', icon: LayoutDashboard },
  { id: 'communication', name: 'Clinical Communication', icon: MessageSquare },
  { id: 'rof', name: 'ROF System', icon: Target },
  { id: 'care_plan', name: 'Care Plan Architecture', icon: Zap },
  { id: 'objections', name: 'Objection Vault', icon: ShieldCheck },
  { id: 'marketing', name: 'Marketing & Reactivation', icon: Users },
  { id: 'staff', name: 'Staff Training', icon: GraduationCap },
  { id: 'clinic_os', name: 'Clinic OS', icon: Settings },
  { id: 'patient_edu', name: 'Patient Education', icon: FileText },
  { id: 'leadership', name: 'CEO & Leadership', icon: Star },
  { id: 'masterclass', name: 'Masterclass Archive', icon: Video },
];

export function VaultClient({ userTier }: { userTier: 'standard' | 'pro' | 'admin' }) {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isPro = userTier === 'pro' || userTier === 'admin';

  useEffect(() => {
    async function loadResources() {
      setLoading(true);
      const res = await fetchVaultResources(activeCategory === 'all' ? undefined : activeCategory, searchQuery);
      if (res.success) {
        setResources(res.data || []);
      }
      setLoading(false);
    }
    loadResources();
  }, [activeCategory, searchQuery]);

  const handleBookmark = async (id: string) => {
    // Optimistic UI could be added here
    await toggleBookmark(id);
    // Refresh list or update state locally
    setResources(prev => prev.map(r => {
      if (r.id === id) {
        const hasBookmark = r.vault_bookmarks && r.vault_bookmarks.length > 0;
        return { 
          ...r, 
          vault_bookmarks: hasBookmark ? [] : [{ id: 'temp' }] 
        };
      }
      return r;
    }));
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredResources = useMemo(() => {
    return resources.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [resources, searchQuery]);

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-brand-orange">
            <ShieldCheck className="w-5 h-5" />
            <p className="font-black uppercase tracking-[0.4em] text-[10px]">Private Intelligence Library</p>
          </div>
          <h1 className="text-5xl font-black text-brand-navy tracking-tighter leading-none">The NeuroChiro Vault</h1>
          <p className="text-brand-gray font-medium max-w-xl">
            Access the complete NeuroChiro operating system. From high-authority clinical communication to advanced practice growth frameworks.
          </p>
        </div>

        <div className="w-full md:w-96 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/20 group-focus-within:text-brand-orange transition-colors" />
          <input 
            type="text"
            placeholder="Search the intelligence library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-brand-navy/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-brand-navy focus:outline-none focus:border-brand-orange/40 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-3 pb-4 -mx-2 px-2 snap-x">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-6 py-4 rounded-2xl flex items-center gap-3 transition-all font-black uppercase tracking-widest text-[9px] whitespace-nowrap snap-start border",
              activeCategory === cat.id 
                ? "bg-brand-navy text-white border-brand-navy shadow-xl shadow-brand-navy/20" 
                : "bg-white text-brand-navy/40 border-brand-navy/5 hover:border-brand-orange/20"
            )}
          >
            <cat.icon className={cn("w-4 h-4", activeCategory === cat.id ? "text-brand-orange" : "text-brand-navy/20")} />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {loading ? (
            [1,2,3,4,5,6].map((i) => (
              <EliteCard key={i} className="h-64 animate-pulse bg-brand-navy/5 border-none">
                <div />
              </EliteCard>
            ))
          ) : filteredResources.length > 0 ? (
            filteredResources.map((res, idx) => {
              const isLocked = res.tier === 'pro' && !isPro;
              const hasBookmark = res.vault_bookmarks && res.vault_bookmarks.length > 0;
              const Icon = categories.find(c => c.id === res.category)?.icon || FileText;

              return (
                <motion.div
                  key={res.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  layout
                >
                  <EliteCard 
                    className={cn(
                      "group h-full flex flex-col p-0 overflow-hidden relative border-brand-navy/5 hover:border-brand-orange/40 transition-all duration-500",
                      isLocked && "opacity-80"
                    )}
                  >
                    {/* Top Bar: Icon + Category */}
                    <div className="p-6 pb-4 flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0",
                          isLocked ? "bg-brand-navy/5 text-brand-navy/20" : "bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white"
                        )}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-navy/40">
                            {categories.find(c => c.id === res.category)?.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {res.resource_type === 'pdf' && <FileText size={10} className="text-brand-navy/20" />}
                            {res.resource_type === 'video' && <Play size={10} className="text-brand-navy/20" />}
                            {res.resource_type === 'script' && <MessageSquare size={10} className="text-brand-navy/20" />}
                            <span className="text-[8px] font-bold uppercase tracking-widest text-brand-navy/20">{res.resource_type}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => !isLocked && handleBookmark(res.id)}
                        disabled={isLocked}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          hasBookmark ? "text-brand-orange bg-brand-orange/5" : "text-brand-navy/20 hover:bg-brand-navy/5 hover:text-brand-navy"
                        )}
                      >
                        <Bookmark size={16} fill={hasBookmark ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Content Area */}
                    <div className={cn("px-6 flex-1", isLocked && "blur-[2px] select-none pointer-events-none")}>
                      <h3 className="text-lg font-black text-brand-navy leading-tight group-hover:text-brand-orange transition-colors">
                        {res.title}
                      </h3>
                      <p className="text-xs text-brand-gray mt-2 line-clamp-2 leading-relaxed">
                        {res.description}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="p-6 pt-4 mt-auto">
                      {isLocked ? (
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-brand-navy/40">
                            <Lock size={12} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Pro Only Access</span>
                          </div>
                          <BrandButton variant="outline" size="sm" className="w-full text-[10px]">
                            Upgrade to Unlock
                          </BrandButton>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-brand-navy/5">
                          <div className="flex items-center gap-2 text-[9px] font-bold text-brand-navy/40">
                            <Download size={12} />
                            <span>{res.download_count || 0}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            {res.resource_type === 'script' && (
                              <button 
                                onClick={() => handleCopy(res.content, res.id)}
                                className="p-2.5 rounded-xl bg-brand-navy/5 text-brand-navy/40 hover:bg-brand-navy hover:text-white transition-all"
                                title="Copy Script"
                              >
                                {copiedId === res.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                              </button>
                            )}
                            <BrandButton 
                              variant={res.resource_type === 'video' ? 'accent' : 'primary'} 
                              size="sm" 
                              className="py-2.5 px-5 text-[10px] rounded-xl"
                              onClick={() => {
                                incrementDownload(res.id);
                                if (res.url) {
                                  window.open(res.url, '_blank', 'noopener,noreferrer');
                                }
                              }}
                            >
                              {res.resource_type === 'video' ? 'Watch Now' : 'Access Library'}
                              <ChevronRight className="ml-1 w-3 h-3" />
                            </BrandButton>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pro Label Overlay for Locked */}
                    {isLocked && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
                        <div className="bg-brand-navy text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl border border-white/10">
                          <Lock size={12} className="text-brand-orange" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Locked Archive</span>
                        </div>
                      </div>
                    )}
                  </EliteCard>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-brand-navy/20">
              <Search size={48} className="mb-4 opacity-10" />
              <p className="font-black uppercase tracking-widest text-sm">No resources found in this category</p>
              <button onClick={() => {setActiveCategory('all'); setSearchQuery('');}} className="mt-4 text-brand-orange text-xs font-bold underline">Reset Filters</button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
