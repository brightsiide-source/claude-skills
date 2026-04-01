"use client";

import { motion } from "framer-motion";

export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(8,145,178,0.12) 0%, transparent 70%)",
          top: "-10%",
          right: "-5%",
        }}
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
          bottom: "-5%",
          left: "-5%",
        }}
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 70%)",
          top: "40%",
          left: "30%",
        }}
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}
