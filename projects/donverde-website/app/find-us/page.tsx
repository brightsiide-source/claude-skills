import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find Us",
  description:
    "Find Don Verde Farms cannabis at New Mexico dispensaries. Soon available direct via Doorhash."
};

interface Stocking {
  city: string;
  shops: { name: string; href?: string }[];
}

const stocking: Stocking[] = [
  {
    city: "Albuquerque",
    shops: [
      { name: "Happy Panda Cannabis Co.", href: "https://myhappypanda.com" },
      { name: "Stocking dispensary #2 — coming" },
      { name: "Stocking dispensary #3 — coming" }
    ]
  },
  {
    city: "Las Cruces",
    shops: [
      { name: "Stocking dispensary — coming" }
    ]
  },
  {
    city: "Santa Fe",
    shops: [
      { name: "Stocking dispensary — coming" }
    ]
  },
  {
    city: "Roswell",
    shops: [
      { name: "Stocking dispensary — coming" }
    ]
  }
];

export default function FindUsPage() {
  return (
    <>
      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-8xl px-6 pb-16 pt-28 lg:px-12 lg:pb-24">
          <p className="eyebrow text-gold-glow">Find Don Verde</p>
          <h1 className="mt-8 max-w-5xl font-display text-7xl leading-[0.95] tracking-tightest md:text-9xl">
            Where the flower lives.
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-bone/80">
            Don Verde Farms is hand-placed at New Mexico dispensaries on a limited drop schedule.
            Until Doorhash &mdash; our own retail home, built around the brand &mdash; opens its
            doors, this is where to find us.
          </p>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Stocking dispensaries</p>
              <h2 className="mt-4 font-display text-5xl leading-[1.02] tracking-tightest text-ink md:text-6xl">
                By city.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink/70">
                We update this list every drop. If your dispensary should be on it, the wholesale
                inquiry form gets you to us in under a minute.
              </p>
              <Link href="/wholesale" className="btn-gold mt-8 text-[11px]">
                Wholesale inquiry
              </Link>
            </div>

            <div className="lg:col-span-8 space-y-10">
              {stocking.map((s) => (
                <div key={s.city} className="border-t border-ink/10 pt-8">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-gold">{s.city}</p>
                  <ul className="mt-4 space-y-3">
                    {s.shops.map((shop) => (
                      <li key={shop.name} className="flex items-baseline justify-between gap-6 border-b border-ink/10 pb-3">
                        <span className="font-display text-2xl tracking-tightest text-ink">
                          {shop.name}
                        </span>
                        {shop.href ? (
                          <a
                            href={shop.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-deep"
                          >
                            Visit →
                          </a>
                        ) : (
                          <span className="text-[10px] uppercase tracking-[0.18em] text-ink/40">
                            Soon
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-verde py-24 text-bone lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="text-[10px] uppercase tracking-[0.28em] text-bone/70">Coming soon</p>
              <h2 className="mt-6 font-display text-5xl leading-[1.02] tracking-tightest md:text-7xl">
                Doorhash.
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/85">
                Our own retail home, built around Don Verde flower. Rewards, drop alerts,
                direct-from-the-farm fulfillment. Currently in private preview.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <a
                href="https://clever-dieffenbachia-a4bf74.netlify.app/rewards"
                target="_blank"
                rel="noreferrer noopener"
                className="btn bg-bone text-ink hover:bg-bone-warm text-[11px]"
              >
                Preview Doorhash →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
