import { z } from "zod";

export const tireSearchSchema = z.object({
  width: z.string().min(1, "Select a width"),
  aspectRatio: z.string().min(1, "Select an aspect ratio"),
  diameter: z.string().min(1, "Select a diameter"),
});
export type TireSearchInput = z.infer<typeof tireSearchSchema>;

export const vehicleSearchSchema = z.object({
  year: z.string().min(1, "Select a year"),
  makeId: z.string().min(1, "Select a make"),
  modelId: z.string().min(1, "Select a model"),
  trimId: z.string().min(1, "Select a trim"),
});
export type VehicleSearchInput = z.infer<typeof vehicleSearchSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export const addressSchema = z.object({
  label: z.string().min(1, "Give this address a label"),
  fullName: z.string().min(2, "Enter the recipient's full name"),
  line1: z.string().min(3, "Enter a street address"),
  line2: z.string().optional(),
  city: z.string().min(1, "Enter a city"),
  state: z.string().min(2, "Enter a state"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code"),
  country: z.string().min(1, "Select a country"),
  phone: z.string().min(7, "Enter a valid phone number"),
  isDefault: z.boolean().optional(),
});
export type AddressInput = z.infer<typeof addressSchema>;

export const checkoutCustomerSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  firstName: z.string().min(1, "Enter your first name"),
  lastName: z.string().min(1, "Enter your last name"),
  phone: z.string().min(7, "Enter a valid phone number"),
});
export type CheckoutCustomerInput = z.infer<typeof checkoutCustomerSchema>;

export const checkoutShippingSchema = z.object({
  line1: z.string().min(3, "Enter a street address"),
  line2: z.string().optional(),
  city: z.string().min(1, "Enter a city"),
  state: z.string().min(2, "Enter a state"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code"),
  country: z.string().min(1, "Select a country"),
  shippingMethod: z.enum(["standard", "expedited", "overnight"]),
});
export type CheckoutShippingInput = z.infer<typeof checkoutShippingSchema>;

export const checkoutInstallationSchema = z.object({
  wantsInstallation: z.boolean(),
  installerId: z.string().optional(),
  date: z.string().optional(),
  slot: z.string().optional(),
});
export type CheckoutInstallationInput = z.infer<typeof checkoutInstallationSchema>;

export const checkoutPaymentSchema = z.object({
  cardName: z.string().min(2, "Enter the name on the card"),
  cardNumber: z
    .string()
    .regex(/^\d{13,19}$/, "Enter a valid card number")
    .transform((v) => v.replace(/\s+/g, "")),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvc: z.string().regex(/^\d{3,4}$/, "Enter a valid CVC"),
  billingSameAsShipping: z.boolean(),
});
export type CheckoutPaymentInput = z.infer<typeof checkoutPaymentSchema>;

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(3, "Give your review a short title"),
  body: z.string().min(10, "Share a bit more detail (10+ characters)"),
  customerName: z.string().min(2, "Enter your name"),
});
export type ReviewInput = z.infer<typeof reviewSchema>;

export const couponSchema = z.object({
  code: z.string().min(1, "Enter a coupon code"),
});
export type CouponInput = z.infer<typeof couponSchema>;

export const adminProductSchema = z.object({
  name: z.string().min(3, "Enter a product name"),
  brandId: z.string().min(1, "Select a brand"),
  categoryId: z.string().min(1, "Select a category"),
  price: z.number().positive("Enter a valid price"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  width: z.number().int().positive("Enter a valid width"),
  aspectRatio: z.number().int().positive("Enter a valid aspect ratio"),
  diameter: z.number().int().positive("Enter a valid diameter"),
});
export type AdminProductInput = z.infer<typeof adminProductSchema>;

export const adminCouponSchema = z.object({
  code: z.string().min(3, "Enter a coupon code").toUpperCase(),
  description: z.string().min(3, "Enter a description"),
  type: z.enum(["percentage", "fixed", "free-shipping"]),
  value: z.number().min(0, "Enter a valid value"),
  minSubtotal: z.number().min(0, "Enter a valid minimum"),
  expiresAt: z.string().min(1, "Select an expiration date"),
});
export type AdminCouponInput = z.infer<typeof adminCouponSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
export type ContactInput = z.infer<typeof contactSchema>;
