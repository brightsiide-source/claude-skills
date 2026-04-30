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
      className="relative isolate overflow-hidden surface-paper pt-32 pb-24 lg:pt-44 lg:pb-32"
    >
      {/* Light leaf-mesh backdrop */}
      <div className="absolute inset-0 bg-leaf-mesh-light" />

      {/* Floating decorative orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 -right-10 w-72 h-72 rounded-full bg-leaf-500/30 blur-3xl"
        aria-hidden
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-10 -left-10 w-96 h-96 rounded-full bg-leaf-300/30 blur-3xl"
        aria-hidden
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-leaf-500/20"
        aria-hidden
      />
      <div
        className="absolute -top-20 right-1/3 w-64 h-64 rounded-full bg-gold-300/20 blur-3xl"
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
          className="inline-flex items-center gap-2 rounded-full bg-leaf-50 border border-leaf-500/30 px-4 py-2 text-xs font-bold text-leaf-800 mb-8"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-leaf-500 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-leaf-500" />
          </span>
          Now delivering across {site.region}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-display-1 font-display text-black max-w-5xl text-balance"
        >
          Top-shelf cannabis,
          <br />
          <span className="text-leaf-600">at your door.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-xl lg:text-2xl text-paper-muted max-w-2xl text-pretty"
        >
          Same-day delivery and pickup from Don Verde Farms and the brands you trust. Average ETA{" "}
          <span className="text-leaf-700 font-semibold">{site.delivery.avgEta}</span>.
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
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-leaf-600" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white border border-paper-edge text-black placeholder:text-paper-soft focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/30 text-lg transition-all shadow-paper"
            />
          </div>
          <Link
            href="/menu"
            className="group h-16 inline-flex items-center justify-center gap-2 rounded-2xl bg-black hover:bg-ink-900 text-white font-bold px-8 text-lg transition-all"
          >
            Shop now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.form>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-6 text-sm text-paper-muted"
        >
          <span className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-leaf-600" />
            {site.delivery.avgEta} delivery
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-leaf-600" />
            Discreet packaging
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="text-gold-500">●</span>
            Free over ${site.delivery.freeDeliveryOver}
          </span>
        </motion.div>
      </motion.div>

      {/* Strain ticker */}
      <div className="relative mt-24">
        <Marquee speed="slow" className="text-display-2 font-display text-paper-edge">
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
