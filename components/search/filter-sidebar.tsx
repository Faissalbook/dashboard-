"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { brands } from "@/lib/data/brands";
import { getFilterFacets } from "@/lib/data/query";
import { formatCurrency } from "@/lib/utils";
import type { ProductFilters, Season } from "@/types";

const SEASONS: { value: Season; label: string }[] = [
  { value: "all-season", label: "All-Season" },
  { value: "summer", label: "Summer" },
  { value: "winter", label: "Winter" },
  { value: "all-terrain", label: "All-Terrain" },
  { value: "performance", label: "Performance" },
];

export function FilterSidebar({
  filters,
  onChange,
  onReset,
}: {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  onReset: () => void;
}) {
  const facets = getFilterFacets();

  function toggleArrayValue<T>(key: keyof ProductFilters, value: T) {
    const current = (filters[key] as T[] | undefined) ?? [];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    onChange({ ...filters, [key]: next.length ? next : undefined, page: 1 });
  }

  const priceRange: [number, number] = [
    filters.minPrice ?? facets.priceRange.min,
    filters.maxPrice ?? facets.priceRange.max,
  ];

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between pb-2">
        <p className="font-display font-semibold">Filters</p>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Clear all
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={["size", "season", "brand", "price"]}>
        <AccordionItem value="size">
          <AccordionTrigger>Tire Size</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase">Width</p>
              <div className="flex flex-wrap gap-1.5">
                {facets.widths.map((w) => (
                  <button
                    key={w}
                    onClick={() => toggleArrayValue("width", w)}
                    className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                      filters.width?.includes(w) ? "border-ember bg-ember text-ember-foreground" : "hover:border-ember/50"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase">Aspect Ratio</p>
              <div className="flex flex-wrap gap-1.5">
                {facets.aspectRatios.map((a) => (
                  <button
                    key={a}
                    onClick={() => toggleArrayValue("aspectRatio", a)}
                    className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                      filters.aspectRatio?.includes(a) ? "border-ember bg-ember text-ember-foreground" : "hover:border-ember/50"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase">Diameter</p>
              <div className="flex flex-wrap gap-1.5">
                {facets.diameters.map((d) => (
                  <button
                    key={d}
                    onClick={() => toggleArrayValue("diameter", d)}
                    className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                      filters.diameter?.includes(d) ? "border-ember bg-ember text-ember-foreground" : "hover:border-ember/50"
                    }`}
                  >
                    {d}&quot;
                  </button>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="season">
          <AccordionTrigger>Season</AccordionTrigger>
          <AccordionContent className="space-y-2.5">
            {SEASONS.map((s) => (
              <div key={s.value} className="flex items-center gap-2">
                <Checkbox
                  id={`season-${s.value}`}
                  checked={filters.season?.includes(s.value) ?? false}
                  onCheckedChange={() => toggleArrayValue("season", s.value)}
                />
                <Label htmlFor={`season-${s.value}`} className="font-normal">
                  {s.label}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent className="space-y-2.5">
            {brands.map((b) => (
              <div key={b.id} className="flex items-center gap-2">
                <Checkbox
                  id={`brand-${b.id}`}
                  checked={filters.brandIds?.includes(b.id) ?? false}
                  onCheckedChange={() => toggleArrayValue("brandIds", b.id)}
                />
                <Label htmlFor={`brand-${b.id}`} className="font-normal">
                  {b.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <Slider
              min={facets.priceRange.min}
              max={facets.priceRange.max}
              step={5}
              value={priceRange}
              onValueChange={([min, max]) => onChange({ ...filters, minPrice: min, maxPrice: max, page: 1 })}
            />
            <div className="text-muted-foreground flex justify-between text-sm">
              <span>{formatCurrency(priceRange[0])}</span>
              <span>{formatCurrency(priceRange[1])}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
