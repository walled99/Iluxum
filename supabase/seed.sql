-- ============================================================
-- Seed Data for Iluxum (Supabase)
-- Run this AFTER schema.sql to populate initial data.
-- Replace image URLs with your Supabase Storage public URLs.
-- ============================================================

-- 1. Collections
INSERT INTO collections (title, handle, description, image_url, image_alt, sort_order) VALUES
  ('Living Room', 'living-room', 'Luxury essentials for your living space', NULL, 'Living Room Collection', 1),
  ('Bedroom', 'bedroom', 'Premium comfort for restful nights', NULL, 'Bedroom Collection', 2),
  ('Kitchen', 'kitchen', 'Elegant kitchen accessories', NULL, 'Kitchen Collection', 3),
  ('Bathroom', 'bathroom', 'Spa-inspired bathroom luxuries', NULL, 'Bathroom Collection', 4);

-- 2. Menus
INSERT INTO menus (handle) VALUES ('main-menu'), ('footer'), ('home-categories');

-- 3. Main Menu Items (update URLs to match your locale strategy)
INSERT INTO menu_items (menu_id, title, url, sort_order)
SELECT m.id, 'Home', '/', 1 FROM menus m WHERE m.handle = 'main-menu'
UNION ALL
SELECT m.id, 'Shop', '/search', 2 FROM menus m WHERE m.handle = 'main-menu'
UNION ALL
SELECT m.id, 'Our Story', '/story', 3 FROM menus m WHERE m.handle = 'main-menu'
UNION ALL
SELECT m.id, 'Contact', '/contact', 4 FROM menus m WHERE m.handle = 'main-menu';

-- 4. Footer Menu Items
INSERT INTO menu_items (menu_id, title, url, sort_order)
SELECT m.id, 'Privacy Policy', '/privacy', 1 FROM menus m WHERE m.handle = 'footer'
UNION ALL
SELECT m.id, 'Terms of Service', '/terms', 2 FROM menus m WHERE m.handle = 'footer'
UNION ALL
SELECT m.id, 'FAQ', '/faq', 3 FROM menus m WHERE m.handle = 'footer'
UNION ALL
SELECT m.id, 'Contact Us', '/contact', 4 FROM menus m WHERE m.handle = 'footer';

-- 5. Home Categories Menu (for the carousel)
-- These link to collection resources
INSERT INTO menu_items (menu_id, title, url, resource_type, resource_id, image_url, image_alt, sort_order)
SELECT
  m.id,
  c.title,
  '/collection/' || c.handle,
  'Collection',
  c.id,
  c.image_url,
  c.image_alt,
  c.sort_order
FROM menus m, collections c
WHERE m.handle = 'home-categories';

-- ============================================================
-- NOTE: Add your actual products using the Supabase Dashboard
-- or create INSERT statements here. Example:
-- ============================================================
--
-- INSERT INTO products (title, handle, description, available_for_sale, tags)
-- VALUES ('Luxury Throw Pillow', 'luxury-throw-pillow', 'A premium hand-stitched throw pillow.', true, ARRAY['home', 'pillow', 'luxury']);
--
-- INSERT INTO product_variants (product_id, title, price, currency_code, available_for_sale, inventory_quantity, selected_options)
-- VALUES ((SELECT id FROM products WHERE handle = 'luxury-throw-pillow'), 'Default', 89.99, 'EGP', true, 50, '[{"name":"Size","value":"Standard"}]');
--
-- INSERT INTO product_images (product_id, url, alt_text, is_featured)
-- VALUES ((SELECT id FROM products WHERE handle = 'luxury-throw-pillow'), 'https://YOUR_SUPABASE_URL/storage/v1/object/public/product-images/pillow.jpg', 'Luxury Throw Pillow', true);
