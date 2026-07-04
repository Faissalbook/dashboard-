"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";

export function WishlistButton({
  productId,
  productName,
  className,
  variant = "icon",
}: {
  productId: string;
  productName: string;
  className?: string;
  variant?: "icon" | "full";
}) {
  const has = useWishlistStore((s) => s.has(productId));
  const toggle = useWishlistStore((s) => s.toggle);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(productId);
    toast.success(has ? `Removed ${productName} from wishlist` : `Added ${productName} to wishlist`);
  };

  if (variant === "full") {
    return (
      <Button variant="outline" onClick={onClick} className={className} aria-pressed={has}>
        <Heart className={cn("size-4", has && "fill-ember text-ember")} />
        {has ? "Saved to wishlist" : "Add to wishlist"}
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={has}
      aria-label={has ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      className={cn(
        "glass-light dark:glass flex size-9 items-center justify-center rounded-full transition-colors hover:text-ember",
        className,
      )}
    >
      <Heart className={cn("size-4", has && "fill-ember text-ember")} />
    </button>
  );
}
