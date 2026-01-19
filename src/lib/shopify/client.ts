import { Product } from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ShopifyFetchArgs = {
  query: string;
  variables?: any;
  tags?: string[];
  cache?: RequestCache;
};

export async function shopifyFetch<T>({
  query,
  variables,
  tags,
  cache = 'force-cache'
}: ShopifyFetchArgs): Promise<{ status: number; body: { data: T; errors?: any[] } } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key as string
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    console.error('Shopify Fetch Error:', e);
    throw {
      error: e,
      query
    };
  }
}

export const getProductByHandleQuery = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      availableForSale
      options {
        id
        name
        values
      }
      variants(first: 250) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
          }
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      featuredImage {
        url
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<{ product: Product }>({
    query: getProductByHandleQuery,
    variables: { handle },
    tags: ['products']
  });

  return res.body.data.product;
}

export const getShopQuery = `
  query getShop {
    shop {
      name
      description
    }
  }
`;

export async function getShop(): Promise<{ name: string; description: string }> {
  const res = await shopifyFetch<{ shop: { name: string; description: string } }>({
    query: getShopQuery,
    cache: 'no-store'
  });

  return res.body.data.shop;
}

export const getCartQuery = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      cost {
        subtotalAmount { amount currencyCode }
        totalAmount { amount currencyCode }
        totalTaxAmount { amount currencyCode }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  id
                  title
                  handle
                }
              }
            }
          }
        }
      }
      totalQuantity
    }
  }
`;

export const createCartMutation = `
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const cartLinesAddMutation = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const getCustomerCartQuery = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      lastIncompleteCheckout {
        id
        webUrl
      }
    }
  }
`;

export const predictiveSearchQuery = `
  query predictiveSearch($query: String!) {
    predictiveSearch(query: $query, types: [PRODUCT, COLLECTION]) {
      products {
        id
        title
        handle
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
      collections {
        id
        title
        handle
      }
    }
  }
`;

export async function getPredictiveSearch(query: string): Promise<any> {
  const res = await shopifyFetch<any>({
    query: predictiveSearchQuery,
    variables: { query },
    cache: 'no-store'
  });

  return res.body.data.predictiveSearch;
}
