import { shopifyFetch, createCartMutation, cartLinesAddMutation, getCartQuery } from './client';
import { Cart } from './types';
import { LocalCartLine } from '../store/useCartStore';

export async function createCart() {
  const res = await shopifyFetch<{ cartCreate: { cart: { id: string; checkoutUrl: string } } }>({
    query: createCartMutation,
    cache: 'no-store'
  });

  return res.body.data.cartCreate.cart;
}

export async function getCart(cartId: string) {
  const res = await shopifyFetch<{ cart: Cart }>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store'
  });

  return res.body.data.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const res = await shopifyFetch<{ cartLinesAdd: { cart: { id: string } } }>({
    query: cartLinesAddMutation,
    variables: { cartId, lines },
    cache: 'no-store'
  });

  return res.body.data.cartLinesAdd.cart;
}

export async function syncCartWithServer(localLines: LocalCartLine[], serverCartId: string | null) {
  let cartId = serverCartId;

  // 1. Ensure we have a server cart
  if (!cartId) {
    const newCart = await createCart();
    cartId = newCart.id;
  }

  // 2. Fetch current server cart lines to avoid duplicates
  const serverCart = await getCart(cartId);
  const serverVariantIds = new Set(
    serverCart.lines.edges.map((edge) => edge.node.merchandise.id)
  );

  // 3. Filter items that are NOT in the server cart
  const linesToAdd = localLines
    .filter((line) => !serverVariantIds.has(line.id))
    .map((line) => ({
      merchandiseId: line.id,
      quantity: line.quantity
    }));

  // 4. Add missing items to the server cart
  if (linesToAdd.length > 0) {
    await addToCart(cartId, linesToAdd);
  }

  return cartId;
}

export async function getCheckoutUrl(localLines: LocalCartLine[], serverCartId: string | null) {
  const cartId = await syncCartWithServer(localLines, serverCartId);
  const cart = await getCart(cartId);
  return cart.checkoutUrl;
}
