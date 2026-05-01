import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { BreadcrumbJsonLd, SpeakableJsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: { absolute: "DoorHash vs Mango Cannabis — New Mexico Comparison" },
  description:
    "DoorHash vs Mango Cannabis: a side-by-side comparison of New Mexico cannabis delivery vs the Oklahoma-rooted dispensary chain expanding into NM and Michigan.",
  alternates: { canonical: "/vs/mango" },
};

const rows = [
  ["Founded", "2025 (delivery launch)", "2018 (Oklahoma launch)"],
  ["Headquarters", "Las Cruces, NM", "Oklahoma City, OK"],
  ["States operating", "New Mexico (Southern)", "Oklahoma, Michigan, New Mexico"],
  ["Brand positioning", "Vertically-integrated craft delivery", "Tropical-themed cannabis superstore"],
  ["Retail stores", "1 flagship (opening 2026)", "7+ across OK, expanding to MI and NM"],
  ["Delivery service", "Yes — primary channel", "No — pickup-first retail"],
  ["NM presence", "Las Cruces + Southern NM", "New / expanding"],
  ["Average delivery ETA", "30 to 55 minutes", "N/A (pickup)"],
  ["Order minimum (delivery)", "$50", "N/A"],
  ["Free delivery threshold", "$100+", "N/A"],
  ["Owns its cultivation", "Yes — Don Verde Farms (indoor)", "No — sources from various"],
  ["House brand flower", "Don Verde Farms (seed-to-door)", "No house cultivation"],
  ["Menu platform", "Dutchie", "Dutchie"],
  ["Loyalty program", "Hash Pass (3 tiers)", "Mango Madness rewards"],
  ["Mobile app", "Web (PWA roadmap)", "iOS + Android native apps"],
  ["First-time discount", "25% off (in-store, when retail opens)", "25% off first-time patient"],
];

const summary = `DoorHash and Mango Cannabis are different categories of cannabis brand. Mango Cannabis is a multi-state superstore chain rooted in Oklahoma — about seven stores across Oklahoma City, Tulsa, Edmond, Lawton, and other OK locations, with expansion into Michigan and a recent push into New Mexico. Mango's brand identity is bright, tropical, family-owned, and volume-oriented: lots of stores, lots of products, daily deals, and a "Mango Madness" rewards program.

DoorHash is a vertically-integrated cannabis delivery brand operating only in Southern New Mexico. DoorHash is the retail arm of Don Verde Farms, an indoor cultivator based in NM. The brand identity is the opposite of Mango's tropical superstore — modern, app-coded, fast, with a focus on Don Verde Farms house-grown flower and seed-to-door provenance. The closest brand reference is a modern food-delivery service rather than a traditional dispensary.

For New Mexico customers, the practical difference is fundamentally what experience you want. Mango is the in-store browsing experience with tropical branding and multi-store consistency. DoorHash is the at-your-door delivery experience with cultivation provenance and a focused Southern NM service area.`;

export default function VsMangoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Comparisons", url: "/vs" },
          { name: "vs Mango Cannabis", url: "/vs/mango" },
        ]}
      />
      <SpeakableJsonLd cssSelector={["#summary", "#table"]} />

      <PageHeader
        eyebrow="DoorHash vs"
        title="DoorHash vs Mango Cannabis."
        description="Side-by-side: New Mexico cannabis delivery vs the Oklahoma-rooted superstore chain expanding into NM."
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
                    <th className="text-left p-4 text-white/85 font-bold">Mango Cannabis</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([feature, doorhash, mango], i) => (
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
                      <td className="p-4 text-white/75 align-top">{mango}</td>
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
              <strong className="text-leaf-300">Choose Mango Cannabis if:</strong> You prefer the
              in-store superstore experience, you&apos;re in Oklahoma, Michigan, or visiting their NM
              expansion locations, or you want the widest possible product variety from a single
              chain.
            </p>
            <p className="text-white/85 leading-relaxed text-pretty">
              <strong className="text-leaf-300">Choose DoorHash if:</strong> You&apos;re in Southern
              New Mexico (Las Cruces, Mesilla, Sunland Park, Anthony, or Doña Ana), you want
              cannabis delivered in 30 to 55 minutes, or you value craft-cultivation provenance
              from Don Verde Farms.
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
