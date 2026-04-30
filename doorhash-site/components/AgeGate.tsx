"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const STORAGE_KEY = "doorhash:age-verified";

export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    try {
      const ok = window.localStorage.getItem(STORAGE_KEY);
      if (!ok) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function confirm() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-950/90 backdrop-blur-xl px-6"
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-leaf-mesh pointer-events-none" />
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg glass-leaf rounded-3xl p-10 text-center shadow-glow-leaf"
          >
            <div className="mx-auto mb-8 w-44">
              <Logo />
            </div>
            <h1 className="text-display-3 text-cream font-display mb-4">
              Are you {site.age} or older?
            </h1>
            <p className="text-ink-200 mb-8 text-pretty">
              You must be {site.age}+ to enter doorhash. By entering, you confirm you are of legal
              age and agree to our terms.
            </p>
            {denied ? (
              <p className="text-leaf-300 font-semibold">
                Sorry, you must be {site.age} or older to access this site.
              </p>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={confirm}
                  className="rounded-full bg-leaf-500 hover:bg-leaf-400 text-ink-950 font-bold px-8 py-4 transition-colors shadow-glow-leaf"
                >
                  I&apos;m {site.age}+ &mdash; Enter
                </button>
                <button
                  onClick={() => setDenied(true)}
                  className="rounded-full border border-ink-700 hover:border-ink-500 text-ink-200 font-medium px-8 py-4 transition-colors"
                >
                  Under {site.age}
                </button>
              </div>
            )}
            <p className="text-xs text-ink-400 mt-8">
              Cannabis products are for use only by adults {site.age}+. Keep out of reach of
              children. Please consume responsibly.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
