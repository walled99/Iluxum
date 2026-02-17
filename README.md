# Iluxum Luxury Textiles

A premium e-commerce storefront built with Next.js 16 and **Supabase**.

> [!NOTE]
> For a detailed directory of all pages and features, see **[Sitemap & Pages Guide](file:///e:/Iluxum/PAGES.md)**.

## Phase 3 Roadmap: Stripe Integration
*Next steps to enable real payments:*

1. **API Endpoints**: Create `/api/checkout` to build Stripe sessions and `/api/webhooks/stripe` to handle paid order sync.
2. **Environment Variables**: Add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` to `.env.local`.
3. **Webhook Sync**: Automatically create records in the `orders` and `order_items` tables in Supabase when a payment succeeds.
4. **Order History**: Update the `/account` page to display real customer orders from Supabase.

## Features

### Dynamic Content Management
- **Supabase Backend**: All data (products, collections, menus) now lives in Supabase.
- **Header/Footer Navigation**: Synced with Supabase `menus` table (`main-menu`, `footer`).
- **Category Carousel**: Driven by `home-categories` menu with auto-fetch for collection images.
- **Product Recommendations**: Fetched from Supabase based on collection association.

### Product Experience
- **Click-to-Zoom Gallery**: Hover magnification with thumbnail navigation.
- **Variant Selection**: Dynamic pricing based on Supabase variants.
- **Breadcrumb Navigation**: Full product path for SEO.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Content Management (Supabase)

Manage your store directly from the **Supabase Dashboard**:
- **Products**: Edit titles, prices, and inventory in the `products` and `product_variants` tables.
- **Images**: Upload to the `product-images` bucket and link URLs in `product_images` table.
- **Navigation**: Manage links in the `menus` and `menu_items` tables.

## Deploy on Vercel

The easiest way to deploy is via the [Vercel Platform](https://vercel.com).

