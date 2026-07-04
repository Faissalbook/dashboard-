import type { Product, ProductImage, Season } from "@/types";
import { brands } from "./brands";
import { categories } from "./categories";
import { seededRandom } from "./prng";

interface LineTemplate {
  brandSlug: string;
  categorySlug: string;
  lineName: string;
  season: Season;
  runFlatCapable?: boolean;
  studdable?: boolean;
  features: string[];
  highlights: string[];
  description: string;
  sizes: { width: number; aspectRatio: number; diameter: number; loadIndex: number; speedRating: string }[];
}

const GRADIENT_PALETTE = ["from-zinc-800 to-zinc-950", "from-neutral-800 to-black", "from-stone-800 to-neutral-950"];

const lineTemplates: LineTemplate[] = [
  {
    brandSlug: "aravon",
    categorySlug: "performance",
    lineName: "Aravon Velocis GT",
    season: "performance",
    features: ["Asymmetric tread pattern", "Autobahn-rated stability up to 186 mph", "Silica-enhanced compound"],
    highlights: ["Engineered with German motorsport heritage", "Reinforced sidewall for high-speed cornering"],
    description:
      "The Velocis GT is Aravon's flagship ultra-high-performance tire, tuned on closed circuits for drivers who demand precise steering response and confident grip at triple-digit speeds.",
    sizes: [
      { width: 225, aspectRatio: 40, diameter: 18, loadIndex: 92, speedRating: "Y" },
      { width: 235, aspectRatio: 35, diameter: 19, loadIndex: 91, speedRating: "Y" },
      { width: 255, aspectRatio: 35, diameter: 20, loadIndex: 97, speedRating: "Y" },
    ],
  },
  {
    brandSlug: "aravon",
    categorySlug: "all-season",
    lineName: "Aravon TourGrip AS",
    season: "all-season",
    features: ["Interlocking tread blocks", "3D sipe technology", "60,000-mile tread warranty"],
    highlights: ["Whisper-quiet cabin comfort", "Balanced wet and dry traction"],
    description:
      "TourGrip AS delivers refined, all-season composure for sedans and crossovers that need confident traction without compromising on ride comfort.",
    sizes: [
      { width: 215, aspectRatio: 55, diameter: 17, loadIndex: 94, speedRating: "H" },
      { width: 225, aspectRatio: 60, diameter: 18, loadIndex: 100, speedRating: "H" },
    ],
  },
  {
    brandSlug: "kestrel-performance",
    categorySlug: "track-competition",
    lineName: "Kestrel Raptor Slick+",
    season: "performance",
    features: ["Track-day approved compound", "Minimal void ratio for max contact patch", "Heat-cycle resistant"],
    highlights: ["Developed alongside amateur race teams", "Progressive wear indicators"],
    description:
      "Raptor Slick+ is built for drivers who spend weekends at the track. Extreme dry grip with a compound tuned for consistent lap times.",
    sizes: [
      { width: 245, aspectRatio: 35, diameter: 18, loadIndex: 92, speedRating: "W" },
      { width: 265, aspectRatio: 35, diameter: 19, loadIndex: 94, speedRating: "W" },
    ],
  },
  {
    brandSlug: "kestrel-performance",
    categorySlug: "performance",
    lineName: "Kestrel Apex 2",
    season: "performance",
    features: ["Variable pitch tread design", "Responsive turn-in", "Reinforced shoulder blocks"],
    highlights: ["Balanced daily-driver performance tire", "Excellent hydroplaning resistance"],
    description:
      "Apex 2 blends everyday drivability with the sharp responsiveness enthusiasts expect, making it a favorite for sport sedans and coupes.",
    sizes: [
      { width: 225, aspectRatio: 45, diameter: 17, loadIndex: 91, speedRating: "V" },
      { width: 235, aspectRatio: 40, diameter: 18, loadIndex: 95, speedRating: "V" },
    ],
  },
  {
    brandSlug: "norrland-tire-co",
    categorySlug: "winter-snow",
    lineName: "Norrland Frostline Pro",
    season: "winter",
    studdable: true,
    features: ["Studdable construction", "Micro-pump sipes", "Cold-flex rubber compound to -40°F"],
    highlights: ["Scandinavian-tested on frozen lakes", "Severe snow service rated"],
    description:
      "Frostline Pro is engineered in the Nordic circle for drivers who face genuine winter conditions — deep snow, black ice, and sustained sub-zero cold.",
    sizes: [
      { width: 205, aspectRatio: 55, diameter: 16, loadIndex: 91, speedRating: "T" },
      { width: 225, aspectRatio: 65, diameter: 17, loadIndex: 102, speedRating: "T" },
    ],
  },
  {
    brandSlug: "norrland-tire-co",
    categorySlug: "winter-snow",
    lineName: "Norrland Polar Grip",
    season: "winter",
    features: ["Directional ice-tread pattern", "Silica-boosted cold compound"],
    highlights: ["Non-studded severe snow rating", "Quiet highway cruising"],
    description:
      "Polar Grip offers studless severe-winter performance for drivers who want maximum traction without the noise and road wear of studded tires.",
    sizes: [{ width: 215, aspectRatio: 60, diameter: 16, loadIndex: 95, speedRating: "T" }],
  },
  {
    brandSlug: "talon-grip",
    categorySlug: "all-terrain",
    lineName: "Talon Ridgeback X",
    season: "all-terrain",
    features: ["Interlocking scoop shoulder lugs", "Reinforced sidewall armor", "Self-cleaning tread voids"],
    highlights: ["3-ply sidewall for rock and gravel", "Aggressive lateral traction"],
    description:
      "Ridgeback X is Talon Grip's rugged all-terrain tire, built to handle rock crawling, muddy trails, and gravel forest roads while remaining civil on the highway commute.",
    sizes: [
      { width: 265, aspectRatio: 70, diameter: 17, loadIndex: 121, speedRating: "S" },
      { width: 285, aspectRatio: 70, diameter: 17, loadIndex: 121, speedRating: "S" },
      { width: 275, aspectRatio: 65, diameter: 18, loadIndex: 123, speedRating: "S" },
    ],
  },
  {
    brandSlug: "talon-grip",
    categorySlug: "truck-suv",
    lineName: "Talon Haulmaster LT",
    season: "all-season",
    features: ["Load-range E construction", "Chip and tear resistant tread", "Stone ejector ribs"],
    highlights: ["Built for towing and payload confidence", "70,000-mile commercial warranty"],
    description:
      "Haulmaster LT is a heavy-duty light-truck tire designed for drivers who tow trailers, haul equipment, and need dependable footing in all conditions.",
    sizes: [
      { width: 265, aspectRatio: 70, diameter: 17, loadIndex: 121, speedRating: "R" },
      { width: 245, aspectRatio: 75, diameter: 16, loadIndex: 120, speedRating: "R" },
    ],
  },
  {
    brandSlug: "meridian-rubber-works",
    categorySlug: "eco-fuel-efficient",
    lineName: "Meridian EcoStride",
    season: "all-season",
    features: ["Low rolling-resistance compound", "Lightweight casing", "Optimized for EV torque"],
    highlights: ["Up to 4% efficiency gain vs. standard all-season", "Reduced road noise for EV cabins"],
    description:
      "EcoStride is tuned for hybrid and electric vehicles, reducing rolling resistance to extend range while keeping cabin noise low.",
    sizes: [
      { width: 215, aspectRatio: 55, diameter: 17, loadIndex: 94, speedRating: "H" },
      { width: 235, aspectRatio: 45, diameter: 18, loadIndex: 98, speedRating: "H" },
      { width: 235, aspectRatio: 35, diameter: 20, loadIndex: 92, speedRating: "V" },
    ],
  },
  {
    brandSlug: "meridian-rubber-works",
    categorySlug: "touring-comfort",
    lineName: "Meridian Serenity Touring",
    season: "all-season",
    features: ["Multi-cell foam liner for cabin quiet", "Even wear tread compound", "70,000-mile warranty"],
    highlights: ["Among the quietest touring tires in its class", "Smooth, cushioned ride"],
    description:
      "Serenity Touring prioritizes a plush, quiet ride for sedans and minivans logging long highway miles.",
    sizes: [
      { width: 205, aspectRatio: 65, diameter: 16, loadIndex: 95, speedRating: "H" },
      { width: 225, aspectRatio: 60, diameter: 17, loadIndex: 99, speedRating: "H" },
    ],
  },
  {
    brandSlug: "solace-all-terrain",
    categorySlug: "all-terrain",
    lineName: "Solace Trailhand",
    season: "all-terrain",
    features: ["Balanced on/off-road tread", "Sidewall traction lugs", "Even highway wear"],
    highlights: ["Great for weekend overlanding", "Comfortable daily commuter manners"],
    description:
      "Trailhand is the do-it-all all-terrain tire for drivers who split time between pavement and dirt roads without wanting a harsh ride.",
    sizes: [{ width: 245, aspectRatio: 65, diameter: 17, loadIndex: 111, speedRating: "T" }],
  },
  {
    brandSlug: "vantage-motorsport",
    categorySlug: "performance",
    lineName: "Vantage Corsa RS",
    season: "performance",
    features: ["Motorsport-derived tread compound", "Ultra-low profile sidewall", "Precision lateral stiffness"],
    highlights: ["Homologated for select supercar OEM fitments", "Track-tested by European touring series teams"],
    description:
      "Corsa RS channels Vantage's motorsport pedigree into a street-legal ultra-high-performance tire for the most demanding drivers.",
    sizes: [
      { width: 245, aspectRatio: 35, diameter: 19, loadIndex: 93, speedRating: "Y" },
      { width: 285, aspectRatio: 30, diameter: 20, loadIndex: 99, speedRating: "Y" },
    ],
  },
  {
    brandSlug: "glacier-tread",
    categorySlug: "winter-snow",
    lineName: "Glacier Summit Ice",
    season: "winter",
    studdable: true,
    features: ["Dual-density tread compound", "Studdable ice grip", "Reinforced heel-to-toe wear resistance"],
    highlights: ["Built for Canadian winters", "Excellent braking distance on ice"],
    description:
      "Summit Ice is a dedicated winter tire designed for extreme cold and icy conditions found across the northern provinces.",
    sizes: [{ width: 215, aspectRatio: 70, diameter: 16, loadIndex: 100, speedRating: "T" }],
  },
  {
    brandSlug: "ferrox-industrial",
    categorySlug: "truck-suv",
    lineName: "Ferrox Workhorse HD",
    season: "all-season",
    features: ["Reinforced steel-belt casing", "Chip-resistant shoulder design", "Heavy load-range rating"],
    highlights: ["Fleet-proven durability", "Even wear under heavy payload"],
    description:
      "Workhorse HD is built for commercial fleets and heavy-duty pickups that need consistent performance under demanding loads.",
    sizes: [{ width: 265, aspectRatio: 65, diameter: 18, loadIndex: 114, speedRating: "R" }],
  },
  {
    brandSlug: "skylark-touring",
    categorySlug: "touring-comfort",
    lineName: "Skylark CloudRide",
    season: "all-season",
    features: ["Cushioned comfort compound", "Circumferential grooves for wet traction", "Low road noise"],
    highlights: ["Ideal for daily commuters", "80,000-mile treadwear warranty"],
    description:
      "CloudRide is Skylark's premium comfort tire, designed to soften road imperfections while delivering dependable all-season traction.",
    sizes: [
      { width: 215, aspectRatio: 60, diameter: 16, loadIndex: 95, speedRating: "H" },
      { width: 225, aspectRatio: 55, diameter: 17, loadIndex: 97, speedRating: "H" },
    ],
  },
];

