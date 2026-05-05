"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { strainTickerWords } from "@/lib/products";
import { site } from "@/lib/site";

export function Hero() {
  const [address, setAddress] = useState("");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden surface-leaf-dark pt-32 pb-24 lg:pt-44 lg:pb-32"
    >
      {/* Layered leaf-mesh + gradient backdrop */}
      <div className="absolute inset-0 bg-leaf-mesh" />

      {/* Floating decorative leaf orbs — bigger, brighter */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 -right-10 w-96 h-96 rounded-full bg-leaf-500/30 blur-3xl"
        aria-hidden
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-10 -left-10 w-[500px] h-[500px] rounded-full bg-leaf-700/40 blur-3xl"
        aria-hidden
      />
      {/* Giant abstract cannabis leaf silhouette — replaces the previous
          geometric circle. Mirrors the leaf accent in the doorhash logo,
          reads as botanical/brand not "tech startup." Very low opacity,
          parallax-tracked, fades at the edges. */}
      <motion.svg
        style={{ y: y3 }}
        viewBox="0 0 600 600"
        aria-hidden
        className="absolute -top-20 -right-32 lg:right-0 w-[700px] h-[700px] opacity-[0.07] mix-blend-screen pointer-events-none"
        fill="none"
      >
        <defs>
          <radialGradient id="leafFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8dc63f" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#8dc63f" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8dc63f" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* 7-blade cannabis leaf — abstract, flowing, no hard edges */}
        <g transform="translate(300 300)">
          {[-75, -50, -25, 0, 25, 50, 75].map((angle, i) => {
            const len = 220 - Math.abs(angle) * 1.4;
            return (
              <ellipse
                key={i}
                cx="0"
                cy={-len / 2}
                rx="22"
                ry={len / 2}
                fill="url(#leafFade)"
                transform={`rotate(${angle})`}
              />
            );
          })}
          {/* center stem */}
          <ellipse cx="0" cy="0" rx="3" ry="240" fill="url(#leafFade)" />
        </g>
      </motion.svg>
      <div
        className="absolute -top-20 right-1/3 w-64 h-64 rounded-full bg-gold-500/20 blur-3xl"
        aria-hidden
      />

      <motion.div
        style={{ opacity }}
        className="relative mx-auto max-w-7xl px-6 lg:px-10"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-leaf-500/15 border border-leaf-400/40 backdrop-blur-md px-4 py-2 text-xs font-bold text-leaf-100 mb-8"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-leaf-300 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-leaf-300" />
          </span>
          Now delivering across {site.region}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-display-1 font-display text-white max-w-5xl text-balance"
        >
          Top-shelf cannabis,
          <br />
          <span className="text-leaf-300">at your door.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-xl lg:text-2xl text-white/80 max-w-2xl text-pretty"
        >
          Same-day delivery and pickup from Don Verde Farms and the brands you trust. Average ETA{" "}
          <span className="text-leaf-300 font-semibold">{site.delivery.avgEta}</span>.
        </motion.p>

        {/* Address-first CTA */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-12 flex flex-col sm:flex-row gap-3 max-w-2xl"
        >
          <div className="relative flex-1 group">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-leaf-300" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white placeholder:text-white/50 focus:outline-none focus:border-leaf-400 focus:ring-2 focus:ring-leaf-500/30 focus:bg-white/15 text-lg transition-all"
            />
          </div>
          <Link
            href="/menu"
            className="group h-16 inline-flex items-center justify-center gap-2 rounded-2xl bg-leaf-500 hover:bg-leaf-400 text-black font-bold px-8 text-lg transition-all shadow-glow-leaf"
          >
            Shop now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.form>

        {/* Trust strip — specific commitments, no vague claims */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/75"
        >
          <span className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-leaf-300" />
            {site.delivery.avgEta} average ETA, every order
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-leaf-300" />
            Lab-tested · COA on every package
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="text-gold-400 text-xs">●</span>
            Free over ${site.delivery.freeDeliveryOver} · no surge pricing
          </span>
        </motion.div>
      </motion.div>

      {/* Strain ticker */}
      <div className="relative mt-24">
        <Marquee speed="slow" className="text-display-2 font-display text-white/15">
          {strainTickerWords.map((w) => (
            <span key={w} className="inline-flex items-center gap-12 whitespace-nowrap">
              {w}
              <span className="text-gold-500">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
