import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "outline";
type Size = "default" | "header";

const base =
  "inline-flex items-center justify-center font-body font-medium uppercase transition duration-200 ease-out hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const sizes: Record<Size, string> = {
  default: "h-11 px-5 text-button md:h-btn md:px-6",
  // Header ENQUIRE NOW: 50px tall at both desktop frames, 43px on mobile
  header: "h-11 px-[21px] text-[14px] lg:h-[50px] lg:px-6 lg:text-[17px]",
};

const variants: Record<Variant, string> = {
  primary:
    "border border-gold bg-linear-to-br from-btn-from to-btn-to text-btn-text shadow-glow hover:shadow-glow-strong",
  outline: "border border-ivory text-ivory hover:shadow-glow",
};

type ButtonProps = { variant?: Variant; size?: Size; className?: string } & (
  | ({ href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className">)
  | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className">)
);

export function Button({ variant = "primary", size = "default", className, ...props }: ButtonProps) {
  const classes = clsx(base, sizes[size], variants[variant], className);

  if (props.href !== undefined) {
    const external = /^https?:\/\//.test(props.href);
    return (
      <a
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  }
  const { type = "button", ...rest } = props;
  return <button type={type} className={classes} {...rest} />;
}
