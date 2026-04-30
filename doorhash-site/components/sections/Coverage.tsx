"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function Coverage() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="rounded-[2.5rem] glass overflow-hidden border-leaf-500/10">
          <div className="grid lg:grid-cols-5 gap-0">
            <div className="lg:col-span-2 p-10 lg:p-14 flex flex-col justify-center">
              <Reveal>
                <span className="inline-block text-leaf-400 text-sm font-bold uppercase tracking-widest mb-4">
                  Delivery zones
                </span>
                <h2 className="text-display-3 font-display text-cream text-balance">
                  We go where the others <span className="gradient-text">don&apos;t.</span>
                </h2>
                <p className="mt-6 text-ink-200 text-pretty">
                  doorhash delivers across Southern New Mexico — including the corners of the map
                  no one else covers. Drop your address at checkout to confirm coverage and ETA.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-8 grid grid-cols-2 gap-3">
                  {site.delivery.cities.map((c) => (
                    <li
                      key={c}
                      className="inline-flex items-center gap-2 rounded-full glass-leaf px-4 py-2 text-sm text-leaf-100"
                    >
                      <MapPin className="w-3.5 h-3.5 text-leaf-400" />
                      {c}
                    </li>
                  ))}
                </ul>
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
                { x: "30%", y: "45%", label: "Las Cruces", primary: true },
                { x: "55%", y: "30%", label: "Mesilla" },
                { x: "20%", y: "70%", label: "Sunland Park" },
                { x: "70%", y: "55%", label: "Anthony" },
                { x: "45%", y: "65%", label: "Doña Ana" },
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
