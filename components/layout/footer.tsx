import Link from "next/link";
import { Camera, Rss, Video } from "lucide-react";

import { categories } from "@/lib/data/categories";
import { NewsletterForm } from "@/components/shared/newsletter-form";

const HELP_LINKS = [
  { label: "Track My Order", href: "/account/orders" },
  { label: "Shipping & Returns", href: "/about#shipping" },
  { label: "Installation Partners", href: "/about#installation" },
  { label: "Contact Us", href: "/about#contact" },
  { label: "Warranty", href: "/about#warranty" },
];

const COMPANY_LINKS = [
  { label: "About Obsidian Tread", href: "/about" },
  { label: "Our Brands", href: "/brands" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/about#careers" },
];

export function Footer() {
  return (
    <footer className="dark bg-background text-foreground mt-24 border-t">
      <div className="container-edge grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <Link href="/" className="font-display flex items-center gap-2 text-lg font-bold">
            <span className="bg-ember text-ember-foreground flex size-8 items-center justify-center rounded-full">
              OT
            </span>
            Obsidian Tread
          </Link>
          <p className="text-muted-foreground max-w-sm text-sm">
            Premium tires, precisely matched. Search by size or vehicle, compare performance
            ratings, and book professional installation — all in one place.
          </p>
          <NewsletterForm />
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold tracking-wide uppercase">Shop</p>
          <ul className="space-y-2.5 text-sm">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link href={`/tires?category=${c.slug}`} className="text-muted-foreground hover:text-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold tracking-wide uppercase">Help</p>
          <ul className="space-y-2.5 text-sm">
            {HELP_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold tracking-wide uppercase">Company</p>
          <ul className="space-y-2.5 text-sm">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container-edge flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Obsidian Tread. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Blog RSS feed" className="text-muted-foreground hover:text-foreground">
              <Rss className="size-4" />
            </Link>
            <Link href="#" aria-label="Photo gallery" className="text-muted-foreground hover:text-foreground">
              <Camera className="size-4" />
            </Link>
            <Link href="#" aria-label="Video channel" className="text-muted-foreground hover:text-foreground">
              <Video className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
