"use client";

import Image from "next/image";
import {
  m,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Layer position in design-frame units: desktop (1920 frame, y from image top) and mobile (375 frame) */
type Pos = { xd: number; yd: number; wd?: number; xm: number; ym: number; wm?: number };

const vars = ({ xd, yd, wd = 0, xm, ym, wm = 0 }: Pos) =>
  ({ "--xd": xd, "--yd": yd, "--wd": wd, "--xm": xm, "--ym": ym, "--wm": wm }) as CSSProperties;

// Measured from design-reference (⚠ H1: confirm with the Figma layer X/Y values)
const layers = {
  elevation: { xd: 0, yd: 0, wd: 1920, xm: 0, ym: 441, wm: 375 },
  cloudLeft: { xd: 0, yd: 171, wd: 600, xm: -40, ym: 380, wm: 170 },
  cloudRight: { xd: 1176, yd: 295, wd: 740, xm: 215, ym: 320, wm: 220 },
  cloudBand: { xd: 0, yd: 616, wd: 1920, xm: -118, ym: 620, wm: 600 },
  rooftop: { xd: 825, yd: 811, xm: 140, ym: 718 },
  homes: { xd: 1093, yd: 1021, xm: 237, ym: 828 },
  floors: { xd: 827, yd: 1141, xm: 140, ym: 917 },
  towerBase: { xd: 960, yd: 1434, xm: 187, ym: 991 },
} satisfies Record<string, Pos>;

type Labels = { rooftop: readonly string[]; homes: readonly string[]; floors: readonly string[] };

type HeroStageProps = {
  /** The elevation <picture>, rendered on the server */
  elevation: ReactNode;
  clouds: { band: string; left: string; right: string };
  labels: Labels;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Hero scroll layers (§6.2): normal page scroll, clouds drift apart and the floating labels
 * clear as the tower base approaches the middle of the screen. Only transform/opacity animate.
 */
export function HeroStage({ elevation, clouds, labels }: HeroStageProps) {
  const baseRef = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(800);
  const { scrollY } = useScroll();

  // p: 0 at the top of the page → 1 when the tower base reaches the viewport centre
  useEffect(() => {
    const measure = () => {
      const el = baseRef.current;
      if (!el) return;
      const baseY = el.getBoundingClientRect().top + window.scrollY;
      distance.set(Math.max(200, baseY - window.innerHeight / 2));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [distance]);

  const p = useTransform<number, number>([scrollY, distance], ([y, d]) => clamp01(y / d));

  const bandY = useTransform(p, [0, 1], ["0vw", "12vw"]);
  const bandOpacity = useTransform(p, [0, 1], [1, 0.15]);
  const bandScale = useTransform(p, [0, 1], [1, 1.15]);
  const leftX = useTransform(p, [0, 1], ["0vw", "-25vw"]);
  const rightX = useTransform(p, [0, 1], ["0vw", "25vw"]);
  const hazeOpacity = useTransform(p, [0, 1], [1, 0]);
  const elevationY = useTransform(p, [0, 1], ["0vw", "8vw"]);

  // When reduced motion is requested, show the end state with no parallax
  const still = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-x-clip">
      {/* Sky above the image where it is exposed (mobile and narrower desktops) */}
      <div className="absolute inset-x-0 top-0 h-[calc(500*var(--m))] bg-linear-to-b from-[#031b41] to-[#04376a] md:h-[calc(var(--t)+120*var(--u))] md:from-[#032761]" />

      <m.div
        className="stage-layer aspect-[750/1426] md:aspect-[1920/1856]"
        style={{ ...vars(layers.elevation), y: still ? 0 : elevationY }}
      >
        <div className="absolute inset-0 mask-[linear-gradient(to_bottom,transparent,black_4%)]">
          {elevation}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[8%] bg-linear-to-b from-transparent to-navy-900" />
      </m.div>

      <FloatingLabel pos={layers.rooftop} lines={labels.rooftop} align="right" p={p} range={[0.2, 0.5]} still={still} breakFirstLineOnMobile />
      <FloatingLabel pos={layers.homes} lines={labels.homes} align="left" p={p} range={[0.35, 0.65]} still={still} />
      <FloatingLabel pos={layers.floors} lines={labels.floors} align="right" p={p} range={[0.5, 0.8]} still={still} />

      <CloudLayer
        src={clouds.left}
        pos={layers.cloudLeft}
        aspect="aspect-[600/974]"
        sizes="(min-width: 768px) 32vw, 46vw"
        style={still ? { opacity: 0 } : { x: leftX, opacity: hazeOpacity }}
      />
      <CloudLayer
        src={clouds.right}
        pos={layers.cloudRight}
        aspect="aspect-[740/627]"
        sizes="(min-width: 768px) 40vw, 59vw"
        style={still ? { opacity: 0 } : { x: rightX, opacity: hazeOpacity }}
      />
      <CloudLayer
        src={clouds.band}
        pos={layers.cloudBand}
        aspect="aspect-[1920/618]"
        sizes="(min-width: 768px) 105vw, 160vw"
        style={
          still
            ? { opacity: 0.15, y: "12vw" }
            : { y: bandY, opacity: bandOpacity, scale: bandScale }
        }
      />

      {/* Invisible marker at the tower base, used to measure scroll progress */}
      <div ref={baseRef} className="stage-layer h-px" style={vars(layers.towerBase)} />
    </div>
  );
}

function CloudLayer({
  src,
  pos,
  aspect,
  sizes,
  style,
}: {
  src: string;
  pos: Pos;
  aspect: string;
  sizes: string;
  style: Record<string, MotionValue | string | number>;
}) {
  return (
    <m.div aria-hidden className={`stage-layer ${aspect} will-change-transform`} style={{ ...vars(pos), ...style }}>
      <Image src={src} alt="" fill sizes={sizes} loading="eager" fetchPriority="low" quality={80} className="object-contain" />
    </m.div>
  );
}

function FloatingLabel({
  pos,
  lines,
  align,
  p,
  range,
  still,
  breakFirstLineOnMobile = false,
}: {
  pos: Pos;
  lines: readonly string[];
  align: "left" | "right";
  p: MotionValue<number>;
  range: [number, number];
  still: boolean;
  breakFirstLineOnMobile?: boolean;
}) {
  const opacity = useTransform(p, range, [0.4, 1]);
  const y = useTransform(p, range, [24, 0]);

  return (
    <div className={`stage-layer w-max ${align === "right" ? "stage-anchor-right text-right" : "text-left"}`} style={vars(pos)}>
      <m.p
        className="stage-label font-display whitespace-nowrap text-ivory will-change-transform"
        style={still ? { opacity: 1, y: 0 } : { opacity, y }}
      >
        {lines.map((line, i) => {
          const words = line.split(" ");
          return (
            <span key={line} className="block">
              {i === 0 && breakFirstLineOnMobile && words.length > 1 ? (
                <>
                  {words[0]} <span className="block md:inline">{words.slice(1).join(" ")}</span>
                </>
              ) : (
                line
              )}
            </span>
          );
        })}
      </m.p>
    </div>
  );
}
