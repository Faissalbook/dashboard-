import { cn } from "@/lib/utils";

function parseGradient(url: string) {
  if (url.startsWith("gradient:")) return url.replace("gradient:", "");
  return "from-zinc-800 to-neutral-950";
}

export function TireVisual({
  url,
  label,
  className,
  accent = false,
}: {
  url: string;
  label: string;
  className?: string;
  accent?: boolean;
}) {
  const gradient = parseGradient(url);

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br",
        gradient,
        className,
      )}
    >
      <svg viewBox="0 0 200 200" className="h-[72%] w-[72%] drop-shadow-2xl" aria-hidden>
        <defs>
          <radialGradient id="tireTreadGrad" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#3a3a3f" />
            <stop offset="70%" stopColor="#19191c" />
            <stop offset="100%" stopColor="#050506" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="url(#tireTreadGrad)" />
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i / 36) * 360;
          return (
            <rect
              key={i}
              x="98.5"
              y="10"
              width="3"
              height="16"
              rx="1"
              fill="#050506"
              opacity={0.85}
              transform={`rotate(${angle} 100 100)`}
            />
          );
        })}
        <circle cx="100" cy="100" r="62" fill="#0d0d0f" stroke="#2a2a2e" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="40" fill="#151517" stroke={accent ? "var(--ember)" : "#333338"} strokeWidth="2" />
        <circle cx="100" cy="100" r="8" fill="#2a2a2e" />
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * 360;
          const x = 100 + 24 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 24 * Math.sin((angle * Math.PI) / 180);
          return <circle key={i} cx={x} cy={y} r="4" fill="#3a3a3f" />;
        })}
      </svg>
    </div>
  );
}
