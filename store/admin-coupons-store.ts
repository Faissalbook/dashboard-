"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Coupon } from "@/types";
import { coupons as seedCoupons } from "@/lib/data/coupons";

interface AdminCouponsState {
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  removeCoupon: (code: string) => void;
}

export const useAdminCouponsStore = create<AdminCouponsState>()(
  persist(
    (set) => ({
      coupons: seedCoupons,
      addCoupon: (coupon) =>
        set((state) => ({
          coupons: [coupon, ...state.coupons.filter((c) => c.code !== coupon.code)],
        })),
      removeCoupon: (code) => set((state) => ({ coupons: state.coupons.filter((c) => c.code !== code) })),
    }),
    { name: "obsidian-tread-admin-coupons" },
  ),
);
