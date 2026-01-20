import { getProductRecommendations } from "@/lib/shopify/client";
import { ProductCard } from "./ProductCard";

export async function ProductRecommendations({ productId, locale }: { productId: string; locale: string }) {
  const recommendations = await getProductRecommendations(productId);

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <h2 className="font-heading text-3xl lg:text-5xl font-bold text-ink italic leading-tight">
          You May Also Like
        </h2>
        <p className="font-body text-sm text-ink/40 uppercase tracking-[0.2em]">
          Curated specifically for your taste
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
        {recommendations.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </section>
  );
}
