import type { Metadata } from "next";
import { CreditCard, HeartHandshake, Mail, MapPin, Phone, RotateCcw, ShieldCheck, Truck, Wrench } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/shared/contact-form";
import { installers } from "@/lib/data/installers";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Obsidian Tread's mission, shipping policy, installation network, and warranty coverage.",
};

export default function AboutPage() {
  return (
    <div className="py-8">
      <div className="container-edge">
        <Breadcrumbs items={[{ label: "About" }]} className="mb-6" />
        <SectionHeading
          eyebrow="Our Story"
          title="Built by people who actually care about tires"
          description="Obsidian Tread was founded to make buying tires as precise and transparent as the engineering behind them — no upsells, no guesswork, just the right fit for your vehicle."
          className="mb-16 max-w-2xl"
        />
      </div>

      <section id="shipping" className="border-t py-14">
        <div className="container-edge grid gap-8 lg:grid-cols-2">
          <SectionHeading eyebrow="Fulfillment" title="Shipping & Returns" />
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex gap-3">
              <Truck className="text-ember mt-0.5 size-5 shrink-0" />
              <div>
                <p className="font-medium">Fast, Free Shipping</p>
                <p className="text-muted-foreground text-sm">Free standard shipping on orders over $150, arriving in 2–5 business days.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <RotateCcw className="text-ember mt-0.5 size-5 shrink-0" />
              <div>
                <p className="font-medium">30-Day Returns</p>
                <p className="text-muted-foreground text-sm">Unused, unmounted tires can be returned within 30 days for a full refund.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="installation" className="bg-secondary/30 border-t py-14">
        <div className="container-edge grid gap-8 lg:grid-cols-2">
          <SectionHeading eyebrow="Nationwide Network" title="Installation Partners" />
          <div className="grid gap-4 sm:grid-cols-2">
            {installers.map((installer) => (
              <div key={installer.id} className="rounded-xl border bg-card p-4">
                <p className="flex items-center gap-2 font-medium">
                  <Wrench className="text-ember size-4" /> {installer.name}
                </p>
                <p className="text-muted-foreground mt-1 text-sm">{installer.city}, {installer.state}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="warranty" className="border-t py-14">
        <div className="container-edge grid gap-8 lg:grid-cols-2">
          <SectionHeading eyebrow="Peace of Mind" title="Warranty Coverage" />
          <div className="flex gap-3">
            <ShieldCheck className="text-ember mt-0.5 size-5 shrink-0" />
            <p className="text-muted-foreground text-sm">
              Every tire we sell includes the manufacturer&apos;s treadwear warranty, plus our own 45-day ride
              guarantee — if you&apos;re not satisfied with your new tires&apos; performance, we&apos;ll help you
              exchange them.
            </p>
          </div>
        </div>
      </section>

      <section id="financing" className="bg-secondary/30 border-t py-14">
        <div className="container-edge grid gap-8 lg:grid-cols-2">
          <SectionHeading eyebrow="Flexible Payment" title="Financing Options" />
          <div className="flex gap-3">
            <CreditCard className="text-ember mt-0.5 size-5 shrink-0" />
            <p className="text-muted-foreground text-sm">
              Split any purchase into 6 interest-free payments with approved credit, available at checkout.
              No hidden fees, no impact to your credit score to check eligibility.
            </p>
          </div>
        </div>
      </section>

      <section id="careers" className="border-t py-14">
        <div className="container-edge grid gap-8 lg:grid-cols-2">
          <SectionHeading eyebrow="Join Us" title="Careers at Obsidian Tread" />
          <div className="flex gap-3">
            <HeartHandshake className="text-ember mt-0.5 size-5 shrink-0" />
            <p className="text-muted-foreground text-sm">
              We&apos;re a small, remote-friendly team obsessed with getting the details right. If that sounds like
              you, reach out via the contact form below — we&apos;re always open to meeting people who care about
              craft.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-secondary/30 border-t py-14">
        <div className="container-edge grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Get in Touch" title="Contact Us" className="mb-6" />
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <Mail className="text-ember size-4" /> support@obsidiantread.example.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="text-ember size-4" /> 1 (800) 555-0182
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="text-ember size-4" /> Denver, Colorado
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
