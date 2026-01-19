import { shopifyFetch } from "@/lib/shopify/client";
import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/lib/shopify/types";

export const getCollectionProductsQuery = `
  query getCollectionProducts($handle: String!) {
    collection(handle: $handle) {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default async function Home() {
  const res = await shopifyFetch<{ collection: { products: { edges: { node: Product }[] } } }>({
    query: getCollectionProductsQuery,
    variables: { handle: "frontpage" }, // or "featured"
    tags: ["products"]
  });

  const products = res.body.data.collection?.products.edges.map(edge => edge.node) || [];

  return (
    <div className="container-custom py-12">
      <div className="flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-4 max-w-2xl">
          <h1 className="font-heading text-5xl text-primary font-bold italic">Summer Essentials</h1>
          <p className="font-body text-ink/70 leading-relaxed">
            Discover our curated collection of luxury essentials, designed for comfort and elegance. 
            Crafted from the finest materials for those who appreciate the finer details.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-surface">
            <p className="font-body text-ink/40 italic">New collections arriving soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
