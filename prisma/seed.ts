import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { brands } from "../lib/data/brands";
import { categories } from "../lib/data/categories";
import { products } from "../lib/data/products";
import { installers } from "../lib/data/installers";
import { coupons } from "../lib/data/coupons";
import { blogPosts } from "../lib/data/blog";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function toEnumSeason(season: string) {
  return season.toUpperCase().replace(/-/g, "_") as
    | "ALL_SEASON"
    | "SUMMER"
    | "WINTER"
    | "ALL_TERRAIN"
    | "PERFORMANCE";
}

function toEnumBadge(badge: string) {
  return badge.toUpperCase().replace(/-/g, "_") as
    | "NEW"
    | "BEST_SELLER"
    | "STAFF_PICK"
    | "SALE"
    | "ECO";
}

function toEnumCouponType(type: string) {
  return type.toUpperCase().replace(/-/g, "_") as "PERCENTAGE" | "FIXED" | "FREE_SHIPPING";
}

async function main() {
  console.log("Seeding brands...");
  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: {
        name: brand.name,
        slug: brand.slug,
        country: brand.country,
        tagline: brand.tagline,
        logoInitial: brand.logoInitial,
        featured: brand.featured,
      },
    });
  }

  console.log("Seeding categories...");
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
      },
    });
  }

  console.log(`Seeding ${products.length} products...`);
  for (const product of products) {
    const brand = brands.find((b) => b.id === product.brandId);
    const category = categories.find((c) => c.id === product.categoryId);
    if (!brand || !category) continue;

    const dbBrand = await prisma.brand.findUniqueOrThrow({ where: { slug: brand.slug } });
    const dbCategory = await prisma.category.findUniqueOrThrow({ where: { slug: category.slug } });

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        slug: product.slug,
        name: product.name,
        sku: product.sku,
        description: product.description,
        highlights: product.highlights,
        features: product.features,
        badges: product.badges.map(toEnumBadge),
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        currency: product.currency,
        stock: product.stock,
        rating: product.rating,
        reviewCount: product.reviewCount,
        warrantyMiles: product.warrantyMiles,
        mileageRatingMiles: product.mileageRatingMiles,
        weightLbs: product.weightLbs,
        brandId: dbBrand.id,
        categoryId: dbCategory.id,
        spec: {
          create: {
            width: product.spec.width,
            aspectRatio: product.spec.aspectRatio,
            diameter: product.spec.diameter,
            loadIndex: product.spec.loadIndex,
            speedRating: product.spec.speedRating,
            season: toEnumSeason(product.spec.season),
            runFlat: product.spec.runFlat,
            studdable: product.spec.studdable,
          },
        },
        performance: { create: product.performance },
        images: {
          create: product.images.map((image, i) => ({ url: image.url, alt: image.alt, position: i })),
        },
      },
    });
  }

  console.log("Seeding installers...");
  for (const installer of installers) {
    await prisma.installer.upsert({
      where: { id: installer.id },
      update: {},
      create: {
        id: installer.id,
        name: installer.name,
        addressLine: installer.addressLine,
        city: installer.city,
        state: installer.state,
        zip: installer.zip,
        rating: installer.rating,
        reviewCount: installer.reviewCount,
        services: installer.services,
        nextAvailable: installer.nextAvailable,
      },
    });
  }

  console.log("Seeding coupons...");
  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: {},
      create: {
        code: coupon.code,
        description: coupon.description,
        type: toEnumCouponType(coupon.type),
        value: coupon.value,
        minSubtotal: coupon.minSubtotal,
        expiresAt: new Date(coupon.expiresAt),
      },
    });
  }

  console.log("Seeding blog posts...");
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        readMinutes: post.readMinutes,
        coverGradient: post.coverGradient,
        publishedAt: new Date(post.publishedAt),
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
