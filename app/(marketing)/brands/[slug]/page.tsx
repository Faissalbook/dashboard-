import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductGrid } from "@/components/product/product-grid";
import { EmptyState } from "@/components/shared/empty-state";
import { brands, getBrandBySlug } from "@/lib/data/brands";
import { products } from "@/lib/data/products";
import { Package } from "lucide-react";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: "Brand Not Found" };
  return { title: brand.name, description: brand.tagline };
}

export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const brandProducts = products.filter((p) => p.brandId === brand.id);

  return (
    <div className="container-edge py-8">
      <Breadcrumbs items={[{ label: "Brands", href: "/brands" }, { label: brand.name }]} className="mb-6" />

      <div className="mb-10 flex items-center gap-4">
        <span className="bg-secondary flex size-16 shrink-0 items-center justify-center rounded-full font-display text-2xl font-semibold">
          {brand.logoInitial}
        </span>
        <div>
          <h1 className="font-display text-3xl font-semibold">{brand.name}</h1>
          <p className="text-muted-foreground">{brand.tagline}</p>
          <p className="text-muted-foreground text-sm">Made in {brand.country}</p>
        </div>
      </div>

      {brandProducts.length === 0 ? (
        <EmptyState icon={Package} title="No products yet" description="Check back soon for tires from this brand." />
      ) : (
        <ProductGrid products={brandProducts} />
      )}
    </div>
  );
}
