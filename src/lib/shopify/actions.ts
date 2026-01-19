"use server";

import { getCheckoutUrl as getShopifyCheckoutUrl } from "./cart";
import { getPredictiveSearch as getShopifyPredictiveSearch } from "./client";
import { LocalCartLine } from "../store/useCartStore";

export async function getCheckoutUrlAction(localLines: LocalCartLine[], serverCartId: string | null) {
  try {
    return await getShopifyCheckoutUrl(localLines, serverCartId);
  } catch (error) {
    console.error("Server Action: getCheckoutUrlAction failed:", error);
    throw new Error("Could not generate checkout URL");
  }
}

export async function getPredictiveSearchAction(query: string) {
  try {
    return await getShopifyPredictiveSearch(query);
  } catch (error) {
    console.error("Server Action: getPredictiveSearchAction failed:", error);
    return { products: [], collections: [] };
  }
}

import { syncCartWithServer } from "./cart";

export async function syncCartAction(localLines: LocalCartLine[], serverCartId: string | null) {
  try {
    return await syncCartWithServer(localLines, serverCartId);
  } catch (error) {
    console.error("Server Action: syncCartAction failed:", error);
    throw new Error("Cart synchronization failed");
  }
}
