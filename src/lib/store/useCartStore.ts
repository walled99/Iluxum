import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, ProductVariant } from '../shopify/types';
import { syncCartWithServer } from '../shopify/cart';

export interface LocalCartLine {
  id: string; // This will be the variant ID
  quantity: number;
  merchandise: ProductVariant & {
    product: Pick<Product, 'id' | 'title' | 'handle' | 'featuredImage'>;
  };
}

interface CartState {
  lines: LocalCartLine[];
  addItem: (variant: ProductVariant, product: Pick<Product, 'id' | 'title' | 'handle' | 'featuredImage'>) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  syncCart: (serverCartId: string | null) => Promise<string>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addItem: (variant, product) =>
        set((state) => {
          const existingLine = state.lines.find((line) => line.id === variant.id);

          if (existingLine) {
            return {
              lines: state.lines.map((line) =>
                line.id === variant.id
                  ? { ...line, quantity: line.quantity + 1 }
                  : line
              ),
            };
          }

          return {
            lines: [
              ...state.lines,
              {
                id: variant.id,
                quantity: 1,
                merchandise: {
                  ...variant,
                  product,
                },
              },
            ],
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
      syncCart: async (serverCartId) => {
        const cartId = await syncCartWithServer(get().lines, serverCartId);
        set({ lines: [] });
        return cartId;
      },
      clearCart: () => set({ lines: [] }),
    }),
    {
      name: 'iluxum-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
