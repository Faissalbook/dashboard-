import Link from "next/link";
import { ArrowRight, CreditCard, PercentCircle, Wrench } from "lucide-react";

const BANNERS = [
  {
    title: "0% APR Financing",
    description: "Split your purchase into 6 easy payments with approved credit.",
    icon: CreditCard,
    href: "/about#financing",
    gradient: "from-zinc-900 via-zinc-800 to-neutral-900",
  },
  {
    title: "Seasonal Changeover Sale",
    description: "Save up to 20% on winter sets before the first freeze.",
    icon: PercentCircle,
    href: "/tires?season=winter",
    gradient: "from-neutral-900 via-stone-800 to-zinc-900",
  },
  {
    title: "Free Local Installation",
    description: "Book certified installers at checkout — no extra stops.",
    icon: Wrench,
    href: "/about#installation",
    gradient: "from-stone-900 via-zinc-800 to-neutral-900",
  },
];

export function PromoBanners() {
  return (
    <section className="container-edge py-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {BANNERS.map((banner) => (
          <Link
            key={banner.title}
            href={banner.href}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white ${banner.gradient}`}
          >
            <banner.icon className="text-ember mb-4 size-8" />
            <h3 className="font-display text-lg font-semibold">{banner.title}</h3>
            <p className="mt-1.5 text-sm text-white/70">{banner.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white/90">
              Learn more
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
