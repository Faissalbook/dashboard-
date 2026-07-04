import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Truck, Wrench } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/account/order-status-badge";
import { TireVisual } from "@/components/shared/tire-visual";
import { getOrderById } from "@/lib/data/account";
import { formatCurrency } from "@/lib/utils";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrderById(id);
  if (!order) notFound();

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Orders", href: "/account/orders" }, { label: order.id }]} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">{order.id}</h1>
          <p className="text-muted-foreground text-sm">
            Placed {new Date(order.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <Card>
        <CardContent className="space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-4">
              <TireVisual url={item.image} label={item.name} className="size-16 shrink-0" />
              <div className="flex-1">
                <Link href={`/tires/${item.slug}`} className="font-medium hover:underline">
                  {item.name}
                </Link>
                <p className="text-muted-foreground text-sm">
                  Qty {item.quantity} · {item.size}
                </p>
              </div>
              <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
            </div>
          ))}
          <Separator />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatCurrency(order.subtotal)}</dd>
            </div>
            {order.discount > 0 && (
              <div className="text-success flex justify-between">
                <dt>Discount</dt>
                <dd>-{formatCurrency(order.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{order.shipping === 0 ? "Free" : formatCurrency(order.shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd>{formatCurrency(order.tax)}</dd>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-semibold">
              <dt>Total</dt>
              <dd className="font-display">{formatCurrency(order.total)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <MapPin className="text-ember size-4" /> Shipping Address
            </div>
            <p className="text-muted-foreground text-sm">{order.shippingAddress.fullName}</p>
            <p className="text-muted-foreground text-sm">
              {order.shippingAddress.line1}
              {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
            </p>
            <p className="text-muted-foreground text-sm">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
            </p>
            {order.trackingNumber && (
              <p className="flex items-center gap-1.5 pt-2 text-sm">
                <Truck className="size-4" /> Tracking: {order.trackingNumber}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <Wrench className="text-ember size-4" /> Installation
            </div>
            {order.installation ? (
              <>
                <p className="text-muted-foreground text-sm">{order.installation.installerName}</p>
                <p className="text-muted-foreground text-sm">
                  {order.installation.date} at {order.installation.slot}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">No installation booked for this order.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href={`/account/invoices`}>View Invoice</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/tires">Buy Again</Link>
        </Button>
      </div>
    </div>
  );
}
