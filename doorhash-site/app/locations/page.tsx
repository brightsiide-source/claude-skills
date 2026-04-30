import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";

export const metadata = { title: "Locations" };

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visit us"
        title="Our retail flagship is coming soon."
        description="Our first brick-and-mortar dispensary is opening in Las Cruces. Until then, we deliver everything you need straight to your door."
      />
      <section className="relative pb-32">
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
                Our flagship retail experience is in build. Get on the list and we&apos;ll send you
                a soft-launch invite, free swag, and 25% off your first in-store visit.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 h-14 px-5 rounded-2xl glass text-cream placeholder:text-ink-400 focus:outline-none focus:border-leaf-500/40"
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

          <Reveal delay={0.1}>
            <div className="mt-10 text-center">
              <p className="text-ink-300">In the meantime —</p>
              <Link
                href="/menu"
                className="mt-4 group inline-flex items-center gap-2 rounded-full bg-cream hover:bg-leaf-300 text-ink-950 font-bold px-7 py-3 transition-colors"
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
