"use client";

/**
 * CartSyncProvider: With Supabase, the cart is managed entirely
 * client-side via Zustand (localStorage). No server sync is needed
 * until the user reaches checkout (Phase 3 — Stripe).
 *
 * This component is kept as a no-op placeholder so that existing
 * layout code that renders <CartSyncProvider> doesn't break.
 */
export function CartSyncProvider({
  customerAccessToken,
}: {
  customerAccessToken?: string;
}) {
  // No-op until Stripe checkout is implemented
  return null;
}
