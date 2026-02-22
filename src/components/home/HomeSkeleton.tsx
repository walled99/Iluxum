import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";

export function HomeSkeleton() {
  return (
    <div className="flex flex-col gap-y-20 lg:gap-y-32 pb-20">
      {/* Hero Skeleton */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <Skeleton className="absolute inset-0 rounded-none" />
        <div className="container-custom relative z-10 flex items-center h-full">
          <div className="max-w-3xl space-y-8">
            <Skeleton className="h-4 w-48" />
            <div className="space-y-3">
              <Skeleton className="h-16 md:h-24 lg:h-28 w-72 md:w-96" />
              <Skeleton className="h-16 md:h-24 lg:h-28 w-56 md:w-80 ms-20 lg:ms-32" />
            </div>
            <Skeleton className="h-5 w-full max-w-xl" />
            <Skeleton className="h-5 w-3/4 max-w-md" />
            <Skeleton className="h-14 w-56" />
          </div>
        </div>
      </section>

      {/* Category Carousel Skeleton */}
      <div className="bg-[#FAF9F6]">
        <div className="container-custom space-y-10 py-16">
          <div className="flex justify-between items-end border-b border-ink/5 pb-6">
            <div className="space-y-2">
              <Skeleton className="h-10 lg:h-12 w-64 lg:w-80" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-3 w-20" />
          </div>

          <div className="flex gap-8 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex-none w-[80vw] sm:w-[40vw] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
              >
                <Skeleton className="aspect-[4/5] w-full rounded-[2.5rem]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Skeleton */}
      <section className="bg-surface py-20 lg:py-32">
        <div className="container-custom space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-y-6">
            <div className="space-y-4">
              <Skeleton className="h-10 lg:h-14 w-56 lg:w-72" />
              <Skeleton className="h-3 w-64" />
            </div>
            <Skeleton className="h-3 w-32" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Narrative Skeleton */}
      <section className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Skeleton className="aspect-[16/9] lg:aspect-square w-full rounded-none" />
          </div>
          <div className="lg:col-span-5 space-y-8">
            <Skeleton className="h-3 w-28" />
            <div className="space-y-3">
              <Skeleton className="h-10 lg:h-14 w-48" />
              <Skeleton className="h-10 lg:h-14 w-36 ms-4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            <Skeleton className="h-14 w-56" />
          </div>
        </div>
      </section>
    </div>
  );
}
