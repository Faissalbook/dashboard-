"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WishlistButton } from "@/components/product/wishlist-button";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

export function StickyPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = React.useState(4);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const sizeLabel = `${product.spec.width}/${product.spec.aspectRatio}R${product.spec.diameter}`;
  const inStock = product.stock > 0;

  const handleAdd = () => {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0]?.url ?? "",
        price: product.price,
        size: sizeLabel,
      },
      quantity,
    );
    toast.success(`Added ${quantity} × ${product.name} to cart`);
  };

  return (
    <Card className="sticky top-24">
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-semibold">{formatCurrency(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>
          )}
          <span className="text-muted-foreground text-sm">/ tire</span>
        </div>

        <p className={inStock ? "text-success text-sm font-medium" : "text-destructive text-sm font-medium"}>
          {inStock ? `In stock — ${product.stock} available` : "Out of stock"}
        </p>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Quantity</span>
          <div className="flex items-center rounded-md border">
            <button
              type="button"
              className="flex size-9 items-center justify-center disabled:opacity-40"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              className="flex size-9 items-center justify-center disabled:opacity-40"
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              disabled={quantity >= product.stock}
              aria-label="Increase quantity"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" size="lg" onClick={handleAdd} disabled={!inStock}>
            <ShoppingCart className="size-4" /> Add to Cart
          </Button>
          <WishlistButton productId={product.id} productName={product.name} variant="full" className="shrink-0 px-3" />
        </div>
        <Button
          variant="accent"
          size="lg"
          className="w-full"
          disabled={!inStock}
          onClick={() => {
            handleAdd();
            router.push("/checkout");
          }}
        >
          Buy It Now
        </Button>

        <div className="space-y-2 border-t pt-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Truck className="size-4 shrink-0" />
            Free shipping on orders over $150 · Ships in 1–2 business days
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="size-4 shrink-0" />
            {product.warrantyMiles.toLocaleString()}-mile treadwear warranty
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
