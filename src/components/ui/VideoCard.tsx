"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { PlayIcon } from "./icons";

type VideoCardProps = {
  videoId: string;
  title: string;
  /** Local poster; falls back to the YouTube thumbnail */
  poster?: string;
  /** Aspect ratio of the card, e.g. "aspect-video md:aspect-[1760/731]" */
  aspectClassName?: string;
  sizes?: string;
  className?: string;
  /**
   * Start playing (muted, as browsers require) once half the video is on screen, pause when it
   * scrolls out and resume when it comes back. Off for visitors who ask for reduced motion.
   */
  autoplayInView?: boolean;
};

const YOUTUBE_ORIGIN = "https://www.youtube-nocookie.com";

/**
 * Lite YouTube embed (§5.7): renders only a poster until the video is played, so no YouTube
 * scripts or iframes load with the page.
 */
export function VideoCard({
  videoId,
  title,
  poster,
  aspectClassName = "aspect-video",
  sizes = "(min-width: 768px) 1224px, 100vw",
  className,
  autoplayInView = false,
}: VideoCardProps) {
  const [mode, setMode] = useState<"poster" | "click" | "auto">("poster");
  const reduceMotion = usePrefersReducedMotion();
  const autoplay = autoplayInView && !reduceMotion;
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const posterSrc = poster ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  // Autoplay in view: load the muted player the first time it is half visible, then pause/resume
  useEffect(() => {
    const el = containerRef.current;
    if (!autoplay || !el) return;

    const command = (func: "playVideo" | "pauseVideo") =>
      iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), YOUTUBE_ORIGIN);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMode((m) => (m === "poster" ? "auto" : m));
          command("playVideo");
        } else {
          command("pauseVideo");
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoplay]);

  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    // Pause/resume from the page needs the iframe API; autoplay without a click must be muted
    ...(mode === "auto" && { mute: "1", enablejsapi: "1" }),
  });

  return (
    <div ref={containerRef} className={clsx("relative overflow-hidden bg-black", aspectClassName, className)}>
      {mode === "auto" && (
        // Keep the poster underneath while the player loads
        <Image src={posterSrc} alt="" fill sizes={sizes} className="object-cover" />
      )}
      {mode !== "poster" ? (
        <iframe
          ref={iframeRef}
          src={`${YOUTUBE_ORIGIN}/embed/${videoId}?${params}`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setMode("click")}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          <Image src={posterSrc} alt={title} fill sizes={sizes} className="object-cover" />
          <span className="absolute inset-0 bg-navy-900/10 transition-colors duration-200 group-hover:bg-navy-900/0" />
          {/* Small play button in the bottom-right corner so it doesn't cover the picture; the whole poster is clickable */}
          <PlayIcon className="absolute right-3 bottom-3 size-10 rounded-full shadow-glow transition duration-200 group-hover:shadow-glow-strong md:right-5 md:bottom-5 md:size-12" />
        </button>
      )}
    </div>
  );
}
