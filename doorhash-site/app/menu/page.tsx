import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata = {
  title: { absolute: "Cannabis Menu — Order Online for Delivery | DoorHash NM" },
  description:
    "Browse the DoorHash cannabis menu. Live inventory of flower, vapes, edibles, and concentrates. Same-day delivery in Las Cruces (88007 + 5-10 mile radius).",
  alternates: { canonical: "/menu" },
};

const categories = [
  {
    name: "Flower",
    body: "House-grown Don Verde Farms strains plus a rotating roster of partner brands. Indica, sativa, and hybrid eighths, halves, and full ounces.",
  },
  {
    name: "Pre-rolls",
    body: "Single joints, infused pre-rolls, and curated multi-packs. Solventless rosin and live-resin infused options updated weekly.",
  },
  {
    name: "Vapes",
    body: "Live-resin and distillate carts from Kurvana, Canndescent, and other premium brands. 510-thread and proprietary pod systems available.",
  },
  {
    name: "Edibles",
    body: "Gummies, chocolates, beverages, and tinctures. THC, CBD, and balanced ratios — micro-dose 5mg pieces all the way to 100mg packs.",
  },
  {
    name: "Concentrates",
    body: "Live rosin, hash, badder, sauce, and RSO. Solventless options grown and processed in New Mexico under our Don Verde label.",
  },
  {
    name: "Accessories",
    body: "Glass, papers, batteries, and merch. Everything you need to enjoy what you ordered, delivered alongside it.",
  },
];

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live menu"
        title="Shop the full menu"
        description={`Real-time inventory, powered by Dutchie. Same-day delivery across ${site.region}.`}
      />

      <section className="relative surface-dark pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="rounded-3xl card-dark overflow-hidden">
            <iframe
              src={site.dutchie.embedUrl}
              title="DoorHash cannabis menu — live inventory"
              className="w-full h-[1400px] border-0"
              loading="lazy"
            />
          </div>
          <p className="mt-8 text-center text-white/55 text-sm">
            Trouble loading the menu?{" "}
            <a href={site.dutchie.embedUrl} className="text-leaf-300 hover:underline font-semibold">
              Open it in a new tab.
            </a>
          </p>
        </div>
      </section>

      <section className="relative surface-dark py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-white mb-4 text-balance">
              What&apos;s on the <span className="text-leaf-300">DoorHash menu.</span>
            </h2>
            <p className="text-white/70 max-w-2xl text-pretty mb-12">
              Our cannabis menu rotates with the harvest. House-grown Don Verde Farms flower
              anchors the catalog, complemented by a curated lineup of partner brands we trust
              and personally vet. Inventory and pricing update in real time — the menu you see
              is the menu in stock.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.05}>
                <div className="rounded-3xl card-dark p-8 h-full">
                  <h3 className="font-display text-white text-2xl font-bold mb-3">{c.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed text-pretty">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative surface-dark py-16 pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <div className="rounded-3xl card-dark-leaf p-10 text-center">
              <h2 className="text-display-3 font-display text-white mb-4">
                Delivery, pickup, and in-store coming soon.
              </h2>
              <p className="text-white/70 mb-8 text-pretty">
                Right now, every DoorHash order is delivered to your door in Las Cruces, NM
                (88007 plus a 5 to 10 mile radius). Average ETA is {site.delivery.avgEta}. Our
                flagship retail dispensary opens in Las Cruces in 2026 — until then, your couch
                is our counter.
              </p>
              <Link
                href="/delivery"
                className="inline-flex items-center gap-2 rounded-full bg-leaf-500 hover:bg-leaf-400 text-black font-bold px-7 py-3 transition-colors"
              >
                See delivery zones
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
