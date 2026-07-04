import type { Coupon } from "@/types";

export const coupons: Coupon[] = [
  { code: "WELCOME10", description: "10% off your first order", type: "percentage", value: 10, minSubtotal: 0, expiresAt: "2026-12-31" },
  { code: "FREESHIP", description: "Free standard shipping", type: "free-shipping", value: 0, minSubtotal: 100, expiresAt: "2026-12-31" },
  { code: "SAVE25", description: "$25 off orders over $300", type: "fixed", value: 25, minSubtotal: 300, expiresAt: "2026-12-31" },
];

export function getCouponByCode(code: string) {
  return coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
}
