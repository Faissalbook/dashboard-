import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderStatusBadge } from "@/components/account/order-status-badge";
import { findOrder } from "@/lib/server/orders";
import { formatCurrency } from "@/lib/utils";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = findOrder(id);
  if (!order) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/admin/orders">
          <ArrowLeft className="size-4" /> Back to orders
        </Link>
      </Button>

      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">{order.id}</h1>
        <OrderStatusBadge status={order.status} />
      </div>

      <Card>
        <CardContent className="space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between text-sm">
              <span>
                {item.name} × {item.quantity} ({item.size})
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>{formatCurrency(order.shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span>{formatCurrency(order.tax)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="font-display">{formatCurrency(order.total)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-1">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Shipping To</p>
          <p className="text-sm">{order.shippingAddress.fullName}</p>
          <p className="text-muted-foreground text-sm">
            {order.shippingAddress.line1}, {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.zip}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
