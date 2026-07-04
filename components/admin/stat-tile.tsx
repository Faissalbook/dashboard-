import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatTile({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change?: number;
  icon: LucideIcon;
}) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <Card>
      <CardContent className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="font-display text-2xl font-semibold">{value}</p>
          {typeof change === "number" && (
            <p className={cn("flex items-center gap-1 text-xs font-medium", isPositive ? "text-success" : "text-destructive")}>
              {isPositive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
              {Math.abs(change)}% vs last month
            </p>
          )}
        </div>
        <div className="bg-secondary flex size-10 items-center justify-center rounded-full">
          <Icon className="text-ember size-5" />
        </div>
      </CardContent>
    </Card>
  );
}
