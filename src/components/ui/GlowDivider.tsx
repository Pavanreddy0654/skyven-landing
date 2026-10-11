import clsx from "clsx";

/** Decorative glowing line (§5.3): fades out at both ends, warm glow in the centre. */
export function GlowDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={clsx("relative h-3 w-[180px] md:w-[280px]", className)}>
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,#FFE7B0,transparent)]" />
      <span className="glow-pulse absolute top-1/2 left-1/2 h-3 w-10 -translate-1/2 bg-[radial-gradient(circle,rgb(255_231_176/0.9),transparent_70%)]" />
      <span className="absolute top-1/2 left-1/2 size-1 -translate-1/2 rounded-full bg-white shadow-[0_0_8px_3px_rgb(255_231_176/0.8)]" />
    </div>
  );
}
