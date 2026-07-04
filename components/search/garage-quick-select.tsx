"use client";

import Link from "next/link";
import { Car, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGarageStore } from "@/store/garage-store";

export function GarageQuickSelect() {
  const vehicles = useGarageStore((s) => s.vehicles);
  const removeVehicle = useGarageStore((s) => s.removeVehicle);

  if (vehicles.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground text-sm font-medium">Your garage:</span>
      {vehicles.map((v) => (
        <div key={v.id} className="border-border bg-secondary/50 flex items-center gap-1.5 rounded-full border py-1 pr-1 pl-3 text-sm">
          <Car className="text-ember size-3.5" />
          <Link href={`/tires?width=${v.size.split("/")[0]}`} className="hover:underline">
            {v.nickname ?? `${v.year} ${v.make} ${v.model}`}
          </Link>
          <button
            onClick={() => removeVehicle(v.id)}
            aria-label={`Remove ${v.nickname ?? v.model} from garage`}
            className="hover:bg-secondary flex size-5 items-center justify-center rounded-full"
          >
            <X className="size-3" />
          </button>
        </div>
      ))}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/account/vehicles">Manage garage</Link>
      </Button>
    </div>
  );
}
