import type { Coupon } from "@/types";

export function computeDiscount(subtotal: number, coupon: Coupon | null) {
  if (!coupon || subtotal < coupon.minSubtotal) return 0;
  if (coupon.type === "percentage") return Math.round(subtotal * (coupon.value / 100) * 100) / 100;
  if (coupon.type === "fixed") return Math.min(coupon.value, subtotal);
  return 0;
}
