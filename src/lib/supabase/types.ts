// ============================================================
// Supabase Database Types for Iluxum
// These mirror the SQL schema and are drop-in replacements for the legacy types.
// ============================================================

// ---------- Core Value Objects ----------

export type Maybe<T> = T | null;

export interface Image {
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

// ---------- Connection wrappers (kept for backward compatibility) ----------

export interface Connection<T> {
  edges: Array<Edge<T>>;
}

export interface Edge<T> {
  node: T;
}

// ---------- Products ----------

export interface Product {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
    hasComparisonPrice: boolean;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
  compareAtPrice: Money | null;
}

export interface SEO {
  title: string;
  description: string;
}

// ---------- Cart ----------

export interface Cart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartLine>;
  totalQuantity: number;
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    product: Product;
  };
}

// ---------- Menus ----------

export interface Menu {
  items: MenuItem[];
}

export interface MenuItem {
  title: string;
  url: string;
  resource?: {
    __typename: string;
    id: string;
    title: string;
    handle: string;
    image?: Image;
  };
}

// ---------- Database Row Types (raw Supabase rows) ----------

export interface DbProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  description_html: string;
  available_for_sale: boolean;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string;
  sort_order: number;
  is_featured: boolean;
}

export interface DbProductOption {
  id: string;
  product_id: string;
  name: string;
  values: string[];
}

export interface DbProductVariant {
  id: string;
  product_id: string;
  title: string;
  sku: string | null;
  price: number;
  compare_at_price: number | null;
  currency_code: string;
  available_for_sale: boolean;
  selected_options: { name: string; value: string }[];
  inventory_quantity: number;
  created_at: string;
}

export interface DbCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image_url: string | null;
  image_alt: string;
  sort_order: number;
}

export interface DbMenuItem {
  id: string;
  menu_id: string;
  title: string;
  url: string;
  resource_type: string | null;
  resource_id: string | null;
  image_url: string | null;
  image_alt: string;
  sort_order: number;
}
