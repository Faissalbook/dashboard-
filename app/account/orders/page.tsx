import type { Metadata } from "next";
import Link from "next/link";
import { Package } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { OrderStatusBadge } from "@/components/account/order-status-badge";
import { demoOrders } from "@/lib/data/account";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "My Orders" };

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Orders</h1>

      {demoOrders.length === 0 ? (
        <EmptyState icon={Package} title="No orders yet" description="Your order history will show up here." />
      ) : (
        <div className="space-y-4">
          {demoOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{order.id}</p>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Placed {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    {" · "}
                    {order.items.reduce((n, i) => n + i.quantity, 0)} items
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-display font-semibold">{formatCurrency(order.total)}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/account/orders/${order.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
