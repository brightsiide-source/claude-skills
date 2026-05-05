"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function Coverage() {
  return (
    <section className="relative surface-dark py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-leaf-mesh opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="rounded-[2.5rem] card-dark overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-0">
            <div className="lg:col-span-2 p-10 lg:p-14 flex flex-col justify-center">
              <Reveal>
                <span className="inline-block text-leaf-300 text-sm font-bold uppercase tracking-widest mb-4">
                  Delivery zone
                </span>
                <h2 className="text-display-3 font-display text-white text-balance">
                  Las Cruces, fast. <br />
                  <span className="text-leaf-300">5 to 10 miles from 88007.</span>
                </h2>
                <p className="mt-6 text-white/70 text-pretty">
                  doorhash delivers across Las Cruces and the immediate surrounding area —
                  centered on 88007, within a 5 to 10 mile radius. Drop your address at
                  checkout to confirm coverage and ETA.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-8">
                  <div className="text-xs uppercase tracking-widest text-white/55 mb-3 font-bold">
                    Within range
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {[site.delivery.primaryCity, ...site.delivery.neighborhoods].map((c, i) => (
                      <li
                        key={c}
                        className={
                          i === 0
                            ? "inline-flex items-center gap-2 rounded-full bg-leaf-500 text-black px-4 py-2 text-sm font-bold shadow-glow-leaf"
                            : "inline-flex items-center gap-2 rounded-full bg-leaf-500/15 border border-leaf-400/40 px-4 py-2 text-sm text-leaf-100 font-semibold"
                        }
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Map mock */}
            <div className="lg:col-span-3 relative min-h-[420px] bg-gradient-to-br from-ink-900 via-ink-950 to-leaf-950 overflow-hidden">
              <div className="absolute inset-0 bg-leaf-mesh opacity-60" />
              {/* Faux grid */}
              <svg
                className="absolute inset-0 w-full h-full opacity-10"
                aria-hidden
              >
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Pins */}
              {[
                { x: "50%", y: "50%", label: "Las Cruces · 88007", primary: true, ring: true },
                { x: "38%", y: "62%", label: "Mesilla" },
                { x: "60%", y: "38%", label: "NW Las Cruces" },
                { x: "62%", y: "62%", label: "Univ. Park" },
                { x: "40%", y: "38%", label: "Picacho Hills" },
              ].map((pin, i) => (
                <motion.div
                  key={pin.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.15, type: "spring", bounce: 0.5 }}
                  style={{ left: pin.x, top: pin.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  {pin.primary && (
                    <div className="absolute inset-0 rounded-full bg-leaf-500/40 animate-ping" />
                  )}
                  <div
                    className={
                      pin.primary
                        ? "relative w-5 h-5 rounded-full bg-leaf-400 shadow-glow-leaf border-2 border-cream"
                        : "relative w-3 h-3 rounded-full bg-leaf-300/80 border border-cream/40"
                    }
                  />
                  <div
                    className={
                      pin.primary
                        ? "absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-leaf-500 text-ink-950 px-3 py-1 text-xs font-bold"
                        : "absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-ink-300"
                    }
                  >
                    {pin.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
