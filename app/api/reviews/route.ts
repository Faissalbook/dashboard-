import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { Review } from "@/types";
import { getReviewsForProduct } from "@/lib/data/reviews";
import { getProductById } from "@/lib/data/products";
import { reviewSchema } from "@/lib/validations";
import { jsonError, jsonZodError } from "@/lib/server/http";

declare global {
  var __obsidianExtraReviews: Review[] | undefined;
}

function getExtraReviews() {
  if (!globalThis.__obsidianExtraReviews) globalThis.__obsidianExtraReviews = [];
  return globalThis.__obsidianExtraReviews;
}

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("productId");
  if (!productId) return jsonError("productId query parameter is required", 400);

  const reviews = [
    ...getExtraReviews().filter((r) => r.productId === productId),
    ...getReviewsForProduct(productId),
  ];
  return NextResponse.json(reviews);
}

const submitReviewSchema = reviewSchema.extend({ productId: z.string() });

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = submitReviewSchema.safeParse(body);
  if (!parsed.success) return jsonZodError(parsed.error);

  const product = getProductById(parsed.data.productId);
  if (!product) return jsonError("Product not found", 404);

  const review: Review = {
    id: `review-${Date.now()}`,
    productId: parsed.data.productId,
    customerName: parsed.data.customerName,
    rating: parsed.data.rating,
    title: parsed.data.title,
    body: parsed.data.body,
    verifiedPurchase: false,
    helpfulCount: 0,
    createdAt: new Date().toISOString(),
  };

  getExtraReviews().unshift(review);
  return NextResponse.json(review, { status: 201 });
}
