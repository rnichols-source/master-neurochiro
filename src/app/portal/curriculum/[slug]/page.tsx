import { fetchWeekDetail } from "@/app/actions/curriculum-actions";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

// Next.js 15: params is a Promise
export default async function WeekDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params?.slug;
  
  if (!slug) {
    notFound();
  }

  // Debug log
  console.log(`[DEBUG] Attempting to load week: ${slug}`);

  try {
    const result = await fetchWeekDetail(slug);
    
    if (!result.success || !result.data) {
      console.error(`[ERROR] Week detail fetch failed for ${slug}:`, result.error);
      return (
        <div className="p-20 text-center">
          <h1 className="text-2xl font-bold text-red-600">Phase Not Found</h1>
          <p className="mt-4 text-gray-600">The curriculum phase "{slug}" could not be loaded.</p>
          <Link href="/portal/curriculum" className="mt-8 text-blue-600 underline inline-block">Return to Overview</Link>
        </div>
      );
    }

    const { week, modules } = result.data;

    return (
      <div className="p-10 max-w-4xl mx-auto space-y-10">
        <Link href="/portal/curriculum" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-orange-500">
          <ChevronLeft className="w-3 h-3" /> Back to Curriculum
        </Link>

        <div className="space-y-4 border-b border-gray-100 pb-10">
          <p className="text-orange-500 font-black uppercase text-[10px]">Phase 0{week?.week_number}</p>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">{week?.title}</h1>
          <p className="text-gray-500 font-medium max-w-xl">
            {week?.description}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Training Units</h3>
          <div className="grid gap-4">
            {(modules || []).map((mod: any) => (
              <div key={mod.id} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                  <p className="text-[8px] font-black text-gray-400 uppercase">Module {week?.week_number}.{mod.order_index}</p>
                  <h4 className="text-lg font-bold text-slate-900">{mod.title}</h4>
                </div>
                {mod.status !== 'locked' ? (
                  <Link href={`/portal/curriculum/${week?.slug}/${mod.slug}`} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold">
                    View Unit
                  </Link>
                ) : (
                  <span className="text-xs font-bold text-gray-300 uppercase">Locked</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (err: any) {
    console.error("[CRITICAL] Page crash:", err);
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl font-bold text-red-600">System Error</h1>
        <p className="mt-4 text-gray-600">A server-side error occurred while rendering this phase.</p>
        <p className="mt-2 text-xs text-gray-400 italic">Error: {err.message || "Unknown"}</p>
        <Link href="/portal/curriculum" className="mt-8 text-blue-600 underline inline-block">Return to Overview</Link>
      </div>
    );
  }
}
