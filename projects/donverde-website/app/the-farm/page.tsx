import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Farm",
  description:
    "How Don Verde Farms grows: indoor cultivation in Southern New Mexico, slow cure, lab-verified flower, and three operators with 20+ years between them."
};

export default function TheFarmPage() {
  return (
    <>
      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-8xl px-6 pb-20 pt-28 lg:px-12 lg:pb-28 lg:pt-32">
          <p className="eyebrow text-gold-glow">The farm</p>
          <h1 className="mt-8 max-w-5xl font-display text-7xl leading-[0.95] tracking-tightest md:text-9xl">
            Three operators, one quiet room, no boss but the plant.
          </h1>
          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-bone/80">
            Don Verde Farms is a small indoor cultivation operation in Southern New Mexico. We
            don&rsquo;t answer to a board. We don&rsquo;t take corporate money. We grow at a scale
            we can stand behind, with three pairs of hands that have been in this plant for two
            decades.
          </p>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Origin</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-display text-5xl leading-[1.05] tracking-tightest text-ink md:text-6xl">
                NM dirt, SoCal lineage.
              </h2>
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/80">
                <p>
                  Mike, Javi and Neal grew up in two cannabis cultures &mdash; the Southern
                  California craft scene and the high-desert agriculture of New Mexico. The farm
                  is the place those two stories meet.
                </p>
                <p>
                  We started Don Verde Farms because the New Mexico market needed flower that
                  felt like it came from operators, not investors. We built a small, repeatable
                  indoor program: tight rooms, controlled climate, hand-trimmed harvest, no
                  shortcuts.
                </p>
                <p>
                  We hold New Mexico cultivation license{" "}
                  <span className="font-mono text-gold">CCD-VICE-2023-0010</span> and grow
                  exclusively under it. Every batch that ships under our label is grown,
                  harvested, and cured in this facility &mdash; nothing white-labeled, nothing
                  resold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone-warm py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Method</p>
              <h2 className="mt-4 font-display text-5xl leading-[1.05] tracking-tightest text-ink md:text-6xl">
                The way the room runs.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-12">
              <Method
                kicker="01"
                title="Indoor, climate-controlled"
                body="Every cultivar is grown in a sealed, climate-controlled room. No outdoor variability, no light cycle improvisation. Consistency is the entire job."
              />
              <Method
                kicker="02"
                title="Hand-trimmed harvest"
                body="We don't run a machine trimmer. The cost is real and so is the result &mdash; intact trichome heads, no wind-burn, no busted calyxes in the bottom of the jar."
              />
              <Method
                kicker="03"
                title="21-day minimum cure"
                body="Slow, cold hang first; controlled humidity cure after. Nothing leaves the room before the chlorophyll is gone and the terpenes have settled."
              />
              <Method
                kicker="04"
                title="Lab-verified, every batch"
                body="Cannabinoids, terpenes, residual solvents, microbials, heavy metals. Public COAs are coming with the next site update; until then, ask &mdash; we send."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-verde-deep py-24 text-bone lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-gold-glow">Operators</p>
              <h2 className="mt-4 font-display text-5xl leading-[1.02] tracking-tightest md:text-6xl">
                Mike. Javi. Neal.
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-bone/80">
                Three founders with two decades in cannabis between them. Cultivators,
                entrepreneurs, and the people whose names go on every jar that leaves the door.
              </p>
            </div>
            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-3">
              <Operator name="Mike" role="Co-founder · Cultivation" />
              <Operator name="Javi" role="Co-founder · Operations" />
              <Operator name="Neal" role="Co-founder · Brand & Sales" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-bone lg:py-24">
        <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-between gap-6 px-6 lg:px-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-bone/60">Continue</p>
            <p className="mt-3 font-display text-3xl tracking-tightest md:text-4xl">
              See what&rsquo;s coming out of the room.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/strains" className="btn-gold text-[11px]">Browse strains</Link>
            <Link href="/wholesale" className="btn-ghost-bone text-[11px]">Wholesale →</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Method({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="grid gap-6 border-t border-ink/15 pt-8 sm:grid-cols-[auto_1fr]">
      <p className="font-display text-3xl tracking-tightest text-gold">{kicker}</p>
      <div>
        <h3 className="font-display text-2xl tracking-tightest text-ink">{title}</h3>
        <p className="mt-3 text-base leading-relaxed text-ink/75">{body}</p>
      </div>
    </div>
  );
}

function Operator({ name, role }: { name: string; role: string }) {
  return (
    <div className="border border-bone/15 bg-ink/40 p-8">
      <div className="aspect-square w-full overflow-hidden border border-bone/10">
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          <defs>
            <radialGradient id={`op-${name}`} cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#7DA15F" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#2C4A2A" />
              <stop offset="100%" stopColor="#0A0A0A" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill={`url(#op-${name})`} />
          <text
            x="50%"
            y="56%"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="80"
            letterSpacing="-3"
            fill="#FAFAF7"
            fillOpacity="0.85"
          >
            {name[0]}
          </text>
        </svg>
      </div>
      <p className="mt-6 font-display text-3xl tracking-tightest text-bone">{name}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-bone/60">{role}</p>
    </div>
  );
}
