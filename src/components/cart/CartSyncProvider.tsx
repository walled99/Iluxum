"use client";

import { useEffect, useRef } from "react";
import { useCartStore, LocalCartLine } from "@/lib/store/useCartStore";
import { syncCartAction, getCartAction } from "@/lib/shopify/actions";

export function CartSyncProvider({ 
  customerAccessToken 
}: { 
  customerAccessToken?: string 
}) {
  const { lines, shopifyCartId, setShopifyCartId, setLines } = useCartStore();
  const isSyncing = useRef(false);

  useEffect(() => {
    async function sync() {
      if (!customerAccessToken) return;
      if (isSyncing.current) return;

      isSyncing.current = true;
      try {
        console.group("Cart Sync Orchestration");
        console.log("Local State:", lines);
        
        const newCartId = await syncCartAction(lines, shopifyCartId);
        
        if (newCartId !== shopifyCartId) {
          console.log("Persisting new Cart ID:", newCartId);
          setShopifyCartId(newCartId);
        }

        const serverLines = await getCartAction(newCartId);
        if (serverLines) {
          // Deep compare local vs server state
          const localState = JSON.stringify(lines.map(l => ({ id: l.id, q: l.quantity })).sort((a,b) => a.id.localeCompare(b.id)));
          const serverState = JSON.stringify(serverLines.map(l => ({ id: l.id, q: l.quantity })).sort((a,b) => a.id.localeCompare(b.id)));
          
          if (localState !== serverState) {
            console.log("Server state differs. Updating local store...");
            setLines(serverLines);
          } else {
            console.log("Cart is in sync.");
          }
        }
        console.groupEnd();
      } catch (error) {
        console.error("Cart sync failed:", error);
        console.groupEnd();
      } finally {
        isSyncing.current = false;
      }
    }

    sync();
  }, [customerAccessToken, lines, shopifyCartId, setShopifyCartId, setLines]);

  return null;
}
