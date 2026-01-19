import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
