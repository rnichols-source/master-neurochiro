"use client";

import { useState } from "react";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { 
  Upload, 
  Video,
  FileText,
  Send,
  MessageSquare
} from "lucide-react";

const submissions = [
  { id: 1, type: 'Video', title: 'Day 2 ROF Practice', status: 'Completed', date: 'Oct 12, 2025', feedback: 'Great tone calibration. Watch the transition into the financial ask.' },
  { id: 2, type: 'Metric', title: 'Week 4 KPI Sheet', status: 'Pending', date: 'Oct 24, 2025', feedback: null },
];

export function ProFeedbackClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Pro Feedback</h1>
          <p className="text-sm text-brand-gray font-medium mt-1">Submit recordings or scripts for direct review from Dr. Nichols.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Submission Form */}
        <div className="lg:col-span-1">
          <EliteCard title="New Submission" subtitle="Upload for Review" icon={Upload}>
            <form className="space-y-6 mt-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Review Type</label>
                <select className="w-full bg-brand-cream/50 border-brand-navy/5 rounded-xl p-4 text-xs font-bold outline-none">
                  <option>Script / Video Breakdown</option>
                  <option>KPI / Revenue Audit</option>
                  <option>Team Structure Review</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40">Title</label>
                <input type="text" placeholder="e.g. My Week 2 ROF Video" className="w-full bg-brand-cream/50 border-brand-navy/5 rounded-xl p-4 text-xs font-bold outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-navy/40">Video Link (Loom, YouTube, or Vimeo)</label>
                <input type="url" placeholder="https://www.loom.com/share/..." className="w-full bg-white border border-brand-navy/10 rounded-xl py-4 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20 outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-navy/40">Notes (optional)</label>
                <textarea rows={3} placeholder="Any context or specific questions..." className="w-full bg-white border border-brand-navy/10 rounded-xl py-4 px-4 text-base font-medium text-brand-navy focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20 outline-none resize-none" />
              </div>

              <BrandButton variant="primary" className="w-full py-4 group">
                Submit for Priority Review <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </BrandButton>
            </form>
          </EliteCard>
        </div>

        {/* Submission History */}
        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-2">Review History</h3>
           <div className="space-y-4">
             {submissions.map((sub) => (
               <EliteCard key={sub.id} className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex items-start gap-6">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        sub.type === 'Video' ? "bg-brand-orange/10 text-brand-orange" : "bg-brand-navy/10 text-brand-navy"
                      )}>
                        {sub.type === 'Video' ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-lg font-black text-brand-navy">{sub.title}</h4>
                          <span className={cn(
                            "text-xs font-black uppercase px-2 py-1 rounded-md",
                            sub.status === 'Completed' ? "bg-green-500/10 text-green-500" : "bg-brand-orange/10 text-brand-orange"
                          )}>
                            {sub.status}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest">Submitted on {sub.date}</p>
                      </div>
                    </div>

                    {sub.feedback && (
                      <div className="w-full md:w-1/2 bg-brand-cream/50 rounded-2xl p-6 relative">
                        <MessageSquare className="w-4 h-4 text-brand-orange absolute -top-2 -left-2" />
                        <p className="text-xs font-medium text-brand-navy/80 italic leading-relaxed">
                          "{sub.feedback}"
                        </p>
                      </div>
                    )}
                  </div>
               </EliteCard>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
