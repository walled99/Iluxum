export type Maybe<T> = T | null;

export interface Connection<T> {
  edges: Array<Edge<T>>;
}

export interface Edge<T> {
  node: T;
}

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
}

export interface SEO {
  title: string;
  description: string;
}

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
