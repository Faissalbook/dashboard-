import { Progress } from "@/components/ui/progress";
import type { PerformanceRatings } from "@/types";

const LABELS: Record<keyof PerformanceRatings, string> = {
  wetGrip: "Wet Grip",
  dryGrip: "Dry Grip",
  treadwear: "Treadwear",
  noise: "Noise Comfort",
  fuelEfficiency: "Fuel Efficiency",
  snowTraction: "Snow Traction",
  comfort: "Ride Comfort",
};

export function PerformanceRatingsCard({ ratings }: { ratings: PerformanceRatings }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {(Object.keys(LABELS) as Array<keyof PerformanceRatings>).map((key) => (
        <div key={key} className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <dt className="text-muted-foreground">{LABELS[key]}</dt>
            <dd className="font-mono font-medium">{ratings[key].toFixed(1)}/5</dd>
          </div>
          <Progress value={(ratings[key] / 5) * 100} aria-label={`${LABELS[key]}: ${ratings[key]} out of 5`} />
        </div>
      ))}
    </dl>
  );
}
