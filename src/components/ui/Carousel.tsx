"use client";

import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type CarouselSlide = { src: string; alt: string; caption?: string };

type CarouselProps = {
  slides: readonly CarouselSlide[];
  /** Accessible name for the carousel region */
  label: string;
  tone?: "dark" | "light";
  /** Width of each slide, e.g. "basis-[88%] md:basis-[min(808px,80%)]" */
  slideClassName?: string;
  /** Aspect ratio of the image box, e.g. "aspect-[808/456]" */
  imageClassName?: string;
  /** `sizes` hint for next/image, matching slideClassName */
  sizes: string;
  /** Start slides on the content-container edge and let them bleed off the right */
  bleed?: boolean;
  dots?: boolean;
  className?: string;
};

/**
 * Drag/swipe carousel (§5.5). Every slide is rendered in the server HTML; only the scroll
 * position is client-side.
 */
export function Carousel({
  slides,
  label,
  tone = "dark",
  slideClassName = "basis-[88%] md:basis-[min(808px,80%)]",
  imageClassName = "aspect-[808/456]",
  sizes,
  bleed = true,
  dots = false,
  className,
}: CarouselProps) {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);
  const snapCount = embla?.scrollSnapList().length ?? 0;

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={clsx("w-full", className)}
    >
      <div
        ref={viewportRef}
        className={clsx("cursor-grab overflow-hidden active:cursor-grabbing", bleed ? "px-carousel" : "")}
      >
        <ul className="flex touch-pan-y gap-3 md:gap-4 lg:gap-6">
          {slides.map((slide, i) => (
            <li
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              className={clsx("min-w-0 shrink-0 grow-0", slideClassName)}
            >
              <figure>
                <div className={clsx("relative overflow-hidden", imageClassName)}>
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes={sizes}
                    draggable={false}
                    className="object-cover select-none"
                  />
                </div>
                {slide.caption && (
                  <figcaption
                    className={clsx(
                      "mt-3 font-body text-[15px] font-semibold md:mt-4 md:text-body",
                      tone === "light" ? "text-ink" : "text-ivory",
                    )}
                  >
                    {slide.caption}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {dots && snapCount > 1 && (
        <div className="mt-3 flex justify-center">
          {Array.from({ length: snapCount }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === selected}
              onClick={() => embla?.scrollTo(i)}
              className="grid size-8 place-items-center"
            >
              <span
                className={clsx(
                  "size-2 rounded-full transition-colors",
                  i === selected ? "bg-gold" : "bg-ivory/30",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
