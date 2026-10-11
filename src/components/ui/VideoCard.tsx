"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
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
};

/**
 * Lite YouTube embed (§5.7): renders only a poster button until clicked, so no YouTube
 * scripts or iframes load with the page.
 */
export function VideoCard({
  videoId,
  title,
  poster,
  aspectClassName = "aspect-video",
  sizes = "(min-width: 768px) 1224px, 100vw",
  className,
}: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const posterSrc = poster ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className={clsx("relative overflow-hidden bg-black", aspectClassName, className)}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          <Image src={posterSrc} alt={title} fill sizes={sizes} className="object-cover" />
          <span className="absolute inset-0 bg-navy-900/10 transition-colors duration-200 group-hover:bg-navy-900/0" />
          <PlayIcon className="absolute top-1/2 left-1/2 size-14 -translate-1/2 rounded-full transition duration-200 group-hover:shadow-glow-strong md:size-[72px]" />
        </button>
      )}
    </div>
  );
}
