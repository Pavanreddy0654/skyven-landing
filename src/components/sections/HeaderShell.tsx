"use client";

import clsx from "clsx";
import { useSyncExternalStore, type ReactNode } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

const scrolledPastTop = () => window.scrollY > 80;

/**
 * Fixed header: transparent over the top of the hero, then a navy/blur bar as soon as the visitor
 * starts scrolling, so the hero text never runs underneath a see-through bar (Q9).
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const solid = useSyncExternalStore(subscribe, scrolledPastTop, () => false);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-300",
        solid ? "bg-navy-900/90 py-2 backdrop-blur-md lg:py-3" : "bg-transparent py-4 lg:py-5",
      )}
    >
      {children}
    </header>
  );
}
