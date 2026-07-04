import { NextResponse } from "next/server";

import { getFeaturedProducts } from "@/lib/data/products";

export async function GET() {
  return NextResponse.json({ items: getFeaturedProducts(24) });
}
