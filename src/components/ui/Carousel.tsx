"use client";

import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Lightbox, type LightboxImage } from "./Lightbox";

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
  /** Open slides in a full-screen viewer on click/tap (a drag still just scrolls) */
  lightbox?: boolean;
  /** Images shown in the viewer, if different from the slides (e.g. larger versions); same order */
  lightboxImages?: readonly LightboxImage[];
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
  lightbox = false,
  lightboxImages,
}: CarouselProps) {
  const [viewing, setViewing] = useState<number | null>(null);
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
        <div className="flex touch-pan-y gap-3 md:gap-4 lg:gap-6">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              className={clsx("min-w-0 shrink-0 grow-0", slideClassName)}
            >
              <figure>
                {lightbox ? (
                  // Embla cancels this click when the pointer was dragged, so drags only scroll
                  <button
                    type="button"
                    onClick={() => setViewing(i)}
                    aria-label={`View larger: ${slide.caption ?? slide.alt}`}
                    className={clsx("group relative block w-full cursor-zoom-in overflow-hidden", imageClassName)}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes={sizes}
                      draggable={false}
                      className="object-cover transition-transform duration-500 select-none group-hover:scale-[1.02]"
                    />
                  </button>
                ) : (
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
                )}
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
            </div>
          ))}
        </div>
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

      {lightbox && <Lightbox images={lightboxImages ?? slides} index={viewing} onChange={setViewing} />}
    </div>
  );
}
