import { NextResponse } from "next/server";

import { findOrder } from "@/lib/server/orders";
import { jsonError } from "@/lib/server/http";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const order = findOrder(id);
  if (!order) return jsonError("Order not found", 404);
  return NextResponse.json(order);
}
