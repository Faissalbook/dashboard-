import type { MetadataRoute } from "next";

import { products } from "@/lib/data/products";
import { brands } from "@/lib/data/brands";
import { blogPosts } from "@/lib/data/blog";

const SITE_URL = "https://obsidiantread.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/tires`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/shop-by-vehicle`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/brands`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/tires/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const brandRoutes: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${SITE_URL}/brands/${b.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...productRoutes, ...brandRoutes, ...blogRoutes];
}
