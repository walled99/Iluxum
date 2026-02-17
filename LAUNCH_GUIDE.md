# Iluxum Store Management & Launch Guide

Welcome to your new luxury storefront. This guide explains how to manage your products, pages, and menus using **Supabase** and **Stripe**.

## 🚀 The Launch Checklist (Essential for Selling)

To start selling, you must complete these steps in your [Supabase Dashboard](https://supabase.com/dashboard):

1.  **Configure Auth**: `Authentication > Providers`. Ensure Email is enabled.
2.  **Stripe Integration**: Set up your Stripe Developer account and add your `STRIPE_SECRET_KEY` to `.env.local`.
3.  **Storage Buckets**: Create a public bucket named `product-images` for your high-res photography.
4.  **Database Tables**: Ensure your `products`, `product_variants`, and `collections` tables are populated.
5.  **Connect a Domain**: Deploy your app to Vercel and connect your custom `.com` or `.ae` domain.
6.  **Webhook Setup**: Create your Stripe Webhook in the Stripe Dashboard pointing to `https://yourdomain.com/api/webhooks/stripe`.

---

## 🛍️ How to Add Products

All product data is managed in **Supabase**. To add a product:

1.  **Database Entry**: Go to `Table Editor > products`. Add Title, Handle, and Description.
2.  **Add Variants**: In the `product_variants` table, link to the product ID and set Price and Selection Options (JSON).
3.  **Upload Media**: 
    - Go to **Storage > product-images**.
    - Upload high-quality lifestyle photography.
    - Copy the **Public URL** and paste it into the `product_images` table.
4.  **Organize**: Link products to collections using the `product_collections` table.

---

## 📄 How to Manage Website Pages

Your website uses a "Headless" approach, meaning content is split between Supabase and Code.

### 1. Navigation & Menus
The Header and Footer links are synced from the `menus` and `menu_items` tables in Supabase:
-   **Header**: Driven by the menu with handle `main-menu`.
-   **Footer**: Driven by the menu with handle `footer`.
-   **Home Page Categories**: The "Shop By Category" carousel uses a menu with handle `home-categories`.

### 2. Static Pages (Legal & Story)
-   **Story Page**: Managed in `src/app/[locale]/(shop)/story/page.tsx`.
-   **Privacy/Terms**: Managed in `src/app/[locale]/(shop)/privacy/page.tsx`.
-   *Note: If you want these to be editable in Shopify, we can update the code to pull from Shopify Pages.*

### 3. Home Page Content
-   The **Hero Image** and **Featured Text** are currently in the code (`src/app/[locale]/(shop)/page.tsx`).
-   To change them, you can request me to update the code, or we can connect them to Shopify Metaobjects in the future.

---

## 🛠️ Technical Support
If you need to change the design, add new sections, or fix any bugs, I am here to help. Just let me know what you'd like to adjust!
