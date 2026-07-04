import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-secondary/30 flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="font-display mb-8 flex items-center gap-2 text-xl font-bold">
        <span className="bg-ember text-ember-foreground flex size-9 items-center justify-center rounded-full">
          OT
        </span>
        Obsidian Tread
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
