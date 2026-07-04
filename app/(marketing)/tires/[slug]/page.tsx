import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, PackageCheck, RotateCcw, Truck } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Rating } from "@/components/shared/rating";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGallery } from "@/components/product/product-gallery";
import { PerformanceRatingsCard } from "@/components/product/performance-ratings";
import { StickyPurchasePanel } from "@/components/product/sticky-purchase-panel";
import { ReviewCard } from "@/components/product/review-card";
import { ProductGrid } from "@/components/product/product-grid";
import { getBrandById } from "@/lib/data/brands";
import { getCategoryById } from "@/lib/data/categories";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/data/products";
import { getReviewsForProduct } from "@/lib/data/reviews";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Tire Not Found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const brand = getBrandById(product.brandId);
  const category = getCategoryById(product.categoryId);
  const reviews = getReviewsForProduct(product.id);
  const related = getRelatedProducts(product);
  const sizeLabel = `${product.spec.width}/${product.spec.aspectRatio}R${product.spec.diameter}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    brand: { "@type": "Brand", name: brand?.name },
    aggregateRating:
      product.reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="container-edge py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs
        items={[
          { label: "Shop Tires", href: "/tires" },
          { label: category?.name ?? "Tires", href: `/tires?category=${category?.slug}` },
          { label: product.name },
        ]}
        className="mb-6"
      />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <ProductGallery images={product.images} name={product.name} />
            <div className="space-y-3">
              <p className="text-ember text-xs font-semibold tracking-wide uppercase">{brand?.name}</p>
              <h1 className="font-display text-2xl font-semibold text-balance sm:text-3xl">{product.name}</h1>
              <Rating value={product.rating} count={product.reviewCount} />
              <div className="flex flex-wrap gap-1.5">
                {product.badges.map((b) => (
                  <Badge key={b} variant="secondary" className="capitalize">
                    {b.replace("-", " ")}
                  </Badge>
                ))}
                <Badge variant="outline">{sizeLabel}</Badge>
                <Badge variant="outline" className="capitalize">
                  {product.spec.season.replace("-", " ")}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
              <ul className="space-y-1.5 pt-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="text-success mt-0.5 size-4 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Tabs defaultValue="specs">
            <TabsList>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="pt-6">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {[
                  ["Width", `${product.spec.width} mm`],
                  ["Aspect Ratio", `${product.spec.aspectRatio}%`],
                  ["Diameter", `${product.spec.diameter}"`],
                  ["Load Index", product.spec.loadIndex],
                  ["Speed Rating", product.spec.speedRating],
                  ["Season", product.spec.season.replace("-", " ")],
                  ["Run-Flat", product.spec.runFlat ? "Yes" : "No"],
                  ["Studdable", product.spec.studdable ? "Yes" : "No"],
                  ["Weight", `${product.weightLbs} lbs`],
                  ["Warranty", `${product.warrantyMiles.toLocaleString()} mi`],
                  ["SKU", product.sku],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <dt className="text-muted-foreground text-xs uppercase">{label}</dt>
                    <dd className="font-mono text-sm font-medium capitalize">{value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>

            <TabsContent value="performance" className="pt-6">
              <PerformanceRatingsCard ratings={product.performance} />
            </TabsContent>

            <TabsContent value="features" className="pt-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="text-success mt-0.5 size-4 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              {reviews.length === 0 ? (
                <p className="text-muted-foreground text-sm">No reviews yet for this tire.</p>
              ) : (
                <div>
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-2 text-sm">
              <Truck className="text-ember mt-0.5 size-4 shrink-0" />
              <span>Free shipping on orders over $150. Ships in 1–2 business days.</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <RotateCcw className="text-ember mt-0.5 size-4 shrink-0" />
              <span>30-day hassle-free returns on unused tires.</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <PackageCheck className="text-ember mt-0.5 size-4 shrink-0" />
              <span>Professional installation available at checkout.</span>
            </div>
          </div>
        </div>

        <div>
          <StickyPurchasePanel product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-2xl font-semibold">You may also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
