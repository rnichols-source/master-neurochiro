import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Calculator, TrendingUp, Sun, MessageSquare, Users, Mic, Briefcase, DollarSign, Target, ClipboardCheck } from "lucide-react";
import Link from "next/link";

const practiceTools = [
  { name: "Care Plan Calculator", desc: "Prep your pricing and payment options.", href: "/portal/tools/case-calculator", icon: Calculator },
  { name: "Break-Even Calculator", desc: "How many visits to cover your costs?", href: "/portal/tools/break-even", icon: TrendingUp },
  { name: "Daily Huddle", desc: "2-minute morning check-in for your team.", href: "/portal/tools/huddle", icon: Sun },
  { name: "Reactivation Scripts", desc: "Bring back inactive patients.", href: "/portal/tools/reactivation", icon: MessageSquare },
  { name: "Retention Tracker", desc: "See who finishes care and who drops off.", href: "/portal/tools/retention", icon: Users },
];

const studentTools = [
  { name: "Practice Conversations", desc: "Random patient scenarios to rehearse your scripts.", href: "/portal/tools/practice-scenarios", icon: Mic },
  { name: "Interview Prep", desc: "Questions they'll ask and questions to ask them.", href: "/portal/tools/interview-prep", icon: Briefcase },
  { name: "First Year Budget", desc: "See what your finances look like after graduation.", href: "/portal/tools/budget-planner", icon: DollarSign },
  { name: "Confidence Tracker", desc: "Rate your skills weekly and track improvement.", href: "/portal/tools/confidence-tracker", icon: Target },
  { name: "Job Offer Evaluator", desc: "Is that associate position actually a good deal?", href: "/portal/tools/job-evaluator", icon: ClipboardCheck },
];

function ToolCard({ tool }: { tool: typeof practiceTools[0] }) {
  return (
    <Link href={tool.href}>
      <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm hover:border-brand-orange/30 transition-all group h-full">
        <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center mb-3 group-hover:bg-brand-orange transition-colors">
          <tool.icon className="w-5 h-5 text-brand-navy group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-base font-black text-brand-navy mb-1">{tool.name}</h3>
        <p className="text-sm text-brand-gray font-medium">{tool.desc}</p>
      </div>
    </Link>
  );
}

export default function ToolsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8 pb-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Tools</h1>
          <p className="text-sm text-brand-gray font-medium mt-1">Quick calculators and templates — for your practice or your career.</p>
        </div>

        <div>
          <p className="text-sm font-bold text-brand-navy mb-3">For Clinic Owners</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {practiceTools.map((tool) => <ToolCard key={tool.href} tool={tool} />)}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-brand-navy mb-3">For Students &amp; New Grads</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {studentTools.map((tool) => <ToolCard key={tool.href} tool={tool} />)}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
