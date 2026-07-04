import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = "md",
  className,
}: {
  value: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const starSize = size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";

  return (
    <div className={cn("flex items-center gap-1.5", className)} role="img" aria-label={`Rated ${value} out of 5 stars`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(value);
          return (
            <Star
              key={i}
              className={cn(starSize, filled ? "fill-ember text-ember" : "fill-transparent text-muted-foreground/40")}
              aria-hidden
            />
          );
        })}
      </div>
      {typeof count === "number" && (
        <span className="text-muted-foreground text-xs">
          {value.toFixed(1)} ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
