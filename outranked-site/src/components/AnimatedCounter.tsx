"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  duration = 2000,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract number and surrounding text
    const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];

    let start = 0;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setDisplay(`${prefix}${start}${suffix}`);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return <span ref={ref}>{display}</span>;
}
