import { Skeleton } from "@/components/ui/skeleton";

export default function CurriculumLoading() {
  return (
    <div className="space-y-6 p-4 md:p-10">
      <Skeleton className="h-8 w-48" />
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
