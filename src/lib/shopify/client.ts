import { Connection, Product } from './types';

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
      console.error('GraphQL Errors:', JSON.stringify(body.errors, null, 2));
      throw new Error(body.errors[0].message || 'GraphQL Error');
    }

    return {
      status: result.status,
      body
    };
  } catch (e: any) {
    console.error('Shopify Fetch Error:', e.message || e);
    throw e;
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
                price { amount currencyCode }
                product {
                  id
                  title
                  handle
                  featuredImage {
                    url
                    altText
                  }
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

export const cartLinesUpdateMutation = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
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

export const cartLinesRemoveMutation = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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

export const getSearchResultsQuery = `
  query getSearchResults($query: String!) {
    search(query: $query, first: 20, types: PRODUCT) {
      edges {
        node {
          ... on Product {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

export async function getSearchResults(query: string): Promise<Product[]> {
  const res = await shopifyFetch<{ search: Connection<Product> }>({
    query: getSearchResultsQuery,
    variables: { query },
    cache: 'no-store'
  });

  return res.body.data.search.edges.map((edge: { node: Product }) => edge.node);
}

export const getCollectionQuery = `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(first: 20) {
        edges {
          node {
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
        }
      }
    }
  }
`;

export async function getCollection(handle: string): Promise<any> {
  const res = await shopifyFetch<any>({
    query: getCollectionQuery,
    variables: { handle },
    tags: ['products']
  });

  return res.body.data.collection;
}

export const getCollectionsQuery = `
  query getCollections {
    collections(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export async function getCollections(): Promise<any[]> {
  const res = await shopifyFetch<{ collections: Connection<any> }>({
    query: getCollectionsQuery,
    tags: ['collections']
  });

  return res.body.data.collections.edges.map((edge) => edge.node);
}

export const customerAccessTokenCreateMutation = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const customerCreateMutation = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const getCustomerQuery = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      defaultAddress {
        id
        address1
        address2
        city
        province
        country
        zip
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            province
            country
            zip
          }
        }
      }
      orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            totalPrice {
              amount
              currencyCode
            }
            financialStatus
            fulfillmentStatus
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    image {
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
    }
  }
`;

export const getProductRecommendationsQuery = `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
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
  }
`;

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const res = await shopifyFetch<{ productRecommendations: Product[] }>({
    query: getProductRecommendationsQuery,
    variables: { productId },
    tags: ['products']
  });

  return res.body.data.productRecommendations;
}
