"use client";

import Link from "next/link";
import { Eye, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/shared/rating";
import { TireVisual } from "@/components/shared/tire-visual";
import { WishlistButton } from "@/components/product/wishlist-button";
import { CompareCheckbox } from "@/components/product/compare-checkbox";
import { getBrandById } from "@/lib/data/brands";
import { formatCurrency, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

const BADGE_LABEL: Record<string, string> = {
  new: "New",
  "best-seller": "Best Seller",
  "staff-pick": "Staff Pick",
  sale: "Sale",
  eco: "Eco",
};

export function ProductCard({
  product,
  onQuickView,
  className,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
}) {
  const brand = getBrandById(product.brandId);
  const addItem = useCartStore((s) => s.addItem);
  const sizeLabel = `${product.spec.width}/${product.spec.aspectRatio}R${product.spec.diameter}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.url ?? "",
      price: product.price,
      size: sizeLabel,
    });
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg",
        className,
      )}
    >
      <Link href={`/tires/${product.slug}`} className="relative block">
        <TireVisual url={product.images[0]?.url ?? ""} label={product.name} className="rounded-none" />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
          {product.badges.map((badge) => (
            <Badge key={badge} variant={badge === "sale" ? "accent" : "secondary"} className="capitalize">
              {BADGE_LABEL[badge]}
            </Badge>
          ))}
        </div>
        <WishlistButton
          productId={product.id}
          productName={product.name}
          className="absolute top-2 right-2"
        />
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="glass-light dark:glass absolute bottom-2 left-1/2 flex -translate-x-1/2 translate-y-2 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Eye className="size-3.5" /> Quick view
          </button>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {brand?.name}
        </p>
        <Link href={`/tires/${product.slug}`} className="hover:text-ember font-medium text-sm leading-snug">
          {product.name}
        </Link>
        <Rating value={product.rating} count={product.reviewCount} size="sm" />
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-semibold">{formatCurrency(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-muted-foreground text-xs line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>
          <CompareCheckbox productId={product.id} />
        </div>
        <Button size="sm" className="mt-1 w-full" onClick={handleAddToCart} disabled={product.stock === 0}>
          <ShoppingCart className="size-4" />
          {product.stock === 0 ? "Out of stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
