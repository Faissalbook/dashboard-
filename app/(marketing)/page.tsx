import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import { FeaturedBrands } from "@/components/home/featured-brands";
import { FeaturedProducts } from "@/components/home/featured-products";
import { PromoBanners } from "@/components/home/promo-banners";
import { Testimonials } from "@/components/home/testimonials";
import { InstallationPartners } from "@/components/home/installation-partners";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { BlogPreview } from "@/components/home/blog-preview";
import { NewsletterBanner } from "@/components/home/newsletter-banner";

export const metadata: Metadata = {
  title: "Premium Tires, Precisely Matched",
  description:
    "Shop premium tires by size or vehicle, compare performance ratings, and book professional installation — all in one place.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoBanners />
      <FeaturedProducts />
      <FeaturedBrands />
      <WhyChooseUs />
      <InstallationPartners />
      <Testimonials />
      <BlogPreview />
      <NewsletterBanner />
    </>
  );
}
