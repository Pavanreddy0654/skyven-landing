"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * True when the visitor asks for reduced motion. Unlike framer-motion's useReducedMotion, this
 * re-renders after hydration (server value is false) and follows live changes to the setting.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
