import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container-edge flex h-16 items-center justify-between">
          <Link href="/" className="font-display flex items-center gap-2 text-lg font-bold">
            <span className="bg-ember text-ember-foreground flex size-8 items-center justify-center rounded-full">
              OT
            </span>
            Obsidian Tread
          </Link>
          <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <ShieldCheck className="text-success size-4" /> Secure Checkout
          </span>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6">
        <p className="text-muted-foreground container-edge text-center text-xs">
          © {new Date().getFullYear()} Obsidian Tread. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
