**Version:** 2.0 (Next.js 16 + Tailwind v4 + Shopify Headless)

### 1. Modern Styling Architecture (Tailwind v4)

We are moving away from `tailwind.config.js`. In v4, the design system is defined directly in CSS using the `@theme` engine.

**Implementation (`app/globals.css`):**

CSS

`@import "tailwindcss";

@theme {
  /* Brand Palette - Deep Navy & Champagne Gold */
  --color-primary: #121442;
  --color-accent: #C2AC82;
  --color-background: #FDFBF7;
  --color-surface: #F4F1EA;
  --color-ink: #1A1A1A;

  /* Typography Strategy */
  --font-heading: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;

  /* Luxury Animations */
  --animate-fade-gold: fade-in 0.5s ease-in-out;
}`

### 2. Shopify Integration Details

Using the provided credentials for high-performance headless fetching via the Storefront API:

- **Store Domain:** `iluxum-store.myshopify.com`
- **Storefront Access Token:** `[REDACTED]`
- **API Key:** `[REDACTED]`
- **API Secret (Webhook Security):** `[REDACTED]`

---

### 3. Routing & Internationalization (i18n)

We will use a **Dynamic Segment Strategy** for localized routing.

- **URL Pattern:** `/[market]-[language]/...` (e.g., `/eg-ar/`, `/ch-fr/`).
- **Hreflang Logic:** In the `layout.tsx` Metadata API, we will generate:TypeScript
    
    `alternates: { 
      languages: { 
        'ar-EG': '/eg-ar', 
        'en-EG': '/eg-en', 
        'fr-CH': '/ch-fr' 
      } 
    }`
    
- **Directionality:** A top-level provider detects the language and injects `dir="rtl"` or `dir="ltr"` into the `<html>` tag.

### 4. Global State & Cart Strategy (The "Merge" Flow)

We use **Zustand v5** with the `persist` middleware to bridge the gap between anonymous browsing and authenticated shopping.

**The Logic:**

1. **Guest Phase:** User adds items to `localCart` (Zustand/LocalStorage).
2. **Auth Phase:** User logs in via Shopify Customer API.
3. **Sync Phase:** * Fetch the "Server Cart" from Shopify via customer query.
    - Compare `localCart` and `serverCart`.
    - Trigger `cartLinesAdd` mutation for any unique items in `localCart` that aren't in `serverCart`.
    - Clear `localCart` and switch the UI to read from the Shopify source-of-truth.

---

### 5. Performance & Data Integrity

- **On-Demand Revalidation:** Implementation of a POST route at `/api/revalidate`.
    - **Trigger:** Shopify Webhooks (collection/update, product/update).
    - **Security:** Validate HMAC signatures using the `API Secret Key`.
    - **Action:** `revalidateTag('products')`.
- **Component Resilience:**
    - **Skeletons:** Every RSC will have a corresponding `loading.tsx` or Suspense fallback using Shadcn Skeletons.
    - **Error Boundaries:** The `FilterSidebar` and `ReviewSection` will be wrapped in separate `ErrorBoundary` components. If Metafields (Reviews) fail, the core "Add to Cart" functionality remains active.

### 6. UI/UX: RTL & Logical Properties

With Tailwind v4, we strictly use **Logical Properties** to ensure the luxury layout mirrors correctly for Arabic.

- **Padding/Margin:** `ps-4` (start) / `pe-4` (end) instead of `pl-4` / `pr-4`.
- **Positioning:** `start-0` instead of `left-0`.
- **Icons:** Use a utility to `scaleX(-1)` icons like "arrows" when the direction is RTL using the `rtl:` modifier.

---

### 7. Updated Folder Structure (Pro Setup)

Plaintext

`src/
├── app/
│   └── [locale]/
│       ├── (shop)/           # Marketing & Product pages
│       ├── (auth)/           # Login/Register
│       └── api/
│           └── revalidate/   # Webhook handler (Uses API Secret)
├── components/
│   ├── cart/                 # CartDrawer, CartMergeLogic
│   ├── i18n/                 # LocaleSwitcher, DirProvider
│   └── products/             # ProductCard (with Skeleton)
├── lib/
│   ├── shopify/
│   │   ├── client.ts         # GQL Fetcher (Uses Storefront Token)
│   │   ├── queries/          # .graphql or template strings
│   │   └── mutations/        # cartLinesAdd, customerAccessTokenCreate
│   └── store/
│       └── useCartStore.ts   # Zustand + Persist
├── app/globals.css            # Tailwind v4 @import & @theme config
├── postcss.config.mjs         # Includes @tailwindcss/postcss
└── middleware.ts              # Geo-detection & Redirects`

### 8. Implementation Roadmap:

1. **Foundation:** Setup Next.js 16, PostCSS, and Tailwind v4 CSS-first theme.
2. **Catalog:** RSC & Shadcn Product Grid with high-end Serif typography.
3. **Interactive:** Cart Drawer & Zustand Store with RTL support.
4. **Logic:** Auth & Cart Merging using the Shopify Storefront API.
5. **Resilience:** Webhook integration and secure revalidation using the API Secret.