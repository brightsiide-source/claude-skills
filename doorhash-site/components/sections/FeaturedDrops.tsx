"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal } from "@/components/ui/Reveal";
import { featuredProducts } from "@/lib/products";
import { cn } from "@/lib/cn";

export function FeaturedDrops() {
  return (
    <section className="relative surface-dark py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-leaf-mesh opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <Reveal>
            <span className="inline-block text-leaf-300 text-sm font-bold uppercase tracking-widest mb-4">
              This week&apos;s drops
            </span>
            <h2 className="text-display-2 font-display text-white max-w-2xl text-balance">
              Fresh from the farm,{" "}
              <span className="text-leaf-300">moving fast.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 rounded-full bg-leaf-500 hover:bg-leaf-400 px-6 py-3 text-black font-bold transition-colors shadow-glow-leaf"
            >
              See full menu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          {featuredProducts.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06}>
              <TiltCard className="rounded-3xl">
                <div className="relative rounded-3xl overflow-hidden bg-black/60 border border-white/10 hover:border-leaf-500/40 transition-colors group backdrop-blur-md">
                  {/* Gradient backdrop pops on dark */}
                  <div
                    className={cn(
                      "absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity bg-gradient-to-br",
                      p.hue
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  {/* Float emoji */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-square grid place-items-center text-7xl lg:text-8xl"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <span className="animate-float drop-shadow-2xl">{p.emoji}</span>
                  </motion.div>

                  {p.badge && (
                    <span
                      className={cn(
                        "absolute top-4 left-4 inline-flex items-center rounded-full text-xs font-bold px-3 py-1 uppercase tracking-wider",
                        p.badge === "Top Shelf"
                          ? "bg-gold-500 text-black"
                          : "bg-leaf-500 text-black"
                      )}
                    >
                      {p.badge}
                    </span>
                  )}

                  <div className="relative p-5 pt-2">
                    <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                      <span className="uppercase tracking-wider">{p.brand}</span>
                      <span className="text-leaf-300 font-semibold">{p.strain}</span>
                    </div>
                    <h3 className="font-display text-white text-xl font-bold leading-tight mb-2 text-balance">
                      {p.name}
                    </h3>
                    {p.tastingNotes && p.tastingNotes.length > 0 && (
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 mb-3 font-mono">
                        {p.tastingNotes.join(" · ")}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-white/65 text-sm tabular-nums">
                        {p.thc} THC
                        {typeof p.harvestedDaysAgo === "number" && (
                          <span className="text-leaf-300/70"> · {p.harvestedDaysAgo}d</span>
                        )}
                      </span>
                      <span className="text-white font-bold tabular-nums">${p.price}</span>
                    </div>
                    {p.lot && (
                      <div className="mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-white/40 uppercase tracking-[0.15em]">
                        Lot {p.lot}
                      </div>
                    )}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
