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
- **Internationalization**: `src/app/[locale]/` strategy.
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
- **Typography**:
    - Heading: `Playfair Display`
    - Body: `Inter`
- **Animation**: `fade-gold`

## Key Files
- `src/app/globals.css`: Design system tokens.
- `src/middleware.ts`: Locale handling.
- `src/lib/shopify/client.ts`: GraphQL client.

## Current Status
Project initialized. Folder structure set up. Tailwind v4 configured.
