import type { SVGProps } from "react";

export function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden {...props}>
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 72 72" aria-hidden {...props}>
      <circle cx="36" cy="36" r="36" fill="var(--color-gold)" />
      <path d="M29 24.5v23L48 36z" fill="var(--color-navy-900)" />
    </svg>
  );
}
