# Iluxum Luxury Textiles

A premium e-commerce storefront built with Next.js 16 and Shopify Headless.

> [!NOTE]
> For a detailed directory of all pages and features, see **[Sitemap & Pages Guide](file:///e:/Iluxum/PAGES.md)**.

## Features

### Dynamic Content Management
- **Header/Footer Navigation**: Synced with Shopify Menus (`main-menu`, `footer`)
- **Category Carousel**: Driven by `home-categories` Shopify Menu with auto-play
- **Product Recommendations**: AI-powered "You May Also Like" section

### Product Experience
- **Click-to-Zoom Gallery**: Hover magnification with thumbnail navigation
- **Variant Selection**: Dynamic pricing based on selected options
- **Breadcrumb Navigation**: Full product path for SEO

### SEO & Performance
- **Dynamic Metadata**: Per-page titles, descriptions, and Open Graph tags
- **Hreflang Support**: Multi-locale canonical URLs and alternates
- **Image Optimization**: Next.js Image with lazy loading

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Content Management

Manage navigation from Shopify Admin:
- **Header Links**: Edit `main-menu` in Navigation
- **Footer Links**: Edit `footer` in Navigation
- **Home Categories**: Edit `home-categories` in Navigation

## Deploy on Vercel

The easiest way to deploy is via the [Vercel Platform](https://vercel.com).

