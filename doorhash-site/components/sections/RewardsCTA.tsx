"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const perks = [
  { value: "1pt", label: "per $1 spent" },
  { value: "$25", label: "off your first order" },
  { value: "VIP", label: "drops + happy hours" },
  { value: "🎁", label: "birthday gift" },
];

export function RewardsCTA() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-leaf-500 via-leaf-400 to-leaf-300 p-12 lg:p-20 grain">
          <motion.div
            aria-hidden
            initial={{ scale: 0.8, opacity: 0.4 }}
            whileInView={{ scale: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-leaf-100 blur-3xl"
          />
          <motion.div
            aria-hidden
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-ink-950 blur-3xl opacity-40"
          />

          <div className="relative grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-black text-leaf-300 px-4 py-2 text-xs font-bold uppercase tracking-widest mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  Hash Pass rewards
                </span>
                <h2 className="text-display-2 font-display text-black text-balance">
                  Get paid to smoke good.
                </h2>
                <p className="mt-6 text-black/80 text-lg max-w-lg text-pretty">
                  Every order earns Hash Pass points. Stack them for credit, exclusive drops from
                  Don Verde Farms, and members-only happy hours.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    href="/rewards"
                    className="group inline-flex items-center gap-2 rounded-full bg-black hover:bg-ink-900 text-leaf-300 font-bold px-7 py-4 transition-colors"
                  >
                    Join Hash Pass
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white text-black font-semibold px-7 py-4 transition-colors backdrop-blur-sm"
                  >
                    Shop the menu
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {perks.map((p, i) => (
                <Reveal key={p.label} delay={0.05 * i}>
                  <div className="rounded-2xl bg-black backdrop-blur p-6 hover:scale-105 transition-transform">
                    <div className="text-leaf-300 text-3xl font-display font-black">{p.value}</div>
                    <div className="text-white/70 text-sm mt-1">{p.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
