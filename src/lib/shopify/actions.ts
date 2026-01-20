"use server";

import { 
  getCheckoutUrl as getShopifyCheckoutUrl, 
  syncCartWithServer,
  getCart as getShopifyCart
} from "./cart";
import { 
  getPredictiveSearch as getShopifyPredictiveSearch,
  shopifyFetch, 
  customerAccessTokenCreateMutation, 
  customerCreateMutation, 
  getCustomerQuery 
} from "./client";
import { LocalCartLine } from "../store/useCartStore";
import { cookies } from "next/headers";

const CUSTOMER_TOKEN_COOKIE = "iluxum_customer_token";

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

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await shopifyFetch<any>({
      query: customerAccessTokenCreateMutation,
      variables: { input: { email, password } },
      cache: 'no-store'
    });

    const { customerAccessToken, customerUserErrors } = res.body.data.customerAccessTokenCreate;

    if (customerUserErrors.length > 0) {
      return { error: customerUserErrors[0].message };
    }

    const cookieStore = await cookies();
    cookieStore.set(CUSTOMER_TOKEN_COOKIE, customerAccessToken.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(customerAccessToken.expiresAt),
      path: "/",
    });

    return { success: true };
  } catch (error: any) {
    console.error("Login Error:", error.message || error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function registerAction(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await shopifyFetch<any>({
      query: customerCreateMutation,
      variables: { input: { firstName, lastName, email, password } },
      cache: 'no-store'
    });

    const { customerUserErrors } = res.body.data.customerCreate;

    if (customerUserErrors.length > 0) {
      return { error: customerUserErrors[0].message };
    }

    // After registration, log them in automatically
    return await loginAction(null, formData);
  } catch (error: any) {
    console.error("Registration Error:", error.message || error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(CUSTOMER_TOKEN_COOKIE);
}

export async function getCustomerAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_TOKEN_COOKIE)?.value;

  if (!token) return null;

  try {
    const res = await shopifyFetch<any>({
      query: getCustomerQuery,
      variables: { customerAccessToken: token },
      cache: 'no-store'
    });

    return res.body.data.customer;
  } catch (error: any) {
    console.error("Fetch Customer Error:", error.message || error);
    return null;
  }
}

export async function syncCartAction(localLines: LocalCartLine[], serverCartId: string | null) {
  try {
    return await syncCartWithServer(localLines, serverCartId);
  } catch (error) {
    console.error("Server Action: syncCartAction failed:", error);
    throw new Error("Cart synchronization failed");
  }
}

export async function getCartAction(cartId: string) {
  try {
    const cart = await getShopifyCart(cartId);
    if (!cart) return null;

    // Transform Shopify cart lines to LocalCartLine format
    const lines: LocalCartLine[] = cart.lines.edges.map((edge: any) => ({
      id: edge.node.merchandise.id,
      quantity: edge.node.quantity,
      merchandise: edge.node.merchandise,
    }));

    return lines;
  } catch (error) {
    console.error("Server Action: getCartAction failed:", error);
    return null;
  }
}
