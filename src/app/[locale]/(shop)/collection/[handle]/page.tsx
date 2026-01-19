import { getCollection } from "@/lib/shopify/client";
import { ProductCard } from "@/components/products/ProductCard";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function CollectionPage({
  params,
}: {
  params: { locale: string; handle: string };
}) {
  const collection = await getCollection(params.handle);

  if (!collection) {
    return notFound();
  }

  const products = collection.products.edges.map((edge: any) => edge.node);

  return (
    <div className="flex flex-col gap-y-12 lg:gap-y-20 pb-20">
      {collection.image && (
        <div className="relative h-[40vh] lg:h-[60vh] w-full bg-surface overflow-hidden">
          <Image
            src={collection.image.url}
            alt={collection.image.altText || collection.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-background italic leading-tight drop-shadow-2xl">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="mt-6 max-w-2xl font-body text-sm lg:text-base text-background/90 leading-relaxed drop-shadow-md">
                {collection.description}
              </p>
            )}
          </div>
        </div>
      )}

      {!collection.image && (
        <header className="container-custom pt-12 lg:pt-20 flex flex-col gap-y-4">
          <h1 className="font-heading text-4xl lg:text-6xl font-bold text-ink italic leading-tight">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="max-w-3xl font-body text-sm lg:text-base text-ink/60 leading-relaxed uppercase tracking-wider">
              {collection.description}
            </p>
          )}
        </header>
      )}

      <div className="container-custom">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-y-6">
            <p className="font-body text-lg italic text-ink/40">
              No products found in this collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
