import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, getCity } from "@/content/cities";
import { strains } from "@/content/strains";
import { StrainCard } from "@/components/strain-card";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface Props {
  params: { city: string };
}

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const city = getCity(params.city);
  if (!city) return {};
  return {
    title: `Where to Buy Don Verde Farms in ${city.name}, NM`,
    description: `Find Don Verde Farms craft indoor cannabis in ${city.name}, ${city.region}. Stocking dispensaries, market notes, and direct wholesale contact for ${city.county} retailers.`,
    alternates: { canonical: `https://donverdefarms.com/find-us/${city.slug}` }
  };
}

const typeLabel = { indica: "Indica", sativa: "Sativa", hybrid: "Hybrid" } as const;

export default function CityPage({ params }: Props) {
  const city = getCity(params.city);
  if (!city) notFound();

  const featured = strains.slice(0, 3);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Don Verde Farms — ${city.name}`,
    description: `Don Verde Farms craft cannabis available at dispensaries in ${city.name}, NM.`,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "State", name: "New Mexico" }
    },
    url: `https://donverdefarms.com/find-us/${city.slug}`,
    parentOrganization: { "@id": "https://donverdefarms.com/#organization" }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-8xl px-6 pb-16 pt-28 lg:px-12 lg:pb-24">
          <Breadcrumbs
            tone="dark"
            trail={[
              { label: "Home", href: "/" },
              { label: "Find Us", href: "/find-us" },
              { label: city.name }
            ]}
          />
          <p className="eyebrow mt-10 text-gold-glow">{city.region}</p>
          <h1 className="mt-6 max-w-5xl font-display text-7xl leading-[0.95] tracking-tightest md:text-9xl">
            Don Verde<br />in <span className="italic text-gold-bright">{city.name}.</span>
          </h1>
          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-bone/80">{city.lede}</p>

          <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-bone/10 pt-8 md:grid-cols-4">
            <Stat label="Region" value={city.region} />
            <Stat label="County" value={city.county} />
            <Stat label="Population" value={city.population} />
            <Stat label="Status" value="Stocking · NM Recreational" />
          </dl>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Where to find us</p>
              <h2 className="mt-4 font-display text-5xl leading-[1.05] tracking-tightest text-ink md:text-6xl">
                Stocking dispensaries in {city.name}.
              </h2>
              <p className="mt-8 text-base leading-relaxed text-ink/75">{city.marketNote}</p>
              <Link href="/wholesale" className="btn-gold mt-10 text-[11px]">
                Carry Don Verde in {city.name} →
              </Link>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {city.stockingShops.map((shop) => (
                <div key={shop.name} className="border border-ink/10 p-8">
                  <p className="font-display text-3xl tracking-tightest text-ink">{shop.name}</p>
                  {shop.note && (
                    <p className="mt-3 text-base leading-relaxed text-ink/70">{shop.note}</p>
                  )}
                  {shop.href && (
                    <a
                      href={shop.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-4 inline-block text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-deep"
                    >
                      Visit dispensary →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-bone lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <p className="eyebrow text-gold-glow">Currently in flower</p>
          <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tightest md:text-6xl">
            What might be on the {city.name} menu.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {featured.map((s) => (
              <StrainCard key={s.slug} strain={s} dark />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-verde py-20 text-bone lg:py-24">
        <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-between gap-6 px-6 lg:px-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-bone/70">Coming soon</p>
            <p className="mt-3 font-display text-3xl tracking-tightest md:text-4xl">
              Order Don Verde direct via Doorhash.
            </p>
          </div>
          <a
            href="https://clever-dieffenbachia-a4bf74.netlify.app/rewards"
            target="_blank"
            rel="noreferrer noopener"
            className="btn bg-bone text-ink hover:bg-bone-warm text-[11px]"
          >
            Preview Doorhash →
          </a>
        </div>
      </section>

      <section className="bg-bone py-20 lg:py-24">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <p className="eyebrow">Other cities</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {cities
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/find-us/${c.slug}`}
                    className="inline-block border border-ink/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink/70 hover:border-gold hover:text-gold"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.28em] text-bone/50">{label}</p>
      <p className="mt-2 font-display text-base tracking-tightest text-bone md:text-lg">{value}</p>
    </div>
  );
}
