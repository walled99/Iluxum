import { supabase } from './client';
import {
  Product,
  ProductOption,
  ProductVariant,
  Image,
  Connection,
  DbProduct,
  DbProductImage,
  DbProductOption,
  DbProductVariant,
  DbCollection,
  DbMenuItem,
  MenuItem,
} from './types';

// ============================================================
// TRANSFORM HELPERS
// Converts raw Supabase rows into the same shape the UI expects
// (backward-compatible with legacy UI types).
// ============================================================

function toMoney(amount: number, currencyCode: string) {
  return { amount: String(amount), currencyCode };
}

function toImage(url: string | null, alt: string): Image {
  return { url: url || '', altText: alt || '' };
}

function toConnection<T>(items: T[]): Connection<T> {
  return { edges: items.map((node) => ({ node })) };
}

function transformProduct(
  row: DbProduct,
  images: DbProductImage[],
  options: DbProductOption[],
  variants: DbProductVariant[]
): Product {
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order);
  const featured = sortedImages.find((img) => img.is_featured) || sortedImages[0];

  const mappedVariants: ProductVariant[] = variants.map((v) => ({
    id: v.id,
    title: v.title,
    availableForSale: v.available_for_sale,
    selectedOptions: v.selected_options || [],
    price: toMoney(v.price, v.currency_code),
    compareAtPrice: v.compare_at_price ? toMoney(v.compare_at_price, v.currency_code) : null,
  }));

  const prices = variants.map((v) => v.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const currencyCode = variants[0]?.currency_code || 'EGP';
  const hasComparisonPrice = variants.some(v => v.compare_at_price && v.compare_at_price > v.price);

  return {
    id: row.id,
    handle: row.handle,
    availableForSale: row.available_for_sale,
    title: row.title,
    description: row.description,
    descriptionHtml: row.description_html,
    options: options.map((o) => ({
      id: o.id,
      name: o.name,
      values: o.values,
    })),
    priceRange: {
      minVariantPrice: toMoney(minPrice, currencyCode),
      maxVariantPrice: toMoney(maxPrice, currencyCode),
      hasComparisonPrice,
    },
    variants: toConnection(mappedVariants),
    featuredImage: featured ? toImage(featured.url, featured.alt_text) : toImage(null, ''),
    images: toConnection(
      sortedImages.map((img) => toImage(img.url, img.alt_text))
    ),
    seo: {
      title: row.seo_title || row.title,
      description: row.seo_description || row.description,
    },
    tags: row.tags || [],
    updatedAt: row.updated_at,
  };
}

// ============================================================
// PUBLIC API — Drop-in replacements for the legacy functions
// ============================================================

/**
 * Get a single product by its URL handle.
 * Replaces: getProduct(handle)
 */
export async function getProduct(handle: string): Promise<Product | undefined> {
  // 1. Fetch the product row
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('handle', handle)
    .single();

  if (error || !product) return undefined;

  // 2. Fetch related data in parallel
  const [imagesRes, optionsRes, variantsRes] = await Promise.all([
    supabase.from('product_images').select('*').eq('product_id', product.id).order('sort_order'),
    supabase.from('product_options').select('*').eq('product_id', product.id),
    supabase.from('product_variants').select('*').eq('product_id', product.id),
  ]);

  return transformProduct(
    product as DbProduct,
    (imagesRes.data || []) as DbProductImage[],
    (optionsRes.data || []) as DbProductOption[],
    (variantsRes.data || []) as DbProductVariant[]
  );
}

/**
 * Get the shop name and description.
 * Replaces: getShop()
 */
export async function getShop(): Promise<{ name: string; description: string }> {
  // This is static info — no longer from an API. Return from env or hardcode.
  return {
    name: process.env.NEXT_PUBLIC_SHOP_NAME || 'Iluxum',
    description: process.env.NEXT_PUBLIC_SHOP_DESCRIPTION || 'Luxury Home Essentials',
  };
}

/**
 * Get a single collection by handle, including its products.
 * Replaces: getCollection(handle)
 */
export async function getCollection(handle: string) {
  const { data: collection, error } = await supabase
    .from('collections')
    .select('*')
    .eq('handle', handle)
    .single();

  if (error || !collection) return null;

  // Get product IDs in this collection
  const { data: junctionRows } = await supabase
    .from('product_collections')
    .select('product_id')
    .eq('collection_id', collection.id)
    .order('sort_order');

  const productIds = (junctionRows || []).map((r: any) => r.product_id);

  // Fetch products with their images
  let products: Product[] = [];
  if (productIds.length > 0) {
    const { data: productRows } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds);

    const { data: allImages } = await supabase
      .from('product_images')
      .select('*')
      .in('product_id', productIds)
      .order('sort_order');

    const { data: allVariants } = await supabase
      .from('product_variants')
      .select('*')
      .in('product_id', productIds);

    products = (productRows || []).map((p: any) => {
      const pImages = (allImages || []).filter((i: any) => i.product_id === p.id);
      const pVariants = (allVariants || []).filter((v: any) => v.product_id === p.id);
      return transformProduct(p, pImages, [], pVariants);
    });
  }

  const col = collection as DbCollection;
  return {
    id: col.id,
    title: col.title,
    handle: col.handle,
    description: col.description,
    image: toImage(col.image_url, col.image_alt),
    products: toConnection(products),
  };
}

