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
      {/* Cannabis leaf silhouette — proper 7-blade leaf with serrated
          edges (the iconic cannabis sawtooth pattern), pointed tips, and
          slender blades. Straight up, no tilt. Parallax-tracked. */}
      <motion.svg
        style={{ y: y3 }}
        viewBox="-160 -300 320 360"
        aria-hidden
        className="absolute -top-10 -right-16 lg:-right-4 w-[600px] h-[680px] lg:w-[800px] lg:h-[900px] text-leaf-300 opacity-55 pointer-events-none"
        fill="currentColor"
      >
        {/* 7 blades fanning upward, each with serrated edges */}
        {[
          { angle: 0,   length: 280, width: 28 },
          { angle: -26, length: 245, width: 26 },
          { angle: 26,  length: 245, width: 26 },
          { angle: -55, length: 185, width: 22 },
          { angle: 55,  length: 185, width: 22 },
          { angle: -88, length: 115, width: 14 },
          { angle: 88,  length: 115, width: 14 },
        ].map((b, i) => {
          // Generate serrated leaf-blade path:
          // base → zigzag up the left edge → tip → zigzag down the right edge → close
          const serrations = 9;
          const pts: [number, number][] = [[0, 0]];
          // Left edge (base → tip)
          for (let s = 1; s <= serrations; s++) {
            const t = s / (serrations + 1);
            const y = -t * b.length;
            const w = b.width * (1 - t * 0.92);
            // valley (closer to spine), then peak (serration tip)
            pts.push([-w * 0.45, y + 3]);
            pts.push([-w, y]);
          }
          // Tip
          pts.push([0, -b.length]);
          // Right edge mirror (tip → base)
          for (let s = serrations; s >= 1; s--) {
            const t = s / (serrations + 1);
            const y = -t * b.length;
            const w = b.width * (1 - t * 0.92);
            pts.push([w, y]);
            pts.push([w * 0.45, y + 3]);
          }
          const d = "M " + pts.map((p) => p.join(" ")).join(" L ") + " Z";
          return <path key={i} d={d} transform={`rotate(${b.angle})`} />;
        })}
        {/* stem / petiole going down */}
        <path d="M -3 0 L 3 0 L 2 65 L -2 65 Z" />
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
