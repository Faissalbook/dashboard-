"use client";

import * as React from "react";
import Link from "next/link";
import { GitCompareArrows, Heart, Menu, Search, ShoppingCart, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationHoverCard,
} from "@/components/layout/navigation-hover-card";
import { MegaMenu } from "@/components/layout/mega-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/lib/data/categories";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCompareStore } from "@/store/compare-store";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Shop by Vehicle", href: "/shop-by-vehicle" },
  { label: "Brands", href: "/brands" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <Badge
      variant="accent"
      className="absolute -top-1.5 -right-1.5 flex size-4.5 items-center justify-center rounded-full p-0 text-[10px]"
    >
      {count > 9 ? "9+" : count}
    </Badge>
  );
}

export function Header() {
  const itemCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const compareCount = useCompareStore((s) => s.productIds.length);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors",
        scrolled ? "bg-background/85 backdrop-blur-lg" : "bg-background",
      )}
    >
      <div className="container-edge flex h-16 items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>Obsidian Tread</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              <Link href="/tires" className="rounded-md px-2 py-2.5 text-sm font-medium hover:bg-secondary">
                Shop All Tires
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/tires?category=${c.slug}`}
                  className="text-muted-foreground rounded-md px-2 py-2 pl-4 text-sm hover:bg-secondary"
                >
                  {c.name}
                </Link>
              ))}
              <div className="my-2 h-px bg-border" />
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-md px-2 py-2.5 text-sm font-medium hover:bg-secondary">
                  {l.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-border" />
              <Link href="/account/orders" className="rounded-md px-2 py-2.5 text-sm font-medium hover:bg-secondary">
                My Account
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="font-display flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="bg-ember flex size-8 items-center justify-center rounded-full text-ember-foreground">
            OT
          </span>
          <span className="hidden sm:inline">Obsidian Tread</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavigationHoverCard label="Shop Tires" href="/tires">
            <MegaMenu />
          </NavigationHoverCard>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-ember rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search" asChild>
            <Link href="/tires">
              <Search className="size-4.5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Compare tires" className="relative hidden sm:inline-flex" asChild>
            <Link href="/tires?compare=1">
              <GitCompareArrows className="size-4.5" />
              <CountBadge count={compareCount} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative" asChild>
            <Link href="/account/wishlist">
              <Heart className="size-4.5" />
              <CountBadge count={wishlistCount} />
            </Link>
          </Button>
          <CartDrawer>
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingCart className="size-4.5" />
              <CountBadge count={itemCount} />
            </Button>
          </CartDrawer>
          <Button variant="ghost" size="icon" aria-label="Account" className="hidden sm:inline-flex" asChild>
            <Link href="/account/orders">
              <UserRound className="size-4.5" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