/**
 * Get all collections.
 * Replaces: getCollections()
 */
export async function getCollections() {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('sort_order');

  if (error || !data) return [];

  return data.map((col: any) => ({
    id: col.id,
    title: col.title,
    handle: col.handle,
    description: col.description,
    image: toImage(col.image_url, col.image_alt),
  }));
}

/**
 * Search products by title (full-text).
 * Replaces: getPredictiveSearch(query) and getSearchResults(query)
 */
export async function searchProducts(query: string) {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .ilike('title', `%${query}%`)
    .limit(20);

  if (error || !products) return { products: [], collections: [] };

  const productIds = products.map((p: any) => p.id);

  const [imagesRes, variantsRes] = await Promise.all([
    supabase
      .from('product_images')
      .select('*')
      .in('product_id', productIds)
      .order('sort_order'),
    supabase
      .from('product_variants')
      .select('*')
      .in('product_id', productIds),
  ]);

  const transformed = products.map((p: any) => {
    const pImages = (imagesRes.data || []).filter((i: any) => i.product_id === p.id);
    const pVariants = (variantsRes.data || []).filter((v: any) => v.product_id === p.id);
    return transformProduct(p, pImages, [], pVariants);
  });

  // Also search collections
  const { data: collections } = await supabase
    .from('collections')
    .select('*')
    .ilike('title', `%${query}%`)
    .limit(5);

  return {
    products: transformed,
    collections: (collections || []).map((c: any) => ({
      id: c.id,
      title: c.title,
      handle: c.handle,
    })),
  };
}

/**
 * Get product recommendations (products in the same collection).
 * Replaces: getProductRecommendations(productId)
 */
export async function getProductRecommendations(productId: string): Promise<Product[]> {
  // Find collections that contain this product
  const { data: junctions } = await supabase
    .from('product_collections')
    .select('collection_id')
    .eq('product_id', productId);

  const collectionIds = (junctions || []).map((j: any) => j.collection_id);
  if (collectionIds.length === 0) return [];

  // Find other products in those collections
  const { data: relatedJunctions } = await supabase
    .from('product_collections')
    .select('product_id')
    .in('collection_id', collectionIds)
    .neq('product_id', productId)
    .limit(8);

  const relatedIds = [...new Set((relatedJunctions || []).map((r: any) => r.product_id))];
  if (relatedIds.length === 0) return [];

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .in('id', relatedIds);

  const [imagesRes, variantsRes] = await Promise.all([
    supabase.from('product_images').select('*').in('product_id', relatedIds).order('sort_order'),
    supabase.from('product_variants').select('*').in('product_id', relatedIds),
  ]);

  return (products || []).map((p: any) => {
    const pImages = (imagesRes.data || []).filter((i: any) => i.product_id === p.id);
    const pVariants = (variantsRes.data || []).filter((v: any) => v.product_id === p.id);
    return transformProduct(p, pImages, [], pVariants);
  });
}

/**
 * Get a navigation menu by handle (e.g., 'main-menu', 'footer').
 * Replaces: getMenu(handle)
 */
export async function getMenu(handle: string): Promise<MenuItem[]> {
  const { data: menu } = await supabase
    .from('menus')
    .select('id')
    .eq('handle', handle)
    .single();

  if (!menu) return [];

  const { data: items } = await supabase
    .from('menu_items')
    .select('*')
    .eq('menu_id', menu.id)
    .order('sort_order');

  if (!items) return [];

  // Fetch all collections in one go to populate images if they are missing in menu_items
  const collectionIds = items
    .filter(item => item.resource_type === 'Collection')
    .map(item => item.resource_id);
  
  const { data: collections } = collectionIds.length > 0
    ? await supabase.from('collections').select('id, image_url, image_alt').in('id', collectionIds)
    : { data: [] };

  return items.map((item: any) => {
    const menuItem: MenuItem = {
      title: item.title,
      url: item.url || '',
    };

    if (item.resource_type && item.resource_id) {
      // Extract handle from the URL (e.g., '/collection/bedding' → 'bedding')
      const urlParts = (item.url || '').split('/').filter(Boolean);
      const extractedHandle = urlParts[urlParts.length - 1] || '';

      // Find the collection image if the menu item doesn't have one
      const collection = (collections || []).find(c => c.id === item.resource_id);
      const imageUrl = item.image_url || collection?.image_url;
      const imageAlt = item.image_alt || collection?.image_alt || item.title;

      menuItem.resource = {
        __typename: item.resource_type,
        id: item.resource_id,
        title: item.title,
        handle: extractedHandle,
        image: imageUrl ? toImage(imageUrl, imageAlt) : undefined,
      };
    }

    return menuItem;
  });
}
