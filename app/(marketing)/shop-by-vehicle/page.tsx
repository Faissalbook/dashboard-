import type { Metadata } from "next";
import { CarFront, ChevronRight } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { VehicleSearchWidget } from "@/components/search/vehicle-search-widget";
import { GarageQuickSelect } from "@/components/search/garage-quick-select";
import { SaveVehicleButton } from "@/components/search/save-vehicle-button";
import { ProductGrid } from "@/components/product/product-grid";
import { EmptyState } from "@/components/shared/empty-state";
import { resolveVehicleSelection } from "@/lib/data/vehicles";
import { getCompatibleTires } from "@/lib/data/query";

export const metadata: Metadata = {
  title: "Shop by Vehicle",
  description: "Find tires guaranteed to fit your vehicle by selecting year, make, model, and trim.",
};

const STEPS = ["Year", "Make", "Model", "Trim", "Compatible Tires"];

export default async function ShopByVehiclePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const { year, makeId, modelId, trimId } = params;

  const resolved = makeId && modelId && trimId ? resolveVehicleSelection(makeId, modelId, trimId) : null;
  const results = resolved ? getCompatibleTires(resolved.oemSize) : null;

  return (
    <div className="container-edge py-8">
      <Breadcrumbs items={[{ label: "Shop by Vehicle" }]} className="mb-6" />

      <SectionHeading
        eyebrow="Guaranteed Fitment"
        title="Shop by Vehicle"
        description="Select your vehicle's year, make, model, and trim to see only tires confirmed to fit."
        className="mb-6"
      />

      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span className={i === 0 || resolved ? "text-ember font-medium" : "text-muted-foreground"}>{step}</span>
            {i < STEPS.length - 1 && <ChevronRight className="text-muted-foreground size-4" />}
          </div>
        ))}
      </div>

      <GarageQuickSelect />

      <div className="mb-10 rounded-2xl border p-5 sm:p-6">
        <VehicleSearchWidget />
      </div>

      {resolved && results && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="bg-secondary flex size-10 items-center justify-center rounded-full">
                <CarFront className="text-ember size-5" />
              </div>
              <div>
                <p className="font-medium">
                  {year} {resolved.make} {resolved.model} {resolved.trim}
                </p>
                <p className="text-muted-foreground text-sm">OEM size: {resolved.oemSize}</p>
              </div>
            </div>
            <SaveVehicleButton
              year={Number(year)}
              make={resolved.make}
              model={resolved.model}
              trim={resolved.trim}
              size={resolved.oemSize}
            />
          </div>

          <h2 className="font-display text-2xl font-semibold">{results.total} Compatible Tires</h2>
          {results.items.length === 0 ? (
            <EmptyState
              icon={CarFront}
              title="No exact matches found"
              description="Try browsing the full catalog — many tires in nearby sizes will still fit safely."
            />
          ) : (
            <ProductGrid products={results.items} />
          )}
        </section>
      )}
    </div>
  );
}
