import clsx from "clsx";
import { getImageProps } from "next/image";
import { Button } from "@/components/ui/Button";
import { hero } from "@/data/content";
import { HeroStage } from "./HeroStage";

/** Elevation image with a separate mobile crop (art direction), loaded with high priority. */
function Elevation() {
  const common = { alt: hero.images.elevation.alt, fill: true, quality: 75 } as const;
  const {
    props: { srcSet: desktop, sizes: desktopSizes },
  } = getImageProps({ ...common, src: hero.images.elevation.desktop, sizes: "(min-width: 1920px) 100vw, 110vw" });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: hero.images.elevation.mobile, sizes: "100vw" });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} sizes={desktopSizes} />
      <img {...rest} srcSet={mobile} alt={common.alt} loading="eager" fetchPriority="high" className="object-cover" />
    </picture>
  );
}

export function Hero() {
  const [first, ...others] = hero.stats;

  return (
    <section id="top" aria-labelledby="hero-title" className="hero relative overflow-x-clip bg-navy-900">
      <HeroStage
        elevation={<Elevation />}
        clouds={{ band: hero.images.cloudBand, left: hero.images.cloudLeft, right: hero.images.cloudRight }}
        labels={hero.labels}
      />

      <div className="relative z-10 container-content pt-[166px] text-center md:pt-[200px] lg:pt-[214px]">
        <p className="text-[10px] text-ivory/70 md:text-micro">{hero.rera}</p>
        <h1 id="hero-title" className="mt-3 font-display text-ivory md:mt-2">
          <span className="block text-[24px] leading-[1.3] md:text-display-xl">{hero.title}</span>
          <span className="sr-only"> — </span>
          <span className="block text-display-xl">{hero.subtitle}</span>
        </h1>

        <dl className="mx-auto mt-8 grid max-w-[335px] grid-cols-2 gap-y-6 md:mt-5 md:flex md:max-w-none md:justify-center">
          <Stat {...first} />
          <Stat {...others[0]} divider="always" />
          <Stat {...others[1]} divider="desktop" className="col-span-2" />
        </dl>

        <Button href={hero.cta.href} className="mt-10 w-[209px] md:mt-9 md:w-auto">
          {hero.cta.label}
        </Button>
      </div>
    </section>
  );
}

// Thin vertical divider on the item's left edge (class names written out in full for Tailwind)
const dividers = {
  none: "",
  always:
    "before:absolute before:top-1/2 before:left-0 before:h-[56px] before:w-px before:-translate-y-1/2 before:bg-ivory/50 md:before:h-[46px]",
  desktop:
    "md:before:absolute md:before:top-1/2 md:before:left-0 md:before:h-[46px] md:before:w-px md:before:-translate-y-1/2 md:before:bg-ivory/50",
};

function Stat({
  label,
  value,
  divider = "none",
  className,
}: {
  label: string;
  value: string;
  divider?: keyof typeof dividers;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative md:w-[242px]",
        dividers[divider],
        className,
      )}
    >
      <dt className="text-[15px] text-ivory/90 md:text-[clamp(15px,1.25vw,18px)]">{label}</dt>
      <dd className="mt-1 font-display text-[22px] leading-tight text-ivory md:text-[clamp(22px,2.78vw,40px)]">
        {value}
      </dd>
    </div>
  );
}
