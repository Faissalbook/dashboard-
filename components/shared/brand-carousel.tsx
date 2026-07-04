import Link from "next/link";

import type { Brand } from "@/types";

export function BrandCarousel({ brands }: { brands: Brand[] }) {
  const loop = [...brands, ...brands];

  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="animate-marquee group-hover:[animation-play-state:paused] flex w-max gap-4">
        {loop.map((brand, i) => (
          <Link
            key={`${brand.id}-${i}`}
            href={`/brands/${brand.slug}`}
            className="border-border hover:border-ember/50 hover:text-ember flex w-56 shrink-0 items-center gap-3 rounded-xl border bg-card px-5 py-4 transition-colors"
          >
            <span className="bg-secondary text-foreground flex size-10 shrink-0 items-center justify-center rounded-full font-display font-semibold">
              {brand.logoInitial}
            </span>
            <span>
              <span className="block text-sm font-medium">{brand.name}</span>
              <span className="text-muted-foreground block text-xs">{brand.country}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
