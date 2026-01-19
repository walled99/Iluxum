import { getSearchResults } from "@/lib/shopify/client";
import { ProductCard } from "@/components/products/ProductCard";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const products = query ? await getSearchResults(query) : [];

  return (
    <div className="container-custom py-12 lg:py-20">
      <div className="flex flex-col gap-y-12">
        <header className="flex flex-col gap-y-4">
          <h1 className="font-heading text-4xl lg:text-6xl font-bold text-ink italic leading-tight">
            Search Results
          </h1>
          <p className="font-body text-sm text-ink/60 uppercase tracking-widest">
            {products.length} {products.length === 1 ? "result" : "results"} for "{query}"
          </p>
        </header>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-y-6">
            <p className="font-body text-lg italic text-ink/40">
              We couldn't find any products matching your search.
            </p>
            <div className="max-w-md w-full border-t border-surface pt-6">
              <p className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-ink/20">
                Suggestions: Try using more general terms or check your spelling.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
