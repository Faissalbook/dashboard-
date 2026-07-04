"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Coupon } from "@/types";

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  coupon: Coupon | null;
  addItem: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (coupon: Coupon | null) => void;
  clear: () => void;
  subtotal: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      coupon: null,
      addItem: (line, quantity = 1) => {
        set((state) => {
          const existing = state.lines.find((l) => l.productId === line.productId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.productId === line.productId ? { ...l, quantity: l.quantity + quantity } : l,
              ),
            };
          }
          return { lines: [...state.lines, { ...line, quantity }] };
        });
      },
      removeItem: (productId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.productId !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.productId !== productId)
              : state.lines.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
        })),
      applyCoupon: (coupon) => set({ coupon }),
      clear: () => set({ lines: [], coupon: null }),
      subtotal: () => get().lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
      itemCount: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
    }),
    { name: "obsidian-tread-cart" },
  ),
);
