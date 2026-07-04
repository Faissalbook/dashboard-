import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "how-to-read-your-tire-sidewall",
    title: "How to Read Your Tire Sidewall in Under 2 Minutes",
    excerpt: "Every number and letter on your tire's sidewall tells a story — here's how to decode width, aspect ratio, diameter, load index, and speed rating.",
    category: "Guides",
    author: "Obsidian Tread Editorial",
    readMinutes: 6,
    publishedAt: "2026-05-12",
    coverGradient: "from-zinc-800 to-neutral-950",
    content: [
      "If you've ever looked at the side of your tire and seen something like 225/55R17 91V, it can look like a secret code. It isn't — every segment maps to a specific measurement that determines fitment and performance.",
      "The first number, 225, is the tire's width in millimeters, measured from sidewall to sidewall. The two-digit number after the slash, 55, is the aspect ratio: the tire's sidewall height as a percentage of its width. A lower number means a shorter, stiffer sidewall typical of performance tires.",
      "The letter R simply indicates radial construction, which is standard on nearly every passenger tire sold today. The number that follows, 17, is the wheel diameter in inches that the tire is designed to fit.",
      "After the size, you'll usually see a load index and speed rating, like 91V. The load index maps to a maximum weight the tire can carry per tire, while the speed rating indicates the maximum sustained speed the tire is rated for under that load.",
      "When shopping for replacements, matching the original equipment size is the safest choice unless you've researched plus-sizing carefully. Our tire size search lets you filter by exactly these three numbers so you never have to guess.",
    ],
  },
  {
    id: "blog-2",
    slug: "all-season-vs-winter-tires",
    title: "All-Season vs. Winter Tires: What Actually Changes Below 45°F",
    excerpt: "The rubber compound in all-season tires stiffens as temperatures drop. We break down when it's truly time to switch.",
    category: "Comparisons",
    author: "Obsidian Tread Editorial",
    readMinutes: 8,
    publishedAt: "2026-04-02",
    coverGradient: "from-slate-800 to-black",
    content: [
      "All-season tires are a compromise by design — a single rubber compound and tread pattern tuned to handle rain, dry pavement, and light snow reasonably well, without excelling at any one of them.",
      "The critical number to know is 45°F (7°C). Below that threshold, the silica-and-rubber compounds used in most all-season tires begin to stiffen, which measurably reduces grip on cold pavement even when there's no snow or ice present.",
      "Winter tires use a softer, more flexible compound engineered to stay pliable well below freezing, along with denser sipe patterns that bite into snow and ice. That's why winter tires can cut stopping distances on snow by 30-40% compared to all-season tires.",
      "If you live somewhere that sees sustained sub-freezing temperatures or regular snowfall, a dedicated winter set — even on steel wheels — will outperform any all-season tire, no matter how highly rated.",
      "For drivers in milder climates who only see the occasional cold snap, a quality all-season or all-weather tire (look for the three-peak mountain snowflake symbol) is usually the more practical choice.",
    ],
  },
  {
    id: "blog-3",
    slug: "tire-rotation-schedule-guide",
    title: "The Tire Rotation Schedule Your Mechanic Wishes You'd Follow",
    excerpt: "Uneven wear is the top cause of premature tire replacement. Here's a simple rotation cadence that extends tread life.",
    category: "Maintenance",
    author: "Obsidian Tread Editorial",
    readMinutes: 5,
    publishedAt: "2026-03-18",
    coverGradient: "from-stone-800 to-neutral-950",
    content: [
      "Front and rear tires wear differently depending on your vehicle's drivetrain, suspension geometry, and your own driving habits. Left unmanaged, that uneven wear shortens the useful life of your entire set.",
      "The standard recommendation is to rotate every 5,000 to 7,500 miles — roughly every other oil change for most drivers. Front-wheel-drive vehicles typically wear front tires faster due to steering and power delivery, making rotation even more important.",
      "A front-to-back rotation pattern works for most non-directional tires, while directional tread patterns need a same-side front-to-back rotation to preserve the tread's intended water-channeling direction.",
      "Rotating on schedule doesn't just extend tread life — it also helps you catch alignment issues, uneven inflation, and suspension wear earlier, before they turn into bigger repair bills.",
      "Most installation partners in our network include rotation as part of a standard service visit, so it's worth booking alongside your next oil change.",
    ],
  },
  {
    id: "blog-4",
    slug: "choosing-tires-for-towing",
    title: "Choosing the Right Tires When You Tow Regularly",
    excerpt: "Load range, ply rating, and sidewall reinforcement all matter more than tread pattern when hauling heavy trailers.",
    category: "Buying Guides",
    author: "Obsidian Tread Editorial",
    readMinutes: 7,
    publishedAt: "2026-02-27",
    coverGradient: "from-zinc-900 to-black",
    content: [
      "When you're regularly towing a trailer, boat, or heavy equipment, the tread pattern matters far less than the tire's load-carrying capacity. That capacity is determined by its load range and ply rating, printed right on the sidewall.",
      "Load range letters (like C, D, or E) indicate the tire's maximum air pressure and load capacity — higher letters mean stiffer sidewalls built to handle more weight without excessive flex or heat buildup.",
      "Heat is the enemy of towing tires. Underinflated or underrated tires flex more under load, generating heat that accelerates wear and increases blowout risk, especially at highway speeds on long hauls.",
      "Look for tires explicitly rated for light-truck (LT) use if you're regularly near your vehicle's max towing capacity. These carry reinforced casings designed for sustained heavy loads, not just occasional trips to the hardware store.",
      "Finally, always check your tow vehicle's door-jamb sticker for the manufacturer's recommended tire size and pressure — towing capacity ratings assume those exact specifications.",
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
