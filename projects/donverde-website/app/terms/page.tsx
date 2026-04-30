import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for the Don Verde Farms website. Don Verde Farms is a NM-licensed cannabis cultivator. The site is for adult-use audiences (21+) in compliance with New Mexico law.",
  alternates: { canonical: "https://donverdefarms.com/terms" }
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-4xl px-6 pb-12 pt-28 lg:px-12 lg:pb-16">
          <Breadcrumbs
            tone="dark"
            trail={[{ label: "Home", href: "/" }, { label: "Terms" }]}
          />
          <h1 className="mt-10 font-display text-6xl leading-[0.95] tracking-tightest md:text-7xl">
            Terms of use.
          </h1>
          <p className="mt-6 text-sm uppercase tracking-[0.22em] text-bone/60">
            Last updated: April 30, 2026
          </p>
        </div>
      </section>

      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-10 px-6 text-base leading-relaxed text-ink/85 lg:px-12">
          <Section title="Eligibility">
            <p>
              The Don Verde Farms website (donverdefarms.com) is intended exclusively for users
              who are 21 years of age or older and located in jurisdictions where adult-use
              cannabis is legal. By using the Site, you confirm that you meet these conditions.
              The age verification gate is the operative legal acknowledgment of this fact.
            </p>
          </Section>

          <Section title="Regulatory status">
            <p>
              Don Verde, LLC operates under New Mexico Cannabis Control Division cultivation
              license CCD-VICE-2023-0010. All product references on this Site refer to cannabis
              cultivated and sold within the regulated New Mexico cannabis market in compliance
              with state law.
            </p>
            <p className="mt-4">
              Cannabis remains a Schedule I controlled substance under United States federal
              law. Information on this Site is not intended to encourage or facilitate any
              activity that violates federal law or the laws of any other jurisdiction.
            </p>
          </Section>

          <Section title="No medical advice">
            <p>
              Information published on this Site &mdash; including in the Journal, FAQ, and
              strain pages &mdash; is intended for general informational and product education
              purposes. It is not medical advice. Consult a qualified medical professional for
              health-related questions about cannabis use.
            </p>
          </Section>

          <Section title="No retail sales on this Site">
            <p>
              Don Verde Farms does not sell cannabis directly to consumers through this Site. We
              are a cannabis cultivator selling exclusively to NM-licensed retail dispensaries.
              Retail purchases of Don Verde products take place at licensed NM dispensaries and
              (in the future) through the Doorhash retail platform under separate terms and
              regulatory licenses.
            </p>
          </Section>

          <Section title="Intellectual property">
            <p>
              All content on this Site &mdash; including text, photography, brand marks, strain
              names, graphic design, and the Don Verde Farms wordmark and logo &mdash; is the
              property of Don Verde, LLC and may not be reproduced for commercial purposes
              without written permission. Editorial use with attribution is welcome; please
              email{" "}
              <a href="mailto:info@donverdefarms.com" className="text-gold hover:text-gold-deep">
                info@donverdefarms.com
              </a>
              {" "}
              for press requests.
            </p>
          </Section>

          <Section title="Disclaimers">
            <p>
              The Site is provided &ldquo;as is.&rdquo; While we work to keep all information
              current and accurate &mdash; particularly cultivar details and lab data &mdash;
              actual current-batch specifications may vary. The current per-batch COA is the
              authoritative reference; the published cultivar pages are representative.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:info@donverdefarms.com" className="text-gold hover:text-gold-deep">
                info@donverdefarms.com
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-3xl tracking-tightest text-ink md:text-4xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
