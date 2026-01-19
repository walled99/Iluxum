import { notFound } from "next/navigation";
import { getProduct } from "@/lib/shopify/client";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";

interface ProductPageProps {
  params: Promise<{
    locale: string;
    handle: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
        {/* Start Side: Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images.edges} />
        </div>

        {/* End Side: Info */}
        <div className="lg:col-span-5 ps-0 lg:ps-4">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
