"use client";

import { useState } from "react";
import { EliteCard } from "@/components/ui/elite-ui";
import { cn } from "@/lib/utils";
import {
  FileText,
  TrendingUp,
  Settings,
  Calculator,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

type ResourceType = "PDF" | "Template" | "Script" | "Link";

interface Resource {
  title: string;
  type: ResourceType;
  href?: string;
}

interface Category {
  title: string;
  icon: React.ElementType;
  resources: Resource[];
}

const typeBadgeColors: Record<ResourceType, string> = {
  PDF: "bg-blue-500/10 text-blue-600",
  Template: "bg-green-500/10 text-green-600",
  Script: "bg-orange-500/10 text-orange-600",
  Link: "bg-purple-500/10 text-purple-600",
};

const categories: Category[] = [
  {
    title: "Contracts & Agreements",
    icon: FileText,
    resources: [
      { title: "Associate Agreement Template", type: "PDF", href: "/vault/associate-agreement.html" },
      { title: "Non-Compete Agreement Template", type: "PDF", href: "/vault/non-compete-agreement.html" },
      { title: "Independent Contractor Agreement", type: "PDF", href: "/vault/independent-contractor-agreement.html" },
      { title: "Partnership / Buy-In Agreement", type: "PDF", href: "/vault/partnership-agreement.html" },
    ],
  },
  {
    title: "Marketing Materials",
    icon: TrendingUp,
    resources: [
      { title: "New Patient Welcome Packet", type: "Template", href: "/vault/welcome-packet.html" },
      { title: "Patient Reactivation Letters (3 versions)", type: "Template", href: "/vault/reactivation-letters.html" },
      { title: "Referral Program Kit", type: "Template", href: "/vault/referral-program.html" },
      { title: "Social Media Content Calendar (30 days)", type: "Template", href: "/vault/social-media-kit.html" },
    ],
  },
  {
    title: "Practice Systems",
    icon: Settings,
    resources: [
      { title: "Morning Huddle System", type: "PDF", href: "/vault/morning-huddle.html" },
      { title: "Front Desk Phone Scripts (10 scripts)", type: "Script", href: "/vault/phone-scripts.html" },
      { title: "New Patient Onboarding Checklist", type: "PDF", href: "/vault/onboarding-checklist.html" },
      { title: "Staff Training Manual Template", type: "Template", href: "/vault/staff-training-manual.html" },
    ],
  },
  {
    title: "Financial Tools",
    icon: Calculator,
    resources: [
      { title: "Care Plan Pricing Calculator", type: "Link", href: "/portal/engine" },
      { title: "Monthly P&L Template", type: "Template", href: "/vault/monthly-pnl.html" },
      { title: "Insurance Verification Checklist", type: "PDF", href: "/vault/insurance-verification.html" },
      { title: "Care Plan Pricing Guide", type: "PDF", href: "/vault/pricing-guide.html" },
    ],
  },
];

function CategoryCard({ category }: { category: Category }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = category.icon;

  return (
    <EliteCard
      className={cn("p-0 overflow-hidden", expanded && "ring-1 ring-brand-orange/20")}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-cream/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-navy/5 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-brand-navy/60" />
          </div>
          <div>
            <h3 className="text-lg font-black text-brand-navy tracking-tight">
              {category.title}
            </h3>
            <p className="text-xs font-bold text-brand-navy/40 uppercase tracking-wider">
              {category.resources.length} resources
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-brand-navy/30 transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded && (
        <div className="border-t border-brand-navy/5 divide-y divide-brand-navy/5">
          {category.resources.map((resource) => (
            <div
              key={resource.title}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-brand-navy">
                  {resource.title}
                </span>
                <span
                  className={cn(
                    "text-xs font-black uppercase px-2 py-0.5 rounded-md",
                    typeBadgeColors[resource.type]
                  )}
                >
                  {resource.type}
                </span>
              </div>

              {resource.href?.startsWith("/vault/") ? (
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-navy transition-colors"
                >
                  Open <ExternalLink className="w-3 h-3" />
                </a>
              ) : resource.href ? (
                <Link
                  href={resource.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-navy transition-colors"
                >
                  Open <ExternalLink className="w-3 h-3" />
                </Link>
              ) : (
                <button
                  disabled
                  className="text-xs font-bold text-brand-navy/20 uppercase tracking-wider cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </EliteCard>
  );
}

export function ProVaultClient() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
          Pro Resource Vault
        </h1>
        <p className="text-sm text-brand-gray font-medium mt-1">
          Templates, scripts, and tools to run your practice like a business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </div>
    </div>
  );
}
