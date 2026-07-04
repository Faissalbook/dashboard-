import { CalendarClock, MapPin, Star } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { installers } from "@/lib/data/installers";

export function InstallationPartners() {
  return (
    <section className="container-edge py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="space-y-4">
          <SectionHeading
            eyebrow="Nationwide Network"
            title="Certified installation, scheduled at checkout"
            description="Choose from thousands of vetted installation partners. Pick a date and time slot when you check out — no extra phone calls required."
          />
          <Button size="lg" variant="outline" asChild>
            <a href="#footer">Find a location near you</a>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {installers.map((installer) => (
            <div key={installer.id} className="space-y-2 rounded-xl border bg-card p-5">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{installer.name}</p>
                <span className="text-muted-foreground flex items-center gap-1 text-xs">
                  <Star className="fill-ember text-ember size-3.5" /> {installer.rating}
                </span>
              </div>
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <MapPin className="size-3.5 shrink-0" />
                {installer.addressLine}, {installer.city} · {installer.distanceMiles} mi
              </p>
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <CalendarClock className="size-3.5 shrink-0" />
                Next available: {installer.nextAvailable}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
