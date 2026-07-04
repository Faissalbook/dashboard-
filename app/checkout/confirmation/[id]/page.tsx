import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { findOrder } from "@/lib/server/orders";

export default async function CheckoutConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = findOrder(id);
  if (!order) notFound();

  return (
    <div className="container-edge max-w-2xl py-16 text-center">
      <div className="bg-success/10 mx-auto mb-6 flex size-16 items-center justify-center rounded-full">
        <CheckCircle2 className="text-success size-8" />
      </div>
      <h1 className="font-display text-3xl font-semibold">Order confirmed!</h1>
      <p className="text-muted-foreground mt-2">
        Thanks for your order. A confirmation has been sent for order <strong>{order.id}</strong>.
      </p>

      <Card className="mt-8 text-left">
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 font-medium">
            <Package className="text-ember size-4" /> Order Summary
          </div>
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <Separator />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping to</span>
            <span>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
            </span>
          </div>
          {order.installation && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Installation</span>
              <span>
                {order.installation.installerName} · {order.installation.date} at {order.installation.slot}
              </span>
            </div>
          )}
          <Separator />
          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total</span>
            <span className="font-display">{formatCurrency(order.total)}</span>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center gap-3">
        <Button variant="outline" asChild>
          <Link href="/account/orders">View My Orders</Link>
        </Button>
        <Button asChild>
          <Link href="/tires">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
