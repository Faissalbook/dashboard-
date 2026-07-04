import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/types";

const STATUS_CONFIG: Record<OrderStatus, { label: string; variant: "secondary" | "accent" | "success" | "destructive" }> = {
  processing: { label: "Processing", variant: "secondary" },
  confirmed: { label: "Confirmed", variant: "accent" },
  shipped: { label: "Shipped", variant: "accent" },
  "out-for-delivery": { label: "Out for Delivery", variant: "accent" },
  delivered: { label: "Delivered", variant: "success" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
