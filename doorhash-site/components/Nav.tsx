"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 80], [0, 16]);
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(10,10,10,0)", "rgba(10,10,10,0.78)"]
  );
  const border = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.06)"]
  );

  return (
    <>
      <motion.header
        style={{
          backdropFilter: blur.get() ? `blur(${blur.get()}px)` : "blur(0px)",
          background: bg,
          borderBottomColor: border,
        }}
        className="fixed top-0 inset-x-0 z-50 border-b border-transparent transition-colors"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link href="/" aria-label="doorhash home" className="flex items-center gap-3">
            <Logo className="w-32 sm:w-36" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-ink-200 hover:text-cream transition-colors rounded-full hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/menu"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-leaf-500 hover:bg-leaf-400 text-ink-950 font-bold px-5 py-2.5 text-sm transition-all shadow-glow-leaf"
            >
              <ShoppingBag className="w-4 h-4" />
              Order
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full glass text-cream"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" },
          closed: { opacity: 0, pointerEvents: "none" },
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-2xl pt-24 px-8 lg:hidden"
        )}
      >
        <nav className="flex flex-col gap-2">
          {site.nav.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              animate={
                open ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{ delay: open ? 0.05 * i : 0, duration: 0.4 }}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-4 text-3xl font-display font-bold text-cream border-b border-white/5"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <Link
            href="/menu"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-leaf-500 text-ink-950 font-bold px-6 py-4 text-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            Shop the menu
          </Link>
        </nav>
      </motion.div>
    </>
  );
}
