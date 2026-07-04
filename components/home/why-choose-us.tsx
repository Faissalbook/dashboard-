import { Award, HeadphonesIcon, ShieldCheck, Truck } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Certified Fitment Guarantee",
    description: "Every recommendation is cross-checked against manufacturer specs for your exact vehicle.",
  },
  {
    icon: Truck,
    title: "Fast, Free Shipping",
    description: "Most orders ship within 24 hours and arrive in 2–5 business days, free over $150.",
  },
  {
    icon: Award,
    title: "Price-Match Promise",
    description: "Found a lower price on an identical tire? We'll match it within 30 days of purchase.",
  },
  {
    icon: HeadphonesIcon,
    title: "Real Tire Experts",
    description: "Chat with technicians who actually know tread patterns — not a call-center script.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="container-edge py-16 sm:py-20">
      <SectionHeading eyebrow="Why Obsidian Tread" title="Built around getting it right the first time" align="center" className="mx-auto mb-10" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {REASONS.map((reason) => (
          <div key={reason.title} className="space-y-3 rounded-xl border p-6 text-center">
            <div className="bg-secondary mx-auto flex size-12 items-center justify-center rounded-full">
              <reason.icon className="text-ember size-5" />
            </div>
            <p className="font-display font-semibold">{reason.title}</p>
            <p className="text-muted-foreground text-sm">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
