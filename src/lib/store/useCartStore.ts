import { create } from 'zustand'

interface CartState {
  cart: any
  addItem: () => void
}

export const useCartStore = create<CartState>((set: any) => ({
  cart: null,
  addItem: () => set({ cart: {} }),
}))
