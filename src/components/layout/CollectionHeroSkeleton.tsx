import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";

export function CollectionHeroSkeleton() {
  return (
    <div className="flex flex-col gap-y-8 lg:gap-y-12 pb-20">
      {/* Breadcrumb Skeleton */}
      <div className="container-custom pt-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>

      {/* Hero Banner Skeleton */}
      <div className="relative h-[40vh] lg:h-[60vh] w-full overflow-hidden">
        <Skeleton className="absolute inset-0 rounded-none" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-y-6">
          <Skeleton className="h-12 lg:h-16 w-64 lg:w-96" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <Skeleton className="h-4 w-3/4 max-w-md" />
        </div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
