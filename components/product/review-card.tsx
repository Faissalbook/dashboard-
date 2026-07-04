import { BadgeCheck, ThumbsUp } from "lucide-react";

import { Rating } from "@/components/shared/rating";
import type { Review } from "@/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="space-y-2 border-b py-5 last:border-b-0">
      <div className="flex items-center justify-between gap-2">
        <Rating value={review.rating} size="sm" />
        <span className="text-muted-foreground text-xs">
          {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>
      <p className="font-medium">{review.title}</p>
      <p className="text-muted-foreground text-sm">{review.body}</p>
      <div className="text-muted-foreground flex flex-wrap items-center gap-3 pt-1 text-xs">
        <span className="font-medium text-foreground">{review.customerName}</span>
        {review.verifiedPurchase && (
          <span className="text-success flex items-center gap-1">
            <BadgeCheck className="size-3.5" /> Verified purchase
          </span>
        )}
        {review.vehicle && <span>Vehicle: {review.vehicle}</span>}
        <span className="ml-auto flex items-center gap-1">
          <ThumbsUp className="size-3.5" /> {review.helpfulCount} found this helpful
        </span>
      </div>
    </div>
  );
}
