import clsx from "clsx";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string | readonly string[];
  subtitle?: string;
  tone?: "dark" | "light";
  align?: "center" | "left";
  /** Visual style of the subtitle: normal body copy or small uppercase tagline */
  subtitleStyle?: "body" | "tagline";
  /** Where title lines break: on md+ only (default), on mobile only, or always */
  lineBreaks?: "desktop" | "mobile" | "always";
  className?: string;
};

const breakClass = { desktop: "md:block", mobile: "block md:inline", always: "block" };

const tones = {
  dark: { eyebrow: "text-gold", title: "text-ivory", subtitle: "text-ivory-muted" },
  light: { eyebrow: "text-ink", title: "text-gold-deep", subtitle: "text-ink/70" },
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  align = "center",
  subtitleStyle = "body",
  lineBreaks = "desktop",
  className,
}: SectionHeadingProps) {
  const lines = typeof title === "string" ? [title] : title;
  const t = tones[tone];

  return (
    <div className={clsx(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && <p className={clsx("mb-3 font-display text-eyebrow", t.eyebrow)}>{eyebrow}</p>}
      <h2 id={id} className={clsx("font-display text-h2", t.title)}>
        {lines.map((line, i) => (
          <span key={line} className={breakClass[lineBreaks]}>
            {line}
            {i < lines.length - 1 && " "}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            "mt-4",
            subtitleStyle === "tagline" ? "text-small uppercase tracking-[0.06em]" : "text-body",
            align === "center" && "mx-auto max-w-[52rem]",
            t.subtitle,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
