import { describe, expect, it } from "vitest";

import { getCompatibleTires, getFilterFacets, parseSizeString, queryProducts } from "@/lib/data/query";
import { products } from "@/lib/data/products";

describe("queryProducts", () => {
  it("returns a paginated result with sane defaults", () => {
    const result = queryProducts();
    expect(result.page).toBe(1);
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.length).toBeLessThanOrEqual(result.pageSize);
    expect(result.total).toBe(products.length);
  });

  it("filters by exact tire size", () => {
    const sample = products[0];
    const result = queryProducts({
      width: [sample.spec.width],
      aspectRatio: [sample.spec.aspectRatio],
      diameter: [sample.spec.diameter],
    });
    expect(result.items.every((p) => p.spec.width === sample.spec.width)).toBe(true);
    expect(result.items.some((p) => p.id === sample.id)).toBe(true);
  });

  it("filters by season", () => {
    const result = queryProducts({ season: ["winter"] });
    expect(result.items.every((p) => p.spec.season === "winter")).toBe(true);
  });

  it("sorts by price ascending", () => {
    const result = queryProducts({ sort: "price-asc", pageSize: products.length });
    const prices = result.items.map((p) => p.price);
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  it("sorts by price descending", () => {
    const result = queryProducts({ sort: "price-desc", pageSize: products.length });
    const prices = result.items.map((p) => p.price);
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  it("paginates results", () => {
    const pageSize = 5;
    const page1 = queryProducts({ page: 1, pageSize });
    const page2 = queryProducts({ page: 2, pageSize });
    expect(page1.items).toHaveLength(pageSize);
    expect(page1.items[0].id).not.toBe(page2.items[0]?.id);
  });
});

describe("getFilterFacets", () => {
  it("derives unique sorted facet values", () => {
    const facets = getFilterFacets();
    expect(facets.widths).toEqual([...facets.widths].sort((a, b) => a - b));
    expect(new Set(facets.widths).size).toBe(facets.widths.length);
    expect(facets.priceRange.min).toBeLessThanOrEqual(facets.priceRange.max);
  });
});

describe("parseSizeString", () => {
  it("parses a valid tire size string", () => {
    expect(parseSizeString("225/55R17")).toEqual({ width: 225, aspectRatio: 55, diameter: 17 });
  });

  it("returns null for an invalid size string", () => {
    expect(parseSizeString("not-a-size")).toBeNull();
  });
});

describe("getCompatibleTires", () => {
  it("matches tires by parsed OEM size", () => {
    const sample = products[0];
    const oemSize = `${sample.spec.width}/${sample.spec.aspectRatio}R${sample.spec.diameter}`;
    const result = getCompatibleTires(oemSize);
    expect(result.items.every((p) => p.spec.width === sample.spec.width && p.spec.diameter === sample.spec.diameter)).toBe(true);
  });

  it("falls back to unfiltered results for an unparseable size", () => {
    const result = getCompatibleTires("invalid-size");
    expect(result.total).toBe(products.length);
  });
});
