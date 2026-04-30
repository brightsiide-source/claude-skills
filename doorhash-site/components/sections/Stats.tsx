"use client";

import { useInView, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";

type Stat = { value: number; suffix?: string; prefix?: string; label: string };

const stats: Stat[] = [
  { value: 30, suffix: " min", label: "Average delivery time" },
  { value: 1200, suffix: "+", label: "5-star reviews" },
  { value: 100, suffix: "+", label: "Strains in rotation" },
  { value: 5, suffix: "", label: "Cities served" },
];

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, to, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative surface-paper py-24 lg:py-32 border-y border-paper-edge">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center lg:text-left">
                <div className="text-display-2 font-display text-leaf-700">
                  <Counter to={s.value} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <div className="mt-3 text-paper-muted text-sm uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
