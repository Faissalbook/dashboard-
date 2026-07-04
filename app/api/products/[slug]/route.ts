import { NextResponse } from "next/server";

import { getProductBySlug } from "@/lib/data/products";
import { getBrandById } from "@/lib/data/brands";
import { getCategoryById } from "@/lib/data/categories";
import { jsonError } from "@/lib/server/http";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const product = getProductBySlug(slug);
  if (!product) return jsonError("Product not found", 404);

  return NextResponse.json({
    ...product,
    brand: getBrandById(product.brandId),
    category: getCategoryById(product.categoryId),
  });
}
