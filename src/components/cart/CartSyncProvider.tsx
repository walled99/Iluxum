"use client";

import { useEffect, useRef } from "react";
import { useCartStore } from "@/lib/store/useCartStore";
import { syncCartWithServer } from "@/lib/shopify/cart";

export function CartSyncProvider({ 
  customerAccessToken 
}: { 
  customerAccessToken?: string 
}) {
  const { lines, shopifyCartId, setShopifyCartId, clearCart } = useCartStore();
  const isSyncing = useRef(false);

  useEffect(() => {
    async function sync() {
      // If we have an access token and local items to merge
      if (customerAccessToken && lines.length > 0 && !isSyncing.current) {
        isSyncing.current = true;
        try {
          console.log("Syncing local cart with server...");
          const newCartId = await syncCartWithServer(lines, shopifyCartId);
          setShopifyCartId(newCartId);
          clearCart(); // Clear local lines after successful sync
          console.log("Cart sync successful. Server Cart ID:", newCartId);
        } catch (error) {
          console.error("Cart sync failed:", error);
        } finally {
          isSyncing.current = false;
        }
      }
    }

    sync();
  }, [customerAccessToken, lines, shopifyCartId, setShopifyCartId, clearCart]);

  return null;
}
