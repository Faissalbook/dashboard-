"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TireVisual } from "@/components/shared/tire-visual";
import { EmptyState } from "@/components/shared/empty-state";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart ({lines.reduce((n, l) => n + l.quantity, 0)})</SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="px-4">
            <EmptyState icon={ShoppingBag} title="Your cart is empty" description="Browse our catalog to find your next set of tires." />
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4">
                {lines.map((line) => (
                  <div key={line.productId} className="flex gap-3">
                    <TireVisual url={line.image} label={line.name} className="size-20 shrink-0" />
                    <div className="flex flex-1 flex-col gap-1">
                      <Link href={`/tires/${line.slug}`} className="text-sm font-medium hover:underline">
                        {line.name}
                      </Link>
                      <p className="text-muted-foreground text-xs">Size: {line.size}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-md border">
                          <button
                            className="flex size-7 items-center justify-center"
                            onClick={() => updateQuantity(line.productId, line.quantity - 1)}
                            aria-label={`Decrease quantity of ${line.name}`}
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-6 text-center text-xs">{line.quantity}</span>
                          <button
                            className="flex size-7 items-center justify-center"
                            onClick={() => updateQuantity(line.productId, line.quantity + 1)}
                            aria-label={`Increase quantity of ${line.name}`}
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium">{formatCurrency(line.price * line.quantity)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(line.productId)}
                      aria-label={`Remove ${line.name} from cart`}
                      className="text-muted-foreground hover:text-destructive self-start"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-lg font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <Button asChild size="lg">
                <Link href="/cart">View Cart</Link>
              </Button>
              <Button asChild size="lg" variant="accent">
                <Link href="/checkout">Checkout</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
