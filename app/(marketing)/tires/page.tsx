import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductGridSkeleton } from "@/components/shared/loading-skeletons";
import { TiresCatalogClient } from "./tires-catalog-client";

export const metadata: Metadata = {
  title: "Shop All Tires",
  description: "Browse our full tire catalog. Filter by width, aspect ratio, diameter, season, and brand.",
};

export default function TiresPage() {
  return (
    <Suspense fallback={<div className="container-edge py-8"><ProductGridSkeleton count={12} /></div>}>
      <TiresCatalogClient />
    </Suspense>
  );
}
