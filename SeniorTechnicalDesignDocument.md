**Version:** 3.0 (Next.js 16 + Tailwind v4 + Supabase + Stripe)

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
  --font-heading: "Cormorant Garamond", serif;
  --font-body: "Inter", sans-serif;

  /* Luxury Animations */
  --animate-fade-gold: fade-in 0.5s ease-in-out;
}`

### 2. Supabase & Stripe Integration

We use **Supabase** for data and **Stripe** for payments:

- **Database**: PostgreSQL on Supabase.
- **Auth**: Supabase Auth (Email + Next.js Server Components).
- **Storage**: Supabase Storage for high-res product imagery.
- **Payments**: Stripe Checkout and Webhooks for order fulfillment.

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

### 4. Global State & Cart Strategy

We use **Zustand v5** with the `persist` middleware to manage the shopping experience.

**The Logic:**

1. **Local Phase**: User adds items to `localCart` (Zustand/LocalStorage).
2. **Checkout Phase**: On checkout, the cart is passed to a Stripe Session.
3. **Fulfillment Phase**: Once payment succeeds, a Stripe Webhook creates the final order in the Supabase `orders` table.

---

### 5. Performance & Data Integrity

- **Payments & Webhooks**:
    - **Stripe Webhook**: `/api/webhooks/stripe`.
    - **Security**: Validate Stripe signatures using the `WEBHOOK_SECRET`.
    - **Action**: Create `orders` and `order_items` in the database.
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
│           └── webhooks/     # Stripe Webhook handler
├── components/
│   ├── cart/                 # CartDrawer
│   ├── i18n/                 # LocaleSwitcher, DirProvider
│   └── products/             # Product Info, Gallery, Cards
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Supabase Client
│   │   ├── queries.ts        # Data fetching (PostgreSQL)
│   │   └── actions.ts        # Server Actions (Auth, Search)
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