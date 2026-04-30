"use client";

import { Star } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

const reviews = [
  {
    name: "Jen R.",
    city: "Las Cruces",
    body: "Driver was at my door in 22 minutes. Genuinely faster than my pizza guy. House flower is absurd.",
  },
  {
    name: "Marcus T.",
    city: "Mesilla",
    body: "The Don Verde Tropic Thunder is my new everyday. Sticky, frosty, terps for days.",
  },
  {
    name: "Alyssa M.",
    city: "Sunland Park",
    body: "Discreet packaging, great prices, and the rewards stack actually adds up. Switched from Top Crop a month ago.",
  },
  {
    name: "Diego H.",
    city: "Anthony",
    body: "Easy to reorder, great selection of brands, and the budtender chat was super helpful for picking a strain.",
  },
  {
    name: "Priya K.",
    city: "Las Cruces",
    body: "Finally a delivery service that feels like an actual app and not a 2014 Wordpress site.",
  },
  {
    name: "Sam R.",
    city: "Doña Ana",
    body: "Got a free pre-roll on my first order and it converted me. Now I'm in deep on Hash Pass points.",
  },
];

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <div className="w-[360px] shrink-0 rounded-3xl card-paper p-7">
      <div className="flex gap-0.5 text-leaf-500 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-leaf-500" />
        ))}
      </div>
      <p className="text-ink-950 text-pretty leading-relaxed mb-6">&ldquo;{r.body}&rdquo;</p>
      <div className="text-sm">
        <div className="text-ink-950 font-semibold">{r.name}</div>
        <div className="text-paper-soft">{r.city}, NM</div>
      </div>
    </div>
  );
}

export function Reviews() {
  return (
    <section className="relative surface-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-14">
        <Reveal className="max-w-2xl">
          <span className="inline-block text-leaf-700 text-sm font-bold uppercase tracking-widest mb-4">
            Loved across the borderland
          </span>
          <h2 className="text-display-2 font-display text-ink-950 text-balance">
            1,200+ five-star <span className="text-leaf-600">reviews.</span>
          </h2>
        </Reveal>
      </div>

      <div className="space-y-5">
        <Marquee speed="slow">
          {reviews.slice(0, 3).map((r) => (
            <Card key={r.name} r={r} />
          ))}
        </Marquee>
        <Marquee speed="normal" reverse>
          {reviews.slice(3).map((r) => (
            <Card key={r.name} r={r} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
