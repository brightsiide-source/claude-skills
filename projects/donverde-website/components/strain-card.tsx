import Link from "next/link";
import type { Strain } from "@/content/strains";

const typeLabel: Record<Strain["type"], string> = {
  indica: "Indica",
  sativa: "Sativa",
  hybrid: "Hybrid"
};

export function StrainCard({ strain, dark = false }: { strain: Strain; dark?: boolean }) {
  return (
    <Link
      href={`/strains/${strain.slug}`}
      className={`group relative block overflow-hidden border transition-colors ${
        dark
          ? "border-bone/15 bg-ink/40 hover:border-verde-glow"
          : "border-ink/10 bg-bone hover:border-verde"
      }`}
    >
      <div
        className={`relative aspect-[4/5] w-full overflow-hidden ${
          dark ? "bg-ink" : "bg-ink"
        }`}
      >
        <StrainArt strain={strain} />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="bg-bone/90 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-ink">
            {typeLabel[strain.type]}
          </span>
          <span className="bg-verde px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-bone">
            {strain.thc} THC
          </span>
        </div>
      </div>

      <div className={`p-6 ${dark ? "text-bone" : "text-ink"}`}>
        <h3 className="font-display text-2xl tracking-tightest">{strain.name}</h3>
        <p className={`mt-2 text-sm ${dark ? "text-bone/70" : "text-ink/70"}`}>
          {strain.tagline}
        </p>
        <p className={`mt-4 text-[11px] uppercase tracking-[0.18em] ${dark ? "text-bone/50" : "text-ink/50"}`}>
          {strain.lineage}
        </p>
      </div>
    </Link>
  );
}

function StrainArt({ strain }: { strain: Strain }) {
  const palette = {
    indica: ["#1A1A1A", "#2C4A2A", "#4A6741"],
    sativa: ["#1A1A1A", "#7DA15F", "#A8C290"],
    hybrid: ["#1A1A1A", "#4A6741", "#7DA15F"]
  } as const;

  const [c1, c2, c3] = palette[strain.type];
  const seed = strain.slug.length;

  return (
    <svg
      viewBox="0 0 400 500"
      className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
      role="img"
      aria-label={`${strain.name} placeholder artwork`}
    >
      <defs>
        <radialGradient id={`g-${strain.slug}`} cx="50%" cy="55%" r="65%">
          <stop offset="0%" stopColor={c3} stopOpacity="0.95" />
          <stop offset="50%" stopColor={c2} stopOpacity="0.8" />
          <stop offset="100%" stopColor={c1} stopOpacity="1" />
        </radialGradient>
        <filter id={`grain-${strain.slug}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <rect width="400" height="500" fill={`url(#g-${strain.slug})`} />
      <rect width="400" height="500" filter={`url(#grain-${strain.slug})`} />
      <text
        x="50%"
        y="92%"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="14"
        letterSpacing="3"
        fill="#FAFAF7"
        fillOpacity="0.5"
        style={{ textTransform: "uppercase" }}
      >
        DVF · {strain.dominantTerpenes[0]}
      </text>
    </svg>
  );
}
