import { Quote } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Rating } from "@/components/shared/rating";
import { reviews } from "@/lib/data/reviews";

export function Testimonials() {
  const featured = [...reviews].sort((a, b) => b.helpfulCount - a.helpfulCount).slice(0, 3);

  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="container-edge space-y-10">
        <SectionHeading eyebrow="Customer Stories" title="Trusted by drivers everywhere" align="center" className="mx-auto" />
        <div className="grid gap-6 sm:grid-cols-3">
          {featured.map((review) => (
            <figure key={review.id} className="flex flex-col gap-4 rounded-xl border bg-card p-6">
              <Quote className="text-ember size-6" aria-hidden />
              <Rating value={review.rating} size="sm" />
              <blockquote className="text-sm leading-relaxed">&ldquo;{review.body}&rdquo;</blockquote>
              <figcaption className="text-muted-foreground mt-auto text-sm font-medium">
                {review.customerName}
                {review.vehicle && <span className="text-muted-foreground font-normal"> · {review.vehicle}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
