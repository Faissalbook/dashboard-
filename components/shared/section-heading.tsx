import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl space-y-3", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-ember flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase">
          {align === "center" ? null : <span className="bg-ember h-px w-6" aria-hidden />}
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold text-balance sm:text-4xl">{title}</h2>
      {description && <p className="text-muted-foreground text-base text-balance">{description}</p>}
    </div>
  );
}
