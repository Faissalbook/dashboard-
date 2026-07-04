import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { brands } from "@/lib/data/brands";

export const metadata: Metadata = {
  title: "Our Brands",
  description: "Browse every tire brand carried by Obsidian Tread.",
};

export default function BrandsPage() {
  return (
    <div className="container-edge py-8">
      <Breadcrumbs items={[{ label: "Brands" }]} className="mb-6" />
      <SectionHeading eyebrow="Manufacturers" title="Shop by Brand" className="mb-10" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="hover:border-ember/50 group flex items-center gap-4 rounded-xl border bg-card p-5 transition-colors"
          >
            <span className="bg-secondary text-foreground flex size-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold">
              {brand.logoInitial}
            </span>
            <div className="flex-1">
              <p className="font-medium">{brand.name}</p>
              <p className="text-muted-foreground text-sm">{brand.tagline}</p>
              <p className="text-muted-foreground text-xs">{brand.country}</p>
            </div>
            <ArrowRight className="text-muted-foreground group-hover:text-ember size-4 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
