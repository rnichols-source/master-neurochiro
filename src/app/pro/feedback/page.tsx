import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EliteCard, BrandButton } from "@/components/ui/elite-ui";
import { 
  Video, 
  FileText, 
  Send, 
  History,
  MessageSquare,
  Clock,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProFeedbackPage() {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div className="max-w-2xl">
            <p className="text-brand-orange font-bold uppercase tracking-wider text-xs mb-3">
              Pro Member Exclusive
            </p>
            <h1 className="text-4xl font-black text-brand-navy tracking-tight mb-4">
              Priority Review & Feedback
            </h1>
            <p className="text-brand-gray font-medium">
              Submit your ROF recordings, patient communication scripts, or clinical questions 
              for direct video feedback from the leadership team.
            </p>
          </div>
          <BrandButton variant="accent" className="gap-2">
            <Send className="w-4 h-4" /> New Submission
          </BrandButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submission Form Area */}
          <div className="lg:col-span-2 space-y-6">
            <EliteCard title="New Submission" subtitle="What are we reviewing today?">
              <form className="space-y-6 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className="p-4 rounded-xl border-2 border-brand-navy/10 flex flex-col items-center gap-2 hover:border-brand-orange/40 transition-all group">
                    <Video className="w-6 h-6 text-brand-navy/40 group-hover:text-brand-orange" />
                    <span className="text-xs font-black uppercase tracking-widest">Video Upload</span>
                  </button>
                  <button type="button" className="p-4 rounded-xl border-2 border-brand-navy/10 flex flex-col items-center gap-2 hover:border-brand-orange/40 transition-all group">
                    <FileText className="w-6 h-6 text-brand-navy/40 group-hover:text-brand-orange" />
                    <span className="text-xs font-black uppercase tracking-widest">Written Script</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-brand-navy/60">Topic / Context</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Day 2 Report of Findings - $3k Care Plan" 
                    className="w-full bg-brand-cream border-none rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-brand-orange/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-brand-navy/60">Specific Question</label>
                  <textarea 
                    rows={4}
                    placeholder="What specific part do you want us to focus on?" 
                    className="w-full bg-brand-cream border-none rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-brand-orange/20 transition-all resize-none"
                  />
                </div>

                <BrandButton className="w-full">Submit for Review</BrandButton>
              </form>
            </EliteCard>
          </div>

          {/* History / Queue */}
          <div className="space-y-6">
            <EliteCard title="Submission History" icon={History}>
              <div className="space-y-4">
                {[
                  { title: "Initial ROF Mockup", date: "2 days ago", status: "reviewed" },
                  { title: "Day 1 Consultation", date: "5 days ago", status: "pending" },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-brand-cream rounded-xl group cursor-pointer hover:bg-white transition-all border border-transparent hover:border-brand-navy/5">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-bold text-brand-navy">{item.title}</p>
                      {item.status === "reviewed" ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <Clock className="w-3 h-3 text-brand-orange" />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-brand-navy/40 font-bold uppercase">{item.date}</p>
                      <p className={cn(
                        "text-xs font-black uppercase tracking-widest",
                        item.status === "reviewed" ? "text-green-500" : "text-brand-orange"
                      )}>
                        {item.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </EliteCard>

            <EliteCard title="Elite Tip" className="bg-brand-navy text-white border-none">
              <div className="flex gap-4">
                <div className="p-2 bg-brand-orange rounded-lg h-fit">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium leading-relaxed opacity-80">
                    Pro members see 40% faster conversion growth when submitting 
                    at least one video per week for review.
                  </p>
                </div>
              </div>
            </EliteCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
