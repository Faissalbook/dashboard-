"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, FileText, MapPin, Package, Settings, Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { demoCustomer } from "@/lib/data/account";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const LINKS = [
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/vehicles", label: "Saved Vehicles", icon: Car },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/invoices", label: "Invoices", icon: FileText },
  { href: "/account/settings", label: "Account Settings", icon: Settings },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="space-y-6">
      <div className="flex items-center gap-3 rounded-xl border p-4">
        <Avatar className="size-11">
          <AvatarFallback className="bg-ember text-ember-foreground font-display">
            {demoCustomer.avatarInitial}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{demoCustomer.name}</p>
          <p className="text-muted-foreground text-xs">{demoCustomer.email}</p>
        </div>
      </div>
      <nav className="space-y-1">
        {LINKS.map((link) => {
          const active = pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-secondary text-ember" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
