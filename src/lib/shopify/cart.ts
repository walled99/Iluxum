import { 
  shopifyFetch, 
  createCartMutation, 
  cartLinesAddMutation, 
  cartLinesUpdateMutation,
  cartLinesRemoveMutation,
  getCartQuery 
} from './client';
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

export async function updateCartLines(cartId: string, lines: { id: string; quantity: number }[]) {
  const res = await shopifyFetch<{ cartLinesUpdate: { cart: { id: string } } }>({
    query: cartLinesUpdateMutation,
    variables: { cartId, lines },
    cache: 'no-store'
  });

  return res.body.data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const res = await shopifyFetch<{ cartLinesRemove: { cart: { id: string } } }>({
    query: cartLinesRemoveMutation,
    variables: { cartId, lineIds },
    cache: 'no-store'
  });

  return res.body.data.cartLinesRemove.cart;
}

export async function syncCartWithServer(localLines: LocalCartLine[], serverCartId: string | null) {
  let cartId = serverCartId;

  // 1. Ensure we have a server cart
  if (!cartId) {
    const newCart = await createCart();
    cartId = newCart.id;
  }

  // 2. Fetch current server cart lines
  const serverCart = await getCart(cartId);
  const serverLines = serverCart.lines.edges.map(edge => edge.node);

  // Map to store server variant ID -> server line ID
  const variantToLineId = new Map(
    serverLines.map((line) => [line.merchandise.id, line.id])
  );
  
  // Map to store server variant ID -> quantity
  const variantToQuantity = new Map(
    serverLines.map((line) => [line.merchandise.id, line.quantity])
  );

  // 3. Reconcile Addition/Update
  const linesToAdd: { merchandiseId: string; quantity: number }[] = [];
  const linesToUpdate: { id: string; quantity: number }[] = [];

  for (const localLine of localLines) {
    const serverLineId = variantToLineId.get(localLine.id);
    const serverQuantity = variantToQuantity.get(localLine.id);

    if (!serverLineId) {
      // New item
      linesToAdd.push({
        merchandiseId: localLine.id,
        quantity: localLine.quantity
      });
    } else if (serverQuantity !== localLine.quantity) {
      // Quantity mismatch: Local is always source of truth during sync trigger
      linesToUpdate.push({
        id: serverLineId,
        quantity: localLine.quantity
      });
    }
  }

  // 4. Reconcile Removal (Server items NOT in local lines)
  const localVariantIds = new Set(localLines.map(l => l.id));
  const lineIdsToRemove = serverLines
    .filter(sl => !localVariantIds.has(sl.merchandise.id))
    .map(sl => sl.id);

  // 5. Execute Updates
  if (linesToAdd.length > 0) {
    await addToCart(cartId, linesToAdd);
  }
  if (linesToUpdate.length > 0) {
    await updateCartLines(cartId, linesToUpdate);
  }
  if (lineIdsToRemove.length > 0) {
    await removeFromCart(cartId, lineIdsToRemove);
  }

  return cartId;
}

export async function getCheckoutUrl(localLines: LocalCartLine[], serverCartId: string | null) {
  const cartId = await syncCartWithServer(localLines, serverCartId);
  const cart = await getCart(cartId);
  return cart.checkoutUrl;
}
