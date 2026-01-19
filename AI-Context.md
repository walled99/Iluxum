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
- `src/app/[locale]/layout.tsx`: Localized layout with directionality injection.
- `src/lib/shopify/client.ts`: GraphQL client with standard fetcher and product queries.
- `src/app/[locale]/(shop)/product/[handle]/page.tsx`: PDP with split-screen layout.
- `src/components/products`: Product components (`ProductCard`, `ProductGallery`, `ProductInfo`).
- `src/components/ui`: Shadcn UI components (Skeleton, Button).
- `src/lib/store/useCartStore.ts`: Persistent store with Auth-phase sync logic.
- `src/lib/shopify/types.ts`: TypeScript interfaces for Shopify objects.

## Current Status
Project initialized, i18n/RTL support implemented, Shopify client with type safety, Persistent Cart Store, luxury ProductCard, and high-end PDP implementation complete.
