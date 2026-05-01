import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { HowToOrderJsonLd, BreadcrumbJsonLd, SpeakableJsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { ArrowRight, MapPin, ShoppingCart, CreditCard, Bike, Smile } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = {
  title: { absolute: "How to Order Cannabis Delivery in Las Cruces, NM | DoorHash" },
  description:
    "Step-by-step: how to order cannabis delivery from DoorHash in Las Cruces, Mesilla, Sunland Park, Anthony, and Doña Ana, NM. ID, payment, ETAs, minimums.",
  alternates: { canonical: "/how-to-order" },
};

const steps = [
  {
    icon: MapPin,
    title: "Enter your delivery address",
    body: "Visit doorhash.com and enter your delivery address. The site confirms whether your location is within the DoorHash service area across Southern New Mexico (Las Cruces, Mesilla, Sunland Park, Anthony, Doña Ana).",
  },
  {
    icon: ShoppingCart,
    title: "Browse the live menu",
    body: "Shop the real-time DoorHash menu — flower, pre-rolls, vapes, edibles, and concentrates. Inventory and prices update in real time so you only see in-stock products. Filter by strain type, brand, effect, or price.",
  },
  {
    icon: CreditCard,
    title: "Add items to cart and check out",
    body: `Build your cart with at least $${site.delivery.minOrder} to meet the order minimum. Orders of $${site.delivery.freeDeliveryOver} or more deliver free. Choose your payment method (cash or debit on delivery). Hash Pass members earn points automatically.`,
  },
  {
    icon: Bike,
    title: "Track your delivery in real time",
    body: `Receive a tracking link via SMS the moment a driver picks up your order. The average DoorHash delivery ETA is ${site.delivery.avgEta}. Driver name, photo, and live location are visible until delivery.`,
  },
  {
    icon: Smile,
    title: "Receive your order with valid ID",
    body: "Present a valid government-issued photo ID showing you are 21 or older. The driver scans the ID, you sign for the delivery, and pay with cash or debit. Discreet packaging is the default on every order.",
  },
];

const idAccepted = [
  "US driver's license",
  "US state ID card",
  "US passport or passport card",
  "Military ID",
  "Tribal ID issued by a federally-recognized tribe",
];

const idRejected = [
  "Expired IDs (any type)",
  "Photocopies or photos of an ID",
  "International driver's permits without accompanying passport",
  "Student IDs (not government-issued)",
];

export default function HowToOrderPage() {
  return (
    <>
      <HowToOrderJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "How to Order", url: "/how-to-order" },
        ]}
      />
      <SpeakableJsonLd cssSelector={["#definition", "#steps", "#id-requirements"]} />

      <PageHeader
        eyebrow="How it works"
        title="How to order cannabis delivery from DoorHash."
        description="Five steps. Two minutes. Average delivery in 30 to 55 minutes across Southern New Mexico."
      />

      <section id="definition" className="relative surface-dark pb-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <p className="text-white text-lg leading-relaxed text-pretty">
              <strong className="text-leaf-300">DoorHash</strong> is a cannabis delivery service
              operating across Southern New Mexico — including Las Cruces, Mesilla, Sunland Park,
              Anthony, and Doña Ana. DoorHash is the retail and delivery arm of Don Verde Farms,
              an indoor cannabis cultivator based in Southern New Mexico. Adults 21 and older with
              a valid government-issued photo ID can order flower, pre-rolls, vapes, edibles, and
              concentrates online for same-day delivery, with an average ETA of {site.delivery.avgEta}.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="steps" className="relative surface-dark py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-white mb-12 text-balance">
              Five steps to <span className="text-leaf-300">delivery.</span>
            </h2>
          </Reveal>
          <ol className="space-y-5">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <li className="rounded-3xl card-dark p-8 flex gap-6 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-leaf-500/15 border border-leaf-400/40 grid place-items-center">
                    <s.icon className="w-5 h-5 text-leaf-300" />
                  </div>
                  <div>
                    <div className="text-leaf-300 text-xs uppercase tracking-widest mb-2 font-bold">
                      Step {i + 1}
                    </div>
                    <h3 className="font-display text-white text-2xl font-bold mb-3">{s.title}</h3>
                    <p className="text-white/70 leading-relaxed text-pretty">{s.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="id-requirements" className="relative surface-dark py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-white mb-4 text-balance">
              ID requirements at <span className="text-leaf-300">delivery.</span>
            </h2>
            <p className="text-white/70 mb-12 text-pretty">
              New Mexico law requires every cannabis delivery customer to present a valid
              government-issued ID showing they are 21 or older. The driver scans the ID at
              delivery — no exceptions, no workarounds.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={0.05}>
              <div className="rounded-3xl card-dark-leaf p-8">
                <h3 className="font-display text-white text-xl font-bold mb-4">Accepted</h3>
                <ul className="space-y-3">
                  {idAccepted.map((id) => (
                    <li key={id} className="flex items-start gap-3 text-white/85 text-sm">
                      <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-leaf-400 shrink-0" />
                      {id}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl card-dark p-8">
                <h3 className="font-display text-white text-xl font-bold mb-4">Not accepted</h3>
                <ul className="space-y-3">
                  {idRejected.map((id) => (
                    <li key={id} className="flex items-start gap-3 text-white/65 text-sm">
                      <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                      {id}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative surface-dark py-16 pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <div className="rounded-3xl card-dark-leaf p-10 text-center">
              <h2 className="text-display-3 font-display text-white mb-4">Ready to order?</h2>
              <p className="text-white/75 mb-8 text-pretty">
                Browse the live DoorHash menu and check out in under two minutes.
              </p>
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-leaf-500 hover:bg-leaf-400 text-black font-bold px-7 py-4 transition-colors shadow-glow-leaf"
              >
                Shop the menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
