import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";

export const metadata = {
  title: { absolute: "DoorHash Dispensary Locations in New Mexico | Coming Soon" },
  description:
    "DoorHash's flagship cannabis dispensary opens in Las Cruces, NM in 2026. Get on the list for soft-launch invites, free swag, and 25% off your first visit.",
  alternates: { canonical: "/locations" },
};

const features = [
  {
    title: "A retail experience built like the apps you love",
    body: "Walk in, pick up a tablet, browse the live menu, get personalized recommendations from a budtender, and check out in under five minutes. Our Las Cruces flagship is designed to feel as smooth as the DoorHash delivery flow you already know.",
  },
  {
    title: "Don Verde Farms, on the shelf",
    body: "Every house strain in our flagship is grown by Don Verde Farms in Southern New Mexico. Hand-trimmed, small-batch, and stocked with the kind of provenance documentation you usually only see at the high end of California craft.",
  },
  {
    title: "A consultation lounge for first-time customers",
    body: "We're building a dedicated, no-pressure consultation space for first-time and medical customers. Sit down, ask questions, sample terpenes, and leave with a product matched to what you're actually trying to feel.",
  },
];

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visit us"
        title="Our retail flagship is coming soon."
        description="Our first brick-and-mortar dispensary is opening in Las Cruces. Until then, we deliver everything you need straight to your door across Southern New Mexico."
      />

      <section className="relative pb-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal>
            <div className="rounded-[2.5rem] glass-leaf p-10 lg:p-16 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-leaf-500/20 text-leaf-200 px-4 py-2 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-leaf-400 animate-pulse" />
                Opening 2026
              </span>
              <h2 className="text-display-2 font-display text-cream mb-6 text-balance">
                doorhash <span className="gradient-text">Las Cruces</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center text-ink-200 mb-10">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-leaf-400" />
                  Las Cruces, NM
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4 text-leaf-400" />
                  Hours TBA
                </span>
              </div>
              <p className="text-ink-200 max-w-xl mx-auto mb-10 text-pretty">
                Our flagship retail experience is in build. Get on the list and we&apos;ll send
                you a soft-launch invite, free swag, and 25% off your first in-store visit.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 h-14 px-5 rounded-2xl glass text-cream placeholder:text-ink-400 focus:outline-none focus:border-leaf-500/40"
                  aria-label="Email for soft-launch invite"
                />
                <button
                  type="submit"
                  className="h-14 inline-flex items-center justify-center gap-2 rounded-2xl bg-leaf-500 hover:bg-leaf-400 text-ink-950 font-bold px-6 transition-colors shadow-glow-leaf"
                >
                  Notify me
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-display-3 font-display text-cream mb-4 text-balance">
              What to expect <span className="gradient-text">at the flagship.</span>
            </h2>
            <p className="text-ink-200 max-w-2xl mb-12 text-pretty">
              Our flagship is more than a dispensary — it&apos;s the physical home of the
              DoorHash brand and the public-facing showcase of Don Verde Farms cultivation.
              Here&apos;s what we&apos;re building.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="rounded-3xl glass p-8 h-full hover:border-leaf-500/20 transition-colors">
                  <h3 className="font-display text-cream text-xl font-bold mb-3 text-balance">
                    {f.title}
                  </h3>
                  <p className="text-ink-300 text-sm leading-relaxed text-pretty">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <div className="text-center">
              <h2 className="text-display-3 font-display text-cream mb-4">
                In the meantime — order delivery.
              </h2>
              <p className="text-ink-200 mb-8 text-pretty">
                Until the flagship opens, every DoorHash order ships straight to your door
                across Las Cruces, Mesilla, Sunland Park, Anthony, and Doña Ana.
              </p>
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-cream hover:bg-leaf-300 text-ink-950 font-bold px-7 py-3 transition-colors"
              >
                Order delivery now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
