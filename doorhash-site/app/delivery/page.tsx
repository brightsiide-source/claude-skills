import { PageHeader } from "@/components/PageHeader";
import { Coverage } from "@/components/sections/Coverage";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FaqTeaser } from "@/components/sections/FaqTeaser";
import { Reveal } from "@/components/ui/Reveal";
import { SpeakableJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata = {
  title: { absolute: "Cannabis Delivery in Las Cruces, NM 88007 | DoorHash" },
  description:
    "DoorHash delivers cannabis in Las Cruces, NM — zip 88007 plus a 5 to 10 mile radius. Average ETA is 30 to 55 minutes. $50 minimum, free delivery over $100.",
  alternates: { canonical: "/delivery" },
};

export default function DeliveryPage() {
  return (
    <>
      <SpeakableJsonLd cssSelector={["#definition"]} />
      <PageHeader
        eyebrow="Delivery"
        title="At your door, fast."
        description={`Average ${site.delivery.avgEta} ETA across ${site.region}. $${site.delivery.minOrder} minimum, free over $${site.delivery.freeDeliveryOver}.`}
      />
      <section id="definition" className="relative surface-dark pb-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <p className="text-white text-lg leading-relaxed text-pretty">
              <strong className="text-leaf-300">DoorHash cannabis delivery</strong> is a same-day
              delivery service operating in Las Cruces, New Mexico — centered on zip code{" "}
              <strong>88007</strong> with a 5 to 10 mile delivery radius. The average delivery ETA is{" "}
              <strong>{site.delivery.avgEta}</strong>. The order minimum is{" "}
              <strong>${site.delivery.minOrder}</strong>; orders of{" "}
              <strong>${site.delivery.freeDeliveryOver}</strong> or more deliver free. Adults 21
              and older with a valid government-issued photo ID can order cannabis flower,
              pre-rolls, vapes, edibles, and concentrates online and pay with cash or debit on
              delivery.
            </p>
          </Reveal>
        </div>
      </section>
      <Coverage />
      <HowItWorks />
      <FaqTeaser />
    </>
  );
}
