import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList, faqPageSchema, type FaqItem } from "@/components/faq-list";

export const metadata: Metadata = {
  title: "FAQ — Wholesale, Lab Testing, Doorhash & More",
  description:
    "Answers to the most common questions about Don Verde Farms — how to open a wholesale account, lab testing and COA access, drop schedule, and the upcoming Doorhash retail platform.",
  alternates: { canonical: "https://donverdefarms.com/faq" }
};

const wholesaleFaqs: FaqItem[] = [
  {
    q: "How do I open a wholesale account with Don Verde Farms?",
    a: "Submit the wholesale inquiry form with your NM cultivation or retail license number, your dispensary information, and an estimate of your monthly volume. We verify license status and respond within two business days. We sell exclusively to NM-licensed dispensaries — no out-of-state, no consumer wholesale."
  },
  {
    q: "What's the minimum order?",
    a: "We work in pound and half-pound increments. Smaller introductory drops are available for new dispensary partners who want to floor-test the line before committing to a full order. Contact us to discuss what works for your shop."
  },
  {
    q: "Are deliveries handled in-house or via a third party?",
    a: "Don Verde Farms handles its own logistics within New Mexico under the cultivation license. No middlemen, no white-label distribution. Our team meets your buyer or receiver directly with proper manifest documentation."
  },
  {
    q: "Do you sell out-of-state or to non-licensed buyers?",
    a: "No. We are a New Mexico-licensed cannabis cultivator and we sell only to NM-licensed dispensaries. We do not ship out of state. We do not sell direct to consumers under the cultivation license."
  }
];

const productFaqs: FaqItem[] = [
  {
    q: "Where can I see lab results / COAs for current batches?",
    a: "Every batch is third-party lab tested for cannabinoids, terpenes, residual solvents, microbials, and heavy metals before it ships. The public COA library is being launched with the next site update; until then, request a COA via the contact page or directly from your dispensary buyer and we'll send the current batch report."
  },
  {
    q: "Why is THC percentage relatively consistent across the line?",
    a: "We grow for terpene expression, smooth smoke, and consistent effect — not for chasing the highest THC number. Most of our cultivars come in between 26% and 30% total THC, which is a craft-tier range. Numbers higher than that are often achievable but typically come at the cost of cure time, terpene preservation, or intentional flavor work — none of which we're willing to compromise."
  },
  {
    q: "How long is your cure?",
    a: "Twenty-one days minimum. Some cultivars get more — Mesilla Mintz typically gets 28 days. Nothing leaves the room before chlorophyll has fully broken down and the strain expression has stabilized. There's a deeper write-up of our cure process in the Journal."
  },
  {
    q: "Are your strains in-house genetics or licensed cultivars?",
    a: "Both. Several of our strains are Don Verde-original phenotype hunts — Rio Grande Runtz, High Desert Haze, Javelina Jelly. Others are classic genetics we've cultivated to expression that we're proud to put our name on. Every strain page lists the lineage."
  }
];

const operationsFaqs: FaqItem[] = [
  {
    q: "Are you the same company as Doorhash?",
    a: "Don Verde Farms (cultivation) and Doorhash (retail platform) are sibling operations under the same founding team. Don Verde grows the flower; Doorhash is the upcoming consumer retail home. They are licensed and operated as separate entities consistent with NM cannabis regulation."
  },
  {
    q: "When does Doorhash launch?",
    a: "Doorhash is currently in private preview. A public launch date will be announced via our Instagram and the homepage when state and operational readiness allow. Until then, dispensary partners listed on the Find Us pages are how to get Don Verde flower."
  },
  {
    q: "Do you offer budtender training?",
    a: "Yes. We provide printed talk-track cards for each cultivar, optional in-shop staff training sessions for stocking dispensaries, and we publish terpene primers and strain education in the Journal. Reach out via the wholesale form for a training visit."
  },
  {
    q: "What's your NM license number?",
    a: "Don Verde Farms holds NM cultivation license CCD-VICE-2023-0010, issued by the New Mexico Cannabis Control Division. The license is current and verifiable through the NM CCD public license database."
  },
  {
    q: "Where is the farm located?",
    a: "Southern New Mexico. We don't publish the precise facility address publicly for security reasons consistent with NM cultivation licensing best practice. Verified wholesale partners receive the receiving address as part of the onboarding."
  }
];

const allFaqs = [...wholesaleFaqs, ...productFaqs, ...operationsFaqs];

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(allFaqs)) }}
      />

      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-8xl px-6 pb-16 pt-28 lg:px-12 lg:pb-24">
          <Breadcrumbs
            tone="dark"
            trail={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
          />
          <p className="eyebrow mt-10 text-gold-glow">Common questions</p>
          <h1 className="mt-6 max-w-5xl font-display text-7xl leading-[0.95] tracking-tightest md:text-9xl">
            Plain answers,<br /><span className="italic text-gold-bright">no marketing.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-bone/80">
            Below are the questions our team gets asked the most often — by dispensary buyers,
            budtenders, and the occasional regulator. If yours isn&rsquo;t here, the contact form
            gets a real human within a day or two.
          </p>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow">Wholesale</p>
            </div>
            <div className="lg:col-span-9">
              <FaqList items={wholesaleFaqs} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone-warm py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow">Product & lab</p>
            </div>
            <div className="lg:col-span-9">
              <FaqList items={productFaqs} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow">Operations</p>
            </div>
            <div className="lg:col-span-9">
              <FaqList items={operationsFaqs} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-verde-deep py-20 text-bone lg:py-24">
        <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-between gap-6 px-6 lg:px-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-bone/60">Didn&rsquo;t answer it?</p>
            <p className="mt-3 font-display text-3xl tracking-tightest md:text-4xl">
              Reach the team directly.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/contact" className="btn-gold text-[11px]">Contact</Link>
            <Link href="/wholesale" className="btn-ghost-bone text-[11px]">Wholesale →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
