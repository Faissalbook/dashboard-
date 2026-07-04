"use client";

import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCompareStore } from "@/store/compare-store";

export function CompareCheckbox({ productId }: { productId: string }) {
  const has = useCompareStore((s) => s.has(productId));
  const isFull = useCompareStore((s) => s.isFull());
  const toggle = useCompareStore((s) => s.toggle);
  const id = `compare-${productId}`;

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
      <Checkbox
        id={id}
        checked={has}
        disabled={!has && isFull}
        onCheckedChange={() => {
          if (!has && isFull) {
            toast.error("You can compare up to 4 tires at a time");
            return;
          }
          toggle(productId);
        }}
      />
      <Label htmlFor={id} className="text-muted-foreground text-xs font-normal">
        Compare
      </Label>
    </div>
  );
}
