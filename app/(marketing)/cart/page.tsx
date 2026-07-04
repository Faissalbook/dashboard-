"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { OrderSummary } from "@/components/cart/order-summary";
import { ProductGrid } from "@/components/product/product-grid";
import { getFeaturedProducts } from "@/lib/data/products";
import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const recommended = getFeaturedProducts(8).filter((p) => !lines.some((l) => l.productId === p.id)).slice(0, 4);

  return (
    <div className="container-edge py-8">
      <Breadcrumbs items={[{ label: "Cart" }]} className="mb-6" />
      <h1 className="font-display mb-8 text-3xl font-semibold">Your Cart</h1>

      {lines.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added any tires yet. Start by searching for your size or vehicle."
          action={
            <Button asChild>
              <Link href="/tires">Browse Tires</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-xl border px-5">
            {lines.map((line) => (
              <CartLineItem key={line.productId} line={line} />
            ))}
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      )}

      {recommended.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-2xl font-semibold">You might also need</h2>
          <ProductGrid products={recommended} />
        </section>
      )}
    </div>
  );
}
