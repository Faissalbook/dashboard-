import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { blogPosts, getBlogPostBySlug } from "@/lib/data/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="container-edge max-w-2xl py-8">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} className="mb-6" />

      <Badge variant="secondary" className="mb-3">
        {post.category}
      </Badge>
      <h1 className="font-display text-3xl font-semibold text-balance sm:text-4xl">{post.title}</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        By {post.author} ·{" "}
        {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} ·{" "}
        {post.readMinutes} min read
      </p>

      <div className={`my-8 aspect-[16/9] rounded-xl bg-gradient-to-br ${post.coverGradient}`} />

      <div className="space-y-5 text-base leading-relaxed">
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
