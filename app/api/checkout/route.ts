import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  checkoutCustomerSchema,
  checkoutInstallationSchema,
  checkoutPaymentSchema,
  checkoutShippingSchema,
} from "@/lib/validations";
import { createOrder } from "@/lib/server/orders";
import { jsonZodError } from "@/lib/server/http";

const checkoutRequestSchema = z.object({
  customer: checkoutCustomerSchema,
  shipping: checkoutShippingSchema,
  installation: checkoutInstallationSchema,
  payment: checkoutPaymentSchema,
  lines: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })).min(1),
  couponCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = checkoutRequestSchema.safeParse(body);
  if (!parsed.success) return jsonZodError(parsed.error);

  const { customer, shipping, installation, lines, couponCode } = parsed.data;

  const order = createOrder({
    lines,
    couponCode,
    shippingMethod: shipping.shippingMethod,
    shippingAddress: {
      id: `address-${Date.now()}`,
      label: "Checkout",
      fullName: `${customer.firstName} ${customer.lastName}`,
      line1: shipping.line1,
      line2: shipping.line2,
      city: shipping.city,
      state: shipping.state,
      zip: shipping.zip,
      country: shipping.country,
      phone: customer.phone,
      isDefault: false,
    },
    installation:
      installation.wantsInstallation && installation.installerId
        ? {
            installerId: installation.installerId,
            installerName: installation.installerId,
            date: installation.date ?? "",
            slot: installation.slot ?? "",
          }
        : undefined,
  });

  return NextResponse.json({ order, email: customer.email }, { status: 201 });
}