function buildImages(seedKey: string, lineName: string): ProductImage[] {
  const rand = seededRandom(seedKey);
  const gradient = GRADIENT_PALETTE[Math.floor(rand() * GRADIENT_PALETTE.length)];
  return Array.from({ length: 4 }).map((_, i) => ({
    id: `${seedKey}-img-${i}`,
    url: `gradient:${gradient}`,
    alt: `${lineName} — view ${i + 1}`,
  }));
}

function generateProducts(): Product[] {
  const products: Product[] = [];

  for (const line of lineTemplates) {
    const brand = brands.find((b) => b.slug === line.brandSlug);
    const category = categories.find((c) => c.slug === line.categorySlug);
    if (!brand || !category) continue;

    line.sizes.forEach((size, idx) => {
      const slug = `${line.lineName}-${size.width}-${size.aspectRatio}r${size.diameter}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      const seedKey = slug;
      const rand = seededRandom(seedKey);

      const basePrice = 95 + rand() * 260;
      const price = Math.round(basePrice * (1 + size.diameter / 60)) - 0.05 + 0.99;
      const onSale = rand() > 0.72;
      const rating = Math.round((3.6 + rand() * 1.35) * 10) / 10;
      const reviewCount = Math.floor(20 + rand() * 480);
      const stock = Math.floor(rand() * 220);
      const badges: Product["badges"] = [];
      if (idx === 0 && rand() > 0.5) badges.push("best-seller");
      if (rand() > 0.85) badges.push("new");
      if (onSale) badges.push("sale");
      if (rand() > 0.9) badges.push("staff-pick");
      if (line.categorySlug === "eco-fuel-efficient") badges.push("eco");

      products.push({
        id: `product-${slug}`,
        slug,
        name: `${line.lineName} ${size.width}/${size.aspectRatio}R${size.diameter}`,
        brandId: brand.id,
        categoryId: category.id,
        spec: {
          width: size.width,
          aspectRatio: size.aspectRatio,
          diameter: size.diameter,
          loadIndex: size.loadIndex,
          speedRating: size.speedRating,
          season: line.season,
          runFlat: !!line.runFlatCapable,
          studdable: !!line.studdable,
        },
        price: Math.round(price * 100) / 100,
        compareAtPrice: onSale ? Math.round(price * 1.22 * 100) / 100 : undefined,
        currency: "USD",
        images: buildImages(seedKey, line.lineName),
        rating,
        reviewCount,
        stock,
        sku: `${brand.logoInitial}${size.width}${size.aspectRatio}${size.diameter}-${idx}`.toUpperCase(),
        badges,
        features: line.features,
        performance: {
          wetGrip: Math.round((3 + rand() * 2) * 10) / 10,
          dryGrip: Math.round((3 + rand() * 2) * 10) / 10,
          treadwear: Math.round((3 + rand() * 2) * 10) / 10,
          noise: Math.round((3 + rand() * 2) * 10) / 10,
          fuelEfficiency: Math.round((3 + rand() * 2) * 10) / 10,
          snowTraction: line.season === "winter" ? Math.round((4.2 + rand() * 0.8) * 10) / 10 : Math.round((2 + rand() * 2) * 10) / 10,
          comfort: Math.round((3 + rand() * 2) * 10) / 10,
        },
        warrantyMiles: [45000, 60000, 70000, 80000][Math.floor(rand() * 4)],
        mileageRatingMiles: 40000 + Math.floor(rand() * 40000),
        description: line.description,
        highlights: line.highlights,
        weightLbs: Math.round(18 + size.diameter * 0.9 + rand() * 6),
        createdAt: new Date(2025, Math.floor(rand() * 12), 1 + Math.floor(rand() * 27)).toISOString(),
      });
    });
  }

  return products;
}

export const products: Product[] = generateProducts();

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.categoryId === product.categoryId || p.brandId === product.brandId),
    )
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 8) {
  return [...products].sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount).slice(0, limit);
}
