"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sprout } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function FarmStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-40 overflow-hidden grain"
    >
      <div className="absolute inset-0 bg-leaf-mesh opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Image stack */}
        <div className="relative h-[520px] lg:h-[640px] order-last lg:order-first">
          <motion.div
            style={{ y: yImg, rotate }}
            className="absolute top-0 left-0 w-3/4 aspect-[4/5] rounded-3xl overflow-hidden shadow-tile"
          >
            <div className="w-full h-full bg-gradient-to-br from-leaf-700 via-leaf-500 to-leaf-300 grid place-items-center">
              <Sprout className="w-32 h-32 text-leaf-950/30" />
            </div>
          </motion.div>
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [-60, 60]) }}
            className="absolute bottom-0 right-0 w-2/3 aspect-square rounded-3xl overflow-hidden shadow-tile"
          >
            <div className="w-full h-full bg-gradient-to-tr from-ink-900 via-leaf-900 to-leaf-700 grid place-items-center">
              <span className="text-9xl">🌿</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-leaf rounded-2xl px-6 py-4 shadow-glow-leaf"
          >
            <div className="text-leaf-300 text-xs uppercase tracking-widest">Lot #DV-04-26</div>
            <div className="text-cream font-display font-bold text-2xl mt-1">Tropic Thunder</div>
            <div className="text-ink-300 text-sm mt-1">Harvested 12 days ago</div>
          </motion.div>
        </div>

        {/* Copy */}
        <div>
          <Reveal>
            <span className="inline-block text-leaf-400 text-sm font-bold uppercase tracking-widest mb-4">
              The Don Verde difference
            </span>
            <h2 className="text-display-2 font-display text-cream text-balance">
              We grow it.
              <br />
              <span className="gradient-text">We deliver it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg text-ink-200 max-w-xl text-pretty">
              doorhash is the retail arm of <strong className="text-cream">Don Verde Farms</strong>{" "}
              — a Southern New Mexico cultivator with roots in NM and Southern California. No
              corporate money. No middlemen. Just a craft team obsessed with the plant, growing
              every flower we sell.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 space-y-4">
              {[
                "100% indoor cultivation, hand-trimmed",
                "Seed-to-door provenance on every house drop",
                "Rotating menu of partner brands we actually trust",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-ink-200"
                >
                  <span className="mt-1 inline-block w-2 h-2 rounded-full bg-leaf-400 shrink-0 shadow-glow-leaf" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              href="/farm"
              className="mt-10 group inline-flex items-center gap-2 rounded-full bg-cream hover:bg-leaf-300 text-ink-950 font-bold px-7 py-4 transition-colors"
            >
              Meet the farm
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
