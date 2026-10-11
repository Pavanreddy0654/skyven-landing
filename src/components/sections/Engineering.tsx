import clsx from "clsx";
import Image from "next/image";
import { GlowDivider } from "@/components/ui/GlowDivider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { engineering } from "@/data/content";

export function Engineering() {
  return (
    <section aria-labelledby="engineering-title" className="relative bg-navy-800 pt-section">
      <GlowDivider floating className="top-0 left-1/2 w-[340px] -translate-1/2 md:w-[448px]" />
      <div className="container-content">
        <SectionHeading
          id="engineering-title"
          eyebrow={engineering.eyebrow}
          title={engineering.title}
          subtitle={engineering.subtitle}
        />

        {/* Zig-zag rows: image 51% of the container, alternating sides (stacked on mobile) */}
        <ul className="mt-9 space-y-10 px-6 md:space-y-[30px] md:px-0">
          {engineering.features.map((feature, i) => {
            const imageRight = i % 2 === 1;
            return (
              <li
                key={feature.title}
                className={clsx(
                  "grid items-center gap-5 md:gap-0",
                  imageRight ? "md:grid-cols-[1fr_51%]" : "md:grid-cols-[51%_1fr]",
                )}
              >
                <div className={clsx("relative aspect-[540/399] w-full overflow-hidden", imageRight && "md:order-last")}>
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    fill
                    sizes="(min-width: 768px) 51vw, 86vw"
                    className="object-cover"
                  />
                </div>
                <div className={clsx(imageRight ? "md:pr-8" : "md:pl-[15%]")}>
                  <h3 className="font-display text-h3 text-gold">{feature.title}</h3>
                  <p className="mt-2 max-w-[24rem] text-body text-ivory">{feature.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
