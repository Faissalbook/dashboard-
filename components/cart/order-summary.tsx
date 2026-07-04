"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Tag, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { couponSchema, type CouponInput } from "@/lib/validations";
import { formatCurrency } from "@/lib/utils";
import { useCartTotals } from "@/hooks/use-cart-totals";
import { useCartStore } from "@/store/cart-store";

export function OrderSummary({ showCheckoutButton = true }: { showCheckoutButton?: boolean }) {
  const lines = useCartStore((s) => s.lines);
  const coupon = useCartStore((s) => s.coupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const [zip, setZip] = React.useState("");

  const couponForm = useForm<CouponInput>({ resolver: zodResolver(couponSchema), defaultValues: { code: "" } });

  const totalsQuery = useCartTotals({
    lines: lines.map((l) => ({ productId: l.productId, quantity: l.quantity })),
    couponCode: coupon?.code,
    zip: zip || undefined,
  });

  const totals = totalsQuery.data;

  const onApplyCoupon = couponForm.handleSubmit(async (values) => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lines: lines.map((l) => ({ productId: l.productId, quantity: l.quantity })),
        couponCode: values.code,
      }),
    });
    const data = await res.json();
    if (data.coupon) {
      applyCoupon(data.coupon);
      toast.success(`Coupon "${data.coupon.code}" applied`);
    } else {
      toast.error("That coupon code isn't valid for this order");
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <form onSubmit={onApplyCoupon} className="flex gap-2">
          <Input placeholder="Coupon code" {...couponForm.register("code")} />
          <Button type="submit" variant="outline" disabled={couponForm.formState.isSubmitting}>
            <Tag className="size-4" /> Apply
          </Button>
        </form>

        <div className="flex gap-2">
          <Input
            placeholder="ZIP code for shipping estimate"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            maxLength={5}
          />
          <Button type="button" variant="outline" onClick={() => totalsQuery.refetch()}>
            <Truck className="size-4" /> Estimate
          </Button>
        </div>

        <Separator />

        {totalsQuery.isLoading && !totals ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="text-muted-foreground size-5 animate-spin" />
          </div>
        ) : (
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatCurrency(totals?.subtotal ?? 0)}</dd>
            </div>
            {!!totals?.discount && (
              <div className="text-success flex justify-between">
                <dt>Discount {coupon ? `(${coupon.code})` : ""}</dt>
                <dd>-{formatCurrency(totals.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{totals?.shipping === 0 ? "Free" : formatCurrency(totals?.shipping ?? 0)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Estimated Tax {totals ? `(${(totals.taxRate * 100).toFixed(2)}%)` : ""}
              </dt>
              <dd>{formatCurrency(totals?.tax ?? 0)}</dd>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-semibold">
              <dt>Total</dt>
              <dd className="font-display">{formatCurrency(totals?.total ?? 0)}</dd>
            </div>
          </dl>
        )}

        {showCheckoutButton && (
          <Button size="lg" className="w-full" disabled={lines.length === 0} asChild>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
