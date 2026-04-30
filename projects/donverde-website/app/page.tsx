import Link from "next/link";
import { getFeaturedStrains } from "@/content/strains";
import { StrainCard } from "@/components/strain-card";

export default function HomePage() {
  const featured = getFeaturedStrains();

  return (
    <>
      <Hero />
      <ManifestoBand />
      <FeaturedStrains />
      <FarmStory />
      <BudtenderRail />
      <FindUsCta />
      <WholesaleCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-bone">
      <div className="absolute inset-0 opacity-60">
        <svg className="h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <radialGradient id="hero-glow" cx="65%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#C8A23A" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#5C4810" stopOpacity="0.45" />
              <stop offset="80%" stopColor="#2C4A2A" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <filter id="hero-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
              <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 0" />
            </filter>
          </defs>
          <rect width="1600" height="900" fill="#0A0A0A" />
          <rect width="1600" height="900" fill="url(#hero-glow)" />
          <rect width="1600" height="900" filter="url(#hero-grain)" />
        </svg>
      </div>

      <div className="relative mx-auto flex min-h-[88svh] max-w-8xl flex-col justify-between px-6 pb-16 pt-28 lg:px-12 lg:pt-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-9">
            <p className="eyebrow">Southern New Mexico · Indoor Craft Cannabis</p>
            <h1 className="mt-8 font-display text-[14vw] leading-[0.92] tracking-tightest text-bone md:text-[10vw] lg:text-[8.5vw]">
              The desert<br />
              <span className="italic text-gold-bright">grows quiet.</span><br />
              We answer back.
            </h1>
          </div>

          <div className="flex flex-col justify-end lg:col-span-3">
            <p className="max-w-sm text-base leading-relaxed text-bone/75">
              Operator-owned. No corporate money. Two decades of cultivators turning a patch of
              Southern New Mexico into the most honest flower on a dispensary shelf.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/strains" className="btn-gold text-[11px]">
                See the strains
              </Link>
              <Link href="/wholesale" className="btn-ghost-bone text-[11px]">
                Wholesale →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-bone/10 pt-8">
          <Stat label="License" value="CCD-VICE-2023-0010" />
          <Stat label="Operators with" value="20+ yrs experience" />
          <Stat label="Region" value="Southern NM" />
          <Stat label="Format" value="Indoor · Lab-verified" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.28em] text-bone/50">{label}</p>
      <p className="mt-2 font-display text-lg tracking-tightest text-bone">{value}</p>
    </div>
  );
}

function ManifestoBand() {
  return (
    <section className="border-y border-ink/10 bg-bone-warm">
      <div className="mx-auto max-w-8xl px-6 py-24 lg:px-12 lg:py-32">
        <p className="eyebrow">A note from the farm</p>
        <h2 className="mt-8 max-w-5xl font-display text-5xl leading-[1.05] tracking-tightest text-ink md:text-7xl">
          We don&rsquo;t chase percentages.
          <span className="text-gold"> We chase the smoke.</span>
        </h2>
        <div className="mt-12 grid gap-12 text-base leading-relaxed text-ink/80 md:grid-cols-3">
          <p>
            Twenty years in cannabis taught us what a number on a jar can&rsquo;t. The cure
            matters. The hang matters. The hands matter. We grow indoor, slow, and on our own
            terms — because that&rsquo;s the only way the flower ends up worth talking about.
          </p>
          <p>
            We&rsquo;re three operators with roots split between Southern California and New
            Mexico. We work the rooms ourselves. We answer the phone ourselves. We&rsquo;re not
            answering to a board.
          </p>
          <p>
            Every batch is lab-verified before it leaves the farm. COAs are public. The strains
            are documented down to lineage and dominant terpenes — so the budtender on the floor
            knows exactly what they&rsquo;re recommending. That&rsquo;s the whole job.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturedStrains() {
  const featured = getFeaturedStrains();
  return (
    <section className="bg-ink py-24 text-bone lg:py-32">
      <div className="mx-auto max-w-8xl px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Currently in flower</p>
            <h2 className="mt-6 font-display text-5xl tracking-tightest md:text-6xl">
              Featured strains
            </h2>
          </div>
          <Link href="/strains" className="btn-ghost-bone text-[11px]">
            All strains →
          </Link>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <StrainCard key={s.slug} strain={s} dark />
          ))}
        </div>
      </div>
    </section>
  );
}

