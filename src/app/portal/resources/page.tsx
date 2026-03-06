import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  FileText, 
  Video, 
  Link as LinkIcon, 
  Music,
  Search,
  Download,
  Shield,
  ArrowUpRight
} from "lucide-react";
import { fetchResources } from "@/app/actions/curriculum-actions";
import { cn } from "@/lib/utils";

const typeIcons: Record<string, any> = {
  pdf: FileText,
  video: Video,
  link: LinkIcon,
  audio: Music,
};

export default async function ResourcesPage() {
  const result = await fetchResources();
  const resources = result.success ? result.data : [];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">The Vault</p>
            <h1 className="text-5xl font-black text-brand-navy tracking-tighter">Proprietary Assets</h1>
            <p className="text-brand-gray font-medium max-w-xl">
              Access clinical scripts, worksheets, and technical blueprints 
              required for your installation.
            </p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/30" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="w-full bg-white border border-brand-navy/5 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all shadow-sm shadow-brand-navy/5"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.length === 0 ? (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-brand-navy/5 rounded-[3rem]">
              <p className="text-sm font-black text-brand-navy/20 uppercase tracking-widest">No resources available yet.</p>
            </div>
          ) : (
            resources.map((item: any) => {
              const Icon = typeIcons[item.type] || FileText;
              return (
                <EliteCard key={item.id} className="p-0 overflow-hidden group hover:border-brand-orange/40 transition-all">
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center text-brand-navy group-hover:bg-brand-orange group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      {item.is_pro_only && (
                        <div className="flex items-center gap-1 bg-brand-orange/10 text-brand-orange px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">
                          <Shield className="w-2 h-2" /> Pro Access
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-brand-navy tracking-tight group-hover:text-brand-orange transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[10px] font-black uppercase text-brand-navy/30 mt-1 tracking-widest">
                        {item.type} &bull; {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <BrandButton variant="outline" className="w-full text-[10px] py-4 group">
                        {item.type === 'link' ? (
                          <>Open Resource <ArrowUpRight className="ml-2 w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
                        ) : (
                          <>Download File <Download className="ml-2 w-3 h-3 group-hover:translate-y-0.5 transition-transform" /></>
                        )}
                      </BrandButton>
                    </a>
                  </div>
                </EliteCard>
              );
            })
          )}
        </div>

        {/* Pro Up-sell CTA (Static for standard members) */}
        <EliteCard className="bg-brand-navy text-white border-none p-12 overflow-hidden relative">
          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-4xl font-black tracking-tighter leading-tight">
              Unlock the Full <span className="text-brand-orange">Clinical Blueprint.</span>
            </h2>
            <p className="text-lg text-white/60 font-medium leading-relaxed">
              Pro-tier members get exclusive access to our entire library of 
              internal operating procedures and proprietary scripts.
            </p>
            <BrandButton variant="accent" size="lg" className="px-10">
              Upgrade to Pro Level
            </BrandButton>
          </div>
          {/* Decorative N */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 text-[20rem] font-black text-white/5 pointer-events-none select-none">
            N
          </div>
        </EliteCard>
      </div>
    </DashboardLayout>
  );
}
