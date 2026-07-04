import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { blogPosts } from "@/lib/data/blog";

export function BlogPreview() {
  return (
    <section className="container-edge py-16 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="From the Journal" title="Guides & Buying Advice" />
        <Link href="/blog" className="text-ember inline-flex items-center gap-1 text-sm font-medium">
          Visit the blog <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group space-y-3">
            <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${post.coverGradient}`} />
            <div className="space-y-1.5">
              <p className="text-ember text-xs font-semibold tracking-wide uppercase">{post.category}</p>
              <h3 className="group-hover:text-ember font-medium text-balance transition-colors">{post.title}</h3>
              <p className="text-muted-foreground text-xs">{post.readMinutes} min read</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
