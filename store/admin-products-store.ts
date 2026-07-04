"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";
import { products as seedProducts } from "@/lib/data/products";
import { slugify } from "@/lib/utils";

interface AdminProductsState {
  products: Product[];
  addProduct: (input: {
    name: string;
    brandId: string;
    categoryId: string;
    price: number;
    stock: number;
    width: number;
    aspectRatio: number;
    diameter: number;
  }) => void;
  updateStock: (id: string, stock: number) => void;
  removeProduct: (id: string) => void;
}

export const useAdminProductsStore = create<AdminProductsState>()(
  persist(
    (set) => ({
      products: seedProducts,
      addProduct: (input) =>
        set((state) => {
          const slug = slugify(`${input.name}-${input.width}-${input.aspectRatio}r${input.diameter}`);
          const newProduct: Product = {
            id: `product-${Date.now()}`,
            slug,
            name: input.name,
            brandId: input.brandId,
            categoryId: input.categoryId,
            spec: {
              width: input.width,
              aspectRatio: input.aspectRatio,
              diameter: input.diameter,
              loadIndex: 91,
              speedRating: "H",
              season: "all-season",
              runFlat: false,
              studdable: false,
            },
            price: input.price,
            currency: "USD",
            images: [{ id: `${slug}-img-0`, url: "gradient:from-zinc-800 to-neutral-950", alt: input.name }],
            rating: 0,
            reviewCount: 0,
            stock: input.stock,
            sku: slug.slice(0, 12).toUpperCase(),
            badges: ["new"],
            features: [],
            performance: {
              wetGrip: 3,
              dryGrip: 3,
              treadwear: 3,
              noise: 3,
              fuelEfficiency: 3,
              snowTraction: 3,
              comfort: 3,
            },
            warrantyMiles: 60000,
            mileageRatingMiles: 60000,
            description: "New product — description coming soon.",
            highlights: [],
            weightLbs: 22,
            createdAt: new Date().toISOString(),
          };
          return { products: [newProduct, ...state.products] };
        }),
      updateStock: (id, stock) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, stock } : p)),
        })),
      removeProduct: (id) => set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
    }),
    { name: "obsidian-tread-admin-products" },
  ),
);
