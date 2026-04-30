import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { strains } from "@/content/strains";

export const metadata: Metadata = {
  title: "Lab Results & COAs",
  description:
    "Don Verde Farms lab transparency. Every batch is third-party tested for cannabinoids, terpenes, residual solvents, microbials, and heavy metals. Public COA library coming with the next site update.",
  alternates: { canonical: "https://donverdefarms.com/lab-results" }
};

export default function LabResultsPage() {
  return (
    <>
      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-8xl px-6 pb-16 pt-28 lg:px-12 lg:pb-24">
          <Breadcrumbs
            tone="dark"
            trail={[{ label: "Home", href: "/" }, { label: "Lab Results" }]}
          />
          <p className="eyebrow mt-10 text-gold-glow">Transparency</p>
          <h1 className="mt-6 max-w-5xl font-display text-7xl leading-[0.95] tracking-tightest md:text-9xl">
            Lab results.
          </h1>
          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-bone/80">
            Every Don Verde batch is third-party tested before it leaves the farm. We test for
            cannabinoid potency, terpene profile, residual solvents, microbials, pesticides, and
            heavy metals through NM-licensed cannabis labs. The public COA library is coming with
            the next site update; until then, request the current COA for any cultivar by email.
          </p>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <p className="eyebrow">What gets tested</p>
          <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] tracking-tightest text-ink md:text-6xl">
            The full panel, every batch.
          </h2>

          <div className="mt-12 grid gap-px border border-ink/10 md:grid-cols-2 lg:grid-cols-3">
            <Panel
              kicker="01"
              title="Cannabinoid potency"
              body="Total THC, total CBD, and the minor cannabinoid profile (CBG, CBN, CBC). HPLC analysis."
            />
            <Panel
              kicker="02"
              title="Terpene profile"
              body="Full quantitative breakdown of dominant and secondary terpenes. The number that actually predicts the experience."
            />
            <Panel
              kicker="03"
              title="Residual solvents"
              body="N/A for our flower (we don't extract on-site), but tested as part of the full compliance panel for any concentrate work."
            />
            <Panel
              kicker="04"
              title="Microbials"
              body="Yeast, mold, E. coli, salmonella. NM regulatory thresholds and below."
            />
            <Panel
              kicker="05"
              title="Pesticides"
              body="Full pesticide panel screening. Don Verde Farms uses no synthetic pesticides — IPM only."
            />
            <Panel
              kicker="06"
              title="Heavy metals"
              body="Lead, arsenic, cadmium, mercury. Indoor cultivation in a controlled medium produces consistently clean panels."
            />
          </div>
        </div>
      </section>

      <section className="bg-bone-warm py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <p className="eyebrow">Cultivar library</p>
          <h2 className="mt-4 font-display text-5xl tracking-tightest text-ink md:text-6xl">
            Request a COA.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/75">
            Below is the current cultivar list. The full per-batch COA library publishes here in
            the next site update; until then, email{" "}
            <a
              href="mailto:info@donverdefarms.com"
              className="text-gold hover:text-gold-deep"
            >
              info@donverdefarms.com
            </a>{" "}
            with the strain name and we&rsquo;ll send the most recent batch report directly.
          </p>

          <div className="mt-12 overflow-hidden border border-ink/10">
            <table className="w-full text-left">
              <thead className="bg-ink text-bone">
                <tr>
                  <Th>Cultivar</Th>
                  <Th>Type</Th>
                  <Th>THC</Th>
                  <Th>Dominant terpenes</Th>
                  <Th align="right">COA</Th>
                </tr>
              </thead>
              <tbody className="bg-bone">
                {strains.map((s) => (
                  <tr key={s.slug} className="border-t border-ink/10">
                    <Td>
                      <Link href={`/strains/${s.slug}`} className="font-display text-xl tracking-tightest text-ink hover:text-gold">
                        {s.name}
                      </Link>
                    </Td>
                    <Td>
                      <span className="text-sm capitalize text-ink/70">{s.type}</span>
                    </Td>
                    <Td>
                      <span className="font-display text-lg text-gold">{s.thc}</span>
                    </Td>
                    <Td>
                      <span className="text-sm text-ink/70">{s.dominantTerpenes.join(" · ")}</span>
                    </Td>
                    <Td align="right">
                      <a
                        href={`mailto:info@donverdefarms.com?subject=COA%20Request%20-%20${encodeURIComponent(s.name)}`}
                        className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-deep"
                      >
                        Request →
                      </a>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-bone lg:py-24">
        <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-between gap-6 px-6 lg:px-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-bone/60">License</p>
            <p className="mt-3 font-display text-3xl tracking-tightest md:text-4xl">
              CCD-VICE-2023-0010 · NM Cannabis Control Division
            </p>
          </div>
          <Link href="/wholesale" className="btn-gold text-[11px]">
            Wholesale inquiry
          </Link>
        </div>
      </section>
    </>
  );
}

function Panel({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="bg-bone p-8">
      <p className="font-display text-3xl tracking-tightest text-gold">{kicker}</p>
      <h3 className="mt-4 font-display text-2xl tracking-tightest text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">{body}</p>
    </div>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      scope="col"
      className={`px-6 py-4 text-[10px] uppercase tracking-[0.22em] text-bone/70 ${
        align === "right" ? "text-right" : ""
      }`}
    >
      {children}
    </th>
  );
}

function Td({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return <td className={`px-6 py-5 ${align === "right" ? "text-right" : ""}`}>{children}</td>;
}
