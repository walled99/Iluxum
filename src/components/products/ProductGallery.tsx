import Image from "next/image";
import { Image as ShopifyImage } from "@/lib/shopify/types";

interface ProductGalleryProps {
  images: Array<{ node: ShopifyImage }>;
}

export function ProductGallery({ images }: ProductGalleryProps) {
  return (
    <div className="flex flex-col gap-y-4">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-[4/5] overflow-hidden bg-surface">
          <Image
            src={image.node.url}
            alt={image.node.altText || "Product Image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
