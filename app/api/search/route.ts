import { NextRequest, NextResponse } from "next/server";

import { queryProducts } from "@/lib/data/query";
import type { ProductFilters, Season, SortOption } from "@/types";

function parseNumberList(value: string | null) {
  if (!value) return undefined;
  return value
    .split(",")
    .map(Number)
    .filter((n) => !Number.isNaN(n));
}

function parseStringList(value: string | null) {
  if (!value) return undefined;
  return value.split(",").filter(Boolean);
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const filters: ProductFilters = {
    q: params.get("q") ?? undefined,
    width: parseNumberList(params.get("width")),
    aspectRatio: parseNumberList(params.get("aspectRatio")),
    diameter: parseNumberList(params.get("diameter")),
    season: parseStringList(params.get("season")) as Season[] | undefined,
    brandIds: parseStringList(params.get("brandIds")),
    categoryIds: parseStringList(params.get("categoryIds")),
    minPrice: params.has("minPrice") ? Number(params.get("minPrice")) : undefined,
    maxPrice: params.has("maxPrice") ? Number(params.get("maxPrice")) : undefined,
    minRating: params.has("minRating") ? Number(params.get("minRating")) : undefined,
    sort: (params.get("sort") as SortOption | null) ?? undefined,
    page: params.has("page") ? Number(params.get("page")) : undefined,
    pageSize: params.has("pageSize") ? Number(params.get("pageSize")) : undefined,
  };

  const result = queryProducts(filters);
  return NextResponse.json(result);
}
