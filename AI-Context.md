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

- **Internationalization (i18n)**: Fully localized route strategy (`eg-en`, `eg-ar`, `ch-fr`) with RTL support, dynamic `hreflang` generation, and locale-aware navigation.
- **Shopify Authentication**: Secure customer identity management using Shopify Customer Access Tokens, HttpOnly cookies, and localized account dashboards.
- **Robust Cart Orchestration**: Bidirectional CRUD synchronization (Add, Update, Remove) between the local Zustand store and Shopify's server-side cart. Includes a deep-comparison state engine to prevent flickering and infinite loops.
- **Luxury Content**: Narrative-driven Story page with Framer Motion animations and high-end typography.
- **Product Discovery**: Breadcrumbs navigation and AI-driven "You May Also Like" recommendations.
- **Technical Excellence**: Next.js 15+ compliance (Promise-based params), robust GraphQL error handling, and secure HMAC webhook validation.

## Key Files
- `src/lib/shopify/cart.ts`: Encapsulates complex cart reconciliation and CRUD operations.
- `src/components/cart/CartSyncProvider.tsx`: State-guarded bidirectional sync orchestrator.
- `src/lib/shopify/client.ts`: Type-safe GraphQL fetcher with advanced error logging.
- `src/app/[locale]/layout.tsx`: Root localized layout with SEO and `hreflang` logic.
- `src/lib/store/useCartStore.ts`: Persistent state management for the premium user experience.

## Current Status
Platform pillars (Auth, Cart CRUD, SEO, Story, Home, and Support Page Ecosystem) are production-hardened and verified. 

**Phase 2 Complete:**
- Dynamic Header/Footer synced with Shopify Menus (`main-menu`, `footer`)
- Category Carousel driven by `home-categories` menu with auto-play and infinite loop
- Product Gallery with click-to-zoom and thumbnail navigation
- SEO metadata with canonical URLs and hreflang alternates

The storefront is fully localized, documented, and statically optimized, meeting all world-class UX requirements.

