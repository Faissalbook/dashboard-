import type { Brand } from "@/types";

export const brands: Brand[] = [
  { id: "brand-aravon", name: "Aravon", slug: "aravon", country: "Germany", tagline: "Precision engineered for the autobahn", logoInitial: "A", featured: true },
  { id: "brand-kestrel", name: "Kestrel Performance", slug: "kestrel-performance", country: "United States", tagline: "Built for apex speed", logoInitial: "K", featured: true },
  { id: "brand-norrland", name: "Norrland Tire Co.", slug: "norrland-tire-co", country: "Sweden", tagline: "Mastery of winter roads", logoInitial: "N", featured: true },
  { id: "brand-talon", name: "Talon Grip", slug: "talon-grip", country: "United States", tagline: "Traction that holds its ground", logoInitial: "T", featured: true },
  { id: "brand-meridian", name: "Meridian Rubber Works", slug: "meridian-rubber-works", country: "Japan", tagline: "A century of compound science", logoInitial: "M", featured: true },
  { id: "brand-solace", name: "Solace All-Terrain", slug: "solace-all-terrain", country: "United States", tagline: "Ready for wherever the road ends", logoInitial: "S", featured: false },
  { id: "brand-vantage", name: "Vantage Motorsport", slug: "vantage-motorsport", country: "Italy", tagline: "Track-bred, street-legal", logoInitial: "V", featured: true },
  { id: "brand-glacier", name: "Glacier Tread", slug: "glacier-tread", country: "Canada", tagline: "Confidence below freezing", logoInitial: "G", featured: false },
  { id: "brand-ferrox", name: "Ferrox Industrial", slug: "ferrox-industrial", country: "South Korea", tagline: "Heavy-duty durability", logoInitial: "F", featured: false },
  { id: "brand-skylark", name: "Skylark Touring", slug: "skylark-touring", country: "United States", tagline: "Quiet comfort, mile after mile", logoInitial: "S", featured: false },
];

export function getBrandBySlug(slug: string) {
  return brands.find((b) => b.slug === slug);
}

export function getBrandById(id: string) {
  return brands.find((b) => b.id === id);
}
