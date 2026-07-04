"use client";

import { useQuery } from "@tanstack/react-query";
import type { ProductFilters } from "@/types";
import { api } from "@/lib/api-client";

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => api.searchProducts(filters),
    placeholderData: (prev) => prev,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => api.getProduct(slug),
    enabled: !!slug,
  });
}

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => api.getReviews(productId),
    enabled: !!productId,
  });
}
