"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import { 
  Upload, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  AlertCircle,
  Video,
  FileText,
  Send
} from "lucide-react";

const submissions = [
  { id: 1, type: 'Video', title: 'Day 2 ROF Practice', status: 'Completed', date: 'Oct 12, 2025', feedback: 'Great tone calibration. Watch the transition into the financial ask.' },
  { id: 2, type: 'Metric', title: 'Week 4 KPI Sheet', status: 'Pending', date: 'Oct 24, 2025', feedback: null },
];

export default function ProFeedback() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-brand-orange font-black uppercase tracking-[0.4em] text-[10px] mb-2">Pro Exclusive</p>
            <h1 className="text-4xl font-black text-brand-navy tracking-tighter leading-none">Priority Feedback Loop</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Submission Form */}
          <div className="lg:col-span-1">
            <EliteCard title="New Submission" subtitle="Upload for Review" icon={Upload}>
              <form className="space-y-6 mt-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Review Type</label>
                  <select className="w-full bg-brand-cream/50 border-brand-navy/5 rounded-xl p-4 text-xs font-bold outline-none">
                    <option>Script / Video Breakdown</option>
                    <option>KPI / Revenue Audit</option>
                    <option>Team Structure Review</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Title</label>
                  <input type="text" placeholder="e.g. My Week 2 ROF Video" className="w-full bg-brand-cream/50 border-brand-navy/5 rounded-xl p-4 text-xs font-bold outline-none" />
                </div>

                <div className="border-2 border-dashed border-brand-navy/10 rounded-2xl p-8 text-center space-y-4 hover:border-brand-orange/40 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-brand-navy/5 flex items-center justify-center mx-auto group-hover:bg-brand-orange/10">
                    <Upload className="w-5 h-5 text-brand-navy/40 group-hover:text-brand-orange" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Drop Video or Image</p>
                </div>

                <BrandButton variant="primary" className="w-full py-4 group">
                  Submit for Priority Review <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </BrandButton>
              </form>
            </EliteCard>
          </div>

          {/* Submission History */}
          <div className="lg:col-span-2 space-y-6">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/40 ml-2">Review History</h3>
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
                              "text-[8px] font-black uppercase px-2 py-1 rounded-md",
                              sub.status === 'Completed' ? "bg-green-500/10 text-green-500" : "bg-brand-orange/10 text-brand-orange"
                            )}>
                              {sub.status}
                            </span>
                          </div>
                          <p className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-widest">Submitted on {sub.date}</p>
                        </div>
                      </div>

                      {sub.feedback && (
                        <div className="md:w-1/2 bg-brand-cream/50 rounded-2xl p-6 relative">
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
    </DashboardLayout>
  );
}
