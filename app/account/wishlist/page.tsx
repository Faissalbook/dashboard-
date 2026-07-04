"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { ProductGrid } from "@/components/product/product-grid";
import { products } from "@/lib/data/products";
import { useWishlistStore } from "@/store/wishlist-store";

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const items = products.filter((p) => productIds.includes(p.id));

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Wishlist</h1>

      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Tap the heart icon on any tire to save it here for later."
          action={
            <Button asChild>
              <Link href="/tires">Browse Tires</Link>
            </Button>
          }
        />
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
