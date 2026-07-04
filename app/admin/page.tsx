import Link from "next/link";
import { AlertTriangle, DollarSign, Package, ShoppingCart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatTile } from "@/components/admin/stat-tile";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { OrderStatusBadge } from "@/components/account/order-status-badge";
import { getAdminStats, getRevenueTrend, getTopProducts } from "@/lib/data/analytics";
import { demoOrders } from "@/lib/data/account";
import { getBrandById } from "@/lib/data/brands";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Admin · Analytics" };

export default function AdminOverviewPage() {
  const stats = getAdminStats();
  const trend = getRevenueTrend();
  const topProducts = getTopProducts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Analytics Overview</h1>
        <p className="text-muted-foreground text-sm">A snapshot of store performance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Total Revenue" value={formatCurrency(stats.totalRevenue)} change={12.4} icon={DollarSign} />
        <StatTile label="Orders" value={String(stats.totalOrders)} change={8.1} icon={ShoppingCart} />
        <StatTile label="Avg. Order Value" value={formatCurrency(stats.avgOrderValue)} change={-2.3} icon={Package} />
        <StatTile label="Low Stock Items" value={String(stats.lowStockProducts.length)} icon={AlertTriangle} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart data={trend} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Link href={`/admin/orders`} className="font-medium hover:underline">
                        {order.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="max-w-[180px] truncate font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground">{getBrandById(product.brandId)?.name}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">{product.rating.toFixed(1)} ★</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
