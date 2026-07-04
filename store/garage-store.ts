"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SavedVehicle } from "@/types";
import { demoSavedVehicles } from "@/lib/data/account";

interface GarageState {
  vehicles: SavedVehicle[];
  activeVehicleId: string | null;
  addVehicle: (vehicle: Omit<SavedVehicle, "id">) => void;
  removeVehicle: (id: string) => void;
  setActiveVehicle: (id: string | null) => void;
}

export const useGarageStore = create<GarageState>()(
  persist(
    (set) => ({
      vehicles: demoSavedVehicles,
      activeVehicleId: demoSavedVehicles[0]?.id ?? null,
      addVehicle: (vehicle) =>
        set((state) => ({
          vehicles: [...state.vehicles, { ...vehicle, id: `saved-${Date.now()}` }],
        })),
      removeVehicle: (id) =>
        set((state) => ({
          vehicles: state.vehicles.filter((v) => v.id !== id),
          activeVehicleId: state.activeVehicleId === id ? null : state.activeVehicleId,
        })),
      setActiveVehicle: (id) => set({ activeVehicleId: id }),
    }),
    { name: "obsidian-tread-garage" },
  ),
);
