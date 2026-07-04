"use client";

import * as React from "react";
import { PackageSearch } from "lucide-react";

import { ProductCard } from "@/components/product/product-card";
import { QuickViewDialog } from "@/components/product/quick-view-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import type { Product } from "@/types";

export function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No tires match your filters"
        description="Try widening your size range or clearing a filter to see more results."
      />
    );
  }

  return (
    <>
      <div className={className ?? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
        ))}
      </div>
      <QuickViewDialog product={quickViewProduct} onOpenChange={(open) => !open && setQuickViewProduct(null)} />
    </>
  );
}
