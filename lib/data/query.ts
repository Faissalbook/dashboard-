import type { PaginatedResult, Product, ProductFilters } from "@/types";
import { products } from "./products";

const DEFAULT_PAGE_SIZE = 12;

export function queryProducts(filters: ProductFilters = {}): PaginatedResult<Product> {
  let result = [...products];

  if (filters.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    );
  }

  if (filters.width?.length) {
    result = result.filter((p) => filters.width!.includes(p.spec.width));
  }
  if (filters.aspectRatio?.length) {
    result = result.filter((p) => filters.aspectRatio!.includes(p.spec.aspectRatio));
  }
  if (filters.diameter?.length) {
    result = result.filter((p) => filters.diameter!.includes(p.spec.diameter));
  }
  if (filters.season?.length) {
    result = result.filter((p) => filters.season!.includes(p.spec.season));
  }
  if (filters.brandIds?.length) {
    result = result.filter((p) => filters.brandIds!.includes(p.brandId));
  }
  if (filters.categoryIds?.length) {
    result = result.filter((p) => filters.categoryIds!.includes(p.categoryId));
  }
  if (typeof filters.minPrice === "number") {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (typeof filters.maxPrice === "number") {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (typeof filters.minRating === "number") {
    result = result.filter((p) => p.rating >= filters.minRating!);
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default:
      result.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
  }

  const page = Math.max(1, filters.page ?? 1);
  const pageSize = filters.pageSize ?? DEFAULT_PAGE_SIZE;
  const total = result.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const items = result.slice(start, start + pageSize);

  return { items, total, page, pageSize, totalPages };
}

export function getFilterFacets() {
  const widths = Array.from(new Set(products.map((p) => p.spec.width))).sort((a, b) => a - b);
  const aspectRatios = Array.from(new Set(products.map((p) => p.spec.aspectRatio))).sort((a, b) => a - b);
  const diameters = Array.from(new Set(products.map((p) => p.spec.diameter))).sort((a, b) => a - b);
  const priceRange = {
    min: Math.floor(Math.min(...products.map((p) => p.price))),
    max: Math.ceil(Math.max(...products.map((p) => p.price))),
  };
  return { widths, aspectRatios, diameters, priceRange };
}

export function parseSizeString(size: string) {
  const match = size.match(/^(\d{3})\/(\d{2})R?(\d{2})$/i);
  if (!match) return null;
  return { width: Number(match[1]), aspectRatio: Number(match[2]), diameter: Number(match[3]) };
}

export function getCompatibleTires(oemSize: string, filters: ProductFilters = {}) {
  const parsed = parseSizeString(oemSize);
  if (!parsed) return queryProducts(filters);
  return queryProducts({
    ...filters,
    width: [parsed.width],
    diameter: [parsed.diameter],
  });
}
