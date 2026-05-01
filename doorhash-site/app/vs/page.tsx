import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: { absolute: "DoorHash vs Top Crop, Mango Cannabis & More | NM Compared" },
  description:
    "Compare DoorHash to Top Crop Cannabis and Mango Cannabis. Delivery zones, ETAs, prices, products, loyalty programs, and brand differences in New Mexico.",
  alternates: { canonical: "/vs" },
};

const comps = [
  {
    slug: "top-crop",
    name: "Top Crop Cannabis",
    summary:
      "Largest dispensary chain in New Mexico, focused on retail-first scale across Albuquerque, Sunland Park, and Las Cruces.",
  },
  {
    slug: "mango",
    name: "Mango Cannabis",
    summary:
      "Multi-state tropical-themed cannabis superstore chain across Oklahoma, Michigan, and New Mexico.",
  },
];

export default function VsIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Comparisons"
        title="DoorHash vs the rest."
        description="Honest, side-by-side comparisons of DoorHash and the other cannabis brands operating in Southern New Mexico."
      />

      <section id="overview" className="relative surface-dark pb-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 space-y-6">
          <Reveal>
            <p className="text-white/85 text-lg leading-relaxed text-pretty">
              <strong className="text-leaf-300">DoorHash</strong> is a cannabis delivery service
              operating across Southern New Mexico — Las Cruces, Mesilla, Sunland Park, Anthony,
              and Doña Ana. The site you&apos;re on right now is the brand and ordering surface;
              the live menu is powered by Dutchie. DoorHash is the retail and delivery arm of
              Don Verde Farms, an indoor cannabis cultivator based in Southern New Mexico.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-white/85 text-lg leading-relaxed text-pretty">
              The two competitors most New Mexico customers compare DoorHash to are Top Crop
              Cannabis and Mango Cannabis. Both are legitimate, established brands. Both serve
              parts of New Mexico. Both use Dutchie for online menus. But they differ from
              DoorHash in important ways — primarily in business model, geographic footprint,
              and whether they own their own cultivation. The honest comparisons below break
              down what each brand does well and which one is the right fit depending on what
              you&apos;re looking for.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/85 text-lg leading-relaxed text-pretty">
              We don&apos;t hide the fact that DoorHash isn&apos;t the right answer for everyone.
              If you&apos;re in Albuquerque, Top Crop probably serves you better today. If
              you&apos;re browsing in-person at an Oklahoma store, Mango is your move. But if
              you&apos;re in Southern New Mexico and you want craft-cultivated cannabis at your
              door in 30 to 55 minutes, DoorHash is the only brand built for that exact use
              case. Read the deep dives to see how the brands compare side-by-side on delivery
              zones, ETAs, prices, products, loyalty programs, cultivation ownership, and
              everything else that matters.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative surface-dark pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-white mb-8 text-balance">
              Pick a <span className="text-leaf-300">comparison.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {comps.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.06}>
                <Link
                  href={`/vs/${c.slug}`}
                  className="block rounded-3xl card-dark p-8 group"
                >
                  <div className="text-leaf-300 text-xs uppercase tracking-widest mb-2 font-bold">
                    DoorHash vs
                  </div>
                  <h3 className="font-display text-white text-3xl font-bold mb-3">{c.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">{c.summary}</p>
                  <span className="inline-flex items-center gap-2 text-leaf-300 font-semibold">
                    Read comparison
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
