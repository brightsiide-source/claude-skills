import { PageHeader } from "@/components/PageHeader";
import { FarmStory } from "@/components/sections/FarmStory";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: { absolute: "Don Verde Farms — Indoor Cannabis Cultivation | DoorHash" },
  description:
    "DoorHash flower comes from Don Verde Farms — a Southern NM craft cultivator. 100% indoor, hand-trimmed, small-batch. Seed-to-door provenance on every drop.",
  alternates: { canonical: "/farm" },
};

const principles = [
  {
    title: "100% indoor",
    body: "Climate-controlled facility in Southern New Mexico. Every plant gets exactly what it needs, when it needs it.",
  },
  {
    title: "Hand-trimmed",
    body: "No machine trim. Every flower goes through our team's hands so you get the bag appeal you paid for.",
  },
  {
    title: "Small batch",
    body: "We rotate strains constantly. If a phenotype isn't elite, it doesn't make it to the menu.",
  },
  {
    title: "No corporate money",
    body: "Just a craft team obsessed with the plant. We answer to our customers, not to investors.",
  },
];

export default function FarmPage() {
  return (
    <>
      <PageHeader
        eyebrow="Don Verde Farms"
        title="Where every flower starts."
        description="doorhash is the retail arm of Don Verde Farms — a Southern New Mexico cultivator with roots in NM and Southern California."
      />
      <FarmStory />
      <section className="relative surface-dark py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-white mb-4 text-balance">
              How we grow at <span className="text-leaf-300">Don Verde.</span>
            </h2>
            <p className="text-white/70 mb-4 text-pretty">
              Every Don Verde Farms strain starts indoors in a climate-controlled cultivation
              facility in Southern New Mexico. We dial humidity, temperature, light, and
              nutrient delivery for each phenotype individually — no shortcuts, no rushing the
              flower curing schedule. The result is bag appeal you can feel and a smoke that
              actually matches the lab numbers on the package.
            </p>
            <p className="text-white/70 text-pretty">
              We rotate small batches constantly, hand-trim every plant, and only put
              phenotypes on the menu after the team agrees the cut is elite. If a strain
              underperforms, we cull it. If it&apos;s special, we make sure DoorHash customers
              get it first.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="relative surface-dark pb-32 pt-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl card-dark p-8">
                  <h3 className="font-display text-white text-xl font-bold mb-3">{p.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed text-pretty">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
