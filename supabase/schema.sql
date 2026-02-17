-- ============================================================
-- Iluxum E-Commerce Schema for Supabase (PostgreSQL)
-- Run this in the Supabase SQL Editor to create all tables.
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. COLLECTIONS
-- ============================================================
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  handle TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  image_url TEXT,
  image_alt TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. PRODUCTS
-- ============================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  handle TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  description_html TEXT DEFAULT '',
  available_for_sale BOOLEAN DEFAULT true,
  tags TEXT[] DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 3. PRODUCT IMAGES
-- ============================================================
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false
);

CREATE INDEX idx_product_images_product ON product_images(product_id);

-- ============================================================
-- 4. PRODUCT OPTIONS (e.g., Size, Color)
-- ============================================================
CREATE TABLE product_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,          -- e.g. "Size", "Color"
  "values" TEXT[] NOT NULL     -- e.g. ['S', 'M', 'L', 'XL']
);

CREATE INDEX idx_product_options_product ON product_options(product_id);

-- ============================================================
-- 5. PRODUCT VARIANTS
-- ============================================================
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Default Title',
  sku TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  currency_code TEXT DEFAULT 'EGP',
  available_for_sale BOOLEAN DEFAULT true,
  selected_options JSONB DEFAULT '[]',  -- [{ "name": "Size", "value": "M" }]
  inventory_quantity INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_variants_product ON product_variants(product_id);

-- ============================================================
-- 6. PRODUCT <-> COLLECTION junction
-- ============================================================
CREATE TABLE product_collections (
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  sort_order INT DEFAULT 0,
  PRIMARY KEY (product_id, collection_id)
);

-- ============================================================
-- 7. MENUS (for Header / Footer / Category nav)
-- ============================================================
CREATE TABLE menus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  handle TEXT UNIQUE NOT NULL  -- e.g. 'main-menu', 'footer', 'home-categories'
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_id UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT DEFAULT '',
  resource_type TEXT,           -- 'Collection', 'Product', 'Page', or NULL for external links
  resource_id UUID,             -- FK to the resource if applicable
  image_url TEXT,
  image_alt TEXT DEFAULT '',
  sort_order INT DEFAULT 0
);

CREATE INDEX idx_menu_items_menu ON menu_items(menu_id);

-- ============================================================
-- 8. ORDERS
-- ============================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID,             -- References auth.users(id) from Supabase Auth
  order_number SERIAL,
  email TEXT,
  status TEXT DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
  financial_status TEXT DEFAULT 'pending',
  fulfillment_status TEXT DEFAULT 'unfulfilled',
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency_code TEXT DEFAULT 'EGP',
  stripe_session_id TEXT,
  shipping_address JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 9. ORDER ITEMS
-- ============================================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  title TEXT NOT NULL,
  variant_title TEXT,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ============================================================
-- 10. ROW-LEVEL SECURITY (RLS)
-- ============================================================

-- Products & Collections: Public read, Admin write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Public read policies for storefront data
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read collections" ON collections FOR SELECT USING (true);
CREATE POLICY "Public read product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read product_options" ON product_options FOR SELECT USING (true);
CREATE POLICY "Public read product_variants" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Public read product_collections" ON product_collections FOR SELECT USING (true);
CREATE POLICY "Public read menus" ON menus FOR SELECT USING (true);
CREATE POLICY "Public read menu_items" ON menu_items FOR SELECT USING (true);

-- Orders: Users can only read their own orders
CREATE POLICY "Users read own orders" ON orders
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Users read own order items" ON order_items
  FOR SELECT USING (
    order_id IN (SELECT id FROM orders WHERE customer_id = auth.uid())
  );

-- ============================================================
-- 11. HELPER FUNCTIONS
-- ============================================================

-- Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
