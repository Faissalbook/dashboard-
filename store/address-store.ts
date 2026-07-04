"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address } from "@/types";
import { demoAddresses } from "@/lib/data/account";

interface AddressState {
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  setDefault: (id: string) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: demoAddresses,
      addAddress: (address) =>
        set((state) => ({
          addresses: [...state.addresses, { ...address, id: `address-${Date.now()}` }],
        })),
      updateAddress: (id, address) =>
        set((state) => ({
          addresses: state.addresses.map((a) => (a.id === id ? { ...address, id } : a)),
        })),
      removeAddress: (id) => set((state) => ({ addresses: state.addresses.filter((a) => a.id !== id) })),
      setDefault: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
        })),
    }),
    { name: "obsidian-tread-addresses" },
  ),
);
