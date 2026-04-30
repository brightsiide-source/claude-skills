import type { Metadata } from "next";
import { WholesaleForm } from "@/components/wholesale-form";

export const metadata: Metadata = {
  title: "Wholesale",
  description:
    "Open a wholesale account with Don Verde Farms. Operator-direct fulfillment of indoor craft cannabis from Southern New Mexico. For licensed NM dispensaries."
};

export default function WholesalePage() {
  return (
    <>
      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-8xl px-6 pb-16 pt-28 lg:px-12 lg:pb-24">
          <p className="eyebrow text-gold-glow">For dispensary buyers</p>
          <h1 className="mt-8 max-w-5xl font-display text-7xl leading-[0.95] tracking-tightest md:text-9xl">
            Carry Don Verde.
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-bone/80">
            Operator-direct fulfillment. No middlemen. Limited drops, hand-placed. We build the
            menu around your shop, not the other way around.
          </p>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            <Pillar title="No white-label." body="Every jar is grown, cured, and sold under one license. CCD-VICE-2023-0010." />
            <Pillar title="Two-day reply." body="Fill the form, we get back inside two business days. Real humans, not a CRM bot." />
            <Pillar title="Budtender support." body="Talk-tracks, terpene primers, and shop-side staff training on the menu." />
          </ul>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Open an account</p>
              <h2 className="mt-4 font-display text-5xl leading-[1.05] tracking-tightest text-ink md:text-6xl">
                Tell us your shop.
              </h2>
              <p className="mt-8 text-base leading-relaxed text-ink/75">
                We sell exclusively to NM-licensed dispensaries. Your license number is required;
                we verify before responding.
              </p>
              <p className="mt-6 text-sm text-ink/60">
                Prefer email?{" "}
                <a className="text-gold hover:text-gold-deep" href="mailto:info@donverdefarms.com">
                  info@donverdefarms.com
                </a>
              </p>
            </div>
            <div className="lg:col-span-8">
              <WholesaleForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <li className="border-t border-bone/15 pt-6">
      <h3 className="font-display text-2xl tracking-tightest text-bone">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-bone/70">{body}</p>
    </li>
  );
}
