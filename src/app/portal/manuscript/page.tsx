import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard } from "@/components/ui/elite-ui";
import { getManuscriptContent } from "@/app/actions/manuscript-actions";
import { BookOpen, ChevronLeft, Download, Share2, ZoomIn } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function ManuscriptPage() {
  const result = await getManuscriptContent();
  
  if (!result.success) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-brand-navy/40 font-black uppercase tracking-widest">{result.error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        {/* Navigation / Actions */}
        <div className="flex justify-between items-center">
          <Link href="/portal/curriculum" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-orange transition-colors">
            <ChevronLeft className="w-3 h-3" /> Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-brand-orange/10 rounded-lg text-brand-navy/40 hover:text-brand-orange transition-all">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-brand-orange/10 rounded-lg text-brand-navy/40 hover:text-brand-orange transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center space-y-4 py-12 border-b border-brand-navy/5">
          <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px]">Proprietary Manuscript</p>
          <h1 className="text-6xl font-black text-brand-navy tracking-tighter leading-none">
            NeuroChiro
          </h1>
          <p className="text-brand-gray text-xl font-medium italic">
            "The Nervous-System-First Framework for Modern Chiropractic"
          </p>
        </div>

        {/* Reader Interface */}
        <EliteCard className="p-0 overflow-hidden shadow-2xl border-none ring-1 ring-brand-navy/5">
          <div className="bg-brand-navy/[0.02] p-6 border-b border-brand-navy/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-brand-orange" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy">Reading Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-white rounded-full border border-brand-navy/5 text-[9px] font-bold text-brand-navy/40 uppercase">
                Draft V1.0
              </div>
            </div>
          </div>

          <div className="p-12 md:p-20 bg-[#FCFBF7] min-h-[1000px] prose prose-slate max-w-none">
            {/* Custom Markdown Components for Elite Branding */}
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-4xl font-black text-brand-navy tracking-tight mb-8 mt-12 border-b-4 border-brand-orange/20 pb-4 inline-block" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-black text-brand-navy tracking-tight mb-6 mt-16 flex items-center gap-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold text-brand-navy tracking-tight mb-4 mt-12" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-lg font-bold text-brand-orange tracking-tight mb-3 mt-8 uppercase text-[12px] tracking-widest" {...props} />,
                p: ({node, ...props}) => <p className="text-brand-navy/80 text-lg leading-relaxed mb-6 font-medium" {...props} />,
                strong: ({node, ...props}) => <strong className="font-black text-brand-navy" {...props} />,
                ul: ({node, ...props}) => <ul className="space-y-4 mb-8 list-none pl-0" {...props} />,
                li: ({node, ...props}) => (
                  <li className="flex items-start gap-3 text-brand-navy/80 font-medium">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    <span {...props} />
                  </li>
                ),
                hr: ({node, ...props}) => <hr className="my-16 border-t-2 border-brand-navy/5" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-brand-orange bg-brand-orange/5 p-8 my-8 rounded-r-2xl italic font-medium text-brand-navy/70 text-xl" {...props} />
                ),
              }}
            >
              {result.data}
            </ReactMarkdown>
          </div>
        </EliteCard>

        {/* Footer */}
        <div className="text-center py-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy/20">
            © 2026 Master NeuroChiro • All Rights Reserved
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
