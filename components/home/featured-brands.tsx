import { SectionHeading } from "@/components/shared/section-heading";
import { BrandCarousel } from "@/components/shared/brand-carousel";
import { brands } from "@/lib/data/brands";

export function FeaturedBrands() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-edge space-y-8">
        <SectionHeading eyebrow="Trusted Manufacturers" title="Featured Brands" align="center" className="mx-auto" />
        <BrandCarousel brands={brands} />
      </div>
    </section>
  );
}
