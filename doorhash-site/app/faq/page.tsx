import { PageHeader } from "@/components/PageHeader";
import { FaqTeaser } from "@/components/sections/FaqTeaser";
import { Reveal } from "@/components/ui/Reveal";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = {
  title: { absolute: "DoorHash FAQ — Cannabis Delivery Questions Answered" },
  description:
    "Everything you need to know about DoorHash cannabis delivery in New Mexico. Hours, payment methods, ETAs, order minimums, medical patients, and product info.",
  alternates: { canonical: "/faq" },
};

const more = [
  {
    q: "What ID do I need for delivery?",
    a: "A valid government-issued photo ID showing you are 21 or older. Driver's licenses, state IDs, military IDs, and passports all qualify. Medical patients can also present a current state-issued med card to access lower tax rates and the medical menu.",
  },
  {
    q: "Can someone else accept the delivery for me?",
    a: "No. New Mexico law requires the person who placed the order to receive it in person, present a matching ID, and sign for the delivery. If the recipient is unavailable, the driver will return the order and a restocking fee applies.",
  },
  {
    q: "Is there a delivery fee?",
    a: "Orders under $100 carry a small flat delivery fee that varies by zone — usually $5 to $8. Orders of $100 or more deliver free anywhere we cover. Hash Pass+ members get free delivery on every order regardless of cart size.",
  },
  {
    q: "How do I redeem Hash Pass points?",
    a: "Points apply automatically at checkout when you reach a redemption tier. You can also save them up for exclusive Don Verde Farms drops or members-only happy hour pricing. Points never expire as long as you order at least once a year.",
  },
  {
    q: "Do you sell to medical patients?",
    a: "Yes. Medical patients with a current state-issued card receive lower tax rates, access to the medical menu (including higher-potency products), and waived order minimums on most orders. Show your card to the driver at delivery.",
  },
  {
    q: "What if my order arrives wrong or damaged?",
    a: "Email orders@doorhash.com with your order number and a photo of the issue. We resolve incorrect or damaged orders within one business day — refund, replacement, or store credit, your choice. We do not gatekeep customer service.",
  },
  {
    q: "Where are your products grown?",
    a: "Our house flower comes from Don Verde Farms — an indoor cannabis cultivator in Southern New Mexico, owned by the same team behind DoorHash. Partner brands on the menu are vetted for quality, lab tested, and compliant with New Mexico law.",
  },
];

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd faqs={more} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered."
        description="Delivery, payments, products, compliance — the things people ask us most. If we miss yours, email hello@doorhash.com and we'll add it."
      />
      <FaqTeaser />

      <section className="relative py-16 pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-cream mb-12 text-center text-balance">
              More <span className="gradient-text">good questions.</span>
            </h2>
          </Reveal>
          <div className="space-y-4">
            {more.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <details className="group rounded-2xl glass p-6 hover:border-leaf-500/20 transition-colors">
                  <summary className="cursor-pointer flex items-center justify-between text-cream font-display font-bold text-lg">
                    {f.q}
                    <span className="ml-4 text-leaf-300 group-open:rotate-45 transition-transform text-2xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-ink-300 leading-relaxed text-pretty">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
