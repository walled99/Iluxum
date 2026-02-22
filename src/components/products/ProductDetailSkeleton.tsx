import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="container-custom py-8 lg:py-12 space-y-20 lg:space-y-32">
      <div className="space-y-8 lg:space-y-12">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-32" />
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* Gallery Skeleton (Start Side) */}
          <div className="lg:col-span-7 space-y-4">
            <Skeleton className="aspect-[4/5] w-full rounded-none" />
            {/* Thumbnail row */}
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-16 lg:w-20 rounded-none" />
              ))}
            </div>
          </div>

          {/* Info Skeleton (End Side) */}
          <div className="lg:col-span-5 ps-0 lg:ps-4 space-y-8">
            {/* Title */}
            <div className="space-y-3">
              <Skeleton className="h-8 lg:h-10 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-5 w-20" />
            </div>

            {/* Variant Options */}
            <div className="space-y-4">
              <Skeleton className="h-3 w-12" />
              <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-14 rounded-none" />
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Skeleton className="h-14 w-full rounded-none" />

            {/* Description */}
            <div className="space-y-3 pt-6 border-t border-surface">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Skeleton */}
      <div className="space-y-8">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-y-4">
              <Skeleton className="aspect-[4/5] w-full rounded-none" />
              <div className="space-y-2 ps-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
