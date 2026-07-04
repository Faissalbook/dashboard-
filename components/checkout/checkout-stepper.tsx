import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CheckoutStep {
  key: string;
  label: string;
}

export function CheckoutStepper({
  steps,
  currentIndex,
}: {
  steps: CheckoutStep[];
  currentIndex: number;
}) {
  return (
    <ol className="flex w-full items-center" aria-label="Checkout progress">
      {steps.map((step, i) => {
        const isComplete = i < currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <li key={step.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                  isComplete && "border-ember bg-ember text-ember-foreground",
                  isCurrent && !isComplete && "border-ember text-ember",
                  !isComplete && !isCurrent && "border-border text-muted-foreground",
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isComplete ? <Check className="size-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  isCurrent ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("mx-2 h-0.5 flex-1 transition-colors", isComplete ? "bg-ember" : "bg-border")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
