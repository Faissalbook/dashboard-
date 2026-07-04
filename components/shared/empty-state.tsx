import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center", className)}>
      <div className="bg-secondary flex size-12 items-center justify-center rounded-full">
        <Icon className="text-muted-foreground size-6" aria-hidden />
      </div>
      <div className="space-y-1">
        <p className="font-display font-semibold">{title}</p>
        {description && <p className="text-muted-foreground max-w-sm text-sm">{description}</p>}
      </div>
      {action}
    </div>
  );
}
