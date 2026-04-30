import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { Mail, Phone, MapPin, MessageCircle, Clock, Newspaper } from "lucide-react";

export const metadata = {
  title: { absolute: "Contact DoorHash — Cannabis Delivery Support in NM" },
  description:
    "Reach the DoorHash team in Las Cruces, New Mexico. Order issues, partnership inquiries, press, and general questions — we read and respond to everything.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "We reply within 4 business hours during open days.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone}`,
    note: "Live during open hours, voicemail otherwise.",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: site.hq,
    note: "Our flagship retail location opens to the public in 2026.",
  },
];

const topics = [
  {
    icon: MessageCircle,
    title: "Order or delivery question?",
    body: "Email orders@doorhash.com with your order number. Our delivery team can update ETAs, swap items, and handle refunds.",
  },
  {
    icon: Newspaper,
    title: "Press, partnerships, or wholesale?",
    body: "Reach press@doorhash.com for media inquiries. For Don Verde Farms wholesale and brand partnerships, email partnerships@doorhash.com.",
  },
  {
    icon: Clock,
    title: "After hours?",
    body: "Drop us a note any time — we batch overnight messages first thing the next morning. Compliance-related questions go to compliance@doorhash.com.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a human."
        description="Order issues, partnership opportunities, press, or just want to say hi — we read everything that hits our inbox and respond fast."
      />

      <section className="relative pb-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid md:grid-cols-3 gap-6">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              {c.href ? (
                <a
                  href={c.href}
                  className="group rounded-3xl card-dark p-8 block h-full"
                >
                  <c.icon className="w-6 h-6 text-leaf-300 mb-6" />
                  <h2 className="text-white/70 text-sm uppercase tracking-widest mb-2 font-bold">
                    {c.label}
                  </h2>
                  <div className="text-white font-display text-xl font-bold mb-3 break-words">
                    {c.value}
                  </div>
                  <p className="text-white/55 text-sm">{c.note}</p>
                </a>
              ) : (
                <div className="rounded-3xl card-dark p-8 h-full">
                  <c.icon className="w-6 h-6 text-leaf-300 mb-6" />
                  <h2 className="text-white/70 text-sm uppercase tracking-widest mb-2 font-bold">
                    {c.label}
                  </h2>
                  <div className="text-white font-display text-xl font-bold mb-3">{c.value}</div>
                  <p className="text-white/55 text-sm">{c.note}</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative surface-dark py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-white mb-4 text-balance">
              Pick the right <span className="text-leaf-300">inbox.</span>
            </h2>
            <p className="text-white/70 max-w-2xl mb-12 text-pretty">
              We sort messages by topic so the right teammate gets back to you fast. If
              you&apos;re not sure where to start, default to hello@doorhash.com and
              we&apos;ll route it.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {topics.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.06}>
                <div className="rounded-3xl card-dark p-8 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-leaf-500/15 border border-leaf-500/30 grid place-items-center mb-6">
                    <t.icon className="w-5 h-5 text-leaf-300" />
                  </div>
                  <h3 className="font-display text-white text-xl font-bold mb-3">{t.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed text-pretty">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative surface-dark py-16 pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <div className="rounded-3xl card-dark-leaf p-10 text-center">
              <h2 className="text-display-3 font-display text-white mb-4">Hours of operation.</h2>
              <p className="text-white/70 mb-2 text-pretty">
                Delivery operates seven days a week. Hours vary by zone — confirm your local
                window when you place an order.
              </p>
              <p className="text-white/55 text-sm">
                Las Cruces &amp; Mesilla: 10am – 10pm &middot; Sunland Park, Anthony &amp; Doña
                Ana: 11am – 9pm
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
