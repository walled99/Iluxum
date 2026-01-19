# Structural UI/UX Audit: More Cottons

This document provides a technical deconstruction of the architecture and information hierarchy of [morecottons.com](https://morecottons.com/). This audit ignores branding and aesthetics to focus strictly on element placement, functional logic, and layout patterns.

---

## 1. Global Header & Navigation

**Visual Layout:** High-density Sticky Nav with a Top Utility Bar.

**Key Elements:**
- **Top Bar:** Language switcher, Promo text/Alert bar.
- **Main Nav (Split):** Centered Branding (H1), Left-aligned Hamburger menu (Mobile) or Category links (Desktop), Right-aligned Search icon, Account link, and Cart Trigger (with badge).
- **Mega Menu:** Cascading dropdowns/drawers for categories (Bedroom, Bathroom, etc.).

**Hierarchy & Spacing:**
- **Primary Focus:** The Branding/Logo sits at the geometric center.
- **Grouping:** Navigation is grouped by intent (Browsing on the left, Utility/Action on the right).
- **Sticky Behavior:** Ensures conversion tools (Cart/Search) remain accessible during vertical scroll.

**Functional Logic:** Provides universal access to the product catalog and user account state. The Search trigger opens a full-screen overlay or dropdown to minimize layout shift.

---

## 2. Homepage: Hero Section

**Visual Layout:** Full-width Carousel / Single Hero Frame.

**Key Elements:**
- **Messaging:** Primary Headline (H2), Sub-headline (Text block).
- **Action:** Prominent CTA buttons (Primary/Secondary).
- **Indicators:** Scroll indicators or pagination dots for carousel movement.

**Hierarchy & Spacing:**
- **Primary Focus:** High-contrast text overlay centered or left-aligned within the hero container.
- **Padding:** Generous vertical padding to create "breathing room" at the top of the funnel.

**Functional Logic:** Sets the site's intent and directs users to high-priority collections (e.g., "Winter Collection").

---

## 3. Homepage: Shop By Category (Bento-lite / Grid)

**Visual Layout:** Responsive Grid (varying column counts based on viewport).

**Key Elements:**
- **Card Containers:** Individual category wrappers.
- **Labels:** Text overlays or bottom-aligned captions.
- **Links:** Entire card is typically a touch target.

**Hierarchy & Spacing:**
- **Grouping:** Categories are grouped by room (Bedroom, Bathroom, etc.).
- **Equal Weight:** Most cards share identical dimensions to imply equal priority across segments.

**Functional Logic:** Acts as a visual directory to filter the shopping experience early in the user journey.

---

## 4. Product Listing Page (PLP) / Category Page

**Visual Layout:** 2-column (Sidebar + Main Grid) or Full-width grid with Top Filters.

**Key Elements:**
- **Header:** Collection Title (H1) + Description breadcrumbs.
- **Filter/Sort Bar:** Horizontal or Vertical sidebar with checkboxes (Size, Material, Price).
- **Product Card:** Image container, Title (Link), Secondary metadata (Variant count), Price, and "Quick Add" buttons.

**Hierarchy & Spacing:**
- **Primary Focus:** The Product Image within each card.
- **Alignment:** Strict grid alignment maintained across all devices for scannability.
- **Secondary Focus:** Price and Variant indicators (e.g., "+6 colors").

**Functional Logic:** Enables efficient narrowing of product choices. The "Quick Add" or "Hover to View" logic reduces friction by keeping users on the discovery page.

---

## 5. Product Detail Page (PDP)

**Visual Layout:** Split-screen (Image Gallery on Left, Product Info Cluster on Right).

**Key Elements:**
- **Visuals:** Primary Image + Thumbnail strip or Scrollable gallery.
- **Info Cluster:** Product Title (H1), Rating/Review summary, Price, Size Selector (Radio buttons/Dropdown), Color Swatches.
- **Primary Action:** Large "Add to Cart" button (CTA).
- **Discovery:** "You may also like" (Recommended Products) grid at the bottom.
- **Content Tabs/Accordion:** Description, Care Instructions, and Size Guide.

**Hierarchy & Spacing:**
- **Primary Focus:** Product Image and the "Add to Cart" CTA.
- **Proximity:** Selectable variants (Size/Color) are placed immediately above the CTA to minimize mouse travel.
- **Information Density:** Care instructions and secondary details are nested in accordions to keep the "Above the Fold" view clean.

**Functional Logic:** The final conversion point. Relies on clear selection states and immediate visual feedback when variants are updated.

---

## 6. Global Footer

**Visual Layout:** Multi-column (4 or 5 columns) with a bottom Utility Strip.

**Key Elements:**
- **Brand Info:** About text, Social icons.
- **Navigation Links:** Information (FAQ, Policy), Contact, and Support links.
- **Engagement:** Newsletter signup input + CTA.
- **Verification:** Payment gateways, Tax/Registry info (e.g., Tax Card), Developer credits.

**Hierarchy & Spacing:**
- **Grouping:** Links are categorized by "Customer Care" vs. "Legal/Policy".
- **Contrast:** Typically uses a distinct background block to signal the end of the page content.

**Functional Logic:** Provides trust signals, regulatory information, and alternative navigation for users who reach the bottom of the page.
