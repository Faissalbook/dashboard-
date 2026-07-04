import { describe, expect, it } from "vitest";

import { addressSchema, checkoutPaymentSchema, loginSchema, registerSchema } from "@/lib/validations";

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    const result = loginSchema.safeParse({ email: "test@example.com", password: "password123" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({ email: "not-an-email", password: "password123" });
    expect(result.success).toBe(false);
  });

  it("rejects a short password", () => {
    const result = loginSchema.safeParse({ email: "test@example.com", password: "short" });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({
      name: "Alex Rivera",
      email: "alex@example.com",
      password: "password123",
      confirmPassword: "password456",
    });
    expect(result.success).toBe(false);
  });

  it("accepts matching passwords", () => {
    const result = registerSchema.safeParse({
      name: "Alex Rivera",
      email: "alex@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(true);
  });
});

describe("addressSchema", () => {
  it("rejects an invalid ZIP code", () => {
    const result = addressSchema.safeParse({
      label: "Home",
      fullName: "Alex Rivera",
      line1: "123 Main St",
      city: "Denver",
      state: "CO",
      zip: "not-a-zip",
      country: "United States",
      phone: "3035550148",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid address", () => {
    const result = addressSchema.safeParse({
      label: "Home",
      fullName: "Alex Rivera",
      line1: "123 Main St",
      city: "Denver",
      state: "CO",
      zip: "80202",
      country: "United States",
      phone: "3035550148",
    });
    expect(result.success).toBe(true);
  });
});

describe("checkoutPaymentSchema", () => {
  it("strips whitespace from card numbers", () => {
    const result = checkoutPaymentSchema.safeParse({
      cardName: "Alex Rivera",
      cardNumber: "4242 4242 4242 4242",
      expiry: "12/28",
      cvc: "123",
      billingSameAsShipping: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.cardNumber).toBe("4242424242424242");
    }
  });

  it("rejects an invalid expiry format", () => {
    const result = checkoutPaymentSchema.safeParse({
      cardName: "Alex Rivera",
      cardNumber: "4242424242424242",
      expiry: "2028-12",
      cvc: "123",
      billingSameAsShipping: true,
    });
    expect(result.success).toBe(false);
  });
});
