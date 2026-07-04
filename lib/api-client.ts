import type { PaginatedResult, Product, ProductFilters, Review } from "@/types";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed with status ${res.status}`);
  }
  return res.json();
}

export function filtersToSearchParams(filters: ProductFilters): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.width?.length) params.set("width", filters.width.join(","));
  if (filters.aspectRatio?.length) params.set("aspectRatio", filters.aspectRatio.join(","));
  if (filters.diameter?.length) params.set("diameter", filters.diameter.join(","));
  if (filters.season?.length) params.set("season", filters.season.join(","));
  if (filters.brandIds?.length) params.set("brandIds", filters.brandIds.join(","));
  if (filters.categoryIds?.length) params.set("categoryIds", filters.categoryIds.join(","));
  if (typeof filters.minPrice === "number") params.set("minPrice", String(filters.minPrice));
  if (typeof filters.maxPrice === "number") params.set("maxPrice", String(filters.maxPrice));
  if (typeof filters.minRating === "number") params.set("minRating", String(filters.minRating));
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.pageSize) params.set("pageSize", String(filters.pageSize));
  return params.toString();
}

export const api = {
  searchProducts: (filters: ProductFilters) =>
    fetchJson<PaginatedResult<Product>>(`/api/search?${filtersToSearchParams(filters)}`),
  getProduct: (slug: string) => fetchJson<Product>(`/api/products/${slug}`),
  getReviews: (productId: string) => fetchJson<Review[]>(`/api/reviews?productId=${productId}`),
  submitReview: (productId: string, payload: unknown) =>
    fetchJson<Review>(`/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, ...(payload as object) }),
    }),
  vehicleSearch: (params: { makeId?: string; modelId?: string }) => {
    const search = new URLSearchParams(params as Record<string, string>);
    return fetchJson<unknown>(`/api/vehicle-search?${search.toString()}`);
  },
};
