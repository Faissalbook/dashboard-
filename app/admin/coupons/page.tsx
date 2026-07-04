"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { adminCouponSchema, type AdminCouponInput } from "@/lib/validations";
import { useAdminCouponsStore } from "@/store/admin-coupons-store";

function AddCouponDialog() {
  const [open, setOpen] = React.useState(false);
  const addCoupon = useAdminCouponsStore((s) => s.addCoupon);
  const form = useForm<AdminCouponInput>({
    resolver: zodResolver(adminCouponSchema),
    defaultValues: { code: "", description: "", type: "percentage", value: 10, minSubtotal: 0, expiresAt: "" },
  });

  const onSubmit = form.handleSubmit((values) => {
    addCoupon(values);
    toast.success(`Coupon ${values.code} created`);
    form.reset();
    setOpen(false);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" /> New Coupon
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a coupon</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="SUMMER25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage off</SelectItem>
                        <SelectItem value="fixed">Fixed amount off</SelectItem>
                        <SelectItem value="free-shipping">Free shipping</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="minSubtotal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum subtotal</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires</FormLabel>
                    <FormControl>
                      <input
                        type="date"
                        className="border-input h-10 w-full rounded-md border bg-transparent px-3 text-sm shadow-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Create Coupon</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminCouponsPage() {
  const coupons = useAdminCouponsStore((s) => s.coupons);
  const removeCoupon = useAdminCouponsStore((s) => s.removeCoupon);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Coupons</h1>
          <p className="text-muted-foreground text-sm">Manage promotional codes.</p>
        </div>
        <AddCouponDialog />
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Min. Subtotal</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.code}>
                <TableCell>
                  <Badge variant="outline" className="font-mono">
                    {coupon.code}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{coupon.description}</TableCell>
                <TableCell className="capitalize">{coupon.type.replace("-", " ")}</TableCell>
                <TableCell>${coupon.minSubtotal}</TableCell>
                <TableCell className="text-muted-foreground">{coupon.expiresAt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => removeCoupon(coupon.code)} aria-label={`Delete ${coupon.code}`}>
                    <Trash2 className="text-destructive size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
