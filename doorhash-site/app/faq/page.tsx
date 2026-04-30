import { PageHeader } from "@/components/PageHeader";
import { FaqTeaser } from "@/components/sections/FaqTeaser";

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered."
        description="Delivery, payments, products, compliance — the things people ask us most."
      />
      <FaqTeaser />
    </>
  );
}
