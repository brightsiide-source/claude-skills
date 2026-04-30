import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  trail: Crumb[];
  tone?: "light" | "dark";
}

export function Breadcrumbs({ trail, tone = "light" }: Props) {
  const baseColor = tone === "dark" ? "text-bone/60" : "text-ink/60";
  const activeColor = tone === "dark" ? "text-bone" : "text-ink";
  const dividerColor = tone === "dark" ? "text-bone/30" : "text-ink/30";

  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href ? `https://donverdefarms.com${c.href}` : undefined
    }))
  };

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={`flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em] ${baseColor}`}
      >
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <span key={`${c.label}-${i}`} className="flex items-center gap-2">
              {c.href && !last ? (
                <Link href={c.href} className="hover:text-gold">
                  {c.label}
                </Link>
              ) : (
                <span className={last ? activeColor : ""}>{c.label}</span>
              )}
              {!last && <span className={dividerColor}>/</span>}
            </span>
          );
        })}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
