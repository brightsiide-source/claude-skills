import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { BreadcrumbJsonLd, SpeakableJsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: { absolute: "DoorHash vs Top Crop Cannabis — New Mexico Comparison" },
  description:
    "DoorHash vs Top Crop Cannabis: side-by-side of NM cannabis delivery, retail locations, cultivation, loyalty, and brand differences in Las Cruces and beyond.",
  alternates: { canonical: "/vs/top-crop" },
};

const rows = [
  ["Founded", "2025 (delivery launch)", "2018 (Oregon launch)"],
  ["Headquarters", "Las Cruces, NM", "Eugene, OR / Albuquerque, NM"],
  ["States operating", "New Mexico (Southern)", "New Mexico, Oregon"],
  ["Retail stores", "1 flagship (Las Cruces, opening 2026)", "6 (3 NM, 3 OR)"],
  ["Delivery service", "Yes — primary channel", "Limited / pickup-first"],
  ["NM cities served (delivery)", "Las Cruces", "Local pickup zones around Albuquerque, Sunland Park, Las Cruces stores"],
  ["Average delivery ETA", "30 to 55 minutes", "Pickup-only at most locations"],
  ["Order minimum (delivery)", "$50", "N/A (pickup)"],
  ["Free delivery threshold", "$100+", "N/A"],
  ["Owns its cultivation", "Yes — Don Verde Farms (indoor, Southern NM)", "No — sources from various cultivators"],
  ["House brand flower", "Don Verde Farms (seed-to-door provenance)", "No house cultivation brand"],
  ["Menu platform", "Dutchie", "Dutchie"],
  ["Loyalty program", "Hash Pass (3 tiers)", "Chron Club Rewards"],
  ["Payment methods", "Cash, debit on delivery", "Cash, debit at register"],
  ["Brand positioning", "Vertically-integrated craft delivery", "Largest selection in NM"],
  ["Mobile app", "Web-based (PWA roadmap)", "No native app"],
];

const summary = `DoorHash and Top Crop Cannabis are both cannabis brands operating in Las Cruces, New Mexico, but they differ fundamentally in business model. Top Crop is a multi-store retail chain — the largest in New Mexico with locations in Albuquerque, Sunland Park, and Las Cruces, plus three Oregon locations. Top Crop's strength is selection and physical retail scale.

DoorHash is the retail and delivery arm of Don Verde Farms, an indoor cannabis cultivator in Southern New Mexico. DoorHash's strength is vertical integration — owning the cannabis farm, the delivery network, and (opening 2026) the retail experience under one brand. This means every DoorHash flower order can ship with seed-to-door provenance: customers know exactly which Don Verde Farms lot their flower came from, when it was harvested, and how long it cured.

For Las Cruces customers, the practical difference is delivery vs pickup. Top Crop's Las Cruces store is a traditional retail dispensary; you visit, browse, and check out in person. DoorHash delivers cannabis directly to your door with an average ETA of 30 to 55 minutes — order minimum is $50, free delivery on orders of $100 or more.`;

export default function VsTopCropPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Comparisons", url: "/vs" },
          { name: "vs Top Crop Cannabis", url: "/vs/top-crop" },
        ]}
      />
      <SpeakableJsonLd cssSelector={["#summary", "#table"]} />

      <PageHeader
        eyebrow="DoorHash vs"
        title="DoorHash vs Top Crop Cannabis."
        description="Side-by-side: New Mexico cannabis delivery, retail, cultivation ownership, loyalty programs, and brand differences."
      />

      <section id="summary" className="relative surface-dark pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 space-y-6">
          {summary.split("\n\n").map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-white/85 text-lg leading-relaxed text-pretty">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="table" className="relative surface-dark pb-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-white mb-8 text-balance">
              Side-by-side <span className="text-leaf-300">comparison.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-3xl card-dark overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-leaf-500/15 border-b border-leaf-400/30">
                    <th className="text-left p-4 text-leaf-200 font-bold uppercase tracking-wider text-xs">
                      Feature
                    </th>
                    <th className="text-left p-4 text-leaf-300 font-bold">DoorHash</th>
                    <th className="text-left p-4 text-white/85 font-bold">Top Crop</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([feature, doorhash, topcrop], i) => (
                    <tr
                      key={feature}
                      className={
                        i % 2 === 0
                          ? "border-b border-white/5"
                          : "border-b border-white/5 bg-white/[0.02]"
                      }
                    >
                      <td className="p-4 text-white/65 font-medium align-top">{feature}</td>
                      <td className="p-4 text-leaf-200 align-top">{doorhash}</td>
                      <td className="p-4 text-white/75 align-top">{topcrop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative surface-dark pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-white mb-6 text-balance">
              Which should you choose?
            </h2>
            <p className="text-white/85 leading-relaxed text-pretty mb-4">
              <strong className="text-leaf-300">Choose Top Crop if:</strong> You prefer browsing
              in-person, you want the widest possible selection of partner brands, or you&apos;re in
              Albuquerque or other parts of New Mexico where DoorHash doesn&apos;t yet deliver.
            </p>
            <p className="text-white/85 leading-relaxed text-pretty">
              <strong className="text-leaf-300">Choose DoorHash if:</strong> You want cannabis
              delivered to your door in 30 to 55 minutes, you value cultivation provenance and
              owning your own grow operation, or you live within a 5 to 10 mile radius of
              Las Cruces 88007 and don&apos;t want to drive to a dispensary.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative surface-dark py-16 pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <div className="rounded-3xl card-dark-leaf p-10 text-center">
              <h2 className="text-display-3 font-display text-white mb-4">Try DoorHash today.</h2>
              <p className="text-white/75 mb-8 text-pretty">
                Same-day cannabis delivery across Southern New Mexico. Free over $100.
              </p>
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-leaf-500 hover:bg-leaf-400 text-black font-bold px-7 py-4 transition-colors shadow-glow-leaf"
              >
                Shop the menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
