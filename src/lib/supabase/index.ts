// Barrel export for the Supabase library
// Import from '@/lib/supabase' for all data and auth operations.

export { supabase } from './client';

export {
  getProduct,
  getShop,
  getCollection,
  getCollections,
  searchProducts,
  getProductRecommendations,
  getMenu,
} from './queries';

export type {
  Product,
  ProductVariant,
  ProductOption,
  Image,
  Money,
  Cart,
  CartLine,
  Menu,
  MenuItem,
  Connection,
  Edge,
  SEO,
} from './types';
