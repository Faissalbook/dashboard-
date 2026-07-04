import { beforeEach, describe, expect, it } from "vitest";

import { computeDiscount } from "@/lib/pricing";
import { useCartStore } from "@/store/cart-store";
import type { Coupon } from "@/types";

const LINE = { productId: "p1", slug: "p1", name: "Test Tire", image: "gradient:a", price: 100, size: "225/55R17" };

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ lines: [], coupon: null });
  });

  it("adds a new line item", () => {
    useCartStore.getState().addItem(LINE);
    expect(useCartStore.getState().lines).toHaveLength(1);
    expect(useCartStore.getState().itemCount()).toBe(1);
  });

  it("increments quantity when adding the same product twice", () => {
    useCartStore.getState().addItem(LINE);
    useCartStore.getState().addItem(LINE, 3);
    expect(useCartStore.getState().lines).toHaveLength(1);
    expect(useCartStore.getState().lines[0].quantity).toBe(4);
  });

  it("computes subtotal across quantities", () => {
    useCartStore.getState().addItem(LINE, 2);
    expect(useCartStore.getState().subtotal()).toBe(200);
  });

  it("removes a line when quantity is updated to zero", () => {
    useCartStore.getState().addItem(LINE);
    useCartStore.getState().updateQuantity(LINE.productId, 0);
    expect(useCartStore.getState().lines).toHaveLength(0);
  });

  it("clears the cart and coupon", () => {
    useCartStore.getState().addItem(LINE);
    useCartStore.getState().applyCoupon({ code: "TEST", description: "", type: "fixed", value: 5, minSubtotal: 0, expiresAt: "" });
    useCartStore.getState().clear();
    expect(useCartStore.getState().lines).toHaveLength(0);
    expect(useCartStore.getState().coupon).toBeNull();
  });
});

describe("computeDiscount", () => {
  const percentageCoupon: Coupon = { code: "SAVE10", description: "", type: "percentage", value: 10, minSubtotal: 0, expiresAt: "" };
  const fixedCoupon: Coupon = { code: "SAVE25", description: "", type: "fixed", value: 25, minSubtotal: 100, expiresAt: "" };

  it("returns zero with no coupon", () => {
    expect(computeDiscount(200, null)).toBe(0);
  });

  it("applies a percentage discount", () => {
    expect(computeDiscount(200, percentageCoupon)).toBe(20);
  });

  it("applies a fixed discount when the minimum is met", () => {
    expect(computeDiscount(150, fixedCoupon)).toBe(25);
  });

  it("ignores the coupon when below the minimum subtotal", () => {
    expect(computeDiscount(50, fixedCoupon)).toBe(0);
  });

  it("never discounts more than the subtotal", () => {
    const bigCoupon: Coupon = { code: "BIG", description: "", type: "fixed", value: 500, minSubtotal: 0, expiresAt: "" };
    expect(computeDiscount(50, bigCoupon)).toBe(50);
  });
});
