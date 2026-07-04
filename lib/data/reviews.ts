import type { Review } from "@/types";
import { products } from "./products";
import { seededRandom } from "./prng";

const REVIEW_POOL: Array<{ title: string; body: string }> = [
  { title: "Exceeded expectations on the highway", body: "Quiet, stable, and the wet traction is noticeably better than the tires I replaced. Installation was quick and they were balanced perfectly." },
  { title: "Great value for the performance", body: "I was skeptical about switching brands but these have held up well through a full season including some heavy rain." },
  { title: "Confident in the snow", body: "Drove through two back-to-back snowstorms and never felt the rear step out. Braking distance felt short and predictable." },
  { title: "Smooth and comfortable ride", body: "Cabin noise dropped noticeably compared to my old set. Great for long road trips." },
  { title: "Handles corners with confidence", body: "Turn-in is sharp and predictable. I autocross occasionally and these have plenty of grip for spirited weekend driving." },
  { title: "Tough enough for the trail", body: "Took these on a rocky forest service road and they shrugged it off. No punctures, no chunking after months of use." },
  { title: "Solid all-around commuter tire", body: "Nothing flashy, just consistent, dependable grip in rain or shine on my daily commute." },
  { title: "Good tread life so far", body: "About 15,000 miles in and wear looks even across the tread. Will update after a full year." },
  { title: "Worth the upgrade", body: "Noticeably better fuel economy since I switched, and my drive feels tighter overall." },
  { title: "Would buy again", body: "Second set from this brand for my vehicle. Consistent quality and the customer support during install scheduling was excellent." },
];

const NAME_POOL = [
  "Jordan M.", "Casey R.", "Priya S.", "Marcus T.", "Elena V.", "Sam K.", "Devon L.",
  "Amara O.", "Chris P.", "Nina F.", "Tyler B.", "Grace H.", "Omar Z.", "Lucia G.",
];

const VEHICLE_POOL = [
  "2022 Toyota RAV4", "2021 Honda Civic", "2023 Ford F-150", "2020 Subaru Outback",
  "2024 Tesla Model 3", "2019 Jeep Wrangler", "2022 BMW 3 Series", "2021 Chevrolet Equinox",
];

function generateReviewsForProduct(productId: string, seedKey: string): Review[] {
  const rand = seededRandom(seedKey);
  const count = 2 + Math.floor(rand() * 5);
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    const template = REVIEW_POOL[Math.floor(rand() * REVIEW_POOL.length)];
    const rating = Math.max(2, Math.min(5, Math.round(3.6 + (rand() - 0.3) * 2)));
    reviews.push({
      id: `${productId}-review-${i}`,
      productId,
      customerName: NAME_POOL[Math.floor(rand() * NAME_POOL.length)],
      rating,
      title: template.title,
      body: template.body,
      verifiedPurchase: rand() > 0.2,
      helpfulCount: Math.floor(rand() * 60),
      createdAt: new Date(2025, Math.floor(rand() * 12), 1 + Math.floor(rand() * 27)).toISOString(),
      vehicle: rand() > 0.3 ? VEHICLE_POOL[Math.floor(rand() * VEHICLE_POOL.length)] : undefined,
    });
  }
  return reviews;
}

export const reviews: Review[] = products.flatMap((p) => generateReviewsForProduct(p.id, `${p.id}-reviews`));

export function getReviewsForProduct(productId: string) {
  return reviews.filter((r) => r.productId === productId);
}
