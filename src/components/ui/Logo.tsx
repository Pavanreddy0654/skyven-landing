import Image from "next/image";
import clsx from "clsx";
import { logo } from "@/data/content";

/**
 * Single logo component (A3). To switch to the SVG, change the src in `content.ts`.
 * Height is set by CSS and width follows the file's own aspect ratio, so a replacement file
 * with different dimensions still renders correctly.
 */
export function Logo({
  variant = "header",
  className,
  preload,
}: {
  variant?: "header" | "footer";
  className?: string;
  preload?: boolean;
}) {
  const file = logo[variant];
  return (
    <Image
      src={file.src}
      alt={logo.alt}
      width={file.width}
      height={file.height}
      preload={preload}
      unoptimized={file.src.endsWith(".svg")}
      className={clsx("w-auto", className)}
    />
  );
}
