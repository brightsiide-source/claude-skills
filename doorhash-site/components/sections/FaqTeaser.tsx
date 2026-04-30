"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const faqs = [
  {
    q: "How fast is delivery?",
    a: "Average ETA is 30–55 minutes during open hours. You'll get a real-time tracking link the moment a driver picks up your order.",
  },
  {
    q: "Where do you deliver?",
    a: "Currently across Las Cruces, Mesilla, Sunland Park, Anthony, and Doña Ana. We're adding new zones every month — drop your address at checkout to confirm.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash and debit on delivery. We're working on contactless payment options — stay tuned.",
  },
  {
    q: "Is there an order minimum?",
    a: "Yes — $50 minimum. Orders over $100 ship free.",
  },
  {
    q: "Do I need a medical card?",
    a: "Not in New Mexico — recreational sales are legal for adults 21+ with a valid ID. Medical patients get extra savings, and we have a dedicated med menu.",
  },
];

export function FaqTeaser() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative surface-paper-warm py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <span className="inline-block text-leaf-700 text-sm font-bold uppercase tracking-widest mb-4">
            Common questions
          </span>
          <h2 className="text-display-2 font-display text-ink-950 text-balance">
            Everything you need <span className="text-leaf-600">to know.</span>
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left rounded-2xl card-paper overflow-hidden"
                aria-expanded={open === i}
              >
                <div className="flex items-center justify-between p-6">
                  <span className="text-ink-950 font-display font-bold text-lg pr-4">{f.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 w-9 h-9 rounded-full bg-leaf-500/15 border border-leaf-500/30 grid place-items-center text-leaf-700"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </div>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-paper-muted text-pretty">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-full bg-ink-950 hover:bg-ink-800 px-6 py-3 text-cream font-semibold transition-colors"
          >
            See all FAQs
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
