import Link from "next/link";
import { CompassIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container-edge flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="bg-secondary flex size-16 items-center justify-center rounded-full">
          <CompassIcon className="text-ember size-7" />
        </div>
        <h1 className="font-display text-4xl font-semibold">Lost the tread</h1>
        <p className="text-muted-foreground max-w-md">
          We couldn&apos;t find the page you&apos;re looking for. It may have been moved, or the link might be
          out of date.
        </p>
        <div className="flex gap-3 pt-2">
          <Button variant="outline" asChild>
            <Link href="/tires">Shop Tires</Link>
          </Button>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
