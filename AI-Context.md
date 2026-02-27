# AI Context: Iluxum

## Project Overview
Iluxum is a luxury e-commerce storefront built with Next.js 16 (App Router), Tailwind CSS v4, Supabase, and Stripe.

## Tech Stack
- **Framework**: Next.js 16.1.3 (App Router)
- **Styling**: Tailwind CSS v4
- **Database/Auth**: Supabase
- **Payments**: Stripe
- **State Management**: Zustand v5 (Persisted Cart)

## Architecture
- **Internationalization**: `src/app/[locale]/` strategy with locale detection.
- **Directionality**: `DirProvider` logic for RTL/LTR.
- **Backend Architecture**:
    - `src/lib/supabase`: Data access layer and server actions.
    - `src/app/api/webhooks/stripe`: Order fulfillment pipeline.

## Design System
- **Colors**: Deep Navy (`#121442`), Champagne Gold (`#C2AC82`).
- **Typography**: Cormorant Garamond (Heading), Inter (Body).
- **Layout**: Strict use of Logical Properties for RTL/LTR.

## Core Features
- **Supabase Integration**: Unified database for products, collections, and menus.
- **Authentication**: Secure customer identity management using Supabase Auth.
- **Client-Side Cart**: High-performance local cart management with Stripe Checkout sync.
- **Luxury Content**: Narrative-driven Story page and high-end typography.
- **Product Discovery**: Breadcrumbs and dynamic recommendations.

## Key Files
- `src/lib/supabase/queries.ts`: Main data fetching layer.
- `src/lib/supabase/actions.ts`: Auth and search server actions.
- `src/app/api/webhooks/stripe/route.ts`: Stripe event handler.
- `src/lib/store/useCartStore.ts`: Persistent cart state.

## Status
**Phase 2 Complete:**
- Full migration from Shopify to Supabase finished.
- Dynamic Header/Footer synced with Supabase Menus.
- Product & Collection data rewired to Supabase tables.
- Image storage configured in Supabase Storage.
- **UI/UX Overhaul**: Premium Deep Navy & Champagne Gold palette implemented.
- **Typography Refinement**: Switched to Cormorant Garamond and balanced title scaling.

**Phase 3 (Next):**
- Stripe Checkout integration and Order history sync.
