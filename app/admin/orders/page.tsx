import { OrdersTable } from "@/components/admin/orders-table";
import { listOrders } from "@/lib/server/orders";

export const metadata = { title: "Admin · Orders" };

export default function AdminOrdersPage() {
  const orders = listOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Orders</h1>
        <p className="text-muted-foreground text-sm">{orders.length} total orders</p>
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}
