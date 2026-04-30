import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
};

export function Marquee({ children, className, reverse, speed = "normal" }: Props) {
  const duration = speed === "slow" ? "60s" : speed === "fast" ? "25s" : "40s";
  return (
    <div className={cn("relative flex overflow-hidden mask-fade-x", className)}>
      <div
        className="flex shrink-0 items-center gap-12 pr-12 animate-marquee"
        style={{
          animationDuration: duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
