"use client";

import Link from "next/link";
import { Car, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { VehicleSearchWidget } from "@/components/search/vehicle-search-widget";
import { resolveVehicleSelection } from "@/lib/data/vehicles";
import { useGarageStore } from "@/store/garage-store";
import { toast } from "sonner";

export default function SavedVehiclesPage() {
  const vehicles = useGarageStore((s) => s.vehicles);
  const addVehicle = useGarageStore((s) => s.addVehicle);
  const removeVehicle = useGarageStore((s) => s.removeVehicle);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Saved Vehicles</h1>

      {vehicles.length === 0 ? (
        <EmptyState icon={Car} title="No saved vehicles" description="Add a vehicle below to get personalized tire recommendations." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id}>
              <CardContent className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {vehicle.nickname ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
                  </p>
                  <p className="text-muted-foreground font-mono text-xs">{vehicle.size}</p>
                  <Button variant="link" className="h-auto p-0 text-sm" asChild>
                    <Link href={`/tires?width=${vehicle.size.split("/")[0]}`}>Shop tires for this vehicle</Link>
                  </Button>
                </div>
                <button
                  onClick={() => {
                    removeVehicle(vehicle.id);
                    toast.success("Vehicle removed from garage");
                  }}
                  aria-label={`Remove ${vehicle.nickname ?? vehicle.model}`}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardContent>
          <h2 className="mb-4 font-medium">Add a vehicle</h2>
          <VehicleSearchWidget
            onResolve={(selection) => {
              const resolved = resolveVehicleSelection(selection.makeId, selection.modelId, selection.trimId);
              if (!resolved) return;
              addVehicle({
                year: Number(selection.year),
                make: resolved.make,
                model: resolved.model,
                trim: resolved.trim,
                size: resolved.oemSize,
              });
              toast.success(`Added ${selection.year} ${resolved.make} ${resolved.model} to your garage`);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
