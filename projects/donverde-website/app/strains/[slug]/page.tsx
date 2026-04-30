import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getStrain, strains } from "@/content/strains";
import { StrainCard } from "@/components/strain-card";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return strains.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const strain = getStrain(params.slug);
  if (!strain) return {};
  return {
    title: `${strain.name} — ${strain.type} strain`,
    description: `${strain.name} (${strain.type}) — ${strain.lineage}. ${strain.tagline} Lineage, terpenes, and lab data from Don Verde Farms.`
  };
}

const typeLabel = { indica: "Indica", sativa: "Sativa", hybrid: "Hybrid" } as const;

export default function StrainPage({ params }: Props) {
  const strain = getStrain(params.slug);
  if (!strain) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: strain.name,
    description: `${strain.tagline} ${strain.notes}`,
    brand: { "@type": "Brand", name: "Don Verde Farms" },
    category: `Cannabis > ${typeLabel[strain.type]}`,
    additionalProperty: [
      { "@type": "PropertyValue", name: "THC", value: strain.thc },
      { "@type": "PropertyValue", name: "Lineage", value: strain.lineage },
      {
        "@type": "PropertyValue",
        name: "Dominant Terpenes",
        value: strain.dominantTerpenes.join(", ")
      }
    ]
  };

  const others = strains.filter((s) => s.slug !== strain.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-8xl px-6 pb-16 pt-28 lg:px-12 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <p className="eyebrow text-verde-glow">{typeLabel[strain.type]} · {strain.cultivar === "in-house" ? "DVF Original" : strain.cultivar}</p>
              <h1 className="mt-8 font-display text-7xl leading-[0.95] tracking-tightest md:text-9xl">
                {strain.name}
              </h1>
              <p className="mt-8 max-w-2xl font-display text-2xl italic leading-snug text-verde-glow md:text-3xl">
                {strain.tagline}
              </p>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-bone/80">
                {strain.notes}
              </p>

              <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-bone/15 pt-8 md:grid-cols-4">
                <Spec label="THC" value={strain.thc} />
                <Spec label="Type" value={typeLabel[strain.type]} />
                <Spec label="Lineage" value={strain.lineage} small />
                <Spec
                  label="Dominant Terpenes"
                  value={strain.dominantTerpenes.join(" · ")}
                  small
                />
              </dl>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-5">
              <div className="aspect-[4/5] w-full overflow-hidden border border-bone/15">
                <StrainHeroArt slug={strain.slug} type={strain.type} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Effects</p>
              <ul className="mt-6 space-y-3">
                {strain.effects.map((e) => (
                  <li key={e} className="border-b border-ink/10 pb-3 font-display text-2xl tracking-tightest text-ink">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4">
              <p className="eyebrow">Flavor</p>
              <ul className="mt-6 space-y-3">
                {strain.flavors.map((f) => (
                  <li key={f} className="border-b border-ink/10 pb-3 font-display text-2xl tracking-tightest text-ink">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4">
              <p className="eyebrow">Lab data</p>
              <div className="mt-6 border border-ink/10 bg-bone-warm p-6">
                <p className="font-display text-3xl tracking-tightest text-ink">{strain.thc}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink/60">Total THC · current batch</p>
                <div className="mt-6 hairline" />
                <p className="mt-4 text-sm text-ink/70">
                  Full COA available on request. The public lab-results library is coming with the
                  next site update.
                </p>
                <Link href="/contact" className="btn-ghost mt-6 text-[11px]">
                  Request COA →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-verde py-20 text-bone lg:py-24">
        <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-between gap-6 px-6 lg:px-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-bone/70">Find this strain</p>
            <p className="mt-3 font-display text-3xl tracking-tightest md:text-4xl">
              {strain.name} drops at NM dispensaries in limited batches.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/find-us" className="btn bg-bone text-ink hover:bg-bone-warm text-[11px]">
              Find a dispensary
            </Link>
            <Link href="/wholesale" className="btn-ghost-bone text-[11px]">
              Carry it →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <p className="eyebrow">Also in rotation</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {others.map((s) => (
              <StrainCard key={s.slug} strain={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Spec({ label, value, small = false }: { label: string; value: string; small?: boolean }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.24em] text-bone/50">{label}</dt>
      <dd
        className={`mt-3 font-display tracking-tightest text-bone ${small ? "text-base" : "text-3xl"}`}
      >
        {value}
      </dd>
    </div>
  );
}

function StrainHeroArt({ slug, type }: { slug: string; type: "indica" | "sativa" | "hybrid" }) {
  const palette = {
    indica: ["#0A0A0A", "#2C4A2A", "#4A6741"],
    sativa: ["#0A0A0A", "#7DA15F", "#A8C290"],
    hybrid: ["#0A0A0A", "#4A6741", "#7DA15F"]
  } as const;
  const [c1, c2, c3] = palette[type];
  return (
    <svg viewBox="0 0 400 500" className="h-full w-full" role="img" aria-label="Strain placeholder artwork">
      <defs>
        <radialGradient id={`hero-art-${slug}`} cx="50%" cy="55%" r="70%">
          <stop offset="0%" stopColor={c3} stopOpacity="0.95" />
          <stop offset="50%" stopColor={c2} />
          <stop offset="100%" stopColor={c1} />
        </radialGradient>
        <filter id={`hero-art-grain-${slug}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={slug.length} />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 0" />
        </filter>
      </defs>
      <rect width="400" height="500" fill={`url(#hero-art-${slug})`} />
      <rect width="400" height="500" filter={`url(#hero-art-grain-${slug})`} />
    </svg>
  );
}
