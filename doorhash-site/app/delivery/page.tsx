import { PageHeader } from "@/components/PageHeader";
import { Coverage } from "@/components/sections/Coverage";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FaqTeaser } from "@/components/sections/FaqTeaser";
import { site } from "@/lib/site";

export const metadata = {
  title: { absolute: "Cannabis Delivery in Las Cruces & Southern NM | DoorHash" },
  description:
    "DoorHash delivers cannabis across Las Cruces, Mesilla, Sunland Park, Anthony, and Doña Ana. Average ETA 30 to 55 minutes. $50 minimum, free over $100.",
  alternates: { canonical: "/delivery" },
};

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
