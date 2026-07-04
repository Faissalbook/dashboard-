"use client";

import * as React from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBrandById } from "@/lib/data/brands";
import { useAdminProductsStore } from "@/store/admin-products-store";

type StockFilter = "all" | "low" | "out";

function stockStatus(stock: number) {
  if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const };
  if (stock < 20) return { label: "Low Stock", variant: "accent" as const };
  return { label: "In Stock", variant: "secondary" as const };
}

export default function InventoryPage() {
  const products = useAdminProductsStore((s) => s.products);
  const updateStock = useAdminProductsStore((s) => s.updateStock);
  const [filter, setFilter] = React.useState<StockFilter>("all");

  const filtered = products.filter((p) => {
    if (filter === "low") return p.stock > 0 && p.stock < 20;
    if (filter === "out") return p.stock === 0;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Inventory</h1>
          <p className="text-muted-foreground text-sm">Update stock levels in real time.</p>
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v as StockFilter)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All products</SelectItem>
            <SelectItem value="low">Low stock</SelectItem>
            <SelectItem value="out">Out of stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[140px]">Stock Qty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.slice(0, 60).map((product) => {
              const status = stockStatus(product.stock);
              return (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                  <TableCell className="max-w-[220px] truncate font-medium">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">{getBrandById(product.brandId)?.name}</TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      defaultValue={product.stock}
                      className="h-8 w-24"
                      onBlur={(e) => {
                        const value = Math.max(0, Number(e.target.value) || 0);
                        if (value !== product.stock) {
                          updateStock(product.id, value);
                          toast.success(`Updated stock for ${product.name}`);
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
