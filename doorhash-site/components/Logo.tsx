import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  invert?: boolean;
};

// Inline SVG approximation of the doorhash wordmark.
// Replace with the official SVG once provided by the brand team.
export function Logo({ className, invert = false }: Props) {
  const door = invert ? "#0a0a0a" : "#8dc63f";
  const hash = invert ? "#8dc63f" : "#0a0a0a";

  return (
    <svg
      viewBox="0 0 320 80"
      className={cn("w-full h-auto", className)}
      role="img"
      aria-label="doorhash"
    >
      <text
        x="0"
        y="60"
        fontFamily="DM Sans, system-ui, sans-serif"
        fontSize="64"
        fontWeight="800"
        letterSpacing="-2"
        fill={door}
      >
        door
      </text>
      <text
        x="160"
        y="60"
        fontFamily="DM Sans, system-ui, sans-serif"
        fontSize="64"
        fontWeight="800"
        letterSpacing="-2"
        fill={hash}
      >
        hash
      </text>
      {/* leaf accent over the d */}
      <g transform="translate(28 4)">
        <path
          d="M8 14 C 4 6, 12 0, 16 6 C 20 0, 28 6, 24 14 C 20 8, 12 8, 8 14 Z"
          fill={door}
          opacity="0.95"
        />
        <line x1="16" y1="14" x2="16" y2="22" stroke={door} strokeWidth="2" />
      </g>
    </svg>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-auto", className)}
      role="img"
      aria-label="doorhash mark"
    >
      <circle cx="32" cy="32" r="30" fill="#8dc63f" />
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fontFamily="DM Sans, system-ui, sans-serif"
        fontSize="36"
        fontWeight="800"
        fill="#0a0a0a"
      >
        d
      </text>
    </svg>
  );
}
