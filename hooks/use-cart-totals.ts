"use client";

import { useQuery } from "@tanstack/react-query";

export interface CartTotals {
  lines: { productId: string; name: string; price: number; quantity: number; lineTotal: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  taxRate: number;
  tax: number;
  total: number;
  coupon: { code: string; description: string } | null;
}

export function useCartTotals(params: {
  lines: { productId: string; quantity: number }[];
  couponCode?: string;
  zip?: string;
  shippingMethod?: "standard" | "expedited" | "overnight";
}) {
  return useQuery({
    queryKey: ["cart-totals", params],
    queryFn: async (): Promise<CartTotals> => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error("Failed to calculate cart totals");
      return res.json();
    },
    enabled: params.lines.length > 0,
    placeholderData: (prev) => prev,
  });
}
