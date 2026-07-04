import { NewsletterForm } from "@/components/shared/newsletter-form";

export function NewsletterBanner() {
  return (
    <section className="container-edge pb-16 sm:pb-20">
      <div className="dark bg-background text-foreground relative overflow-hidden rounded-2xl border px-6 py-12 text-center sm:px-12">
        <div className="bg-ember/20 pointer-events-none absolute top-0 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-lg space-y-4">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Get 10% off your first order</h2>
          <p className="text-muted-foreground text-sm">
            Join our list for early access to seasonal sales, fitment guides, and tire care tips.
          </p>
          <NewsletterForm className="mx-auto max-w-sm" />
        </div>
      </div>
    </section>
  );
}
