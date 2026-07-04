"use client";

import * as React from "react";

import { TireVisual } from "@/components/shared/tire-visual";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = React.useState(0);

  return (
    <div className="space-y-3">
      <TireVisual url={images[active]?.url ?? ""} label={images[active]?.alt ?? name} accent />
      <div className="flex gap-2">
        {images.map((image, i) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1} of ${name}`}
            aria-current={active === i}
            className={cn(
              "size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
              active === i ? "border-ember" : "border-transparent",
            )}
          >
            <TireVisual url={image.url} label={image.alt} className="rounded-md" />
          </button>
        ))}
      </div>
    </div>
  );
}
