"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type LightboxImage = { src: string; alt: string; caption?: string };

type LightboxProps = {
  images: readonly LightboxImage[];
  /** Index of the image to show; null when closed */
  index: number | null;
  onChange: (index: number | null) => void;
};

/**
 * Full-screen image viewer: caption, counter, previous/next, Esc / arrow keys, swipe on touch,
 * focus kept inside while open and returned to the opening element on close.
 */
export function Lightbox({ images, index, onChange }: LightboxProps) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);
  const touchX = useRef<number | null>(null);
  const count = images.length;

  const go = useCallback(
    (step: number) => onChange(index === null ? null : (index + step + count) % count),
    [index, count, onChange],
  );
  const close = useCallback(() => onChange(null), [onChange]);

  // Lock page scroll, remember what opened the viewer and restore focus to it on close
  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      html.style.overflow = previous;
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // Keep focus inside the viewer
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, go]);

  if (!open || typeof document === "undefined") return null;
  const image = images[index];

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[100] flex flex-col bg-navy-900/95 backdrop-blur-sm"
      // Clicking anywhere except the buttons or the picture itself closes the viewer
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("button")) return;
        if (target instanceof HTMLImageElement && isOnPicture(e.clientX, e.clientY, target)) return;
        close();
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-5">
        <p className="text-small text-ivory/70" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close image viewer"
          className="grid size-11 place-items-center rounded-full text-ivory transition-colors hover:bg-ivory/10"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="relative mx-auto min-h-0 w-full max-w-[1600px] flex-1 px-4 md:px-24">
        <div className="relative size-full">
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1600px) 1600px, 100vw"
            quality={80}
            className="object-contain"
          />
        </div>

        {count > 1 && (
          <>
            <NavButton direction="previous" onClick={() => go(-1)} />
            <NavButton direction="next" onClick={() => go(1)} />
          </>
        )}
      </div>

      <p className="min-h-[3.5rem] px-4 py-4 text-center text-body font-semibold text-ivory md:min-h-[4.5rem] md:py-6">
        {image.caption ?? ""}
      </p>
    </div>,
    document.body,
  );
}

/** With object-contain the <img> box is larger than the picture; check the click hit the picture itself */
function isOnPicture(x: number, y: number, img: HTMLImageElement) {
  const box = img.getBoundingClientRect();
  if (!img.naturalWidth || !img.naturalHeight) return true;
  const scale = Math.min(box.width / img.naturalWidth, box.height / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  const left = box.left + (box.width - w) / 2;
  const top = box.top + (box.height - h) / 2;
  return x >= left && x <= left + w && y >= top && y <= top + h;
}

function NavButton({ direction, onClick }: { direction: "previous" | "next"; onClick: () => void }) {
  const next = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={next ? "Next image" : "Previous image"}
      className={`absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-navy-900/60 text-ivory transition-colors hover:bg-gold hover:text-navy-900 md:size-12 ${next ? "right-2 md:right-6" : "left-2 md:left-6"}`}
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path d={next ? "m9 6 6 6-6 6" : "m15 6-6 6 6 6"} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/* Group of clickable images that share one viewer (used by the gallery mosaic) */

const LightboxContext = createContext<((index: number) => void) | null>(null);

export function LightboxGroup({ images, children }: { images: readonly LightboxImage[]; children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <LightboxContext.Provider value={setIndex}>
      {children}
      <Lightbox images={images} index={index} onChange={setIndex} />
    </LightboxContext.Provider>
  );
}

export function LightboxItem({
  index,
  label,
  className,
  children,
}: {
  index: number;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const open = useContext(LightboxContext);
  return (
    <button
      type="button"
      onClick={() => open?.(index)}
      aria-label={`View larger: ${label}`}
      className={`group block w-full cursor-zoom-in text-left ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
