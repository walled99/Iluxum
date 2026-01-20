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

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {};
  }

  const { title, description, featuredImage } = product;

  return {
    title,
    description: description || `Shop ${title} at Iluxum.`,
    openGraph: {
      title,
      description: description || "",
      images: featuredImage ? [{ url: featuredImage.url, alt: featuredImage.altText || title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || "",
      images: featuredImage ? [featuredImage.url] : [],
    },
  };
}

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductRecommendations } from "@/components/products/ProductRecommendations";

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle, locale } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Products", href: `/${locale}/search` },
    { label: product.title }
  ];

  return (
    <div className="container-custom py-8 lg:py-12 space-y-20 lg:space-y-32">
      <div className="space-y-8 lg:space-y-12">
        <Breadcrumbs items={breadcrumbs} locale={locale} />
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

      <ProductRecommendations productId={product.id} locale={locale} />
    </div>
  );
}
