import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Calculator, TrendingUp, Sun, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    name: "Care Plan Calculator",
    desc: "Prep your pricing and payment options before any care plan presentation.",
    href: "/portal/tools/case-calculator",
    icon: Calculator,
  },
  {
    name: "Break-Even Calculator",
    desc: "How many visits do you need just to cover your costs?",
    href: "/portal/tools/break-even",
    icon: TrendingUp,
  },
  {
    name: "Daily Huddle",
    desc: "Open every morning. 2 minutes to know where you stand today.",
    href: "/portal/tools/huddle",
    icon: Sun,
  },
  {
    name: "Reactivation Scripts",
    desc: "Ready-to-use phone, text, and email scripts to bring back inactive patients.",
    href: "/portal/tools/reactivation",
    icon: MessageSquare,
  },
  {
    name: "Retention Tracker",
    desc: "See how many patients finish care — and what you're losing when they don't.",
    href: "/portal/tools/retention",
    icon: Users,
  },
];

export default function ToolsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 pb-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
            Practice Tools
          </h1>
          <p className="text-sm text-brand-gray font-medium mt-1">
            Quick calculators and templates to run your practice smarter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <div className="bg-white rounded-2xl border border-brand-navy/5 p-5 shadow-sm hover:border-brand-orange/30 transition-all group h-full">
                <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center mb-3 group-hover:bg-brand-orange transition-colors">
                  <tool.icon className="w-5 h-5 text-brand-navy group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-black text-brand-navy mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm text-brand-gray font-medium">
                  {tool.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
