import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; href: string };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      <div className="w-14 h-14 rounded-2xl bg-brand-navy/5 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-brand-gray/40" />
      </div>
      <h3 className="text-lg font-black text-brand-navy mb-1">{title}</h3>
      <p className="text-sm text-brand-gray font-medium max-w-sm mb-6">{description}</p>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center justify-center bg-brand-navy text-white rounded-xl py-3 px-6 text-sm font-bold hover:bg-brand-black transition-colors active:scale-[0.98] touch-target"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
