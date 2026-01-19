import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      {/* Image Skeleton */}
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      
      <div className="flex flex-col gap-y-2 ps-4 pb-4">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4" />
        {/* Price Skeleton */}
        <Skeleton className="h-5 w-1/4" />
      </div>
    </div>
  );
}
