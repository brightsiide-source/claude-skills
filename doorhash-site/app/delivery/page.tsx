import { PageHeader } from "@/components/PageHeader";
import { Coverage } from "@/components/sections/Coverage";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FaqTeaser } from "@/components/sections/FaqTeaser";
import { site } from "@/lib/site";

export const metadata = { title: "Delivery" };

export default function DeliveryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Delivery"
        title="At your door, fast."
        description={`Average ${site.delivery.avgEta} ETA across ${site.region}. $${site.delivery.minOrder} minimum, free over $${site.delivery.freeDeliveryOver}.`}
      />
      <Coverage />
      <HowItWorks />
      <FaqTeaser />
    </>
  );
}
