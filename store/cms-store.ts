"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CmsState {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  setContent: (content: Partial<Pick<CmsState, "heroEyebrow" | "heroHeadline" | "heroSubheadline">>) => void;
  reset: () => void;
}

const DEFAULTS = {
  heroEyebrow: "New Season Arrivals",
  heroHeadline: "Premium tires, *precisely* matched to your ride.",
  heroSubheadline:
    "Search by exact size or your vehicle, compare lab-tested performance ratings, and schedule professional installation — all without leaving the page.",
};

export const useCmsStore = create<CmsState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setContent: (content) => set(content),
      reset: () => set(DEFAULTS),
    }),
    { name: "obsidian-tread-cms" },
  ),
);

export function parseAccentText(text: string) {
  const parts = text.split(/\*(.+?)\*/g);
  return parts.map((part, i) => ({ text: part, accent: i % 2 === 1 }));
}
