import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AccountSidebar } from "@/components/account/account-sidebar";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container-edge flex-1 py-8">
        <Breadcrumbs items={[{ label: "My Account" }]} className="mb-6" />
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <AccountSidebar />
          <div>{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
