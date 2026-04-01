"use client";

import { motion } from "framer-motion";

export default function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #06b6d4, #0891b2, #22d3ee, #0891b2, #06b6d4)",
      }}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}
