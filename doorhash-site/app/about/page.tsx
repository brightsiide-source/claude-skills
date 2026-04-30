import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: { absolute: "About DoorHash — Founders, Mission & Don Verde Farms" },
  description:
    "DoorHash is the retail and delivery arm of Don Verde Farms — a Southern New Mexico cultivator. No corporate money. Just a craft team obsessed with the plant.",
  alternates: { canonical: "/about" },
};

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

      <section className="relative surface-dark pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <p className="text-white text-lg leading-relaxed text-pretty">
              doorhash is the retail and delivery arm of <strong>Don Verde Farms</strong>,
              a Southern New Mexico cultivator with roots in NM and Southern California. We started
              Don Verde because we believed Southern New Mexico deserved cannabis as good as the
              best of California — grown locally, by people who actually care about the plant.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white text-lg leading-relaxed mt-8 text-pretty">
              doorhash is what happens next. A delivery experience that feels as fast as the apps
              you use every day, with the provenance and product quality the legacy market never
              gave you. Our flagship retail location opens in Las Cruces in 2026.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white text-lg leading-relaxed mt-8 text-pretty">
              We don&apos;t take corporate money and we don&apos;t plan to. The advantage of
              owning the farm, the delivery network, and the retail experience under one roof
              is that we control the entire customer experience — from how a strain is grown
              and cured all the way through the moment a driver hands you the bag. Most
              cannabis brands can&apos;t say the same. Most operate on someone else&apos;s
              flower, in someone else&apos;s storefront, on someone else&apos;s rules.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-white text-lg leading-relaxed mt-8 text-pretty">
              Our mission is to be the best cannabis brand in New Mexico — measured not by
              store count or revenue, but by the quality of the product, the speed of the
              delivery, and the trust we earn from our customers and our team.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative surface-dark pb-32 pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-white mb-12">The founders</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="rounded-3xl card-dark p-8">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-leaf-700 via-leaf-500 to-leaf-300 mb-6 grid place-items-center text-7xl text-white font-display font-black">
                    {m.name[0]}
                  </div>
                  <div className="text-leaf-300 text-xs uppercase tracking-widest mb-2 font-bold">
                    {m.role}
                  </div>
                  <h3 className="font-display text-white text-2xl font-bold mb-3">{m.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