function FarmStory() {
  return (
    <section className="bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-8xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">The farm</p>
            <h2 className="mt-6 font-display text-5xl leading-[1.02] tracking-tightest text-ink md:text-6xl">
              A small room in the high desert.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-ink/75">
              Don Verde Farms grows in a tight, climate-controlled indoor facility in Southern
              New Mexico. No outdoor variability. No mass-grow shortcuts. Just three operators,
              one room at a time, and a slow cure that lets the terpenes settle in before
              anything ever makes it to a jar.
            </p>
            <Link href="/the-farm" className="btn-ghost mt-10 text-[11px]">
              The full story →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            <FarmTile label="Cultivar count" value="6" hint="In rotation" />
            <FarmTile label="Cure time" value="21 days" hint="Minimum" tone="gold" />
            <FarmTile label="Lab verified" value="Every batch" hint="Public COAs" tone="verde" />
            <FarmTile label="Founded by" value="3 operators" hint="NM × SoCal" tone="ink" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FarmTile({
  label,
  value,
  hint,
  tone = "default"
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "verde" | "ink" | "gold";
}) {
  const styles = {
    default: "bg-bone-warm text-ink border-ink/10",
    verde: "bg-verde text-bone border-verde",
    gold: "bg-gold text-bone border-gold",
    ink: "bg-ink text-bone border-ink"
  } as const;
  return (
    <div className={`flex aspect-square flex-col justify-between border p-6 ${styles[tone]}`}>
      <p className="text-[10px] uppercase tracking-[0.24em] opacity-70">{label}</p>
      <div>
        <p className="font-display text-5xl leading-none tracking-tightest md:text-6xl">{value}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] opacity-70">{hint}</p>
      </div>
    </div>
  );
}

function BudtenderRail() {
  const items = [
    { k: "01", h: "Lineage on every page", b: "Genetics, not vibes. Every strain page lists parent crosses, dominant terpenes, and effect profile." },
    { k: "02", h: "COAs you can actually find", b: "A public lab-results library. Pull batch data without filing a request or waiting on a rep." },
    { k: "03", h: "Talk-tracks for the floor", b: "Concise, terpene-driven recommendations your budtenders can hand to a customer in twenty seconds." }
  ];
  return (
    <section className="bg-verde-deep py-24 text-bone lg:py-32">
      <div className="mx-auto max-w-8xl px-6 lg:px-12">
        <p className="eyebrow text-gold-glow">Built for budtenders</p>
        <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tightest md:text-6xl">
          The brand your floor staff actually wants to recommend.
        </h2>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.k} className="border-t border-bone/15 pt-6">
              <p className="font-display text-3xl tracking-tightest text-gold-glow">{it.k}</p>
              <h3 className="mt-4 font-display text-2xl tracking-tightest">{it.h}</h3>
              <p className="mt-4 text-sm leading-relaxed text-bone/75">{it.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FindUsCta() {
  return (
    <section className="bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-8xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Find Don Verde</p>
            <h2 className="mt-6 font-display text-5xl leading-[1.02] tracking-tightest text-ink md:text-7xl">
              Stocked at NM&rsquo;s best-curated dispensaries.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/75">
              Don Verde flower is hand-placed at dispensaries across the state. Soon, every jar
              will be available direct through Doorhash — our retail home, built around the
              brand.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Link href="/find-us" className="btn-primary text-[11px]">
              Find a dispensary
            </Link>
            <a
              href="https://clever-dieffenbachia-a4bf74.netlify.app/rewards"
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost text-[11px]"
            >
              Doorhash (preview) →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function WholesaleCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-bone lg:py-32">
      <div className="absolute inset-0 opacity-40" aria-hidden>
        <svg viewBox="0 0 1600 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="ws-grad" x1="0" x2="1">
              <stop offset="0%" stopColor="#5C4810" />
              <stop offset="55%" stopColor="#2C4A2A" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
          <rect width="1600" height="600" fill="url(#ws-grad)" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-8xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <p className="eyebrow text-gold-glow">For dispensary buyers</p>
            <h2 className="mt-6 font-display text-5xl leading-[1.02] tracking-tightest md:text-7xl">
              Carry Don Verde.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/75">
              Limited drops. Operator-direct fulfillment. No middlemen, no white-label nonsense.
              Tell us your shop and we&rsquo;ll get back to you within two business days.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link href="/wholesale" className="btn-gold text-[11px]">
              Open a wholesale account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
