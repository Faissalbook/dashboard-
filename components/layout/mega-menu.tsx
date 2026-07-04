import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { categories } from "@/lib/data/categories";
import { brands } from "@/lib/data/brands";

export function MegaMenu() {
  return (
    <div className="grid w-[640px] grid-cols-5 gap-6 p-6">
      <div className="col-span-3 space-y-3">
        <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Shop by Category</p>
        <ul className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/tires?category=${category.slug}`}
                className="hover:bg-secondary hover:text-ember block rounded-md px-2 py-1.5 text-sm transition-colors"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/tires" className="text-ember inline-flex items-center gap-1 text-sm font-medium">
          Browse all tires <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <div className="col-span-2 space-y-3 border-l pl-6">
        <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Top Brands</p>
        <ul className="space-y-2">
          {brands.filter((b) => b.featured).slice(0, 5).map((brand) => (
            <li key={brand.id}>
              <Link
                href={`/brands/${brand.slug}`}
                className="hover:text-ember flex items-center gap-2 text-sm transition-colors"
              >
                <span className="bg-secondary flex size-6 items-center justify-center rounded-full text-xs font-semibold">
                  {brand.logoInitial}
                </span>
                {brand.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
