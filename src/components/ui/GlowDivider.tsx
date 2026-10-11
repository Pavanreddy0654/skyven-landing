import clsx from "clsx";
import Image from "next/image";

/**
 * Decorative glowing line (§5.3). Uses the flare exported from the design (glow-flare.png):
 * a thin line fading at both ends with a warm glow in the centre.
 * `floating` positions it absolutely (e.g. on a card's top border) instead of in the flow.
 */
export function GlowDivider({ className, floating = false }: { className?: string; floating?: boolean }) {
  return (
    <div
      aria-hidden
      className={clsx(
        "glow-pulse pointer-events-none aspect-[448/131]",
        floating ? "absolute" : "relative w-[220px] md:w-[340px]",
        className,
      )}
    >
      <Image src="/assets/glow-flare.png" alt="" fill sizes="(min-width: 768px) 448px, 220px" className="object-contain" />
    </div>
  );
}
