import type { Metadata } from "next";
import { strains } from "@/content/strains";
import { StrainCard } from "@/components/strain-card";

export const metadata: Metadata = {
  title: "Strains",
  description:
    "Don Verde Farms strain catalog — indoor-grown, lab-verified cannabis from Southern New Mexico. Lineage, terpenes, and effects for every cultivar in rotation."
};

export default function StrainsPage() {
  const indica = strains.filter((s) => s.type === "indica");
  const sativa = strains.filter((s) => s.type === "sativa");
  const hybrid = strains.filter((s) => s.type === "hybrid");

  return (
    <>
      <section className="bg-ink py-24 text-bone lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <p className="eyebrow text-verde-glow">The catalog</p>
          <h1 className="mt-6 font-display text-6xl leading-[1] tracking-tightest md:text-8xl">
            Strains in rotation.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/75">
            Six cultivars, indoor-grown, slow-cured. Every page lists lineage, dominant terpenes,
            effect profile, and a current COA. Scroll the floor or jump by classification.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#hybrid" className="btn-ghost-bone text-[11px]">Hybrid</a>
            <a href="#indica" className="btn-ghost-bone text-[11px]">Indica</a>
            <a href="#sativa" className="btn-ghost-bone text-[11px]">Sativa</a>
          </div>
        </div>
      </section>

      <StrainSection id="hybrid" title="Hybrid" strains={hybrid} />
      <StrainSection id="indica" title="Indica" strains={indica} tone="warm" />
      <StrainSection id="sativa" title="Sativa" strains={sativa} />
    </>
  );
}

function StrainSection({
  id,
  title,
  strains,
  tone = "default"
}: {
  id: string;
  title: string;
  strains: typeof import("@/content/strains").strains;
  tone?: "default" | "warm";
}) {
  if (strains.length === 0) return null;

  return (
    <section
      id={id}
      className={`py-24 lg:py-32 ${tone === "warm" ? "bg-bone-warm" : "bg-bone"}`}
    >
      <div className="mx-auto max-w-8xl px-6 lg:px-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Classification</p>
            <h2 className="mt-4 font-display text-5xl tracking-tightest text-ink md:text-6xl">
              {title}
            </h2>
          </div>
          <p className="hidden text-sm text-ink/50 md:block">
            {strains.length} cultivar{strains.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {strains.map((s) => (
            <StrainCard key={s.slug} strain={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
