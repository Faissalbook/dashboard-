import { FileText } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/shared/empty-state";
import { OrderStatusBadge } from "@/components/account/order-status-badge";
import { DownloadInvoiceButton } from "@/components/account/download-invoice-button";
import { demoOrders } from "@/lib/data/account";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Invoices" };

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Invoices</h1>

      {demoOrders.length === 0 ? (
        <EmptyState icon={FileText} title="No invoices yet" description="Invoices are generated automatically for every order." />
      ) : (
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">INV-{order.id.replace("ORD-", "")}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
                  <TableCell className="text-right">
                    <DownloadInvoiceButton invoiceId={`INV-${order.id.replace("ORD-", "")}`} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
