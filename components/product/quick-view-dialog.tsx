"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/shared/rating";
import { TireVisual } from "@/components/shared/tire-visual";
import { getBrandById } from "@/lib/data/brands";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

export function QuickViewDialog({
  product,
  onOpenChange,
}: {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  if (!product) return null;
  const brand = getBrandById(product.brandId);
  const sizeLabel = `${product.spec.width}/${product.spec.aspectRatio}R${product.spec.diameter}`;

  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Quick view of {product.name}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 sm:grid-cols-2">
          <TireVisual url={product.images[0]?.url ?? ""} label={product.name} />
          <div className="flex flex-col gap-3">
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">{brand?.name}</p>
            <h3 className="font-display text-xl font-semibold">{product.name}</h3>
            <Rating value={product.rating} count={product.reviewCount} />
            <div className="flex flex-wrap gap-1.5">
              {product.badges.map((b) => (
                <Badge key={b} variant="secondary" className="capitalize">
                  {b.replace("-", " ")}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">{product.description}</p>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold">{formatCurrency(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>
              )}
              <span className="text-muted-foreground text-sm">/ tire</span>
            </div>
            <div className="mt-2 flex gap-2">
              <Button
                className="flex-1"
                onClick={() => {
                  addItem({
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    image: product.images[0]?.url ?? "",
                    price: product.price,
                    size: sizeLabel,
                  });
                  toast.success(`Added ${product.name} to cart`);
                  onOpenChange(false);
                }}
              >
                <ShoppingCart className="size-4" /> Add to Cart
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/tires/${product.slug}`}>View full details</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
