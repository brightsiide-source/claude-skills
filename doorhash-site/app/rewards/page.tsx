import { PageHeader } from "@/components/PageHeader";
import { RewardsCTA } from "@/components/sections/RewardsCTA";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkles, Gift, Calendar, Crown } from "lucide-react";

export const metadata = {
  title: { absolute: "Hash Pass — Cannabis Rewards & Loyalty Program | DoorHash" },
  description:
    "Earn points on every DoorHash cannabis order. Redeem for credit, exclusive Don Verde Farms drops, free delivery, and members-only happy hours across NM.",
  alternates: { canonical: "/rewards" },
};

type Tier = {
  name: string;
  pts: string;
  perks: string[];
  featured?: boolean;
  vip?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Hash",
    pts: "0–999 pts",
    perks: ["1pt per $1 spent", "Birthday gift", "VIP newsletter"],
  },
  {
    name: "Hash+",
    pts: "1,000–4,999 pts",
    perks: ["2pts per $1 spent", "Free delivery on every order", "Early-access drops"],
    featured: true,
  },
  {
    name: "Hash VIP",
    pts: "5,000+ pts",
    perks: [
      "3pts per $1 spent",
      "Members-only happy hours",
      "1:1 budtender concierge",
    ],
    vip: true,
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "Earn on every order",
    body: "Every dollar you spend through DoorHash earns Hash Pass points automatically. No coupon codes, no friction. Stack faster as you climb tiers.",
  },
  {
    icon: Gift,
    title: "Redeem for what you actually want",
    body: "Use points for cart credit, exclusive Don Verde Farms drops, branded merch, or members-only event tickets. You pick the redemption.",
  },
  {
    icon: Calendar,
    title: "Members-only happy hours",
    body: "Hash+ and Hash VIP members get access to weekly happy-hour pricing on flower, vapes, and edibles — applied automatically when you order.",
  },
  {
    icon: Crown,
    title: "Concierge for VIPs",
    body: "Hash VIP members get a dedicated budtender on chat. Ask anything — strain matchmaking, terpene profiles, dose suggestions, or restock alerts.",
  },
];

export default function RewardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hash Pass"
        title="Smoke more. Earn more."
        description="Hash Pass is the DoorHash loyalty program. Every order earns points you can redeem for credit, exclusive drops, and members-only happy hours."
      />

      <section className="relative surface-paper pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-ink-950 mb-4 text-balance">
              Choose your <span className="text-leaf-600">tier.</span>
            </h2>
            <p className="text-paper-muted max-w-2xl mb-12 text-pretty">
              You start at Hash on day one. As your lifetime points climb, you unlock Hash+ and
              eventually Hash VIP — earning more points per dollar and unlocking better perks
              along the way.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {tiers.map((t, i) => {
              const wrapperClass = t.featured
                ? "relative rounded-3xl bg-gradient-to-br from-leaf-500 to-leaf-300 p-1 shadow-glow-leaf"
                : t.vip
                ? "relative rounded-3xl bg-gradient-to-br from-gold-500 via-gold-300 to-gold-500 p-1 shadow-[0_20px_60px_-20px_rgba(201,169,97,0.5)]"
                : "relative rounded-3xl";
              const innerClass = t.featured
                ? "rounded-[1.4rem] bg-black p-8 h-full"
                : t.vip
                ? "rounded-[1.4rem] bg-black p-8 h-full"
                : "rounded-3xl card-paper p-8 h-full";
              const ptsClass = t.featured
                ? "text-leaf-300 text-xs uppercase tracking-widest mb-2 font-bold"
                : t.vip
                ? "text-gold-300 text-xs uppercase tracking-[0.18em] mb-2 font-bold"
                : "text-leaf-700 text-xs uppercase tracking-widest mb-2 font-bold";
              const titleClass = t.featured
                ? "font-display text-white text-3xl font-bold mb-6"
                : t.vip
                ? "font-display text-white text-3xl font-bold mb-6"
                : "font-display text-black text-3xl font-bold mb-6";
              const perkClass = t.featured
                ? "flex items-start gap-3 text-white/85 text-sm"
                : t.vip
                ? "flex items-start gap-3 text-white/85 text-sm"
                : "flex items-start gap-3 text-paper-muted text-sm";
              const dotClass = t.vip
                ? "mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0"
                : "mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-leaf-500 shrink-0";

              return (
                <Reveal key={t.name} delay={i * 0.08}>
                  <div className={wrapperClass}>
                    <div className={innerClass}>
                      <div className={ptsClass}>{t.pts}</div>
                      <h3 className={titleClass}>{t.name}</h3>
                      {t.vip && <div className="gold-divider mb-6" />}
                      <ul className="space-y-3">
                        {t.perks.map((p) => (
                          <li key={p} className={perkClass}>
                            <span className={dotClass} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative surface-paper-warm py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-ink-950 mb-4 text-balance">
              How Hash Pass <span className="text-leaf-600">works.</span>
            </h2>
            <p className="text-paper-muted max-w-2xl mb-12 text-pretty">
              We built Hash Pass to be the simplest cannabis rewards program in New Mexico —
              one currency, no expiration so long as you order yearly, and no fine-print games.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="rounded-3xl card-paper p-8 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-leaf-500/15 border border-leaf-500/30 grid place-items-center mb-6">
                    <b.icon className="w-5 h-5 text-leaf-700" />
                  </div>
                  <h3 className="font-display text-ink-950 text-xl font-bold mb-3">{b.title}</h3>
                  <p className="text-paper-muted text-sm leading-relaxed text-pretty">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RewardsCTA />
    </>
  );
}
