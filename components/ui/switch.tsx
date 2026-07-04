"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-ember data-[state=unchecked]:bg-input focus-visible:ring-ring/40 inline-flex h-5.5 w-10 shrink-0 items-center rounded-full transition-colors outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="bg-background pointer-events-none block size-4.5 translate-x-0.5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.15rem]"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
