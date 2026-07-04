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
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
