import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard } from "@/components/ui/elite-ui";
import { searchPortal } from "@/app/actions/search-actions";
import { 
  Search, 
  BookOpen, 
  FileText, 
  ArrowRight,
  ChevronRight 
} from "lucide-react";
import Link from "next/link";

export default async function SearchResultsPage(props: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q: query } = await props.searchParams;
  
  const result = await searchPortal(query);
  const { modules, resources } = result.success && result.data ? result.data : { modules: [], resources: [] };
  
  const totalResults = modules.length + resources.length;

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <div>
          <p className="text-brand-orange font-black uppercase tracking-widest text-xs mb-2">Search Results</p>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tighter leading-none">
            {query ? `Results for "${query}"` : "Portal Search"}
          </h1>
          <p className="text-brand-gray text-sm font-medium mt-4">
            {totalResults > 0 
              ? `Found ${totalResults} relevant units and resources.` 
              : query ? "No direct matches found. Try a different clinical term." : "Enter a search term above."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Module Results */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 ml-2">
              <div className="p-2 bg-brand-navy/5 rounded-lg text-brand-navy"><BookOpen size={16} /></div>
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Training Units</h3>
            </div>
            
            <div className="space-y-4">
              {modules.length > 0 ? modules.map((mod: any) => (
                <Link key={mod.id} href={`/portal/curriculum/${mod.weeks.slug}/${mod.slug}`} className="block group">
                  <EliteCard className="p-6 hover:border-brand-orange/40 transition-all">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-black uppercase text-brand-orange mb-1">{mod.weeks.title}</p>
                        <h4 className="text-lg font-black text-brand-navy group-hover:text-brand-orange transition-colors">{mod.title}</h4>
                      </div>
                      <ChevronRight className="w-5 h-5 text-brand-navy/20 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                    </div>
                  </EliteCard>
                </Link>
              )) : (
                <div className="p-8 border-2 border-dashed border-brand-navy/5 rounded-[2rem] text-center">
                  <p className="text-xs font-bold text-brand-navy/20 uppercase tracking-widest">No matching units</p>
                </div>
              )}
            </div>
          </div>

          {/* Resource Results */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 ml-2">
              <div className="p-2 bg-brand-navy/5 rounded-lg text-brand-navy"><FileText size={16} /></div>
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Clinical Resources</h3>
            </div>

            <div className="space-y-4">
              {resources.length > 0 ? resources.map((res: any) => (
                <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer" className="block group">
                  <EliteCard className="p-6 hover:border-brand-orange/40 transition-all">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-black uppercase text-brand-navy/40 mb-1">{res.type}</p>
                        <h4 className="text-lg font-black text-brand-navy group-hover:text-brand-orange transition-colors">{res.title}</h4>
                      </div>
                      <div className="p-2 bg-brand-navy/5 rounded-xl group-hover:bg-brand-orange/10 transition-colors">
                        <ArrowRight className="w-4 h-4 text-brand-navy/40 group-hover:text-brand-orange" />
                      </div>
                    </div>
                  </EliteCard>
                </a>
              )) : (
                <div className="p-8 border-2 border-dashed border-brand-navy/5 rounded-[2rem] text-center">
                  <p className="text-xs font-bold text-brand-navy/20 uppercase tracking-widest">No matching resources</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Help CTA */}
        <EliteCard className="bg-brand-navy text-white border-none p-10 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="text-2xl font-black tracking-tight">Can't find what you need?</h3>
            <p className="text-white/60 text-sm font-medium">
              If you're looking for a specific clinical protocol or worksheet that isn't appearing, 
              reach out to the leadership team or check the private community channel.
            </p>
            <div className="pt-4">
              <Link href="mailto:support@neurochiromastermind.com">
                <button className="bg-brand-orange text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#B35520] transition-all shadow-xl">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </EliteCard>
      </div>
    </DashboardLayout>
  );
}
