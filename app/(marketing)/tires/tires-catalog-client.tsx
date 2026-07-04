"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FilterSidebar } from "@/components/search/filter-sidebar";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductGridSkeleton } from "@/components/shared/loading-skeletons";
import { Pagination } from "@/components/shared/pagination";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useProducts } from "@/hooks/use-products";
import { categories } from "@/lib/data/categories";
import type { ProductFilters, SortOption } from "@/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

function filtersFromSearchParams(params: URLSearchParams): ProductFilters {
  const categorySlug = params.get("category");
  const category = categorySlug ? categories.find((c) => c.slug === categorySlug) : undefined;

  return {
    width: params.get("width") ? [Number(params.get("width"))] : undefined,
    aspectRatio: params.get("aspectRatio") ? [Number(params.get("aspectRatio"))] : undefined,
    diameter: params.get("diameter") ? [Number(params.get("diameter"))] : undefined,
    categoryIds: category ? [category.id] : undefined,
    sort: (params.get("sort") as SortOption | null) ?? "relevance",
    page: params.get("page") ? Number(params.get("page")) : 1,
    pageSize: 12,
  };
}

export function TiresCatalogClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = React.useState<ProductFilters>(() => filtersFromSearchParams(searchParams));

  const { data, isLoading, isPlaceholderData } = useProducts(filters);

  function updateFilters(next: ProductFilters) {
    setFilters(next);
  }

  function handleReset() {
    setFilters({ sort: "relevance", page: 1, pageSize: 12 });
  }

  const activeSize =
    filters.width?.[0] && filters.aspectRatio?.[0] && filters.diameter?.[0]
      ? `${filters.width[0]}/${filters.aspectRatio[0]}R${filters.diameter[0]}`
      : null;

  return (
    <div className="container-edge py-8">
      <Breadcrumbs items={[{ label: "Shop Tires" }]} className="mb-4" />

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">
            {activeSize ? `Tires in size ${activeSize}` : "Shop All Tires"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {isLoading ? "Loading results…" : `${data?.total ?? 0} tires found`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="size-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-8">
                <FilterSidebar filters={filters} onChange={updateFilters} onReset={handleReset} />
              </div>
            </SheetContent>
          </Sheet>

          <Select
            value={filters.sort ?? "relevance"}
            onValueChange={(value) => updateFilters({ ...filters, sort: value as SortOption, page: 1 })}
          >
            <SelectTrigger className="w-[190px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterSidebar filters={filters} onChange={updateFilters} onReset={handleReset} />
          </div>
        </aside>

        <div className="space-y-8">
          {isLoading && !data ? (
            <ProductGridSkeleton />
          ) : (
            <div className={isPlaceholderData ? "opacity-60 transition-opacity" : "transition-opacity"}>
              <ProductGrid products={data?.items ?? []} />
            </div>
          )}

          {data && data.totalPages > 1 && (
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              onPageChange={(page) => {
                updateFilters({ ...filters, page });
                router.replace(`?page=${page}`, { scroll: false });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
