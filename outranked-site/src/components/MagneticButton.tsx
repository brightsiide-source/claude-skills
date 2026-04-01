"use client";

import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  as?: "a" | "button";
}

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  as = "a",
}: MagneticButtonProps) {
  const Component = as === "a" ? motion.a : motion.button;

  return (
    <Component
      href={as === "a" ? href : undefined}
      onClick={onClick}
      className={`relative overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        className="absolute inset-0 bg-white/20 rounded-lg"
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{ x: "100%", opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      {children}
    </Component>
  );
}
