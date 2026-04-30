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
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <Reveal>
            <span className="inline-block text-leaf-400 text-sm font-bold uppercase tracking-widest mb-4">
              This week&apos;s drops
            </span>
            <h2 className="text-display-2 font-display text-cream max-w-2xl text-balance">
              Fresh from the farm,{" "}
              <span className="gradient-text">moving fast.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 rounded-full glass-leaf px-6 py-3 text-leaf-200 font-semibold hover:bg-leaf-500/10 transition-colors"
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
                <div className="relative rounded-3xl overflow-hidden bg-ink-900 border border-white/5 hover:border-leaf-500/30 transition-colors group">
                  {/* Gradient backdrop */}
                  <div
                    className={cn(
                      "absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity bg-gradient-to-br",
                      p.hue
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

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
                    <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-leaf-500 text-ink-950 text-xs font-bold px-3 py-1 uppercase tracking-wider">
                      {p.badge}
                    </span>
                  )}

                  <div className="relative p-5 pt-2">
                    <div className="flex items-center justify-between text-xs text-ink-300 mb-2">
                      <span className="uppercase tracking-wider">{p.brand}</span>
                      <span className="text-leaf-300">{p.strain}</span>
                    </div>
                    <h3 className="font-display text-cream text-xl font-bold leading-tight mb-3 text-balance">
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-ink-300 text-sm">
                        {p.thc} THC
                      </span>
                      <span className="text-cream font-bold">${p.price}</span>
                    </div>
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
