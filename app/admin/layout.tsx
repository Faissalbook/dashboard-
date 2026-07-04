import Link from "next/link";
import { Menu } from "lucide-react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
      <aside className="hidden border-r lg:block">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <span className="bg-ember text-ember-foreground flex size-8 items-center justify-center rounded-full font-display font-bold">
            OT
          </span>
          <span className="font-display font-semibold">Admin</span>
        </div>
        <div className="p-4">
          <AdminSidebar />
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open admin menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>Obsidian Tread Admin</SheetTitle>
              </SheetHeader>
              <div className="px-4">
                <AdminSidebar />
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="text-muted-foreground hidden items-center gap-1.5 text-sm hover:text-foreground lg:flex">
            View storefront ↗
          </Link>
          <ThemeToggle />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
