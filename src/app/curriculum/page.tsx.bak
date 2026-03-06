import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard } from "@/components/ui/elite-ui";
import { createClient } from "@/lib/supabase/server";
import { 
  BookOpen, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Clock
} from "lucide-react";
import Link from "next/link";

export default async function CurriculumPage() {
  const supabase = await createClient();
  const { data: weeks } = await supabase
    .from('weeks')
    .select('*')
    .order('week_number', { ascending: true });

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-3">
            The Roadmap to Mastery
          </p>
          <h1 className="text-5xl font-black text-brand-navy tracking-tight mb-6 leading-[0.9]">
            The 8-Week <br />
            Transformation
          </h1>
          <p className="text-brand-gray text-lg leading-relaxed font-medium">
            This is not a linear course. It is a layered reconstruction of your practice, 
            your identity, and your clinical certainty. Move through each week with intent.
          </p>
        </div>

        {/* Weeks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {weeks?.map((week, i) => (
            <Link key={week.id} href={`/curriculum/${week.slug}`}>
              <EliteCard 
                delay={i * 0.05}
                className="h-full hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-brand-navy flex flex-col items-center justify-center text-white">
                    <span className="text-[10px] font-black uppercase tracking-tighter opacity-50">Week</span>
                    <span className="text-2xl font-black leading-none">{week.week_number}</span>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-black text-brand-navy leading-tight group-hover:text-brand-orange transition-colors">
                        {week.title}
                      </h3>
                      {i > 2 ? (
                        <Lock className="w-4 h-4 text-brand-navy/20" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    
                    <p className="text-xs font-bold text-brand-orange uppercase tracking-widest opacity-80">
                      {week.theme}
                    </p>
                    
                    <p className="text-sm text-brand-gray line-clamp-2">
                      {week.description}
                    </p>

                    <div className="pt-4 flex items-center justify-between border-t border-brand-navy/5">
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-brand-navy/40">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> 6 Modules
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> 2.5 Hours
                        </span>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight className="inline w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </EliteCard>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
