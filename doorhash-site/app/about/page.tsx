import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = { title: "About" };

const team = [
  {
    name: "Neal Lucas",
    role: "Co-Founder",
    bio: "20+ year cannabis veteran with deep experience in commercial cultivation, IPM, and retail leadership.",
  },
  {
    name: "Mike",
    role: "Co-Founder",
    bio: "Operator behind the doorhash delivery experience. Bio coming soon.",
  },
  {
    name: "Javi",
    role: "Co-Founder",
    bio: "Cultivation and product lead. Bio coming soon.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built by growers, for the people who love the plant."
        description="No corporate money. No middlemen. Just three founders, one farm, and a delivery team obsessed with the experience."
      />

      <section className="relative pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 prose prose-invert prose-lg">
          <Reveal>
            <p className="text-ink-200 text-lg leading-relaxed text-pretty">
              doorhash is the retail and delivery arm of <strong className="text-cream">Don Verde Farms</strong>,
              a Southern New Mexico cultivator with roots in NM and Southern California. We started
              Don Verde because we believed Southern New Mexico deserved cannabis as good as the
              best of California — grown locally, by people who actually care about the plant.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-ink-200 text-lg leading-relaxed mt-8 text-pretty">
              doorhash is what happens next. A delivery experience that feels as fast as the apps
              you use every day, with the provenance and product quality the legacy market never
              gave you. Our flagship retail location opens in Las Cruces in 2026.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-cream mb-12">The founders</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="rounded-3xl glass p-8 hover:border-leaf-500/20 transition-colors">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-leaf-700 via-leaf-500 to-leaf-300 mb-6 grid place-items-center text-7xl">
                    {m.name[0]}
                  </div>
                  <div className="text-leaf-300 text-xs uppercase tracking-widest mb-2">{m.role}</div>
                  <h3 className="font-display text-cream text-2xl font-bold mb-3">{m.name}</h3>
                  <p className="text-ink-300 text-sm leading-relaxed">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
