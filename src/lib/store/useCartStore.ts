import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, ProductVariant, Image } from '../supabase/types';
// Removed syncCartWithServer import as syncCart action is removed

export interface LocalProduct {
  id: string;
  title: string;
  handle: string;
  featuredImage: Image;
}

export interface LocalCartLine {
  id: string; // Variant ID
  quantity: number;
  merchandise: ProductVariant & { product: LocalProduct };
}

interface CartState {
  lines: LocalCartLine[];
  cartId: string | null;
  isCartOpen: boolean;
  addItem: (variant: ProductVariant, product: LocalProduct) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  setCartId: (id: string | null) => void;
  setCartOpen: (open: boolean) => void;
  setLines: (lines: LocalCartLine[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({ // Removed 'get' as it's no longer used after syncCart removal
      lines: [],
      cartId: null,
      isCartOpen: false,
      addItem: (variant, product) =>
        set((state) => {
          const existingLine = state.lines.find((line) => line.id === variant.id);
          if (existingLine) {
            return {
              lines: state.lines.map((line) =>
                line.id === variant.id ? { ...line, quantity: line.quantity + 1 } : line
              ),
              isCartOpen: true,
            };
          }
          return {
            lines: [...state.lines, { id: variant.id, quantity: 1, merchandise: { ...variant, product } }],
            isCartOpen: true,
          };
        }),
      removeItem: (variantId) =>
        set((state) => ({
          lines: state.lines.filter((line) => line.id !== variantId),
        })),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          lines: state.lines.map((line) =>
            line.id === variantId ? { ...line, quantity } : line
          ),
        })),
      // Removed syncCart action
      clearCart: () => set({ lines: [] }),
      setCartId: (id) => set({ cartId: id }),
      setCartOpen: (open) => set({ isCartOpen: open }),
      setLines: (lines) => set({ lines }),
    }),
    {
      name: 'iluxum-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines, cartId: state.cartId }),
    }
  )
);
