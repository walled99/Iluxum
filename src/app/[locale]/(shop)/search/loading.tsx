import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="flex flex-col gap-y-8 lg:gap-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-14" />
        </div>

        {/* Header */}
        <div className="flex flex-col gap-y-4">
          <Skeleton className="h-10 lg:h-14 w-64 lg:w-80" />
          <Skeleton className="h-3 w-48" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
