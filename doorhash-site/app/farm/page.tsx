import { PageHeader } from "@/components/PageHeader";
import { FarmStory } from "@/components/sections/FarmStory";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = { title: "The Farm" };

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
      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl glass p-8 hover:border-leaf-500/20 transition-colors">
                  <h3 className="font-display text-cream text-xl font-bold mb-3">{p.title}</h3>
                  <p className="text-ink-300 text-sm leading-relaxed text-pretty">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
