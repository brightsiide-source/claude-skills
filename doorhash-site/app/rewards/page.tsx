import { PageHeader } from "@/components/PageHeader";
import { RewardsCTA } from "@/components/sections/RewardsCTA";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = { title: "Hash Pass Rewards" };

const tiers = [
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
    perks: ["3pts per $1 spent", "Members-only happy hours", "1:1 budtender concierge"],
  },
];

export default function RewardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hash Pass"
        title="Get paid to smoke good."
        description="Every order earns points. Stack them for credit, exclusive drops, and members-only happy hours."
      />

      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-5">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div
                  className={
                    t.featured
                      ? "relative rounded-3xl bg-gradient-to-br from-leaf-500 to-leaf-300 p-1 shadow-glow-leaf"
                      : "relative rounded-3xl"
                  }
                >
                  <div
                    className={
                      t.featured
                        ? "rounded-[1.4rem] bg-ink-950 p-8 h-full"
                        : "rounded-3xl glass p-8 h-full"
                    }
                  >
                    <div className="text-leaf-300 text-xs uppercase tracking-widest mb-2">{t.pts}</div>
                    <h3 className="font-display text-cream text-3xl font-bold mb-6">{t.name}</h3>
                    <ul className="space-y-3">
                      {t.perks.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-ink-200 text-sm">
                          <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-leaf-400 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
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
