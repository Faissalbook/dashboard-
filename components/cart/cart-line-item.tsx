"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { TireVisual } from "@/components/shared/tire-visual";
import { formatCurrency } from "@/lib/utils";
import { useCartStore, type CartLine } from "@/store/cart-store";

export function CartLineItem({ line }: { line: CartLine }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 border-b py-5 last:border-b-0">
      <TireVisual url={line.image} label={line.name} className="size-24 shrink-0 sm:size-28" />
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/tires/${line.slug}`} className="font-medium hover:underline">
              {line.name}
            </Link>
            <p className="text-muted-foreground text-sm">Size: {line.size}</p>
          </div>
          <button
            onClick={() => removeItem(line.productId)}
            aria-label={`Remove ${line.name} from cart`}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center rounded-md border">
            <button
              className="flex size-8 items-center justify-center"
              onClick={() => updateQuantity(line.productId, line.quantity - 1)}
              aria-label={`Decrease quantity of ${line.name}`}
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium" aria-live="polite">
              {line.quantity}
            </span>
            <button
              className="flex size-8 items-center justify-center"
              onClick={() => updateQuantity(line.productId, line.quantity + 1)}
              aria-label={`Increase quantity of ${line.name}`}
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <div className="text-right">
            <p className="font-display font-semibold">{formatCurrency(line.price * line.quantity)}</p>
            <p className="text-muted-foreground text-xs">{formatCurrency(line.price)} each</p>
          </div>
        </div>
      </div>
    </div>
  );
}
