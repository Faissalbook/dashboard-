import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tire buying guides, maintenance tips, and comparisons from Obsidian Tread.",
};

export default function BlogIndexPage() {
  return (
    <div className="container-edge py-8">
      <Breadcrumbs items={[{ label: "Blog" }]} className="mb-6" />
      <SectionHeading eyebrow="The Journal" title="Guides & Buying Advice" className="mb-10" />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group space-y-3">
            <div className={`aspect-[16/10] rounded-xl bg-gradient-to-br ${post.coverGradient}`} />
            <Badge variant="secondary">{post.category}</Badge>
            <h2 className="group-hover:text-ember font-display text-lg font-semibold text-balance transition-colors">
              {post.title}
            </h2>
            <p className="text-muted-foreground text-sm">{post.excerpt}</p>
            <p className="text-muted-foreground text-xs">
              {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              {" · "}
              {post.readMinutes} min read
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
