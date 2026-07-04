"use client";

import { BookmarkPlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useGarageStore } from "@/store/garage-store";

export function SaveVehicleButton({
  year,
  make,
  model,
  trim,
  size,
}: {
  year: number;
  make: string;
  model: string;
  trim: string;
  size: string;
}) {
  const addVehicle = useGarageStore((s) => s.addVehicle);
  const vehicles = useGarageStore((s) => s.vehicles);
  const alreadySaved = vehicles.some((v) => v.year === year && v.make === make && v.model === model && v.trim === trim);

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={alreadySaved}
      onClick={() => {
        addVehicle({ year, make, model, trim, size });
        toast.success(`Saved ${year} ${make} ${model} to your garage`);
      }}
    >
      <BookmarkPlus className="size-4" />
      {alreadySaved ? "Saved to garage" : "Save this vehicle"}
    </Button>
  );
}
