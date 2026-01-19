import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/shopify/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { title, handle, priceRange, images } = product;
  const mainImage = images.edges[0]?.node;
  const price = priceRange.minVariantPrice;

  return (
    <div className="group flex flex-col gap-y-4 transition-all duration-300">
      <Link href={`/product/${handle}`} className="relative aspect-[4/5] overflow-hidden bg-surface">
        {mainImage && (
          <Image
            src={mainImage.url}
            alt={mainImage.altText || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/5" />
      </Link>

      <div className="flex flex-col gap-y-1 ps-4 pb-4">
        <Link href={`/product/${handle}`}>
          <h3 className="font-heading text-lg leading-tight text-ink transition-colors hover:text-accent">
            {title}
          </h3>
        </Link>
        <p className="font-body text-sm font-medium text-ink/80">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: price.currencyCode,
          }).format(parseFloat(price.amount))}
        </p>
      </div>
    </div>
  );
}
