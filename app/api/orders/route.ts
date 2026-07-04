import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { addressSchema } from "@/lib/validations";
import { createOrder, listOrders } from "@/lib/server/orders";
import { jsonZodError } from "@/lib/server/http";

const createOrderSchema = z.object({
  customerId: z.string().optional(),
  lines: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })).min(1),
  couponCode: z.string().optional(),
  shippingAddress: addressSchema,
  shippingMethod: z.enum(["standard", "expedited", "overnight"]).optional(),
  installation: z
    .object({ installerId: z.string(), installerName: z.string(), date: z.string(), slot: z.string() })
    .optional(),
});

export async function GET() {
  return NextResponse.json({ items: listOrders() });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) return jsonZodError(parsed.error);

  const order = createOrder({
    ...parsed.data,
    shippingAddress: {
      ...parsed.data.shippingAddress,
      id: `address-${Date.now()}`,
      isDefault: parsed.data.shippingAddress.isDefault ?? false,
    },
  });
  return NextResponse.json(order, { status: 201 });
}
