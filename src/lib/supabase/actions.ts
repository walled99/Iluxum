"use server";

import { supabase } from "./client";
import { searchProducts } from "./queries";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

// ============================================================
// Auth Actions (replaces legacy Auth API)
// ============================================================

/**
 * Create a Supabase client that uses the user's session cookie.
 * This is needed for RLS-protected operations like reading orders.
 */
async function createServerClient() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sb-access-token")?.value;
  const refreshToken = cookieStore.get("sb-refresh-token")?.value;

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  if (accessToken && refreshToken) {
    await client.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  return client;
}

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    // Set session tokens in HttpOnly cookies
    const cookieStore = await cookies();
    const session = data.session;

    cookieStore.set("sb-access-token", session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: session.expires_in,
      path: "/",
    });

    cookieStore.set("sb-refresh-token", session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    // Auto-login after registration
    return await loginAction(null, formData);
  } catch (error: any) {
    console.error("Registration Error:", error.message || error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("sb-access-token");
  cookieStore.delete("sb-refresh-token");
}

export async function getCustomerAction() {
  try {
    const client = await createServerClient();
    const {
      data: { user },
      error,
    } = await client.auth.getUser();

    if (error || !user) return null;

    // Fetch orders for this customer
    const { data: orders } = await client
      .from("orders")
      .select(
        `
        id,
        order_number,
        created_at,
        total_amount,
        currency_code,
        financial_status,
        fulfillment_status,
        order_items (
          title,
          quantity,
          image_url
        )
      `
      )
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    return {
      id: user.id,
      firstName: user.user_metadata?.first_name || "",
      lastName: user.user_metadata?.last_name || "",
      email: user.email,
      phone: user.phone || null,
      defaultAddress: null, // Can be extended later
      addresses: { edges: [] },
      orders: {
        edges: (orders || []).map((order: any) => ({
          node: {
            id: order.id,
            orderNumber: order.order_number,
            processedAt: order.created_at,
            totalPrice: {
              amount: String(order.total_amount),
              currencyCode: order.currency_code,
            },
            financialStatus: order.financial_status?.toUpperCase(),
            fulfillmentStatus: order.fulfillment_status?.toUpperCase(),
            lineItems: {
              edges: (order.order_items || []).map((item: any) => ({
                node: {
                  title: item.title,
                  quantity: item.quantity,
                  variant: {
                    image: {
                      url: item.image_url || "",
                      altText: item.title,
                    },
                  },
                },
              })),
            },
          },
        })),
      },
    };
  } catch (error: any) {
    console.error("Fetch Customer Error:", error.message || error);
    return null;
  }
}

// ============================================================
// Search Actions
// ============================================================

export async function getPredictiveSearchAction(query: string) {
  try {
    return await searchProducts(query);
  } catch (error) {
    console.error("Server Action: getPredictiveSearchAction failed:", error);
    return { products: [], collections: [] };
  }
}

// ============================================================
// Checkout Actions (Stripe integration placeholder)
// ============================================================

export async function getCheckoutUrlAction(
  localLines: any[],
  _serverCartId: string | null
) {
  // TODO: In Phase 3, this will create a Stripe Checkout Session.
  // For now, return a placeholder.
  console.warn(
    "getCheckoutUrlAction: Stripe Checkout not yet implemented. Lines:",
    localLines.length
  );
  return "/checkout";
}

// ============================================================
// Cart Actions (local-first, no server sync needed until checkout)
// ============================================================

export async function syncCartAction(
  _localLines: any[],
  _serverCartId: string | null
) {
  // With Supabase, the cart is local-only until checkout.
  // No server-side cart sync is needed.
  return null;
}

export async function getCartAction(_cartId: string) {
  // Cart is managed entirely client-side via Zustand.
  return null;
}
