import { Skeleton } from "@/components/ui/skeleton";

export default function KPILoading() {
  return (
    <div className="space-y-6 p-4 md:p-10">
      <Skeleton className="h-8 w-36" />
      <Skeleton className="h-48 rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
    </div>
  );
}
