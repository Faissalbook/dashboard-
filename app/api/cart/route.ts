import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { computeCartTotals } from "@/lib/server/pricing";
import { jsonZodError } from "@/lib/server/http";

const cartRequestSchema = z.object({
  lines: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })),
  couponCode: z.string().optional(),
  zip: z.string().optional(),
  shippingMethod: z.enum(["standard", "expedited", "overnight"]).optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = cartRequestSchema.safeParse(body);
  if (!parsed.success) return jsonZodError(parsed.error);

  const totals = computeCartTotals(parsed.data);
  return NextResponse.json(totals);
}

export async function GET() {
  return NextResponse.json({
    message: "POST { lines, couponCode?, zip?, shippingMethod? } to compute cart totals.",
  });
}
