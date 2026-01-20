# Iluxum Storefront Directory

A comprehensive guide to the pages and features of the Iluxum luxury textile storefront.

## Core Commerce Pages

### 1. Home Page
- **Route**: `/[locale]`
- **Purpose**: Brand centerpiece and primary entry point.
- **Key Features**:
  - Hero section with cinematic imagery.
  - "Shop By Category" Bento-lite grid.
  - Featured products slider/grid.
  - Narrative brand teaser.

### 2. Collection Page
- **Route**: `/[locale]/collection/[handle]`
- **Purpose**: Dedicated space for browsing themed textile sets (e.g., Bedroom, Bathroom).
- **Key Features**:
  - Rich header imagery and descriptions.
  - Responsive product grid.
  - Breadcrumb navigation.

### 3. Product Detail Page (PDP)
- **Route**: `/[locale]/product/[handle]`
- **Purpose**: Deep dive into individual luxury items.
- **Key Features**:
  - High-resolution image gallery.
  - Variant selection (size, color, etc.).
  - Detailed product specifications.
  - "You May Also Like" cross-sell recommendations.

### 4. Search & Discovery
- **Route**: `/[locale]/search`
- **Purpose**: Dynamic product filtering and searching.
- **Key Features**:
  - Real-time predictive search results (in Header).
  - Search results page with product count.

---

## Authentication & Account

### 5. Account Dashboard
- **Route**: `/[locale]/account`
- **Purpose**: Private customer portal.
- **Key Features**:
  - Order history.
  - Address management.
  - Personal details update.

### 6. Authentication Flows
- **Routes**: `/[locale]/login`, `/[locale]/register`
- **Purpose**: Secure entry and onboarding.
- **Key Features**:
  - Shopify Customer API integration.
  - Error handling and redirect logic.

---

## Content & Support

### 7. Brand Story (Heritage)
- **Route**: `/[locale]/story`
- **Purpose**: Communicating the craftsmanship and origins of Iluxum textiles.

### 8. Contact Concierge
- **Route**: `/[locale]/contact`
- **Purpose**: Direct communication channel for pre-sale and post-sale inquiries.
- **Key Features**:
  - Minimalist contact form.
  - Boutique information (Address, Phone, Email).

### 9. Assistance & FAQ
- **Route**: `/[locale]/faq`
- **Purpose**: Self-service support for shipping, returns, and heritage queries.
- **Key Features**:
  - Categorized accordion interface.

---

## Legal & Compliance

### 10. Privacy Policy
- **Route**: `/[locale]/privacy`
- **Purpose**: Transparency regarding data usage and protection.

### 11. Terms of Service
- **Route**: `/[locale]/terms`
- **Purpose**: Governing use of the platform and commerce transactions.

---

## Global Components

- **Header**: Contains Logo, localized navigation (Collections, Story, Contact, FAQ), Predictive Search, Account link, and Cart trigger.
- **Footer**: Localized links to all sections, social signals, newsletter subscription, and payment trust indicators.
- **Cart Drawer**: Side-panel for reviewing items, updating quantities, and initiating the Shopify checkout flow.
