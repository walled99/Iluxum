# AI Context: Iluxum

## Project Overview
Iluxum is a luxury e-commerce storefront built with Next.js 16 (App Router), Tailwind CSS v4, and Shopify Headless (Storefront API).

## Tech Stack
- **Framework**: Next.js 16.1.3 (App Router)
- **Styling**: Tailwind CSS v4 (configured via `@import "tailwindcss";` and `@theme`)
- **Language**: TypeScript
- **State Management**: Zustand v5 (Persisted Cart)
- **Backend**: Shopify Headless (Storefront API)

## Architecture
- **Internationalization**: `src/app/[locale]/` strategy with middleware-based redirection and locale detection.
- **Directionality**: `DirProvider` and `[locale]/layout.tsx` injection of `dir="rtl"` or `dir="ltr"`.
- **Folder Structure**:
    - `src/app/[locale]/(shop)`: Main storefront.
    - `src/app/[locale]/(auth)`: Authentication pages.
    - `src/lib/shopify`: Shopify client and operations.
    - `src/lib/store`: Global state (Cart).

## Design System
- **Colors**:
    - Primary: `#121442` (Deep Navy)
    - Accent: `#C2AC82` (Champagne Gold)
    - Background: `#FDFBF7`
    - Surface: `#F4F1EA`
    - Ink: `#1A1A1A`
- **Typography**:
    - Heading: `Playfair Display` (next/font variable: `--font-heading`)
    - Body: `Inter` (next/font variable: `--font-body`)
- **Animations**: `fade-gold`
- **Layout**: Strict use of **Logical Properties** (`inline`, `block`, `start`, `end`) for RTL/LTR compatibility.

## Key Files
- `src/app/globals.css`: Design system tokens.
- `src/middleware.ts`: Locale detection and redirection.
- `src/components/i18n/DirProvider.tsx`: RTL/LTR directionality provider.
- `src/app/layout.tsx`: Simplified pass-through root layout.
- `src/app/[locale]/layout.tsx`: Consolidated localized layout with `DirProvider`, `Header`, and `Footer`.
- `src/components/layout`: Layout components (`Header.tsx`, `Footer.tsx`, `PredictiveSearch.tsx`).
- `src/components/cart`: Cart components (`CartDrawer.tsx`, `CartSyncProvider.tsx`).
- `src/app/api/revalidate/route.ts`: Secure global webhook handler with HMAC validation.
- `src/app/[locale]/(shop)/page.tsx`: Home Page RSC fetching collections.
- `src/app/[locale]/(shop)/loading.tsx`: Global loading state with Shadcn skeletons.
- `src/app/[locale]/(shop)/search/page.tsx`: Full search results destination page.
- `src/app/[locale]/(shop)/collection/[handle]/page.tsx`: Dynamic collection discovery pages.
- `src/app/[locale]/(shop)/product/[handle]/page.tsx`: PDP with split-screen layout and interactive variant selectors.
- `src/components/products`: Product components (`ProductCard`, `ProductGallery`, `ProductInfo`).
- `src/next.config.ts`: Configuration including Shopify CDN image optimization.
- `src/lib/shopify/client.ts`: GraphQL client with standard fetcher and product queries.
- `src/lib/shopify/actions.ts`: **Server Actions** bridge for client-side components (Checkout, Search, Sync).
- `src/lib/store/useCartStore.ts`: Persistent store with Auth-phase sync logic and drawer state.

## Current Status
Project core and interactive architecture complete: i18n/RTL, type-safe Shopify client with predictive search, full discovery pages (Search/Collections), persistent cart with server-sync logic, interactive PDP with variant support, and luxury checkout handover.
