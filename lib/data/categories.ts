import type { Category } from "@/types";

export const categories: Category[] = [
  { id: "cat-all-season", name: "All-Season", slug: "all-season", description: "Balanced performance in wet, dry, and light winter conditions.", icon: "CloudSun" },
  { id: "cat-performance", name: "Performance", slug: "performance", description: "Responsive handling and grip for spirited driving.", icon: "Gauge" },
  { id: "cat-winter", name: "Winter & Snow", slug: "winter-snow", description: "Engineered traction for ice, snow, and sub-zero temperatures.", icon: "Snowflake" },
  { id: "cat-all-terrain", name: "All-Terrain", slug: "all-terrain", description: "Off-road capability without sacrificing on-road manners.", icon: "Mountain" },
  { id: "cat-touring", name: "Touring & Comfort", slug: "touring-comfort", description: "Quiet, smooth, long-wearing rubber for daily driving.", icon: "Sofa" },
  { id: "cat-truck-suv", name: "Truck & SUV", slug: "truck-suv", description: "Reinforced construction for hauling and towing.", icon: "Truck" },
  { id: "cat-eco", name: "Eco / Fuel Efficient", slug: "eco-fuel-efficient", description: "Low rolling resistance compounds to save at the pump.", icon: "Leaf" },
  { id: "cat-track", name: "Track & Competition", slug: "track-competition", description: "Maximum grip compounds for closed-course use.", icon: "Flag" },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}
