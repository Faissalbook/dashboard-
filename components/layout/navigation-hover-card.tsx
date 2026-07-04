import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function NavigationHoverCard({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <Link
        href={href}
        className="hover:text-ember flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors"
      >
        {label}
        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
      </Link>
      <div className="invisible absolute top-full left-0 z-50 translate-y-1 rounded-xl border bg-popover opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {children}
      </div>
    </div>
  );
}
