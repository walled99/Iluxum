"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/lib/shopify/types";
import { useCartStore } from "@/lib/store/useCartStore";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCartStore();
  const price = product.priceRange.minVariantPrice;
  const firstVariant = product.variants.edges[0]?.node;

  const handleAddToCart = () => {
    if (firstVariant) {
      addItem(firstVariant, {
        id: product.id,
        title: product.title,
        handle: product.handle,
        featuredImage: product.featuredImage,
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-8 sticky top-8">
      <div className="flex flex-col gap-y-2">
        <h1 className="font-heading text-4xl leading-tight text-ink md:text-5xl">
          {product.title}
        </h1>
        <p className="font-body text-xl font-medium text-ink/80">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: price.currencyCode,
          }).format(parseFloat(price.amount))}
        </p>
      </div>

      <div className="prose prose-ink max-w-none font-body text-ink/70">
        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
      </div>

      <div className="pt-4">
        <Button
          onClick={handleAddToCart}
          className="w-full h-14 text-lg font-bold bg-accent text-primary hover:bg-accent/90 rounded-none transition-all duration-300"
          size="lg"
        >
          ADD TO CART
        </Button>
      </div>

      <div className="flex flex-col gap-y-4 border-t border-surface pt-8">
        <p className="font-body text-sm text-ink/60 uppercase tracking-widest">
          Composition & Care
        </p>
        <p className="font-body text-xs text-ink/50 leading-relaxed">
          The materials in this product are sourced responsibly. Please refer to our sustainability report for further information.
        </p>
      </div>
    </div>
  );
}
