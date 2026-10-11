"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Start offset in px (fade-up) */
  y?: number;
  /** Start scale, e.g. 0.96 for the closer-look video */
  scale?: number;
  /** Start brightness, e.g. 0.5 for the footer tagline */
  brightness?: number;
  delay?: number;
  id?: string;
  /** Element to render; "tr" lets a single table row reveal on its own */
  as?: "div" | "tr";
};

/**
 * Fade-up on enter (§9): opacity 0 → 1, y 24 → 0, 700ms ease-out, once. Content is always in
 * the server HTML; with reduced motion it is shown straight away with no movement.
 */
export function Reveal({ children, className, y = 24, scale = 1, brightness, delay = 0, id, as = "div" }: RevealProps) {
  const still = usePrefersReducedMotion();
  const Element = as === "tr" ? m.tr : m.div;
  const hidden = { opacity: 0, y, scale, ...(brightness !== undefined && { filter: `brightness(${brightness})` }) };
  const shown = { opacity: 1, y: 0, scale: 1, ...(brightness !== undefined && { filter: "brightness(1)" }) };

  return (
    <Element
      id={id}
      className={className}
      initial={hidden}
      {...(still
        ? { animate: shown, transition: { duration: 0 } }
        : {
            whileInView: shown,
            viewport: { once: true, amount: 0.2 },
            transition: { duration: brightness !== undefined ? 1.2 : 0.7, ease: "easeOut", delay },
          })}
    >
      {children}
    </Element>
  );
}
