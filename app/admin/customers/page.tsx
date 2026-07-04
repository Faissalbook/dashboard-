import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listUsers } from "@/lib/server/auth";
import { listOrders } from "@/lib/server/orders";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Admin · Customers" };

export default function AdminCustomersPage() {
  const users = listUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Customers</h1>
        <p className="text-muted-foreground text-sm">{users.length} registered customers</p>
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead className="text-right">Lifetime Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const orders = listOrders(user.id);
              const lifetimeValue = orders.reduce((sum, o) => sum + o.total, 0);
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-secondary text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>{orders.length}</TableCell>
                  <TableCell className="text-right">{formatCurrency(lifetimeValue)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
