import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/data/products";

export function FeaturedProducts() {
  const products = getFeaturedProducts(8);

  return (
    <section className="container-edge py-16 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Editor's Picks" title="Featured Tires" />
        <Button variant="outline" asChild>
          <Link href="/tires">
            Shop all tires <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
