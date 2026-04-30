"use client";

import { MapPin, ShoppingBag, Bike, Smile } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: MapPin,
    title: "Drop your address",
    body: "We confirm you're in our delivery zone and surface a personalized menu.",
  },
  {
    icon: ShoppingBag,
    title: "Build your cart",
    body: "Top-shelf flower, vapes, edibles, concentrates. Pay cash or debit on delivery.",
  },
  {
    icon: Bike,
    title: "We're on the way",
    body: `Average ETA 30–55 minutes. Track your driver in real time. Discreet packaging, every time.`,
  },
  {
    icon: Smile,
    title: "Enjoy. Earn rewards.",
    body: "Every order earns Hash Pass points — redeem for credit, exclusive drops, and free swag.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative surface-paper-warm py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block text-leaf-700 text-sm font-bold uppercase tracking-widest mb-4">
            How it works
          </span>
          <h2 className="text-display-2 font-display text-ink-950 text-balance">
            Order in <span className="text-leaf-600">under a minute.</span>
          </h2>
          <p className="text-lg text-paper-muted mt-6 text-pretty">
            We built doorhash to feel like the food-delivery apps you already love — except every
            order ships with provenance, paperwork, and care.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="relative h-full rounded-3xl card-paper p-8 group">
                <div className="absolute top-6 right-6 text-7xl font-display font-black text-leaf-100 leading-none">
                  0{i + 1}
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-leaf-500/15 border border-leaf-500/30 grid place-items-center mb-6 group-hover:bg-leaf-500/25 transition-colors">
                    <s.icon className="w-5 h-5 text-leaf-700" />
                  </div>
                  <h3 className="font-display text-ink-950 text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-paper-muted text-sm text-pretty leading-relaxed">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
