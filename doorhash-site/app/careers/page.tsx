import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Truck, Users, Sprout, Wrench } from "lucide-react";

export const metadata = {
  title: { absolute: "Careers at DoorHash — Cannabis Industry Jobs in New Mexico" },
  description:
    "Join the DoorHash team. We're hiring drivers, budtenders, growers, and operators across Southern New Mexico cannabis cultivation, retail, and delivery.",
  alternates: { canonical: "/careers" },
};

const teams = [
  {
    icon: Truck,
    name: "Delivery & dispatch",
    body: "Drivers, dispatch leads, and fleet operations. We pay above market, supply the vehicle and route software, and treat drivers like the front line of our brand — because they are.",
  },
  {
    icon: Users,
    name: "Retail & customer experience",
    body: "Budtenders, shift leads, and retail managers for our Las Cruces flagship opening in 2026. If you can teach a first-time customer about terpenes without sounding condescending, we want to talk.",
  },
  {
    icon: Sprout,
    name: "Cultivation",
    body: "Growers, trimmers, IPM specialists, and post-harvest operators for Don Verde Farms. We grow indoor in Southern New Mexico and we hire people who are obsessed with the plant.",
  },
  {
    icon: Wrench,
    name: "Operations & tech",
    body: "Compliance, finance, marketing, and the engineers behind this site. Cannabis attracts smart people because the problems are unsolved — bring your craft and we&apos;ll match you with real responsibility.",
  },
];

const values = [
  "Plant first. Every product decision starts with quality, never margin.",
  "No corporate money, no corporate politics. We answer to customers and growers.",
  "We pay above market, offer health benefits, and split tips equitably.",
  "We hire from the communities we sell to. Local, with real bench depth.",
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build the best cannabis brand in New Mexico."
        description="We're hiring drivers, budtenders, growers, and operators who care as much about the plant — and the people we sell it to — as we do."
      />

      <section className="relative surface-paper pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-ink-950 mb-4 text-balance">
              Who we&apos;re <span className="text-leaf-600">hiring.</span>
            </h2>
            <p className="text-paper-muted max-w-2xl mb-12 text-pretty">
              We&apos;re actively interviewing across cultivation, retail, and delivery as we
              approach the flagship opening. Even if you don&apos;t see your exact role listed,
              email careers@doorhash.com — strong people get hired into roles they invent.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {teams.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <div className="rounded-3xl card-paper p-8 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-leaf-500/15 border border-leaf-500/30 grid place-items-center mb-6">
                    <t.icon className="w-5 h-5 text-leaf-700" />
                  </div>
                  <h3 className="font-display text-ink-950 text-2xl font-bold mb-3">{t.name}</h3>
                  <p className="text-paper-muted text-sm leading-relaxed text-pretty">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative surface-paper-warm py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-ink-950 mb-4 text-balance">
              How we operate.
            </h2>
            <p className="text-paper-muted mb-8 text-pretty">
              Cannabis is one of the most over-corporatized industries in the country. We
              don&apos;t do that here. Our team is small, local, and obsessed with craft. The
              people closest to customers and plants make most of the decisions.
            </p>
            <ul className="space-y-4">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3 text-ink-950">
                  <span className="mt-1.5 inline-block w-2 h-2 rounded-full bg-leaf-500 shrink-0 shadow-glow-leaf" />
                  <span className="text-pretty">{v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="relative surface-paper py-16 pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <div className="rounded-3xl card-paper-leaf p-10 text-center">
              <h2 className="text-display-3 font-display text-ink-950 mb-4">Ready to apply?</h2>
              <p className="text-paper-muted text-pretty mb-8">
                Send a short note explaining what you do and what you want to build with us. A
                resume is optional — a real conversation is not. We respond to every applicant.
              </p>
              <a
                href="mailto:careers@doorhash.com"
                className="inline-flex items-center gap-2 rounded-full bg-leaf-500 hover:bg-leaf-400 text-ink-950 font-bold px-7 py-3 transition-colors"
              >
                careers@doorhash.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
